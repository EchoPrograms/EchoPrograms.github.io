# EchoPrograms

A static portfolio and Markdown blog using the original dark theme and Fragment Mono font. The site is served by GitHub Pages. There is no application server, account system, or browser-side API token.

## Setup

From this repository:

```sh
python3 -m venv .venv
.venv/bin/pip install -r requirements.txt
source .venv/bin/activate
```

Activate the environment in each new terminal before using the helper. Python 3.10 or newer is required.

## Common commands

```sh
# Answer a few prompts to add a project.
python scripts/site.py new-project

# Create a Markdown draft using prompts.
python scripts/site.py new-writeup

# After editing the draft, add it to the local blog.
python scripts/site.py publish my-writeup-slug

# Preview; save your edits and refresh the browser to rebuild.
python scripts/site.py preview

# Generate the static HTML without starting a server.
python scripts/site.py build
```

Preview opens a local server at **http://localhost:8002**. Open that URL in your browser. Use `--port 8003` if the port is occupied; press Ctrl+C to stop it. It serves only public files, not the repository or drafts. If a rebuild fails, the terminal reports the error and the last successful preview remains available.

**[Read the authoring guide](docs/AUTHORING.md)** for examples, screenshots, dates, editing, drafts, removing content, and deployment.

## Content locations

| Content | File or folder |
| --- | --- |
| Projects, project dates, GitHub username | `content/site.json` |
| Draft writeups | `content/drafts/*.md` |
| Published writeup sources | `content/posts/*.md` |
| AI-use disclosure | `content/pages/ai-use.md` |
| Images and shared styles/scripts | `assets/` |
| Browser demos | `Projects/` |
| Generated pages | `index.html`, `portfolio/`, `blog/`, `ai-use/` |

Edit source content, then rebuild. Generated pages are overwritten by the build.

## Publishing

The helper's `publish` command only adds a draft to the **local** blog. It does not commit, push, or deploy. After reviewing your changes, commit the content and generated output together. Pushing to `main` triggers the existing GitHub Pages workflow.

The workflow uploads a public-file package created by `scripts/stage.py`. It excludes `content/`, `docs/`, `scripts/`, dotfiles, Markdown source, and local environments. Drafts remain visible if committed to a public repository, so keep private material outside this repository.

Packaging rejects symlinks and recognizable credential patterns without logging matched values. This limited check does not replace reviewing text, images, and downloads for sensitive information.

## GitHub activity

Public metrics refresh in the browser on every page load without credentials. Previously fetched values appear while the request runs and serve as a labeled fallback if it fails. Requests time out after eight seconds.

The contribution image comes from [GitHub Chart API](https://github.com/2016rshah/githubchart-api). It uses only the public username; refresh timing depends on that service's cache. It represents contributions, not only commits. No third-party JavaScript is loaded.

## Legacy site

The original pages and styles remain in `legacy/`, linked from the footer. Existing demos remain in `Projects/` so bookmarked URLs continue working. The original `Html/`, `Stylesheets/`, and `Resources/` paths are retained. Archive project links were adjusted for the extra directory level.
