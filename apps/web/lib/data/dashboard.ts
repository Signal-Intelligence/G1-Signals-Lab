// ---------------------------------------------------------------------------
// CYPHER ONE Implementation Dashboard — Fixture Data
// Types, NIST colors, cell identities, mappings, and KPI drilldowns.
// ---------------------------------------------------------------------------

export type NistFunction = "GV" | "ID" | "PR" | "DE" | "RS" | "RC";

export type CellRole =
  | "SUPERVISOR_CORE"
  | "SENSOR_DRONE"
  | "COMPLIANCE_ENGINE"
  | "ENFORCEMENT_GATE"
  | "RECON_SCANNER"
  | "SANITIZATION_GHOST"
  | "RESPONSE_UNIT";

export interface CellIdentity {
  handle: string;
  role: CellRole;
  aid: string;
  autonomyCeiling: number;
  currentAutonomy: number;
  permissions: string[];
}

export interface NistCellMapping {
  nistFunction: NistFunction;
  functionCode: NistFunction;
  functionLabel: string;
  cellHandle: string;
  handle: string;
  agentHandle: string;
  cellRole: CellRole;
  confidence: number;
  posture: "HYDRATED" | "ENFORCED";
  description: string;
  constraint: string;
  permissions: string[];
  autonomyCeiling: number;
  nistCategory: string;
  pillar: string;
  systems: string;
}

export interface ExecutionEvent {
  id: string;
  timestamp: string;
  type: "patch" | "validation" | "evidence" | "health_check" | "rollback" | "escalation";
  message: string;
  system: string;
  provenanceHash: string;
}

export interface KpiDrilldownItem {
  label: string;
  value: string;
  detail: string;
}

// ---------------------------------------------------------------------------
// NIST Function Colors
// ---------------------------------------------------------------------------

export const NIST_COLORS: Record<NistFunction, string> = {
  GV: "#0066ff",
  ID: "#7c3aed",
  PR: "#00ff88",
  DE: "#b8784a",
  RS: "#c4506a",
  RC: "#9a8a42",
};

// ---------------------------------------------------------------------------
// Cell Identities (7 agents)
// ---------------------------------------------------------------------------

const CELL_CYPHER_ONE: CellIdentity = {
  handle: "CYPHER ONE", role: "SUPERVISOR_CORE",
  aid: "did:keri:I2B8e84Wj_OneVictor_GSuite_Master_AID",
  autonomyCeiling: 5, currentAutonomy: 4,
  permissions: ["MANDATE_OSCAL_COMPILER", "OPENC2_WIRE_ACTUATOR", "DECISION_MEMO_GEN"],
};
const CELL_ONE_INTEL: CellIdentity = {
  handle: "one-intel", role: "COMPLIANCE_ENGINE",
  aid: "did:keri:I3C9f12Xm_OneIntel_Policy_Master_AID",
  autonomyCeiling: 1, currentAutonomy: 1,
  permissions: ["XDBML_PARSE", "BILL_C8_CROSSCHECK", "CROSSWALK_COMPILE"],
};
const CELL_ONE_SHADOW: CellIdentity = {
  handle: "one-shadow", role: "RECON_SCANNER",
  aid: "did:keri:I5E3h67Zo_OneShadow_Recon_Master_AID",
  autonomyCeiling: 2, currentAutonomy: 2,
  permissions: ["FS_HASH", "DEPENDENCY_RESOLVE", "CBOM_COMPILE"],
};
const CELL_ONE_VECTOR: CellIdentity = {
  handle: "one-vector", role: "ENFORCEMENT_GATE",
  aid: "did:keri:I4D2g45Yn_OneVector_Gate_Master_AID",
  autonomyCeiling: 5, currentAutonomy: 4,
  permissions: ["OPENC2_DISTRIBUTE", "WEBAUTHN_CHALLENGE", "SMS_BROADCAST"],
};
const CELL_ONE_ECHO: CellIdentity = {
  handle: "one-echo", role: "SENSOR_DRONE",
  aid: "did:keri:I1A7d93Zk_OneEcho_Core_Master_AID",
  autonomyCeiling: 2, currentAutonomy: 2,
  permissions: ["NETWORK_MIRROR", "STIX_CORRELATE", "INGESTION_QUERY"],
};
const CELL_ONE_SURGE: CellIdentity = {
  handle: "one-surge", role: "RESPONSE_UNIT",
  aid: "did:keri:I7G5j01Bq_OneSurge_Response_Master_AID",
  autonomyCeiling: 4, currentAutonomy: 4,
  permissions: ["INCIDENT_EXECUTE", "PLAYBOOK_DISPATCH", "CONTAINMENT_ENFORCE"],
};
const CELL_ONE_GHOST: CellIdentity = {
  handle: "one-ghost", role: "SANITIZATION_GHOST",
  aid: "did:keri:I6F4i89Ap_OneGhost_Clean_Master_AID",
  autonomyCeiling: 4, currentAutonomy: 4,
  permissions: ["WORKSPACE_DELETE", "TEMP_PURGE", "LOG_SEAL"],
};

