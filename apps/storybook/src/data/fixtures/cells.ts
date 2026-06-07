// G1 Signals Lab — Cell / Trust / NIST Fixtures

import type { CellIdentity, NistPosture, TrustConfidence } from "../../types/hsml";
import type { NistCellMapping } from "../../components/NistPostureMatrix";
import type { CellRegistryEntry } from "../../components/CellTypologyPanel";

// ---------------------------------------------------------------------------
// Cell Identity Records
// ---------------------------------------------------------------------------

export const CELL_CYPHER_ONE: CellIdentity = {
  handle: "CYPHER ONE",
  role: "SUPERVISOR_CORE",
  aid: "did:keri:I2B8e84Wj_OneVictor_GSuite_Master_AID",
  autonomyCeiling: 5,
  currentAutonomy: 4,
  permissions: ["MANDATE_OSCAL_COMPILER", "OPENC2_WIRE_ACTUATOR", "DECISION_MEMO_GEN"],
};

export const CELL_ONE_ECHO: CellIdentity = {
  handle: "one-echo",
  role: "SENSOR_DRONE",
  aid: "did:keri:I1A7d93Zk_OneEcho_Core_Master_AID",
  autonomyCeiling: 2,
  currentAutonomy: 2,
  permissions: ["NETWORK_MIRROR", "STIX_CORRELATE", "INGESTION_QUERY"],
};

export const CELL_ONE_INTEL: CellIdentity = {
  handle: "one-intel",
  role: "COMPLIANCE_ENGINE",
  aid: "did:keri:I3C9f12Xm_OneIntel_Policy_Master_AID",
  autonomyCeiling: 1,
  currentAutonomy: 1,
  permissions: ["XDBML_PARSE", "BILL_C8_CROSSCHECK", "CROSSWALK_COMPILE"],
};

export const CELL_ONE_VECTOR: CellIdentity = {
  handle: "one-vector",
  role: "ENFORCEMENT_GATE",
  aid: "did:keri:I4D2g45Yn_OneVector_Gate_Master_AID",
  autonomyCeiling: 5,
  currentAutonomy: 4,
  permissions: ["OPENC2_DISTRIBUTE", "WEBAUTHN_CHALLENGE", "SMS_BROADCAST"],
};

export const CELL_ONE_SHADOW: CellIdentity = {
  handle: "one-shadow",
  role: "RECON_SCANNER",
  aid: "did:keri:I5E3h67Zo_OneShadow_Recon_Master_AID",
  autonomyCeiling: 2,
  currentAutonomy: 2,
  permissions: ["FS_HASH", "DEPENDENCY_RESOLVE", "CBOM_COMPILE"],
};

export const CELL_ONE_GHOST: CellIdentity = {
  handle: "one-ghost",
  role: "SANITIZATION_GHOST",
  aid: "did:keri:I6F4i89Ap_OneGhost_Clean_Master_AID",
  autonomyCeiling: 4,
  currentAutonomy: 4,
  permissions: ["WORKSPACE_DELETE", "TEMP_PURGE", "LOG_SEAL"],
};

export const CELL_ONE_SURGE: CellIdentity = {
  handle: "one-surge",
  role: "RESPONSE_UNIT",
  aid: "did:keri:I7G5j01Bq_OneSurge_Response_Master_AID",
  autonomyCeiling: 4,
  currentAutonomy: 4,
  permissions: ["INCIDENT_EXECUTE", "PLAYBOOK_DISPATCH", "CONTAINMENT_ENFORCE"],
};

export const ALL_CELLS: CellIdentity[] = [
  CELL_CYPHER_ONE,
  CELL_ONE_ECHO,
  CELL_ONE_INTEL,
  CELL_ONE_VECTOR,
  CELL_ONE_SHADOW,
  CELL_ONE_GHOST,
  CELL_ONE_SURGE,
];

// ---------------------------------------------------------------------------
// NIST CSF 2.0 Posture Baseline
// ---------------------------------------------------------------------------

