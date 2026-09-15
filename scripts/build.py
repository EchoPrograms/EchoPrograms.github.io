"""Generate the portfolio and Markdown writeups. Run from any directory."""
from pathlib import Path
from html import escape as esc
from urllib.parse import quote
from datetime import date
import json
import re
import xml.etree.ElementTree as ET
import markdown
from content import public_link

ROOT = Path(__file__).resolve().parent.parent
site = json.loads((ROOT / 'content/site.json').read_text())
for project in site['projects']:
    date.fromisoformat(project['date'])
    public_link(project['path'], ROOT, must_exist=True)
    if project.get('writeup'):
        public_link(project['writeup'], ROOT, must_exist=True)
    if project.get('source'):
        public_link(project['source'], ROOT, external_only=True)
    if project.get('image'):
        public_link(project['image'], ROOT, must_exist=True, image=True)
site['projects'].sort(key=lambda project: date.fromisoformat(project['date']), reverse=True)
posts = []
for source in (ROOT / 'content/posts').glob('*.md'):
    header, body = source.read_text().split('\n---\n', 1)
    post = json.loads(header)
    if not re.fullmatch(r'[a-z0-9]+(?:-[a-z0-9]+)*', post['slug']):
        raise ValueError(f'Invalid slug in {source}')
    date.fromisoformat(post['date'])
    if post['category'] not in ('Project', 'CTF', 'Notes'):
        raise ValueError(f'Invalid category in {source}')
    post['html'] = markdown.markdown(body, extensions=['fenced_code', 'tables', 'toc'])
    post['minutes'] = max(1, round(len(body.split()) / 200))
    posts.append(post)
posts.sort(key=lambda p: p['date'], reverse=True)
if len({p['slug'] for p in posts}) != len(posts):
    raise ValueError('Duplicate post slug')

def tags(values):
    return ''.join(f'<span class="tag">{esc(v)}</span>' for v in values)

def external_links_new_tab(html):
    def add_attrs(match):
        attrs = match.group(1)
        if 'target=' in attrs:
            return match.group(0)
        return f'<a{attrs} target="_blank" rel="noopener noreferrer">'
    return re.sub(r'<a(\s+[^>]*href="(?:https://[^\"]+|[^\"]+\.pdf(?:#[^\"]*)?)"[^>]*)>', add_attrs, html, flags=re.IGNORECASE)

def shell(title, description, content, active='', prefix='../'):
    links = ''.join(f'<a href="{prefix}{url}"' + (' aria-current="page"' if active == label else '') + f'>{label}</a>' for label, url in [('Home', ''), ('Portfolio', 'portfolio/'), ('Writeups', 'blog/'), ('Info', 'info/')])
    document = f'''<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>{esc(title)} · {esc(site['handle'])}</title><meta name="description" content="{esc(description, quote=True)}">
<meta property="og:title" content="{esc(title, quote=True)} · {esc(site['handle'], quote=True)}">
<meta property="og:description" content="{esc(description, quote=True)}"><meta property="og:type" content="website"><meta property="og:site_name" content="EchoPrograms">
<meta name="theme-color" content="#0a0a0a"><link rel="stylesheet" href="{prefix}assets/site.css">
<link rel="icon" href="{prefix}assets/favicon.svg" type="image/svg+xml">
<link rel="alternate" type="application/atom+xml" title="EchoPrograms writeups" href="{prefix}feed.xml">
<script src="{prefix}assets/site.js" defer></script></head>
<body><a class="skip" href="#main">Skip to content</a><header class="site-header"><nav class="container nav" aria-label="Main navigation">
<a class="wordmark" href="{prefix}">EchoPrograms</a><div class="nav-links">{links}<a href="https://github.com/{esc(site['github'])}">GitHub <span aria-hidden="true">↗</span></a></div></nav></header>
<main id="main" class="container">{content}</main><footer class="container footer"><span>Brogan / EchoPrograms</span><div><a href="{prefix}feed.xml">Atom feed</a><a href="{prefix}legacy/index.html">Legacy site ↗</a><a href="{prefix}ai-use/">AI use</a><a href="https://github.com/{esc(site['github'])}/EchoPrograms.github.io">Source ↗</a></div></footer></body></html>'''
    return external_links_new_tab(document)

