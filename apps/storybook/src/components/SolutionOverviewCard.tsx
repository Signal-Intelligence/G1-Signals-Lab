/**
 * SolutionOverviewCard
 * Branded intro card for the demo — introduces G1 Signals without revealing deep architecture.
 */

import React from "react";
import type { SignalsUiEnvelope } from "../types/signals-ui-envelope";
import { HeaderStatus, HsmlStateOverlay } from "./primitives";

export interface Capability {
  icon: string;
  label: string;
  detail: string;
}

export interface SolutionOverviewCardProps {
  headline?: string;
  positioning?: string;
  capabilities?: Capability[];
  envelope?: SignalsUiEnvelope;
}

export function SolutionOverviewCard({
  headline = "G1 SIGNALS",
  positioning = "Policy-governed secure state machine at the intelligent edge. Decentralized mesh architecture with zero-latency local isolation and cryptographic provenance.",
  capabilities = [
    { icon: "\u25C6", label: "IEEE 2874", detail: "HSTP-1.0 transport protocol" },
    { icon: "\u25A3", label: "KERI / vLEI", detail: "Decentralized identity & attestation" },
    { icon: "\u25B2", label: "NIST CSF 2.0", detail: "Six-function governance alignment" },
    { icon: "\u25C8", label: "Post-Quantum", detail: "FIPS 203/204 cipher migration" },
  ],
  envelope,
}: SolutionOverviewCardProps) {
  return (
    <div className="relative">
      {envelope && <HsmlStateOverlay hsmlState={envelope.hsmlState} />}
      <div className="glass-panel border-l-2 border-l-accent-blue rounded-none p-6 overflow-hidden">
        <div
          className="radial-glow"
          style={{ width: 300, height: 300, top: -80, right: -60, background: "radial-gradient(circle, rgba(0,102,255,0.06) 0%, rgba(0,0,0,0) 70%)" }}
        />

        <div className="flex items-center justify-between mb-6 relative z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-2 h-2 flex-shrink-0 rounded-full bg-accent-blue" />
            <span className="text-[11px] font-medium uppercase tracking-label text-text-secondary">
              SOLUTION SUMMARY
            </span>
          </div>
          <HeaderStatus envelope={envelope} />
        </div>

        <h2 className="font-extralight text-3xl text-white leading-tight mb-2 text-glow-sm relative z-10">
          {headline}
        </h2>

        <p className="text-sm font-light text-text-secondary leading-relaxed mb-6 max-w-lg relative z-10">
          {positioning}
        </p>

        <div className="grid grid-cols-2 gap-3 relative z-10">
          {capabilities.map((cap) => (
            <div key={cap.label} className="glass-panel px-3 py-3 flex items-start gap-2.5">
              <span className="text-accent-blue text-sm mt-0.5">{cap.icon}</span>
              <div>
                <p className="text-[11px] font-medium uppercase tracking-label text-white mb-0.5">
                  {cap.label}
                </p>
                <p className="text-[9px] font-normal uppercase tracking-telemetry text-text-muted">
                  {cap.detail}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-3 border-t border-border-subtle relative z-10">
          <span className="text-[9px] font-normal uppercase tracking-telemetry text-text-muted">
            G1 SIGNALS LAB // SIGNAL INTELLIGENCE INC. // CONFIDENTIAL
          </span>
        </div>
      </div>
    </div>
  );
}
