import type { NistFunction } from "./catalog";
import type { CellRole } from "./cells";

export interface DefenceCellBinding {
  nistFunction: NistFunction;
  functionLabel: string;
  cellHandle: string;
  cellRole: CellRole;
  description: string;
  capabilities: string[];
  autonomyCeiling: number;
}

export const STRATOS1_NIST_BINDINGS: DefenceCellBinding[] = [
  {
    nistFunction: "GV",
    functionLabel: "GOVERN",
    cellHandle: "MANDATE",
    cellRole: "COMPLIANCE_ENGINE",
    description:
      "CMMC, ITAR, and NIST SP 800-171 compliance orchestration. Maps defence regulatory frameworks into enforceable policy gates with sovereign attestation.",
    capabilities: ["CMMC_CROSSWALK", "ITAR_VERIFICATION", "DFARS_AUDIT_CHAIN"],
    autonomyCeiling: 1,
  },
  {
    nistFunction: "ID",
    functionLabel: "IDENTIFY",
    cellHandle: "PHANTOM",
    cellRole: "RECON_SCANNER",
    description:
      "Defence supply chain asset discovery and SBOM/CBOM compilation. Maps classified and unclassified asset inventories with provenance tracking.",
    capabilities: ["SUPPLY_CHAIN_SCAN", "CLASSIFIED_ASSET_DISCOVERY", "SBOM_COMPILE"],
    autonomyCeiling: 2,
  },
  {
    nistFunction: "PR",
    functionLabel: "PROTECT",
    cellHandle: "BASTION",
    cellRole: "ENFORCEMENT_GATE",
    description:
      "Perimeter enforcement and access control for air-gapped and hybrid networks. Manages zero-trust boundary policies across classification levels.",
    capabilities: ["ZERO_TRUST_ENFORCE", "CROSS_DOMAIN_GATE", "ENCLAVE_ISOLATION"],
    autonomyCeiling: 5,
  },
  {
    nistFunction: "DE",
    functionLabel: "DETECT",
    cellHandle: "WATCHGUARD",
    cellRole: "SENSOR_DRONE",
    description:
      "Multi-domain threat surveillance across land, sea, air, space, and cyber. Correlates ISR feeds with cyber telemetry for unified threat picture.",
    capabilities: ["ISR_CORRELATION", "MULTI_DOMAIN_FUSION", "THREAT_INTEL_INGEST"],
    autonomyCeiling: 2,
  },
  {
    nistFunction: "RS",
    functionLabel: "RESPOND",
    cellHandle: "VANGUARD",
    cellRole: "RESPONSE_UNIT",
    description:
      "Mission-critical incident response with playbook execution across classification boundaries. Coordinates containment with operational tempo awareness.",
    capabilities: ["MISSION_PLAYBOOK_DISPATCH", "CONTAINMENT_ENFORCE", "BATTLE_RHYTHM_SYNC"],
    autonomyCeiling: 4,
  },
  {
    nistFunction: "RC",
    functionLabel: "RECOVER",
    cellHandle: "PURGE",
    cellRole: "SANITIZATION_GHOST",
    description:
      "Secure data destruction, classification enforcement, and post-incident recovery. Ensures NIST SP 800-88 media sanitization and evidence sealing.",
    capabilities: ["SECURE_ERASE", "CLASSIFICATION_ENFORCE", "EVIDENCE_SEAL"],
    autonomyCeiling: 4,
  },
];

export interface DefenceUseCase {
  id: string;
  title: string;
  description: string;
  nistFunctions: NistFunction[];
  agents: string[];
}

export const STRATOS1_USE_CASES: DefenceUseCase[] = [
  {
    id: "duc1",
    title: "Classified Network Patching",
    description:
      "Autonomous vulnerability remediation across air-gapped classified networks with cross-domain solution integration and operational tempo-aware scheduling.",
    nistFunctions: ["DE", "RS", "PR", "RC"],
    agents: ["WATCHGUARD", "VANGUARD", "BASTION", "PURGE"],
  },
  {
    id: "duc2",
    title: "Defence Supply Chain CBOM",
    description:
      "Cryptographic Bill of Materials discovery across defence supply chain vendors with ITAR-compliant provenance tracking and PQC readiness assessment.",
    nistFunctions: ["ID", "GV", "PR"],
    agents: ["PHANTOM", "MANDATE", "BASTION"],
  },
  {
    id: "duc3",
    title: "Sovereign Compliance Attestation",
    description:
      "Automated CMMC Level 3 and NIST SP 800-171 compliance verification with continuous monitoring and sovereign cloud deployment.",
    nistFunctions: ["GV", "ID"],
    agents: ["MANDATE", "PHANTOM"],
  },
];

export const STRATOS1_DIFFERENTIATORS = [
  { label: "AIR-GAPPED", detail: "Full operation without external network connectivity" },
  { label: "SOVEREIGN CLOUD", detail: "On-premise and sovereign cloud deployment options" },
  { label: "ITAR COMPLIANT", detail: "International Traffic in Arms Regulations adherence" },
  { label: "CMMC READY", detail: "Cybersecurity Maturity Model Certification alignment" },
  { label: "FEDRAMP PATH", detail: "Federal Risk and Authorization Management Program roadmap" },
  { label: "MULTI-DOMAIN", detail: "Land, sea, air, space, and cyber fusion" },
] as const;

export const STRATOS1_KPIS = {
  nistFunctions: new Set(STRATOS1_NIST_BINDINGS.map((b) => b.nistFunction)).size,
  boundAgents: STRATOS1_NIST_BINDINGS.length,
  complianceFrameworks: 4,
  classificationLevels: 3,
} as const;
