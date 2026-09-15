{
  "title": "Hardware-backed Linux authentication",
  "date": "2026-08-26",
  "category": "Project",
  "tags": ["Linux", "YubiKey", "FIDO2", "OpenSSH", "PAM", "Security"],
  "summary": "Integrating a YubiKey with Linux authentication, SSH, sudo, and the Hyprlock session lock screen.",
  "slug": "hardware-backed-linux-authentication",
  "imported": true
}
---


## Overview

I integrated a YubiKey 5C into my Linux authentication workflow. The setup uses FIDO2 and U2F credentials with OpenSSH, PAM, sudo, and Hyprlock.

The goal was to use hardware-backed authentication for everyday access while keeping the system usable when the key is unavailable.

## SSH and system authentication

I created resident FIDO-backed SSH keys and worked with downloading resident credentials. The configuration includes PIN and user-presence verification for the key, along with PAM U2F authentication for `sudo`.

<figure class="topology-figure">
<div class="topology-scroll" role="region" aria-label="Authentication diagram; scroll horizontally on small screens" tabindex="0"><img src="/assets/hardware-backed-authentication.svg" width="900" height="430" loading="lazy" alt="Diagram showing a YubiKey providing FIDO2 and U2F authentication to OpenSSH, sudo through PAM, and the Hyprlock lock screen on Linux."></div>
<figcaption>Hardware-backed authentication paths on the Linux system. <a href="/assets/hardware-backed-authentication.svg">Open full-size diagram</a>.</figcaption>
</figure>

The workflow also includes Linux device events and lock behavior when the key is removed. I tested how graphical lock-screen prompts behave and how authentication should fall back when the hardware key is not present.

## Result

The YubiKey is integrated into SSH access, privileged commands through `sudo`, and the Hyprlock session lock screen. The project combines FIDO2 credentials, PAM configuration, desktop-session behavior, and recovery considerations in one Linux authentication workflow.
