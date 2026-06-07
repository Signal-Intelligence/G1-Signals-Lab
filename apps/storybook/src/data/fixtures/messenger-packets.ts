// G1 Signals Lab — HSTP-1.0 Messenger Packet Fixtures
// Complete coverage: every catalog-registered component has a wire-format fixture.

import type { SignalsUiMessenger } from "../../types/signals-wire-schema";

// ---------------------------------------------------------------------------
// Shared transport / compliance / KERI scaffolds
// ---------------------------------------------------------------------------

const TRANSPORT_CYPHER_ONE = {
  protocol_class: "HSTP-1.0" as const,
  serialization_format: "HSML-JSON" as const,
  routing_context_aid: "did:keri:I1A7d93Zk_CypherOne_Supervisor_Master_AID",
  global_session_said: "E3A9x_Session_SAID_20260601_021500_Z",
};

const TRANSPORT_ONE_ECHO = {
  ...TRANSPORT_CYPHER_ONE,
  routing_context_aid: "did:keri:I1A7d93Zk_OneEcho_Core_Master_AID",
};

const TRANSPORT_ONE_SHADOW = {
  ...TRANSPORT_CYPHER_ONE,
  routing_context_aid: "did:keri:I5E3h67Zo_OneShadow_Recon_Master_AID",
};

const TRANSPORT_ONE_VECTOR = {
  ...TRANSPORT_CYPHER_ONE,
  routing_context_aid: "did:keri:I2B5e44Xk_OneVector_Enforce_Master_AID",
};

const TRANSPORT_ONE_INTEL = {
  ...TRANSPORT_CYPHER_ONE,
  routing_context_aid: "did:keri:I3C6f55Yl_OneIntel_Govern_Master_AID",
};

const TRANSPORT_ONE_GHOST = {
  ...TRANSPORT_CYPHER_ONE,
  routing_context_aid: "did:keri:I6F8j99Ap_OneGhost_Sanitize_Master_AID",
};

const TRANSPORT_ONE_SURGE = {
  ...TRANSPORT_CYPHER_ONE,
  routing_context_aid: "did:keri:I4D7g66Zm_OneSurge_Respond_Master_AID",
};

const COMPLIANCE_BILL_C8_CRITICAL = {
  active_registry_gates: [
    { registry_id: "REG-GATE-BILL-C8-S9-S15", authority_statute: "Canada Bill C-8 (CCSPA)", legal_gate_status: "ASSERTED_CRITICAL" as const },
  ],
  compliance_state_hash: "SAID::E9A1b_Compliance_State_Breach_Snapshot",
};

const COMPLIANCE_BILL_C8_COMPLIANT = {
  active_registry_gates: [
    { registry_id: "REG-GATE-BILL-C8-S9-S15", authority_statute: "Canada Bill C-8 (CCSPA)", legal_gate_status: "VERIFIED_COMPLIANT" as const },
  ],
  compliance_state_hash: "SAID::E7D5b_Compliance_State_Compliant",
};

const COMPLIANCE_PQC = {
  active_registry_gates: [
    { registry_id: "REG-GATE-NIST-PQC-FIPS203", authority_statute: "NIST FIPS 203 (ML-KEM)", legal_gate_status: "VERIFIED_COMPLIANT" as const },
  ],
  compliance_state_hash: "SAID::E5C3z_Compliance_State_PQC_Baseline",
};

const COMPLIANCE_FULL = {
  active_registry_gates: [
    { registry_id: "REG-GATE-BILL-C8-S9-S15", authority_statute: "Canada Bill C-8 (CCSPA)", legal_gate_status: "VERIFIED_COMPLIANT" as const },
    { registry_id: "REG-GATE-NIST-PQC-FIPS203", authority_statute: "NIST FIPS 203 (ML-KEM)", legal_gate_status: "VERIFIED_COMPLIANT" as const },
  ],
  compliance_state_hash: "SAID::E8F6c_Compliance_State_Full_Resolution",
};

