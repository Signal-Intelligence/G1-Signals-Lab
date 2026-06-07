import React, { useState, useCallback } from "react";
import type { Priority } from "../types/domain";
import type { SignalsUiEnvelope } from "../types/signals-ui-envelope";
import { HeaderStatus, HsmlStateOverlay } from "./primitives";

export interface PriorityListProps {
  priorities: Priority[];
  envelope?: SignalsUiEnvelope;
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className={`transition-transform duration-300 ${open ? "rotate-90" : "rotate-0"}`}
    >
      <path
        d="M6 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PriorityRow({ priority, rank }: { priority: Priority; rank: number }) {
  const [open, setOpen] = useState(false);
  const toggle = useCallback(() => setOpen((o) => !o), []);

  return (
    <div className="group glass-panel rounded-none transition-all duration-300 overflow-hidden hover:-translate-y-0.5">
      <div className="radial-glow" style={{ width: 100, height: 100, top: -20, left: -20 }} />

      <button
        type="button"
        onClick={toggle}
        className="w-full flex items-center gap-5 px-5 py-4 text-left cursor-pointer relative z-10"
      >
        <span className="shrink-0 glow-number text-3xl text-accent-blue w-10 text-center">
          {rank}
        </span>
        <span className="flex-1 font-light text-white text-sm md:text-base">
          {priority.title}
        </span>
        <span className="text-text-muted group-hover:text-accent-blue transition-colors">
          <ChevronIcon open={open} />
        </span>
      </button>

      {open && (
        <div className="px-5 pb-5 pt-0 ml-[3.75rem] space-y-4 animate-[fadeIn_150ms_ease-out] relative z-10">
          <p className="text-text-secondary text-sm font-light leading-relaxed">
            {priority.description}
          </p>
          <div className="border-l border-accent-blue/30 pl-3">
            <span className="eyebrow block mb-1.5">// RATIONALE</span>
            <p className="text-text-secondary text-sm font-light leading-relaxed">
              {priority.rationale}
            </p>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-1">
            <span className="telemetry">EFFORT: {priority.estimatedEffort}</span>
            <span className="telemetry">OWNER: {priority.owner}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export function PriorityList({ priorities, envelope }: PriorityListProps) {
  return (
    <div className="relative">
      {envelope && <HsmlStateOverlay hsmlState={envelope.hsmlState} />}
    <div className="glass-panel border-l-2 border-l-accent-blue rounded-none p-5 overflow-hidden">
      <div
        className="radial-glow"
        style={{ width: 250, height: 250, top: -60, right: -40, background: "radial-gradient(circle, rgba(0,102,255,0.10) 0%, rgba(0,0,0,0) 70%)" }}
      />

      <div className="flex items-center justify-between mb-4 relative z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-2 h-2 flex-shrink-0 rounded-full bg-accent-blue" />
          <span className="text-[11px] font-medium uppercase tracking-label text-text-secondary">
            PRIORITIES
          </span>
        </div>
        <HeaderStatus envelope={envelope} />
      </div>

      <h3 className="font-extralight text-xl text-white leading-tight mb-5 text-glow-sm relative z-10">
        Quantum Readiness Priorities
      </h3>

      <div className="space-y-2 relative z-10">
        {priorities.map((p, i) => (
          <PriorityRow key={p.id} priority={p} rank={i + 1} />
        ))}
      </div>

      <div className="mt-5 pt-3 border-t border-border-subtle flex items-center justify-between relative z-10">
        <span className="telemetry">one-shadow assessment</span>
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

export default PriorityList;
