/**
 * NistPostureMatrix
 * Stateless grid showing all 6 NIST CSF 2.0 functions mapped to cells
 * with posture status badges and confidence scores.
 */

import React from "react";
import type { NistPosture, NistFunction, CellRole } from "../types/hsml";
import type { SignalsUiEnvelope } from "../types/signals-ui-envelope";
import { CellBadge, ConfidenceBar, NistTag, HsmlStateOverlay } from "./primitives";

export interface NistCellMapping {
  function: NistFunction;
  functionLabel: string;
  cell: CellRole;
  cellHandle: string;
  posture: NistPosture;
}

export interface NistPostureMatrixProps {
  mappings: NistCellMapping[];
  envelope?: SignalsUiEnvelope;
}

const POSTURE_STYLES: Record<string, string> = {
  HYDRATED: "text-accent-green border-accent-green/20 bg-accent-green/5",
  ENFORCED: "text-accent-blue border-accent-blue/20 bg-accent-blue/5",
  DEGRADED: "text-severity-high border-severity-high/20 bg-severity-high/5",
  UNKNOWN: "text-text-muted border-border-subtle bg-transparent",
};

export function NistPostureMatrix({ mappings, envelope }: NistPostureMatrixProps) {
  return (
    <div className="relative">
      {envelope && <HsmlStateOverlay hsmlState={envelope.hsmlState} />}
      <div className="glass-panel rounded-none p-5 overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-2 h-2 rounded-full bg-accent-blue" />
            <span className="text-[11px] font-medium uppercase tracking-label text-text-secondary">
              NIST CSF 2.0 POSTURE MATRIX
            </span>
          </div>
          <span className="text-[9px] text-text-muted tracking-telemetry uppercase">
            6 FUNCTIONS // {mappings.filter((m) => m.posture.posture === "HYDRATED" || m.posture.posture === "ENFORCED").length} NOMINAL
          </span>
        </div>

        <div className="grid grid-cols-1 gap-2">
          {mappings.map((mapping) => (
            <div
              key={mapping.function}
              className="glass-panel rounded-none px-4 py-3 flex items-center gap-4"
            >
              <div className="w-10">
                <span className="text-[11px] font-medium text-accent-blue tracking-label">
                  {mapping.function}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[10px] text-text-primary font-light">
                  {mapping.functionLabel}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[8px] font-mono text-text-muted uppercase tracking-telemetry">
                  {mapping.cellHandle}
                </span>
              </div>
              <span
                className={`text-[8px] px-2 py-0.5 border rounded-sm uppercase tracking-eyebrow ${
                  POSTURE_STYLES[mapping.posture.posture]
                }`}
              >
                {mapping.posture.posture}
              </span>
              <span className="text-[9px] font-mono text-text-muted tabular-nums w-10 text-right">
                {mapping.posture.confidence.toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-3 border-t border-border-subtle flex items-center justify-between">
          <span className="telemetry">FRAMEWORK: NIST CSF 2.0 // CELL-BOUND COMPLIANCE</span>
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

export default NistPostureMatrix;
