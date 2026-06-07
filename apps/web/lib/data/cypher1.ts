import { NIST_CELL_MAPPINGS, ALL_CELLS } from "./dashboard";
import { CATALOG } from "./catalog";

export interface EcosystemCell {
  code: string;
  name: string;
  handle: string;
  outcome: string;
}

export const ECOSYSTEM_CELLS: EcosystemCell[] = [
  {
    code: "GV",
    name: "Govern",
    handle: "one-intel",
    outcome: "Policy validated continuously, not annually",
  },
  {
    code: "ID",
    name: "Identify",
    handle: "one-shadow",
    outcome: "Every asset, dependency, and risk surface discovered",
  },
  {
    code: "PR",
    name: "Protect",
    handle: "one-vector",
    outcome: "Access enforced and cryptographically bounded",
  },
  {
    code: "DE",
    name: "Detect",
    handle: "one-echo",
    outcome: "Threats correlated across telemetry in real time",
  },
  {
    code: "RS",
    name: "Respond",
    handle: "one-surge",
    outcome: "Incidents contained at machine speed with evidence",
  },
  {
    code: "RC",
    name: "Recover",
    handle: "one-ghost",
    outcome: "Post-incident state sealed and provably clean",
  },
];

export interface Outcome {
  headline: string;
  detail: string;
}

export const OUTCOMES: Outcome[] = [
  {
    headline: "Every decision evidenced.",
    detail:
      "Cryptographic provenance on every agent action. Board-ready audit at any moment — no retroactive evidence collection, no compliance PDFs.",
  },
  {
    headline: "Stale data can't authorize action.",
    detail:
      "Trust decays mathematically over time. When context ages, autonomy self-constrains. Agents that fail to re-attest are demoted automatically.",
  },
  {
    headline: "Tier 4 without headcount.",
    detail:
      "The ecosystem IS the control implementation across all six CSF functions. Continuous compliance without additional FTEs.",
  },
];

export interface MaturityLevel {
  level: string;
  name: string;
  status: string;
  capabilities: string[];
}

export const MATURITY_LEVELS: MaturityLevel[] = [
  {
    level: "L2",
    name: "Contextual",
    status: "Where most organizations plateau",
    capabilities: [
      "Policies documented but reviewed annually",
      "Risk registers updated quarterly by committee",
      "Incident response is human-initiated from alert queues",
      "Compliance validated via periodic audit cycles",
    ],
  },
  {
    level: "L3",
    name: "Telemetry-Driven",
    status: "The monitoring gap",
    capabilities: [
      "SIEM and EDR feed continuous detection",
      "Alerts generated but triage is manual",
      "Patching scheduled but not autonomous",
      "Compliance evidence collected retroactively",
    ],
  },
  {
    level: "L4",
    name: "Reasoning and Autonomous",
    status: "Where CYPHER ONE operates",
    capabilities: [
      "Agents reason across telemetry, context, and threat intel simultaneously",
      "Trust decays mathematically — stale data self-constrains autonomy",
      "Response executes within pre-approved playbook boundaries at machine speed",
      "Compliance is continuous cryptographic attestation, not periodic reporting",
    ],
  },
];

export const CYPHER_ONE_KPIS = {
  nistFunctions: NIST_CELL_MAPPINGS.length,
  boundAgents: ALL_CELLS.length,
  hydrationLayers: 9,
  catalogSurfaces: CATALOG.length,
};