def art(kind):
    # Decorative diagrams represent each project's subject, not screenshots.
    shapes = ''
    if kind == 'network':
        layers = [[(55 + i * 85, 25 + j * 35 + (5-n)*17) for j in range(n)] for i,n in enumerate([3,5,5,2])]
        shapes = ''.join(f'<line x1="{x}" y1="{y}" x2="{a}" y2="{b}"/>' for l,r in zip(layers,layers[1:]) for x,y in l for a,b in r)
        shapes += ''.join(f'<circle cx="{x}" cy="{y}" r="5"/>' for layer in layers for x,y in layer)
    elif kind == 'cluster':
        shapes = '<path d="M52 122H308M180 122V151" fill="none" opacity=".6"/>'
        for x in [32, 96, 160, 224, 288]:
            shapes += f'<path d="M{x+20} 105V122" fill="none" opacity=".6"/>'
            shapes += f'<rect x="{x}" y="48" width="40" height="57" rx="3" fill="#15201d"/>'
            for y in [57, 72, 87]:
                shapes += f'<rect x="{x+6}" y="{y}" width="28" height="10" rx="1" fill="#243b33"/>'
                shapes += f'<circle cx="{x+28}" cy="{y+5}" r="1.5" stroke="none"/>'
            shapes += f'<circle cx="{x+20}" cy="122" r="2.5"/>'
        shapes += '<rect x="156" y="145" width="48" height="14" rx="2" fill="#243b33"/><path d="M164 152h5m5 0h5m5 0h5m5 0h3" fill="none" stroke="#a1c9bb"/>'
    elif kind == 'git':
        shapes = '<path d="M93 142H265M93 142V49M93 112C93 86 190 106 190 72V49M190 72C190 101 265 90 265 119V142" fill="none" stroke-width="2"/>'
        shapes += ''.join(f'<circle cx="{x}" cy="{y}" r="6" fill="#243b33" stroke-width="1.5"/>' for x,y in [(93,49),(93,93),(93,142),(150,142),(208,142),(265,142),(190,49),(190,72)])
    elif kind == 'sysreptor':
        shapes = '<rect x="62" y="62" width="86" height="66" rx="3" fill="#15201d"/><rect x="212" y="62" width="86" height="66" rx="3" fill="#15201d"/><path d="M148 95H212" fill="none" stroke-width="2"/><path d="M79 81h52m-52 14h38m-38 14h45M229 81h52m-52 14h38m-38 14h45" fill="none" stroke="#a1c9bb"/><circle cx="158" cy="95" r="4"/><circle cx="202" cy="95" r="4"/>'
    elif kind == 'report':
        shapes = '<path d="M123 33H211L237 59V157H123Z" fill="#15201d" stroke-width="1.2"/><path d="M211 33V59H237" fill="none"/>'
        for y in [78, 104, 130]:
            shapes += f'<rect x="141" y="{y-6}" width="9" height="9" fill="#243b33"/><path d="M160 {y-4}H217M160 {y+3}H201" fill="none" stroke="#8abeb0"/>'
    elif kind == 'particles':
        import random
        rng = random.Random(19)
        for cx,cy,c in [(100,85,'#78a99a'),(225,105,'#779fc2'),(290,55,'#b1a382')]:
            shapes += ''.join(f'<circle cx="{rng.gauss(cx,24):.1f}" cy="{rng.gauss(cy,24):.1f}" r="2" style="fill:{c};stroke:none"/>' for _ in range(100))
    elif kind == 'sand':
        import random
        rng = random.Random(7)
        for col in range(46):
            height = max(0, int(17 - abs(col-23)*0.75 + rng.uniform(-2,2)))
            for row in range(height):
                color = rng.choice(['#a89a72','#c3b487','#8f8261','#d5c698'])
                shapes += f'<rect x="{43+col*6}" y="{157-row*6}" width="5" height="5" style="fill:{color};stroke:none"/>'
        shapes += ''.join(f'<rect x="{174+rng.randrange(-8,9)}" y="{y}" width="4" height="4" style="fill:#c3b487;stroke:none"/>' for y in range(18,70,9))
    else:
        shapes = '<text x="180" y="110" text-anchor="middle" fill="currentColor" stroke="none" font-size="50" font-family="Fragment Mono,monospace">&lt;/&gt;</text>'
    return f'<svg class="project-art" viewBox="0 0 360 190" aria-hidden="true">{shapes}</svg>'

