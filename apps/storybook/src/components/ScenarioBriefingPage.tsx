/**
 * ScenarioBriefingPage
 * Unified single-card page: scenario context + rationale + personnel + timeline.
 */

import React from "react";
import type { SignalsUiEnvelope } from "../types/signals-ui-envelope";
import { HeaderStatus, HsmlStateOverlay } from "./primitives";

export interface Persona {
  name: string;
  role: string;
  detail: string;
}

export interface TimelineWaypoint {
  time: string;
  label: string;
}

export interface RationaleItem {
  icon: string;
  label: string;
  detail: string;
}

export interface ScenarioBriefingPageProps {
  title?: string;
  scenario?: string;
  personas?: Persona[];
  timeline?: TimelineWaypoint[];
  rationale?: RationaleItem[];
  envelope?: SignalsUiEnvelope;
}

export function ScenarioBriefingPage({
  title = "A DAY IN THE LIFE OF A CISO",
  scenario = "June 1, 2026 \u2014 ArcaneDoor exploit chain targets Prairie Fuels' Cisco ASA VPN gateway. Autonomous agents detect, contain, and remediate across IT/OT boundaries while the executive sleeps.",
  personas = [
    { name: "Lewis Cypher", role: "CISO", detail: "Decision authority \u00B7 Plan approval" },
    { name: "James Graham (1G)", role: "CEO", detail: "Break-glass attestation \u00B7 vLEI holder" },
  ],
  timeline = [
    { time: "02:15", label: "CHAIN DETECTED" },
    { time: "02:17", label: "GEOFENCE HALT" },
    { time: "02:20", label: "PLAN APPROVED" },
    { time: "02:25", label: "EXECUTION START" },
    { time: "07:00", label: "MORNING BRIEF" },
    { time: "08:40", label: "QUANTUM GATE" },
  ],
  rationale = [
    { icon: "\u25C6", label: "REAL-WORLD CVEs", detail: "Based on the ArcaneDoor campaign (UAT4356) \u2014 active exploitation of Cisco ASA VPN gateways targeting critical infrastructure, disclosed 2024." },
    { icon: "\u25A3", label: "BILL C-8 OBLIGATION", detail: "Prairie Fuels operates pipeline-connected refining infrastructure designated under Canada's CCSPA. Mandatory incident reporting to CCCS within 72 hours." },
    { icon: "\u25B2", label: "IT/OT CONVERGENCE", detail: "The exploit chain crosses the IT/OT DMZ boundary \u2014 from Cisco ASA perimeter into Honeywell DCS, ControlLogix PLCs, and SAGE 3030 RTUs." },
    { icon: "\u25C8", label: "POST-QUANTUM EXPOSURE", detail: "CBOM scan reveals legacy RSA-2048 and 3DES across OT control systems \u2014 a second-order finding that triggers the quantum readiness use case." },
  ],
  envelope,
}: ScenarioBriefingPageProps) {
  return (
    <div className="relative">
      {envelope && <HsmlStateOverlay hsmlState={envelope.hsmlState} />}
      <div className="glass-panel border-l-2 border-l-accent-blue rounded-none p-6 overflow-hidden">
        <div
          className="radial-glow"
          style={{ width: 300, height: 300, top: -80, right: -60, background: "radial-gradient(circle, rgba(0,102,255,0.05) 0%, rgba(0,0,0,0) 70%)" }}
        />

        {/* Header */}
        <div className="flex items-center justify-between mb-4 relative z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-2 h-2 flex-shrink-0 rounded-full bg-accent-blue" />
            <span className="text-[11px] font-medium uppercase tracking-label text-text-secondary">
              SCENARIO BRIEFING
            </span>
          </div>
          <HeaderStatus envelope={envelope} />
        </div>

        {/* Title + description */}
        <h3 className="font-extralight text-xl text-white leading-tight mb-2 text-glow-sm relative z-10">
          {title}
        </h3>
        <p className="text-xs font-light text-text-secondary leading-relaxed mb-5 max-w-lg relative z-10">
          {scenario}
        </p>

        {/* Key Personnel */}
        <div className="mb-5 relative z-10">
          <p className="text-[9px] font-medium uppercase tracking-eyebrow text-text-muted mb-2">
            KEY PERSONNEL
          </p>
          <div className="grid grid-cols-2 gap-2">
            {personas.map((p) => (
              <div key={p.name} className="glass-panel px-3 py-2">
                <p className="text-[11px] font-medium text-white">{p.name}</p>
                <p className="text-[9px] font-normal uppercase tracking-telemetry text-accent-blue">{p.role}</p>
                <p className="text-[9px] font-normal text-text-muted mt-0.5">{p.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="mb-5 border-t border-border-subtle relative z-10" />

        {/* Why This Scenario */}
        <div className="mb-5 relative z-10">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-2 h-2 flex-shrink-0 rounded-full bg-accent-blue/60" />
            <span className="text-[11px] font-medium uppercase tracking-label text-text-secondary">
              WHY THIS SCENARIO
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {rationale.map((r) => (
              <div key={r.label} className="glass-panel px-3 py-2.5">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-accent-blue text-xs">{r.icon}</span>
                  <span className="text-[9px] font-medium uppercase tracking-label text-white">{r.label}</span>
                </div>
                <p className="text-[9px] font-normal text-text-muted leading-relaxed">{r.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="mb-5 border-t border-border-subtle relative z-10" />

        {/* Timeline Arc */}
        <div className="relative z-10">
          <p className="text-[9px] font-medium uppercase tracking-eyebrow text-text-muted mb-2">
            SCENARIO TIMELINE
          </p>
          <div className="flex items-center gap-1">
            {timeline.map((wp, i) => (
              <React.Fragment key={wp.time}>
                <div className="flex flex-col items-center flex-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent-blue/60 mb-1" />
                  <span className="text-[9px] font-medium tabular-nums text-white">{wp.time}</span>
                  <span className="text-[7px] font-normal uppercase tracking-telemetry text-text-muted text-center mt-0.5 leading-tight">
                    {wp.label}
                  </span>
                </div>
                {i < timeline.length - 1 && (
                  <div className="flex-1 h-px bg-border-default max-w-6 mt-[-12px]" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-5 pt-3 border-t border-border-subtle relative z-10">
          <span className="text-[9px] font-normal uppercase tracking-telemetry text-text-muted">
            DEMO SCENARIO // JUNE 1, 2026 // 02:15–08:40 EDT
          </span>
        </div>
      </div>
    </div>
  );
}
