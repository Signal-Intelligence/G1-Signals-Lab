import React, { ReactNode, useState } from "react";
import type { SignalsUiEnvelope } from "../types/signals-ui-envelope";
import { HeaderStatus, HsmlStateOverlay } from "./primitives";

export interface PlanSection {
  title: string;
  content: ReactNode;
  defaultOpen?: boolean;
}

export interface PlanCardProps {
  title: string;
  sections: PlanSection[];
  actionLabel?: string;
  onAction?: () => void;
  envelope?: SignalsUiEnvelope;
}

export function PlanCard({ title, sections, actionLabel, onAction, envelope }: PlanCardProps) {
  const [openSections, setOpenSections] = useState<Record<number, boolean>>(() => {
    const initial: Record<number, boolean> = {};
    sections.forEach((s, i) => {
      initial[i] = s.defaultOpen ?? (i === 0);
    });
    return initial;
  });

  const toggle = (idx: number) => {
    setOpenSections((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <div className="relative">
      {envelope && <HsmlStateOverlay hsmlState={envelope.hsmlState} />}
    <div className="glass-panel border-l-2 border-l-accent-blue rounded-none overflow-hidden">
      <div
        className="radial-glow"
        style={{ width: 300, height: 300, top: -80, left: -60, background: "radial-gradient(circle, rgba(0,102,255,0.10) 0%, rgba(0,0,0,0) 70%)" }}
      />

      <div className="px-5 pt-5 pb-4 relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-2 h-2 flex-shrink-0 rounded-full bg-accent-blue" />
            <span className="text-[11px] font-medium uppercase tracking-label text-text-secondary">
              PLAN
            </span>
          </div>
          <HeaderStatus envelope={envelope} />
        </div>
        <h3 className="font-extralight text-xl text-white text-glow-sm">{title}</h3>
      </div>

      <div className="relative z-10">
        {sections.map((section, idx) => {
          const isOpen = openSections[idx] ?? false;
          return (
            <div key={idx} className="border-t border-border-subtle">
              <button
                onClick={() => toggle(idx)}
                className="w-full px-5 py-3.5 flex items-center justify-between text-left hover:bg-[rgba(0,102,255,0.03)] transition-colors"
              >
                <span className="eyebrow">// {section.title.toUpperCase()}</span>
                <svg
                  className={`w-4 h-4 text-text-muted transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isOpen && (
                <div className="px-5 pb-4 text-sm text-text-secondary font-light leading-relaxed">
                  {section.content}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="px-5 py-4 border-t border-border-subtle flex items-center justify-between relative z-10">
        {actionLabel && onAction ? (
          <button onClick={onAction} className="signal-btn-primary">
            {actionLabel}
          </button>
        ) : <span />}
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

export default PlanCard;
