/**
 * OrchestratorStrip
 * Expandable orchestrator status strip showing CYPHER ONE delegation scope,
 * autonomy level, identity, and trust. Stateless — hydrated via props.
 */

import React, { useState, useCallback } from "react";
import type { SignalsUiEnvelope } from "../types/signals-ui-envelope";
import type { NistCellMapping } from "./NistPostureMatrix";

export interface DelegationTarget {
  function: string;
  cellHandle: string;
  color?: string;
}

export interface OrchestratorStripProps {
  handle?: string;
  subtitle?: string;
  autonomyLevel?: number;
  confidence?: number;
  delegations?: DelegationTarget[];
  mappings?: NistCellMapping[];
  envelope?: SignalsUiEnvelope;
}

const NIST_COLORS: Record<string, string> = {
  GV: "#0066ff",
  ID: "#7c3aed",
  PR: "#00ff88",
  DE: "#b8784a",
  RS: "#c4506a",
  RC: "#9a8a42",
};

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg width="10" height="10" viewBox="0 0 12 12" fill="none" className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}>
      <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function OrchestratorStrip({
  handle = "CYPHER ONE",
  subtitle = "NIST-BOUND DELEGATION \u00B7 TRUST-DECAYED GOVERNANCE \u00B7 FULL AUTONOMY",
  autonomyLevel = 5,
  confidence = 99,
  delegations,
  mappings,
}: OrchestratorStripProps) {
  const [expanded, setExpanded] = useState(false);
  const toggle = useCallback(() => setExpanded((p) => !p), []);

  const delegationItems: DelegationTarget[] = delegations ?? (mappings ?? []).map((m) => ({
    function: m.function,
    cellHandle: m.cellHandle,
    color: NIST_COLORS[m.function],
  }));

  return (
    <div>
      <button
        type="button"
        onClick={toggle}
        className="glass-panel px-4 py-3.5 flex items-center gap-4 w-full text-left transition-colors duration-150 hover:bg-[rgba(0,102,255,0.03)] cursor-pointer"
        style={expanded ? { borderColor: "rgba(0,102,255,0.4)", boxShadow: "0 0 0 1px rgba(0,102,255,0.2)" } : undefined}
      >
        <div
          className="w-8 h-8 flex items-center justify-center animate-glow-pulse flex-shrink-0"
          style={{ transform: "rotate(45deg)", border: "1.5px solid #0066ff", boxShadow: "0 0 10px rgba(0,102,255,0.4)", background: "rgba(0,102,255,0.08)" }}
        >
          <span className="text-accent-blue text-sm" style={{ transform: "rotate(-45deg)" }}>{"\u25C6"}</span>
        </div>
        <div className="flex-1">
          <p className="text-[11px] font-medium uppercase tracking-label text-white">{handle}</p>
          <p className="text-[9px] font-normal uppercase tracking-telemetry text-text-muted mt-0.5">{subtitle}</p>
        </div>
        <div className="flex items-center gap-1.5 mr-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="w-3 h-1.5" style={{ backgroundColor: i < autonomyLevel ? "#0066ff" : "rgba(255,255,255,0.06)" }} />
          ))}
        </div>
        <ChevronIcon open={expanded} />
      </button>

      {expanded && (
        <div className="glass-panel px-5 py-4 mt-2 animate-[fadeIn_150ms_ease-out]" style={{ borderColor: "rgba(0,102,255,0.2)" }}>
          <div className="grid grid-cols-4 gap-4">
            <div>
              <span className="text-[8px] font-medium uppercase tracking-eyebrow text-text-muted block mb-1">ROLE</span>
              <p className="text-[9px] font-normal text-text-secondary leading-relaxed">Supervisor Core — delegates all domain actions to NIST-bound agents. No direct system mutations.</p>
            </div>
            <div>
              <span className="text-[8px] font-medium uppercase tracking-eyebrow text-text-muted block mb-1">AUTONOMY — LEVEL {autonomyLevel}</span>
              <p className="text-[9px] font-normal text-text-secondary leading-relaxed">Maximum autonomy — time-boxed containment authority with full delegation rights</p>
              <div className="flex gap-0.5 mt-1.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="w-3 h-1.5" style={{ backgroundColor: i < autonomyLevel ? "#0066ff" : "rgba(255,255,255,0.06)" }} />
                ))}
              </div>
            </div>
            <div>
              <span className="text-[8px] font-medium uppercase tracking-eyebrow text-text-muted block mb-1">DELEGATION SCOPE</span>
              <div className="flex flex-col gap-1 mt-0.5">
                {delegationItems.map((d) => (
                  <div key={d.function} className="flex items-center gap-1.5">
                    <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ backgroundColor: d.color ?? NIST_COLORS[d.function] ?? "#0066ff", opacity: 0.7 }} />
                    <span className="text-[8px] font-normal text-text-muted">{d.function} → {d.cellHandle}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <span className="text-[8px] font-medium uppercase tracking-eyebrow text-text-muted block mb-1">IDENTITY</span>
              <p className="text-[9px] font-normal text-text-secondary leading-relaxed mb-2">KERI AID-bound · Non-transferable · KEL-anchored</p>
              <span className="text-[8px] font-medium uppercase tracking-eyebrow text-text-muted block mb-1">TRUST</span>
              <p className="text-[9px] font-normal text-text-secondary leading-relaxed mb-2">C(t) = C₀ · e<sup>-λ(t-t₀)</sup></p>
              <span className="text-[8px] font-medium uppercase tracking-eyebrow text-text-muted block mb-1">CONFIDENCE</span>
              <span className="text-[10px] font-normal tabular-nums text-accent-blue">{confidence}%</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrchestratorStrip;
