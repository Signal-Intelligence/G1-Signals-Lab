import type { NistFunction } from "./dashboard";

export type { NistFunction };

export type OwningCell =
  | "SUPERVISOR_CORE"
  | "SENSOR_DRONE"
  | "COMPLIANCE_ENGINE"
  | "ENFORCEMENT_GATE"
  | "RECON_SCANNER"
  | "SANITIZATION_GHOST"
  | "RESPONSE_UNIT";

export const OWNING_CELLS: OwningCell[] = [
  "SUPERVISOR_CORE",
  "SENSOR_DRONE",
  "COMPLIANCE_ENGINE",
  "ENFORCEMENT_GATE",
  "RECON_SCANNER",
  "SANITIZATION_GHOST",
  "RESPONSE_UNIT",
];

export const NIST_FUNCTIONS: NistFunction[] = ["GV", "ID", "PR", "DE", "RS", "RC"];

export interface CatalogEntry {
  catalogId: string;
  owningCell: OwningCell;
  nistFunction: NistFunction;
  description: string;
}

export const CATALOG: CatalogEntry[] = [
  {
    catalogId: "signals-ui-catalog-alert--critical-chain",
    owningCell: "SENSOR_DRONE",
    nistFunction: "DE",
    description: "Critical vulnerability chain detection alert",
  },
  {
    catalogId: "signals-ui-catalog-message--agent-briefing",
    owningCell: "SUPERVISOR_CORE",
    nistFunction: "RS",
    description: "Agent-to-human structured briefing message",
  },
  {
    catalogId: "signals-ui-catalog-approval--vlei-attestation",
    owningCell: "COMPLIANCE_ENGINE",
    nistFunction: "GV",
    description: "vLEI/KERI approval and provenance verification",
  },
  {
    catalogId: "signals-ui-catalog-indicator--reasoning",
    owningCell: "SUPERVISOR_CORE",
    nistFunction: "RS",
    description: "Agent reasoning progress indicator",
  },
  {
    catalogId: "signals-ui-catalog-plan--remediation",
    owningCell: "SUPERVISOR_CORE",
    nistFunction: "RS",
    description: "Structured remediation plan with collapsible sections",
  },
  {
    catalogId: "signals-ui-catalog-dashboard--execution",
    owningCell: "RESPONSE_UNIT",
    nistFunction: "RS",
    description: "Live remediation execution dashboard with batch tracking",
  },
  {
    catalogId: "signals-ui-catalog-dashboard--morning-briefing",
    owningCell: "SUPERVISOR_CORE",
    nistFunction: "RS",
    description: "Executive morning security posture briefing",
  },
  {
    catalogId: "signals-ui-catalog-dashboard--cbom-discovery",
    owningCell: "RECON_SCANNER",
    nistFunction: "ID",
    description: "Cryptographic Bill of Materials discovery scan dashboard",
  },
  {
    catalogId: "signals-ui-catalog-dashboard--cbom-executive",
    owningCell: "RECON_SCANNER",
    nistFunction: "ID",
    description: "CBOM executive summary with action items",
  },
  {
    catalogId: "signals-ui-catalog-document--comprehensive-plan",
    owningCell: "SUPERVISOR_CORE",
    nistFunction: "RS",
    description: "Full multi-section plan document with evidence sections",
  },
  {
    catalogId: "signals-ui-catalog-timeline--pqc-migration",
    owningCell: "RECON_SCANNER",
    nistFunction: "ID",
    description: "PQC migration timeline with milestone tracking",
  },
  {
    catalogId: "signals-ui-catalog-list--pqc-priorities",
    owningCell: "RECON_SCANNER",
    nistFunction: "ID",
    description: "Ranked PQC transition priority list",
  },
  {
    catalogId: "signals-ui-catalog-teams--notification",
    owningCell: "SENSOR_DRONE",
    nistFunction: "DE",
    description: "Microsoft Teams adaptive card notification",
  },
  {
    catalogId: "signals-ui-catalog-teams--attestation",
    owningCell: "ENFORCEMENT_GATE",
    nistFunction: "PR",
    description: "Teams vLEI biometric attestation challenge card",
  },
  {
    catalogId: "signals-ui-catalog-halt--geofence",
    owningCell: "SENSOR_DRONE",
    nistFunction: "DE",
    description: "Spatial geofence violation halt notification",
  },
  {
    catalogId: "signals-ui-catalog-mandate--sovereign-ccspa",
    owningCell: "COMPLIANCE_ENGINE",
    nistFunction: "GV",
    description: "Sovereign CCSPA (Bill C-8) mandate card",
  },
  {
    catalogId: "signals-ui-catalog-resolution--microledger",
    owningCell: "SUPERVISOR_CORE",
    nistFunction: "RS",
    description: "Microledger assertion resolution card",
  },
  {
    catalogId: "signals-ui-catalog-interlock--quantum-cipher",
    owningCell: "ENFORCEMENT_GATE",
    nistFunction: "PR",
    description: "Quantum cipher enforcement interlock card",
  },
  {
    catalogId: "signals-ui-catalog-overview--solution",
    owningCell: "SUPERVISOR_CORE",
    nistFunction: "GV",
    description: "Branded solution overview card",
  },
  {
    catalogId: "signals-ui-catalog-overview--tech-glance",
    owningCell: "SUPERVISOR_CORE",
    nistFunction: "GV",
    description: "Technology-at-a-glance layered preview",
  },
  {
    catalogId: "signals-ui-catalog-scenario--entity-intro",
    owningCell: "SUPERVISOR_CORE",
    nistFunction: "GV",
    description: "Scenario / persona introduction card",
  },
  {
    catalogId: "signals-ui-catalog-diagram--topology",
    owningCell: "SUPERVISOR_CORE",
    nistFunction: "ID",
    description: "Cell topology diagram",
  },
  {
    catalogId: "signals-ui-catalog-pipeline--hydration",
    owningCell: "SUPERVISOR_CORE",
    nistFunction: "ID",
    description: "Hydration pipeline view",
  },
  {
    catalogId: "signals-ui-catalog-gauge--trust-decay",
    owningCell: "SUPERVISOR_CORE",
    nistFunction: "GV",
    description: "Trust confidence decay gauge",
  },
  {
    catalogId: "signals-ui-catalog-gate--autonomy",
    owningCell: "ENFORCEMENT_GATE",
    nistFunction: "GV",
    description: "Autonomy gate / ceiling card",
  },
  {
    catalogId: "signals-ui-catalog-matrix--nist-posture",
    owningCell: "COMPLIANCE_ENGINE",
    nistFunction: "GV",
    description: "NIST CSF 2.0 posture matrix",
  },
  {
    catalogId: "signals-ui-catalog-panel--cell-typology",
    owningCell: "SUPERVISOR_CORE",
    nistFunction: "ID",
    description: "Agent-to-cell typology panel",
  },
  {
    catalogId: "signals-ui-catalog-list--priority",
    owningCell: "SUPERVISOR_CORE",
    nistFunction: "RS",
    description: "Ranked priority list with confidence tiers",
  },
];
