/**
 * ScenarioEntityCard
 * Introduces demo personas, agent roster, and scenario context with timeline.
 */

import React from "react";
import type { SignalsUiEnvelope } from "../types/signals-ui-envelope";
import { HeaderStatus, HsmlStateOverlay } from "./primitives";

export interface Persona {
  name: string;
  role: string;
  detail: string;
}

export interface AgentEntry {
  handle: string;
  role: string;
  icon: string;
}

export interface TimelineWaypoint {
  time: string;
  label: string;
}

export interface ScenarioEntityCardProps {
  title?: string;
  scenario?: string;
  personas?: Persona[];
  agents?: AgentEntry[];
  timeline?: TimelineWaypoint[];
  showAgentRoster?: boolean;
  envelope?: SignalsUiEnvelope;
}

const ROLE_ICONS: Record<string, string> = {
  SUPERVISOR_CORE: "\u25C6",
  SENSOR_DRONE: "\u25CE",
  COMPLIANCE_ENGINE: "\u25A3",
  ENFORCEMENT_GATE: "\u25B2",
  RECON_SCANNER: "\u25C8",
  SANITIZATION_GHOST: "\u25CB",
  RESPONSE_UNIT: "\u25CA",
};

export function ScenarioEntityCard({
  title = "A DAY IN THE LIFE OF A CISO",
  scenario = "June 1, 2026 — ArcaneDoor exploit chain targets Prairie Fuels' Cisco ASA VPN gateway. Autonomous agents detect, contain, and remediate across IT/OT boundaries while the executive sleeps.",
  personas = [
    { name: "Lewis Cypher", role: "CISO", detail: "Decision authority · Plan approval" },
    { name: "James Graham (1G)", role: "CEO", detail: "Break-glass attestation · vLEI holder" },
  ],
  agents = [
    { handle: "CYPHER ONE", role: "SUPERVISOR_CORE", icon: ROLE_ICONS.SUPERVISOR_CORE },
    { handle: "one-echo", role: "SENSOR_DRONE", icon: ROLE_ICONS.SENSOR_DRONE },
    { handle: "one-intel", role: "COMPLIANCE_ENGINE", icon: ROLE_ICONS.COMPLIANCE_ENGINE },
    { handle: "one-vector", role: "ENFORCEMENT_GATE", icon: ROLE_ICONS.ENFORCEMENT_GATE },
    { handle: "one-shadow", role: "RECON_SCANNER", icon: ROLE_ICONS.RECON_SCANNER },
    { handle: "one-ghost", role: "SANITIZATION_GHOST", icon: ROLE_ICONS.SANITIZATION_GHOST },
    { handle: "one-surge", role: "RESPONSE_UNIT", icon: ROLE_ICONS.RESPONSE_UNIT },
  ],
  timeline = [
    { time: "02:15", label: "CHAIN DETECTED" },
    { time: "02:17", label: "GEOFENCE HALT" },
    { time: "02:20", label: "PLAN APPROVED" },
    { time: "02:25", label: "EXECUTION START" },
    { time: "07:00", label: "MORNING BRIEF" },
    { time: "08:40", label: "QUANTUM GATE" },
  ],
  showAgentRoster = true,
  envelope,
}: ScenarioEntityCardProps) {
  return (
    <div className="relative">
      {envelope && <HsmlStateOverlay hsmlState={envelope.hsmlState} />}
      <div className="glass-panel border-l-2 border-l-accent-blue rounded-none p-6 overflow-hidden">
        <div
          className="radial-glow"
          style={{ width: 260, height: 260, top: -60, right: -40, background: "radial-gradient(circle, rgba(0,102,255,0.05) 0%, rgba(0,0,0,0) 70%)" }}
        />

        <div className="flex items-center justify-between mb-4 relative z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-2 h-2 flex-shrink-0 rounded-full bg-accent-blue" />
            <span className="text-[11px] font-medium uppercase tracking-label text-text-secondary">
              SCENARIO BRIEFING
            </span>
          </div>
          <HeaderStatus envelope={envelope} />
        </div>

        <h3 className="font-extralight text-xl text-white leading-tight mb-2 text-glow-sm relative z-10">
          {title}
        </h3>
        <p className="text-xs font-light text-text-secondary leading-relaxed mb-5 max-w-lg relative z-10">
          {scenario}
        </p>

        {/* Personas */}
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

        {/* Agent Roster (togglable) */}
        {showAgentRoster && (
          <div className="mb-5 relative z-10">
            <p className="text-[9px] font-medium uppercase tracking-eyebrow text-text-muted mb-2">
              AGENT CELL ROSTER
            </p>
            <div className="grid grid-cols-3 gap-2">
              {agents.map((a) => (
                <div key={a.handle} className="glass-panel px-2 py-2 text-center">
                  <span className="text-accent-blue text-sm block mb-1">{a.icon}</span>
                  <p className="text-[9px] font-medium uppercase tracking-label text-white">{a.handle}</p>
                  <p className="text-[8px] font-normal uppercase tracking-telemetry text-text-muted mt-0.5">
                    {a.role.replace("_", " ")}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

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

        <div className="mt-5 pt-3 border-t border-border-subtle relative z-10">
          <span className="text-[9px] font-normal uppercase tracking-telemetry text-text-muted">
            DEMO SCENARIO // JUNE 1, 2026 // 02:15–08:40 EDT
          </span>
        </div>
      </div>
    </div>
  );
}
