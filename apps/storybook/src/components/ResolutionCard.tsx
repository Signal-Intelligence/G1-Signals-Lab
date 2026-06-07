import React from "react";
import type { SignalsUiEnvelope } from "../types/signals-ui-envelope";
import { HeaderStatus, HsmlStateOverlay } from "./primitives";

export interface ResolutionEvent {
  time: string;
  event: string;
}

export interface ResolutionCardProps {
  title?: string;
  kpis?: { label: string; value: string; accent?: string }[];
  events?: ResolutionEvent[];
  timestamp?: string;
  envelope?: SignalsUiEnvelope;
}

export function ResolutionCard({
  title = "Microledger Enclave Assertion Verified",
  kpis = [
    { label: "vLEI STATUS", value: "VALID", accent: "text-accent-green" },
    { label: "SIGNING AUTH", value: "EKYLRh...9cW", accent: "text-accent-blue" },
    { label: "COMPLIANCE", value: "VERIFIED", accent: "text-accent-green" },
  ],
  events = [],
  timestamp = "02:18 AM — June 1, 2026",
  envelope,
}: ResolutionCardProps) {
  return (
    <div className="relative">
      {envelope && <HsmlStateOverlay hsmlState={envelope.hsmlState} />}
    <div className="glass-panel border-l-2 border-l-accent-green rounded-none p-5 hover:-translate-y-0.5 transition-all duration-300 overflow-hidden">
      <div
        className="radial-glow"
        style={{ width: 280, height: 280, top: -70, right: -50, background: "radial-gradient(circle, rgba(74,222,128,0.08) 0%, rgba(0,0,0,0) 70%)" }}
      />

      {/* Header */}
      <div className="flex items-center justify-between mb-4 relative z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-2 h-2 flex-shrink-0 rounded-full bg-accent-green" />
          <span className="text-[11px] font-medium uppercase tracking-label text-text-secondary">
            RESOLUTION
          </span>
        </div>
        <HeaderStatus envelope={envelope} />
      </div>

      {/* Title */}
      <h3 className="font-extralight text-xl text-white leading-tight mb-4 text-glow-sm relative z-10">
        {title}
      </h3>

      {/* KPI Strip */}
      {kpis.length > 0 && (
        <div className={`grid grid-cols-${Math.min(kpis.length, 4)} gap-3 mb-4 relative z-10`}>
          {kpis.map((kpi) => (
            <div key={kpi.label} className="glass-panel px-3 py-3 text-center flex flex-col items-center justify-end">
              <p className={`glow-number text-lg leading-none mb-2 ${kpi.accent ?? "text-white"}`}>{kpi.value}</p>
              <span className="eyebrow">{kpi.label}</span>
            </div>
          ))}
        </div>
      )}

      {/* Operations timeline */}
      {events.length > 0 && (
        <div className="border-l border-accent-green/30 pl-3 mb-4 relative z-10">
          <span className="eyebrow block mb-2">// EXECUTED OPERATIONS</span>
          <div className="space-y-2">
            {events.map((evt, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-text-secondary font-light">
                <div className="connector-dot flex-shrink-0 mt-1.5" style={{ width: 5, height: 5 }} />
                <span className="telemetry flex-shrink-0 w-14">{evt.time}</span>
                <span>{evt.event}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="pt-3 border-t border-border-subtle flex items-center justify-between relative z-10">
        <span className="telemetry">{timestamp}</span>
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

export default ResolutionCard;
