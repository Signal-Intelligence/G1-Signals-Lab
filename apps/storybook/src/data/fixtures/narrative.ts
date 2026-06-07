// G1 Signals Lab — Narrative Fixtures
// Combined Script: "A Day in the Life of a CISO" (02:15–08:30 AM, June 1 2026)
// Target Enterprise: Prairie Fuels Inc. (Kerrobert-profile refinery, 16,000 bpd)

import type {
  Phase,
  Vulnerability,
  RemediationBatch,
  DashboardStats,
  ExecutionEvent,
  TimelineMilestone,
  PQCPriority,
  CBOMEntry,
  CBOMDiscoveryMethod,
  CBOMCoverageGap,
  CBOMScanFailure,
  ActionItem,
} from "../../types/domain";

// ---------------------------------------------------------------------------
// Combined Script Phases — Acts I–VI
// ---------------------------------------------------------------------------

export const DEMO_PHASES: Phase[] = [
  {
    id: "act1-detect",
    time: "02:15 AM",
    actor: "one-echo",
    action: "Detects ArcaneDoor exploit chain CVE-2026-901A → CVE-2026-3142 across Cisco ASA VPN / Honeywell PHD Historian",
    uiSurface: "NotificationCard + GeofenceHaltCard + TeamsNotificationCard",
    hydrationDeps: ["claroty-xdome", "splunk-siem", "geofence-service", "teams-connector"],
    autonomyLevel: "autonomous",
  },
  {
    id: "act2-attest",
    time: "02:17 AM",
    actor: "James Graham (1G)",
    action: "Receives break-glass attestation via Teams; releases cryptographic key from iPhone",
    uiSurface: "TeamsAttestationCard",
    hydrationDeps: ["keri-vlei", "microledger-enclave", "teams-connector"],
    autonomyLevel: "manual",
  },
  {
    id: "act3-resolve",
    time: "02:18 AM",
    actor: "CYPHER ONE",
    action: "Microledger assertion verified; CYPHER ONE builds remediation plan",
    uiSurface: "ResolutionCard + ThinkingIndicator + PlanCard",
    hydrationDeps: ["microledger-enclave", "patch-registry", "change-policy"],
    autonomyLevel: "autonomous",
  },
  {
    id: "act3-approve",
    time: "02:20 AM",
    actor: "Lewis Cypher (CISO)",
    action: "Approves remediation plan with Bill C-8 compliance scope constraints",
    uiSurface: "ApprovalCard",
    hydrationDeps: ["approval-policy", "bill-c8-engine"],
    autonomyLevel: "supervised",
  },
  {
    id: "act4-execute",
    time: "02:25 AM – 06:30 AM",
    actor: "CYPHER ONE (one-vector)",
    action: "Executes overnight Level-4 autonomous remediation — ASA firmware, vendor creds, PHD isolation, DMZ segmentation",
    uiSurface: "ExecutionDashboard",
    hydrationDeps: ["cisco-asa-api", "honeywell-experion", "palo-alto-pa850", "evidence-chain", "bill-c8-engine"],
    autonomyLevel: "autonomous",
  },
  {
    id: "act5-morning",
    time: "07:00 AM",
    actor: "CYPHER ONE",
    action: "Delivers morning executive summary with Bill C-8 compliance verification",
    uiSurface: "MorningDashboard",
    hydrationDeps: ["evidence-chain", "trust-score-engine", "bill-c8-engine", "reporting"],
    autonomyLevel: "autonomous",
  },
  {
    id: "act6-quantum",
    time: "08:30 AM",
    actor: "CYPHER ONE (one-shadow)",
    action: "Surfaces PQC/CBOM governance — Honeywell DCS, ControlLogix PLC, SAGE 3030 RTU crypto posture",
    uiSurface: "BillC8MandateCard + CBOMDiscoveryDashboard + CBOMExecutiveDashboard + QuantumInterlockCard + ComprehensivePlanDocument",
    hydrationDeps: ["cbom-scanner", "claroty-xdome", "bill-c8-engine", "crypto-catalog"],
    autonomyLevel: "supervised",
  },
];

