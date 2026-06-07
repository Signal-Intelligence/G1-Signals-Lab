/**
 * TechGlanceCard
 * High-level multi-layer topology peek — hints at architecture without deep detail.
 * Supports optional KPI strip at the bottom.
 */

import React from "react";
import type { SignalsUiEnvelope } from "../types/signals-ui-envelope";
import { HeaderStatus, HsmlStateOverlay } from "./primitives";

export interface TechLayer {
  id: string;
  label: string;
  sublabel: string;
  icon: string;
}

export interface TechKpi {
  label: string;
  value: string;
}

export interface TechGlanceCardProps {
  layers?: TechLayer[];
  kpis?: TechKpi[];
  envelope?: SignalsUiEnvelope;
}

export function TechGlanceCard({
  layers = [
    { id: "agents", label: "AGENT MESH", sublabel: "7 autonomous agents · KERI-bound identity · Exponential trust decay", icon: "\u25C6" },
    { id: "trust", label: "TRUST LAYER", sublabel: "IEEE 2874 · HSTP-1.0 wire protocol · Microledger provenance · 9-layer hydration", icon: "\u25A3" },
    { id: "governance", label: "GOVERNANCE FABRIC", sublabel: "NIST CSF 2.0 · Bill C-8 (CCSPA) · IEC 62443 · PQC FIPS 203/204", icon: "\u25B2" },
    { id: "edge", label: "ENTERPRISE EDGE", sublabel: "Spatial isolation · Hardware enclaves · OT/SCADA integration", icon: "\u25C8" },
  ],
  kpis = [
    { label: "NIST FUNCTIONS", value: "6" },
    { label: "BOUND AGENTS", value: "7" },
    { label: "TRUST LAYERS", value: "9" },
    { label: "PILLARS", value: "4" },
  ],
  envelope,
}: TechGlanceCardProps) {
  return (
    <div className="relative">
      {envelope && <HsmlStateOverlay hsmlState={envelope.hsmlState} />}
      <div className="glass-panel border-l-2 border-l-accent-blue rounded-none p-6 overflow-hidden">
        <div
          className="radial-glow"
          style={{ width: 240, height: 240, top: -50, right: -30, background: "radial-gradient(circle, rgba(0,102,255,0.05) 0%, rgba(0,0,0,0) 70%)" }}
        />

        <div className="flex items-center justify-between mb-6 relative z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-2 h-2 flex-shrink-0 rounded-full bg-accent-blue" />
            <span className="text-[11px] font-medium uppercase tracking-label text-text-secondary">
              TECHNOLOGY AT A GLANCE
            </span>
          </div>
          <HeaderStatus envelope={envelope} />
        </div>

        <div className="flex flex-col gap-0 relative z-10">
          {layers.map((layer, i) => (
            <React.Fragment key={layer.id}>
              <div className="glass-panel px-4 py-4 flex items-center gap-4">
                <div className="w-8 h-8 flex items-center justify-center border border-border-default rounded-sm">
                  <span className="text-accent-blue text-base">{layer.icon}</span>
                </div>
                <div className="flex-1">
                  <p className="text-[11px] font-medium uppercase tracking-label text-white">
                    {layer.label}
                  </p>
                  <p className="text-[9px] font-normal uppercase tracking-telemetry text-text-muted mt-0.5">
                    {layer.sublabel}
                  </p>
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-accent-green/60 animate-status-breathe" />
              </div>
              {i < layers.length - 1 && (
                <div className="flex justify-center py-1">
                  <div className="w-px h-4 bg-border-default" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* KPI strip */}
        {kpis && kpis.length > 0 && (
          <div className="grid grid-cols-4 gap-2 mt-5 relative z-10">
            {kpis.map((kpi) => (
              <div key={kpi.label} className="glass-panel px-2 py-2.5 text-center">
                <p className="glow-number text-lg leading-none mb-1 text-white">{kpi.value}</p>
                <span className="text-[8px] font-medium uppercase tracking-eyebrow text-text-muted">{kpi.label}</span>
              </div>
            ))}
          </div>
        )}

        <div className="mt-5 pt-3 border-t border-border-subtle relative z-10">
          <span className="text-[9px] font-normal uppercase tracking-telemetry text-text-muted">
            ARCHITECTURE PREVIEW // DETAIL REDACTED
          </span>
        </div>
      </div>
    </div>
  );
}
