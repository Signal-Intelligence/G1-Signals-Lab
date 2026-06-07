import React from "react";
import type { SignalsUiEnvelope } from "../types/signals-ui-envelope";
import { HeaderStatus, HsmlStateOverlay } from "./primitives";

export interface ThinkingIndicatorProps {
  steps: string[];
  currentStep: number;
  isComplete: boolean;
  envelope?: SignalsUiEnvelope;
}

export function ThinkingIndicator({
  steps,
  currentStep,
  isComplete,
  envelope,
}: ThinkingIndicatorProps) {
  const progress = isComplete ? 100 : ((currentStep + 0.5) / steps.length) * 100;

  return (
    <div className="relative">
      {envelope && <HsmlStateOverlay hsmlState={envelope.hsmlState} />}
      <div className="glass-panel border-l-2 border-l-accent-blue rounded-none p-5 hover:-translate-y-0.5 transition-all duration-300 overflow-hidden">
        <div
          className="radial-glow"
          style={{ width: 240, height: 240, bottom: -80, right: -60, background: "radial-gradient(circle, rgba(0,102,255,0.08) 0%, rgba(0,0,0,0) 70%)" }}
        />

        <div className="flex items-center justify-between mb-4 relative z-10">
          <div className="flex items-center gap-2.5">
            <div className={`w-2 h-2 flex-shrink-0 rounded-full ${isComplete ? "bg-accent-green" : "bg-accent-blue animate-status-breathe"}`} />
            <span className="text-[11px] font-medium uppercase tracking-label text-text-secondary">
              {isComplete ? "ANALYSIS COMPLETE" : "PROCESSING"}
            </span>
          </div>
          <HeaderStatus envelope={envelope} />
        </div>

        <h3 className="font-extralight text-xl text-white leading-tight mb-1 text-glow-sm relative z-10">
          {isComplete ? "Analysis Complete" : "Building Analysis..."}
        </h3>

        {/* Progress bar */}
        <div className="relative z-10 mb-5">
          <div className="h-px w-full bg-border-subtle mt-3">
            <div
              className="h-px transition-all duration-700 ease-out"
              style={{
                width: `${progress}%`,
                background: isComplete
                  ? "linear-gradient(90deg, rgba(0,255,136,0.6), rgba(0,255,136,0.2))"
                  : "linear-gradient(90deg, rgba(0,102,255,0.8), rgba(0,102,255,0.2))",
              }}
            />
          </div>
          <div className="flex justify-between mt-1.5">
            <span className="text-[8px] font-normal uppercase tracking-telemetry text-text-muted">
              {isComplete ? "ALL STEPS VERIFIED" : `STEP ${currentStep + 1} OF ${steps.length}`}
            </span>
            <span className="text-[8px] font-normal tabular-nums tracking-telemetry text-text-muted">
              {Math.round(progress)}%
            </span>
          </div>
        </div>

        {/* Steps */}
        <div className="relative z-10 space-y-0">
          {steps.map((step, idx) => {
            const isCompleted = isComplete || idx < currentStep;
            const isCurrent = !isComplete && idx === currentStep;
            const isFuture = !isComplete && idx > currentStep;

            return (
              <div key={idx} className="flex items-start gap-3 group">
                {/* Vertical connector */}
                <div className="flex flex-col items-center flex-shrink-0">
                  {/* Node */}
                  <div className="relative">
                    {isCompleted && (
                      <div className="w-[7px] h-[7px] rounded-full bg-accent-green/80 shadow-[0_0_6px_rgba(0,255,136,0.4)]" />
                    )}
                    {isCurrent && (
                      <div className="relative">
                        <div className="w-[7px] h-[7px] rounded-full bg-accent-blue shadow-[0_0_8px_rgba(0,102,255,0.4)]" />
                        <div className="absolute inset-[-3px] rounded-full border border-accent-blue/20 animate-status-breathe" />
                      </div>
                    )}
                    {isFuture && (
                      <div className="w-[7px] h-[7px] rounded-full border border-border-default/60" />
                    )}
                  </div>
                  {/* Line segment */}
                  {idx < steps.length - 1 && (
                    <div
                      className={`w-px flex-1 min-h-[20px] ${
                        isCompleted ? "bg-accent-green/20" : "bg-border-subtle"
                      }`}
                    />
                  )}
                </div>

                {/* Step text */}
                <span
                  className={`text-[11px] leading-relaxed pb-3 ${
                    isCompleted
                      ? "text-text-secondary font-light"
                      : isCurrent
                      ? "text-white font-medium"
                      : "text-text-muted/60 font-light"
                  }`}
                >
                  {step}
                </span>
              </div>
            );
          })}
        </div>

        <div className="mt-4 pt-3 border-t border-border-subtle flex items-center justify-between relative z-10">
          <span className="text-[9px] font-normal uppercase tracking-telemetry text-text-muted">
            {isComplete ? "READY TO PROCEED" : "CYPHER ONE // AUTONOMOUS REASONING"}
          </span>
          <span className="text-[9px] font-normal uppercase tracking-telemetry text-text-muted">
            G1 SIGNALS LAB // CONFIDENTIAL
          </span>
        </div>
      </div>
    </div>
  );
}

export default ThinkingIndicator;
