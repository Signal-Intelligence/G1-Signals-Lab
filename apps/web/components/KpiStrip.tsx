export interface KpiItem {
  label: string;
  value: string;
  accent?: string;
}

const GRID_COLS: Record<number, string> = {
  2: "grid-cols-2",
  3: "grid-cols-2 sm:grid-cols-3",
  4: "grid-cols-2 sm:grid-cols-4",
  5: "grid-cols-2 sm:grid-cols-5",
  6: "grid-cols-2 sm:grid-cols-6",
  7: "grid-cols-2 sm:grid-cols-7",
};

export function KpiStrip({ items, className }: { items: KpiItem[]; className?: string }) {
  return (
    <div className={`grid ${className ?? GRID_COLS[items.length] ?? "grid-cols-3"} gap-3`}>
      {items.map((kpi) => (
        <div
          key={kpi.label}
          className="glass-panel rounded-none overflow-hidden px-3 py-3 text-center flex flex-col items-center justify-end"
        >
          <p
            className={`glow-number text-lg leading-none mb-2 ${kpi.accent ?? "text-white"}`}
          >
            {kpi.value}
          </p>
          <span className="eyebrow">{kpi.label}</span>
        </div>
      ))}
    </div>
  );
}
