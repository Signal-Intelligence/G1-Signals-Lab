export interface ArchitecturePillarDetail {
  label: string;
  detail: string;
}

export interface ArchitecturePillar {
  icon: string;
  title: string;
  subtitle: string;
  description: string;
  details: ArchitecturePillarDetail[];
}

export const ARCHITECTURE_PILLARS: ArchitecturePillar[] = [
  {
    icon: "◆",
    title: "IEEE 2874 / HSTP-1.0",
    subtitle: "Policy-governed transport",
    description:
      "Every agent communication — detection alerts, remediation plans, attestation challenges, evidence receipts — travels over a purpose-built wire protocol. HSTP-1.0 frames are not generic payloads. Each frame carries a signed catalog ID, compliance ledger hash, KERI event anchor, and the emitting cell's autonomy level at time of transmission.",
    details: [
      { label: "CATALOG ENFORCEMENT", detail: "Undeclared surfaces are rejected at the transport layer — not at the application layer. The wire protocol itself is the first governance gate." },
      { label: "COMPLIANCE LEDGER", detail: "Every frame carries a hash of the current compliance state. Regulatory assertions (Bill C-8, CMMC, ITAR) travel with the data, not in separate audit logs." },
      { label: "ROUTING PROVENANCE", detail: "Source and destination AIDs are embedded in every header. Replay attacks and impersonation are structurally impossible — not just policy-prohibited." },
    ],
  },
  {
    icon: "▣",
    title: "KERI / vLEI",
    subtitle: "Decentralized cryptographic identity",
    description:
      "Every agent cell — and every human operator — holds a cryptographic identity anchored to a Key Event Log. This is not federated SSO or certificate-based PKI. KERI identities are self-certifying, portable across jurisdictions, and resistant to registry compromise. The vLEI layer adds verifiable legal entity identity for regulatory attestation.",
    details: [
      { label: "BREAK-GLASS ATTESTATION", detail: "When a CEO attests from a foreign jurisdiction at 2 AM, the identity challenge uses biometric + TEE hardware + KEL verification. No passwords, no tokens, no SAML." },
      { label: "AUTONOMY BINDING", detail: "Each cell's autonomy ceiling is cryptographically bound to its AID. An agent cannot escalate its own permissions — the Key Event Log is append-only and externally witnessed." },
      { label: "EVIDENCE CHAINS", detail: "Every action produces a signed receipt anchored to the agent's KEL. The provenance chain is not a log file — it is a cryptographic data structure that cannot be retroactively altered." },
    ],
  },
  {
    icon: "▲",
    title: "Governance Binding",
    subtitle: "Framework-agnostic policy enforcement",
    description:
      "The trust fabric does not hardcode a single compliance framework. It provides a governance binding layer that maps any regulatory framework — NIST CSF 2.0 for cyber, CMMC and NIST SP 800-171 for defence, ITAR for supply chain, Bill C-8 for sovereign — into enforceable agent constraints. Each agent is domain-locked to a governance function. No agent can operate outside its assigned domain. No domain is left unbound.",
    details: [
      { label: "DOMAIN LOCKING", detail: "A detection agent cannot execute remediation. A governance agent cannot bypass containment. The function boundary is enforced cryptographically — regardless of which framework defines the function." },
      { label: "TRUST DECAY", detail: "Agent confidence erodes mathematically over time via exponential decay. Stale attestations automatically reduce agents to observe-only posture. Re-hydration requires fresh challenge-response." },
      { label: "POSTURE CONTINUITY", detail: "The governance posture is not a point-in-time snapshot. It is a continuously computed state across all bound functions, updated with every agent action and attestation event." },
    ],
  },
  {
    icon: "◈",
    title: "Post-Quantum Cryptography",
    subtitle: "FIPS 203/204 cipher migration",
    description:
      "Post-quantum readiness is not a future roadmap item — it is an active enforcement layer. The architecture discovers every cryptographic primitive in the environment via CBOM inventory, assesses quantum vulnerability, and enforces migration through interlock gates that block non-compliant cipher usage.",
    details: [
      { label: "CBOM DISCOVERY", detail: "Automated cryptographic inventory across IT and OT/SCADA environments. Every algorithm, key length, usage pattern, and agility score cataloged and continuously monitored." },
      { label: "QUANTUM INTERLOCKS", detail: "Enforcement gates that prevent non-PQC algorithms from being used in new deployments. Legacy systems are flagged, tracked, and scheduled for migration — not silently tolerated." },
      { label: "ALGORITHM AGILITY", detail: "The architecture is cipher-agnostic by design. When NIST finalizes new standards or revokes existing ones, the migration path is operational — not architectural." },
    ],
  },
];
