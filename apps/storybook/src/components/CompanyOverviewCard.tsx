/**
 * CompanyOverviewCard
 * Origin story for G1 Signals — Guild One heritage, Signal Intelligence, and the convergence.
 */

import React from "react";
import type { SignalsUiEnvelope } from "../types/signals-ui-envelope";
import { HeaderStatus, HsmlStateOverlay } from "./primitives";

export interface OriginPillar {
  icon: string;
  label: string;
  detail: string;
}

export interface CompanyOverviewCardProps {
  headline?: string;
  positioning?: string;
  origins?: OriginPillar[];
  capabilities?: { icon: string; label: string; detail: string }[];
  envelope?: SignalsUiEnvelope;
}

export function CompanyOverviewCard({
  headline = "G1 SIGNALS",
  positioning = "NIST-grounded agentic ecosystems for cyber and defence. Autonomous agents bound to governance pillars — each action cryptographically attested, trust-decayed, and evidenced.",
  origins = [
    {
      icon: "\u25C6",
      label: "GUILD ONE",
      detail: "Founded 2001, Calgary. Pioneers of blockchain governance — Forbes Blockchain 50, first energy royalty on-chain. 25 years building trust infrastructure.",
    },
    {
      icon: "\u25CE",
      label: "SIGNAL INTELLIGENCE",
      detail: "Led by a CISSP and former Big 4 security executive with over a decade in enterprise risk. Built the trusted signals bus powering real-time market intelligence \u2014 now the foundational transport layer for G1 Signals.",
    },
    {
      icon: "\u25C8",
      label: "THE CONVERGENCE",
      detail: "Governance-grade trust infrastructure meets autonomous agent orchestration. A single cryptographic fabric purpose-built for cyber and defence \u2014 where every action is attested, every decision is auditable, and sovereignty is non-negotiable.",
    },
  ],
  capabilities = [
    { icon: "\u25C6", label: "IEEE 2874", detail: "HSTP-1.0 policy-governed transport" },
    { icon: "\u25A3", label: "KERI / vLEI", detail: "Decentralized identity & attestation" },
    { icon: "\u25B2", label: "NIST CSF 2.0", detail: "Six-function governance binding" },
    { icon: "\u25C8", label: "Post-Quantum", detail: "FIPS 203/204 cipher enforcement" },
  ],
  envelope,
}: CompanyOverviewCardProps) {
  return (
    <div className="relative">
      {envelope && <HsmlStateOverlay hsmlState={envelope.hsmlState} />}
      <div className="glass-panel border-l-2 border-l-accent-blue rounded-none p-6 overflow-hidden">
        <div
          className="radial-glow"
          style={{ width: 320, height: 320, top: -90, right: -70, background: "radial-gradient(circle, rgba(0,102,255,0.06) 0%, rgba(0,0,0,0) 70%)" }}
        />

        <div className="flex items-center justify-between mb-6 relative z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-2 h-2 flex-shrink-0 rounded-full bg-accent-blue" />
            <span className="text-[11px] font-medium uppercase tracking-label text-text-secondary">
              COMPANY OVERVIEW
            </span>
          </div>
          <HeaderStatus envelope={envelope} />
        </div>

        {/* Headline */}
        <h2 className="font-extralight text-3xl text-white leading-tight mb-2 text-glow-sm relative z-10">
          {headline}
        </h2>
        <p className="text-[9px] font-normal uppercase tracking-telemetry text-text-muted mb-6 relative z-10">
          SIGNAL INTELLIGENCE INC. // G1 SIGNALS LAB
        </p>

        {/* Origin pillars */}
        <div className="grid grid-cols-3 gap-3 mb-6 relative z-10">
          {origins.map((o) => (
            <div key={o.label} className="glass-panel px-3 py-3">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-accent-blue text-sm">{o.icon}</span>
                <span className="text-[10px] font-medium uppercase tracking-label text-white">{o.label}</span>
              </div>
              <p className="text-[9px] font-normal text-text-muted leading-relaxed">{o.detail}</p>
            </div>
          ))}
        </div>

        {/* Positioning */}
        <p className="text-sm font-light text-text-secondary leading-relaxed mb-6 max-w-2xl relative z-10">
          {positioning}
        </p>

        {/* Four pillars */}
        <div className="grid grid-cols-4 gap-2 relative z-10">
          {capabilities.map((cap) => (
            <div key={cap.label} className="glass-panel px-3 py-2.5 flex items-start gap-2">
              <span className="text-accent-blue text-xs mt-0.5">{cap.icon}</span>
              <div>
                <p className="text-[10px] font-medium uppercase tracking-label text-white mb-0.5">{cap.label}</p>
                <p className="text-[8px] font-normal uppercase tracking-telemetry text-text-muted">{cap.detail}</p>
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
