# Adding and editing content

Run commands from the repository root with the virtual environment activated. See [setup in the README](../README.md#setup).

## Add a project

First put the demo files under `Projects/YourProject/`, or have a public HTTPS demo URL ready. Then run:

```sh
python scripts/site.py new-project
```

The helper asks for the title, demo path, description, category, tags, and date. The default date is today; enter the actual project date if different. It adds the project to `content/site.json` and rebuilds the homepage and portfolio.

You can also supply the answers as flags:

```sh
python scripts/site.py new-project "My simulation" \
  --path "Projects/MySimulation/index.html" \
  --description "A cellular automaton with editable rules." \
  --category "Simulation" \
  --tags "JavaScript,Canvas" \
  --date "2026-09-14"
```

For a project hosted elsewhere:

```sh
python scripts/site.py new-project "Robot dashboard" \
  --path "https://example.com/dashboard/" \
  --source "https://github.com/your-name/your-repo" \
  --description "A dashboard for viewing robot telemetry." \
  --category "Robotics" \
  --tags "Java,Telemetry" \
  --date "2026-09-14"
```

Replace the example URLs with real public URLs. The helper checks that local HTML demo files exist and rejects duplicate project titles or paths. It does not verify the availability of an external website.

### Images

Save a screenshot under `assets/`, then add `--image "assets/my-simulation.png"` to the command. Supported formats are PNG, JPG, JPEG, WebP, GIF, SVG, and AVIF. Images are displayed without cropping. Use public screenshots with no credentials or private details.

Without an image, a new project gets a simple code illustration. The three existing projects retain their custom diagrams.

### Edit or reorder a project

Edit its object in `content/site.json`, then save and refresh the helper preview or run `python scripts/site.py build`.

| Field | Meaning |
| --- | --- |
| `title` | Project name |
| `description` | Short factual description |
| `category` | Category label, such as Software or Simulation |
| `tags` | Array of technologies or subjects |
| `date` | Project date in `YYYY-MM-DD` format |
| `path` | Repository-relative demo HTML path or public HTTPS URL |
| `source` | Optional public source-repository HTTPS URL |
| `writeup` | Optional article path, such as `blog/forgejo-self-hosted-git-service/index.html`. The card opens `path`; its bottom action becomes “Open writeup”. |
| `image` | Optional screenshot path under `assets/` |
| `art` | Illustration when there is no image: `code`, `particles`, `sand`, `network`, `cluster`, `git`, `sysreptor`, or `report` |

For a local demo, the source link defaults to its folder in this GitHub repository. For an external demo, the source link is shown only when you supply `source`.

Projects appear newest first by `date` on both the homepage and portfolio. Projects with the same date retain their JSON array order. There is no fixed limit of three projects.

To remove a card, remove its object and rebuild. Its demo files remain available unless you delete them separately, preserving any existing archive links.

## Add a writeup

Run the guided command:

```sh
python scripts/site.py new-writeup
```

Or provide the metadata directly:

```sh
python scripts/site.py new-writeup "Building my simulation" \
  --category Project \
  --summary "How the grid update rules and rendering work." \
  --tags "JavaScript,Simulation" \
  --date "2026-09-14"
```

Use category `Project`, `CTF`, or `Notes`. The title becomes a lowercase, hyphenated slug: the example creates `content/drafts/building-my-simulation.md`.

Open that file in your editor. The first block is JSON metadata. Keep the line containing `---` between the metadata and the Markdown body:

```markdown
{
  "title": "Building my simulation",
  "date": "2026-09-14",
  "category": "Project",
  "tags": ["JavaScript", "Simulation"],
  "summary": "How the grid update rules and rendering work.",
  "slug": "building-my-simulation"
}
---
## Overview

Describe the project here.

## Implementation

Explain the decisions and relevant code.
```

Use `##` for sections; the page already displays the title as its main heading. You can use lists, links, fenced code blocks, tables, and images:

````markdown
[Open the demo](/Projects/MySimulation/index.html)

![The simulation grid](/assets/my-simulation.png)

```javascript
const nextState = update(grid);
```

| Setting | Purpose |
| --- | --- |
| Grid size | Number of cells |
````

Root-relative links starting with `/assets/` or `/Projects/` work from nested writeup URLs on this GitHub Pages user site. Include descriptive image alt text. Markdown supports raw HTML and should contain only trusted author content.

### Add the draft to the local blog

After replacing the template text:

```sh
python scripts/site.py publish building-my-simulation
```

This moves the file from `content/drafts/` to `content/posts/` and rebuilds. The page is now at `/blog/building-my-simulation/` in the local preview. It also appears in search, category filters, the feed, and the sitemap. Posts are sorted newest first; the homepage shows the latest three.

This command does **not** deploy the site. Drafts are not included in the browser preview. To inspect a draft as a page, use the local `publish` command, then review it before committing or pushing.

### Edit, rename, or remove a writeup

- Edit the Markdown in `content/posts/` and rebuild, or save and refresh the helper preview.
- Changing a title does not require changing the slug. Keeping the slug preserves incoming links.
- To change a slug, update the metadata and filename together, remove the old generated `blog/old-slug/` directory, and rebuild. Existing links to the old URL will need updating.
- To unpublish, move the source back to `content/drafts/`, remove its generated `blog/slug/` directory, and rebuild. Removing the source alone does not remove an already generated article.

Do not store private reports, flags, tokens, or unpublished challenge material in a public repository, even in drafts. Add an AI-use note to a writeup when relevant, describing what assistance was used.

## Preview and publish the website

```sh
python scripts/site.py preview
```

Open **http://localhost:8002**. Save changes and refresh the browser; the helper detects changes to published content, project settings, images, and demo files and rebuilds as needed. It serves the same public files as deployment. This is a local development tool; the deployed site still consists only of static files.

If the port is occupied:

```sh
python scripts/site.py preview --port 8003
```

A failed rebuild is reported in the terminal. The preview keeps the last successful version until you fix the error and refresh. Changes to the helper's own Python implementation require restarting it.

Before publishing, check dates, links, images, and page content in the preview. Then:

```sh
python scripts/site.py build
git status --short
git diff
```

Review and commit the source and generated changes together. Push to `main` when ready; the GitHub Actions workflow deploys the public artifact. None of the content-helper commands commits or pushes for you.

## Edit the homepage

Edit the `home` template in `scripts/build.py` for the introduction, Background, and About text, then run `python3 scripts/build.py`. Do not edit the generated root `index.html`: the next build replaces it. Project cards come from `content/site.json`, and internship cards come from `content/pages/professional-experience.md`.

## Edit the AI-use page

Edit `content/pages/ai-use.md` and rebuild, or save and refresh the preview. Its generated page is `/ai-use/`, linked from the shared footer. Update it when the site's use of AI changes.

## Edit professional experience

Edit `content/pages/professional-experience.md` and rebuild. This content appears under Professional Experience on the main page, directly below Writeups. Keep internships in newest-first order and include their date ranges.

Each internship uses an `<article class="employment-card" markdown="1">` block. Copy an existing block to add an entry, update its header and tags, and write the description in Markdown inside it. The cards stack automatically on smaller screens.

## Troubleshooting

- **`No module named markdown`:** activate `.venv` and install `requirements.txt` with that environment's pip.
- **Invalid date:** use `YYYY-MM-DD`, such as `2026-09-14`.
- **Missing local demo:** add the demo's HTML file before creating the project, or use its public HTTPS URL.
- **Duplicate slug/title:** choose a different title or edit the existing entry instead.
- **JSON parsing error:** check quotes and commas in the metadata or `content/site.json`.
- **No new writeup in the preview:** drafts are excluded; run `publish SLUG` to add it to the local blog.
- **Old article still reachable:** remove the old generated article directory as described above.

Use `python scripts/site.py --help` or `python scripts/site.py new-project --help` for command options.
