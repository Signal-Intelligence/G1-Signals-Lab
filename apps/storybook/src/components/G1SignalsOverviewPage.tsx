/**
 * G1SignalsOverviewPage
 * Unified single-card page: origin story + architecture & technology.
 */

import React from "react";
import type { SignalsUiEnvelope } from "../types/signals-ui-envelope";
import { HeaderStatus, HsmlStateOverlay } from "./primitives";

export interface OriginPillar {
  icon: string;
  label: string;
  detail: string;
}

export interface TechLayer {
  id: string;
  label: string;
  sublabel: string;
  icon: string;
}

export interface G1SignalsOverviewPageProps {
  headline?: string;
  origins?: OriginPillar[];
  layers?: TechLayer[];
  envelope?: SignalsUiEnvelope;
}

export function G1SignalsOverviewPage({
  headline = "G1 SIGNALS",
  origins = [
    {
      icon: "\u25C6",
      label: "GUILD ONE",
      detail: "Founded 2001, Calgary. Pioneers of blockchain governance \u2014 Forbes Blockchain 50, first energy royalty on-chain. 25 years building trust infrastructure.",
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
  layers = [
    { id: "agents", label: "AGENT MESH", sublabel: "Autonomous agents \u00B7 KERI-bound identity \u00B7 Exponential trust decay", icon: "\u25C6" },
    { id: "trust", label: "TRUST LAYER", sublabel: "IEEE 2874 \u00B7 HSTP-1.0 wire protocol \u00B7 Microledger provenance \u00B7 9-layer hydration", icon: "\u25A3" },
    { id: "governance", label: "GOVERNANCE FABRIC", sublabel: "NIST CSF 2.0 \u00B7 Bill C-8 (CCSPA) \u00B7 IEC 62443 \u00B7 PQC FIPS 203/204", icon: "\u25B2" },
    { id: "edge", label: "ENTERPRISE EDGE", sublabel: "Spatial isolation \u00B7 Hardware enclaves \u00B7 OT/SCADA integration", icon: "\u25C8" },
  ],
  envelope,
}: G1SignalsOverviewPageProps) {
  return (
    <div className="relative">
      {envelope && <HsmlStateOverlay hsmlState={envelope.hsmlState} />}
      <div className="glass-panel border-l-2 border-l-accent-blue rounded-none p-6 overflow-hidden">
        <div
          className="radial-glow"
          style={{ width: 400, height: 400, top: -120, right: -100, background: "radial-gradient(circle, rgba(0,102,255,0.06) 0%, rgba(0,0,0,0) 70%)" }}
        />

        {/* Header */}
        <div className="flex items-center justify-between mb-4 relative z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-2 h-2 flex-shrink-0 rounded-full bg-accent-blue" />
            <span className="text-[11px] font-medium uppercase tracking-label text-text-secondary">
              COMPANY OVERVIEW
            </span>
          </div>
          <HeaderStatus envelope={envelope} />
        </div>

        {/* Headline */}
        <h2 className="font-extralight text-3xl text-white leading-tight mb-1.5 text-glow-sm relative z-10">
          {headline}
        </h2>
        <p className="text-[9px] font-normal uppercase tracking-telemetry text-text-muted mb-4 relative z-10">
          SIGNAL INTELLIGENCE INC. // G1 SIGNALS LAB
        </p>

        {/* Positioning blurb */}
        <p className="text-xs font-extralight text-text-secondary leading-relaxed mb-6 max-w-2xl relative z-10">
          We build autonomous agent ecosystems for cyber and defence — each grounded in NIST, cryptographically bound to its governance pillar, and governed by exponential trust decay. Every action is attested, every decision is auditable, and every deployment is sovereign.
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

        {/* ── Divider ── */}
        <div className="mb-5 border-t border-border-subtle relative z-10" />

        {/* Architecture & Technology */}
        <div className="flex items-center gap-2.5 mb-4 relative z-10">
          <div className="w-2 h-2 flex-shrink-0 rounded-full bg-accent-blue/60" />
          <span className="text-[11px] font-medium uppercase tracking-label text-text-secondary">
            ARCHITECTURE & TECHNOLOGY
          </span>
        </div>

        <div className="flex flex-col gap-0 relative z-10">
          {layers.map((layer, i) => (
            <React.Fragment key={layer.id}>
              <div className="glass-panel px-4 py-3.5 flex items-center gap-4">
                <div className="w-8 h-8 flex items-center justify-center border border-border-default rounded-sm">
                  <span className="text-accent-blue text-base">{layer.icon}</span>
                </div>
                <div className="flex-1">
                  <p className="text-[11px] font-medium uppercase tracking-label text-white">
                    {layer.label}
                  </p>
                  <p className="text-[9px] font-normal uppercase tracking-telemetry text-text-muted mt-0.5">
                    {layer.sublabel}
                  </p>
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-accent-green/60 animate-status-breathe" />
              </div>
              {i < layers.length - 1 && (
                <div className="flex justify-center py-0.5">
                  <div className="w-px h-3 bg-border-default" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-5 pt-3 border-t border-border-subtle relative z-10">
          <span className="text-[9px] font-normal uppercase tracking-telemetry text-text-muted">
            G1 SIGNALS LAB // SIGNAL INTELLIGENCE INC. // CONFIDENTIAL
          </span>
        </div>
      </div>
    </div>
  );
}
