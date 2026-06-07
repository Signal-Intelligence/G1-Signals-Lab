import { PageHero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { StatusBadge } from "@/components/StatusBadge";
import { GlassPanel } from "@/components/GlassPanel";
import { CardHeader } from "@/components/CardHeader";
import { CardFooter } from "@/components/CardFooter";
import { pageMetadata } from "@/lib/metadata";
import { SITE } from "@/lib/site";
import { COMPLIANCE_STATUSES } from "@/lib/data/trust";

export const metadata = pageMetadata(
  "Compliance",
  "Live compliance alignment status for NIST CSF 2.0, Bill C-8, SOC 2, and roadmap certifications.",
  "/trust/compliance"
);

export default function CompliancePage() {
  return (
    <>
      <PageHero
        eyebrow="// TRUST — COMPLIANCE"
        title="Alignment status"
        subtitle='We use "aligned with" until certifications are in hand — never claim certified prematurely.'
      />
      <Section eyebrow="// COMPLIANCE MATRIX">
        <GlassPanel className="p-5">
          <CardHeader label="COMPLIANCE STATUS" />
          <div className="space-y-2">
            {COMPLIANCE_STATUSES.map((s) => (
              <StatusBadge key={s.label} {...s} />
            ))}
          </div>
          <CardFooter label={SITE.footerTelemetry} />
        </GlassPanel>
      </Section>
    </>
  );
}
