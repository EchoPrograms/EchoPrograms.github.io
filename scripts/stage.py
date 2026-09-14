"""Package only public static files for Pages. Does not build or deploy the site."""
from pathlib import Path
import argparse
import re
import shutil

ROOT = Path(__file__).resolve().parent.parent
PUBLIC_FILES = ('index.html', 'feed.xml', 'sitemap.xml')
PUBLIC_DIRS = ('assets', 'blog', 'portfolio', 'info', 'ai-use', 'legacy', 'Projects', 'Resources', 'Html', 'Stylesheets', '404')
# Include original demo assets and saved network data, but not authoring documents.
PUBLIC_SUFFIXES = {'', '.html', '.css', '.js', '.json', '.xml', '.svg', '.png', '.jpg', '.jpeg', '.gif', '.ico', '.webp', '.avif', '.woff', '.woff2', '.ttf', '.otf', '.txt', '.zip', '.mhtml', '.pdf'}
SECRET_PATTERNS = {
    'private key': rb'-----BEGIN (?:[A-Z0-9]+ )*PRIVATE KEY-----',
    'GitHub token': rb'\b(?:gh[pousr]_[A-Za-z0-9]{36,}|github_pat_[A-Za-z0-9_]{40,})\b',
    'cloud access key': rb'\bAKIA[A-Z0-9]{16}\b',
    'OpenAI key': rb'\bsk-(?:proj-)?[A-Za-z0-9_-]{40,}\b',
    'Slack token': rb'\bxox[baprs]-[A-Za-z0-9-]{20,}\b',
    'credential in URL': rb'''https?://[^\s/<>"']+:[^\s/@<>"']+@''',
}


def stage(destination):
    destination = Path(destination).resolve()
    if destination.exists():
        raise ValueError('Output directory already exists; choose a new directory.')
    paths = [ROOT / name for name in PUBLIC_FILES]
    for directory in PUBLIC_DIRS:
        base = ROOT / directory
        if base.is_symlink():
            raise ValueError(f'Symlink in public files: {directory}')
        for path in sorted(base.rglob('*')):
            if path.is_symlink():
                raise ValueError(f'Symlink in public files: {path.relative_to(ROOT)}')
            if path.is_file():
                paths.append(path)
    public = []
    for path in paths:
        relative = path.relative_to(ROOT)
        if path.is_symlink():
            raise ValueError(f'Symlink in public files: {relative}')
        if any(part.startswith('.') for part in relative.parts):
            continue
        if path.suffix.lower() not in PUBLIC_SUFFIXES:
            continue
        if path.name.lower() in {'credentials', 'credentials.json', 'secrets.json', 'id_rsa', 'id_ed25519'}:
            raise ValueError(f'Credential filename in public files: {relative}')
        data = path.read_bytes()
        for label, pattern in SECRET_PATTERNS.items():
            if re.search(pattern, data):
                # Never print the matched credential in logs.
                raise ValueError(f'Possible {label} in {relative}; packaging stopped.')
        public.append(path)
    destination.mkdir(parents=True)
    for path in public:
        target = destination / path.relative_to(ROOT)
        target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(path, target)
    print(f'Packaged {len(public)} public files into {destination}')


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('destination', help='A new directory for the public artifact')
    stage(parser.parse_args().destination)
