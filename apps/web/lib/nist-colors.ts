import type { NistFunction } from "@/lib/data/dashboard";

export type { NistFunction };

export const NIST_FUNCTION_LABELS: Record<NistFunction, string> = {
  GV: "Govern",
  ID: "Identify",
  PR: "Protect",
  DE: "Detect",
  RS: "Respond",
  RC: "Recover",
};

export const NIST_FUNCTION_COLORS: Record<NistFunction, string> = {
  GV: "var(--color-accent-blue)",
  ID: "var(--color-nist-identify)",
  PR: "var(--color-accent-green)",
  DE: "var(--color-severity-high)",
  RS: "var(--color-severity-critical)",
  RC: "var(--color-severity-medium)",
};
