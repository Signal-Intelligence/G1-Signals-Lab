/**
 * Signals UI Catalog
 * Authoritative registry mapping signalsUiCatalogId to components.
 * Enforces the invariant: if not declared in the Catalog, it cannot be rendered.
 */

import type { ComponentType } from "react";
import type { CellRole, NistFunction } from "../types/hsml";

import { NotificationCard } from "../components/NotificationCard";
import { MessageCard } from "../components/MessageCard";
import { ApprovalCard } from "../components/ApprovalCard";
import { ThinkingIndicator } from "../components/ThinkingIndicator";
import { PlanCard } from "../components/PlanCard";
import { ExecutionDashboard } from "../components/ExecutionDashboard";
import { MorningDashboard } from "../components/MorningDashboard";
import { CBOMDiscoveryDashboard } from "../components/CBOMDiscoveryDashboard";
import { CBOMExecutiveDashboard } from "../components/CBOMExecutiveDashboard";
import { ComprehensivePlanDocument } from "../components/ComprehensivePlanDocument";
import { TimelineView } from "../components/TimelineView";
import { PriorityList } from "../components/PriorityList";
import { TeamsNotificationCard } from "../components/TeamsNotificationCard";
import { TeamsAttestationCard } from "../components/TeamsAttestationCard";
import { GeofenceHaltCard } from "../components/GeofenceHaltCard";
import { BillC8MandateCard } from "../components/BillC8MandateCard";
import { ResolutionCard } from "../components/ResolutionCard";
import { QuantumInterlockCard } from "../components/QuantumInterlockCard";
import { SolutionOverviewCard } from "../components/SolutionOverviewCard";
import { TechGlanceCard } from "../components/TechGlanceCard";
import { ScenarioEntityCard } from "../components/ScenarioEntityCard";
import { CompanyOverviewCard } from "../components/CompanyOverviewCard";
import { NistAgenticDashboard } from "../components/NistAgenticDashboard";
import { G1SignalsOverviewPage } from "../components/G1SignalsOverviewPage";
import { ScenarioBriefingPage } from "../components/ScenarioBriefingPage";
import { OrchestratorStrip } from "../components/OrchestratorStrip";
import { NistPillarRow } from "../components/NistPillarRow";
import { AgentHubSpoke } from "../components/AgentHubSpoke";
import { KpiRibbon } from "../components/KpiRibbon";

export interface CatalogEntry {
  catalogId: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: ComponentType<any>;
  owningCell: CellRole;
  nistFunction: NistFunction;
  description: string;
}

