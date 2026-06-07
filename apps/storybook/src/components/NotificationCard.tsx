import React from "react";
import { ChainFlowDiagram, type ChainNode } from "./ChainFlowDiagram";
import type { SignalsUiEnvelope } from "../types/signals-ui-envelope";
import { HeaderStatus, HsmlStateOverlay } from "./primitives";

export type { ChainNode };

type Severity = "Critical" | "High" | "Medium" | "Low";

export interface NotificationMetric {
  value: string;
  label: string;
  accent?: string;
}

export interface NotificationCardProps {
  severity: Severity;
  title: string;
  systemCount: number;
  chainSummary: string;
  timestamp: string;
  vulnCount?: number;
  chainNodes?: ChainNode[];
  metrics?: NotificationMetric[];
  threatType?: string;
  envelope?: SignalsUiEnvelope;
}

const SEVERITY_CONFIG: Record<
  Severity,
  { border: string; square: string; label: string; glowColor?: string }
> = {
  Critical: {
    border: "border-l-severity-critical",
    square: "bg-severity-critical",
    label: "CRITICAL",
    glowColor: "rgba(196,80,106,0.12)",
  },
  High: {
    border: "border-l-severity-high",
    square: "bg-severity-high",
    label: "HIGH",
    glowColor: "rgba(184,120,74,0.10)",
  },
  Medium: {
    border: "border-l-severity-medium",
    square: "bg-severity-medium",
    label: "MEDIUM",
  },
  Low: {
    border: "border-l-severity-low",
    square: "bg-severity-low",
    label: "LOW",
  },
};

function AnalysisBullets({ text }: { text: string }) {
  const bullets = text.split(". ").filter(Boolean);
  return (
    <div className="border-l border-accent-blue/30 pl-3">
      <span className="eyebrow block mb-2">// ANALYSIS</span>
      <ul className="space-y-2">
        {bullets.map((sentence, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="connector-dot mt-1.5 flex-shrink-0" />
            <span className="text-[11px] font-light text-text-muted leading-snug">
              {sentence.endsWith(".") ? sentence : `${sentence}.`}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

const GRID_COLS: Record<number, string> = {
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
};

function KpiStrip({ items }: { items: NotificationMetric[] }) {
  return (
    <div className={`grid ${GRID_COLS[items.length] ?? "grid-cols-3"} gap-3`}>
      {items.map((kpi) => (
        <div key={kpi.label} className="glass-panel px-3 py-3 text-center flex flex-col items-center justify-end">
          <p className={`glow-number text-lg leading-none mb-2 ${kpi.accent ?? "text-white"}`}>
            {kpi.value}
          </p>
          <span className="eyebrow">{kpi.label}</span>
        </div>
      ))}
    </div>
  );
}

export function NotificationCard({
  severity,
  title,
  systemCount,
  chainSummary,
  timestamp,
  vulnCount,
  chainNodes,
  metrics,
  threatType,
  envelope,
}: NotificationCardProps) {
  const config = SEVERITY_CONFIG[severity];
  const hasChain = chainNodes && chainNodes.length > 0;
  const hasMetrics = metrics && metrics.length > 0;

  const maxCvss = hasChain
    ? Math.max(...chainNodes.map((n) => n.cvss))
    : 0;

  const minCvss = hasChain
    ? Math.min(...chainNodes.map((n) => n.cvss))
    : 0;

  const cvssToTier = (v: number) =>
    v >= 9.0 ? "CRIT" : v >= 7.0 ? "HIGH" : v >= 4.0 ? "MED" : "LOW";

  const reclassLabel = hasChain
    ? `${cvssToTier(minCvss)} → ${cvssToTier(maxCvss)}`
    : "";

  const subheader = hasChain
    ? "ARCANEDOOR EXPLOIT CHAIN — TIER-0 OT/SCADA EXPOSURE"
    : threatType ?? `${systemCount} system${systemCount !== 1 ? "s" : ""} affected`;

  return (
    <div className="relative">
      {envelope && <HsmlStateOverlay hsmlState={envelope.hsmlState} />}
      <div
        className={`
          glass-panel
          ${config.border} border-l-2 rounded-none p-5
          hover:-translate-y-0.5 transition-all duration-300
          overflow-hidden
        `}
      >
      {config.glowColor && (
        <div
          className="radial-glow"
          style={{
            width: 250,
            height: 250,
            top: -60,
            right: -40,
            background: `radial-gradient(circle, ${config.glowColor} 0%, rgba(0,0,0,0) 70%)`,
          }}
        />
      )}

      <div className="flex items-center justify-between mb-4 relative z-10">
        <div className="flex items-center gap-2.5">
          <div className={`w-2 h-2 flex-shrink-0 rounded-full ${config.square}`} />
          <span className="text-[11px] font-medium uppercase tracking-label text-text-secondary">
            {config.label}{vulnCount !== undefined ? ` — ${vulnCount} VULNS` : ""}
          </span>
        </div>
        <HeaderStatus envelope={envelope} />
      </div>

      <h3 className="font-extralight text-xl text-white leading-tight mb-2 text-glow-sm relative z-10">
        {title}
      </h3>

      <p className="text-xs font-light text-text-muted uppercase tracking-telemetry mb-1 relative z-10">
        {subheader}
      </p>

      {hasChain ? (
        <div className="relative z-10 mt-4 space-y-4">
          <KpiStrip items={[
            { value: String(chainNodes.length), label: "CHAIN LENGTH" },
            { value: maxCvss.toFixed(1), label: "MAX CVSS", accent: "text-severity-critical" },
            { value: reclassLabel, label: "RECLASSIFIED" },
          ]} />

          <div className="flex gap-4">
            <div className="glass-panel rounded-none overflow-hidden flex-[3]">
              <div className="px-3 pt-2.5">
                <span className="eyebrow">// EXPLOIT CHAIN</span>
              </div>
              <ChainFlowDiagram chainNodes={chainNodes} />
            </div>
            <div className="flex-[2] flex flex-col justify-center">
              <AnalysisBullets text={chainSummary} />
            </div>
          </div>
        </div>
      ) : hasMetrics ? (
        <div className="relative z-10 mt-4 space-y-4">
          <KpiStrip items={metrics} />
          <AnalysisBullets text={chainSummary} />
        </div>
      ) : (
        <p className="text-sm font-light text-text-secondary leading-relaxed relative z-10">
          {chainSummary}
        </p>
      )}

      <div className="mt-4 pt-3 border-t border-border-subtle flex items-center justify-between relative z-10">
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

export default NotificationCard;