const KERI_SGX = (seq: number) => ({
  kel_sequence_num: seq,
  tee_attestation: {
    enclave_hardware_class: "TEE_HARDWARE_SGX" as const,
    cryptographic_quote_hash: `0x${seq.toString(16).padStart(64, "a")}`,
    status: "ATTESTATION_VERIFIED_TRUE" as const,
  },
});

const KERI_NITRO = (seq: number) => ({
  kel_sequence_num: seq,
  tee_attestation: {
    enclave_hardware_class: "TEE_HARDWARE_NITRO" as const,
    cryptographic_quote_hash: `0x${seq.toString(16).padStart(64, "b")}`,
    status: "ATTESTATION_VERIFIED_TRUE" as const,
  },
});

// ---------------------------------------------------------------------------
// Demo Act Packets (original 6 — IDs corrected)
// ---------------------------------------------------------------------------

export const MESSENGER_ACT1_BREACH: SignalsUiMessenger = {
  ieee_2874_transport_header: TRANSPORT_ONE_ECHO,
  signals_compliance_ledger: COMPLIANCE_BILL_C8_CRITICAL,
  keri_infrastructure: KERI_SGX(412),
  g1_signals_payload_blocks: [
    {
      signalsUiCatalogId: "signals-ui-catalog-alert--critical-chain",
      said: "E1B7c_NotificationCard_Chain_SAID",
      signalsUiProperties: {
        severity: "Critical",
        title: "Post-Mythos Exploit Chain Detected",
        systemCount: 4,
        chainSummary: "CVE-2026-901A (CVSS 9.8) on Cisco ASA 5545-X chains through CVE-2026-3142 enabling lateral movement via compromised Honeywell vendor VPN credentials to PHD Historian. ArcaneDoor (UAT4356) campaign IOCs confirmed across Host-01, Host-02, Host-04.",
        timestamp: "02:15 AM EDT — Jun 1, 2026",
        vulnCount: 2,
        threatType: "MULTI-VECTOR CHAIN — 4 SYSTEMS",
      },
    },
  ],
};

export const MESSENGER_ACT2_GEOFENCE: SignalsUiMessenger = {
  ieee_2874_transport_header: TRANSPORT_ONE_ECHO,
  signals_compliance_ledger: COMPLIANCE_BILL_C8_CRITICAL,
  keri_infrastructure: KERI_SGX(413),
  g1_signals_payload_blocks: [
    {
      signalsUiCatalogId: "signals-ui-catalog-halt--geofence",
      said: "E2C8d_GeofenceHalt_SAID",
      signalsUiProperties: {
        title: "SPATIAL FENCE VIOLATION — EXECUTION HALTED",
        expectedZone: "Calgary, AB — Radius 50 KM",
        detectedZone: "London, UK — 2,714 KM out of band",
        ctaLabel: "BREAK-GLASS ATTESTATION",
        kpis: [
          { label: "DELTA", value: "2,714 KM", accent: "text-severity-critical" },
          { label: "STATE", value: "HSML_HALTED", accent: "text-severity-critical" },
          { label: "AUTH", value: "vLEI REQUIRED" },
        ],
      },
    },
    {
      signalsUiCatalogId: "signals-ui-catalog-teams--attestation",
      said: "E3D9e_TeamsAttestation_SAID",
      signalsUiProperties: {
        title: "BIOMETRIC RE-ATTESTATION REQUIRED",
        subheader: "SPATIAL FENCE BYPASS — LEVEL 4",
        legalText: "Current HSML state is HSML_HALTED. Your vLEI credential must be re-verified via biometric attestation to restore execution authority.",
        ctaLabel: "ATTEST WITH FACE ID",
        metadata: [
          { label: "Identity", value: "James Graham (1G) — vLEI AID: EKYLRh...9cW" },
          { label: "Authority", value: "Canada Bill C-8 (CCSPA) §9(1) / §15" },
          { label: "TEE", value: "ARM TrustZone — SEALED" },
        ],
      },
    },
  ],
};

