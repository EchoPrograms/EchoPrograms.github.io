"""Validation for author-supplied public links."""
from pathlib import Path
from urllib.parse import urlsplit, unquote


def public_link(value, root, *, must_exist=False, external_only=False, image=False):
    if not isinstance(value, str) or not value.strip() or any(c in value for c in '\r\n\t\\'):
        raise ValueError('Provide a nonempty public URL or local path.')
    url = urlsplit(value)
    if url.scheme or url.netloc:
        if url.scheme != 'https' or not url.hostname or url.username or url.password:
            raise ValueError('External links must use HTTPS without credentials.')
        if image:
            raise ValueError('Store project images locally under assets/.')
        return value
    if external_only:
        raise ValueError('Source links must be public HTTPS URLs.')
    path = unquote(url.path)
    if not path or path.startswith('/') or any(part.startswith('.') for part in Path(path).parts):
        raise ValueError('Use a repository-relative path without .., such as Projects/Demo/index.html.')
    if Path(path).parts[0] not in ('Projects', 'assets', 'blog', 'portfolio'):
        raise ValueError('Local links must be inside Projects/, assets/, blog/, or portfolio/.')
    if image and (not path.startswith('assets/') or Path(path).suffix.lower() not in ('.png','.jpg','.jpeg','.webp','.gif','.svg','.avif')):
        raise ValueError('Images must be supported image files under assets/.')
    resolved = (root / path).resolve()
    if not resolved.is_relative_to(root.resolve()):
        raise ValueError('Local link points outside the repository.')
    if must_exist and not resolved.exists():
        raise ValueError(f'Local file does not exist: {path}')
    if must_exist and not image:
        if resolved.is_dir() and not (resolved / 'index.html').is_file():
            raise ValueError('A local demo directory must contain index.html.')
        if resolved.is_file() and resolved.suffix.lower() != '.html':
            raise ValueError('A local demo must be an HTML page.')
    return value
