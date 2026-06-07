/**
 * CellTypologyPanel
 * Stateless registry view of all 6 cell types with autonomy,
 * permissions, constraints, and owning NIST function.
 */

import React from "react";
import type { CellIdentity, CellRole, NistFunction } from "../types/hsml";
import type { SignalsUiEnvelope } from "../types/signals-ui-envelope";
import { CellBadge, ConfidenceBar, NistTag, HsmlStateOverlay } from "./primitives";

export interface CellRegistryEntry {
  cell: CellIdentity;
  nistFunction: NistFunction;
  constraint: string;
  isActive: boolean;
}

export interface CellTypologyPanelProps {
  cells: CellRegistryEntry[];
  envelope?: SignalsUiEnvelope;
}

const ROLE_DESCRIPTIONS: Record<CellRole, string> = {
  SUPERVISOR_CORE: "Supervisor Core",
  SENSOR_DRONE: "Passive Telemetry Drone",
  COMPLIANCE_ENGINE: "Invariant Policy Validator",
  ENFORCEMENT_GATE: "Gateway Enforcement Actuator",
  RECON_SCANNER: "Cryptographic Supply-Chain Scanner",
  SANITIZATION_GHOST: "Clean-Slate Ghost Invocator",
  RESPONSE_UNIT: "Incident Response Actuator",
};

export function CellTypologyPanel({ cells, envelope }: CellTypologyPanelProps) {
  const activeCells = cells.filter((c) => c.isActive).length;

  return (
    <div className="relative">
      {envelope && <HsmlStateOverlay hsmlState={envelope.hsmlState} />}
      <div className="glass-panel rounded-none p-5 overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-2 h-2 rounded-full bg-accent-blue" />
            <span className="text-[11px] font-medium uppercase tracking-label text-text-secondary">
              CELL TYPOLOGY REGISTRY
            </span>
          </div>
          <span className="text-[9px] text-text-muted tracking-telemetry uppercase">
            {activeCells}/{cells.length} ACTIVE
          </span>
        </div>

        <div className="space-y-2">
          {cells.map((entry) => (
            <div
              key={entry.cell.handle}
              className={`glass-panel rounded-none px-4 py-3 border-l-2 ${
                entry.isActive ? "border-l-accent-green" : "border-l-severity-critical"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-medium text-white">
                    {entry.cell.handle}
                  </span>
                  <span className="text-[8px] text-text-muted uppercase tracking-telemetry">
                    {ROLE_DESCRIPTIONS[entry.cell.role]}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-[8px] px-1.5 py-0.5 border rounded-sm uppercase tracking-eyebrow ${
                    entry.isActive
                      ? "text-accent-green border-accent-green/20"
                      : "text-severity-critical border-severity-critical/20"
                  }`}>
                    {entry.isActive ? "ACTIVE" : "HALTED"}
                  </span>
                  <span className="text-[8px] px-1.5 py-0.5 border border-accent-blue/20 rounded-sm text-accent-blue uppercase tracking-eyebrow">
                    {entry.nistFunction}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-[9px] text-text-muted">
                    Ceiling: <span className="text-white">L{entry.cell.autonomyCeiling}</span>
                  </span>
                  <span className="text-[9px] text-text-muted">
                    Current: <span className="text-white">L{entry.cell.currentAutonomy}</span>
                  </span>
                </div>
                <div className="flex gap-1">
                  {entry.cell.permissions.slice(0, 2).map((perm) => (
                    <span key={perm} className="text-[7px] px-1 py-0.5 border border-border-subtle rounded-sm text-text-data uppercase">
                      {perm}
                    </span>
                  ))}
                  {entry.cell.permissions.length > 2 && (
                    <span className="text-[7px] text-text-data">+{entry.cell.permissions.length - 2}</span>
                  )}
                </div>
              </div>

              <p className="text-[9px] text-text-muted mt-1.5 leading-snug italic">
                {entry.constraint}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-3 border-t border-border-subtle flex items-center justify-between">
          <span className="telemetry">AGENT-TO-CELL TYPOLOGY MATRIX // ADR-G1-004</span>
          <div className="flex items-center gap-2">
            {envelope?.nistPosture && <NistTag posture={envelope.nistPosture} />}
            {envelope?.emittingCell && <CellBadge cell={envelope.emittingCell} />}
          </div>
        </div>
        {envelope && <div className="mt-2"><ConfidenceBar confidence={envelope.confidence} /></div>}
      </div>
    </div>
  );
}

export default CellTypologyPanel;