export const SIGNALS_UI_CATALOG: CatalogEntry[] = [
  {
    catalogId: "signals-ui-catalog-alert--critical-chain",
    component: NotificationCard,
    owningCell: "SENSOR_DRONE",
    nistFunction: "DE",
    description: "Critical vulnerability chain detection alert",
  },
  {
    catalogId: "signals-ui-catalog-message--agent-briefing",
    component: MessageCard,
    owningCell: "SUPERVISOR_CORE",
    nistFunction: "RS",
    description: "Agent-to-human structured briefing message",
  },
  {
    catalogId: "signals-ui-catalog-approval--vlei-attestation",
    component: ApprovalCard,
    owningCell: "COMPLIANCE_ENGINE",
    nistFunction: "GV",
    description: "vLEI/KERI approval and provenance verification",
  },
  {
    catalogId: "signals-ui-catalog-indicator--reasoning",
    component: ThinkingIndicator,
    owningCell: "SUPERVISOR_CORE",
    nistFunction: "RS",
    description: "Agent reasoning progress indicator",
  },
  {
    catalogId: "signals-ui-catalog-plan--remediation",
    component: PlanCard,
    owningCell: "SUPERVISOR_CORE",
    nistFunction: "RS",
    description: "Structured remediation plan with collapsible sections",
  },
  {
    catalogId: "signals-ui-catalog-dashboard--execution",
    component: ExecutionDashboard,
    owningCell: "RESPONSE_UNIT",
    nistFunction: "RS",
    description: "Live remediation execution dashboard with batch tracking",
  },
  {
    catalogId: "signals-ui-catalog-dashboard--morning-briefing",
    component: MorningDashboard,
    owningCell: "SUPERVISOR_CORE",
    nistFunction: "RS",
    description: "Executive morning security posture briefing",
  },
  {
    catalogId: "signals-ui-catalog-dashboard--cbom-discovery",
    component: CBOMDiscoveryDashboard,
    owningCell: "RECON_SCANNER",
    nistFunction: "ID",
    description: "Cryptographic Bill of Materials discovery scan dashboard",
  },
  {
    catalogId: "signals-ui-catalog-dashboard--cbom-executive",
    component: CBOMExecutiveDashboard,
    owningCell: "RECON_SCANNER",
    nistFunction: "ID",
    description: "CBOM executive summary with action items",
  },
  {
    catalogId: "signals-ui-catalog-document--comprehensive-plan",
    component: ComprehensivePlanDocument,
    owningCell: "SUPERVISOR_CORE",
    nistFunction: "RS",
    description: "Full multi-section plan document with evidence sections",
  },
  {
    catalogId: "signals-ui-catalog-timeline--pqc-migration",
    component: TimelineView,
    owningCell: "RECON_SCANNER",
    nistFunction: "ID",
    description: "PQC migration timeline with milestone tracking",
  },
  {
    catalogId: "signals-ui-catalog-list--pqc-priorities",
    component: PriorityList,
    owningCell: "RECON_SCANNER",
    nistFunction: "ID",
    description: "Ranked PQC transition priority list",
  },
  {
    catalogId: "signals-ui-catalog-teams--notification",
    component: TeamsNotificationCard,
    owningCell: "SENSOR_DRONE",
    nistFunction: "DE",
    description: "Microsoft Teams adaptive card notification",
  },
  {
    catalogId: "signals-ui-catalog-teams--attestation",
    component: TeamsAttestationCard,
    owningCell: "ENFORCEMENT_GATE",
    nistFunction: "PR",
    description: "Teams vLEI biometric attestation challenge card",
  },
  {
    catalogId: "signals-ui-catalog-halt--geofence",
    component: GeofenceHaltCard,
    owningCell: "SENSOR_DRONE",
    nistFunction: "DE",
    description: "Spatial geofence violation halt notification",
  },
  {
    catalogId: "signals-ui-catalog-mandate--sovereign-ccspa",
    component: BillC8MandateCard,
    owningCell: "COMPLIANCE_ENGINE",
    nistFunction: "GV",
    description: "Bill C-8 statutory mandate assertion card",
  },
  {
    catalogId: "signals-ui-catalog-resolution--incident-close",
    component: ResolutionCard,
    owningCell: "SANITIZATION_GHOST",
    nistFunction: "RC",
    description: "Incident resolution and post-remediation summary",
  },
  {
    catalogId: "signals-ui-catalog-interlock--quantum-gate",
    component: QuantumInterlockCard,
    owningCell: "RECON_SCANNER",
    nistFunction: "PR",
    description: "PQC algorithm interlock authorization gate",
  },
  {
    catalogId: "signals-ui-catalog-overview--solution",
    component: SolutionOverviewCard,
    owningCell: "SUPERVISOR_CORE",
    nistFunction: "RS",
    description: "Solution overview and positioning card",
  },
  {
    catalogId: "signals-ui-catalog-overview--tech-glance",
    component: TechGlanceCard,
    owningCell: "SUPERVISOR_CORE",
    nistFunction: "RS",
    description: "High-level technology architecture preview",
  },
  {
    catalogId: "signals-ui-catalog-briefing--scenario-entity",
    component: ScenarioEntityCard,
    owningCell: "SUPERVISOR_CORE",
    nistFunction: "RS",
    description: "Scenario entity introduction and timeline",
  },
  {
    catalogId: "signals-ui-catalog-overview--company",
    component: CompanyOverviewCard,
    owningCell: "SUPERVISOR_CORE",
    nistFunction: "GV",
    description: "Company origin story and capability overview",
  },
  {
    catalogId: "signals-ui-catalog-dashboard--nist-agentic",
    component: NistAgenticDashboard,
    owningCell: "SUPERVISOR_CORE",
    nistFunction: "GV",
    description: "NIST CSF 2.0 agentic ecosystem promotional dashboard",
  },
  {
    catalogId: "signals-ui-catalog-page--g1-overview",
    component: G1SignalsOverviewPage,
    owningCell: "SUPERVISOR_CORE",
    nistFunction: "GV",
    description: "Unified G1 Signals overview page (origin + tech + KPIs)",
  },
  {
    catalogId: "signals-ui-catalog-page--scenario-briefing",
    component: ScenarioBriefingPage,
    owningCell: "SUPERVISOR_CORE",
    nistFunction: "RS",
    description: "Unified scenario briefing page (personas + rationale + timeline)",
  },
  {
    catalogId: "signals-ui-catalog-strip--orchestrator",
    component: OrchestratorStrip,
    owningCell: "SUPERVISOR_CORE",
    nistFunction: "GV",
    description: "Expandable orchestrator status strip with delegation scope and trust detail",
  },
  {
    catalogId: "signals-ui-catalog-row--nist-pillars",
    component: NistPillarRow,
    owningCell: "SUPERVISOR_CORE",
    nistFunction: "GV",
    description: "Interactive NIST CSF 2.0 pillar card row with expandable agent detail",
  },
  {
    catalogId: "signals-ui-catalog-visual--agent-hub-spoke",
    component: AgentHubSpoke,
    owningCell: "SUPERVISOR_CORE",
    nistFunction: "GV",
    description: "Hub-and-spoke SVG visualization of orchestrator-to-agent delegation",
  },
  {
    catalogId: "signals-ui-catalog-ribbon--kpi",
    component: KpiRibbon,
    owningCell: "SUPERVISOR_CORE",
    nistFunction: "GV",
    description: "KPI ribbon with expandable drill-down panels for ecosystem metrics",
  },
];

export function resolveCatalogEntry(catalogId: string): CatalogEntry | null {
  return SIGNALS_UI_CATALOG.find((e) => e.catalogId === catalogId) ?? null;
}

export function getCatalogIds(): string[] {
  return SIGNALS_UI_CATALOG.map((e) => e.catalogId);
}
