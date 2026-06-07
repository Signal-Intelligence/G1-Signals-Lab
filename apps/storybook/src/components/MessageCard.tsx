import React, { ReactNode } from "react";
import type { SignalsUiEnvelope } from "../types/signals-ui-envelope";
import { HeaderStatus, HsmlStateOverlay } from "./primitives";

export interface MessageSection {
  title: string;
  content: ReactNode;
}

export interface MessageCardProps {
  sender?: string;
  senderRole?: string;
  sections: MessageSection[];
  actionLabel?: string;
  onAction?: () => void;
  timestamp?: string;
  envelope?: SignalsUiEnvelope;
}

export function MessageCard({
  sender = "CYPHER ONE",
  senderRole,
  sections,
  actionLabel,
  onAction,
  timestamp,
  envelope,
}: MessageCardProps) {
  return (
    <div className="relative">
      {envelope && <HsmlStateOverlay hsmlState={envelope.hsmlState} />}
      <div className="glass-panel border-l-2 border-l-accent-blue rounded-none p-5 hover:-translate-y-0.5 transition-all duration-300 overflow-hidden">
        <div
          className="radial-glow"
          style={{ width: 300, height: 300, top: -80, right: -60, background: "radial-gradient(circle, rgba(0,102,255,0.06) 0%, rgba(0,0,0,0) 70%)" }}
        />

        {/* Header */}
        <div className="flex items-center justify-between mb-4 relative z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-2 h-2 flex-shrink-0 rounded-full bg-accent-blue" />
            <span className="text-[11px] font-medium uppercase tracking-label text-text-secondary">
              {sender}
              {senderRole && <span className="text-text-muted font-normal"> — {senderRole}</span>}
            </span>
          </div>
          <HeaderStatus envelope={envelope} />
        </div>

        {/* Sections */}
        <div className="relative z-10">
          {sections.map((section, idx) => (
            <div key={idx} className={idx > 0 ? "mt-4" : ""}>
              <div className="border-l border-accent-blue/30 pl-3">
                <span className="text-[10px] font-medium uppercase tracking-label text-white block mb-2">
                  {section.title.toUpperCase()}
                </span>
                <div className="text-[11px] font-light text-text-secondary leading-relaxed">
                  {typeof section.content === "string" ? (
                    <ul className="space-y-1.5">
                      {section.content.split(". ").filter(Boolean).map((sentence, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="w-1 h-1 rounded-full bg-accent-blue/40 flex-shrink-0 mt-1.5" />
                          <span>{sentence.endsWith(".") ? sentence : `${sentence}.`}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    section.content
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action + footer */}
        <div className="mt-5 pt-3 border-t border-border-subtle flex items-center justify-between relative z-10">
          {actionLabel && onAction ? (
            <button onClick={onAction} className="signal-btn-primary">
              {actionLabel}
            </button>
          ) : (
            <span className="text-[9px] font-normal uppercase tracking-telemetry text-text-muted">
              {timestamp ?? "G1 SIGNALS LAB"}
            </span>
          )}
          <span className="text-[9px] font-normal uppercase tracking-telemetry text-text-muted">
            G1 SIGNALS LAB // CONFIDENTIAL
          </span>
        </div>
      </div>
    </div>
  );
}

export default MessageCard;