export const UC1_PHASES = DEMO_PHASES.filter((p) => !p.id.startsWith("act6"));
export const UC2_PHASES = DEMO_PHASES.filter((p) => p.id.startsWith("act6"));

// ---------------------------------------------------------------------------
// Vulnerability Chain — CVE-2026-901A + CVE-2026-3142
// ---------------------------------------------------------------------------

export const DEMO_VULNERABILITIES: Vulnerability[] = [
  {
    id: "vuln-901a",
    cve: "CVE-2026-901A",
    title: "Cisco ASA 5545-X VPN RCE via Memory Corruption (ArcaneDoor)",
    cvss: 9.8,
    severity: "Critical",
    epss: 0.89,
    kev: true,
    chainability: 0.96,
    exposure: 0.94,
    assetCriticality: 0.98,
    ageDays: 2,
    postMythosScore: 0.99,
    affectedSystem: "Host-01 (Cisco ASA 5545-X VPN Gateway)",
    cweCategory: "CWE-787: Out-of-bounds Write",
    cryptoRelated: false,
  },
  {
    id: "vuln-3142",
    cve: "CVE-2026-3142",
    title: "Cisco ASA Management Plane Unauthenticated Access (ArcaneDoor)",
    cvss: 8.1,
    severity: "High",
    epss: 0.72,
    kev: false,
    chainability: 0.93,
    exposure: 0.81,
    assetCriticality: 0.95,
    ageDays: 4,
    postMythosScore: 0.97,
    affectedSystem: "Host-02 (ASA Internal Management Plane)",
    cweCategory: "CWE-287: Improper Authentication",
    cryptoRelated: false,
  },
  {
    id: "vuln-chain-lateral",
    cve: "CVE-2026-3142 (lateral)",
    title: "Lateral Movement to Honeywell PHD Historian via Chained Credentials",
    cvss: 7.5,
    severity: "High",
    epss: 0.64,
    kev: false,
    chainability: 0.91,
    exposure: 0.77,
    assetCriticality: 0.92,
    ageDays: 4,
    postMythosScore: 0.95,
    affectedSystem: "Host-04 (Honeywell PHD Historian)",
    cweCategory: "CWE-269: Improper Privilege Management",
    cryptoRelated: false,
  },
];

export const UC1_VULNERABILITIES = DEMO_VULNERABILITIES;

// ---------------------------------------------------------------------------
// Remediation Batches — Overnight Execution (Act IV)
// ---------------------------------------------------------------------------

export const DEMO_REMEDIATION_BATCHES: RemediationBatch[] = [
  {
    id: "batch-001",
    name: "Cisco ASA Emergency Firmware Upgrade to 9.16.4.85",
    systems: ["Host-01"],
    vulns: ["vuln-901a"],
    status: "completed",
    startTime: "2026-06-01T02:25:00Z",
    endTime: "2026-06-01T02:42:00Z",
  },
  {
    id: "batch-002",
    name: "Revoke Compromised Honeywell Vendor VPN Credentials",
    systems: ["Host-02"],
    vulns: ["vuln-3142"],
    status: "completed",
    startTime: "2026-06-01T02:42:00Z",
    endTime: "2026-06-01T03:08:00Z",
  },
  {
    id: "batch-003",
    name: "Isolate PHD Historian — Validate Data Integrity from DCS Backup",
    systems: ["Host-04"],
    vulns: ["vuln-chain-lateral"],
    status: "completed",
    startTime: "2026-06-01T03:08:00Z",
    endTime: "2026-06-01T03:31:00Z",
  },
  {
    id: "batch-004",
    name: "IT/OT DMZ Firewall Tightening — East-West Segmentation",
    systems: ["Host-01", "Host-02", "Host-04"],
    vulns: ["vuln-901a", "vuln-3142"],
    status: "rolled_back",
    startTime: "2026-06-01T03:31:00Z",
    endTime: "2026-06-01T03:48:00Z",
    rollbackReason: "Health check: Modbus/TCP traffic between ControlLogix PLCs and SAGE 3030 RTUs disrupted — SCADA telemetry latency 680ms (340% above 200ms threshold)",
  },
  {
    id: "batch-005",
    name: "TLS Certificate Rotation — ASA Perimeter Endpoints",
    systems: ["Host-01"],
    vulns: ["vuln-901a"],
    status: "completed",
    startTime: "2026-06-01T03:50:00Z",
    endTime: "2026-06-01T04:12:00Z",
  },
];