export const MESSENGER_ACT3_REMEDIATION: SignalsUiMessenger = {
  ieee_2874_transport_header: TRANSPORT_ONE_SURGE,
  signals_compliance_ledger: COMPLIANCE_BILL_C8_CRITICAL,
  keri_infrastructure: KERI_SGX(414),
  g1_signals_payload_blocks: [
    {
      signalsUiCatalogId: "signals-ui-catalog-dashboard--execution",
      said: "E3F1g_ExecutionDashboard_SAID",
      signalsUiProperties: {
        title: "AUTONOMOUS REMEDIATION — ACTIVE",
        batchCount: 5,
        completedCount: 3,
        failedCount: 1,
        rolledBackCount: 1,
        trustScoreDelta: "+12.4%",
        evidenceReceipts: 14,
      },
    },
    {
      signalsUiCatalogId: "signals-ui-catalog-approval--vlei-attestation",
      said: "E4G2h_ApprovalCard_SAID",
      signalsUiProperties: {
        title: "MANUAL ESCALATION — HOST-03 ROLLBACK",
        description: "Automated patch for CVE-2026-3142 failed integrity validation on Host-03. Service health degraded below threshold (82% → 64%). Requesting manual approval for alternative remediation path.",
        severity: "High",
        approvalType: "REMEDIATION_OVERRIDE",
        ctaLabel: "APPROVE ALTERNATIVE PATH",
      },
    },
  ],
};

export const MESSENGER_ACT4_MORNING: SignalsUiMessenger = {
  ieee_2874_transport_header: TRANSPORT_CYPHER_ONE,
  signals_compliance_ledger: COMPLIANCE_BILL_C8_COMPLIANT,
  keri_infrastructure: KERI_SGX(416),
  g1_signals_payload_blocks: [
    {
      signalsUiCatalogId: "signals-ui-catalog-dashboard--morning-briefing",
      said: "E5H3i_MorningDashboard_SAID",
      signalsUiProperties: {
        title: "MORNING BRIEFING — CISO DIGEST",
        totalVulns: 6,
        remediated: 4,
        failed: 1,
        rolledBack: 1,
        pendingManual: 1,
        trustScoreBefore: 71.2,
        trustScoreAfter: 89.6,
        evidenceReceipts: 18,
      },
    },
  ],
};

export const MESSENGER_ACT5_QUANTUM: SignalsUiMessenger = {
  ieee_2874_transport_header: TRANSPORT_ONE_SHADOW,
  signals_compliance_ledger: COMPLIANCE_PQC,
  keri_infrastructure: KERI_NITRO(418),
  nist_pqc_inventory_registry: {
    cbom_format: "CycloneDX-1.6::CBOM",
    vulnerable_algorithm_count: 47,
    target_compliance_protocols: ["FIPS-203 (ML-KEM)", "FIPS-204 (ML-DSA)"],
  },
  g1_signals_payload_blocks: [
    {
      signalsUiCatalogId: "signals-ui-catalog-interlock--quantum-gate",
      said: "E6D4a_QuantumInterlock_SAID",
      signalsUiProperties: {
        title: "PQC ALGORITHM INTERLOCK GATE",
        subheader: "FIPS 203/204 ENTERPRISE CIPHER UPGRADE",
        ctaLabel: "AUTHORIZE INTERLOCK",
        kpis: [
          { label: "LEGACY CIPHERS", value: "47", accent: "text-severity-critical" },
          { label: "TARGET", value: "ML-KEM / ML-DSA" },
          { label: "COVERAGE", value: "34%" },
        ],
      },
    },
  ],
};

