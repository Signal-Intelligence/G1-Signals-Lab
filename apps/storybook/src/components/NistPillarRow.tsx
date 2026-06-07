/**
 * NistPillarRow
 * Interactive NIST CSF 2.0 pillar card row with expandable detail panels.
 * Stateless — hydrated via props from SignalsUiMessenger.
 */

import React, { useState, useCallback } from "react";
import type { SignalsUiEnvelope } from "../types/signals-ui-envelope";
import type { NistCellMapping } from "./NistPostureMatrix";
import type { CellRegistryEntry } from "./CellTypologyPanel";

export interface NistPillarRowProps {
  mappings: NistCellMapping[];
  registry: CellRegistryEntry[];
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

const ROLE_LABELS: Record<string, string> = {
  COMPLIANCE_ENGINE: "Compliance Engine",
  RECON_SCANNER: "Recon Scanner",
  ENFORCEMENT_GATE: "Enforcement Gate",
  SENSOR_DRONE: "Sensor Drone",
  RESPONSE_UNIT: "Response Unit",
  SANITIZATION_GHOST: "Sanitization Ghost",
};

const AUTONOMY_LABELS: Record<number, string> = {
  1: "Advisory only \u2014 all actions require HITL review",
  2: "Observe and report \u2014 no write mutations permitted",
  3: "Limited autonomy \u2014 pre-vetted actions within playbook",
  4: "High autonomy \u2014 full playbook execution, governance-bounded",
  5: "Maximum autonomy \u2014 time-boxed containment authority",
};

const PERMISSION_LABELS: Record<string, string> = {
  NETWORK_MIRROR: "Network Traffic Mirroring",
  STIX_CORRELATE: "STIX/TAXII Threat Correlation",
  INGESTION_QUERY: "Ingestion Pipeline Queries",
  XDBML_PARSE: "XDBML Policy Document Parsing",
  BILL_C8_CROSSCHECK: "Bill C-8 Compliance Crosscheck",
  CROSSWALK_COMPILE: "Regulatory Crosswalk Compilation",
  OPENC2_DISTRIBUTE: "OpenC2 Command Distribution",
  WEBAUTHN_CHALLENGE: "WebAuthn Biometric Challenge",
  SMS_BROADCAST: "SMS Alert Broadcast",
  FS_HASH: "Filesystem Integrity Hashing",
  DEPENDENCY_RESOLVE: "Dependency Graph Resolution",
  CBOM_COMPILE: "CBOM Inventory Compilation",
  WORKSPACE_DELETE: "Workspace Artifact Deletion",
  TEMP_PURGE: "Temporary Data Purge",
  LOG_SEAL: "Log Sealing & Archival",
  INCIDENT_EXECUTE: "Incident Playbook Execution",
  PLAYBOOK_DISPATCH: "Playbook Dispatch & Routing",
  CONTAINMENT_ENFORCE: "Containment Action Enforcement",
};

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg width="10" height="10" viewBox="0 0 12 12" fill="none" className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}>
      <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function NistPillarRow({ mappings, registry }: NistPillarRowProps) {
  const [expandedPillar, setExpandedPillar] = useState<string | null>(null);

  const togglePillar = useCallback((fn: string) => {
    setExpandedPillar((prev) => (prev === fn ? null : fn));
  }, []);

  const expandedMapping = expandedPillar ? mappings.find((m) => m.function === expandedPillar) : null;
  const expandedReg = expandedMapping ? registry.find((r) => r.cell.handle === expandedMapping.cellHandle) : null;
  const expandedCell = expandedReg?.cell;
  const expandedColor = expandedPillar ? (NIST_COLORS[expandedPillar] ?? "#0066ff") : "#0066ff";

  return (
    <div>
      {/* Pillar cards */}
      <div className="flex gap-2">
        {mappings.map((m) => {
          const color = NIST_COLORS[m.function] ?? "#0066ff";
          const reg = registry.find((r) => r.cell.handle === m.cellHandle);
          const ceiling = reg?.cell.autonomyCeiling ?? 0;
          const pct = Math.round(m.posture.confidence * 100);
          const isOpen = expandedPillar === m.function;

          return (
            <button
              key={m.function}
              type="button"
              onClick={() => togglePillar(m.function)}
              className="glass-panel flex-1 min-w-0 px-2 py-3 flex flex-col items-center text-center transition-colors duration-150 hover:bg-[rgba(0,102,255,0.03)] cursor-pointer"
              style={isOpen ? { borderColor: `${color}40`, boxShadow: `0 0 0 1px ${color}30` } : undefined}
            >
              <div className="flex items-center gap-1 mb-1.5">
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color, boxShadow: `0 0 6px ${color}` }} />
                <span className="text-[9px] font-medium uppercase tracking-label" style={{ color }}>{m.functionLabel}</span>
              </div>
              <span className="text-[18px] font-thin tabular-nums mb-1" style={{ color, textShadow: `0 0 16px ${color}40` }}>{m.function}</span>
              <span className="text-[8px] font-medium uppercase tracking-label text-white mb-0.5 truncate w-full">{m.cellHandle}</span>
              <span className="text-[7px] font-normal uppercase tracking-telemetry text-text-muted mb-1.5 truncate w-full">{ROLE_LABELS[m.cell] ?? m.cell}</span>
              <div className="w-full mb-1">
                <div className="h-px w-full bg-white/[0.06] relative">
                  <div className="absolute inset-y-0 left-0 h-px" style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${color}80, ${color}30)` }} />
                </div>
                <span className="text-[7px] font-normal tabular-nums text-text-muted mt-0.5 block">{pct}%</span>
              </div>
              <span className="text-[6px] font-medium uppercase tracking-[0.12em] px-1 py-[1px] mb-1.5 rounded-sm" style={{ border: `1px solid ${color}33`, color }}>{m.posture.posture}</span>
              <div className="flex gap-0.5 mb-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="w-1.5 h-[3px]" style={{ backgroundColor: i < ceiling ? color : "rgba(255,255,255,0.06)" }} />
                ))}
              </div>
              <ChevronIcon open={isOpen} />
            </button>
          );
        })}
      </div>

      {/* Expanded pillar detail */}
      {expandedMapping && expandedCell && (
        <div className="glass-panel px-5 py-4 mt-2 animate-[fadeIn_150ms_ease-out]" style={{ borderColor: `${expandedColor}25` }}>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: expandedColor, boxShadow: `0 0 6px ${expandedColor}` }} />
            <span className="text-[10px] font-medium uppercase tracking-label" style={{ color: expandedColor }}>{expandedMapping.functionLabel} — {expandedMapping.cellHandle}</span>
            <span className="text-[8px] font-normal uppercase tracking-telemetry text-text-muted ml-auto">{ROLE_LABELS[expandedMapping.cell] ?? expandedMapping.cell}</span>
          </div>
          <div className="grid grid-cols-4 gap-4">
            <div>
              <span className="text-[8px] font-medium uppercase tracking-eyebrow text-text-muted block mb-1">CONSTRAINT</span>
              <p className="text-[9px] font-normal text-text-secondary leading-relaxed">{expandedReg?.constraint ?? "\u2014"}</p>
            </div>
            <div>
              <span className="text-[8px] font-medium uppercase tracking-eyebrow text-text-muted block mb-1">AUTONOMY — LEVEL {expandedCell.autonomyCeiling}</span>
              <p className="text-[9px] font-normal text-text-secondary leading-relaxed">{AUTONOMY_LABELS[expandedCell.autonomyCeiling] ?? "Unknown"}</p>
              <div className="flex gap-0.5 mt-1.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="w-3 h-1.5" style={{ backgroundColor: i < expandedCell.autonomyCeiling ? expandedColor : "rgba(255,255,255,0.06)" }} />
                ))}
              </div>
            </div>
            <div>
              <span className="text-[8px] font-medium uppercase tracking-eyebrow text-text-muted block mb-1">PERMISSIONS</span>
              <div className="flex flex-col gap-1">
                {expandedCell.permissions.map((p) => (
                  <div key={p} className="flex items-center gap-1.5">
                    <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ backgroundColor: expandedColor, opacity: 0.6 }} />
                    <span className="text-[8px] font-normal text-text-muted">{PERMISSION_LABELS[p] ?? p}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <span className="text-[8px] font-medium uppercase tracking-eyebrow text-text-muted block mb-1">NIST CATEGORY</span>
              <span className="text-[10px] font-normal tabular-nums block mb-2" style={{ color: expandedColor }}>{expandedMapping.posture.category}</span>
              <span className="text-[8px] font-medium uppercase tracking-eyebrow text-text-muted block mb-1">POSTURE</span>
              <span className="text-[8px] font-medium uppercase tracking-[0.12em] px-1.5 py-[2px] rounded-sm inline-block mb-2" style={{ border: `1px solid ${expandedColor}33`, color: expandedColor }}>{expandedMapping.posture.posture}</span>
              <span className="text-[8px] font-medium uppercase tracking-eyebrow text-text-muted block mb-1">CONFIDENCE</span>
              <span className="text-[10px] font-normal tabular-nums" style={{ color: expandedColor }}>{Math.round(expandedMapping.posture.confidence * 100)}%</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default NistPillarRow;