export const UC1_REMEDIATION_BATCHES = DEMO_REMEDIATION_BATCHES;
export const REMEDIATION_BATCHES = DEMO_REMEDIATION_BATCHES;

// ---------------------------------------------------------------------------
// Dashboard Stats — Morning Summary (Act V)
// ---------------------------------------------------------------------------

export const DEMO_DASHBOARD_STATS: DashboardStats = {
  totalVulns: 3,
  remediated: 3,
  failed: 0,
  rolledBack: 1,
  pendingManual: 0,
  trustScoreBefore: 62,
  trustScoreAfter: 89,
  evidenceReceipts: 47,
};

export const UC1_DASHBOARD_STATS = DEMO_DASHBOARD_STATS;
export const DASHBOARD_STATS = DEMO_DASHBOARD_STATS;

// ---------------------------------------------------------------------------
// Execution Events — Overnight Log (Act IV)
// ---------------------------------------------------------------------------

export const DEMO_EXECUTION_EVENTS: ExecutionEvent[] = [
  {
    id: "evt-001",
    timestamp: "2026-06-01T02:25:12Z",
    type: "patch",
    message: "Deploying Cisco ASA firmware 9.16.4.85 to Host-01 VPN Gateway — ArcaneDoor RCE fix",
    system: "Host-01",
    provenanceHash: "sha256:a3f8c1d9e2b74506f819ae3c2d5b7e01",
  },
  {
    id: "evt-002",
    timestamp: "2026-06-01T02:42:03Z",
    type: "validation",
    message: "Health check passed — AnyConnect VPN tunnel latency <100ms, within baseline",
    system: "Host-01",
    provenanceHash: "sha256:b7e2f4a1c8d63912d04bc5e1a9f27830",
  },
  {
    id: "evt-003",
    timestamp: "2026-06-01T02:42:18Z",
    type: "patch",
    message: "Revoking compromised Honeywell Secure Connection vendor credentials, rotating ASA certificates",
    system: "Host-02",
    provenanceHash: "sha256:c9d1e5f3a2b847209e3fa6b1d0c48927",
  },
  {
    id: "evt-004",
    timestamp: "2026-06-01T03:08:44Z",
    type: "evidence",
    message: "Microledger receipt sealed — batch-002 complete, Bill C-8 §15 72-hour notification clock started",
    system: "Host-02",
    provenanceHash: "sha256:d4a8b2c6e1f950318c7ea2d3b5f06941",
  },
  {
    id: "evt-005",
    timestamp: "2026-06-01T03:08:55Z",
    type: "patch",
    message: "Isolating Honeywell PHD Historian — validating process history integrity from Experion DCS backup",
    system: "Host-04",
    provenanceHash: "sha256:d5b9c3e7f1a260429f4cb8d6e3a17052",
  },
  {
    id: "evt-006",
    timestamp: "2026-06-01T03:31:22Z",
    type: "patch",
    message: "Applying IT/OT DMZ east-west firewall segmentation via Palo Alto PA-850 across Host-01/02/04",
    system: "Host-01",
    provenanceHash: "sha256:e5f9c3d7a0b168424d19ba5c6e2f7053",
  },
  {
    id: "evt-007",
    timestamp: "2026-06-01T03:45:58Z",
    type: "health_check",
    message: "DEGRADED — Modbus/TCP disrupted between ControlLogix PLCs and SAGE 3030 RTUs — latency 680ms (340% above 200ms threshold)",
    system: "Host-04",
    provenanceHash: "sha256:f6a0d4e8b1c279536e2ab7d4c3f81064",
  },
  {
    id: "evt-008",
    timestamp: "2026-06-01T03:46:14Z",
    type: "rollback",
    message: "Auto-rollback initiated for batch-004 — restoring prior PA-850 firewall state within 47 seconds",
    system: "Host-04",
    provenanceHash: "sha256:07b1e5f9c2d38a648f3cb6e5d4a92175",
  },
  {
    id: "evt-009",
    timestamp: "2026-06-01T03:48:02Z",
    type: "validation",
    message: "Rollback verified — Modbus/TCP between ControlLogix and SAGE 3030 restored to baseline",
    system: "Host-04",
    provenanceHash: "sha256:18c2f6a0d3e49b75a04dc7f6e5ba3286",
  },
  {
    id: "evt-010",
    timestamp: "2026-06-01T03:48:30Z",
    type: "escalation",
    message: "Batch-004 escalated to morning review — Prairie Fuels OT team + CISO action required",
    system: "Host-04",
    provenanceHash: "sha256:29d3a7b1e4f50c86b15ed8a7f6cb4397",
  },
  {
    id: "evt-011",
    timestamp: "2026-06-01T07:00:00Z",
    type: "evidence",
    message: "Morning summary sealed — 47 evidence receipts, Bill C-8 VERIFIED_COMPLIANT, CSE notification filed",
    system: "cypher-one-core",
    provenanceHash: "sha256:3ae4b8c2f5061d97c26fe9b8a7dc54a8",
  },
];

