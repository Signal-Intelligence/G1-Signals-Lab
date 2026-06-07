/**
 * NistAgenticDashboard
 * Interactive NIST CSF 2.0 agentic ecosystem dashboard — promotional demo centerpiece.
 * Composes from standalone Signal Components: OrchestratorStrip, NistPillarRow,
 * AgentHubSpoke, and KpiRibbon.
 */

import React from "react";
import type { SignalsUiEnvelope } from "../types/signals-ui-envelope";
import type { NistCellMapping } from "./NistPostureMatrix";
import type { CellRegistryEntry } from "./CellTypologyPanel";
import { HeaderStatus, HsmlStateOverlay } from "./primitives";
import { OrchestratorStrip } from "./OrchestratorStrip";
import { NistPillarRow } from "./NistPillarRow";
import { AgentHubSpoke } from "./AgentHubSpoke";
import { KpiRibbon } from "./KpiRibbon";
import type { KpiEntry } from "./KpiRibbon";

export interface NistAgenticDashboardProps {
  mappings: NistCellMapping[];
  registry: CellRegistryEntry[];
  envelope?: SignalsUiEnvelope;
}

const KPI_DRILLDOWNS: Record<string, { label: string; value: string; detail: string }[]> = {
  "TOTAL AGENTS": [
    { label: "CYPHER ONE", value: "Orchestrator", detail: "Supervisor Core \u2014 delegates all domain actions to bound agents" },
    { label: "one-intel", value: "GV", detail: "Compliance Engine \u2014 policy interpretation and regulatory crosswalks" },
    { label: "one-shadow", value: "ID", detail: "Recon Scanner \u2014 asset discovery and CBOM compilation" },
    { label: "one-vector", value: "PR", detail: "Enforcement Gate \u2014 quantum interlocks and containment" },
    { label: "one-echo", value: "DE", detail: "Sensor Drone \u2014 read-only network monitoring and correlation" },
    { label: "one-surge", value: "RS", detail: "Response Unit \u2014 playbook execution under governance" },
    { label: "one-ghost", value: "RC", detail: "Sanitization Ghost \u2014 evidence sealing and workspace cleanup" },
  ],
  "HYDRATION COVERAGE": [
    { label: "GOVERN", value: "98%", detail: "Policy documents, regulatory feeds, and compliance ledger fully ingested" },
    { label: "IDENTIFY", value: "94%", detail: "Asset inventory current \u2014 2 legacy OT subsystems pending passive scan" },
    { label: "PROTECT", value: "96%", detail: "Enforcement rules deployed across all perimeter and DMZ endpoints" },
    { label: "DETECT", value: "97%", detail: "SIEM integration active \u2014 Claroty xDome and Splunk feeds nominal" },
    { label: "RESPOND", value: "99%", detail: "All playbook matrices loaded and validated against current topology" },
    { label: "RECOVER", value: "87%", detail: "Backup validation pending for 2 Schneider SAGE 3030 RTU configs" },
  ],
  "AVG CONFIDENCE": [
    { label: "one-intel", value: "98%", detail: "Last attested 12 min ago \u2014 HIGH tier \u2014 full advisory authority" },
    { label: "one-shadow", value: "94%", detail: "Last attested 28 min ago \u2014 MEDIUM tier \u2014 HITL for remediation actions" },
    { label: "one-vector", value: "96%", detail: "Last attested 18 min ago \u2014 HIGH tier \u2014 full enforcement authority" },
    { label: "one-echo", value: "97%", detail: "Last attested 8 min ago \u2014 HIGH tier \u2014 continuous monitoring active" },
    { label: "one-surge", value: "99%", detail: "Last attested 3 min ago \u2014 HIGH tier \u2014 playbook execution ready" },
    { label: "one-ghost", value: "92%", detail: "Last attested 45 min ago \u2014 MEDIUM tier \u2014 approaching re-attestation window" },
  ],
  "ACTIVE GATES": [
    { label: "GV Gate", value: "ACTIVE", detail: "Compliance assertions require HITL review \u2014 gate enforced" },
    { label: "ID Gate", value: "ACTIVE", detail: "Asset discovery scoped to authorized network segments only" },
    { label: "PR Gate", value: "ACTIVE", detail: "FIPS 203/204 quantum interlock enforced on all new deployments" },
    { label: "DE Gate", value: "ACTIVE", detail: "Read-only invariant enforced \u2014 no write mutations permitted" },
    { label: "RS Gate", value: "ACTIVE", detail: "Playbook execution bounded by approved remediation envelope" },
    { label: "RC Gate", value: "ACTIVE", detail: "KEL integrity lock \u2014 transaction history immutable" },
  ],
};

