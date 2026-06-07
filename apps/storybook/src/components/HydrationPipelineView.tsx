/**
 * HydrationPipelineView
 * Stateless 9-layer vertical stepper showing the ingestion pipeline
 * from Alpha State Hydration (L1–L9). All state via props.
 */

import React from "react";
import type { SignalsUiEnvelope } from "../types/signals-ui-envelope";
import { CellBadge, ConfidenceBar, NistTag, HsmlStateOverlay } from "./primitives";

export type LayerStatus = "processing" | "passed" | "blocked" | "pending";

export interface PipelineLayer {
  id: string;
  label: string;
  description: string;
  status: LayerStatus;
  owningCell?: string;
}

export interface HydrationPipelineViewProps {
  layers: PipelineLayer[];
  currentPacketId?: string;
  envelope?: SignalsUiEnvelope;
}

const STATUS_CONFIG: Record<LayerStatus, { dot: string; line: string; text: string }> = {
  passed: { dot: "bg-accent-green", line: "border-accent-green/30", text: "text-accent-green" },
  processing: { dot: "bg-accent-blue animate-glow-pulse", line: "border-accent-blue/30", text: "text-accent-blue" },
  blocked: { dot: "bg-severity-critical", line: "border-severity-critical/30", text: "text-severity-critical" },
  pending: { dot: "bg-text-data", line: "border-border-subtle", text: "text-text-muted" },
};

export function HydrationPipelineView({
  layers,
  currentPacketId,
  envelope,
}: HydrationPipelineViewProps) {
  return (
    <div className="relative">
      {envelope && <HsmlStateOverlay hsmlState={envelope.hsmlState} />}
      <div className="glass-panel rounded-none p-5 overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-2 h-2 rounded-full bg-accent-blue" />
            <span className="text-[11px] font-medium uppercase tracking-label text-text-secondary">
              HYDRATION PIPELINE
            </span>
          </div>
          {currentPacketId && (
            <span className="text-[9px] font-mono text-text-muted tracking-telemetry">
              PKT: {currentPacketId}
            </span>
          )}
        </div>

        <div className="relative pl-4">
          <div className="absolute left-[7px] top-2 bottom-2 w-px border-l border-border-subtle" />

          {layers.map((layer, idx) => {
            const config = STATUS_CONFIG[layer.status];
            return (
              <div key={layer.id} className="relative flex items-start gap-4 pb-4 last:pb-0">
                <div className={`relative z-10 w-3.5 h-3.5 rounded-full border ${config.line} ${config.dot} flex-shrink-0 mt-0.5`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className={`text-[10px] font-medium uppercase tracking-label ${config.text}`}>
                      L{idx + 1}
                    </span>
                    <span className="text-[10px] font-medium text-text-primary truncate">
                      {layer.label}
                    </span>
                    {layer.owningCell && (
                      <span className="text-[8px] font-mono text-text-data uppercase tracking-telemetry">
                        [{layer.owningCell}]
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-text-muted leading-snug">{layer.description}</p>
                </div>
                <span className={`text-[8px] uppercase tracking-eyebrow ${config.text} flex-shrink-0`}>
                  {layer.status}
                </span>
              </div>
            );
          })}
        </div>

        <div className="mt-4 pt-3 border-t border-border-subtle flex items-center justify-between">
          <span className="telemetry">9-LAYER DETERMINISTIC VALIDATION</span>
          <div className="flex items-center gap-2">
            {envelope?.nistPosture && <NistTag posture={envelope.nistPosture} />}
            {envelope?.emittingCell && <CellBadge cell={envelope.emittingCell} />}
          </div>
        </div>
        {envelope && <div className="mt-2"><ConfidenceBar confidence={envelope.confidence} /></div>}
      </div>
    </div>
  );
}

export default HydrationPipelineView;