export const UC1_EXECUTION_EVENTS = DEMO_EXECUTION_EVENTS;
export const EXECUTION_EVENTS = DEMO_EXECUTION_EVENTS;

// ---------------------------------------------------------------------------
// PQC Timeline (Act VI)
// ---------------------------------------------------------------------------

export const PQC_TIMELINE: TimelineMilestone[] = [
  {
    date: "2024-08",
    label: "NIST PQC Standards Finalized",
    description: "FIPS 203 (ML-KEM), FIPS 204 (ML-DSA), FIPS 205 (SLH-DSA) published",
    category: "standard",
    risk: "low",
  },
  {
    date: "2025-03",
    label: "CNSA 2.0 Compliance Window Opens",
    description: "NSA mandates PQC adoption planning for National Security Systems",
    category: "regulatory",
    risk: "medium",
  },
  {
    date: "2025-09",
    label: "Major Cloud Providers Deprecate RSA-2048",
    description: "AWS, Azure, GCP announce deprecation timelines for managed services",
    category: "vendor",
    risk: "medium",
  },
  {
    date: "2026-01",
    label: "Bill C-8 Quantum Mandate Effective",
    description: "CER-regulated operators must demonstrate PQC migration roadmap",
    category: "regulatory",
    risk: "high",
  },
  {
    date: "2026-06",
    label: "Internal CBOM Baseline Target",
    description: "Complete cryptographic bill of materials across all pipeline SCADA/OT systems",
    category: "internal",
    risk: "medium",
  },
  {
    date: "2027-01",
    label: "TLS 1.2 End of Life",
    description: "Major browsers drop TLS 1.2 — hybrid PQC/classical mandatory",
    category: "vendor",
    risk: "high",
  },
  {
    date: "2028-06",
    label: "CNSA 2.0 Full Enforcement",
    description: "No classical fallback permitted for NSS systems",
    category: "regulatory",
    risk: "high",
  },
  {
    date: "2030-01",
    label: "Harvest Now Decrypt Later Threshold",
    description: "Conservative estimate for quantum break of RSA-2048 / ECDSA P-256",
    category: "standard",
    risk: "high",
  },
];

export const PQC_MILESTONES = PQC_TIMELINE;

// ---------------------------------------------------------------------------
// PQC Priorities (Act VI)
// ---------------------------------------------------------------------------

