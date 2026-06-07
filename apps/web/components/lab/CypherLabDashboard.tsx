"use client";

import { useState } from "react";
import { GlassPanel } from "@/components/GlassPanel";
import { OrchestratorStrip } from "@/components/lab/OrchestratorStrip";
import { NistPillarRow } from "@/components/lab/NistPillarRow";
import { KpiRibbon } from "@/components/lab/KpiRibbon";
import { TrustDecayGauge } from "@/components/lab/TrustDecayGauge";
import { NistPostureMatrix } from "@/components/lab/NistPostureMatrix";
import { AgentSelector } from "@/components/lab/AgentSelector";
import { EventLog } from "@/components/lab/EventLog";
import {
  ALL_CELLS,
  NIST_CELL_MAPPINGS,
  KPI_DRILLDOWNS,
} from "@/lib/data/dashboard";
import { EXECUTION_EVENTS } from "@/lib/data/dashboard-events";

export function CypherLabDashboard() {
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);

  const avgConfidence =
    NIST_CELL_MAPPINGS.reduce((s, m) => s + m.confidence, 0) /
    NIST_CELL_MAPPINGS.length;
  const activeGates = NIST_CELL_MAPPINGS.length;

  const hydrationDrilldown = KPI_DRILLDOWNS["HYDRATION COVERAGE"];
  const hydrationAvg = Math.round(
    hydrationDrilldown.reduce((sum, item) => sum + parseInt(item.value, 10), 0) /
      hydrationDrilldown.length
  );

  const kpiItems = [
    { label: "TOTAL AGENTS", value: String(ALL_CELLS.length), drilldown: KPI_DRILLDOWNS["TOTAL AGENTS"] },
    { label: "HYDRATION COVERAGE", value: `${hydrationAvg}%`, drilldown: KPI_DRILLDOWNS["HYDRATION COVERAGE"] },
    { label: "AVG CONFIDENCE", value: `${Math.round(avgConfidence)}%`, drilldown: KPI_DRILLDOWNS["AVG CONFIDENCE"] },
    { label: "ACTIVE GATES", value: `${activeGates}/${activeGates}`, drilldown: KPI_DRILLDOWNS["ACTIVE GATES"] },
  ];

  return (
    <>
      <div className="px-6 md:px-12 lg:px-32 pb-16 space-y-8">
        <div className="flex items-center justify-end">
          <AgentSelector
            agents={ALL_CELLS}
            selectedAgent={selectedAgent}
            onSelect={setSelectedAgent}
          />
        </div>

        <div className="space-y-3">
          <div className={`transition-opacity${selectedAgent ? " opacity-25" : ""}`}>
            <OrchestratorStrip mappings={NIST_CELL_MAPPINGS} />
          </div>
          <NistPillarRow mappings={NIST_CELL_MAPPINGS} selectedAgent={selectedAgent} />
        </div>

        <div className="grid gap-6 xl:grid-cols-[1fr_1fr] xl:items-start">
          <div className="space-y-3">
            <h3 className="text-[11px] font-medium uppercase tracking-wide text-text-muted">
              Trust Decay Gauges
            </h3>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2">
              {NIST_CELL_MAPPINGS.map((m) => (
                <GlassPanel
                  key={m.cellHandle}
                  className={`p-4${selectedAgent && selectedAgent !== m.cellHandle ? " opacity-25" : ""}`}
                  hover
                >
                  <TrustDecayGauge
                    handle={m.cellHandle}
                    nistFunction={m.nistFunction}
                    confidence={m.confidence}
                  />
                </GlassPanel>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <h3 className="text-[11px] font-medium uppercase tracking-wide text-text-muted">
              NIST Posture Matrix
            </h3>
            <NistPostureMatrix
              mappings={NIST_CELL_MAPPINGS}
              selectedAgent={selectedAgent}
            />
            <h3 className="text-[11px] font-medium uppercase tracking-wide text-text-muted mt-1">
              Execution Log
            </h3>
            <div className="max-h-[530px] flex flex-col">
              <EventLog
                events={EXECUTION_EVENTS}
                selectedAgent={selectedAgent}
              />
            </div>
          </div>
        </div>

        <KpiRibbon items={kpiItems} />

        <div className="pt-3 border-t border-border-subtle">
          <span className="text-[11px] uppercase tracking-wide text-text-muted">
            CYPHER ONE ECOSYSTEM // NIST CSF 2.0 // ALL GATES NOMINAL
          </span>
        </div>
      </div>
    </>
  );
}
