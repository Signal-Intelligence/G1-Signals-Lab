import React from "react";
import type { SignalsUiEnvelope } from "../types/signals-ui-envelope";
import { HeaderStatus, HsmlStateOverlay } from "./primitives";

export interface GeofenceHaltCardProps {
  title?: string;
  kpis?: { label: string; value: string; accent?: string }[];
  expectedZone?: string;
  detectedZone?: string;
  ctaLabel?: string;
  compact?: boolean;
  timestamp?: string;
  envelope?: SignalsUiEnvelope;
}

export function GeofenceHaltCard({
  title = "Geofence Out of Band",
  kpis = [
    { label: "OPERATOR", value: "1G" },
    { label: "SITE", value: "YYC" },
    { label: "STATUS", value: "OOB", accent: "text-amber-400" },
    { label: "DELTA", value: "+2,714 KM", accent: "text-accent-danger" },
  ],
  expectedZone = "Calgary, AB — Radius 50 KM",
  detectedZone = "London, UK — 2,714 KM from fence boundary",
  ctaLabel = "SLIDE TO ROUTE BREAK-GLASS",
  compact = false,
  timestamp = "02:15 AM — June 1, 2026",
  envelope,
}: GeofenceHaltCardProps) {
  return (
    <div className="relative">
      {envelope && <HsmlStateOverlay hsmlState={envelope.hsmlState} />}
    <div className={`glass-panel border-l-2 border-l-amber-400 rounded-none ${compact ? "p-3" : "p-5"} hover:-translate-y-0.5 transition-all duration-300 overflow-hidden`}>
      <div
        className="radial-glow"
        style={{ width: 240, height: 240, top: -60, right: -40, background: "radial-gradient(circle, rgba(251,191,36,0.08) 0%, rgba(0,0,0,0) 70%)" }}
      />

      {/* Header */}
      <div className={`flex items-center justify-between relative z-10 ${compact ? "mb-2" : "mb-4"}`}>
        <div className="flex items-center gap-2.5">
          <div className="w-2 h-2 flex-shrink-0 rounded-full bg-amber-400" />
          <span className="text-[11px] font-medium uppercase tracking-label text-text-secondary">
            SPATIAL EXCEPTION
          </span>
        </div>
        <HeaderStatus envelope={envelope} />
      </div>

      {/* Title */}
      <h3 className={`font-extralight ${compact ? "text-lg" : "text-xl"} text-white leading-tight mb-2 text-glow-sm relative z-10`}>
        {title}
      </h3>

      {/* KPI Strip */}
      {kpis.length > 0 && (
        <div className={`grid grid-cols-${Math.min(kpis.length, 4)} gap-2 ${compact ? "mb-3" : "mb-4"} relative z-10`}>
          {kpis.map((kpi) => (
            <div key={kpi.label} className="glass-panel px-2 py-2 text-center flex flex-col items-center justify-end">
              <p className={`glow-number ${compact ? "text-base" : "text-lg"} leading-none mb-1 ${kpi.accent ?? "text-white"}`}>{kpi.value}</p>
              <span className="text-[9px] font-medium uppercase tracking-eyebrow text-text-muted">{kpi.label}</span>
            </div>
          ))}
        </div>
      )}

      {/* Zone details */}
      <div className={`border-l border-amber-400/30 pl-3 ${compact ? "mb-3" : "mb-4"} relative z-10`}>
        <span className="eyebrow block mb-2">// GEOFENCE ANALYSIS</span>
        <div className="space-y-1.5">
          <div className="flex items-start gap-2 text-sm text-text-secondary font-light">
            <div className="connector-dot flex-shrink-0 mt-1.5" style={{ width: 5, height: 5 }} />
            <span><span className="text-text-muted">Expected:</span> {expectedZone}</span>
          </div>
          <div className="flex items-start gap-2 text-sm text-text-secondary font-light">
            <div className="connector-dot flex-shrink-0 mt-1.5" style={{ width: 5, height: 5, background: "#fbbf24", boxShadow: "0 0 8px #fbbf24" }} />
            <span><span className="text-text-muted">Detected:</span> {detectedZone}</span>
          </div>
        </div>
      </div>

      {/* CTA (disabled visual) */}
      {ctaLabel && (
        <div className="mb-4 relative z-10">
          <div className="w-full py-2.5 px-4 border border-amber-400/30 text-center text-[11px] font-medium uppercase tracking-label text-amber-400/60 cursor-not-allowed">
            {ctaLabel}
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

export default GeofenceHaltCard;
