"""Content helpers for the static site. Run with --help for commands."""
import argparse
from datetime import date
from http.server import SimpleHTTPRequestHandler, HTTPServer
import json
from pathlib import Path
import re
import shutil
import subprocess
import sys
from tempfile import TemporaryDirectory

from stage import stage

ROOT = Path(__file__).resolve().parent.parent


def build():
    subprocess.run([sys.executable, str(ROOT / 'scripts/build.py')], check=True)


def ask(value, label, default=''):
    if value is not None:
        return value.strip()
    if not sys.stdin.isatty():
        if default:
            return default
        raise ValueError(f'{label} is required; provide its command-line option.')
    result = input(f'{label}' + (f' [{default}]' if default else '') + ': ').strip()
    if not result and not default:
        raise ValueError(f'{label} cannot be empty.')
    return result or default


def slugify(title):
    slug = re.sub(r'[^a-z0-9]+', '-', title.lower()).strip('-')
    if not slug:
        raise ValueError('The title must contain letters or numbers.')
    return slug


def content_date(value):
    return date.fromisoformat(ask(value, 'Date (YYYY-MM-DD)', date.today().isoformat())).isoformat()


def new_project(args):
    from content import public_link
    title = ask(args.title, 'Project title')
    path = ask(args.path, 'Demo URL or local HTML path (for example Projects/MyProject/index.html)')
    public_link(path, ROOT, must_exist=True)
    description = ask(args.description, 'Description')
    category = ask(args.category, 'Category', 'Software')
    tags = [tag.strip() for tag in ask(args.tags, 'Comma-separated tags', 'JavaScript').split(',') if tag.strip()]
    entry = dict(title=title, category=category, description=description, path=path, tags=tags,
                 art='code', date=content_date(args.date))
    if args.source:
        public_link(args.source, ROOT, external_only=True)
        entry['source'] = args.source
    if args.image:
        public_link(args.image, ROOT, must_exist=True, image=True)
        entry['image'] = args.image
    config_path = ROOT / 'content/site.json'
    config = json.loads(config_path.read_text())
    if any(p['title'].casefold() == title.casefold() or p['path'] == path for p in config['projects']):
        raise ValueError('A project with that title or demo path already exists.')
    config['projects'].append(entry)
    original = config_path.read_text()
    config_path.write_text(json.dumps(config, indent=2) + '\n')
    try:
        build()
    except subprocess.CalledProcessError:
        config_path.write_text(original)
        raise
    print(f'Added {title}. Edit its entry in content/site.json to make changes.')


def new_writeup(args):
    title = ask(args.title, 'Writeup title')
    slug = slugify(title)
    category = ask(args.category, 'Category (Project, CTF, Notes)', 'Project')
    if category not in ('Project', 'CTF', 'Notes'):
        raise ValueError('Category must be Project, CTF, or Notes.')
    summary = ask(args.summary, 'Short summary')
    tags = [t.strip() for t in ask(args.tags, 'Comma-separated tags', category).split(',') if t.strip()]
    for directory in ['drafts', 'posts']:
        for existing in (ROOT / 'content' / directory).glob('*.md'):
            metadata = json.loads(existing.read_text().split('\n---\n', 1)[0])
            if metadata['slug'] == slug:
                raise ValueError(f'A writeup with slug {slug} already exists: {existing.relative_to(ROOT)}')
    metadata = dict(title=title, date=content_date(args.date), category=category, tags=tags, summary=summary, slug=slug)
    template = 'ctf-template.md' if category == 'CTF' else 'project-template.md'
    body = (ROOT / 'content/drafts' / template).read_text().split('\n---\n', 1)[1]
    if category == 'Notes':
        body = '## Overview\n\nWrite your notes here.\n\n## References\n\nAdd relevant links.\n'
    path = ROOT / 'content/drafts' / (slug + '.md')
    path.write_text(json.dumps(metadata, indent=2) + '\n---\n' + body)
    print(f'Created {path.relative_to(ROOT)}')
    print(f'Edit the Markdown, then run: python3 scripts/site.py publish {slug}')


