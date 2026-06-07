import React from "react";
import type { SignalsUiEnvelope } from "../types/signals-ui-envelope";
import { HeaderStatus, HsmlStateOverlay } from "./primitives";

export interface TeamsAttestationCardProps {
  title?: string;
  subheader?: string;
  legalText?: string;
  metadata?: { label: string; value: string }[];
  ctaLabel?: string;
  onCta?: () => void;
  timestamp?: string;
  envelope?: SignalsUiEnvelope;
}

export function TeamsAttestationCard({
  title = "G1 SIGNALS // ARCHITECTURE BYPASS",
  subheader = "SPATIAL_FENCE_BYPASS_LEVEL_4",
  legalText = "Under Canada Bill C-8 (CCSPA) Section 9(1), Prairie Fuels Inc. as a designated operator of critical cyber systems connected to interprovincial pipeline infrastructure, you are required to authorize this bypass. Incident reporting to CSE/CCCS per Section 15 within 72 hours. This action is cryptographically sealed via your vLEI credential.",
  metadata = [],
  ctaLabel = "RELEASE CRYPTOGRAPHIC KEY VIA IPHONE",
  onCta,
  timestamp = "02:17 AM — June 1, 2026",
  envelope,
}: TeamsAttestationCardProps) {
  return (
    <div className="relative">
      {envelope && <HsmlStateOverlay hsmlState={envelope.hsmlState} />}
    <div className="glass-panel border-l-2 border-l-amber-400 rounded-none p-5 hover:-translate-y-0.5 transition-all duration-300 overflow-hidden">
      <div
        className="radial-glow"
        style={{ width: 280, height: 280, top: -70, right: -50, background: "radial-gradient(circle, rgba(251,191,36,0.08) 0%, rgba(0,0,0,0) 70%)" }}
      />

      {/* Header */}
      <div className="flex items-center justify-between mb-4 relative z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-2 h-2 flex-shrink-0 rounded-full bg-amber-400" />
          <span className="text-[11px] font-medium uppercase tracking-label text-text-secondary">
            ATTESTATION REQUIRED
          </span>
        </div>
        <HeaderStatus envelope={envelope} />
      </div>

      {/* Title */}
      <h3 className="font-extralight text-xl text-white leading-tight mb-2 text-glow-sm relative z-10">
        {title}
      </h3>
      <p className="text-xs font-light text-text-muted uppercase tracking-telemetry mb-4 relative z-10">
        {subheader}
      </p>

      {/* Legal text */}
      <div className="glass-panel p-4 mb-4 relative z-10">
        <p className="text-xs text-text-secondary font-light leading-relaxed">
          {legalText}
        </p>
      </div>

      {/* Metadata strip */}
      {metadata.length > 0 && (
        <div className="border-l border-amber-400/30 pl-3 mb-4 relative z-10">
          <span className="eyebrow block mb-2">// ATTESTATION METADATA</span>
          <div className="space-y-1.5">
            {metadata.map((m) => (
              <div key={m.label} className="flex items-center gap-3">
                <span className="telemetry w-28 flex-shrink-0">{m.label}</span>
                <span className="text-sm text-white font-light truncate">{m.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CTA */}
      {ctaLabel && (
        <div className="mb-4 relative z-10">
          <button onClick={onCta} className="signal-btn-primary w-full">
            {ctaLabel}
          </button>
        </div>
      )}

      {/* Footer */}
      <div className="pt-3 border-t border-border-subtle flex items-center justify-between relative z-10">
        <span className="telemetry">{timestamp}</span>
        <div className="flex items-center gap-2">
        </div>
        <span className="text-[10px] uppercase tracking-telemetry text-text-muted">
          G1 SIGNALS LAB // CONFIDENTIAL
        </span>
      </div>
    </div>
    </div>
  );
}

export default TeamsAttestationCard;
