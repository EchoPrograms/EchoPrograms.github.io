{
  "title": "SysReptor security reporting deployment",
  "date": "2026-09-07",
  "category": "Project",
  "tags": ["Docker", "Linux", "Nginx", "SysReptor"],
  "summary": "Installing SysReptor locally with a dedicated Nginx Docker reverse proxy and hosts-file mapping.",
  "slug": "sysreptor-security-reporting-deployment",
  "imported": true
}
---


## Overview

I set up SysReptor as a locally hosted platform for creating structured security and CTF reports. The deployment uses the project’s installation script to configure the application and its supporting containers, then places a dedicated Nginx Docker container in front of it as a reverse proxy.

## Installation

The installation was intentionally straightforward. I downloaded the SysReptor deployment files, ran the provided install script, and verified that the application and its supporting services started correctly. The script handled the Docker-based application setup, so I did not need to build each component manually.

After installation, I checked the local service from the host and confirmed that the web interface responded before adding the Nginx route.

## Nginx reverse proxy

<figure class="topology-figure">
<div class="topology-scroll" role="region" aria-label="Nginx reverse proxy diagram; scroll horizontally on small screens" tabindex="0"><img src="/assets/sysreptor-local-access.svg" width="900" height="440" loading="lazy" alt="The hosts file resolves the hostname locally; the dedicated Nginx container forwards browser requests to SysReptor."></div>
<figcaption>The hosts file resolves the hostname locally; the dedicated Nginx container forwards browser requests to SysReptor. <a href="/assets/sysreptor-local-access.svg">Open full-size diagram</a>.</figcaption>
</figure>

I created a separate Docker container running Nginx specifically for this service and configured it to accept requests for `sysreptor.brogano.dev`, then forward them to SysReptor. I added the domain alongside `localhost` in my hosts file so it resolves to the local machine.

The setup process was:

- Create an Nginx server block for `sysreptor.brogano.dev`.
- Run the reverse proxy in its own Docker container.
- Map the domain to the local loopback address in the hosts file.
- Configure Nginx to forward requests to the local SysReptor service.
- Start the Nginx container with the new configuration.
- Open the hostname in a browser to verify the local route.

This gives the application a stable local hostname while keeping the SysReptor service and reverse proxy separated into their own containers. Nginx handles the incoming request and forwards it to SysReptor, so the application does not need to manage the hostname itself.

## Result

SysReptor is available locally at `sysreptor.brogano.dev` through the dedicated Nginx Docker reverse proxy. The project demonstrates a repeatable self-hosted deployment using Docker, a provided installation workflow, a hosts-file mapping, and a conventional Linux web-proxy configuration.
