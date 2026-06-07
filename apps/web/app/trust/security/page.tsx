import { PageHero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { GlassPanel } from "@/components/GlassPanel";
import { CardHeader } from "@/components/CardHeader";
import { CardFooter } from "@/components/CardFooter";
import { pageMetadata } from "@/lib/metadata";
import { THREATS } from "@/lib/data/trust";

export const metadata = pageMetadata(
  "Security",
  "Isolation model, microledger enclave, and vulnerability disclosure.",
  "/trust/security"
);

export default function SecurityPage() {
  return (
    <>
      <PageHero
        eyebrow="// TRUST — SECURITY"
        title="Security posture"
        subtitle="Zero-latency local isolation with cryptographic provenance at the intelligent edge."
      />
      <Section eyebrow="// ISOLATION MODEL">
        <GlassPanel className="p-5">
          <CardHeader label="ARCHITECTURE" />
          <div className="callout-accent">
            <span className="eyebrow block mb-2">{"// ENCLAVE ISOLATION"}</span>
            <p className="text-sm font-light text-text-secondary leading-relaxed">
              G1 enforces policy-governed secure state machines per cell. Microledger enclaves
              seal assertions before any OpenC2 wire actuation. Mesh nodes operate with
              decentralized identity (KERI AIDs) and autonomy ceilings enforced at the
              ENFORCEMENT_GATE.
            </p>
          </div>
          <CardFooter />
        </GlassPanel>
      </Section>
      <Section eyebrow="// THREAT MODEL">
        <GlassPanel className="p-5">
          <CardHeader label="THREAT VECTORS" />
          <div className="space-y-2">
            {THREATS.map((t) => (
              <div
                key={t.vector}
                className="glass-panel rounded-none overflow-hidden flex items-center gap-3 py-2.5 px-3 hover:bg-accent-blue/[0.03] transition-colors"
              >
                <div className="connector-dot" style={{ width: 6, height: 6 }} />
                <span className="text-[11px] font-medium uppercase tracking-[var(--tracking-label)] text-text-secondary w-20 flex-shrink-0">
                  {t.severity}
                </span>
                <span className="text-sm text-white font-light flex-1 truncate">{t.vector}</span>
                <span className="telemetry flex-shrink-0 hidden md:inline">{t.mitigation}</span>
              </div>
            ))}
          </div>
          <CardFooter />
        </GlassPanel>
      </Section>
      <Section eyebrow="// DISCLOSURE">
        <GlassPanel className="p-5">
          <CardHeader label="VULNERABILITY REPORTING" />
          <p className="text-sm font-light text-text-secondary leading-relaxed">
            Report vulnerabilities to{" "}
            <a href="mailto:security@signalintelligence.inc" className="focus-ring text-accent-blue hover:underline">
              security@signalintelligence.inc
            </a>
            . We acknowledge within 48 hours.
          </p>
          <CardFooter />
        </GlassPanel>
      </Section>
    </>
  );
}