export const PQC_PRIORITIES: PQCPriority[] = [
  {
    id: "pqc-1",
    title: "Cryptographic Bill of Materials (CBOM)",
    description: "Complete automated discovery of all cryptographic assets across Honeywell Experion DCS, ControlLogix PLCs, SAGE 3030 RTUs, and Cisco ASA perimeter using one-shadow cell.",
    rationale: "Bill C-8 §9(1)(e) anticipated regulations mandate PQC migration roadmaps for designated operators. Cannot migrate what you cannot inventory.",
    estimatedEffort: "4-6 weeks (automated + manual validation)",
    owner: "one-shadow",
  },
  {
    id: "pqc-2",
    title: "Harvest Now, Decrypt Later (HNDL) Risk Assessment",
    description: "Identify Prairie Fuels feedstock pricing, royalty calculations, and SCADA command channels with >5 year confidentiality requirements using quantum-vulnerable RSA-2048 and ECDSA P-256.",
    rationale: "SCADA command channels and proprietary refining parameters transmitted through Honeywell PHD Historian are high-value HNDL targets for state-level adversaries.",
    estimatedEffort: "3-4 weeks",
    owner: "one-intel",
  },
  {
    id: "pqc-3",
    title: "ML-KEM Hybrid Pilot — Cisco ASA VPN",
    description: "Deploy FIPS-203 ML-KEM + X25519 hybrid key exchange on Host-01 Cisco ASA 5545-X VPN Gateway.",
    rationale: "ASA VPN is the primary entry point for Calgary HQ and Honeywell vendor remote access. Hybrid deployment validates compatibility without single-algorithm risk.",
    estimatedEffort: "6-8 weeks (phased rollout)",
    owner: "one-vector",
  },
];

// ---------------------------------------------------------------------------
// CBOM Inventory (Act VI)
// ---------------------------------------------------------------------------

export const CBOM_INVENTORY: CBOMEntry[] = [
  { id: "cbom-001", system: "Host-01 (Cisco ASA 5545-X VPN)", algorithm: "RSA-2048", keyLength: 2048, usage: "TLS server certificate — AnyConnect VPN", pqcVulnerable: true, agility: "medium", riskScore: 0.72 },
  { id: "cbom-002", system: "Host-01 (Cisco ASA 5545-X VPN)", algorithm: "AES-256-GCM", keyLength: 256, usage: "IPsec tunnel encryption", pqcVulnerable: false, agility: "high", riskScore: 0.12 },
  { id: "cbom-003", system: "Host-02 (ASA Mgmt Plane)", algorithm: "ECDSA P-256", keyLength: 256, usage: "JWT signing — internal API", pqcVulnerable: true, agility: "medium", riskScore: 0.78 },
  { id: "cbom-004", system: "Host-02 (ASA Mgmt Plane)", algorithm: "RSA-2048", keyLength: 2048, usage: "SAML assertion signing — Entra ID federation", pqcVulnerable: true, agility: "low", riskScore: 0.81 },
  { id: "cbom-005", system: "Host-04 (Honeywell PHD Historian)", algorithm: "AES-256-XTS", keyLength: 256, usage: "Transparent data encryption — process history", pqcVulnerable: false, agility: "medium", riskScore: 0.18 },
  { id: "cbom-006", system: "Host-04 (Honeywell PHD Historian)", algorithm: "RSA-2048", keyLength: 2048, usage: "Backup key wrapping — Veeam snapshots", pqcVulnerable: true, agility: "low", riskScore: 0.74 },
  { id: "cbom-007", system: "Allen-Bradley ControlLogix 5580 (PLCs)", algorithm: "3DES", keyLength: 168, usage: "Legacy Modbus/TCP encryption", pqcVulnerable: false, agility: "none", riskScore: 0.91 },
  { id: "cbom-008", system: "Allen-Bradley ControlLogix 5580 (PLCs)", algorithm: "RSA-1024", keyLength: 1024, usage: "Firmware signing — Rockwell FactoryTalk", pqcVulnerable: true, agility: "none", riskScore: 0.96 },
  { id: "cbom-009", system: "Honeywell Experion Station (HMI)", algorithm: "ECDSA P-256", keyLength: 256, usage: "Operator authentication — DCS console", pqcVulnerable: true, agility: "medium", riskScore: 0.71 },
  { id: "cbom-010", system: "Honeywell Experion Station (HMI)", algorithm: "AES-256-GCM", keyLength: 256, usage: "Command channel encryption — C300 controllers", pqcVulnerable: false, agility: "high", riskScore: 0.08 },
  { id: "cbom-011", system: "Schneider SAGE 3030 (RTUs)", algorithm: "3DES", keyLength: 168, usage: "Legacy Modbus/TCP — remote terminal units", pqcVulnerable: false, agility: "none", riskScore: 0.89 },
  { id: "cbom-012", system: "Schneider SAGE 3030 (RTUs)", algorithm: "RSA-1024", keyLength: 1024, usage: "Firmware signing — remote updates via satellite", pqcVulnerable: true, agility: "none", riskScore: 0.94 },
  { id: "cbom-013", system: "Honeywell Safety Manager SC (SIS)", algorithm: "RSA-2048", keyLength: 2048, usage: "SIL-rated safety logic signing", pqcVulnerable: true, agility: "low", riskScore: 0.83 },
  { id: "cbom-014", system: "Palo Alto PA-850 (IT/OT DMZ)", algorithm: "RSA-2048", keyLength: 2048, usage: "TLS inspection certificate", pqcVulnerable: true, agility: "high", riskScore: 0.62 },
];

