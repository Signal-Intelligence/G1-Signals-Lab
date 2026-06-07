/**
 * TrustDecayGauge
 * Stateless circular arc gauge showing trust confidence with decay projection.
 * Receives C0, lambda, t0 as props and computes current tier.
 */

import React from "react";
import type { SignalsUiEnvelope } from "../types/signals-ui-envelope";
import { CellBadge, ConfidenceBar, NistTag, HsmlStateOverlay } from "./primitives";
import { computeTrustDecay, computeConfidenceTier } from "../types/hsml";
import { CONFIDENCE_TIER_CONFIG } from "./primitives/ConfidenceTierConfig";

export interface TrustDecayGaugeProps {
  c0: number;
  lambda: number;
  elapsedSeconds: number;
  cellHandle?: string;
  envelope?: SignalsUiEnvelope;
}

export function TrustDecayGauge({
  c0,
  lambda,
  elapsedSeconds,
  cellHandle,
  envelope,
}: TrustDecayGaugeProps) {
  const currentScore = computeTrustDecay(c0, lambda, elapsedSeconds);
  const tier = computeConfidenceTier(currentScore);
  const tierConfig = CONFIDENCE_TIER_CONFIG[tier];

  const radius = 70;
  const strokeWidth = 4;
  const circumference = 2 * Math.PI * radius;
  const arcLength = circumference * 0.75;
  const filledLength = arcLength * currentScore;
  const rotation = 135;

  const timeToMedium = currentScore >= 0.95
    ? Math.ceil((Math.log(c0 / 0.95) / lambda) - elapsedSeconds)
    : 0;

  return (
    <div className="relative">
      {envelope && <HsmlStateOverlay hsmlState={envelope.hsmlState} />}
      <div className="glass-panel rounded-none p-5 overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-2 h-2 rounded-full bg-accent-blue" />
            <span className="text-[11px] font-medium uppercase tracking-label text-text-secondary">
              TRUST DECAY FUNCTION
            </span>
          </div>
          {cellHandle && (
            <span className="text-[9px] font-mono text-text-muted tracking-telemetry uppercase">
              {cellHandle}
            </span>
          )}
        </div>

        <div className="flex items-center justify-center py-4">
          <div className="relative">
            <svg width="180" height="180" viewBox="0 0 180 180">
              <circle
                cx="90"
                cy="90"
                r={radius}
                fill="none"
                stroke="rgba(255,255,255,0.05)"
                strokeWidth={strokeWidth}
                strokeDasharray={`${arcLength} ${circumference}`}
                strokeLinecap="round"
                transform={`rotate(${rotation} 90 90)`}
              />
              <circle
                cx="90"
                cy="90"
                r={radius}
                fill="none"
                stroke={tierConfig.stroke}
                strokeWidth={strokeWidth}
                strokeDasharray={`${filledLength} ${circumference}`}
                strokeLinecap="round"
                transform={`rotate(${rotation} 90 90)`}
                style={{ filter: `drop-shadow(0 0 6px ${tierConfig.glow})` }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-extralight text-white text-glow-sm tabular-nums">
                {currentScore.toFixed(3)}
              </span>
              <span className="text-[9px] uppercase tracking-eyebrow mt-1" style={{ color: tierConfig.stroke }}>
                {tierConfig.label}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mt-2">
          <div className="glass-panel px-3 py-2 text-center">
            <p className="text-xs font-light text-white tabular-nums">{c0.toFixed(2)}</p>
            <span className="eyebrow">C\u2080</span>
          </div>
          <div className="glass-panel px-3 py-2 text-center">
            <p className="text-xs font-light text-white tabular-nums">{lambda}</p>
            <span className="eyebrow">\u03BB</span>
          </div>
          <div className="glass-panel px-3 py-2 text-center">
            <p className="text-xs font-light text-white tabular-nums">
              {timeToMedium > 0 ? `${timeToMedium}s` : "—"}
            </p>
            <span className="eyebrow">TTD</span>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-border-subtle flex items-center justify-between">
          <span className="telemetry">C(t) = C\u2080 \u00B7 e^(-\u03BB\u00B7\u0394t)</span>
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

export default TrustDecayGauge;
