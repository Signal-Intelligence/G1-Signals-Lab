import React from "react";
import type { SignalsUiEnvelope } from "../types/signals-ui-envelope";
import { HeaderStatus, HsmlStateOverlay } from "./primitives";

export interface QuantumInterlockCardProps {
  title?: string;
  subheader?: string;
  kpis?: { label: string; value: string; accent?: string }[];
  ctaLabel?: string;
  onCta?: () => void;
  timestamp?: string;
  envelope?: SignalsUiEnvelope;
}

export function QuantumInterlockCard({
  title = "Enforce Quantum Cipher Systemically",
  subheader = "FIPS-203 (ML-KEM) + FIPS-204 (ML-DSA)",
  kpis = [
    { label: "TARGET CIPHERS", value: "ML-KEM", accent: "text-accent-blue" },
    { label: "DEPLOY SCOPE", value: "14 SYS" },
    { label: "ALGORITHMS VULN", value: "6", accent: "text-accent-danger" },
  ],
  ctaLabel = "ENFORCE QUANTUM CIPHER SYSTEMICALLY",
  onCta,
  timestamp = "08:30 AM — June 1, 2026",
  envelope,
}: QuantumInterlockCardProps) {
  return (
    <div className="relative">
      {envelope && <HsmlStateOverlay hsmlState={envelope.hsmlState} />}
    <div className="glass-panel border-l-2 border-l-accent-blue rounded-none p-5 hover:-translate-y-0.5 transition-all duration-300 overflow-hidden">
      <div
        className="radial-glow"
        style={{ width: 280, height: 280, top: -70, right: -50, background: "radial-gradient(circle, rgba(0,102,255,0.10) 0%, rgba(0,0,0,0) 70%)" }}
      />

      {/* Header */}
      <div className="flex items-center justify-between mb-4 relative z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-2 h-2 flex-shrink-0 rounded-full bg-accent-blue" />
          <span className="text-[11px] font-medium uppercase tracking-label text-text-secondary">
            INTERLOCK
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
        <div className={`grid grid-cols-${Math.min(kpis.length, 4)} gap-3 mb-4 relative z-10`}>
          {kpis.map((kpi) => (
            <div key={kpi.label} className="glass-panel px-3 py-3 text-center flex flex-col items-center justify-end">
              <p className={`glow-number text-lg leading-none mb-2 ${kpi.accent ?? "text-white"}`}>{kpi.value}</p>
              <span className="eyebrow">{kpi.label}</span>
            </div>
          ))}
        </div>
      )}

      {/* CTA */}
      {ctaLabel && (
        <div className="mb-4 relative z-10">
          <button onClick={onCta} className="signal-btn-primary w-full">
            {ctaLabel}
          </button>
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

export default QuantumInterlockCard;
