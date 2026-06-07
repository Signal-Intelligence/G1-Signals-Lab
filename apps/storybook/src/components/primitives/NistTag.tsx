import type { NistPosture } from "../../types/hsml";

export interface NistTagProps {
  posture: NistPosture;
}

const FUNCTION_LABELS: Record<string, string> = {
  GV: "GOVERN",
  ID: "IDENTIFY",
  PR: "PROTECT",
  DE: "DETECT",
  RS: "RESPOND",
  RC: "RECOVER",
};

export function NistTag({ posture }: NistTagProps) {
  const statusColor =
    posture.posture === "HYDRATED" || posture.posture === "ENFORCED"
      ? "text-accent-green border-accent-green/20"
      : posture.posture === "DEGRADED"
        ? "text-severity-high border-severity-high/20"
        : "text-text-muted border-border-subtle";

  return (
    <span
      className={`inline-flex items-center gap-1 px-1.5 py-0.5 border rounded-sm text-[8px] font-medium uppercase tracking-eyebrow ${statusColor}`}
    >
      <span>{posture.function}</span>
      <span className="text-text-data">{FUNCTION_LABELS[posture.function]}</span>
    </span>
  );
}
