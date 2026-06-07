import { PageHero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { GlassPanel } from "@/components/GlassPanel";
import { CardHeader } from "@/components/CardHeader";
import { pageMetadata } from "@/lib/metadata";
import { ORIGINS, CAPABILITIES } from "@/lib/data/about";

export const metadata = pageMetadata(
  "About G1 Signals",
  "Signal Intelligence Inc. — building NIST-grounded agentic ecosystems for cyber and defence.",
  "/about"
);

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="// ABOUT G1 SIGNALS"
        title="G1 Signals Lab x Signal Intel"
        subtitle="We build autonomous agent ecosystems for cyber and defence — each grounded in NIST, cryptographically bound to its governance pillar, and governed by exponential trust decay. Every action is attested, every decision is auditable, and every deployment is sovereign."
      />

      {/* Company Overview */}
      <Section eyebrow="// COMPANY OVERVIEW" title="Origin">
        <div className="grid gap-3 md:grid-cols-3">
          {ORIGINS.map((o) => (
            <GlassPanel key={o.label} className="p-5" hover>
              <CardHeader label={o.label} dotColor="bg-accent-blue" />
              <p className="mt-2 text-sm font-light text-text-secondary leading-relaxed">
                {o.detail}
              </p>
            </GlassPanel>
          ))}
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {CAPABILITIES.map((c) => (
            <GlassPanel key={c.label} className="p-4" hover>
              <p className="text-[11px] font-medium uppercase tracking-[var(--tracking-label)] text-accent-blue">
                {c.label}
              </p>
              <p className="mt-1 text-[11px] font-light text-text-secondary leading-snug">
                {c.detail}
              </p>
            </GlassPanel>
          ))}
        </div>
      </Section>

      {/* TODO: Re-enable when team content is finalized
      <Section eyebrow="// TEAM" title="Leadership">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((t) => (
            <GlassPanel key={t.role} className="p-5 text-center" hover>
              <div className="mx-auto mb-4 h-16 w-16 border border-border-default bg-accent-blue/5 flex items-center justify-center">
                <span className="text-accent-blue text-2xl">◇</span>
              </div>
              <p className="text-[11px] font-medium text-white">{t.name}</p>
              <p className="mt-1 text-[11px] uppercase tracking-[var(--tracking-telemetry)] text-accent-blue">{t.role}</p>
            </GlassPanel>
          ))}
        </div>
      </Section>
      */}

      {/* TODO: Re-enable when investor logos are available
      <Section eyebrow="// INVESTORS">
        <div className="flex flex-wrap gap-3">
          {[1, 2, 3].map((i) => (
            <GlassPanel key={i} className="flex h-16 w-36 items-center justify-center" hover>
              <span className="telemetry">Logo</span>
            </GlassPanel>
          ))}
        </div>
      </Section>
      */}

      {/* TODO: Re-enable when press kit assets are ready
      <Section eyebrow="// PRESS KIT">
        <GlassPanel className="p-5">
          <CardHeader label="MEDIA RESOURCES" />
          <div className="callout-accent">
            <ul className="space-y-2">
              {["Logo lockup (SVG)", "Color tokens reference", "OG card templates"].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="connector-dot mt-1.5 flex-shrink-0" />
                  <span className="text-[11px] font-light text-text-secondary leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <CardFooter />
        </GlassPanel>
      </Section>
      */}
    </>
  );
}