export function NistAgenticDashboard({
  mappings,
  registry,
  envelope,
}: NistAgenticDashboardProps) {
  const avgConfidence = mappings.reduce((sum, m) => sum + m.posture.confidence, 0) / mappings.length;
  const activeGates = mappings.length;

  const kpiItems: KpiEntry[] = [
    { label: "TOTAL AGENTS", value: "7", drilldown: KPI_DRILLDOWNS["TOTAL AGENTS"] },
    { label: "HYDRATION COVERAGE", value: "92%", drilldown: KPI_DRILLDOWNS["HYDRATION COVERAGE"] },
    { label: "AVG CONFIDENCE", value: `${Math.round(avgConfidence * 100)}%`, drilldown: KPI_DRILLDOWNS["AVG CONFIDENCE"] },
    { label: "ACTIVE GATES", value: `${activeGates}/${activeGates}`, drilldown: KPI_DRILLDOWNS["ACTIVE GATES"] },
  ];

  return (
    <div className="relative">
      {envelope && <HsmlStateOverlay hsmlState={envelope.hsmlState} />}
      <div className="glass-panel border-l-2 border-l-accent-blue rounded-none p-6 overflow-hidden">
        <div className="radial-glow" style={{ width: 400, height: 400, top: -120, right: -100, background: "radial-gradient(circle, rgba(0,102,255,0.04) 0%, rgba(0,0,0,0) 70%)" }} />

        {/* Header */}
        <div className="flex items-center justify-between mb-4 relative z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-2 h-2 flex-shrink-0 rounded-full bg-accent-blue" />
            <span className="text-[11px] font-medium uppercase tracking-label text-text-secondary">
              PRODUCT OVERVIEW
            </span>
          </div>
          <HeaderStatus envelope={envelope} />
        </div>

        {/* Headline */}
        <h2 className="font-extralight text-3xl text-white leading-tight mb-1.5 text-glow-sm relative z-10">
          CYPHER ONE
        </h2>
        <p className="text-[9px] font-normal uppercase tracking-telemetry text-text-muted mb-4 relative z-10">
          AUTONOMOUS ORCHESTRATION ACROSS SIX NIST GOVERNANCE PILLARS
        </p>

        {/* Blurb */}
        <p className="text-xs font-extralight text-text-secondary leading-relaxed mb-5 max-w-2xl relative z-10">
          Seven autonomous agents across six NIST governance pillars — every action cryptographically attested, trust-decayed, and evidenced. The first agentic security fabric where compliance isn't a report — it's an invariant.
        </p>

        {/* ── Divider ── */}
        <div className="mb-5 border-t border-border-subtle relative z-10" />

        {/* Section label: Orchestration & Ecosystem */}
        <div className="flex items-center gap-2.5 mb-4 relative z-10">
          <div className="w-2 h-2 flex-shrink-0 rounded-full bg-accent-blue/60" />
          <span className="text-[11px] font-medium uppercase tracking-label text-text-secondary">
            ORCHESTRATION & ECOSYSTEM
          </span>
        </div>

        {/* Orchestrator strip */}
        <div className="mb-4 relative z-10">
          <OrchestratorStrip mappings={mappings} envelope={envelope} />
        </div>

        {/* Pillar cards */}
        <div className="mb-4 relative z-10">
          <NistPillarRow mappings={mappings} registry={registry} envelope={envelope} />
        </div>

        {/* Two-column orchestration model */}
        <div className="grid grid-cols-2 gap-3 mt-4 relative z-10">
          {/* Left — hub-spoke diagram */}
          <div className="glass-panel px-3 py-3">
            <AgentHubSpoke mappings={mappings} envelope={envelope} />
          </div>

          {/* Right — agentic ecosystem (hardcoded contextual text) */}
          <div className="glass-panel px-4 py-3 flex flex-col justify-center gap-4">
            {[
              { label: "NIST-BOUND", text: "Each agent is bound to a specific NIST CSF 2.0 function — one agent per pillar, no overlap, no gaps in coverage." },
              { label: "HYDRATED", text: "Agents ingest pillar-specific systems, data sources, and telemetry feeds — each domain hydrated with the context it needs to act." },
              { label: "CRYPTOGRAPHIC", text: "Every agent is cryptographically bound to its cell role via KERI credentials. Identity is non-transferable, authority is non-delegable." },
              { label: "TRUST-DECAYED", text: "Confidence scores decay exponentially over time. Agents must re-attest to maintain autonomy — high triggers full autonomy, low triggers human-in-the-loop." },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-3">
                <div className="w-px h-full min-h-[28px] bg-accent-blue/30 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] font-medium uppercase tracking-label text-white">{item.label}</span>
                  <p className="text-[9px] font-normal text-text-muted leading-relaxed mt-1">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="mt-5 mb-5 border-t border-border-subtle relative z-10" />

        {/* Section label: KPIs */}
        <div className="flex items-center gap-2.5 mb-4 relative z-10">
          <div className="w-2 h-2 flex-shrink-0 rounded-full bg-accent-blue/60" />
          <span className="text-[11px] font-medium uppercase tracking-label text-text-secondary">
            KEY PERFORMANCE INDICATORS
          </span>
        </div>

        {/* KPI ribbon */}
        <div className="relative z-10">
          <KpiRibbon items={kpiItems} />
        </div>

        {/* Footer */}
        <div className="mt-5 pt-3 border-t border-border-subtle relative z-10">
          <span className="text-[9px] font-normal uppercase tracking-telemetry text-text-muted">
            CYPHER ONE ECOSYSTEM // NIST CSF 2.0 // ALL GATES NOMINAL
          </span>
        </div>
      </div>
    </div>
  );
}
