"use client";

import { cn } from "@/lib/cn";

export function FilterChip({
  label,
  active,
  onClick,
  color,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  color?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "focus-ring border px-3 py-1.5 text-[11px] uppercase tracking-[var(--tracking-telemetry)] transition-colors",
        active
          ? "border-accent-blue bg-accent-blue/10 text-accent-blue"
          : "border-border-default text-text-secondary hover:border-accent-blue/50"
      )}
      style={active && color ? { borderColor: color, color } : undefined}
      aria-pressed={active}
    >
      {label}
    </button>
  );
}
