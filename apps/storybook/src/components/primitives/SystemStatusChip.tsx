/**
 * SystemStatusChip
 * Inline system/security status for the card header row.
 */

import React from "react";
import { HEADER_META_MUTED } from "./headerMetaStyles";

export interface SystemStatusChipProps {
  status?: "online" | "degraded" | "offline";
}

export function SystemStatusChip({ status = "online" }: SystemStatusChipProps) {
  const config =
    status === "online"
      ? { dot: "bg-accent-green/60 animate-status-breathe", label: "SYS: ONLINE // SEC: ACTIVE" }
      : status === "degraded"
        ? { dot: "bg-severity-medium/60 animate-status-breathe", label: "SYS: DEGRADED // SEC: ALERT" }
        : { dot: "bg-severity-critical/60", label: "SYS: OFFLINE // SEC: DOWN" };

  return (
    <div className="flex items-center gap-1.5">
      <span className={`inline-flex rounded-full h-1.5 w-1.5 flex-shrink-0 ${config.dot}`} />
      <span className={HEADER_META_MUTED}>{config.label}</span>
    </div>
  );
}