def card(p, prefix):
    project_date = date.fromisoformat(p['date'])
    display_date = f"{project_date:%b} {project_date.day}, {project_date.year}"
    external = p['path'].startswith('https://')
    demo = p['path'] if external else prefix + quote(p['path'], safe='/#?=&')
    source = p.get('source')
    if not source and not external:
        source = f"https://github.com/{site['github']}/EchoPrograms.github.io/tree/main/{quote(str(Path(p['path']).parent))}"
    source_link = f'<a href="{esc(source, quote=True)}">Source ↗</a>' if source else ''
    open_label = p.get('linkLabel', 'Open demo')
    action_url = demo
    if p.get('writeup'):
        action_url = p['writeup'] if p['writeup'].startswith('https://') else prefix + quote(p['writeup'], safe='/#?=&')
        open_label = 'Open writeup'
    visual = (f'<img class="project-image" src="{prefix}{quote(p["image"])}" alt="" loading="lazy">'
              if p.get('image') else art(p.get('art', 'code')))
    return f'''<article class="project-card"><a class="art-link" tabindex="-1" aria-hidden="true" href="{esc(demo, quote=True)}">{visual}</a><div class="card-body"><span class="eyebrow">{esc(p['category'])}</span><h3><a class="project-primary" href="{esc(demo, quote=True)}">{esc(p['title'])}</a></h3><time class="project-date" datetime="{project_date.isoformat()}">{display_date}</time><p>{esc(p['description'])}</p><div class="tags">{tags(p['tags'])}</div><div class="project-links"><a href="{esc(action_url, quote=True)}">{esc(open_label)} →</a>{source_link}</div></div></article>'''

def post_row(p, prefix):
    searchable = esc(' '.join([p['title'],p['summary'],*p['tags']]), quote=True)
    imported = '<span class="import-label">AI Generated Writeups Imported from Chat History</span>' if p.get('imported') else ''
    return f'''<article class="post-row" data-category="{esc(p['category'])}" data-search="{searchable}"><div class="post-meta"><span class="eyebrow">{esc(p['category'])}</span>{imported}<time datetime="{p['date']}">{p['date']}</time></div><div><h3><a href="{prefix}blog/{p['slug']}/">{esc(p['title'])} <span aria-hidden="true">↗</span></a></h3><p>{esc(p['summary'])}</p><div class="tags">{tags(p['tags'])}<span class="read-time">{p['minutes']} min read</span></div></div></article>'''

