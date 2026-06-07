export type AutonomyLevel = "autonomous" | "supervised" | "manual";

export interface Phase {
  id: string;
  time: string;
  actor: string;
  action: string;
  uiSurface: string;
  autonomyLevel: AutonomyLevel;
}

export const DEMO_PHASES: Phase[] = [
  {
    id: "act1-detect",
    time: "02:15 AM",
    actor: "one-echo",
    action:
      "Detects CVE-2026-901A → CVE-2026-3142 chaining vulnerability across Host-01/02/04",
    uiSurface: "NotificationCard + GeofenceHaltCard + TeamsNotificationCard",
    autonomyLevel: "autonomous",
  },
  {
    id: "act2-attest",
    time: "02:17 AM",
    actor: "James Graham (1G)",
    action:
      "Receives break-glass attestation via Teams; releases cryptographic key from iPhone",
    uiSurface: "TeamsAttestationCard",
    autonomyLevel: "manual",
  },
  {
    id: "act3-resolve",
    time: "02:18 AM",
    actor: "CYPHER ONE",
    action: "Microledger assertion verified; CYPHER ONE builds remediation plan",
    uiSurface: "ResolutionCard + ThinkingIndicator + PlanCard",
    autonomyLevel: "autonomous",
  },
  {
    id: "act3-approve",
    time: "02:20 AM",
    actor: "Lewis Cypher (CISO)",
    action: "Approves remediation plan with Bill C-8 compliance scope constraints",
    uiSurface: "ApprovalCard",
    autonomyLevel: "supervised",
  },
  {
    id: "act4-execute",
    time: "02:25 AM – 06:30 AM",
    actor: "CYPHER ONE (one-vector)",
    action:
      "Executes overnight Level-4 autonomous remediation with time-boxed health checks",
    uiSurface: "ExecutionDashboard",
    autonomyLevel: "autonomous",
  },
  {
    id: "act5-morning",
    time: "07:00 AM",
    actor: "CYPHER ONE",
    action:
      "Delivers morning executive summary with Bill C-8 compliance verification",
    uiSurface: "MorningDashboard",
    autonomyLevel: "autonomous",
  },
  {
    id: "act6-quantum",
    time: "08:30 AM",
    actor: "CYPHER ONE (one-shadow)",
    action:
      "Surfaces PQC/CBOM governance with quantum cipher enforcement interlock",
    uiSurface:
      "BillC8MandateCard + CBOMDiscoveryDashboard + CBOMExecutiveDashboard + QuantumInterlockCard + ComprehensivePlanDocument",
    autonomyLevel: "supervised",
  },
];

export const UC1_PHASES = DEMO_PHASES.filter((p) => !p.id.startsWith("act6"));
export const UC2_PHASES = DEMO_PHASES.filter((p) => p.id.startsWith("act6"));