export const NIST_POSTURE_BASELINE: NistPosture[] = [
  { function: "GV", category: "GV.OC-01", posture: "HYDRATED", confidence: 0.98 },
  { function: "ID", category: "ID.AM-01", posture: "HYDRATED", confidence: 0.94 },
  { function: "PR", category: "PR.DS-01", posture: "ENFORCED", confidence: 0.96 },
  { function: "DE", category: "DE.CM-01", posture: "HYDRATED", confidence: 0.97 },
  { function: "RS", category: "RS.AN-01", posture: "ENFORCED", confidence: 0.99 },
  { function: "RC", category: "RC.RP-01", posture: "HYDRATED", confidence: 0.92 },
];

export const NIST_CELL_MAPPINGS: NistCellMapping[] = [
  { function: "GV", functionLabel: "GOVERN", cell: "COMPLIANCE_ENGINE", cellHandle: "one-intel", posture: NIST_POSTURE_BASELINE[0] },
  { function: "ID", functionLabel: "IDENTIFY", cell: "RECON_SCANNER", cellHandle: "one-shadow", posture: NIST_POSTURE_BASELINE[1] },
  { function: "PR", functionLabel: "PROTECT", cell: "ENFORCEMENT_GATE", cellHandle: "one-vector", posture: NIST_POSTURE_BASELINE[2] },
  { function: "DE", functionLabel: "DETECT", cell: "SENSOR_DRONE", cellHandle: "one-echo", posture: NIST_POSTURE_BASELINE[3] },
  { function: "RS", functionLabel: "RESPOND", cell: "RESPONSE_UNIT", cellHandle: "one-surge", posture: NIST_POSTURE_BASELINE[4] },
  { function: "RC", functionLabel: "RECOVER", cell: "SANITIZATION_GHOST", cellHandle: "one-ghost", posture: NIST_POSTURE_BASELINE[5] },
];

// ---------------------------------------------------------------------------
// Cell Typology Registry
// ---------------------------------------------------------------------------

export const CELL_REGISTRY: CellRegistryEntry[] = [
  {
    cell: CELL_CYPHER_ONE,
    nistFunction: "RS",
    constraint: "Orchestrator — cannot execute autonomously without at least one cell attestation; delegates all NIST-function actions to bound agents",
    isActive: true,
  },
  {
    cell: CELL_ONE_ECHO,
    nistFunction: "DE",
    constraint: "Hard-blocked against all write, modify, or delete mutations across all Firestore collection layers",
    isActive: true,
  },
  {
    cell: CELL_ONE_INTEL,
    nistFunction: "GV",
    constraint: "Legal assertions require explicit HITL review before committing state keys to the compliance ledger",
    isActive: true,
  },
  {
    cell: CELL_ONE_VECTOR,
    nistFunction: "PR",
    constraint: "Level 5 containment actions time-boxed to 60 minutes max, require active Incident Commander tracking code",
    isActive: true,
  },
  {
    cell: CELL_ONE_SHADOW,
    nistFunction: "ID",
    constraint: "Shadow environments or untracked legacy algorithms instantly flagged as ConflictRecord and routed to triage",
    isActive: true,
  },
  {
    cell: CELL_ONE_GHOST,
    nistFunction: "RC",
    constraint: "Cannot alter persistent transaction history or manipulate existing Key Event Log (KEL) tracks",
    isActive: true,
  },
  {
    cell: CELL_ONE_SURGE,
    nistFunction: "RS",
    constraint: "Cannot accept residual risk or execute production DB mutations outside pre-vetted playbook matrices without 1G biometric bypass",
    isActive: true,
  },
];

// ---------------------------------------------------------------------------
// Trust Confidence Snapshots (timeline progression)
// ---------------------------------------------------------------------------

export const TRUST_TIMELINE: TrustConfidence[] = [
  { score: 0.98, tier: "HIGH", lambda: 0.005, lastVerifiedAt: "2026-06-01T02:15:00Z" },
  { score: 0.94, tier: "MEDIUM", lambda: 0.005, lastVerifiedAt: "2026-06-01T02:30:00Z" },
  { score: 0.88, tier: "MEDIUM", lambda: 0.008, lastVerifiedAt: "2026-06-01T03:00:00Z" },
  { score: 0.72, tier: "MEDIUM", lambda: 0.008, lastVerifiedAt: "2026-06-01T04:00:00Z" },
  { score: 0.99, tier: "HIGH", lambda: 0.003, lastVerifiedAt: "2026-06-01T06:45:00Z" },
  { score: 0.97, tier: "HIGH", lambda: 0.004, lastVerifiedAt: "2026-06-01T08:30:00Z" },
];