empty = '<div class="empty-state"><p>No writeups published yet.</p></div>'
experience = markdown.markdown((ROOT / 'content/pages/professional-experience.md').read_text(), extensions=['fenced_code', 'tables', 'md_in_html'])
home = f'''<section class="hero" aria-labelledby="intro-title">
<div><h1 id="intro-title">Brogan Oberhaus</h1>
<p class="hero-description">I'm a cybersecurity student interested in software development, pentesting, reverse engineering, embedded security, Linux systems, robotics, and embedded hardware development.</p>
<p class="hero-description">This site contains my programming projects and technical writeups.</p>
<div class="actions"><a class="button" href="portfolio/">View projects</a><a class="text-link" href="blog/">Read writeups →</a></div></div>
<aside class="profile-summary" aria-labelledby="summary-title"><h2 id="summary-title">Background</h2><dl>
<dt>Programming Languages</dt><dd>C, C++, C#, JavaScript, Java, Python, SQL, Bash, and more</dd>
<dt>Software</dt><dd>Unity, Blender, GDB, Neovim, VSCode, PlatformIO, dnSpy, tmux, and more</dd>
<dt>Systems</dt><dd>Linux, virtualization, containerization, Proxmox, network infrastructure, and self-hosted services</dd>
<dt>Security</dt><dd>Hack The Box and authorized CTF labs</dd>
<dt>Hardware</dt><dd>FRC robotics and ESP32 development</dd>
</dl></aside></section>
<section class="section" aria-labelledby="professional-experience"><div class="section-heading"><h2 id="professional-experience">Professional Experience</h2></div><div class="employment-grid">{experience}</div></section>
<section class="section" aria-labelledby="work-title"><div class="section-heading"><h2 id="work-title">Projects</h2><a class="text-link" href="portfolio/">View portfolio →</a></div><div class="project-grid">{''.join(card(p,'') for p in site['projects'][:3])}</div></section>
<section class="section" aria-labelledby="writing-title"><div class="section-heading"><h2 id="writing-title">Writeups</h2><a class="text-link" href="blog/">All writeups →</a></div><p class="section-description">Project documentation, CTF walkthroughs, and technical notes.</p>{''.join(post_row(p,'') for p in posts[:3]) or empty}</section>
<section class="section" aria-labelledby="activity-title"><div class="section-heading"><h2 id="activity-title">GitHub activity</h2></div>
<div class="activity-grid"><article class="activity-card" data-github="{esc(site['github'])}"><div class="card-heading"><h3>GitHub</h3><a href="https://github.com/{esc(site['github'])}">@{esc(site['github'])} ↗</a></div>
<div class="stats"><div><strong data-stat="public_repos">—</strong><span>Public repos</span></div><div><strong data-stat="followers">—</strong><span>Followers</span></div><div><strong data-stat="public_gists">—</strong><span>Public gists</span></div></div>
<p class="status" data-github-status role="status">View the GitHub profile for current metrics.</p>
<div class="contributions"><div class="card-heading"><h3>Contribution history</h3><a href="https://github.com/{esc(site['github'])}?tab=overview">View on GitHub ↗</a></div>
<div class="contribution-scroll" role="region" aria-label="GitHub contribution graph; scroll horizontally on small screens" tabindex="0"><img data-contribution-chart src="https://ghchart.rshah.org/{quote(site['github'], safe='')}" alt="{esc(site['github'])}'s GitHub contribution graph for the past year" width="663" height="104" decoding="async" referrerpolicy="no-referrer"></div>
<p class="status" data-chart-error role="status" hidden>Contribution graph unavailable. View the current graph on GitHub.</p></div></article>
</div></section>
<section class="about section" id="about" aria-labelledby="about-title"><h2 id="about-title">About</h2>
<p>I started programming with web development at age seven. Since then, I've worked with software, Linux administration, networking, robotics, and embedded hardware. I use Arch and Neovim btw.</p>
<div class="experience-grid">
<div><h3>Linux and infrastructure</h3><p>I use Proxmox, KVM/QEMU, and Docker in my homelab. My work includes virtual-machine networking, storage, DNS, reverse proxies, and maintaining self-hosted services.</p></div>
<div><h3>Cybersecurity</h3><p>I practice web enumeration, Linux privilege escalation, and binary-exploitation fundamentals in authorized labs and CTFs. I'm also interested in embedded reverse engineering, hardware-backed authentication, and isolated security environments.</p></div>
<div><h3>Robotics</h3><p>My FRC experience includes Java and WPILib, swerve drive, autonomous path planning, vision-assisted localization, and PID and feedforward control.</p></div>
<div><h3>Embedded systems</h3><p>I've worked with ESP32 development, PlatformIO, servos, sensors, and GPIO. My interests include integrating firmware with mechanical and electronic hardware.</p></div>
</div></section>'''
(ROOT / 'index.html').write_text(shell('Portfolio & writeups', 'Brogan’s programming portfolio, project notes, and CTF writeups. JavaScript experiments, systems, and security.', home, 'Home', './'))
portfolio = f'''<section class="page-intro"><h1>Projects</h1><p>Software, infrastructure, and security projects, with demos and technical writeups.</p></section><div class="project-grid portfolio-grid">{''.join(card(p,'../') for p in site['projects'])}</div><p class="archive-note"><a class="text-link" href="../legacy/Html/projects.html">Older projects are in the legacy archive →</a></p>'''
(ROOT / 'portfolio/index.html').write_text(shell('Portfolio', 'Software, infrastructure, and security projects by Brogan Oberhaus.', portfolio, 'Portfolio'))
blog = f'''<section class="page-intro"><h1>Writeups</h1><p>Project documentation, CTF walkthroughs, and technical notes.</p></section><div class="blog-tools" hidden><div class="filters" role="group" aria-label="Filter writeups">{''.join(f'<button type="button" data-filter="{x}" aria-pressed="{str(x == "All").lower()}">{x}</button>' for x in ['All','Project','CTF','Notes'])}</div><label class="search"><span class="sr-only">Search writeups</span><input type="search" id="post-search" placeholder="Search writeups…"></label></div><div id="post-list">{''.join(post_row(p,'../') for p in posts) or empty}</div><p id="filter-status" class="status" role="status"></p><div id="no-results" class="empty-state" hidden><h2>No matching writeups.</h2><p>Try another search or category.</p></div>'''
(ROOT / 'blog/index.html').write_text(shell('Writeups', 'Project documentation, CTF walkthroughs, and technical notes by Brogan.', blog, 'Writeups'))
for p in posts:
    directory = ROOT / 'blog' / p['slug']
    directory.mkdir(exist_ok=True)
    imported = '<p class="import-label">AI Generated Writeups Imported from Chat History</p>' if p.get('imported') else ''
    article = f'''<article class="article"><a class="text-link" href="../">← All writeups</a><header class="article-header">{imported}<p class="eyebrow">{esc(p['category'])} / <time datetime="{p['date']}">{p['date']}</time> / {p['minutes']} min read</p><h1>{esc(p['title'])}</h1><p class="lede">{esc(p['summary'])}</p><div class="tags">{tags(p['tags'])}</div></header><div class="prose">{p['html']}</div></article>'''
    (directory / 'index.html').write_text(shell(p['title'], p['summary'], article, 'Writeups', '../../'))