export const ALL_CELLS: CellIdentity[] = [
  CELL_CYPHER_ONE, CELL_ONE_INTEL, CELL_ONE_SHADOW, CELL_ONE_VECTOR,
  CELL_ONE_ECHO, CELL_ONE_SURGE, CELL_ONE_GHOST,
];

// ---------------------------------------------------------------------------
// NIST Cell Mappings (6 pillars → agents)
// ---------------------------------------------------------------------------

const AGENT_TOOLTIPS: Record<string, { pillar: string; systems: string }> = {
  "one-intel": { pillar: "GOVERN — Policy interpretation, regulatory crosswalks, Bill C-8 compliance assertions", systems: "OSCAL feeds, XDBML policy documents, regulatory databases, compliance ledger" },
  "one-shadow": { pillar: "IDENTIFY — Asset discovery, CBOM compilation, vulnerability triage", systems: "Claroty xDome, FactoryTalk firmware, CycloneDX SBOM/CBOM, CVE feeds" },
  "one-vector": { pillar: "PROTECT — Enforcement gates, quantum interlocks, containment actions", systems: "Palo Alto PA-850, Cisco ASA, OpenC2 actuators, WebAuthn/FIDO2 endpoints" },
  "one-echo": { pillar: "DETECT — Network monitoring, STIX correlation, anomaly detection", systems: "Splunk SIEM, Claroty xDome alerts, network tap mirrors, TAXII feeds" },
  "one-surge": { pillar: "RESPOND — Playbook execution, incident containment, remediation", systems: "Honeywell Experion DCS, ControlLogix PLCs, SAGE 3030 RTUs, patch orchestrators" },
  "one-ghost": { pillar: "RECOVER — Evidence sealing, workspace sanitization, post-incident cleanup", systems: "Microledger archives, backup validators, log sealers, KEL integrity monitors" },
};

function mkMapping(
  fn: NistFunction, label: string, handle: string, role: CellRole,
  confidence: number, posture: "HYDRATED" | "ENFORCED", category: string,
  constraint: string, permissions: string[], autonomyCeiling: number,
): NistCellMapping {
  const tip = AGENT_TOOLTIPS[handle];
  return {
    nistFunction: fn, functionCode: fn, functionLabel: label,
    cellHandle: handle, handle, agentHandle: handle, cellRole: role,
    confidence, posture, nistCategory: category,
    description: tip?.pillar ?? label,
    constraint, permissions, autonomyCeiling,
    pillar: tip?.pillar ?? label, systems: tip?.systems ?? "",
  };
}

export const NIST_CELL_MAPPINGS: NistCellMapping[] = [
  mkMapping("GV", "GOVERN", "one-intel", "COMPLIANCE_ENGINE", 98, "HYDRATED", "GV.OC-01",
    "Legal assertions require explicit HITL review before committing state keys to the compliance ledger",
    ["XDBML_PARSE", "BILL_C8_CROSSCHECK", "CROSSWALK_COMPILE"], 1),
  mkMapping("ID", "IDENTIFY", "one-shadow", "RECON_SCANNER", 94, "HYDRATED", "ID.AM-01",
    "Shadow environments or untracked legacy algorithms instantly flagged as ConflictRecord and routed to triage",
    ["FS_HASH", "DEPENDENCY_RESOLVE", "CBOM_COMPILE"], 2),
  mkMapping("PR", "PROTECT", "one-vector", "ENFORCEMENT_GATE", 96, "ENFORCED", "PR.DS-01",
    "Level 5 containment actions time-boxed to 60 minutes max, require active Incident Commander tracking code",
    ["OPENC2_DISTRIBUTE", "WEBAUTHN_CHALLENGE", "SMS_BROADCAST"], 5),
  mkMapping("DE", "DETECT", "one-echo", "SENSOR_DRONE", 97, "HYDRATED", "DE.CM-01",
    "Hard-blocked against all write, modify, or delete mutations across all Firestore collection layers",
    ["NETWORK_MIRROR", "STIX_CORRELATE", "INGESTION_QUERY"], 2),
  mkMapping("RS", "RESPOND", "one-surge", "RESPONSE_UNIT", 99, "ENFORCED", "RS.AN-01",
    "Cannot accept residual risk or execute production DB mutations outside pre-vetted playbook matrices without 1G biometric bypass",
    ["INCIDENT_EXECUTE", "PLAYBOOK_DISPATCH", "CONTAINMENT_ENFORCE"], 4),
  mkMapping("RC", "RECOVER", "one-ghost", "SANITIZATION_GHOST", 92, "HYDRATED", "RC.RP-01",
    "Cannot alter persistent transaction history or manipulate existing Key Event Log (KEL) tracks",
    ["WORKSPACE_DELETE", "TEMP_PURGE", "LOG_SEAL"], 4),
];

// ---------------------------------------------------------------------------
// Label Maps
// ---------------------------------------------------------------------------

export const AUTONOMY_LABELS: Record<number, string> = {
  1: "Advisory only — all actions require HITL review",
  2: "Observe and report — no write mutations permitted",
  3: "Limited autonomy — pre-vetted actions within playbook",
  4: "High autonomy — full playbook execution, governance-bounded",
  5: "Maximum autonomy — time-boxed containment authority",
};

