import React from "react";
import type { DiscoveryMethod, ScanFailure } from "../types/domain";
import type { SignalsUiEnvelope } from "../types/signals-ui-envelope";
import { HeaderStatus, HsmlStateOverlay } from "./primitives";

function StatusBadge({ status }: { status: DiscoveryMethod["status"] }) {
  const base = "inline-flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-medium uppercase tracking-telemetry";

  if (status === "completed") {
    return (
      <span className={`${base} bg-accent-blue/10 text-accent-blue`}>
        <span className="connector-dot" style={{ width: 5, height: 5 }} />
        COMPLETED
      </span>
    );
  }

  if (status === "in_progress") {
    return (
      <span className={`${base} bg-accent-blue/10 text-accent-blue`}>
        <span className="connector-dot animate-glow-pulse" style={{ width: 5, height: 5 }} />
        RUNNING
      </span>
    );
  }

  return (
    <span className={`${base} bg-red-500/10 text-red-400`}>
      <span className="connector-dot" style={{ width: 5, height: 5, background: "#f87171", boxShadow: "0 0 8px #f87171" }} />
      FAILED
    </span>
  );
}

export interface CBOMDiscoveryDashboardProps {
  methods: DiscoveryMethod[];
  totalInventoryCount: number;
  coveragePercent: number;
  failures: ScanFailure[];
  envelope?: SignalsUiEnvelope;
}

export function CBOMDiscoveryDashboard({
  methods,
  totalInventoryCount,
  coveragePercent,
  failures,
  envelope,
}: CBOMDiscoveryDashboardProps) {
  const runningCount = methods.filter((m) => m.status === "in_progress").length;
  const totalFound = methods.reduce((s, m) => s + m.itemsFound, 0);

  const stats = [
    { label: "METHODS RUNNING", value: String(runningCount) },
    { label: "ITEMS DISCOVERED", value: String(totalFound), accent: "text-accent-blue" },
    { label: "COVERAGE", value: `${coveragePercent}%`, accent: "text-accent-green" },
    { label: "FAILURES", value: String(failures.length), accent: failures.length > 0 ? "text-accent-danger" : undefined },
  ];

  return (
    <div className="relative">
      {envelope && <HsmlStateOverlay hsmlState={envelope.hsmlState} />}
    <div className="glass-panel border-l-2 border-l-accent-blue rounded-none p-5 overflow-hidden">
      <div
        className="radial-glow"
        style={{ width: 300, height: 300, top: -80, right: -60, background: "radial-gradient(circle, rgba(0,102,255,0.10) 0%, rgba(0,0,0,0) 70%)" }}
      />

      <div className="flex items-center justify-between mb-4 relative z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-2 h-2 flex-shrink-0 rounded-full bg-accent-blue" />
          <span className="text-[11px] font-medium uppercase tracking-label text-text-secondary">
            CBOM DISCOVERY
          </span>
        </div>
        <HeaderStatus envelope={envelope} />
      </div>

      <h3 className="font-extralight text-xl text-white leading-tight mb-1 text-glow-sm relative z-10">
        Cryptographic Bill of Materials
      </h3>
      <p className="text-xs font-light text-text-muted uppercase tracking-telemetry mb-5 relative z-10">
        one-shadow — AUTOMATED SCAN IN PROGRESS
      </p>

      {/* KPI Strip */}
      <div className="grid grid-cols-4 gap-3 mb-5 relative z-10">
        {stats.map((s) => (
          <div key={s.label} className="glass-panel px-3 py-3 text-center flex flex-col items-center justify-end">
            <p className={`glow-number text-lg leading-none mb-2 ${s.accent ?? "text-white"}`}>{s.value}</p>
            <span className="eyebrow">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Discovery progress */}
      <div className="mb-5 relative z-10">
        <span className="eyebrow block mb-3">// DISCOVERY PROGRESS</span>
        <div className="space-y-3">
          {methods.map((m) => {
            const pct = m.totalTargets > 0 ? Math.round((m.targetsScanned / m.totalTargets) * 100) : 0;
            return (
              <div key={m.name} className="glass-panel rounded-none px-4 py-3 overflow-hidden">
                <div className="flex items-center justify-between mb-2 relative z-10">
                  <span className="text-sm text-white font-light">{m.name}</span>
                  <div className="flex items-center gap-3">
                    <span className="telemetry">{m.itemsFound} FOUND</span>
                    <StatusBadge status={m.status} />
                  </div>
                </div>
                <div className="w-full h-[2px] bg-[#1f2937] overflow-hidden relative z-10">
                  <div
                    className={`h-full transition-all duration-700 ${m.status === "failed" ? "bg-accent-danger" : "bg-accent-blue"}`}
                    style={{ width: `${pct}%`, boxShadow: m.status !== "failed" ? "0 0 10px rgba(0,102,255,0.6)" : "0 0 10px rgba(239,68,68,0.6)" }}
                  />
                </div>
                <div className="flex justify-between mt-1.5 relative z-10">
                  <span className="telemetry">{m.targetsScanned}/{m.totalTargets} TARGETS</span>
                  <span className="telemetry">{pct}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Failures */}
      {failures.length > 0 && (
        <div className="mb-5 relative z-10">
          <span className="eyebrow block mb-3">// SCAN FAILURES</span>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="text-left py-2 pr-4 text-[11px] font-medium uppercase tracking-telemetry text-text-muted">Method</th>
                  <th className="text-left py-2 pr-4 text-[11px] font-medium uppercase tracking-telemetry text-text-muted">Target</th>
                  <th className="text-left py-2 pr-4 text-[11px] font-medium uppercase tracking-telemetry text-text-muted">Error</th>
                  <th className="text-left py-2 text-[11px] font-medium uppercase tracking-telemetry text-text-muted">Time</th>
                </tr>
              </thead>
              <tbody>
                {failures.map((f, i) => (
                  <tr key={i} className="border-t border-border-subtle hover:bg-[rgba(239,68,68,0.03)]">
                    <td className="py-2 pr-4 telemetry">{f.method}</td>
                    <td className="py-2 pr-4 telemetry">{f.target}</td>
                    <td className="py-2 pr-4 text-xs text-red-400 font-light">{f.error}</td>
                    <td className="py-2 telemetry whitespace-nowrap">{f.timestamp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="mt-4 pt-3 border-t border-border-subtle flex items-center justify-between relative z-10">
        <span className="telemetry">one-shadow scan</span>
        <div className="flex items-center gap-2">
        </div>
        <span className="text-[10px] uppercase tracking-telemetry text-text-muted">
          G1 SIGNALS LAB // CONFIDENTIAL
        </span>
      </div>
    </div>
    </div>
  );
}

export default CBOMDiscoveryDashboard;
