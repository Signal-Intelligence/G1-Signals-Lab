import Link from "next/link";
import { Hero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { GlassPanel } from "@/components/GlassPanel";
import { KpiStrip } from "@/components/KpiStrip";
import { pageMetadata } from "@/lib/metadata";
import {
  ECOSYSTEM_CELLS,
  OUTCOMES,
  MATURITY_LEVELS,
  CYPHER_ONE_KPIS,
} from "@/lib/data/cypher1";

export const metadata = pageMetadata(
  "CYPHER ONE — Agentic Cyber Ecosystem",
  "From alert fatigue to evidenced autonomy. An agentic ecosystem orchestrating detection, response, and recovery across all six NIST CSF 2.0 functions with mathematical trust boundaries.",
  "/products/cypher1"
);

export default function CypherOnePage() {
  return (
    <>
      {/* Section 1: Hero */}
      <Hero
        eyebrow="// CYPHER ONE"
        title="From alert fatigue to evidenced autonomy."
        subtitle="An agentic ecosystem that orchestrates detection, response, and recovery across all six NIST functions — with mathematical trust boundaries that tighten automatically when context goes stale."
        primaryCta={{ label: "See it live in the Lab", href: "/lab/cypher" }}
        secondaryCta={{ label: "Request a maturity assessment", href: "/contact" }}
      />

      <div className="relative z-10 px-6 pb-6 md:px-12 lg:px-32">
        <KpiStrip
          items={[
            { label: "NIST FUNCTIONS", value: String(CYPHER_ONE_KPIS.nistFunctions) },
            { label: "BOUND AGENTS", value: String(CYPHER_ONE_KPIS.boundAgents) },
            { label: "HYDRATION LAYERS", value: String(CYPHER_ONE_KPIS.hydrationLayers) },
            { label: "CATALOG SURFACES", value: String(CYPHER_ONE_KPIS.catalogSurfaces) },
          ]}
        />
      </div>

      {/* Section 2: The Ecosystem */}
      <Section
        eyebrow="// THE ECOSYSTEM"
        title="One orchestrator. Six governed cells. Complete NIST coverage."
      >
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3 mb-10">
          {/* Orchestrator */}
          <GlassPanel className="px-4 py-3 md:col-span-2 lg:col-span-3" hover>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="font-mono text-accent-blue text-[11px]">◆</span>
              <span className="text-[11px] font-medium uppercase tracking-wide text-white">
                CYPHER ONE
              </span>
              <span className="text-[11px] font-light text-text-tertiary ml-auto">
                Supervisor Core
              </span>
            </div>
            <p className="text-[11px] font-light text-text-secondary leading-relaxed">
              Orchestrates all six cells — routes decisions, governs autonomy ceilings, and enforces trust decay across the mesh
            </p>
          </GlassPanel>

          {/* NIST-aligned cells */}
          {ECOSYSTEM_CELLS.map((cell) => (
            <GlassPanel key={cell.code} className="px-4 py-3" hover>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="font-mono text-accent-blue text-[11px]">{cell.code}</span>
                <span className="text-[11px] font-medium uppercase tracking-wide text-white">
                  {cell.name}
                </span>
                <span className="text-[11px] font-light text-text-tertiary ml-auto">
                  {cell.handle}
                </span>
              </div>
              <p className="text-[11px] font-light text-text-secondary leading-relaxed">
                {cell.outcome}
              </p>
            </GlassPanel>
          ))}
        </div>

        <GlassPanel className="p-0 overflow-hidden" accentBorder={false}>
          <div className="px-5 py-3 border-b border-border-subtle">
            <p className="text-[11px] font-medium uppercase tracking-wide text-white">
              From Tier 2 to Tier 4
            </p>
          </div>
          <div className="grid grid-cols-3">
            {MATURITY_LEVELS.map((tier, i) => {
              const isLast = i === MATURITY_LEVELS.length - 1;
              const brightness = isLast
                ? "text-white"
                : i === 1
                  ? "text-text-secondary"
                  : "text-text-tertiary";
              const dotStyle = isLast
                ? "bg-accent-blue shadow-[0_0_8px_rgba(0,102,255,0.6)]"
                : "bg-white/20";

              return (
                <div
                  key={tier.level}
                  className={`p-4 ${isLast ? "border-t-2 border-t-accent-blue" : "border-t border-t-border-subtle"} ${i < 2 ? "border-r border-r-border-subtle" : ""}`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-2 h-2 rounded-full ${dotStyle}`} />
                    <span className={`font-mono text-[11px] ${isLast ? "text-accent-blue" : "text-text-tertiary"}`}>
                      {tier.level}
                    </span>
                    <span className={`text-[11px] font-medium uppercase tracking-wide ${brightness}`}>
                      {tier.name}
                    </span>
                  </div>
                  <p className={`text-[11px] font-light mb-3 ${isLast ? "text-accent-blue/80" : "text-text-tertiary"}`}>
                    {tier.status}
                  </p>
                  <ul className="space-y-1.5">
                    {tier.capabilities.map((cap) => (
                      <li key={cap} className={`text-[11px] font-light leading-relaxed flex items-start gap-2 ${brightness}`}>
                        <span className={`w-1 h-1 rounded-full mt-1.5 flex-shrink-0 ${isLast ? "bg-accent-blue" : "bg-white/20"}`} />
                        {cap}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </GlassPanel>
      </Section>

      {/* Section 3: Outcomes */}
      <Section
        eyebrow="// WHY IT MATTERS"
        title="Three outcomes that change how you operate"
        className="!py-8"
      >
        <div className="grid gap-4 md:grid-cols-3">
          {OUTCOMES.map((outcome) => (
            <GlassPanel key={outcome.headline} className="p-5" hover>
              <h3 className="text-sm font-medium text-white mb-3">{outcome.headline}</h3>
              <p className="text-[11px] font-light text-text-secondary leading-relaxed">
                {outcome.detail}
              </p>
            </GlassPanel>
          ))}
        </div>
      </Section>

      {/* Section 4: CTA Closer */}
      <Section className="!pt-0 !pb-12">
        <div className="flex flex-col items-center text-center gap-6">
          <p className="text-[11px] font-light uppercase tracking-wide text-text-tertiary">
            Governance · Identity · Protection · Detection · Response · Recovery — one ecosystem, complete coverage.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/lab/cypher" className="signal-btn-primary inline-block">
              See it live in the Lab
            </Link>
            <Link href="/contact" className="signal-btn-secondary inline-block">
              Request a maturity assessment
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
