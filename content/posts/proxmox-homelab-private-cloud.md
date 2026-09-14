{
  "title": "Proxmox homelab and private cloud",
  "date": "2025-05-01",
  "category": "Project",
  "tags": ["Proxmox", "Linux", "Virtualization", "Networking", "Storage"],
  "summary": "A five-node Proxmox environment for virtual machines, containers, storage, monitoring, and self-hosted services.",
  "slug": "proxmox-homelab-private-cloud",
  "imported": true
}
---

## AI Generated Writeups Imported from Chat History

## Overview

I design and operate a five-node Proxmox VE cluster for personal infrastructure and technical experiments. It provides a single management layer for virtual machines and Linux containers while keeping storage local to each node.

The environment hosts monitoring, DNS, file storage, communication services, development tools, and other self-hosted applications. It is an active homelab that changes as I add services, test migrations, and investigate reliability problems.

## Architecture

The cluster uses a flat wired LAN and a Proxmox bridge on each node. Nodes have different CPU, memory, and disk capacities, so workloads are placed according to the resources they need:

- A utility node runs Grafana and Prometheus containers.
- A second utility node runs a Home Assistant virtual machine.
- The primary compute node runs the larger application virtual machines, a Portainer-managed Docker host, and the DNS container.
- A storage-focused node runs an OpenMediaVault virtual machine and provides additional local disk pools.
- One cluster member is kept available for cluster membership and future workloads.

The cluster has quorum and limited high-availability use, but it does not use Ceph or another shared-storage system. This distinction matters: unified management and a healthy quorum do not make every guest disk available on every node.

## Virtualization and storage

I use both QEMU virtual machines and LXC containers. Default guest disks are stored on node-local LVM-thin storage. Additional directory and LVM pools provide space for monitoring data, images, templates, and future workloads. OpenMediaVault receives a dedicated physical disk through the storage node and provides network storage to other systems.

The storage design is intentionally practical for a small homelab, but it has limitations:

- A guest can only migrate easily when its disk is available to the destination node.
- Local storage creates a dependency on the node that owns a guest's disk.
- Physical-disk passthrough simplifies access to bulk storage but ties that storage to a specific virtual machine and host.
- There are currently no configured backup jobs, so important data needs a separate backup plan.

## Network and service topology

The local cluster connects to the LAN and private remote-access network. A separate cloud VM named `arminstance` runs another Docker service layer; it is connected to the homelab through the private remote-access network rather than being treated as a local Proxmox node.

<figure class="topology-figure">
<div class="topology-scroll" role="region" aria-label="Network access diagram; scroll horizontally on small screens" tabindex="0"><img src="/assets/proxmox-network.svg" width="900" height="610" alt="Public visitors reach selected local and cloud web apps through Cloudflare tunnels. Private administration uses Tailscale to reach the local homelab and the separate arminstance cloud VM."></div>
<figcaption>Public application access and private administration use separate paths. <a href="/assets/proxmox-network.svg">Open full-size network diagram</a>.</figcaption>
</figure>

## Services I run

<figure class="topology-figure">
<div class="topology-scroll" role="region" aria-label="Service placement diagram; scroll horizontally on small screens" tabindex="0"><img src="/assets/proxmox-services.svg" width="900" height="720" alt="Service placement in the five-node Proxmox cluster and the separate ARM cloud VM. The following lists describe the services in each environment."></div>
<figcaption>Services grouped by environment, with local storage and the separate cloud host shown explicitly. <a href="/assets/proxmox-services.svg">Open full-size service diagram</a>.</figcaption>
</figure>

The local Proxmox environment provides:

- Proxmox VE for virtualization and cluster management.
- LXC containers for Pi-hole DNS, Prometheus, and Grafana.
- QEMU virtual machines for Nextcloud, Home Assistant, OpenMediaVault, and a Docker/Portainer host.
- Nginx Proxy Manager for reverse-proxying selected applications.
- Matrix Synapse and Element for self-hosted communications.
- A homepage dashboard and cloudflared for selected published routes.
- Node Exporter and the Proxmox exporter for infrastructure monitoring.

The separate cloud VM, `arminstance`, provides:

- Forgejo for self-hosted Git repositories.
- Crafty Controller and Minecraft server infrastructure.
- Web applications, including the TSA and Girls Who Code sites.
- Docker-managed services and a separate cloudflared route.

Remote administration uses a private overlay network. Public application routes are separated from Proxmox management access, so an application can be published or withdrawn without exposing the hypervisor interface.

## Monitoring and operations

Prometheus collects node and service metrics, while Grafana provides dashboards for the cluster and applications. I use the monitoring data alongside Proxmox status, guest-agent information, storage checks, and system logs when diagnosing problems.

Routine operations include installing updates one node at a time, maintaining quorum during reboots, checking storage capacity and drive health, and verifying guest networking after changes. The documentation also records known gaps, including uneven Proxmox versions, disabled cluster firewall rules, the lack of backups, and the absence of fencing or watchdog configuration.

## Current status

The homelab is active and continuously evolving. The current documentation snapshot confirms a functioning five-node cluster with local storage, monitoring, self-hosted services, and identified resilience work. The next improvements are centered on backup jobs, storage accessibility, firewall policy, version consistency, and repeatable recovery procedures.
