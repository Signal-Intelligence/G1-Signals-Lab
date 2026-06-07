import Link from "next/link";
import { PageHero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { GlassPanel } from "@/components/GlassPanel";
import { CardHeader } from "@/components/CardHeader";
import { KpiStrip } from "@/components/KpiStrip";
import type { KpiItem } from "@/components/KpiStrip";
import { pageMetadata } from "@/lib/metadata";
import { CYPHER_ONE_KPIS } from "@/lib/data/cypher1";
import { STRATOS1_KPIS } from "@/lib/data/stratos1";

export const metadata = pageMetadata(
  "Products",
  "NIST-grounded agentic ecosystems for cyber and defence.",
  "/products"
);

const CYPHER_KPI_ITEMS: KpiItem[] = [
  { label: "NIST FUNCTIONS", value: String(CYPHER_ONE_KPIS.nistFunctions) },
  { label: "AGENTS", value: String(CYPHER_ONE_KPIS.boundAgents) },
  { label: "HYDRATION LAYERS", value: String(CYPHER_ONE_KPIS.hydrationLayers) },
];

const STRATOS_KPI_ITEMS: KpiItem[] = [
  { label: "NIST FUNCTIONS", value: String(STRATOS1_KPIS.nistFunctions) },
  { label: "AGENTS", value: String(STRATOS1_KPIS.boundAgents) },
  { label: "FRAMEWORKS", value: String(STRATOS1_KPIS.complianceFrameworks) },
];

export default function ProductsPage() {
  return (
    <main className="holo-field">
      <PageHero
        eyebrow="// PRODUCTS — AGENTIC ECOSYSTEMS"
        title="NIST-grounded agent ecosystems."
        subtitle="Purpose-built agentic security platforms for cyber and defence. Each ecosystem binds autonomous agents to NIST CSF 2.0 pillars with cryptographic identity and governed autonomy."
      />

      <Section>
        <div className="grid gap-8 md:grid-cols-2">
          <GlassPanel accentBorder="accent-blue" className="flex flex-col gap-6 p-6">
            <CardHeader label="AVAILABLE" dotColor="bg-accent-blue" />
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl md:text-3xl font-extralight tracking-tight text-white">
                CYPHER ONE
              </h2>
              <p className="text-[11px] uppercase tracking-[0.12em] text-accent-blue/80">
                Cyber Agentic Ecosystem
              </p>
            </div>
            <p className="text-sm leading-relaxed text-white/60">
              NIST CSF 2.0-grounded cyber security operating as a governed
              agentic ecosystem. Six functions, seven autonomous agents, nine
              hydration layers — all bound by cryptographic identity and policy
              enforcement.
            </p>
            <KpiStrip items={CYPHER_KPI_ITEMS} />
            <Link
              href="/products/cypher1"
              className="signal-btn-primary mt-auto"
            >
              Explore CYPHER ONE
            </Link>
          </GlassPanel>

          <GlassPanel accentBorder="accent-green" className="flex flex-col gap-6 p-6">
            <CardHeader label="COMING SOON" dotColor="bg-accent-green" />
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl md:text-3xl font-extralight tracking-tight text-white">
                STRATOS ONE
              </h2>
              <p className="text-[11px] uppercase tracking-[0.12em] text-accent-green/80">
                Agentic Defence Ecosystem
              </p>
            </div>
            <p className="text-sm leading-relaxed text-white/60">
              Purpose-built for defence environments requiring CMMC, ITAR, and
              sovereign deployment. Air-gapped transport, cross-domain identity,
              and classified workload isolation — governed autonomy at mission
              scale.
            </p>
            <KpiStrip items={STRATOS_KPI_ITEMS} />
            <Link
              href="/products/stratos1"
              className="signal-btn-secondary mt-auto"
            >
              Explore STRATOS ONE
            </Link>
          </GlassPanel>
        </div>
      </Section>
    </main>
  );
}
