import { NIST_COLORS } from "@/lib/data/dashboard";
import type { NistCellMapping } from "@/lib/data/dashboard";

interface NistPostureMatrixProps {
  mappings: NistCellMapping[];
  selectedAgent?: string | null;
}

export function NistPostureMatrix({
  mappings,
  selectedAgent,
}: NistPostureMatrixProps) {
  return (
    <div className="flex flex-col gap-1 overflow-x-auto">
      <div className="flex items-center gap-3 px-4 py-2">
        <span className="w-20 text-[11px] font-medium uppercase text-text-muted">
          Function
        </span>
        <span className="w-24 text-[11px] font-medium uppercase text-text-muted">
          Category
        </span>
        <span className="w-28 text-[11px] font-medium uppercase text-text-muted">
          Agent
        </span>
        <span className="w-24 text-[11px] font-medium uppercase text-text-muted">
          Posture
        </span>
        <span className="flex-1 text-[11px] font-medium uppercase text-text-muted">
          Confidence
        </span>
      </div>

      {mappings.map((m) => {
        const color = NIST_COLORS[m.nistFunction] ?? 'var(--color-text-muted)';
        const isHighlighted =
          selectedAgent != null && m.cellHandle === selectedAgent;
        const isDimmed =
          selectedAgent != null && m.cellHandle !== selectedAgent;

        return (
          <div
            key={m.nistFunction}
            className={`glass-panel flex items-center gap-3 px-4 py-1.5 transition-colors hover:bg-white/[0.02] ${
              isHighlighted
                ? "bg-bg-tertiary border-l-2"
                : ""
            }${isDimmed ? " opacity-25" : ""}`}
            style={
              isHighlighted
                ? { borderLeftColor: color, boxShadow: `inset 2px 0 8px ${color}20` }
                : undefined
            }
          >
            <div className="flex w-20 items-center gap-2">
              <span
                className="h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: color }}
              />
              <span
                className="text-sm font-medium"
                style={{ color }}
              >
                {m.nistFunction}
              </span>
            </div>

            <span className="w-24 text-sm font-mono text-white/70">
              {m.nistCategory}
            </span>

            <span className="w-28 truncate text-sm font-medium text-white">
              {m.cellHandle}
            </span>

            <span
              className="w-24 rounded-full border px-2.5 py-0.5 text-center text-[11px] font-medium"
              style={{
                borderColor: color,
                color,
                backgroundColor: `${color}15`,
              }}
            >
              {m.posture}
            </span>

            <div className="flex flex-1 items-center gap-3">
              <div className="flex-1">
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${m.confidence}%`,
                      background: `linear-gradient(90deg, ${color}80, ${color})`,
                    }}
                  />
                </div>
              </div>
              <span className="w-12 text-right text-sm font-mono tabular-nums text-white/80">
                {m.confidence}%
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
