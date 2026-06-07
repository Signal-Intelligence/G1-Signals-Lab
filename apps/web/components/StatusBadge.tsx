import { cn } from "@/lib/cn";

type Variant = "aligned" | "in-progress" | "planned";

const dotClass: Record<Variant, string> = {
  aligned: "bg-accent-green/60 animate-status-breathe",
  "in-progress": "bg-accent-blue animate-glow-pulse",
  planned: "bg-text-muted",
};

export function StatusBadge({
  label,
  variant,
  wording,
}: {
  label: string;
  variant: Variant;
  wording: string;
}) {
  return (
    <div className="glass-panel rounded-none overflow-hidden px-4 py-3 flex items-center gap-3 border-l-2 border-l-accent-blue hover:bg-accent-blue/[0.03] transition-colors">
      <span
        className={cn("h-2 w-2 shrink-0 rounded-full", dotClass[variant])}
        aria-hidden="true"
      />
      <div className="flex-1">
        <span className="text-[11px] font-medium uppercase tracking-[var(--tracking-label)] text-text-secondary">
          {label}
        </span>
      </div>
      <span className="text-[11px] font-light uppercase tracking-[var(--tracking-telemetry)] text-text-muted">
        {wording}
      </span>
    </div>
  );
}