export const PERMISSION_LABELS: Record<string, string> = {
  NETWORK_MIRROR: "Network Traffic Mirroring",
  STIX_CORRELATE: "STIX/TAXII Threat Correlation",
  INGESTION_QUERY: "Ingestion Pipeline Queries",
  XDBML_PARSE: "XDBML Policy Document Parsing",
  BILL_C8_CROSSCHECK: "Bill C-8 Compliance Crosscheck",
  CROSSWALK_COMPILE: "Regulatory Crosswalk Compilation",
  OPENC2_DISTRIBUTE: "OpenC2 Command Distribution",
  WEBAUTHN_CHALLENGE: "WebAuthn Biometric Challenge",
  SMS_BROADCAST: "SMS Alert Broadcast",
  FS_HASH: "Filesystem Integrity Hashing",
  DEPENDENCY_RESOLVE: "Dependency Graph Resolution",
  CBOM_COMPILE: "CBOM Inventory Compilation",
  WORKSPACE_DELETE: "Workspace Artifact Deletion",
  TEMP_PURGE: "Temporary Data Purge",
  LOG_SEAL: "Log Sealing & Archival",
  INCIDENT_EXECUTE: "Incident Playbook Execution",
  PLAYBOOK_DISPATCH: "Playbook Dispatch & Routing",
  CONTAINMENT_ENFORCE: "Containment Action Enforcement",
  MANDATE_OSCAL_COMPILER: "OSCAL Compiler Mandate",
  OPENC2_WIRE_ACTUATOR: "OpenC2 Wire Actuator",
  DECISION_MEMO_GEN: "Decision Memo Generation",
};

// ---------------------------------------------------------------------------
// KPI Drilldowns
// ---------------------------------------------------------------------------

export const KPI_DRILLDOWNS: Record<string, KpiDrilldownItem[]> = {
  "TOTAL AGENTS": [
    { label: "CYPHER ONE", value: "Orchestrator", detail: "Supervisor Core — delegates all domain actions to bound agents" },
    { label: "one-intel", value: "GV", detail: "Compliance Engine — policy interpretation and regulatory crosswalks" },
    { label: "one-shadow", value: "ID", detail: "Recon Scanner — asset discovery and CBOM compilation" },
    { label: "one-vector", value: "PR", detail: "Enforcement Gate — quantum interlocks and containment" },
    { label: "one-echo", value: "DE", detail: "Sensor Drone — read-only network monitoring and correlation" },
    { label: "one-surge", value: "RS", detail: "Response Unit — playbook execution under governance" },
    { label: "one-ghost", value: "RC", detail: "Sanitization Ghost — evidence sealing and workspace cleanup" },
  ],
  "HYDRATION COVERAGE": NIST_CELL_MAPPINGS.map((m) => ({
    label: m.functionLabel,
    value: `${m.confidence}%`,
    detail: m.nistFunction === "GV" ? "Policy documents, regulatory feeds, and compliance ledger fully ingested"
      : m.nistFunction === "ID" ? "Asset inventory current — 2 legacy OT subsystems pending passive scan"
      : m.nistFunction === "PR" ? "Enforcement rules deployed across all perimeter and DMZ endpoints"
      : m.nistFunction === "DE" ? "SIEM integration active — Claroty xDome and Splunk feeds nominal"
      : m.nistFunction === "RS" ? "All playbook matrices loaded and validated against current topology"
      : "Backup validation complete — all recovery targets verified against current topology",
  })),
  "AVG CONFIDENCE": NIST_CELL_MAPPINGS.map((m) => ({
    label: m.handle,
    value: `${m.confidence}%`,
    detail: m.handle === "one-intel" ? "Last attested 12 min ago — HIGH tier — full advisory authority"
      : m.handle === "one-shadow" ? "Last attested 28 min ago — MEDIUM tier — HITL for remediation actions"
      : m.handle === "one-vector" ? "Last attested 18 min ago — HIGH tier — full enforcement authority"
      : m.handle === "one-echo" ? "Last attested 8 min ago — HIGH tier — continuous monitoring active"
      : m.handle === "one-surge" ? "Last attested 3 min ago — HIGH tier — playbook execution ready"
      : "Last attested 45 min ago — MEDIUM tier — approaching re-attestation window",
  })),
  "ACTIVE GATES": [
    { label: "GV Gate", value: "ACTIVE", detail: "Compliance assertions require HITL review — gate enforced" },
    { label: "ID Gate", value: "ACTIVE", detail: "Asset discovery scoped to authorized network segments only" },
    { label: "PR Gate", value: "ACTIVE", detail: "FIPS 203/204 quantum interlock enforced on all new deployments" },
    { label: "DE Gate", value: "ACTIVE", detail: "Read-only invariant enforced — no write mutations permitted" },
    { label: "RS Gate", value: "ACTIVE", detail: "Playbook execution bounded by approved remediation envelope" },
    { label: "RC Gate", value: "ACTIVE", detail: "KEL integrity lock — transaction history immutable" },
  ],
};

