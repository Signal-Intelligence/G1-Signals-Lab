/**
 * AgentTrustBadge
 * Agent provenance line — trust level and NIST posture.
 */

import React from "react";
import type { SignalsUiEnvelope } from "../../types/signals-ui-envelope";
import { HEADER_META_MUTED, HEADER_META_SEPARATOR, HEADER_META_TEXT, HEADER_META_TEXT_INDENT } from "./headerMetaStyles";

const NIST_LABELS: Record<string, string> = {
  GV: "GOVERN",
  ID: "IDENTIFY",
  PR: "PROTECT",
  DE: "DETECT",
  RS: "RESPOND",
  RC: "RECOVER",
};

const TIER_LABELS: Record<string, string> = {
  HIGH: "HIGH",
  MEDIUM: "MEDIUM",
  LOW: "LOW",
};

export interface AgentTrustBadgeProps {
  envelope: SignalsUiEnvelope;
}

export function AgentTrustBadge({ envelope }: AgentTrustBadgeProps) {
  const { emittingCell, confidence, nistPosture } = envelope;

  const tierColor =
    confidence.tier === "HIGH"
      ? "text-accent-green"
      : confidence.tier === "MEDIUM"
        ? "text-severity-medium"
        : "text-severity-critical";

  const nistCode = nistPosture?.function ?? "";
  const nistLabel = nistCode ? NIST_LABELS[nistCode] ?? nistCode : "";

  return (
    <div className={`flex items-center gap-1.5 ${HEADER_META_TEXT_INDENT}`}>
      <span className={HEADER_META_MUTED}>{emittingCell.handle}</span>
      <span className={HEADER_META_SEPARATOR}>·</span>
      <span className={`${HEADER_META_TEXT} ${tierColor}`}>
        {TIER_LABELS[confidence.tier]}
      </span>
      {nistCode && (
        <>
          <span className={HEADER_META_SEPARATOR}>·</span>
          <span className={HEADER_META_MUTED}>{nistLabel}</span>
        </>
      )}
    </div>
  );
}
