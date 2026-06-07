import { SITE } from "@/lib/site";

export function CardFooter({
  timestamp,
  label,
}: {
  timestamp?: string;
  label?: string;
}) {
  return (
    <div className="mt-4 pt-3 border-t border-border-subtle flex items-center justify-between">
      {timestamp && (
        <span className="telemetry">{timestamp}</span>
      )}
      <span className="text-[11px] uppercase tracking-[var(--tracking-telemetry)] text-text-muted">
        {label ?? SITE.footerTelemetry}
      </span>
    </div>
  );
}
