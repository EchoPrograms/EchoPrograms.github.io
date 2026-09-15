{
  "title": "TNTech CPTC tryout 2026",
  "date": "2026-09-13",
  "category": "CTF",
  "tags": ["CPTC", "Penetration testing", "Kubernetes", "NFS", "Web security"],
  "summary": "An individual penetration-testing assessment completed as Team 20 during the 2026 Tennessee Tech CPTC tryout.",
  "slug": "tntech-cptc-tryout-2026",
  "imported": false
}
---

## Report

<p class="import-label">AI-assisted website writeup</p>
<p>This website summary was generated with AI from the attached report. The CPTC assessment and the attached penetration-testing report were completed and written by me without AI.</p>

<iframe class="embedded-report" src="/assets/tntech-cptc-tryout-2026.pdf" title="TNTech CPTC Tryout 2026 penetration testing report" loading="lazy"></iframe>
<p><a href="/assets/tntech-cptc-tryout-2026.pdf">Open the full penetration testing report (PDF)</a></p>

## Overview

During the 2026 Tennessee Tech CPTC tryout, I completed the assessment individually as Team 20. I performed a network penetration test against the provided Obsidian environment from September 12–13, 2026 using a black-box approach from an external assessment lab.

The goal was to identify weaknesses in the internal network, confirm their impact, and document repeatable remediation steps in a professional penetration-testing report.

## Assessment approach

I began without credentials or advance knowledge of the target environment. The work moved from discovery and service enumeration into manual validation of weaknesses and impact assessment. Findings were recorded with severity, affected scope, technical impact, business impact, and recommended remediation.

The report covered an internal network range and cloud infrastructure discovered during testing. I also produced a network diagram, a network inventory, and supporting appendices for compromised users and indicators of compromise.

## Findings

The final report documented twelve findings:

- Six critical findings.
- Three high-severity findings.
- Two medium-severity findings.
- One informational observation.

The most significant themes were credential reuse, exposed or over-permissioned Kubernetes service accounts, credentials exposed through network storage, insecure service credentials, unauthenticated APIs and records, weak NFS permissions, authenticated cross-site scripting, weak password policy, and SSH password authentication.

The assessment also identified a containerized service layout as a security strength. The segmentation between services and its central management layer provided a useful foundation for applying access controls and hardening changes.

## Reporting and remediation

The report organized remediation by urgency. Immediate work focused on rotating exposed credentials, removing unnecessary service-account permissions, restricting unauthenticated access, and removing sensitive credentials from shared storage. Near-term work included moving SSH to key authentication, restricting NFS clients, removing unneeded service-account tokens, and filtering user-controlled web content. Longer-term work included password audits, vulnerability assessments, and continued administrator and developer security training.

Writing the report required connecting each technical observation to a concrete risk and a practical fix. The result was a document that could be used by the environment owner to prioritize changes after the assessment.

## Result

The CPTC tryout gave me practice with the full penetration-testing workflow: black-box discovery, manual validation, impact analysis, severity rating, remediation planning, and professional report writing. It also gave me experience presenting infrastructure, Kubernetes, network storage, authentication, and web-security findings together as one assessment.
