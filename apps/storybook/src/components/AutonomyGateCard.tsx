/**
 * AutonomyGateCard
 * Stateless display of reactive autonomy gate status for a given cell.
 * Shows ceiling, effective level, permissions, and confidence-gated lock state.
 */

import React from "react";
import type { CellIdentity, ConfidenceTier } from "../types/hsml";
import type { SignalsUiEnvelope } from "../types/signals-ui-envelope";
import { CellBadge, ConfidenceBar, NistTag, HsmlStateOverlay } from "./primitives";
import { CONFIDENCE_TIER_CONFIG } from "./primitives/ConfidenceTierConfig";

export interface AutonomyGateCardProps {
  cell: CellIdentity;
  confidenceTier: ConfidenceTier;
  isHalted?: boolean;
  envelope?: SignalsUiEnvelope;
}

const TIER_STYLES: Record<ConfidenceTier, { badge: string; label: string }> = {
  HIGH: { badge: "text-accent-green border-accent-green/20", label: "FULL AUTOMATION" },
  MEDIUM: { badge: "text-severity-medium border-severity-medium/20", label: "READ-ONLY" },
  LOW: { badge: "text-severity-critical border-severity-critical/20", label: "HALTED" },
};

export function AutonomyGateCard({
  cell,
  confidenceTier,
  isHalted = false,
  envelope,
}: AutonomyGateCardProps) {
  const styles = TIER_STYLES[confidenceTier];
  const tierConfig = CONFIDENCE_TIER_CONFIG[confidenceTier];
  const effectiveAutonomy = confidenceTier === "LOW" ? 0 : cell.currentAutonomy;

  return (
    <div className="relative">
      {envelope && <HsmlStateOverlay hsmlState={envelope.hsmlState} />}
      <div className={`glass-panel ${tierConfig.border} border-l-2 rounded-none p-5 overflow-hidden`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-2 h-2 rounded-full bg-accent-blue" />
            <span className="text-[11px] font-medium uppercase tracking-label text-text-secondary">
              AUTONOMY GATE
            </span>
          </div>
          <span className={`text-[9px] px-2 py-0.5 border rounded-sm uppercase tracking-eyebrow ${styles.badge}`}>
            {styles.label}
          </span>
        </div>

        <h3 className="font-extralight text-xl text-white leading-tight mb-1 text-glow-sm">
          {cell.handle}
        </h3>
        <p className="text-[10px] text-text-muted uppercase tracking-telemetry mb-4">
          {cell.role.replace(/_/g, " ")}
        </p>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="glass-panel px-3 py-3 text-center">
            <p className="glow-number text-lg leading-none mb-1 text-white">
              L{cell.autonomyCeiling}
            </p>
            <span className="eyebrow">CEILING</span>
          </div>
          <div className="glass-panel px-3 py-3 text-center">
            <p className={`glow-number text-lg leading-none mb-1 ${confidenceTier === "LOW" ? "text-severity-critical" : "text-white"}`}>
              {effectiveAutonomy === 0 ? "—" : `L${effectiveAutonomy}`}
            </p>
            <span className="eyebrow">EFFECTIVE</span>
          </div>
        </div>

        <div className="border-l border-accent-blue/30 pl-3 mb-4">
          <span className="eyebrow block mb-2">// PERMISSIONS</span>
          <div className="flex flex-wrap gap-1.5">
            {cell.permissions.map((perm) => (
              <span
                key={perm}
                className={`text-[8px] px-1.5 py-0.5 border rounded-sm uppercase tracking-telemetry ${
                  isHalted ? "text-text-data border-border-subtle line-through" : "text-text-muted border-border-subtle"
                }`}
              >
                {perm}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-border-subtle flex items-center justify-between">
          <span className="telemetry">AID: {cell.aid.slice(0, 24)}...</span>
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

export default AutonomyGateCard;
