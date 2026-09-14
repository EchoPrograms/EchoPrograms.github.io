{
  "title": "Forgejo self-hosted Git service",
  "date": "2026-04-30",
  "category": "Project",
  "tags": ["Forgejo", "Git", "Linux", "Docker", "Self-hosting"],
  "summary": "Hosting personal Git repositories with Forgejo and integrating them into my development workflow.",
  "slug": "forgejo-self-hosted-git-service",
  "imported": true
}
---

## AI Generated Writeups Imported from Chat History

## Overview

I deployed Forgejo as a self-hosted Git service for hosting personal repositories and importing existing projects. It provides a private development platform under my control and gives my repositories a consistent place to live alongside the rest of my infrastructure.

The service runs in Docker on my cloud VM, `arminstance`, with web access through Cloudflare Tunnel. The Forgejo web interface provides repository browsing, account management, and project administration.

## Setup

<figure class="topology-figure">
<div class="topology-scroll" role="region" aria-label="Setup diagram; scroll horizontally on small screens" tabindex="0"><img src="/assets/forgejo-service.svg" width="900" height="445" loading="lazy" alt="Web access to Forgejo through Cloudflare Tunnel, with the service hosted in Docker on arminstance."></div>
<figcaption>Web access to Forgejo through Cloudflare Tunnel, with the service hosted in Docker on arminstance. <a href="/assets/forgejo-service.svg">Open full-size diagram</a>.</figcaption>
</figure>

The deployment work included:

- Hosting Forgejo on Linux infrastructure.
- Importing existing repositories into the service.
- Configuring repository and account access.
- Creating personal access tokens for Git operations that require them.
- Publishing Forgejo through a reverse proxy and domain route.
- Integrating the service into my normal development workflow.

When repositories were imported, I also checked author identity and contribution activity. Git records the author email in each commit, so the email configured in a repository affects how contributions are attributed in Forgejo and other Git hosting tools.

## Access

The Forgejo instance is available at [git.brogano.dev](https://git.brogano.dev).

## Result

Forgejo gives me a self-hosted Git service for maintaining repositories, reviewing project history, and managing development access. The project combines Git administration with Linux service hosting, reverse-proxy configuration, repository migration, and identity management.
