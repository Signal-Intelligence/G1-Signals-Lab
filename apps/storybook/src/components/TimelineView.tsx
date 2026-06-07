import React from "react";
import type { TimelineMilestone } from "../types/domain";
import type { SignalsUiEnvelope } from "../types/signals-ui-envelope";
import { HeaderStatus, HsmlStateOverlay } from "./primitives";

const categoryColors: Record<TimelineMilestone["category"], string> = {
  standard: "bg-accent-blue/10 text-accent-blue",
  regulatory: "bg-amber-400/10 text-amber-400",
  vendor: "bg-blue-400/10 text-blue-400",
  internal: "bg-purple-400/10 text-purple-400",
};

const categoryLabels: Record<TimelineMilestone["category"], string> = {
  standard: "STANDARD",
  regulatory: "REGULATORY",
  vendor: "VENDOR",
  internal: "INTERNAL",
};

const riskColors: Record<TimelineMilestone["risk"], string> = {
  high: "bg-red-500/10 text-red-400",
  medium: "bg-amber-500/10 text-amber-400",
  low: "bg-green-500/10 text-green-400",
};

function isPast(milestoneDate: string, currentDate: string): boolean {
  return milestoneDate < currentDate;
}

export interface TimelineViewProps {
  milestones: TimelineMilestone[];
  currentDate?: string;
  envelope?: SignalsUiEnvelope;
}

export function TimelineView({
  milestones,
  currentDate = "2026-06",
  envelope,
}: TimelineViewProps) {
  const sorted = [...milestones].sort((a, b) => a.date.localeCompare(b.date));

  return (
    <div className="relative">
      {envelope && <HsmlStateOverlay hsmlState={envelope.hsmlState} />}
    <div className="glass-panel border-l-2 border-l-accent-blue rounded-none p-5 overflow-hidden">
      <div
        className="radial-glow"
        style={{ width: 250, height: 250, top: -60, right: -40, background: "radial-gradient(circle, rgba(0,102,255,0.10) 0%, rgba(0,0,0,0) 70%)" }}
      />

      <div className="flex items-center justify-between mb-4 relative z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-2 h-2 flex-shrink-0 rounded-full bg-accent-blue" />
          <span className="text-[11px] font-medium uppercase tracking-label text-text-secondary">
            TIMELINE
          </span>
        </div>
        <HeaderStatus envelope={envelope} />
      </div>

      <h3 className="font-extralight text-xl text-white leading-tight mb-5 text-glow-sm relative z-10">
        PQC Migration Timeline
      </h3>

      <div className="relative z-10">
        <div className="connector-line connector-line-v absolute left-[8rem] top-0 bottom-0 md:left-[9rem]" style={{ opacity: 0.4 }} />

        {sorted.map((m, i) => {
          const past = isPast(m.date, currentDate);

          return (
            <div
              key={`${m.date}-${i}`}
              className={`relative flex gap-6 md:gap-8 mb-8 last:mb-0 ${past ? "opacity-60" : "opacity-100"}`}
            >
              <div className="w-[6.5rem] md:w-[7.5rem] shrink-0 text-right pt-1">
                <span className="telemetry block">{m.date}</span>
                <span className={`inline-block mt-1.5 px-2 py-0.5 text-[10px] font-medium uppercase tracking-telemetry ${categoryColors[m.category]}`}>
                  {categoryLabels[m.category]}
                </span>
              </div>

              <div className="relative flex items-start pt-1.5">
                <div
                  className={`z-10 -translate-x-[1px] rounded-full ${past ? "connector-dot" : "w-2.5 h-2.5 bg-transparent border-2 border-accent-blue rounded-full"}`}
                  style={past ? { width: 10, height: 10 } : undefined}
                />
                {!past && (
                  <div className="radial-glow absolute -top-4 -left-4" style={{ width: 40, height: 40 }} />
                )}
              </div>

              <div className="flex-1 glass-panel rounded-none p-4 hover:-translate-y-0.5 transition-all duration-300 ml-2 overflow-hidden">
                <div className="flex items-center gap-3 mb-1.5 flex-wrap relative z-10">
                  {past && <span className="text-accent-blue text-xs">&#x2713;</span>}
                  <h4 className="font-light text-sm text-white leading-tight">{m.label}</h4>
                  <span className={`text-[10px] font-medium uppercase tracking-telemetry px-2 py-0.5 ${riskColors[m.risk]}`}>
                    {m.risk} RISK
                  </span>
                </div>
                <p className="text-text-secondary text-sm font-light leading-relaxed relative z-10">{m.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-5 pt-3 border-t border-border-subtle flex items-center justify-between relative z-10">
        <span className="telemetry">current: {currentDate}</span>
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

export default TimelineView;