export const MESSENGER_ACT6_RESOLUTION: SignalsUiMessenger = {
  ieee_2874_transport_header: TRANSPORT_ONE_GHOST,
  signals_compliance_ledger: COMPLIANCE_FULL,
  keri_infrastructure: KERI_SGX(420),
  g1_signals_payload_blocks: [
    {
      signalsUiCatalogId: "signals-ui-catalog-resolution--incident-close",
      said: "E7I4j_Resolution_SAID",
      signalsUiProperties: {
        title: "SESSION RESOLUTION — ALL GATES PASSED",
        resolvedAt: "08:42 AM EDT — Jun 1, 2026",
        gatesCleared: 2,
        totalPatches: 5,
        trustScoreFinal: 89.6,
        sessionDuration: "6h 27m",
        evidenceChainHash: "SAID::E9A1b_Evidence_Chain_Complete",
      },
    },
  ],
};

// ---------------------------------------------------------------------------
// Per-Component Packets (one per catalog entry not covered above)
// ---------------------------------------------------------------------------

export const MESSENGER_MESSAGE_BRIEFING: SignalsUiMessenger = {
  ieee_2874_transport_header: TRANSPORT_CYPHER_ONE,
  signals_compliance_ledger: COMPLIANCE_BILL_C8_CRITICAL,
  keri_infrastructure: KERI_SGX(421),
  g1_signals_payload_blocks: [
    {
      signalsUiCatalogId: "signals-ui-catalog-message--agent-briefing",
      said: "E8A1_MessageCard_Briefing_SAID",
      signalsUiProperties: {
        sender: "CYPHER ONE",
        sections: [
          { title: "Chain Analysis", content: "CVE-2026-901A on Host-01 (Cisco ASA 5545-X VPN) chains with CVE-2026-3142 on Host-02 (ASA Mgmt Plane) via compromised Honeywell vendor credentials to Host-04 (Honeywell PHD Historian). ArcaneDoor campaign (UAT4356). Combined CVSS path score: 9.8." },
          { title: "Recommendation", content: "Immediate Level-4 autonomous remediation: ASA firmware upgrade (9.16.4.85), vendor credential revocation, PHD Historian isolation, IT/OT DMZ tightening via PA-850." },
        ],
        actionLabel: "Build Remediation Plan",
      },
    },
  ],
};

export const MESSENGER_THINKING: SignalsUiMessenger = {
  ieee_2874_transport_header: TRANSPORT_CYPHER_ONE,
  signals_compliance_ledger: COMPLIANCE_BILL_C8_CRITICAL,
  keri_infrastructure: KERI_SGX(422),
  g1_signals_payload_blocks: [
    {
      signalsUiCatalogId: "signals-ui-catalog-indicator--reasoning",
      said: "E8B2_ThinkingIndicator_SAID",
      signalsUiProperties: {
        steps: [
          "Correlating CVE chain across 4 hosts...",
          "Computing blast radius via topology graph...",
          "Evaluating Bill C-8 §15 notification threshold...",
          "Building remediation plan with rollback constraints...",
          "Generating evidence receipts for compliance ledger...",
        ],
        currentStep: 2,
        isComplete: false,
      },
    },
  ],
};

export const MESSENGER_PLAN: SignalsUiMessenger = {
  ieee_2874_transport_header: TRANSPORT_CYPHER_ONE,
  signals_compliance_ledger: COMPLIANCE_BILL_C8_CRITICAL,
  keri_infrastructure: KERI_SGX(423),
  g1_signals_payload_blocks: [
    {
      signalsUiCatalogId: "signals-ui-catalog-plan--remediation",
      said: "E8C3_PlanCard_SAID",
      signalsUiProperties: {
        title: "REMEDIATION PLAN — ARCANEDOOR CHAIN",
        subtitle: "5-batch autonomous remediation with rollback constraints",
        steps: [
          { label: "Batch 1 — ASA Firmware Upgrade", detail: "Host-01: Cisco ASA 5545-X → v9.16.4.85", status: "ready" },
          { label: "Batch 2 — Credential Revocation", detail: "Honeywell vendor VPN creds → revoke + rotate", status: "ready" },
          { label: "Batch 3 — PHD Historian Isolation", detail: "Host-04: Network segment isolation via PA-850 rule", status: "ready" },
        ],
      },
    },
  ],
};