export const CBOM_ENTRIES = CBOM_INVENTORY;

// ---------------------------------------------------------------------------
// CBOM Discovery Methods (Act VI)
// ---------------------------------------------------------------------------

export const CBOM_DISCOVERY_METHODS: CBOMDiscoveryMethod[] = [
  { name: "Cisco ASA / Palo Alto TLS Endpoint Scan", targetsScanned: 48, totalTargets: 52, status: "completed", itemsFound: 96 },
  { name: "Honeywell / AB / Schneider OT Protocol Fingerprint", targetsScanned: 23, totalTargets: 34, status: "in_progress", itemsFound: 41 },
  { name: "Entra ID / ASA Certificate Store Inventory", targetsScanned: 18, totalTargets: 18, status: "completed", itemsFound: 44 },
  { name: "Experion / FactoryTalk Firmware Analysis", targetsScanned: 12, totalTargets: 20, status: "in_progress", itemsFound: 28 },
  { name: "Claroty xDome Passive Crypto Detection", targetsScanned: 87, totalTargets: 95, status: "completed", itemsFound: 134 },
];

// ---------------------------------------------------------------------------
// CBOM Coverage Gaps (Act VI)
// ---------------------------------------------------------------------------

export const CBOM_COVERAGE_GAPS: CBOMCoverageGap[] = [
  { area: "Schneider SAGE 3030 RTUs (Northern Segment)", description: "4 remote terminal units behind satellite uplink — no direct scan capability from Claroty xDome", severity: "high" },
  { area: "Allen-Bradley ControlLogix 5580 Firmware", description: "Cryptographic posture of 8 PLC firmware images from Rockwell FactoryTalk unknown — vendor attestation required", severity: "high" },
  { area: "Disaster Recovery Site (Regina, SK)", description: "DR environment mirrors production Honeywell DCS but not independently validated for crypto compliance", severity: "medium" },
  { area: "Honeywell Secure Connection Vendor VPN", description: "Third-party remote access channel crypto posture not fully inventoried — relies on vendor self-attestation", severity: "medium" },
];

// ---------------------------------------------------------------------------
// CBOM Scan Failures (Act VI)
// ---------------------------------------------------------------------------

export const CBOM_SCAN_FAILURES: CBOMScanFailure[] = [
  { method: "Honeywell / AB / Schneider OT Protocol Fingerprint", target: "SAGE-3030-RTU-North-03", error: "Connection timeout — satellite uplink latency exceeded 30s", timestamp: "08:34 AM" },
  { method: "Experion / FactoryTalk Firmware Analysis", target: "ControlLogix-5580-South-02", error: "Authentication refused — Rockwell FactoryTalk service account requires OT-network credential", timestamp: "08:37 AM" },
];

// ---------------------------------------------------------------------------
// Action Items — Morning Summary (Act V)
// ---------------------------------------------------------------------------

export const DEMO_ACTION_ITEMS: ActionItem[] = [
  { title: "Re-engineer batch-004 PA-850 DMZ rules to avoid Modbus/TCP disruption to ControlLogix/SAGE 3030", owner: "one-vector", priority: "critical", status: "open" },
  { title: "Schedule manual review of IT/OT DMZ segmentation with Prairie Fuels OT team", owner: "Lewis Cypher (CISO)", priority: "high", status: "open" },
  { title: "Validate Bill C-8 §9(1) cybersecurity program evidence package for CER submission", owner: "one-intel", priority: "high", status: "in_progress" },
  { title: "Update trust decay model parameters post-ArcaneDoor remediation", owner: "one-echo", priority: "medium", status: "open" },
  { title: "File 72-hour incident notification to CSE/CCCS per Bill C-8 §15", owner: "Lewis Cypher (CISO)", priority: "high", status: "done" },
];

