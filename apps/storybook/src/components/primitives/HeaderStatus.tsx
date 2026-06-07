/**
 * HeaderStatus
 * Single cohesive status block for the card header right side.
 * When no envelope: shows system status with breathing dot.
 * When envelope present: dot for sys, shield icon for agent trust (color = tier).
 */

import React from "react";
import type { SignalsUiEnvelope } from "../../types/signals-ui-envelope";

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

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 10 12"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M5 0L0 2.2v3.6c0 3.08 2.13 5.96 5 6.2 2.87-.24 5-3.12 5-6.2V2.2L5 0z" />
    </svg>
  );
}

export interface HeaderStatusProps {
  envelope?: SignalsUiEnvelope;
  systemStatus?: "online" | "degraded" | "offline";
}

export function HeaderStatus({ envelope, systemStatus = "online" }: HeaderStatusProps) {
  const hasTrust = !!envelope;

  const sysDotColor =
    systemStatus === "online"
      ? "bg-accent-green/60 animate-status-breathe"
      : systemStatus === "degraded"
        ? "bg-severity-medium/60 animate-status-breathe"
        : "bg-severity-critical/60";

  const sysLabel =
    systemStatus === "online"
      ? "SYS: ONLINE // SEC: ACTIVE"
      : systemStatus === "degraded"
        ? "SYS: DEGRADED // SEC: ALERT"
        : "SYS: OFFLINE // SEC: DOWN";

  const shieldColor = hasTrust
    ? envelope.confidence.tier === "HIGH"
      ? "text-accent-green/70"
      : envelope.confidence.tier === "MEDIUM"
        ? "text-severity-medium/70"
        : "text-severity-critical/70"
    : "";

  const tierTextColor = hasTrust
    ? envelope.confidence.tier === "HIGH"
      ? "text-accent-green"
      : envelope.confidence.tier === "MEDIUM"
        ? "text-severity-medium"
        : "text-severity-critical"
    : "";

  const nistCode = envelope?.nistPosture?.function ?? "";
  const nistLabel = nistCode ? NIST_LABELS[nistCode] ?? nistCode : "";

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-1.5">
        <span className={`inline-flex rounded-full h-1.5 w-1.5 flex-shrink-0 ${sysDotColor}`} />
        <span className="text-[9px] font-normal uppercase tracking-telemetry text-text-muted">
          {sysLabel}
        </span>
      </div>
      {hasTrust && (
        <div className="flex items-center gap-1.5">
          <ShieldIcon className={`h-1.5 w-1.5 flex-shrink-0 mt-px ${shieldColor}`} />
          <span className="text-[9px] font-normal uppercase tracking-telemetry text-text-muted mt-[2px]">
            {envelope.emittingCell.handle}
            {nistLabel && (
              <>
                <span className="text-text-data"> · </span>
                {nistLabel}
              </>
            )}
          </span>
        </div>
      )}
    </div>
  );
}