export const MESSENGER_CBOM_DISCOVERY: SignalsUiMessenger = {
  ieee_2874_transport_header: TRANSPORT_ONE_SHADOW,
  signals_compliance_ledger: COMPLIANCE_PQC,
  keri_infrastructure: KERI_NITRO(424),
  g1_signals_payload_blocks: [
    {
      signalsUiCatalogId: "signals-ui-catalog-dashboard--cbom-discovery",
      said: "E8D4_CBOMDiscovery_SAID",
      signalsUiProperties: {
        title: "CBOM DISCOVERY SCAN — PRAIRIE FUELS OT",
        totalAssets: 47,
        scannedAssets: 38,
        vulnerableAlgorithms: 12,
        scanProgress: 81,
      },
    },
  ],
};

export const MESSENGER_CBOM_EXECUTIVE: SignalsUiMessenger = {
  ieee_2874_transport_header: TRANSPORT_ONE_SHADOW,
  signals_compliance_ledger: COMPLIANCE_PQC,
  keri_infrastructure: KERI_NITRO(425),
  g1_signals_payload_blocks: [
    {
      signalsUiCatalogId: "signals-ui-catalog-dashboard--cbom-executive",
      said: "E8E5_CBOMExecutive_SAID",
      signalsUiProperties: {
        title: "CBOM EXECUTIVE SUMMARY",
        totalAlgorithms: 47,
        quantumVulnerable: 31,
        mitigated: 16,
        criticalPriority: 8,
      },
    },
  ],
};

export const MESSENGER_PLAN_DOCUMENT: SignalsUiMessenger = {
  ieee_2874_transport_header: TRANSPORT_CYPHER_ONE,
  signals_compliance_ledger: COMPLIANCE_BILL_C8_CRITICAL,
  keri_infrastructure: KERI_SGX(426),
  g1_signals_payload_blocks: [
    {
      signalsUiCatalogId: "signals-ui-catalog-document--comprehensive-plan",
      said: "E8F6_PlanDocument_SAID",
      signalsUiProperties: {
        title: "COMPREHENSIVE REMEDIATION PLAN",
        subtitle: "ArcaneDoor Chain — Prairie Fuels Inc.",
        summary: "Five-batch remediation addressing CVE-2026-901A exploit chain across Cisco ASA, Honeywell PHD Historian, and ControlLogix PLCs.",
      },
    },
  ],
};

export const MESSENGER_TIMELINE: SignalsUiMessenger = {
  ieee_2874_transport_header: TRANSPORT_ONE_SHADOW,
  signals_compliance_ledger: COMPLIANCE_PQC,
  keri_infrastructure: KERI_NITRO(427),
  g1_signals_payload_blocks: [
    {
      signalsUiCatalogId: "signals-ui-catalog-timeline--pqc-migration",
      said: "E8G7_Timeline_SAID",
      signalsUiProperties: {
        title: "PQC MIGRATION TIMELINE",
        milestones: [
          { label: "CBOM Inventory Complete", target: "Q3 2026", status: "in-progress" },
          { label: "Algorithm Assessment", target: "Q4 2026", status: "pending" },
          { label: "Pilot Deployment (ML-KEM)", target: "Q1 2027", status: "pending" },
        ],
      },
    },
  ],
};

export const MESSENGER_PRIORITY_LIST: SignalsUiMessenger = {
  ieee_2874_transport_header: TRANSPORT_ONE_SHADOW,
  signals_compliance_ledger: COMPLIANCE_PQC,
  keri_infrastructure: KERI_NITRO(428),
  g1_signals_payload_blocks: [
    {
      signalsUiCatalogId: "signals-ui-catalog-list--pqc-priorities",
      said: "E8H8_PriorityList_SAID",
      signalsUiProperties: {
        title: "PQC TRANSITION PRIORITIES",
        items: [
          { rank: 1, label: "ControlLogix 5580 — RSA-1024 firmware signing", severity: "Critical" },
          { rank: 2, label: "Cisco ASA — IKEv2 with RSA-2048", severity: "High" },
          { rank: 3, label: "PHD Historian — TLS 1.2 with ECDHE-RSA", severity: "High" },
        ],
      },
    },
  ],
};

