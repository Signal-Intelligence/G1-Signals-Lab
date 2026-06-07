import React from "react";
import type { SignalsUiEnvelope } from "../types/signals-ui-envelope";
import { HeaderStatus, HsmlStateOverlay } from "./primitives";

type ApprovalStatus = "approved" | "pending" | "rejected";

export interface ApprovalCardProps {
  approver: string;
  timestamp: string;
  provenanceHash: string;
  scope: string;
  status: ApprovalStatus;
  envelope?: SignalsUiEnvelope;
}

const STATUS_CONFIG: Record<
  ApprovalStatus,
  { border: string; dot: string; label: string; glowColor: string }
> = {
  approved: {
    border: "border-l-accent-blue",
    dot: "bg-accent-blue",
    label: "APPROVED",
    glowColor: "rgba(0,102,255,0.12)",
  },
  pending: {
    border: "border-l-amber-400",
    dot: "bg-amber-400",
    label: "PENDING",
    glowColor: "rgba(251,191,36,0.10)",
  },
  rejected: {
    border: "border-l-accent-danger",
    dot: "bg-accent-danger",
    label: "REJECTED",
    glowColor: "rgba(239,68,68,0.10)",
  },
};

export function ApprovalCard({
  approver,
  timestamp,
  provenanceHash,
  scope,
  status,
  envelope,
}: ApprovalCardProps) {
  const config = STATUS_CONFIG[status];
  const truncatedHash =
    provenanceHash.length > 24
      ? `${provenanceHash.slice(0, 12)}...${provenanceHash.slice(-8)}`
      : provenanceHash;

  return (
    <div className="relative">
      {envelope && <HsmlStateOverlay hsmlState={envelope.hsmlState} />}
    <div
      className={`glass-panel ${config.border} border-l-2 rounded-none p-5 hover:-translate-y-0.5 transition-all duration-300 overflow-hidden`}
    >
      <div
        className="radial-glow"
        style={{
          width: 250, height: 250, top: -60, right: -40,
          background: `radial-gradient(circle, ${config.glowColor} 0%, rgba(0,0,0,0) 70%)`,
        }}
      />

      <div className="flex items-center justify-between mb-4 relative z-10">
        <div className="flex items-center gap-2.5">
          <div className={`w-2 h-2 flex-shrink-0 rounded-full ${config.dot}`} />
          <span className="text-[11px] font-medium uppercase tracking-label text-text-secondary">
            {config.label}
          </span>
        </div>
        <HeaderStatus envelope={envelope} />
      </div>

      <h3 className="font-extralight text-xl text-white leading-tight mb-2 text-glow-sm relative z-10">
        {approver}
      </h3>

      <p className="text-xs font-light text-text-muted uppercase tracking-telemetry mb-4 relative z-10">
        AUTHORIZATION RECORD
      </p>

      <div className="relative z-10 space-y-3">
        <div className="border-l border-accent-blue/30 pl-3">
          <span className="eyebrow block mb-1">// SCOPE</span>
          <p className="text-sm font-light text-text-secondary leading-relaxed">{scope}</p>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-border-subtle flex items-center justify-between relative z-10">
        <span className="telemetry">{timestamp}</span>
        <div className="flex items-center gap-2">
        </div>
        <span className="telemetry" title={provenanceHash}>{truncatedHash}</span>
      </div>
      <div className="mt-2 flex justify-end relative z-10">
        <span className="text-[10px] uppercase tracking-telemetry text-text-muted">
          G1 SIGNALS LAB // CONFIDENTIAL
        </span>
      </div>
    </div>
    </div>
  );
}

export default ApprovalCard;
