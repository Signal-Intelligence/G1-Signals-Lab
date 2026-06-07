import { PageHero } from "@/components/Hero";
import { UseCaseTemplate } from "@/components/UseCaseTemplate";
import { Section } from "@/components/Section";
import { GlassPanel } from "@/components/GlassPanel";
import { CardHeader } from "@/components/CardHeader";
import { CardFooter } from "@/components/CardFooter";
import { KpiStrip } from "@/components/KpiStrip";
import { DEMO_PHASES } from "@/lib/data/narrative";
import { BILL_C8_METRICS, BILL_C8_STANDARDS, BILL_C8_ARTIFACTS } from "@/lib/data/use-cases";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Bill C-8 Compliance",
  "Sovereign Canadian CCSPA compliance attested on-chain.",
  "/use-cases/bill-c8"
);

const billPhases = DEMO_PHASES.filter(
  (p) =>
    p.uiSurface.includes("BillC8") ||
    p.action.includes("Bill C-8") ||
    p.id === "act3-approve" ||
    p.id === "act5-morning"
);

export default function BillC8Page() {
  return (
    <>
      <PageHero
        eyebrow="// USE CASE 03 — BILL C-8"
        title="Sovereign Canadian Bill C-8 / CCSPA compliance, attested on-chain."
        subtitle="Critical Cyber Systems Protection Act mandates sovereign evidence, data residency, and crosswalk compilation via one-intel."
      />
      <UseCaseTemplate
        phases={billPhases.length > 0 ? billPhases : DEMO_PHASES.slice(0, 4)}
        metrics={BILL_C8_METRICS}
        standards={BILL_C8_STANDARDS}
        artifacts={BILL_C8_ARTIFACTS}
      />
      <Section eyebrow="// CCSPA MANDATE" className="pt-0">
        <GlassPanel className="p-5" accentBorder="severity-critical" glowColor="var(--color-glow-critical)">
          <CardHeader label="MANDATE" dotColor="bg-severity-critical" />
          <h3 className="font-extralight text-xl text-white leading-tight mb-2 text-glow-sm">
            Canada Bill C-8 (CCSPA)
          </h3>
          <p className="text-xs font-light text-text-muted uppercase tracking-[var(--tracking-telemetry)] mb-4">
            Part 1, Section 20(1) — Continuous Mitigation
          </p>
          <KpiStrip
            items={[
              { label: "JURISDICTION", value: "CER" },
              { label: "CLAUSE", value: "§20(1)" },
              { label: "LIABILITY", value: "72h", accent: "text-severity-medium" },
              { label: "GATE STATUS", value: "ASSERTED", accent: "text-accent-green" },
            ]}
          />
          <div className="callout-critical mt-4">
            <span className="eyebrow block mb-2">{"// LEGAL AUTHORITY"}</span>
            <p className="text-sm font-light text-text-secondary leading-relaxed">
              As a CER-regulated interprovincial pipeline operator, continuous mitigation of identified
              vulnerabilities is mandated under Bill C-8. Failure to demonstrate active remediation within
              the 72-hour liability window triggers automatic reporting to the Canadian Centre for Cyber Security.
            </p>
          </div>
          <CardFooter timestamp="08:30 AM — June 1, 2026" />
        </GlassPanel>
      </Section>
    </>
  );
}