export const MESSENGER_TEAMS_NOTIFICATION: SignalsUiMessenger = {
  ieee_2874_transport_header: TRANSPORT_ONE_ECHO,
  signals_compliance_ledger: COMPLIANCE_BILL_C8_CRITICAL,
  keri_infrastructure: KERI_SGX(429),
  g1_signals_payload_blocks: [
    {
      signalsUiCatalogId: "signals-ui-catalog-teams--notification",
      said: "E8I9_TeamsNotification_SAID",
      signalsUiProperties: {
        title: "CRITICAL VULNERABILITY CHAIN — PRAIRIE FUELS",
        severity: "Critical",
        bullets: [
          "ArcaneDoor exploit chain detected across 4 OT systems",
          "Bill C-8 §15 72-hour CSE notification triggered",
          "Autonomous remediation initiated by CYPHER ONE",
        ],
      },
    },
  ],
};

export const MESSENGER_BILL_C8: SignalsUiMessenger = {
  ieee_2874_transport_header: TRANSPORT_ONE_INTEL,
  signals_compliance_ledger: COMPLIANCE_BILL_C8_CRITICAL,
  keri_infrastructure: KERI_SGX(430),
  g1_signals_payload_blocks: [
    {
      signalsUiCatalogId: "signals-ui-catalog-mandate--sovereign-ccspa",
      said: "E8J0_BillC8Mandate_SAID",
      signalsUiProperties: {
        title: "BILL C-8 (CCSPA) MANDATE ASSERTION",
        subheader: "DESIGNATED OPERATOR — PRAIRIE FUELS INC.",
        kpis: [
          { label: "§9(1) PROGRAM", value: "ACTIVE" },
          { label: "§15 CSE NOTIFY", value: "TRIGGERED" },
          { label: "§12 DIRECTIVE", value: "COMPLIANT" },
        ],
      },
    },
  ],
};

export const MESSENGER_ORCHESTRATOR_STRIP: SignalsUiMessenger = {
  ieee_2874_transport_header: TRANSPORT_CYPHER_ONE,
  signals_compliance_ledger: COMPLIANCE_BILL_C8_COMPLIANT,
  keri_infrastructure: KERI_SGX(431),
  g1_signals_payload_blocks: [
    {
      signalsUiCatalogId: "signals-ui-catalog-strip--orchestrator",
      said: "E8K1_OrchestratorStrip_SAID",
      signalsUiProperties: {
        handle: "CYPHER ONE",
        subtitle: "NIST-BOUND DELEGATION \u00B7 TRUST-DECAYED GOVERNANCE \u00B7 FULL AUTONOMY",
        autonomyLevel: 5,
        confidence: 99,
      },
    },
  ],
};

export const MESSENGER_PILLAR_ROW: SignalsUiMessenger = {
  ieee_2874_transport_header: TRANSPORT_CYPHER_ONE,
  signals_compliance_ledger: COMPLIANCE_BILL_C8_COMPLIANT,
  keri_infrastructure: KERI_SGX(432),
  g1_signals_payload_blocks: [
    {
      signalsUiCatalogId: "signals-ui-catalog-row--nist-pillars",
      said: "E8L2_NistPillarRow_SAID",
      signalsUiProperties: {},
    },
  ],
};

export const MESSENGER_HUB_SPOKE: SignalsUiMessenger = {
  ieee_2874_transport_header: TRANSPORT_CYPHER_ONE,
  signals_compliance_ledger: COMPLIANCE_BILL_C8_COMPLIANT,
  keri_infrastructure: KERI_SGX(433),
  g1_signals_payload_blocks: [
    {
      signalsUiCatalogId: "signals-ui-catalog-visual--agent-hub-spoke",
      said: "E8M3_AgentHubSpoke_SAID",
      signalsUiProperties: {
        centerLabel: "CYPHER ONE",
      },
    },
  ],
};

