export interface TrustLink {
  href: string;
  title: string;
  desc: string;
  label: string;
}

export const TRUST_LINKS: TrustLink[] = [
  { href: "/trust/security", title: "Security", desc: "Isolation, threat model, disclosure", label: "POSTURE" },
  { href: "/trust/compliance", title: "Compliance", desc: "NIST CSF 2.0, Bill C-8, SOC 2 roadmap", label: "ALIGNMENT" },
  { href: "/trust/responsible-ai", title: "Responsible AI", desc: "Catalog invariant & autonomy ceilings", label: "GOVERNANCE" },
];

export interface ThreatEntry {
  vector: string;
  mitigation: string;
  severity: string;
}

export const THREATS: ThreatEntry[] = [
  { vector: "Supply-chain compromise", mitigation: "CBOM + dependency resolve (one-shadow)", severity: "HIGH" },
  { vector: "Privilege escalation", mitigation: "Autonomy gate + vLEI attestation", severity: "CRITICAL" },
  { vector: "Quantum harvest-now-decrypt-later", mitigation: "PQC interlock enforcement", severity: "MEDIUM" },
];

export interface ComplianceStatus {
  label: string;
  variant: "aligned" | "in-progress" | "planned";
  wording: string;
}

export const COMPLIANCE_STATUSES: ComplianceStatus[] = [
  { label: "NIST CSF 2.0", variant: "aligned", wording: "Aligned with" },
  { label: "Bill C-8 (CCSPA)", variant: "aligned", wording: "Aligned with" },
  { label: "SOC 2 Type II", variant: "in-progress", wording: "Audit in progress" },
  { label: "FedRAMP Moderate", variant: "planned", wording: "Roadmap: 2026 Q4" },
  { label: "CMMC L2", variant: "planned", wording: "Roadmap: 2027 Q1" },
  { label: "IRAP", variant: "planned", wording: "Roadmap: 2027 Q2" },
];
