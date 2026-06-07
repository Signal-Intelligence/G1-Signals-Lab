"use client";

import { useState, useRef, useEffect } from "react";
import {
  NIST_COLORS,
  AUTONOMY_LABELS,
  PERMISSION_LABELS,
} from "@/lib/data/dashboard";
import { PILLAR_ORDER } from "@/lib/data/dashboard-events";
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

export function NistPillarRow({
  mappings,
  selectedAgent,
}: {
  mappings: NistCellMapping[];
  selectedAgent?: string | null;
}) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (expandedIndex === null) return;
    function handleMouseDown(e: MouseEvent) {
      // MouseEvent target is always a Node in DOM
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setExpandedIndex(null);
      }
    }
    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, [expandedIndex]);

  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setExpandedIndex(null);
    }
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const pillars = PILLAR_ORDER.map((fn) => mappings.find((m) => m.nistFunction === fn)).filter(
    (m): m is NistCellMapping => m != null
  );

  // key is validated by NistFunction union
  const getColor = (fn: string) => NIST_COLORS[fn as keyof typeof NIST_COLORS] ?? 'var(--color-text-muted)';

  return (
    <div ref={containerRef}>
      {/* Pillar buttons row */}
      <div className="flex gap-2 overflow-x-auto">
        {pillars.map((pillar, idx) => {
          const color = getColor(pillar.nistFunction);
          const isExpanded = expandedIndex === idx;

          return (
            <button
              type="button"
              key={pillar.nistFunction}
              onClick={() => setExpandedIndex(isExpanded ? null : idx)}
              aria-expanded={expandedIndex === idx}
              aria-controls="pillar-detail-panel"
              className={`focus-ring min-w-[80px] flex-1 glass-panel p-3 flex flex-col items-start gap-1 transition-colors hover:bg-white/[0.03] ${
                isExpanded ? "border-opacity-60" : ""
              }${selectedAgent && selectedAgent !== pillar.cellHandle ? " opacity-25" : ""}`}
              style={isExpanded ? { borderColor: `${color}60` } : undefined}
            >
              {/* Function label + dot */}
              <div className="flex items-center gap-1.5">
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: color }}
                />
                <span className="text-[11px] uppercase tracking-wide" style={{ color }}>
                  {pillar.functionLabel}
                </span>
              </div>

              {/* Function code */}
              <span
                className="text-xl font-extralight"
                style={{ color, textShadow: `0 0 8px ${color}60` }}
              >
                {pillar.nistFunction}
              </span>

              {/* Cell handle */}
              <span className="text-xs font-medium text-white truncate w-full text-left">
                {pillar.cellHandle}
              </span>

              {/* Role */}
              <span className="text-[11px] text-white/50 truncate w-full text-left">
                {pillar.cellRole}
              </span>

              {/* Confidence bar */}
              <div className="w-full h-1.5 bg-bg-tertiary rounded-full overflow-hidden mt-1">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${pillar.confidence}%`,
                    background: `linear-gradient(90deg, ${color}80, ${color})`,
                  }}
                />
              </div>

              {/* Confidence % */}
              <span className="text-[11px] tabular-nums text-white/60">
                {pillar.confidence}%
              </span>

              {/* Posture chip */}
              <span
                className="text-[11px] px-1.5 py-0.5 rounded border"
                style={{ borderColor: `${color}60`, color }}
              >
                {pillar.posture}
              </span>

              {/* Autonomy ticks */}
              <div className="flex items-center gap-0.5 mt-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <div
                    key={i}
                    className="w-2 h-1 rounded-sm"
                    style={{
                      backgroundColor:
                        i < pillar.autonomyCeiling ? color : "var(--color-border-glass)",
                    }}
                  />
                ))}
              </div>

              {/* Chevron */}
              <div className="self-end mt-auto">
                <ChevronIcon open={isExpanded} />
              </div>
            </button>
          );
        })}
      </div>

      {/* Expanded detail panel (below all cards) */}
      {expandedIndex !== null && pillars[expandedIndex] && (
        <ExpandedPanel id="pillar-detail-panel" pillar={pillars[expandedIndex]} color={getColor(pillars[expandedIndex].nistFunction)} />
      )}
    </div>
  );
}

function ExpandedPanel({ id, pillar, color }: { id: string; pillar: NistCellMapping; color: string }) {
  return (
    <div
      id={id}
      className="glass-panel mt-2 p-4 animate-[fadeIn_150ms_ease-out]"
      style={{ borderColor: `${color}40` }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* CONSTRAINT */}
        <div>
          <span className="text-[11px] uppercase tracking-wide text-white/40">CONSTRAINT</span>
          <p className="text-sm font-light text-white/80 mt-1">{pillar.constraint}</p>
        </div>

        {/* AUTONOMY */}
        <div>
          <span className="text-[11px] uppercase tracking-wide text-white/40">
            AUTONOMY — LEVEL {pillar.autonomyCeiling}
          </span>
          <p className="text-sm font-light text-white/80 mt-1">
            {AUTONOMY_LABELS[pillar.autonomyCeiling] ?? `Level ${pillar.autonomyCeiling}`}
          </p>
          <div className="flex items-center gap-0.5 mt-2">
            {Array.from({ length: 5 }, (_, i) => (
              <div
                key={i}
                className="w-3 h-1.5 rounded-sm"
                style={{
                  backgroundColor:
                    i < pillar.autonomyCeiling ? color : "var(--color-border-glass)",
                }}
              />
            ))}
          </div>
        </div>

        {/* PERMISSIONS */}
        <div>
          <span className="text-[11px] uppercase tracking-wide text-white/40">PERMISSIONS</span>
          <div className="mt-1 flex flex-col gap-1">
            {pillar.permissions.map((perm) => (
              <div key={perm} className="flex items-center gap-1.5">
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: color }}
                />
                <span className="text-[11px] text-white/70">
                  {/* key is validated by PERMISSION_LABELS record */}
                  {PERMISSION_LABELS[perm as keyof typeof PERMISSION_LABELS] ?? perm}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* NIST CATEGORY + POSTURE + CONFIDENCE */}
        <div>
          <span className="text-[11px] uppercase tracking-wide text-white/40">
            NIST CATEGORY
          </span>
          <p className="text-sm font-light text-white/80 mt-1">{pillar.nistCategory}</p>

          <div className="mt-3 flex items-center gap-2">
            <span
              className="text-[11px] px-1.5 py-0.5 rounded border"
              style={{ borderColor: `${color}60`, color }}
            >
              {pillar.posture}
            </span>
          </div>

          <div className="mt-2 flex items-center gap-2">
            <span className="text-[11px] uppercase tracking-wide text-white/40">
              CONFIDENCE
            </span>
            <span className="text-sm font-medium text-white tabular-nums">
              {pillar.confidence}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