export const MESSENGER_KPI_RIBBON: SignalsUiMessenger = {
  ieee_2874_transport_header: TRANSPORT_CYPHER_ONE,
  signals_compliance_ledger: COMPLIANCE_BILL_C8_COMPLIANT,
  keri_infrastructure: KERI_SGX(434),
  g1_signals_payload_blocks: [
    {
      signalsUiCatalogId: "signals-ui-catalog-ribbon--kpi",
      said: "E8N4_KpiRibbon_SAID",
      signalsUiProperties: {
        items: [
          { label: "TOTAL AGENTS", value: "7" },
          { label: "HYDRATION COVERAGE", value: "92%" },
          { label: "AVG CONFIDENCE", value: "96%" },
          { label: "ACTIVE GATES", value: "6/6" },
        ],
      },
    },
  ],
};

export const MESSENGER_NIST_DASHBOARD: SignalsUiMessenger = {
  ieee_2874_transport_header: TRANSPORT_CYPHER_ONE,
  signals_compliance_ledger: COMPLIANCE_BILL_C8_COMPLIANT,
  keri_infrastructure: KERI_SGX(435),
  g1_signals_payload_blocks: [
    {
      signalsUiCatalogId: "signals-ui-catalog-dashboard--nist-agentic",
      said: "E8O5_NistDashboard_SAID",
      signalsUiProperties: {},
    },
  ],
};

export const MESSENGER_G1_OVERVIEW: SignalsUiMessenger = {
  ieee_2874_transport_header: TRANSPORT_CYPHER_ONE,
  signals_compliance_ledger: COMPLIANCE_BILL_C8_COMPLIANT,
  keri_infrastructure: KERI_SGX(436),
  g1_signals_payload_blocks: [
    {
      signalsUiCatalogId: "signals-ui-catalog-page--g1-overview",
      said: "E8P6_G1Overview_SAID",
      signalsUiProperties: {
        headline: "G1 SIGNALS",
      },
    },
  ],
};

export const MESSENGER_SCENARIO_BRIEFING: SignalsUiMessenger = {
  ieee_2874_transport_header: TRANSPORT_CYPHER_ONE,
  signals_compliance_ledger: COMPLIANCE_BILL_C8_COMPLIANT,
  keri_infrastructure: KERI_SGX(437),
  g1_signals_payload_blocks: [
    {
      signalsUiCatalogId: "signals-ui-catalog-page--scenario-briefing",
      said: "E8Q7_ScenarioBriefing_SAID",
      signalsUiProperties: {
        title: "PRAIRIE FUELS INC. — ARCANEDOOR SCENARIO",
      },
    },
  ],
};

export const MESSENGER_SOLUTION_OVERVIEW: SignalsUiMessenger = {
  ieee_2874_transport_header: TRANSPORT_CYPHER_ONE,
  signals_compliance_ledger: COMPLIANCE_BILL_C8_COMPLIANT,
  keri_infrastructure: KERI_SGX(438),
  g1_signals_payload_blocks: [
    {
      signalsUiCatalogId: "signals-ui-catalog-overview--solution",
      said: "E8R8_SolutionOverview_SAID",
      signalsUiProperties: {},
    },
  ],
};

export const MESSENGER_TECH_GLANCE: SignalsUiMessenger = {
  ieee_2874_transport_header: TRANSPORT_CYPHER_ONE,
  signals_compliance_ledger: COMPLIANCE_BILL_C8_COMPLIANT,
  keri_infrastructure: KERI_SGX(439),
  g1_signals_payload_blocks: [
    {
      signalsUiCatalogId: "signals-ui-catalog-overview--tech-glance",
      said: "E8S9_TechGlance_SAID",
      signalsUiProperties: {},
    },
  ],
};

