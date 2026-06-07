export interface OriginEntry {
  label: string;
  detail: string;
}

export interface CapabilityEntry {
  label: string;
  detail: string;
}

export interface TeamMember {
  role: string;
  name: string;
}

export const ORIGINS: OriginEntry[] = [
  {
    label: "GUILD ONE",
    detail:
      "Founded 2001, Calgary. Pioneers of blockchain governance — Forbes Blockchain 50, first energy royalty on-chain. 25 years building trust infrastructure.",
  },
  {
    label: "SIGNAL INTELLIGENCE INC.",
    detail:
      "Led by a CISSP and former Big 4 security executive with over a decade in enterprise risk. Built the trusted signals bus powering real-time market intelligence — now the foundational transport layer for G1 Signals.",
  },
  {
    label: "THE CONVERGENCE",
    detail:
      "Governance-grade trust infrastructure meets autonomous agent orchestration. A single cryptographic fabric purpose-built for cyber and defence — where every action is attested, every decision is auditable, and sovereignty is non-negotiable.",
  },
];

export const CAPABILITIES: CapabilityEntry[] = [
  { label: "IEEE 2874", detail: "HSTP-1.0 policy-governed transport" },
  { label: "KERI / vLEI", detail: "Decentralized identity & attestation" },
  { label: "NIST CSF 2.0", detail: "Six-function governance binding" },
  { label: "Post-Quantum", detail: "FIPS 203/204 cipher enforcement" },
];

export const TEAM: TeamMember[] = [
  { role: "FOUNDER", name: "Placeholder" },
  { role: "CTO", name: "Placeholder" },
  { role: "HEAD OF COMPLIANCE", name: "Placeholder" },
  { role: "HEAD OF PARTNERSHIPS", name: "Placeholder" },
];
