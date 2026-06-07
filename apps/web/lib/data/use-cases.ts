// ---------------------------------------------------------------------------
// Use-Case Page Constants — Metrics, Standards, and Artifacts
// Extracted from page files to keep them as thin orchestrators.
// ---------------------------------------------------------------------------

export interface UseCaseMetric {
  label: string;
  value: string;
}

export interface UseCaseSummary {
  href: string;
  label: string;
  title: string;
  desc: string;
}

export const CASES: UseCaseSummary[] = [
  {
    href: "/use-cases/patching",
    label: "UC-01",
    title: "Autonomous Patching",
    desc: "CVE chain detection through overnight Level-4 remediation with cryptographic evidence.",
  },
  {
    href: "/use-cases/quantum",
    label: "UC-02",
    title: "PQC / CBOM Migration",
    desc: "CBOM-driven post-quantum migration with quantum cipher enforcement interlocks.",
  },
  {
    href: "/use-cases/bill-c8",
    label: "UC-03",
    title: "Bill C-8 Compliance",
    desc: "Sovereign Canadian CCSPA compliance attested on-chain.",
  },
];

// ---------------------------------------------------------------------------
// UC01 — Autonomous Patching
// ---------------------------------------------------------------------------

export const PATCHING_METRICS: UseCaseMetric[] = [
  { label: "Detection-to-attestation", value: "2 min" },
  { label: "Overnight remediation", value: "4 hr unattended" },
  { label: "Evidence chain", value: "100%" },
];

export const PATCHING_STANDARDS: string[] = [
  "NIST CSF 2.0 — Detect (DE), Respond (RS)",
  "KERI microledger events + vLEI break-glass attestation",
  "FIPS-approved ciphers on remediation wire",
];

export const PATCHING_ARTIFACTS: string[] = [
  "Signed remediation plan (PlanCard export)",
  "OpenC2 distribute commands (one-vector)",
  "Microledger assertion chain (ResolutionCard)",
  "Morning executive summary with Bill C-8 verification",
];

// ---------------------------------------------------------------------------
// UC02 — PQC / CBOM Migration
// ---------------------------------------------------------------------------

export const QUANTUM_METRICS: UseCaseMetric[] = [
  { label: "CBOM assets discovered", value: "847" },
  { label: "PQC migration milestones", value: "12" },
  { label: "Interlock violations blocked", value: "23" },
];

export const QUANTUM_STANDARDS: string[] = [
  "FIPS 203 (ML-KEM) key encapsulation",
  "FIPS 204 (ML-DSA) digital signatures",
  "NIST CSF 2.0 — Identify (ID), Protect (PR)",
];

export const QUANTUM_ARTIFACTS: string[] = [
  "CBOM discovery dashboard export",
  "Quantum interlock state machine log",
  "Comprehensive remediation plan document",
  "PQC priority ranked list",
];

// ---------------------------------------------------------------------------
// UC03 — Bill C-8 / CCSPA Compliance
// ---------------------------------------------------------------------------

export const BILL_C8_METRICS: UseCaseMetric[] = [
  { label: "XDBML crosswalk compile", value: "< 30s" },
  { label: "Sovereign data residency", value: "CA-only" },
  { label: "Mandate attestation chain", value: "KERI-sealed" },
];

export const BILL_C8_STANDARDS: string[] = [
  "Bill C-8 / CCSPA (Critical Cyber Systems Protection Act)",
  "NIST CSF 2.0 — Govern (GV)",
  "KERI / vLEI sovereign attestation",
];

export const BILL_C8_ARTIFACTS: string[] = [
  "BillC8MandateCard signed export",
  "XDBML parse + crosswalk compile logs (one-intel)",
  "Approval scope constraints from CISO",
  "Morning compliance verification summary",
];