export const MESSENGER_SCENARIO_ENTITY: SignalsUiMessenger = {
  ieee_2874_transport_header: TRANSPORT_CYPHER_ONE,
  signals_compliance_ledger: COMPLIANCE_BILL_C8_COMPLIANT,
  keri_infrastructure: KERI_SGX(440),
  g1_signals_payload_blocks: [
    {
      signalsUiCatalogId: "signals-ui-catalog-briefing--scenario-entity",
      said: "E8T0_ScenarioEntity_SAID",
      signalsUiProperties: {},
    },
  ],
};

export const MESSENGER_COMPANY_OVERVIEW: SignalsUiMessenger = {
  ieee_2874_transport_header: TRANSPORT_CYPHER_ONE,
  signals_compliance_ledger: COMPLIANCE_BILL_C8_COMPLIANT,
  keri_infrastructure: KERI_SGX(441),
  g1_signals_payload_blocks: [
    {
      signalsUiCatalogId: "signals-ui-catalog-overview--company",
      said: "E8U1_CompanyOverview_SAID",
      signalsUiProperties: {},
    },
  ],
};

// ---------------------------------------------------------------------------
// Aggregate exports
// ---------------------------------------------------------------------------

export const ALL_MESSENGER_PACKETS: SignalsUiMessenger[] = [
  MESSENGER_ACT1_BREACH,
  MESSENGER_ACT2_GEOFENCE,
  MESSENGER_ACT3_REMEDIATION,
  MESSENGER_ACT4_MORNING,
  MESSENGER_ACT5_QUANTUM,
  MESSENGER_ACT6_RESOLUTION,
];

export const ALL_COMPONENT_PACKETS: Record<string, SignalsUiMessenger> = {
  "NotificationCard": MESSENGER_ACT1_BREACH,
  "MessageCard": MESSENGER_MESSAGE_BRIEFING,
  "ThinkingIndicator": MESSENGER_THINKING,
  "ApprovalCard": MESSENGER_ACT3_REMEDIATION,
  "PlanCard": MESSENGER_PLAN,
  "ExecutionDashboard": MESSENGER_ACT3_REMEDIATION,
  "MorningDashboard": MESSENGER_ACT4_MORNING,
  "CBOMDiscoveryDashboard": MESSENGER_CBOM_DISCOVERY,
  "CBOMExecutiveDashboard": MESSENGER_CBOM_EXECUTIVE,
  "ComprehensivePlanDocument": MESSENGER_PLAN_DOCUMENT,
  "TimelineView": MESSENGER_TIMELINE,
  "PriorityList": MESSENGER_PRIORITY_LIST,
  "TeamsNotificationCard": MESSENGER_TEAMS_NOTIFICATION,
  "TeamsAttestationCard": MESSENGER_ACT2_GEOFENCE,
  "GeofenceHaltCard": MESSENGER_ACT2_GEOFENCE,
  "BillC8MandateCard": MESSENGER_BILL_C8,
  "ResolutionCard": MESSENGER_ACT6_RESOLUTION,
  "QuantumInterlockCard": MESSENGER_ACT5_QUANTUM,
  "OrchestratorStrip": MESSENGER_ORCHESTRATOR_STRIP,
  "NistPillarRow": MESSENGER_PILLAR_ROW,
  "AgentHubSpoke": MESSENGER_HUB_SPOKE,
  "KpiRibbon": MESSENGER_KPI_RIBBON,
  "NistAgenticDashboard": MESSENGER_NIST_DASHBOARD,
  "G1SignalsOverviewPage": MESSENGER_G1_OVERVIEW,
  "ScenarioBriefingPage": MESSENGER_SCENARIO_BRIEFING,
  "SolutionOverviewCard": MESSENGER_SOLUTION_OVERVIEW,
  "TechGlanceCard": MESSENGER_TECH_GLANCE,
  "ScenarioEntityCard": MESSENGER_SCENARIO_ENTITY,
  "CompanyOverviewCard": MESSENGER_COMPANY_OVERVIEW,
};