# Informational page: authored in Markdown and included in the static artifact.
ai_page = ROOT / 'ai-use'
ai_page.mkdir(exist_ok=True)
ai_body = markdown.markdown((ROOT / 'content/pages/ai-use.md').read_text(), extensions=['fenced_code', 'tables'])
(ai_page / 'index.html').write_text(shell('AI use', 'How AI was used in the design, code, content, and testing of this website.',
    f'<article class="article"><header class="article-header"><h1>AI use</h1></header><div class="prose">{ai_body}</div></article>'))
info_page = ROOT / 'info'
info_page.mkdir(exist_ok=True)
info_body = markdown.markdown((ROOT / 'content/pages/info.md').read_text(), extensions=['fenced_code', 'tables'])
(info_page / 'index.html').write_text(shell('Info', 'How I approach learning, projects, and AI-assisted work on this site.',
    f'<article class="article"><header class="article-header"><h1>Info</h1></header><div class="prose">{info_body}</div></article>', 'Info'))
# Generate feed and sitemap from published content only.
atom = 'http://www.w3.org/2005/Atom'
ET.register_namespace('', atom)
feed = ET.Element(f'{{{atom}}}feed')
def element(parent, name, value):
    ET.SubElement(parent, f'{{{atom}}}{name}').text = value
base = site['url'].rstrip('/')
element(feed, 'title', 'EchoPrograms · Writeups')
element(feed, 'id', base + '/blog/')
element(feed, 'updated', (posts[0]['date'] if posts else '2026-09-14') + 'T00:00:00Z')
ET.SubElement(feed, f'{{{atom}}}link', href=base+'/feed.xml', rel='self')
ET.SubElement(feed, f'{{{atom}}}link', href=base+'/blog/')
author = ET.SubElement(feed, f'{{{atom}}}author')
element(author, 'name', site['name'])
for p in posts:
    entry = ET.SubElement(feed, f'{{{atom}}}entry')
    element(entry, 'title', p['title'])
    element(entry, 'id', base+'/blog/'+p['slug']+'/')
    element(entry, 'updated', p['date']+'T00:00:00Z')
    element(entry, 'summary', p['summary'])
    ET.SubElement(entry, f'{{{atom}}}link', href=base+'/blog/'+p['slug']+'/')
ET.ElementTree(feed).write(ROOT/'feed.xml', encoding='utf-8', xml_declaration=True)
ns = 'http://www.sitemaps.org/schemas/sitemap/0.9'
root = ET.Element('urlset', xmlns=ns)
for path in ['', 'portfolio/', 'blog/', 'info/', 'ai-use/', *['blog/'+p['slug']+'/' for p in posts], *[quote(p['path']) for p in site['projects'] if not p['path'].startswith('https://')]]:
    ET.SubElement(ET.SubElement(root,'url'),'loc').text = base+'/'+path
ET.ElementTree(root).write(ROOT/'sitemap.xml', encoding='utf-8', xml_declaration=True)
print(f'Built homepage, portfolio, blog, {len(posts)} writeups, feed, and sitemap.')