def publish(args):
    if not re.fullmatch(r'[a-z0-9]+(?:-[a-z0-9]+)*', args.slug):
        raise ValueError('Use the writeup slug, such as my-project, without a path or .md extension.')
    source = ROOT / 'content/drafts' / (args.slug + '.md')
    target = ROOT / 'content/posts' / source.name
    if not source.is_file():
        raise ValueError(f'Draft not found: {source.relative_to(ROOT)}')
    metadata = json.loads(source.read_text().split('\n---\n', 1)[0])
    if metadata['slug'] != args.slug:
        raise ValueError('The draft filename must match its metadata slug.')
    if target.exists():
        raise ValueError('A published file with this name already exists.')
    target.parent.mkdir(exist_ok=True)
    shutil.move(source, target)
    try:
        build()
    except subprocess.CalledProcessError:
        shutil.move(target, source)
        raise
    print(f'Added /blog/{args.slug}/ to the local site. No commit, push, or deployment was performed.')


def preview(args):
    # Each browser refresh rebuilds changed authoring files and serves only the
    # same public artifact that Pages receives, never the repository itself.
    def fingerprint():
        paths = [ROOT/'content/site.json', ROOT/'scripts/build.py', ROOT/'scripts/content.py', ROOT/'scripts/stage.py']
        for directory in ['content/posts', 'content/pages', 'assets', 'Projects', 'Resources', 'legacy', 'Html', 'Stylesheets', '404']:
            paths.extend(p for p in (ROOT/directory).rglob('*') if p.is_file())
        return tuple((str(p), p.stat().st_mtime_ns, p.stat().st_size) for p in sorted(paths))

    with TemporaryDirectory(prefix='echo-preview-') as tmp:
        state = {'signature': None, 'directory': None, 'revision': 0}
        def refresh():
            signature = fingerprint()
            if signature != state['signature']:
                build()
                destination = Path(tmp) / str(state['revision'])
                state['revision'] += 1
                stage(destination)
                previous = state['directory']
                state.update(signature=signature, directory=destination)
                if previous:
                    shutil.rmtree(previous)

        refresh()
        class Handler(SimpleHTTPRequestHandler):
            def __init__(self, *a, **kw):
                super().__init__(*a, directory=str(state['directory']), **kw)

            def do_GET(self):
                try:
                    refresh()
                except (ValueError, subprocess.CalledProcessError) as error:
                    print(f'Preview rebuild failed; serving last successful version: {error}', file=sys.stderr)
                self.directory = str(state['directory'])
                super().do_GET()

            def end_headers(self):
                self.send_header('Cache-Control', 'no-store')
                super().end_headers()

        with HTTPServer(('127.0.0.1', args.port), Handler) as server:
            print(f'Preview: http://localhost:{args.port} — save changes and refresh the browser. Ctrl+C stops it.', flush=True)
            try:
                server.serve_forever()
            except KeyboardInterrupt:
                pass


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    commands = parser.add_subparsers(dest='command', required=True)
    project = commands.add_parser('new-project', help='Add a project with prompts or flags, then rebuild')
    project.add_argument('title', nargs='?')
    for flag in ['path', 'description', 'category', 'tags', 'date', 'source', 'image']:
        project.add_argument('--'+flag)
    project.set_defaults(action=new_project)
    writeup = commands.add_parser('new-writeup', help='Create a Markdown draft with prompts or flags')
    writeup.add_argument('title', nargs='?')
    for flag in ['category', 'summary', 'tags', 'date']:
        writeup.add_argument('--'+flag)
    writeup.set_defaults(action=new_writeup)
    post = commands.add_parser('publish', help='Move a draft into the local blog and rebuild; does not deploy')
    post.add_argument('slug')
    post.set_defaults(action=publish)
    commands.add_parser('build', help='Rebuild HTML, feed, and sitemap').set_defaults(action=lambda args: build())
    view = commands.add_parser('preview', help='Serve public files; rebuild when you refresh after changes')
    view.add_argument('--port', type=int, default=8002)
    view.set_defaults(action=preview)
    args = parser.parse_args()
    try:
        args.action(args)
    except (ValueError, OSError, KeyError, subprocess.CalledProcessError) as error:
        parser.exit(1, f'Error: {error}\n')


if __name__ == '__main__':
    main()
