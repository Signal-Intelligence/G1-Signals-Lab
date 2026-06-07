/**
 * KpiRibbon
 * Interactive KPI card ribbon with expandable drill-down panels.
 * Stateless — hydrated via props from SignalsUiMessenger.
 */

import React, { useState, useCallback } from "react";
import type { SignalsUiEnvelope } from "../types/signals-ui-envelope";

export interface KpiDrilldownItem {
  label: string;
  value: string;
  detail: string;
}

export interface KpiEntry {
  label: string;
  value: string;
  drilldown?: KpiDrilldownItem[];
}

export interface KpiRibbonProps {
  items: KpiEntry[];
  columns?: number;
  envelope?: SignalsUiEnvelope;
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg width="10" height="10" viewBox="0 0 12 12" fill="none" className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}>
      <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const GRID_COLS: Record<number, string> = {
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  5: "grid-cols-5",
  6: "grid-cols-6",
};

export function KpiRibbon({ items, columns }: KpiRibbonProps) {
  const [expandedKpi, setExpandedKpi] = useState<string | null>(null);

  const toggleKpi = useCallback((label: string) => {
    setExpandedKpi((prev) => (prev === label ? null : label));
  }, []);

  const cols = columns ?? items.length;

  return (
    <div>
      <div className={`grid ${GRID_COLS[cols] ?? "grid-cols-4"} gap-2`}>
        {items.map((kpi) => {
          const isOpen = expandedKpi === kpi.label;
          const hasDrilldown = kpi.drilldown && kpi.drilldown.length > 0;
          return (
            <button
              key={kpi.label}
              type="button"
              onClick={() => hasDrilldown && toggleKpi(kpi.label)}
              className={`glass-panel px-3 py-3 flex flex-col items-center justify-between transition-colors duration-150 ${hasDrilldown ? "hover:bg-[rgba(0,102,255,0.03)] cursor-pointer" : ""}`}
              style={isOpen ? { borderColor: "rgba(0,102,255,0.4)", boxShadow: "0 0 0 1px rgba(0,102,255,0.2)" } : undefined}
            >
              <p className="glow-number text-lg leading-none mb-2 text-white">{kpi.value}</p>
              <span className="text-[8px] font-medium uppercase tracking-eyebrow text-text-muted text-center block mb-1.5">{kpi.label}</span>
              {hasDrilldown && <ChevronIcon open={isOpen} />}
            </button>
          );
        })}
      </div>

      {expandedKpi && (() => {
        const kpi = items.find((k) => k.label === expandedKpi);
        if (!kpi?.drilldown) return null;
        return (
          <div className="glass-panel px-4 py-3 mt-2 animate-[fadeIn_150ms_ease-out]" style={{ borderColor: "rgba(0,102,255,0.2)" }}>
            <div className="grid grid-cols-2 gap-2">
              {kpi.drilldown.map((item) => (
                <div key={item.label} className="glass-panel px-3 py-2.5">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[10px] font-medium text-white">{item.label}</span>
                    <span className="text-[9px] font-normal text-accent-blue">{item.value}</span>
                  </div>
                  <p className="text-[8px] font-normal text-text-muted leading-relaxed">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        );
      })()}
    </div>
  );
}

export default KpiRibbon;
