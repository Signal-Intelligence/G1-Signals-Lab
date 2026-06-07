import { GlassPanel } from "@/components/GlassPanel";
import { CardHeader } from "@/components/CardHeader";
import { CardFooter } from "@/components/CardFooter";
import type { Phase } from "@/lib/data/narrative";

const AUTONOMY_DOT: Record<string, string> = {
  autonomous: "bg-accent-blue",
  supervised: "bg-severity-medium",
  manual: "bg-text-muted",
};

function TimelineAct({
  phase,
  showConnector = true,
}: {
  phase: Phase;
  showConnector?: boolean;
}) {
  const chips = phase.uiSurface.split("+").map((s) => s.trim());
  const dotColor = AUTONOMY_DOT[phase.autonomyLevel] ?? "bg-accent-blue";

  return (
    <div className="relative pl-8">
      {showConnector && (
        <div
          className="connector-line connector-line-v left-[7px] top-full h-full min-h-[2rem]"
          aria-hidden="true"
        />
      )}
      <div className="connector-dot absolute left-[2px] top-8" aria-hidden="true" />
      <GlassPanel className="p-5" hover>
        <CardHeader label={phase.autonomyLevel} dotColor={dotColor} />
        <div className="flex items-baseline gap-4 mb-2">
          <span className="glow-number text-2xl text-accent-blue">{phase.time}</span>
        </div>
        <p className="text-xs font-light text-text-muted uppercase tracking-[var(--tracking-telemetry)] mb-3">
          {phase.actor}
        </p>
        <div className="callout-accent mb-4">
          <span className="eyebrow block mb-2">{"// ACTION"}</span>
          <p className="text-sm font-light text-text-secondary leading-relaxed">{phase.action}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {chips.map((chip) => (
            <span
              key={chip}
              className="border border-border-default px-2 py-0.5 text-[11px] uppercase tracking-[var(--tracking-telemetry)] text-text-muted"
            >
              {chip}
            </span>
          ))}
        </div>
        <CardFooter timestamp={phase.time} />
      </GlassPanel>
    </div>
  );
}

export function Timeline({ phases }: { phases: Phase[] }) {
  return (
    <div className="space-y-6">
      {phases.map((phase, i) => (
        <TimelineAct
          key={phase.id}
          phase={phase}
          showConnector={i < phases.length - 1}
        />
      ))}
    </div>
  );
}
