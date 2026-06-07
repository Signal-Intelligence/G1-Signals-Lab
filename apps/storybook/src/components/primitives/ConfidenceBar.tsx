import type { TrustConfidence } from "../../types/hsml";

export interface ConfidenceBarProps {
  confidence: TrustConfidence;
}

export function ConfidenceBar({ confidence }: ConfidenceBarProps) {
  const tierColor =
    confidence.tier === "HIGH"
      ? "bg-accent-green"
      : confidence.tier === "MEDIUM"
        ? "bg-severity-medium"
        : "bg-severity-critical";

  const tierBorder =
    confidence.tier === "HIGH"
      ? "border-accent-green/30"
      : confidence.tier === "MEDIUM"
        ? "border-severity-medium/30"
        : "border-severity-critical/30";

  return (
    <div className="flex items-center gap-2">
      <div className={`h-1 flex-1 rounded-sm bg-bg-secondary border ${tierBorder} overflow-hidden`}>
        <div
          className={`h-full ${tierColor} transition-all duration-700`}
          style={{ width: `${confidence.score * 100}%` }}
        />
      </div>
      <span className="text-[9px] font-medium tracking-telemetry text-text-muted tabular-nums">
        {confidence.score.toFixed(2)}
      </span>
    </div>
  );
}
