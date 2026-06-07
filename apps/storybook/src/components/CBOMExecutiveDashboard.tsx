import React from "react";
import type { CBOMEntry, CoverageGap, ScanFailure } from "../types/domain";
import type { SignalsUiEnvelope } from "../types/signals-ui-envelope";
import { HeaderStatus, HsmlStateOverlay } from "./primitives";

const agilityColors: Record<CBOMEntry["agility"], string> = {
  high: "text-accent-blue",
  medium: "text-amber-400",
  low: "text-red-400",
  none: "text-red-500",
};

const severityIndicator: Record<CoverageGap["severity"], string> = {
  high: "bg-red-400",
  medium: "bg-amber-400",
  low: "bg-green-400",
};

const priorityIndicator: Record<string, string> = {
  critical: "bg-red-400",
  high: "bg-amber-400",
  medium: "bg-accent-blue",
  low: "bg-text-muted",
};

interface ActionItem {
  title: string;
  owner: string;
  priority: "critical" | "high" | "medium" | "low";
  status: string;
}

export interface CBOMExecutiveDashboardProps {
  entries: CBOMEntry[];
  gaps: CoverageGap[];
  failures: ScanFailure[];
  actionItems: ActionItem[];
  envelope?: SignalsUiEnvelope;
}

function riskBarColor(score: number): string {
  if (score > 0.8) return "bg-accent-danger";
  if (score > 0.5) return "bg-amber-500";
  return "bg-accent-blue";
}

