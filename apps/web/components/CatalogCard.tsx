"use client";

import { GlassPanel } from "@/components/GlassPanel";
import { CardHeader } from "@/components/CardHeader";
import { CardFooter } from "@/components/CardFooter";
import { NIST_FUNCTION_COLORS, NIST_FUNCTION_LABELS } from "@/lib/nist-colors";
import type { CatalogEntry } from "@/lib/data/catalog";

export function CatalogCard({
  entry,
  onRequestPreview,
}: {
  entry: CatalogEntry;
  onRequestPreview: () => void;
}) {
  const nistColor = NIST_FUNCTION_COLORS[entry.nistFunction];

  return (
    <button
      type="button"
      onClick={onRequestPreview}
      className="group w-full text-left focus-ring"
    >
      <GlassPanel className="flex h-full flex-col p-5" hover>
        <CardHeader label={entry.nistFunction} dotColor="bg-accent-blue" />
        <p className="font-mono text-[11px] text-text-muted mb-1">{entry.catalogId}</p>
        <p className="flex-1 text-sm font-light text-text-secondary leading-relaxed mb-4">
          {entry.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="border border-border-default px-2 py-0.5 text-[11px] uppercase tracking-[var(--tracking-telemetry)] text-text-muted">
            {entry.owningCell.replace(/_/g, " ")}
          </span>
          <span
            className="border px-2 py-0.5 text-[11px] uppercase tracking-[var(--tracking-eyebrow)]"
            style={{ borderColor: nistColor, color: nistColor }}
          >
            {entry.nistFunction} · {NIST_FUNCTION_LABELS[entry.nistFunction]}
          </span>
        </div>
        <p className="text-[11px] uppercase tracking-[var(--tracking-label)] text-accent-blue opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
          Request live preview →
        </p>
        <CardFooter />
      </GlassPanel>
    </button>
  );
}
