import Link from "next/link";
import { PageHero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { GlassPanel } from "@/components/GlassPanel";
import { CardHeader } from "@/components/CardHeader";
import { CardFooter } from "@/components/CardFooter";
import { KpiStrip } from "@/components/KpiStrip";
import { pageMetadata } from "@/lib/metadata";
import { NIST_FUNCTION_COLORS } from "@/lib/nist-colors";
import {
  STRATOS1_NIST_BINDINGS,
  STRATOS1_USE_CASES,
  STRATOS1_DIFFERENTIATORS,
  STRATOS1_KPIS,
} from "@/lib/data/stratos1";

export const metadata = pageMetadata(
  "STRATOS ONE — Agentic Defence Ecosystem",
  "NIST-grounded agentic security for defence with CMMC, ITAR, and sovereign deployment.",
  "/products/stratos1"
);

export default function Stratos1Page() {
  return (
    <main className="min-h-screen bg-bg-primary">
      <PageHero
        eyebrow="// STRATOS ONE — AGENTIC DEFENCE ECOSYSTEM"
        title="Mission-ready agentic security."
        subtitle="NIST CSF 2.0 architecture adapted for sovereign defence environments. Full compliance coverage across CMMC, ITAR, and NIST SP 800-171 with air-gapped deployment and multi-domain threat fusion."
      />

      {/* Coming Soon Banner */}
      <Section>
        <GlassPanel accentBorder="accent-green" glowColor="var(--color-glow-green)">
          <CardHeader label="COMING SOON" dotColor="bg-accent-green" />
          <p className="text-sm font-light text-text-secondary leading-relaxed">
            STRATOS ONE is in active design. Join the defence partner waitlist for early access.
          </p>
          <div className="mt-4">
            <Link
              href="/partnerships"
              className="signal-btn-primary inline-block text-[11px] uppercase tracking-[var(--tracking-label)]"
            >
              Join Waitlist
            </Link>
          </div>
          <CardFooter label="SMI DEFENCE DIVISION // RESTRICTED" />
        </GlassPanel>
      </Section>

      {/* Section 01 — KPI Overview */}
      <Section
        eyebrow="// 01 — MISSION OVERVIEW"
        title="Defence-grade coverage metrics."
      >
        <KpiStrip
          items={[
            { label: "NIST FUNCTIONS", value: String(STRATOS1_KPIS.nistFunctions) },
            { label: "BOUND AGENTS", value: String(STRATOS1_KPIS.boundAgents) },
            { label: "COMPLIANCE FRAMEWORKS", value: String(STRATOS1_KPIS.complianceFrameworks) },
            { label: "CLASSIFICATION LEVELS", value: String(STRATOS1_KPIS.classificationLevels) },
          ]}
        />
      </Section>

      {/* Section 02 — Defence Agent Binding */}
      <Section
        eyebrow="// 02 — DEFENCE AGENT BINDING"
        title="NIST CSF coverage through sovereign agents."
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {STRATOS1_NIST_BINDINGS.map((binding) => (
            <GlassPanel
              key={binding.nistFunction}
              hover
              className="p-5"
              glowColor={`color-mix(in srgb, ${NIST_FUNCTION_COLORS[binding.nistFunction]} 12%, transparent)`}
            >
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="inline-block w-2 h-2 rounded-full"
                  style={{ background: NIST_FUNCTION_COLORS[binding.nistFunction] }}
                />
                <span className="text-[11px] font-medium uppercase tracking-[var(--tracking-label)] text-text-muted">
                  {binding.functionLabel}
                </span>
              </div>
              <h3 className="text-sm font-medium text-white tracking-wide">
                {binding.cellHandle}
              </h3>
              <p className="mt-2 text-[11px] font-light text-text-secondary leading-relaxed">
                {binding.description}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {binding.capabilities.map((cap) => (
                  <span
                    key={cap}
                    className="inline-block px-2 py-0.5 text-[11px] uppercase tracking-[var(--tracking-telemetry)] text-text-muted border border-border-subtle"
                  >
                    {cap}
                  </span>
                ))}
              </div>
              <CardFooter
                label={`AUTONOMY CEILING: L${binding.autonomyCeiling}`}
              />
            </GlassPanel>
          ))}
        </div>
      </Section>

      {/* Section 03 — Operational Use Cases */}
      <Section
        eyebrow="// 03 — OPERATIONAL USE CASES"
        title="Proof-of-concept defence scenarios."
      >
        <div className="grid gap-4 md:grid-cols-3">
          {STRATOS1_USE_CASES.map((uc) => (
            <GlassPanel key={uc.id} hover className="p-5">
              <CardHeader label={uc.id.toUpperCase()} dotColor="bg-accent-blue" />
              <h3 className="text-sm font-medium text-white tracking-wide">
                {uc.title}
              </h3>
              <p className="mt-2 text-[11px] font-light text-text-secondary leading-relaxed">
                {uc.description}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {uc.nistFunctions.map((fn) => (
                  <span
                    key={fn}
                    className="inline-block px-2 py-0.5 text-[11px] uppercase tracking-[var(--tracking-telemetry)] border border-border-subtle"
                    style={{ color: NIST_FUNCTION_COLORS[fn] }}
                  >
                    {fn}
                  </span>
                ))}
              </div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {uc.agents.map((agent) => (
                  <span
                    key={agent}
                    className="inline-block px-2 py-0.5 text-[11px] uppercase tracking-[var(--tracking-telemetry)] text-text-muted border border-border-subtle bg-white/[0.02]"
                  >
                    {agent}
                  </span>
                ))}
              </div>
              <CardFooter label="DEFENCE PoC // RESTRICTED" />
            </GlassPanel>
          ))}
        </div>
      </Section>

      {/* Section 04 — Differentiators */}
      <Section
        eyebrow="// 04 — DIFFERENTIATORS"
        title="Sovereign defence capabilities."
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {STRATOS1_DIFFERENTIATORS.map((diff) => (
            <GlassPanel key={diff.label} hover className="p-5">
              <h3 className="text-[11px] font-medium uppercase tracking-[var(--tracking-label)] text-white">
                {diff.label}
              </h3>
              <p className="mt-2 text-[11px] font-light text-text-secondary leading-relaxed">
                {diff.detail}
              </p>
            </GlassPanel>
          ))}
        </div>
      </Section>

      {/* Section 05 — Partnership CTA */}
      <Section
        eyebrow="// 05 — PARTNERSHIP"
        title="Designed for defence. Built with partners."
      >
        <GlassPanel accentBorder="accent-blue" className="p-6">
          <p className="text-sm font-light text-text-secondary leading-relaxed max-w-xl">
            STRATOS ONE is co-developed with defence industry partners to ensure
            mission-critical reliability, sovereign compliance, and operational
            security at classification boundaries.
          </p>
          <div className="mt-6">
            <Link
              href="/partnerships"
              className="signal-btn-primary inline-block text-[11px] uppercase tracking-[var(--tracking-label)]"
            >
              Become a Defence Partner
            </Link>
          </div>
        </GlassPanel>
      </Section>
    </main>
  );
}
