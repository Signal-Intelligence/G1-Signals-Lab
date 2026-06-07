import { PageHero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { GlassPanel } from "@/components/GlassPanel";
import { CardHeader } from "@/components/CardHeader";
import { CardFooter } from "@/components/CardFooter";
import { CELLS } from "@/lib/data/cells";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Responsible AI",
  "Catalog invariant and autonomy ceilings for governed agentic security.",
  "/trust/responsible-ai"
);

export default function ResponsibleAIPage() {
  return (
    <>
      <PageHero
        eyebrow="// TRUST — RESPONSIBLE AI"
        title="Catalog invariant"
        subtitle="Every UI the agent shows you must be pre-declared in a signed registry."
      />
      <Section eyebrow="// INVARIANT">
        <GlassPanel className="p-5">
          <CardHeader label="RUNTIME CONSTRAINT" />
          <div className="callout-accent">
            <span className="eyebrow block mb-2">{"// MECHANISM"}</span>
            <p className="text-sm font-light text-text-secondary leading-relaxed">
              Unregistered components are mechanically refused — not by policy, by the runtime.
              If a surface is not in the Signals UI Catalog with a valid signalsUiCatalogId,
              the hydration pipeline cannot render it. This is the contract investors and
              regulators can audit.
            </p>
          </div>
          <CardFooter />
        </GlassPanel>
      </Section>
      <Section eyebrow="// AUTONOMY CEILINGS" title="Cell autonomy table">
        <GlassPanel className="p-5">
          <CardHeader label="NIST CSF 2.0 POSTURE MATRIX" statusText="7 CELLS // ALL NOMINAL" />
          <div className="space-y-2">
            {CELLS.map((c) => (
              <div
                key={c.handle}
                className="glass-panel rounded-none overflow-hidden px-4 py-3 flex items-center gap-4 hover:bg-accent-blue/[0.03] transition-colors"
              >
                <div className="w-12">
                  <span className="text-[11px] font-medium text-accent-blue tracking-[var(--tracking-label)]">
                    {c.handle}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[11px] text-text-secondary font-light">
                    {c.role.replace(/_/g, " ")}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <p className="glow-number text-sm leading-none mb-1">{c.autonomyCeiling}</p>
                    <span className="text-[11px] uppercase tracking-[var(--tracking-telemetry)] text-text-muted">CEILING</span>
                  </div>
                  <div className="text-center">
                    <p className="glow-number text-sm leading-none mb-1">{c.currentAutonomy}</p>
                    <span className="text-[11px] uppercase tracking-[var(--tracking-telemetry)] text-text-muted">CURRENT</span>
                  </div>
                </div>
                <span className="text-[11px] font-mono text-text-muted uppercase tracking-[var(--tracking-telemetry)] hidden md:inline">
                  {c.permissions.slice(0, 2).join(" · ")}
                </span>
              </div>
            ))}
          </div>
          <CardFooter label="FRAMEWORK: AUTONOMY CEILINGS // CELL-BOUND" />
        </GlassPanel>
      </Section>
    </>
  );
}
