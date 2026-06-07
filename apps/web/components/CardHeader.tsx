import { cn } from "@/lib/cn";

export function CardHeader({
  label,
  dotColor = "bg-accent-blue",
  statusText,
  showStatus = false,
}: {
  label: string;
  dotColor?: string;
  statusText?: string;
  showStatus?: boolean;
}) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2.5">
        <div className={cn("w-2 h-2 flex-shrink-0 rounded-full", dotColor)} />
        <span className="text-[11px] font-medium uppercase tracking-[var(--tracking-label)] text-text-secondary">
          {label}
        </span>
      </div>
      {showStatus && (
        <div className="flex items-center gap-1.5">
          <span className="inline-flex rounded-full h-1.5 w-1.5 flex-shrink-0 bg-accent-green/60 animate-status-breathe" />
          <span className="text-[11px] font-light uppercase tracking-[var(--tracking-telemetry)] text-text-muted">
            {statusText ?? "SYS: ONLINE // SEC: ACTIVE"}
          </span>
        </div>
      )}
    </div>
  );
}
