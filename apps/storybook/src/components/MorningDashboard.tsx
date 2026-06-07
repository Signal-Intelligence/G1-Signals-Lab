import React, { useState } from "react";
import type { DashboardStats, RemediationBatch, ExecutionEvent } from "../types/domain";
import type { SignalsUiEnvelope } from "../types/signals-ui-envelope";
import { HeaderStatus, HsmlStateOverlay } from "./primitives";

export interface MorningDashboardActionItem {
  title: string;
  owner: string;
  priority: "critical" | "high" | "medium" | "low";
  status: "open" | "in_progress" | "done";
}

export interface MorningDashboardProps {
  stats: DashboardStats;
  batches: RemediationBatch[];
  events: ExecutionEvent[];
  actionItems: MorningDashboardActionItem[];
  envelope?: SignalsUiEnvelope;
}

const STATUS_LABEL: Record<string, string> = {
  open: "OPEN",
  in_progress: "IN PROGRESS",
  done: "DONE",
};

export function MorningDashboard({
  stats,
  batches,
  events,
  actionItems,
  envelope,
}: MorningDashboardProps) {
  const [evidenceOpen, setEvidenceOpen] = useState(false);

  const failedBatches = batches.filter(
    (b) => b.status === "failed" || b.status === "rolled_back"
  );

  const trustDelta = stats.trustScoreAfter - stats.trustScoreBefore;

  const kpis = [
    { label: "TOTAL VULNS", value: String(stats.totalVulns) },
    { label: "REMEDIATED", value: String(stats.remediated), accent: "text-accent-green" },
    { label: "FAILED", value: String(stats.failed), accent: "text-accent-danger" },
    { label: "ROLLED BACK", value: String(stats.rolledBack), accent: "text-amber-400" },
    { label: "PENDING", value: String(stats.pendingManual), accent: "text-amber-300" },
    { label: "TRUST SCORE", value: `${stats.trustScoreAfter}`, accent: trustDelta > 0 ? "text-accent-green" : undefined },
    { label: "EVIDENCE", value: String(stats.evidenceReceipts) },
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
            MORNING BRIEFING
          </span>
        </div>
        <HeaderStatus envelope={envelope} />
      </div>

      <h3 className="font-extralight text-xl text-white leading-tight mb-1 text-glow-sm relative z-10">
        Overnight Execution Complete
      </h3>
      <p className="text-xs font-light text-text-muted uppercase tracking-telemetry mb-5 relative z-10">
        BILL C-8 — VERIFIED_COMPLIANT
      </p>

      {/* KPI Strip */}
      <div className="grid grid-cols-7 gap-2 mb-5 relative z-10">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="glass-panel px-2 py-3 text-center flex flex-col items-center justify-end">
            <p className={`glow-number text-lg leading-none mb-2 ${kpi.accent ?? "text-white"}`}>
              {kpi.value}
            </p>
            <span className="text-[9px] font-medium uppercase tracking-eyebrow text-text-muted leading-tight">{kpi.label}</span>
          </div>
        ))}
      </div>

      {/* Rollback Summary */}
      {failedBatches.length > 0 && (
        <div className="mb-5 relative z-10">
          <span className="eyebrow block mb-3">// ROLLBACK SUMMARY</span>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left py-2 pr-4 text-[11px] font-medium uppercase tracking-telemetry text-text-muted">Batch</th>
                  <th className="text-left py-2 pr-4 text-[11px] font-medium uppercase tracking-telemetry text-text-muted">System</th>
                  <th className="text-left py-2 pr-4 text-[11px] font-medium uppercase tracking-telemetry text-text-muted">Status</th>
                  <th className="text-left py-2 text-[11px] font-medium uppercase tracking-telemetry text-text-muted">Reason</th>
                </tr>
              </thead>
              <tbody>
                {failedBatches.map((batch) => (
                  <tr key={batch.id} className="border-t border-border-subtle hover:bg-[rgba(239,68,68,0.03)] transition-colors">
                    <td className="py-2.5 pr-4 text-sm text-white font-light">{batch.name}</td>
                    <td className="py-2.5 pr-4 telemetry">{batch.systems.join(", ")}</td>
                    <td className="py-2.5 pr-4">
                      <span className="text-[11px] font-medium uppercase tracking-label text-amber-400">
                        {batch.status.replace(/_/g, " ").toUpperCase()}
                      </span>
                    </td>
                    <td className="py-2.5 text-sm text-text-secondary font-light">{batch.rollbackReason ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Action Items */}
      <div className="mb-5 relative z-10">
        <span className="eyebrow block mb-3">// ACTION ITEMS</span>
        <div className="space-y-2">
          {actionItems.map((item, idx) => (
            <div key={idx} className="flex items-center gap-3 py-2.5 px-3 border border-border-subtle rounded-none hover:bg-[rgba(0,102,255,0.03)] transition-colors">
              <div className="connector-dot" style={{ width: 6, height: 6 }} />
              <span className="text-[11px] font-medium uppercase tracking-label text-text-secondary w-16 flex-shrink-0">
                {item.priority.toUpperCase()}
              </span>
              <span className="text-sm text-white font-light flex-1 truncate">{item.title}</span>
              <span className="telemetry flex-shrink-0">{item.owner}</span>
              <span className="telemetry flex-shrink-0 w-20 text-right">
                {STATUS_LABEL[item.status] ?? item.status.toUpperCase()}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Evidence Trail */}
      <div className="relative z-10">
        <button
          onClick={() => setEvidenceOpen(!evidenceOpen)}
          className="flex items-center gap-2 w-full text-left group"
        >
          <svg
            className={`w-4 h-4 text-text-muted transition-transform duration-200 ${evidenceOpen ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
          <span className="eyebrow">// EVIDENCE TRAIL ({events.length} entries)</span>
        </button>

        {evidenceOpen && (
          <div className="mt-4 space-y-0 max-h-60 overflow-y-auto">
            {events.map((evt) => (
              <div key={evt.id} className="flex items-start gap-3 py-2 border-t border-border-subtle hover:bg-[rgba(0,102,255,0.03)] transition-colors">
                <span className="telemetry flex-shrink-0 mt-0.5 w-16">
                  {new Date(evt.timestamp).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false })}
                </span>
                <span className="text-sm text-text-secondary font-light flex-1">{evt.message}</span>
                <span className="telemetry flex-shrink-0 hidden sm:inline">
                  {evt.provenanceHash.slice(0, 16)}…
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-border-subtle flex items-center justify-between relative z-10">
        <span className="telemetry">07:00 AM — morning sync</span>
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

export default MorningDashboard;
