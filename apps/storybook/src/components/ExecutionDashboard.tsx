import React from "react";
import type { RemediationBatch, ExecutionEvent } from "../types/domain";
import type { SignalsUiEnvelope } from "../types/signals-ui-envelope";
import { HeaderStatus, HsmlStateOverlay } from "./primitives";

export interface ExecutionDashboardProps {
  batches: RemediationBatch[];
  events: ExecutionEvent[];
  trustScore: { before: number; after: number };
  evidenceCount: number;
  envelope?: SignalsUiEnvelope;
}

const BATCH_STATUS_SQUARE: Record<string, string> = {
  completed: "bg-accent-green",
  in_progress: "bg-accent-blue animate-pulse",
  pending: "bg-text-muted",
  failed: "bg-accent-danger",
  rolled_back: "bg-amber-400",
};

const EVENT_TYPE_COLOR: Record<string, string> = {
  patch: "text-accent-blue",
  rollback: "text-amber-400",
  validation: "text-accent-green",
  escalation: "text-accent-danger",
  evidence: "text-violet-400",
  health_check: "text-amber-300",
};

function formatStatus(status: string): string {
  return status.replace(/_/g, " ").toUpperCase();
}

function formatTime(timestamp: string): string {
  const d = new Date(timestamp);
  return d.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}

export function ExecutionDashboard({
  batches,
  events,
  trustScore,
  evidenceCount,
  envelope,
}: ExecutionDashboardProps) {
  const completedBatches = batches.filter((b) => b.status === "completed").length;
  const totalSystems = batches.reduce((acc, b) => acc + b.systems.length, 0);
  const trustDelta = trustScore.after - trustScore.before;

  const stats = [
    { label: "BATCHES", value: `${completedBatches}/${batches.length}`, sub: "COMPLETED" },
    { label: "SYSTEMS", value: String(totalSystems), sub: "TARGETS" },
    {
      label: "TRUST SCORE",
      value: `${trustScore.after}`,
      sub: trustDelta > 0 ? `+${trustDelta}` : String(trustDelta),
      highlight: trustDelta > 0,
    },
    { label: "EVIDENCE", value: String(evidenceCount), sub: "RECEIPTS" },
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
            EXECUTION
          </span>
        </div>
        <HeaderStatus envelope={envelope} />
      </div>

      <h3 className="font-extralight text-xl text-white leading-tight mb-1 text-glow-sm relative z-10">
        Overnight Remediation
      </h3>
      <p className="text-xs font-light text-text-muted uppercase tracking-telemetry mb-5 relative z-10">
        LEVEL 4 AUTONOMOUS — TIME-BOXED
      </p>

      {/* KPI Strip */}
      <div className="grid grid-cols-4 gap-3 mb-5 relative z-10">
        {stats.map((stat) => (
          <div key={stat.label} className="glass-panel px-3 py-3 text-center flex flex-col items-center justify-end">
            <p className={`glow-number text-lg leading-none mb-2 ${(stat as { highlight?: boolean }).highlight ? "text-accent-green" : "text-white"}`}>
              {stat.value}
            </p>
            <span className="eyebrow">{stat.label}</span>
          </div>
        ))}
      </div>

      {/* Batch List */}
      <div className="mb-5 relative z-10">
        <span className="eyebrow block mb-3">// BATCH PROGRESS</span>
        <div className="space-y-2">
          {batches.map((batch) => {
            const isComplete = batch.status === "completed";
            const isFailed = batch.status === "failed" || batch.status === "rolled_back";

            return (
              <div
                key={batch.id}
                className="flex items-center gap-3 py-2.5 px-3 border border-border-subtle rounded-none hover:bg-[rgba(0,102,255,0.03)] transition-colors"
              >
                <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${BATCH_STATUS_SQUARE[batch.status] ?? "bg-text-muted"}`} />
                <span className="text-[11px] font-medium uppercase tracking-label text-text-secondary w-24 flex-shrink-0">
                  {formatStatus(batch.status)}
                </span>
                <span className="text-sm text-white font-light flex-1 truncate">
                  {batch.name}
                </span>
                <span className="telemetry flex-shrink-0">
                  {batch.systems.join(", ")}
                </span>
                <div className="w-20 flex-shrink-0">
                  <div className="h-[2px] bg-[#1f2937] w-full">
                    <div
                      className={`h-full ${isFailed ? "bg-accent-danger" : "bg-accent-blue shadow-glow-blue-sm"}`}
                      style={{ width: `${isComplete || isFailed ? 100 : 60}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Event Log */}
      <div className="relative z-10">
        <span className="eyebrow block mb-3">// EVENT LOG</span>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left py-2 pr-4 text-[11px] font-medium uppercase tracking-telemetry text-text-muted">Time</th>
                <th className="text-left py-2 pr-4 text-[11px] font-medium uppercase tracking-telemetry text-text-muted">Type</th>
                <th className="text-left py-2 text-[11px] font-medium uppercase tracking-telemetry text-text-muted">Message</th>
              </tr>
            </thead>
            <tbody>
              {events.map((evt) => (
                <tr key={evt.id} className="border-t border-border-subtle hover:bg-[rgba(0,102,255,0.05)] transition-colors">
                  <td className="py-2.5 pr-4 telemetry whitespace-nowrap">{formatTime(evt.timestamp)}</td>
                  <td className="py-2.5 pr-4 whitespace-nowrap">
                    <span className={`text-[11px] font-medium uppercase tracking-telemetry ${EVENT_TYPE_COLOR[evt.type] ?? "text-text-secondary"}`}>
                      {evt.type}
                    </span>
                  </td>
                  <td className="py-2.5 text-sm text-text-secondary font-light">{evt.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-border-subtle flex items-center justify-between relative z-10">
        <span className="telemetry">overnight execution window</span>
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

export default ExecutionDashboard;
