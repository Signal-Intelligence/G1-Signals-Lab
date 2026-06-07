import type { ExecutionEvent } from "@/lib/data/dashboard";
import { EVENT_TYPE_COLORS, AGENT_EVENT_TYPES } from "@/lib/data/dashboard-events";

interface EventLogProps {
  events: ExecutionEvent[];
  selectedAgent?: string | null;
}

function formatTime(ts: string): string {
  const d = new Date(ts);
  return d.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}

export function EventLog({ events, selectedAgent }: EventLogProps) {
  const isRelevant = (event: ExecutionEvent): boolean => {
    if (!selectedAgent) return true;
    const types = AGENT_EVENT_TYPES[selectedAgent];
    if (!types) return false;
    return types.includes(event.type);
  };

  return (
    <div className="glass-panel flex min-h-0 flex-1 flex-col">
      <div className="flex items-center justify-between border-b border-border-default px-4 py-2.5">
        <span className="text-[11px] font-medium uppercase tracking-widest text-text-muted">
          Execution Log
        </span>
        <span className="rounded-full bg-white/10 px-2 py-0.5 text-[11px] font-medium tabular-nums text-white/60">
          {events.length}
        </span>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto">
        {events.map((event) => {
          const color = EVENT_TYPE_COLORS[event.type];
          const dimmed = selectedAgent && !isRelevant(event);

          return (
            <div
              key={event.id}
              className={`flex items-start gap-3 border-b border-border-subtle px-4 py-2 transition-opacity ${
                dimmed ? "opacity-25" : "opacity-100"
              }`}
            >
              <span className="shrink-0 pt-0.5 text-xs font-mono text-white/50">
                {formatTime(event.timestamp)}
              </span>

              <span
                className="shrink-0 rounded px-1.5 py-0.5 text-[11px] font-medium uppercase"
                style={{
                  backgroundColor: `${color}20`,
                  color,
                  border: `1px solid ${color}40`,
                }}
              >
                {event.type.replace("_", " ")}
              </span>

              <span className="min-w-0 flex-1 text-sm text-white/80">
                {event.message}
              </span>

              <span className="shrink-0 text-[11px] text-text-muted">
                {event.system}
              </span>
            </div>
          );
        })}

        {events.length === 0 && (
          <div className="px-4 py-8 text-center text-sm text-white/30">
            No events recorded
          </div>
        )}
      </div>
    </div>
  );
}
