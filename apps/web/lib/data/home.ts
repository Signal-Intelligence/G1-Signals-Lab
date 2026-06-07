export interface TrustPillar {
  icon: string;
  label: string;
  detail: string;
}

export const TRUST_PILLARS: TrustPillar[] = [
  { icon: "◆", label: "IEEE 2874", detail: "Policy-governed transport carrying catalog IDs, compliance hashes, and KERI anchors on every wire frame" },
  { icon: "▣", label: "KERI / vLEI", detail: "Decentralized cryptographic identity — break-glass attestation, autonomy enforcement, and evidence chains" },
  { icon: "▲", label: "Governance Binding", detail: "Framework-agnostic policy enforcement — NIST CSF for cyber, CMMC/SP 800-171 for defence, sovereign mandates for regulated infrastructure" },
  { icon: "◈", label: "Post-Quantum", detail: "FIPS 203/204 active enforcement — CBOM discovery, quantum interlocks, and algorithm agility" },
];

export interface RegulatoryEvent {
  year: string;
  event: string;
}

export const CYBER_REGULATORY_TIMELINE: RegulatoryEvent[] = [
  { year: "2025", event: "NIST CSF 2.0 formally adopted — Govern function added as sixth pillar, requiring organizational governance of all cybersecurity risk" },
  { year: "2026", event: "Bill C-8 (CCSPA) in force — 72-hour mandatory incident reporting, designated operator obligations, Minister-directed cybersecurity programs" },
  { year: "2027", event: "SEC cyber disclosure rules mature — material incident reporting within 4 business days, board-level governance disclosure required" },
  { year: "2030", event: "CNSA 2.0 deadline — ML-KEM and ML-DSA mandatory for all national security systems. Organizations without CBOM inventories face procurement exclusion" },
];

export const DEFENCE_REGULATORY_TIMELINE: RegulatoryEvent[] = [
  { year: "2025", event: "CMMC 2.0 enforcement begins — Level 2 certification required for CUI handling, third-party assessments mandatory for defence contractors" },
  { year: "2026", event: "NIST SP 800-171 Rev. 3 — enhanced security requirements for controlled unclassified information, continuous monitoring replaces periodic assessment" },
  { year: "2027", event: "ITAR modernization — digital provenance requirements for defence supply chain, cryptographic attestation at every vendor handoff" },
  { year: "2030", event: "NSM-10 PQC migration complete — all national security systems must use quantum-resistant algorithms. Air-gapped environments included, no exceptions" },
];

export const CYBER_POINTS = [
  "CISOs deploy autonomous patching, detection, and response — but cannot prove a single action was within policy",
  "Bill C-8 mandates 72-hour incident reporting with evidence chains. Manual processes cannot meet this at machine speed",
  "Post-quantum migration requires cryptographic inventory across every system. Most organizations have zero visibility into their cipher exposure",
  "Trust in agentic AI erodes without continuous re-attestation. Stale credentials are the new attack surface",
];

export const DEFENCE_POINTS = [
  "Classified networks require autonomous remediation but cannot tolerate unattested actions crossing domain boundaries",
  "CMMC Level 3 and NIST SP 800-171 demand continuous monitoring — not periodic assessments. Air-gapped environments make this harder, not simpler",
  "Defence supply chains span allied nations. ITAR compliance requires cryptographic provenance at every vendor handoff",
  "Multi-domain operations across land, sea, air, space, and cyber require threat fusion at machine speed with sovereign identity",
];

export const CONVERGENCE_POINTS = [
  "Both domains need autonomous agents bound to governance pillars — the difference is classification level and deployment topology, not architecture",
  "NIST CSF 2.0 is the shared governance language. Six functions map identically across enterprise SOCs and joint operations centers",
  "KERI/vLEI identity works the same whether attesting a CISO in Calgary or a commander in a SCIF. Cryptographic provenance is jurisdiction-agnostic",
  "One trust fabric. Two ecosystems. Sovereign deployment. This is the convergence point — and the competitive moat",
];
