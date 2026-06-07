/**
 * AgentHubSpoke
 * SVG hub-and-spoke visualization of CYPHER ONE orchestrator and NIST-bound agents.
 * Includes hover tooltips for agent detail. Stateless — hydrated via props.
 */

import React, { useState, useCallback } from "react";
import type { SignalsUiEnvelope } from "../types/signals-ui-envelope";
import type { NistCellMapping } from "./NistPostureMatrix";

export interface AgentTooltipData {
  pillar: string;
  systems: string;
}

export interface AgentHubSpokeProps {
  mappings: NistCellMapping[];
  tooltips?: Record<string, AgentTooltipData>;
  centerLabel?: string;
  envelope?: SignalsUiEnvelope;
}

const NIST_COLORS: Record<string, string> = {
  GV: "#0066ff",
  ID: "#7c3aed",
  PR: "#00ff88",
  DE: "#b8784a",
  RS: "#c4506a",
  RC: "#9a8a42",
};

const DEFAULT_TOOLTIPS: Record<string, AgentTooltipData> = {
  "one-intel": { pillar: "GOVERN \u2014 Policy interpretation, regulatory crosswalks, Bill C-8 compliance assertions", systems: "OSCAL feeds, XDBML policy documents, regulatory databases, compliance ledger" },
  "one-shadow": { pillar: "IDENTIFY \u2014 Asset discovery, CBOM compilation, vulnerability triage", systems: "Claroty xDome, FactoryTalk firmware, CycloneDX SBOM/CBOM, CVE feeds" },
  "one-vector": { pillar: "PROTECT \u2014 Enforcement gates, quantum interlocks, containment actions", systems: "Palo Alto PA-850, Cisco ASA, OpenC2 actuators, WebAuthn/FIDO2 endpoints" },
  "one-echo": { pillar: "DETECT \u2014 Network monitoring, STIX correlation, anomaly detection", systems: "Splunk SIEM, Claroty xDome alerts, network tap mirrors, TAXII feeds" },
  "one-surge": { pillar: "RESPOND \u2014 Playbook execution, incident containment, remediation", systems: "Honeywell Experion DCS, ControlLogix PLCs, SAGE 3030 RTUs, patch orchestrators" },
  "one-ghost": { pillar: "RECOVER \u2014 Evidence sealing, workspace sanitization, post-incident cleanup", systems: "Microledger archives, backup validators, log sealers, KEL integrity monitors" },
};

export function AgentHubSpoke({
  mappings,
  tooltips,
  centerLabel = "CYPHER ONE",
}: AgentHubSpokeProps) {
  const [hoveredAgent, setHoveredAgent] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);

  const handleHover = useCallback((handle: string, x: number, y: number) => {
    setHoveredAgent(handle);
    setTooltipPos({ x, y });
  }, []);

  const handleLeave = useCallback(() => {
    setHoveredAgent(null);
    setTooltipPos(null);
  }, []);

  const resolvedTooltips = tooltips ?? DEFAULT_TOOLTIPS;

  const cx = 100;
  const cy = 90;
  const radius = 62;

  const spokes = mappings.map((m, i) => {
    const angle = (i * 60 - 90) * (Math.PI / 180);
    const x = cx + radius * Math.cos(angle);
    const y = cy + radius * Math.sin(angle);
    const color = NIST_COLORS[m.function] ?? "#0066ff";
    return { ...m, x, y, color };
  });

  return (
    <div className="relative">
      <svg viewBox="0 0 200 180" className="w-full" role="img" aria-label={`${centerLabel} hub-and-spoke orchestration`}>
        <style>{`@keyframes dash-flow { to { stroke-dashoffset: -12; } } .spoke-line { animation: dash-flow 1.5s linear infinite; }`}</style>
        {spokes.map((s) => (
          <line key={`line-${s.function}`} x1={cx} y1={cy} x2={s.x} y2={s.y} stroke={s.color} strokeWidth={hoveredAgent === s.cellHandle ? "2" : "1"} strokeOpacity={hoveredAgent === s.cellHandle ? "0.7" : "0.3"} strokeDasharray="4 4" className="spoke-line" />
        ))}
        <g transform={`translate(${cx},${cy})`}>
          <rect x="-9" y="-9" width="18" height="18" rx="2" transform="rotate(45)" fill="rgba(0,102,255,0.12)" stroke="#0066ff" strokeWidth="1.5" />
          <text textAnchor="middle" y="26" fill="rgba(255,255,255,0.7)" fontSize="6.5" fontFamily="inherit" letterSpacing="0.1em">{centerLabel}</text>
        </g>
        {spokes.map((s) => {
          const isHovered = hoveredAgent === s.cellHandle;
          return (
            <g
              key={`node-${s.function}`}
              transform={`translate(${s.x},${s.y})`}
              onMouseEnter={(e) => {
                const svg = e.currentTarget.closest("svg");
                if (!svg) return;
                const rect = svg.getBoundingClientRect();
                const px = rect.left + (s.x / 200) * rect.width;
                const py = rect.top + (s.y / 180) * rect.height;
                handleHover(s.cellHandle, px, py);
              }}
              onMouseLeave={handleLeave}
              className="cursor-pointer"
            >
              <circle r={isHovered ? "7" : "5"} fill={`${s.color}${isHovered ? "30" : "18"}`} stroke={s.color} strokeWidth={isHovered ? "1.5" : "1"} className="transition-all duration-200" />
              <circle r="1.5" fill={s.color} opacity="0.8" />
              <text textAnchor="middle" y="-10" fill={s.color} fontSize="7" fontWeight="500" fontFamily="inherit" letterSpacing="0.08em">{s.function}</text>
              <text textAnchor="middle" y="14" fill={isHovered ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.5)"} fontSize="5.5" fontFamily="inherit" letterSpacing="0.06em" className="transition-all duration-200">{s.cellHandle}</text>
            </g>
          );
        })}
      </svg>

      {hoveredAgent && tooltipPos && resolvedTooltips[hoveredAgent] && (
        <div
          className="fixed z-50 glass-panel px-3 py-2.5 max-w-[220px] border border-accent-blue/30 pointer-events-none animate-[fadeIn_100ms_ease-out]"
          style={{ left: tooltipPos.x + 12, top: tooltipPos.y - 10, background: "rgba(8,10,18,0.95)", backdropFilter: "blur(12px)" }}
        >
          <p className="text-[9px] font-medium text-white mb-1">{resolvedTooltips[hoveredAgent].pillar}</p>
          <p className="text-[8px] font-normal text-text-muted leading-relaxed">{resolvedTooltips[hoveredAgent].systems}</p>
        </div>
      )}
    </div>
  );
}

export default AgentHubSpoke;