export const UC1_ACTION_ITEMS = DEMO_ACTION_ITEMS;

// ---------------------------------------------------------------------------
// Action Items — Quantum Governance (Act VI)
// ---------------------------------------------------------------------------

export const QUANTUM_ACTION_ITEMS: ActionItem[] = [
  { title: "Complete Honeywell/AB/Schneider OT protocol fingerprinting for remaining 11 targets", owner: "one-shadow", priority: "high", status: "in_progress" },
  { title: "Remediate RSA-1024 on ControlLogix 5580 and SAGE 3030 firmware signing (critical risk)", owner: "one-vector", priority: "critical", status: "open" },
  { title: "Begin ML-KEM hybrid pilot on Host-01 Cisco ASA 5545-X VPN TLS termination", owner: "one-vector", priority: "high", status: "open" },
  { title: "Request CBOM attestations from Honeywell, Rockwell, Schneider firmware suppliers", owner: "one-intel", priority: "high", status: "open" },
  { title: "Establish crypto-agility baseline for all Experion DCS and Safety Manager SC systems", owner: "one-shadow", priority: "medium", status: "open" },
  { title: "Schedule satellite-linked SAGE 3030 RTU audit (Northern Segment)", owner: "one-shadow", priority: "medium", status: "open" },
];

export const UC2_ACTION_ITEMS = QUANTUM_ACTION_ITEMS;

// ---------------------------------------------------------------------------
// Teams / Geofence / Attestation Metadata
// ---------------------------------------------------------------------------

export const GEOFENCE_DATA = {
  operator: "1G (James Graham)",
  expectedZone: "Calgary, AB — Radius 50 KM",
  detectedZone: "London, UK — 2,714 KM from fence boundary",
  deltaKm: 2714,
  status: "OUT_OF_BAND" as const,
  site: "YYC HQ",
};

export const ATTESTATION_DATA = {
  identity: "James Graham (1G) — vLEI AID: EKYLRh...9cW",
  governingAuthority: "Canada Bill C-8 (CCSPA) §9(1) / §15",
  teeStatus: "ARM TrustZone — SEALED",
  bypassLevel: "SPATIAL_FENCE_BYPASS_LEVEL_4",
  signingMethod: "iPhone Secure Enclave + Face ID",
};

export const BILL_C8_DATA = {
  jurisdiction: "CER (Canada Energy Regulator)",
  clause: "Part 1, Section 9(1) / Section 15",
  liabilityWindow: "72 hours",
  gateStatus: "ASSERTED" as const,
  operator: "Prairie Fuels Inc.",
  reportingAuthority: "Canadian Centre for Cyber Security (CSE/CCCS)",
};

// ---------------------------------------------------------------------------
// Solution Overview — Demo Section 00
// ---------------------------------------------------------------------------

export const SOLUTION_OVERVIEW = {
  headline: "G1 SIGNALS",
  positioning:
    "Policy-governed secure state machine at the intelligent edge. Decentralized mesh architecture with zero-latency local isolation and cryptographic provenance.",
  capabilities: [
    { icon: "\u25C6", label: "IEEE 2874", detail: "HSTP-1.0 transport protocol" },
    { icon: "\u25A3", label: "KERI / vLEI", detail: "Decentralized identity & attestation" },
    { icon: "\u25B2", label: "NIST CSF 2.0", detail: "Six-function governance alignment" },
    { icon: "\u25C8", label: "Post-Quantum", detail: "FIPS 203/204 cipher migration" },
  ],
};

export const TECH_GLANCE_LAYERS = [
  { id: "agents", label: "AGENT MESH", sublabel: "Autonomous agents \u00B7 KERI-bound identity \u00B7 Exponential trust decay", icon: "\u25C6" },
  { id: "trust", label: "TRUST LAYER", sublabel: "IEEE 2874 \u00B7 HSTP-1.0 wire protocol \u00B7 Microledger provenance \u00B7 9-layer hydration", icon: "\u25A3" },
  { id: "governance", label: "GOVERNANCE FABRIC", sublabel: "NIST CSF 2.0 \u00B7 Bill C-8 (CCSPA) \u00B7 IEC 62443 \u00B7 PQC FIPS 203/204", icon: "\u25B2" },
  { id: "edge", label: "ENTERPRISE EDGE", sublabel: "Spatial isolation \u00B7 Hardware enclaves \u00B7 OT/SCADA integration", icon: "\u25C8" },
];

