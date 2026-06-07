"use client";

import { useState, useRef, useEffect } from "react";
import {
  NIST_COLORS,
  AUTONOMY_LABELS,
} from "@/lib/data/dashboard";
import type { NistCellMapping } from "@/lib/data/dashboard";

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
      className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
    >
      <path
        d="M3 4.5L6 7.5L9 4.5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function OrchestratorStrip({ mappings }: { mappings: NistCellMapping[] }) {
  const [expanded, setExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!expanded) return;
    function handleMouseDown(e: MouseEvent) {
      // MouseEvent target is always a Node in DOM
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setExpanded(false);
      }
    }
    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, [expanded]);

  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setExpanded(false);
    }
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const orchestratorConfidence = Math.round(
    mappings.reduce((sum, m) => sum + m.confidence, 0) / mappings.length
  );

  const autonomyBars = Array.from({ length: 5 }, (_, i) => (
    <div
      key={i}
      className={`w-3 h-1.5 rounded-sm ${i < 5 ? "bg-accent-blue" : "bg-white/10"}`}
    />
  ));

  const delegationItems = mappings.map((m) => (
    <div key={m.cellHandle} className="flex items-center gap-1.5">
      <div
        className="w-1.5 h-1.5 rounded-full"
        style={{ backgroundColor: NIST_COLORS[m.nistFunction] }}
      />
      <span className="text-[11px] text-white/70">
        {m.nistFunction} → {m.cellHandle}
      </span>
    </div>
  ));

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
        aria-controls="orchestrator-detail-panel"
        className={`focus-ring w-full glass-panel px-4 py-3 flex items-center gap-4 transition-colors hover:bg-white/[0.03] ${
          expanded ? "border-accent-blue/40" : ""
        }`}
      >
        {/* Diamond icon */}
        <div
          className="w-8 h-8 rotate-45 border border-accent-blue flex-shrink-0"
          style={{ boxShadow: "var(--shadow-glow-blue)" }}
        />

        {/* Text block */}
        <div className="flex flex-col items-start min-w-0">
          <span className="text-sm font-medium uppercase text-white tracking-wide">
            CYPHER ONE
          </span>
          <span className="text-[11px] uppercase tracking-wide text-white/50">
            NIST-BOUND DELEGATION · TRUST-DECAYED GOVERNANCE · FULL AUTONOMY
          </span>
        </div>

        {/* Autonomy bars */}
        <div className="flex items-center gap-0.5 ml-auto">{autonomyBars}</div>

        {/* Confidence */}
        <span className="text-sm text-white/80 tabular-nums">{orchestratorConfidence}%</span>

        {/* Chevron */}
        <ChevronIcon open={expanded} />
      </button>

      {expanded && (
        <div id="orchestrator-detail-panel" className="glass-panel mt-1 p-4 animate-[fadeIn_150ms_ease-out]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* ROLE */}
            <div>
              <span className="text-[11px] uppercase tracking-wide text-white/40">ROLE</span>
              <p className="text-sm font-light text-white/80 mt-1">
                Supervisor Core — delegates all domain actions to specialized cells under
                NIST-bound trust constraints
              </p>
            </div>

            {/* AUTONOMY */}
            <div>
              <span className="text-[11px] uppercase tracking-wide text-white/40">
                AUTONOMY — LEVEL 5
              </span>
              <p className="text-sm font-light text-white/80 mt-1">
                {AUTONOMY_LABELS[5] ?? "Full autonomous operation with self-directed decision authority"}
              </p>
              <div className="flex items-center gap-0.5 mt-2">{autonomyBars}</div>
            </div>

            {/* DELEGATION SCOPE */}
            <div>
              <span className="text-[11px] uppercase tracking-wide text-white/40">
                DELEGATION SCOPE
              </span>
              <div className="mt-1 flex flex-col gap-1">{delegationItems}</div>
            </div>

            {/* IDENTITY + TRUST */}
            <div>
              <span className="text-[11px] uppercase tracking-wide text-white/40">
                IDENTITY + TRUST
              </span>
              <p className="text-sm font-light text-white/80 mt-1">
                T(cell) = confidence × posture_weight × decay(t)
              </p>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-[11px] uppercase tracking-wide text-white/40">
                  CONFIDENCE
                </span>
                <span className="text-sm font-medium text-white tabular-nums">{orchestratorConfidence}%</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
