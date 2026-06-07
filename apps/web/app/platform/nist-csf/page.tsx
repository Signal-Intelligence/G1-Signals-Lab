import { PageHero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { GlassPanel } from "@/components/GlassPanel";
import { CardHeader } from "@/components/CardHeader";
import { CardFooter } from "@/components/CardFooter";
import { CELLS } from "@/lib/data/cells";
import { CATALOG } from "@/lib/data/catalog";
import type { CellRole } from "@/lib/data/cells";
import { pageMetadata } from "@/lib/metadata";
import { NIST_FUNCTION_LABELS, NIST_FUNCTION_COLORS } from "@/lib/nist-colors";
import type { NistFunction } from "@/lib/data/catalog";

export const metadata = pageMetadata(
  "NIST CSF 2.0",
  "Six-function governance matrix mapped to G1 cells.",
  "/platform/nist-csf"
);

function primaryNistForCell(role: CellRole): NistFunction {
  // The orchestrator (SUPERVISOR_CORE) spans all pillars; its primary identity is Govern.
  if (role === "SUPERVISOR_CORE") return "GV";
  const entry = CATALOG.find((c) => c.owningCell === role);
  return entry?.nistFunction ?? "GV";
}

export default function NistCsfPage() {
  return (
    <>
      <PageHero
        eyebrow="// PLATFORM — NIST CSF 2.0"
        title="Six-function matrix"
        subtitle="GV · ID · PR · DE · RS · RC alignment across cell typology."
      />
      <Section>
        <GlassPanel className="p-5">
          <CardHeader label="NIST CSF 2.0 POSTURE MATRIX" statusText="6 FUNCTIONS // ALL NOMINAL" />
          <div className="space-y-2">
            {CELLS.map((c) => {
              const fn = primaryNistForCell(c.role);
              const color = NIST_FUNCTION_COLORS[fn];
              return (
                <div
                  key={c.handle}
                  className="glass-panel rounded-none overflow-hidden px-4 py-3 flex items-center gap-4 hover:bg-accent-blue/[0.03] transition-colors"
                >
                  <div className="w-10">
                    <span className="text-[11px] font-medium text-accent-blue tracking-[var(--tracking-label)]">
                      {fn}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[11px] text-white font-light">
                      {NIST_FUNCTION_LABELS[fn]}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-text-muted uppercase tracking-[var(--tracking-telemetry)]">
                    {c.handle}
                  </span>
                  <span
                    className="text-[11px] px-2 py-0.5 border rounded-sm uppercase tracking-[var(--tracking-eyebrow)]"
                    style={{ borderColor: `${color}33`, color }}
                  >
                    HYDRATED
                  </span>
                </div>
              );
            })}
          </div>
          <CardFooter label="FRAMEWORK: NIST CSF 2.0 // CELL-BOUND COMPLIANCE" />
        </GlassPanel>
      </Section>
    </>
  );
}