export const TECH_GLANCE_KPIS = [
  { label: "NIST FUNCTIONS", value: "6" },
  { label: "BOUND AGENTS", value: "7" },
  { label: "TRUST LAYERS", value: "9" },
  { label: "PILLARS", value: "4" },
];

// ---------------------------------------------------------------------------
// Company Origin — G1 Signals History
// ---------------------------------------------------------------------------

export const COMPANY_ORIGIN = {
  headline: "G1 SIGNALS",
  origins: [
    {
      icon: "\u25C6",
      label: "GUILD ONE",
      detail: "Founded 2001, Calgary. Pioneers of blockchain governance \u2014 Forbes Blockchain 50, first energy royalty on-chain. 25 years building trust infrastructure.",
    },
    {
      icon: "\u25CE",
      label: "SIGNAL INTELLIGENCE",
      detail: "Led by a CISSP and former Big 4 security executive with over a decade in enterprise risk. Built the trusted signals bus powering real-time market intelligence \u2014 now the foundational transport layer for G1 Signals.",
    },
    {
      icon: "\u25C8",
      label: "THE CONVERGENCE",
      detail: "Governance-grade trust infrastructure meets autonomous agent orchestration. A single cryptographic fabric purpose-built for cyber and defence \u2014 where every action is attested, every decision is auditable, and sovereignty is non-negotiable.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Scenario Entities — Demo Section 01
// ---------------------------------------------------------------------------

export const SCENARIO_ENTITIES = {
  title: "A DAY IN THE LIFE OF A CISO",
  scenario:
    "June 1, 2026 \u2014 ArcaneDoor exploit chain targets Prairie Fuels' Cisco ASA VPN gateway. Autonomous agents detect, contain, and remediate across IT/OT boundaries while the executive sleeps.",
  personas: [
    { name: "Lewis Cypher", role: "CISO", detail: "Decision authority \u00B7 Plan approval" },
    { name: "James Graham (1G)", role: "CEO", detail: "Break-glass attestation \u00B7 vLEI holder" },
  ],
};

export const DEMO_TIMELINE_ARC = [
  { time: "02:15", label: "CHAIN DETECTED" },
  { time: "02:17", label: "GEOFENCE HALT" },
  { time: "02:20", label: "PLAN APPROVED" },
  { time: "02:25", label: "EXECUTION START" },
  { time: "07:00", label: "MORNING BRIEF" },
  { time: "08:40", label: "QUANTUM GATE" },
];

// ---------------------------------------------------------------------------
// Scenario Rationale — Why ArcaneDoor / Prairie Fuels
// ---------------------------------------------------------------------------

export const SCENARIO_RATIONALE = [
  {
    icon: "\u25C6",
    label: "REAL-WORLD CVEs",
    detail: "Based on the ArcaneDoor campaign (UAT4356) — active exploitation of Cisco ASA VPN gateways targeting critical infrastructure, disclosed 2024.",
  },
  {
    icon: "\u25A3",
    label: "BILL C-8 OBLIGATION",
    detail: "Prairie Fuels operates pipeline-connected refining infrastructure designated under Canada's CCSPA. Mandatory incident reporting to CCCS within 72 hours.",
  },
  {
    icon: "\u25B2",
    label: "IT/OT CONVERGENCE",
    detail: "The exploit chain crosses the IT/OT DMZ boundary — from Cisco ASA perimeter into Honeywell DCS, ControlLogix PLCs, and SAGE 3030 RTUs.",
  },
  {
    icon: "\u25C8",
    label: "POST-QUANTUM EXPOSURE",
    detail: "CBOM scan reveals legacy RSA-2048 and 3DES across OT control systems — a second-order finding that triggers the quantum readiness use case.",
  },
];

