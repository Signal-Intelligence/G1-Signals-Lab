"use client";

import { useEffect, useRef, useState } from "react";
import { NIST_COLORS, NIST_CELL_MAPPINGS } from "@/lib/data/dashboard";
import type { CellIdentity } from "@/lib/data/dashboard";

interface AgentSelectorProps {
  agents: CellIdentity[];
  selectedAgent: string | null;
  onSelect: (handle: string | null) => void;
}

function getAgentColor(handle: string): string {
  const mapping = NIST_CELL_MAPPINGS.find(
    (m) => m.agentHandle.toLowerCase() === handle.toLowerCase(),
  );
  if (!mapping) return 'var(--color-text-muted)';
  return NIST_COLORS[mapping.nistFunction] ?? 'var(--color-text-muted)';
}

function getAgentRole(handle: string): string {
  const mapping = NIST_CELL_MAPPINGS.find(
    (m) => m.agentHandle.toLowerCase() === handle.toLowerCase(),
  );
  return mapping?.functionLabel ?? "";
}

export function AgentSelector({
  agents,
  selectedAgent,
  onSelect,
}: AgentSelectorProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      // MouseEvent target is always a Node in DOM
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const pillarAgents = agents.filter((a) => a.handle !== "CYPHER ONE");
  const selected = pillarAgents.find((a) => a.handle === selectedAgent);

  return (
    <div ref={ref} className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls="agent-dropdown"
        className="focus-ring glass-panel flex items-center gap-2 px-3 py-2 transition-colors hover:bg-white/[0.04]"
      >
        {selected ? (
          <>
            <span
              className="h-2 w-2 shrink-0 rounded-full"
              style={{ backgroundColor: getAgentColor(selected.handle) }}
            />
            <span className="text-sm font-medium text-white">
              {selected.handle}
            </span>
          </>
        ) : (
          <span className="text-sm text-text-muted">ALL AGENTS</span>
        )}
        <svg
          viewBox="0 0 12 12"
          className={`ml-1 h-3 w-3 text-white/40 transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        >
          <path
            d="M3 5l3 3 3-3"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <div id="agent-dropdown" className="glass-panel absolute left-0 z-50 mt-1 flex min-w-[220px] flex-col overflow-hidden border border-border-default py-1 backdrop-blur-xl bg-bg-primary/90">
          <button
            type="button"
            onClick={() => {
              onSelect(null);
              setOpen(false);
            }}
            className={`focus-ring flex items-center gap-2 px-3 py-2 text-left transition-colors hover:bg-white/[0.03] ${
              !selectedAgent ? "bg-white/[0.04]" : ""
            }`}
          >
            <span className="h-2 w-2 rounded-full bg-white/30" />
            <span className="text-sm font-medium text-white/70">
              ALL AGENTS
            </span>
          </button>

          {pillarAgents.map((agent) => {
            const color = getAgentColor(agent.handle);
            const role = getAgentRole(agent.handle);
            const isActive = selectedAgent === agent.handle;

            return (
              <button
                key={agent.handle}
                type="button"
                onClick={() => {
                  onSelect(agent.handle);
                  setOpen(false);
                }}
                className={`focus-ring flex items-center gap-2 px-3 py-2 text-left transition-colors hover:bg-white/[0.03] ${
                  isActive ? "bg-white/[0.04]" : ""
                }`}
              >
                <span
                  className="h-2 w-2 shrink-0 rounded-full"
                  style={{ backgroundColor: color }}
                />
                <span className="text-sm text-white/90">{agent.handle}</span>
                <span className="text-[11px] text-text-muted">{role}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
