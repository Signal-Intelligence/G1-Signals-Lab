"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import type { KpiDrilldownItem } from "@/lib/data/dashboard";

interface KpiEntry {
  label: string;
  value: string;
  drilldown?: KpiDrilldownItem[];
}

interface KpiRibbonProps {
  items: KpiEntry[];
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="10"
      height="10"
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

export function KpiRibbon({ items }: KpiRibbonProps) {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggle = useCallback((idx: number) => {
    setExpandedIdx((prev) => (prev === idx ? null : idx));
  }, []);

  useEffect(() => {
    function handleMouseDown(e: MouseEvent) {
      if (
        expandedIdx !== null &&
        containerRef.current &&
        // MouseEvent target is always a Node in DOM
        !containerRef.current.contains(e.target as Node)
      ) {
        setExpandedIdx(null);
      }
    }
    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, [expandedIdx]);

  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setExpandedIdx(null);
    }
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const expanded = expandedIdx !== null ? items[expandedIdx] : null;

  return (
    <div ref={containerRef}>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {items.map((kpi, i) => {
          const isActive = expandedIdx === i;
          const hasDrill = !!kpi.drilldown?.length;

          return (
            <button
              key={kpi.label}
              type="button"
              onClick={() => hasDrill && toggle(i)}
              disabled={!hasDrill}
              aria-expanded={expandedIdx === i}
              aria-controls="kpi-drilldown-panel"
              className={`focus-ring glass-panel px-3 py-3 text-center flex flex-col items-center justify-end transition-colors duration-200 ${
                isActive
                  ? "border-accent-blue/40 shadow-[0_0_0_1px_var(--color-border-accent)]"
                  : ""
              } ${hasDrill ? "cursor-pointer hover:bg-white/[0.03]" : "cursor-default"}`}
            >
              <p className="glow-number text-2xl font-light leading-none mb-2 text-white">
                {kpi.value}
              </p>
              <span className="flex items-center gap-1">
                <span className="text-[11px] font-medium uppercase tracking-wide text-text-muted">
                  {kpi.label}
                </span>
                {hasDrill && (
                  <span className="text-text-muted">
                    <ChevronIcon open={isActive} />
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>

      {expanded?.drilldown && (
        <div id="kpi-drilldown-panel" className="glass-panel mt-3 px-4 py-3">
          <div className="grid grid-cols-2 gap-3">
            {expanded.drilldown.map((item) => (
              <div key={item.label} className="glass-panel px-4 py-3">
                <p className="text-sm font-medium text-white mb-1">
                  {item.label}
                </p>
                <p className="text-xs text-accent-blue mb-0.5">
                  {item.value}
                </p>
                <p className="text-[11px] text-text-muted leading-snug">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