export function CBOMExecutiveDashboard({
  entries,
  gaps,
  failures,
  actionItems,
  envelope,
}: CBOMExecutiveDashboardProps) {
  const pqcVulnerable = entries.filter((e) => e.pqcVulnerable);
  const highAgility = entries.filter((e) => e.agility === "high");

  const algCounts = new Map<string, { count: number; vulnerable: boolean }>();
  for (const e of entries) {
    const existing = algCounts.get(e.algorithm);
    algCounts.set(e.algorithm, {
      count: (existing?.count ?? 0) + 1,
      vulnerable: existing?.vulnerable ?? e.pqcVulnerable,
    });
  }
  const algEntries = [...algCounts.entries()].sort((a, b) => b[1].count - a[1].count);
  const maxCount = algEntries.length > 0 ? algEntries[0][1].count : 1;

  const vulnSorted = [...pqcVulnerable].sort((a, b) => b.riskScore - a.riskScore);

  const stats = [
    { label: "TOTAL ENTRIES", value: String(entries.length) },
    { label: "PQC VULNERABLE", value: String(pqcVulnerable.length), accent: pqcVulnerable.length > 0 ? "text-accent-danger" : "text-accent-green" },
    { label: "HIGH AGILITY", value: String(highAgility.length), accent: "text-accent-blue" },
    { label: "COVERAGE GAPS", value: String(gaps.length), accent: gaps.length > 0 ? "text-amber-400" : undefined },
  ];

  return (
    <div className="relative">
      {envelope && <HsmlStateOverlay hsmlState={envelope.hsmlState} />}
    <div className="glass-panel border-l-2 border-l-accent-blue rounded-none p-5 overflow-hidden">
      <div
        className="radial-glow"
        style={{ width: 300, height: 300, top: -80, right: -60, background: "radial-gradient(circle, rgba(0,102,255,0.10) 0%, rgba(0,0,0,0) 70%)" }}
      />

      <div className="flex items-center justify-between mb-4 relative z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-2 h-2 flex-shrink-0 rounded-full bg-accent-blue" />
          <span className="text-[11px] font-medium uppercase tracking-label text-text-secondary">
            CBOM EXECUTIVE
          </span>
        </div>
        <HeaderStatus envelope={envelope} />
      </div>

      <h3 className="font-extralight text-xl text-white leading-tight mb-1 text-glow-sm relative z-10">
        Cryptographic Inventory Summary
      </h3>
      <p className="text-xs font-light text-text-muted uppercase tracking-telemetry mb-5 relative z-10">
        one-shadow — CycloneDX 1.6 CBOM
      </p>

      {/* KPI Strip */}
      <div className="grid grid-cols-4 gap-3 mb-5 relative z-10">
        {stats.map((s) => (
          <div key={s.label} className="glass-panel px-3 py-3 text-center flex flex-col items-center justify-end">
            <p className={`glow-number text-lg leading-none mb-2 ${s.accent ?? "text-white"}`}>{s.value}</p>
            <span className="eyebrow">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Algorithm distribution */}
      <div className="mb-5 relative z-10">
        <span className="eyebrow block mb-3">// ALGORITHM DISTRIBUTION</span>
        <div className="space-y-2">
          {algEntries.map(([alg, { count, vulnerable }]) => (
            <div key={alg} className="flex items-center gap-3">
              <span className="w-28 shrink-0 telemetry text-right truncate">{alg}</span>
              <div className="flex-1 h-4 bg-[#1f2937] overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${vulnerable ? "bg-accent-danger/70" : "bg-accent-blue/80"}`}
                  style={{ width: `${Math.max((count / maxCount) * 100, 4)}%`, boxShadow: vulnerable ? "0 0 10px rgba(239,68,68,0.4)" : "0 0 10px rgba(0,102,255,0.4)" }}
                />
              </div>
              <span className="w-8 telemetry text-right">{count}</span>
              {vulnerable && <span className="telemetry text-accent-danger w-10">VULN</span>}
              {!vulnerable && <span className="w-10" />}
            </div>
          ))}
        </div>
      </div>

      {/* PQC Vulnerable table */}
      {vulnSorted.length > 0 && (
        <div className="mb-5 relative z-10">
          <span className="eyebrow block mb-3">// PQC VULNERABLE ENTRIES</span>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  {["System", "Algorithm", "Key Len", "Usage", "Agility", "Risk"].map((h) => (
                    <th key={h} className="text-left py-2 px-3 text-[11px] font-medium uppercase tracking-telemetry text-text-muted">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {vulnSorted.map((e) => (
                  <tr key={e.id} className="border-t border-border-subtle hover:bg-[rgba(0,102,255,0.05)]">
                    <td className="px-3 py-2.5 text-white font-light text-sm">{e.system}</td>
                    <td className="px-3 py-2.5 telemetry">{e.algorithm}</td>
                    <td className="px-3 py-2.5 telemetry">{e.keyLength}</td>
                    <td className="px-3 py-2.5 text-text-secondary text-xs font-light">{e.usage}</td>
                    <td className={`px-3 py-2.5 text-xs font-medium uppercase ${agilityColors[e.agility]}`}>{e.agility}</td>
                    <td className="px-3 py-2.5">
                      <div className="flex items-center gap-2">
                        <div className="w-12 h-[2px] bg-[#1f2937] overflow-hidden">
                          <div className={`h-full ${riskBarColor(e.riskScore)}`} style={{ width: `${e.riskScore * 100}%` }} />
                        </div>
                        <span className="telemetry">{e.riskScore.toFixed(2)}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Coverage gaps */}
      {gaps.length > 0 && (
        <div className="mb-5 relative z-10">
          <span className="eyebrow block mb-3">// COVERAGE GAPS</span>
          <div className="grid gap-2 md:grid-cols-2">
            {gaps.map((g, i) => (
              <div key={i} className="glass-panel rounded-none p-3 hover:-translate-y-0.5 transition-all duration-300">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="font-light text-sm text-white">{g.area}</span>
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium uppercase tracking-telemetry ${g.severity === "high" ? "text-red-400" : g.severity === "medium" ? "text-amber-400" : "text-green-400"}`}>
                    <span className={`w-1 h-1 rounded-full ${severityIndicator[g.severity]}`} />
                    {g.severity.toUpperCase()}
                  </span>
                </div>
                <p className="text-text-secondary text-xs font-light leading-relaxed">{g.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action items */}
      {actionItems.length > 0 && (
        <div className="mb-5 relative z-10">
          <span className="eyebrow block mb-3">// ACTION ITEMS</span>
          <div className="space-y-1">
            {actionItems.map((a, i) => (
              <div key={i} className="flex items-center gap-3 px-3 py-2.5 border border-border-subtle rounded-none hover:bg-[rgba(0,102,255,0.03)] transition-colors">
                <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${priorityIndicator[a.priority] ?? "bg-text-muted"}`} />
                <span className="flex-1 text-sm text-white font-light">{a.title}</span>
                <span className="telemetry">{a.owner}</span>
                <span className="telemetry">{a.status}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-4 pt-3 border-t border-border-subtle flex items-center justify-between relative z-10">
        <span className="telemetry">one-shadow inventory</span>
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

export default CBOMExecutiveDashboard;
