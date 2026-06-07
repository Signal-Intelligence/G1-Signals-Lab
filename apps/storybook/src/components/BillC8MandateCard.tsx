import React from "react";
import type { SignalsUiEnvelope } from "../types/signals-ui-envelope";
import { HeaderStatus, HsmlStateOverlay } from "./primitives";

export interface BillC8MandateCardProps {
  title?: string;
  subheader?: string;
  kpis?: { label: string; value: string; accent?: string }[];
  timestamp?: string;
  envelope?: SignalsUiEnvelope;
}

export function BillC8MandateCard({
  title = "Canada Bill C-8 (CCSPA)",
  subheader = "Section 9(1) — Cybersecurity Program / Section 15 — Incident Reporting",
  kpis = [
    { label: "OPERATOR", value: "PRAIRIE FUELS" },
    { label: "CLAUSE", value: "§9 / §15" },
    { label: "LIABILITY", value: "72h", accent: "text-amber-400" },
    { label: "GATE STATUS", value: "ASSERTED", accent: "text-accent-green" },
  ],
  timestamp = "08:30 AM — June 1, 2026",
  envelope,
}: BillC8MandateCardProps) {
  return (
    <div className="relative">
      {envelope && <HsmlStateOverlay hsmlState={envelope.hsmlState} />}
    <div className="glass-panel border-l-2 border-l-severity-critical rounded-none p-5 hover:-translate-y-0.5 transition-all duration-300 overflow-hidden">
      <div
        className="radial-glow"
        style={{ width: 280, height: 280, top: -70, right: -50, background: "radial-gradient(circle, rgba(239,68,68,0.10) 0%, rgba(0,0,0,0) 70%)" }}
      />

      {/* Header */}
      <div className="flex items-center justify-between mb-4 relative z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-2 h-2 flex-shrink-0 rounded-full bg-severity-critical" />
          <span className="text-[11px] font-medium uppercase tracking-label text-text-secondary">
            MANDATE
          </span>
        </div>
        <HeaderStatus envelope={envelope} />
      </div>

      {/* Title */}
      <h3 className="font-extralight text-xl text-white leading-tight mb-2 text-glow-sm relative z-10">
        {title}
      </h3>
      <p className="text-xs font-light text-text-muted uppercase tracking-telemetry mb-4 relative z-10">
        {subheader}
      </p>

      {/* KPI Strip */}
      {kpis.length > 0 && (
        <div className="grid grid-cols-4 gap-3 mb-4 relative z-10">
          {kpis.map((kpi) => (
            <div key={kpi.label} className="glass-panel px-3 py-3 text-center flex flex-col items-center justify-end">
              <p className={`glow-number text-lg leading-none mb-2 ${kpi.accent ?? "text-white"}`}>{kpi.value}</p>
              <span className="eyebrow">{kpi.label}</span>
            </div>
          ))}
        </div>
      )}

      {/* Legal context */}
      <div className="border-l border-severity-critical/30 pl-3 mb-4 relative z-10">
        <span className="eyebrow block mb-2">// LEGAL AUTHORITY</span>
        <p className="text-sm text-text-secondary font-light leading-relaxed">
          Prairie Fuels Inc. operates critical cyber systems connected to interprovincial pipeline infrastructure (Schedule 1). Under Bill C-8 (CCSPA), Prairie Fuels must maintain a cybersecurity program (§9), report incidents to CSE/CCCS within 72 hours (§15), and comply with cybersecurity directions (§22). Penalty exposure: up to $15M/day corporate, $1M/day individual.
        </p>
      </div>

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

export default BillC8MandateCard;
