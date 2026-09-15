{
  "title": "Browser-accessible noVNC CTF workstation",
  "date": "2026-08-04",
  "category": "Project",
  "tags": ["Linux", "Docker", "VNC", "noVNC", "CTF"],
  "summary": "A local browser-accessible Linux workstation for Hack The Box and other authorized CTFs.",
  "slug": "novnc-local-ctf-workstation",
  "imported": true
}
---


## Overview

I built a browser-accessible Linux workstation for Hack The Box and other authorized CTFs. The workstation uses VNC for the desktop session, noVNC for the browser client, and websockify to connect the browser session to the VNC server.

This is a local box rather than a public hosted service. It is available at [pwnbox.brogano.dev](https://pwnbox.brogano.dev), a hostname that is accessible only through my Tailnet.

<figure class="topology-figure">
<div class="topology-scroll"><img class="writeup-image" src="/assets/novnc-workstation.png" alt="Parrot Linux desktop displayed through the pwnbox.brogano.dev browser workstation." width="1672" height="1102" loading="lazy"></div>
<figcaption>The browser-accessible Parrot Linux workstation used for local CTF work.</figcaption>
</figure>

## Setup

The environment runs in Docker and provides a Linux desktop that can be opened from a browser. The setup work included:

- Configuring a VNC display and desktop session.
- Selecting a usable desktop resolution.
- Serving the noVNC client through websockify.
- Routing the Tailnet hostname to the local workstation.
- Testing the interface from desktop and mobile browsers.

noVNC runs in the browser and communicates with the VNC server through websockify. This lets me access the desktop without installing a native VNC client on each device.

<figure class="topology-figure">
<div class="topology-scroll" role="region" aria-label="Workstation connection diagram; scroll horizontally on small screens" tabindex="0"><img src="/assets/novnc-workstation.svg" alt="Diagram showing a Tailnet browser connecting to noVNC, websockify, a VNC server, and the Linux CTF workstation." width="900" height="430" loading="lazy"></div>
<figcaption>Connection path from the Tailnet browser to the local Linux desktop. <a href="/assets/novnc-workstation.svg">Open full-size diagram</a>.</figcaption>
</figure>

## Testing

Desktop testing confirmed that the Linux desktop could be loaded through the browser route. Mobile testing exposed a separate usability concern: a client can display the desktop background while still failing to handle interactive input correctly.

That made viewport sizing, touch input, scaling, and session configuration part of the workstation design rather than treating them as cosmetic browser details.

## Use

The workstation gives me a consistent local environment for authorized Hack The Box labs and other CTF exercises. Keeping it on the Tailnet limits access to my own devices while still allowing browser access when I am working from a different computer or tablet.

## Result

The project combines Linux desktop hosting, Docker, VNC, WebSockets, browser-based remote access, and private network routing into one reusable CTF workstation.
