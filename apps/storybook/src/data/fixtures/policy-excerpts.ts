// G1 Signals Lab — Policy / SOP Excerpt Fixtures
// Representative governance documents for Prairie Fuels Inc. agent hydration context

import type { PolicyExcerpt } from "../../types/domain";

export const POLICY_EXCERPTS: PolicyExcerpt[] = [
  {
    id: "pol-001",
    documentTitle: "Prairie Fuels Cybersecurity Program",
    section: "§3.2 — Incident Detection and Escalation",
    excerpt:
      "All cybersecurity incidents affecting designated critical cyber systems shall be reported to the CSE/CCCS within 72 hours of detection. The CISO or designated alternate shall authorize initial containment actions. Autonomous remediation systems operating above Level 3 autonomy require explicit CISO approval before execution against production OT systems.",
    applicability: "SCADA, DCS, VPN Gateway, IT/OT DMZ",
    agentConsumer: "one-intel",
    complianceFramework: "Bill C-8 (CCSPA) §15",
  },
  {
    id: "pol-002",
    documentTitle: "Prairie Fuels Cybersecurity Program",
    section: "§4.1 — Supply Chain and Third-Party Risk",
    excerpt:
      "All third-party remote access to OT systems — including Honeywell Secure Connection and Rockwell FactoryTalk vendor channels — shall be authenticated via MFA and logged to the centralized SIEM. Vendor VPN credentials shall be rotated quarterly and immediately upon any suspected compromise. Vendor firmware updates shall not be applied to Safety Instrumented Systems (SIS) without independent verification.",
    applicability: "Honeywell Secure Connection, FactoryTalk, Safety Manager SC",
    agentConsumer: "one-intel",
    complianceFramework: "Bill C-8 (CCSPA) §9(1)(d)",
  },
  {
    id: "pol-003",
    documentTitle: "OT Security Policy (IEC 62443 Alignment)",
    section: "§2.4 — Zone and Conduit Model",
    excerpt:
      "The Palo Alto PA-850 firewall enforces the IT/OT DMZ boundary. Traffic between Purdue Level 3 (site operations) and Level 2 (area supervisory control) is restricted to authorized OPC-UA and Modbus/TCP flows on designated ports. East-west segmentation changes require a Management of Change (MOC) review and OT team sign-off before deployment to production.",
    applicability: "PA-850 DMZ, ControlLogix PLCs, SAGE 3030 RTUs, Experion DCS",
    agentConsumer: "one-vector",
    complianceFramework: "IEC 62443-3-3",
  },
  {
    id: "pol-004",
    documentTitle: "Patch Management SOP — OT Systems",
    section: "§5.1 — SCADA-Safe Patching Criteria",
    excerpt:
      "Patches to OT systems (Honeywell Experion PKS, Allen-Bradley ControlLogix, Schneider SAGE 3030) shall only be applied during scheduled maintenance windows unless a CISO-approved emergency override is in effect. Health gates: VPN tunnel latency <100ms, Modbus/TCP latency <200ms, DCS controller heartbeat within 5% baseline. Automatic rollback within 60 seconds if any health gate fails.",
    applicability: "Experion C300 controllers, ControlLogix 5580, SAGE 3030 RTUs",
    agentConsumer: "one-surge",
    complianceFramework: "IEC 62443-2-3",
  },
  {
    id: "pol-005",
    documentTitle: "Incident Response Plan",
    section: "§6.2 — CSE Notification and Evidence Preservation",
    excerpt:
      "Upon detection of a cybersecurity incident affecting designated critical cyber systems, the 72-hour CSE notification clock starts at time of first automated detection. Evidence shall be sealed on the microledger within 15 minutes of each remediation action. The evidence chain shall be exportable in STIX 2.1 format for regulatory submission. All remediation actions shall reference the originating CVE, CWE, and CVSS score.",
    applicability: "All IT and OT systems under Bill C-8 designation",
    agentConsumer: "one-intel",
    complianceFramework: "Bill C-8 (CCSPA) §15, §17",
  },
  {
    id: "pol-006",
    documentTitle: "Cryptographic Standards Policy",
    section: "§1.1 — Algorithm Inventory and Migration",
    excerpt:
      "All cryptographic primitives in use across Prairie Fuels IT and OT infrastructure shall be inventoried in CycloneDX 1.6 CBOM format. Quantum-vulnerable algorithms (RSA ≤2048, ECDSA P-256, 3DES) shall be flagged for migration. New deployments shall use NIST-approved post-quantum algorithms (FIPS 203 ML-KEM, FIPS 204 ML-DSA) in hybrid mode. Legacy SCADA systems with zero crypto-agility shall be documented with compensating controls.",
    applicability: "All systems — priority: ASA VPN, PHD Historian, ControlLogix, SAGE 3030",
    agentConsumer: "one-shadow",
    complianceFramework: "NIST FIPS 203/204, Bill C-8 §9(1)(e)",
  },
  {
    id: "pol-007",
    documentTitle: "Business Continuity / Disaster Recovery Plan",
    section: "§3.4 — DCS Backup and Recovery",
    excerpt:
      "Honeywell Experion DCS configuration and PHD Historian data shall be backed up to Veeam every 4 hours with RPO ≤4h, RTO ≤2h. DR site (Regina, SK) shall maintain a synchronized replica. In the event of PHD Historian compromise, data integrity shall be validated against the most recent DCS backup before the historian is restored to production. Safety Manager SC configurations are excluded from automated restore and require manual OT team validation.",
    applicability: "Honeywell PHD Historian, Experion DCS, Safety Manager SC",
    agentConsumer: "one-ghost",
    complianceFramework: "IEC 62443-2-1, SK OHS",
  },
  {
    id: "pol-008",
    documentTitle: "Change Management / MOC Procedure",
    section: "§2.1 — Firewall and Network Changes",
    excerpt:
      "Any modification to Palo Alto PA-850 firewall rules, Hirschmann switch VLANs, or Tofino firewall policies affecting the IT/OT DMZ boundary requires a Management of Change (MOC) submission with OT team review and HSE sign-off. Emergency changes authorized by CISO override may proceed without prior MOC but must be retroactively documented within 24 hours. Automated rollback of emergency changes shall be logged with full state diff.",
    applicability: "PA-850, Hirschmann switches, Tofino firewalls",
    agentConsumer: "one-vector",
    complianceFramework: "SK OHS, IEC 62443-2-4",
  },
];
