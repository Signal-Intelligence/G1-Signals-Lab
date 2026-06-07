/**
 * Shared Confidence Tier Configuration
 * Used by TrustDecayGauge and AutonomyGateCard to style HIGH/MEDIUM/LOW tiers consistently.
 */

import type { ConfidenceTier } from "../../types/hsml";

export interface TierStyle {
  stroke: string;
  glow: string;
  label: string;
  border: string;
  text: string;
}

export const CONFIDENCE_TIER_CONFIG: Record<ConfidenceTier, TierStyle> = {
  HIGH: {
    stroke: "#00ff88",
    glow: "rgba(0,255,136,0.2)",
    label: "HIGH CONFIDENCE",
    border: "border-l-accent-green",
    text: "text-accent-green",
  },
  MEDIUM: {
    stroke: "#9a8a42",
    glow: "rgba(154,138,66,0.2)",
    label: "MEDIUM CONFIDENCE",
    border: "border-l-severity-medium",
    text: "text-severity-medium",
  },
  LOW: {
    stroke: "#c4506a",
    glow: "rgba(196,80,106,0.2)",
    label: "LOW — HALTED",
    border: "border-l-severity-critical",
    text: "text-severity-critical",
  },
};
