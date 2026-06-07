import Link from "next/link";
import { PageHero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { GlassPanel } from "@/components/GlassPanel";
import { CardHeader } from "@/components/CardHeader";
import { CardFooter } from "@/components/CardFooter";
import { pageMetadata } from "@/lib/metadata";
import { TRUST_LINKS, COMPLIANCE_STATUSES } from "@/lib/data/trust";
import type { ComplianceStatus } from "@/lib/data/trust";

const VARIANT_DOT: Record<ComplianceStatus["variant"], string> = {
  aligned: "bg-accent-green",
  "in-progress": "bg-accent-blue",
  planned: "bg-text-muted",
};

export const metadata = pageMetadata(
  "Trust Center",
  "Security, compliance, and governance posture for G1 Signals. Current-state alignment with NIST CSF 2.0, SOC 2, and post-quantum cryptography.",
  "/trust",
);

export default function TrustCenterPage() {
  return (
    <>
      <PageHero
        eyebrow="// TRUST CENTER"
        title="Trust and transparency."
        subtitle="Security, compliance, and governance are not features \u2014 they are the architecture. This page provides a current-state view of our posture across all three domains."
      />

      <Section eyebrow="// STATUS">
        <GlassPanel className="p-5">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-2 h-2 rounded-full bg-accent-green animate-status-breathe" />
            <span className="text-sm font-light text-white">Protocol stack operational</span>
          </div>
          <p className="text-[11px] font-light text-text-muted">
            HSTP-1.0 transport, KERI/vLEI identity, NIST CSF 2.0 governance binding, and FIPS 203/204 post-quantum cryptography \u2014 all layers active.
          </p>
        </GlassPanel>
      </Section>

      <Section eyebrow="// COMPLIANCE ALIGNMENT" title="Certifications and standards">
        <div className="grid gap-4 md:grid-cols-3">
          {COMPLIANCE_STATUSES.map((s) => (
            <GlassPanel key={s.label} className="p-5" hover>
              <div className="flex items-center gap-2 mb-2">
                <span className={`w-1.5 h-1.5 rounded-full ${VARIANT_DOT[s.variant]}`} />
                <span className="text-[11px] uppercase tracking-wide text-text-muted">
                  {s.wording}
                </span>
              </div>
              <p className="text-sm font-light text-white">{s.label}</p>
            </GlassPanel>
          ))}
        </div>
      </Section>

      <Section eyebrow="// TRUST DOMAINS" title="Explore in depth">
        <div className="grid gap-4 md:grid-cols-3">
          {TRUST_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="focus-ring block">
              <GlassPanel className="h-full p-5" hover>
                <CardHeader label={l.label} />
                <h3 className="font-extralight text-lg text-white text-glow-sm mb-2">
                  {l.title}
                </h3>
                <p className="text-sm font-light text-text-secondary leading-relaxed">
                  {l.desc}
                </p>
                <CardFooter />
              </GlassPanel>
            </Link>
          ))}
        </div>
      </Section>

      <Section eyebrow="// SECURITY DISCLOSURE">
        <GlassPanel className="p-5">
          <p className="text-sm font-light text-text-secondary">
            To report a security vulnerability, contact security@signalintelligence.ai.
            We follow coordinated disclosure practices and will acknowledge receipt within
            48 hours.
          </p>
        </GlassPanel>
      </Section>
    </>
  );
}
