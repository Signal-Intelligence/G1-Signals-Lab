import Link from "next/link";
import { Hero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { GlassPanel } from "@/components/GlassPanel";
import { CardHeader } from "@/components/CardHeader";
import { ProductsDropdown } from "@/components/ProductsDropdown";
import { SITE } from "@/lib/site";
import { pageMetadata } from "@/lib/metadata";
import {
  CYBER_REGULATORY_TIMELINE as CYBER_TIMELINE,
  DEFENCE_REGULATORY_TIMELINE as DEFENCE_TIMELINE,
  CYBER_POINTS,
  DEFENCE_POINTS,
  CONVERGENCE_POINTS,
} from "@/lib/data/home";

export const metadata = pageMetadata("Home", SITE.positioning, "/");

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: SITE.org,
          url: SITE.url,
          description: SITE.positioning,
        })}
      </script>

      <Hero
        eyebrow="// GUILDONE · SIGNAL MARKET INTELLIGENCE"
        title="Cryptographically governed autonomy."
        subtitle="NIST-grounded agentic ecosystems for cyber and defence. Autonomous agents bound to governance pillars — each action cryptographically attested, trust-decayed, and evidenced."
      >
        <ProductsDropdown />
      </Hero>


      <Section eyebrow="// THE PROBLEM" title="Autonomy without governance is liability">
        <div className="max-w-3xl mb-10">
          <p className="text-sm font-light text-text-secondary leading-relaxed">
            Organizations across cyber and defence are deploying autonomous agents at scale — but the
            governance layer hasn't kept pace. Agents act at machine speed while oversight remains
            human-speed. The result: decisions that cannot be proven, actions that cannot be audited,
            and trust that cannot be verified.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <GlassPanel className="p-5" accentBorder="severity-critical" hover>
            <CardHeader label="UNATTESTED AUTONOMY" dotColor="bg-severity-critical" />
            <p className="text-sm font-light text-text-secondary leading-relaxed">
              Autonomous agents make thousands of decisions per hour across enterprise and mission
              environments. Without cryptographic provenance, no one can prove whether an action was
              authorized, within policy, or even legitimate.
            </p>
          </GlassPanel>
          <GlassPanel className="p-5" accentBorder="severity-high" hover>
            <CardHeader label="FRAGMENTED GOVERNANCE" dotColor="bg-severity-high" />
            <p className="text-sm font-light text-text-secondary leading-relaxed">
              Regulatory frameworks span NIST CSF, CMMC, ITAR, Bill C-8, and sovereign mandates.
              Organizations address them in silos — creating compliance gaps that widen with every
              new autonomous deployment.
            </p>
          </GlassPanel>
          <GlassPanel className="p-5" hover>
            <CardHeader label="ERODING TRUST" dotColor="bg-accent-blue" />
            <p className="text-sm font-light text-text-secondary leading-relaxed">
              Agent trust is not a checkbox. Without continuous re-attestation and mathematical decay
              models, stale identities persist across enterprise networks and classified enclaves
              alike — becoming invisible liabilities.
            </p>
          </GlassPanel>
        </div>
      </Section>

      <Section eyebrow="// TWO DOMAINS, ONE IMPERATIVE" title="Why cyber. Why defence. Why now.">
        <div className="grid gap-6 lg:grid-cols-3">
          <GlassPanel className="p-6" accentBorder="accent-blue" hover>
            <CardHeader label="CYBER" dotColor="bg-accent-blue" />
            <h3 className="font-extralight text-xl text-white leading-tight mb-4 text-glow-sm">
              Enterprise can't audit what it automates
            </h3>
            <div className="space-y-3">
              {CYBER_POINTS.map((point) => (
                <div key={point} className="flex items-start gap-2.5">
                  <span className="w-1 h-1 rounded-full bg-accent-blue mt-2 flex-shrink-0" />
                  <p className="text-[11px] font-light text-text-secondary leading-relaxed">{point}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-border-subtle">
              <Link href="/products/cypher1" className="signal-btn-primary inline-block text-[11px]">
                Explore CYPHER ONE
              </Link>
            </div>
          </GlassPanel>

          <GlassPanel className="p-6" accentBorder="accent-green" hover>
            <CardHeader label="DEFENCE" dotColor="bg-accent-green" />
            <h3 className="font-extralight text-xl text-white leading-tight mb-4 text-glow-sm">
              Mission tempo outpaces human governance
            </h3>
            <div className="space-y-3">
              {DEFENCE_POINTS.map((point) => (
                <div key={point} className="flex items-start gap-2.5">
                  <span className="w-1 h-1 rounded-full bg-accent-green mt-2 flex-shrink-0" />
                  <p className="text-[11px] font-light text-text-secondary leading-relaxed">{point}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-border-subtle">
              <Link href="/products/stratos1" className="signal-btn-secondary inline-block text-[11px]">
                Explore STRATOS ONE
              </Link>
            </div>
          </GlassPanel>

          <GlassPanel className="p-6" accentBorder="severity-critical" glowColor="var(--color-glow-critical)" hover>
            <CardHeader label="CONVERGENCE" dotColor="bg-severity-critical" />
            <h3 className="font-extralight text-xl text-white leading-tight mb-4 text-glow-sm">
              The same trust problem, two theaters
            </h3>
            <div className="space-y-3">
              {CONVERGENCE_POINTS.map((point) => (
                <div key={point} className="flex items-start gap-2.5">
                  <span className="w-1 h-1 rounded-full bg-severity-critical mt-2 flex-shrink-0" />
                  <p className="text-[11px] font-light text-text-secondary leading-relaxed">{point}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-border-subtle">
              <Link href="/architecture" className="signal-btn-secondary inline-block text-[11px]">
                View architecture
              </Link>
            </div>
          </GlassPanel>
        </div>
      </Section>

      <Section eyebrow="// THE MOMENT" title="Regulatory walls are closing from both sides">
        <div className="max-w-3xl mb-10">
          <p className="text-sm font-light text-text-secondary leading-relaxed">
            Cyber and defence are facing the same deadline pressure from different directions.
            Sovereign mandates, post-quantum migration, and agentic AI governance are not separate
            problems — they are the same problem at different classification levels.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <GlassPanel className="p-6" accentBorder="accent-blue">
            <div className="text-[11px] font-medium uppercase tracking-[var(--tracking-eyebrow)] text-accent-blue mb-5">
              Cyber regulatory pressure
            </div>
            <div className="space-y-5">
              {CYBER_TIMELINE.map((item) => (
                <div key={item.year} className="flex gap-4">
                  <span className="text-[11px] font-light text-accent-blue w-10 flex-shrink-0">{item.year}</span>
                  <div className="flex-1 border-l border-border-accent pl-4">
                    <p className="text-[11px] font-light text-text-secondary leading-relaxed">{item.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </GlassPanel>

          <GlassPanel className="p-6" accentBorder="accent-green">
            <div className="text-[11px] font-medium uppercase tracking-[var(--tracking-eyebrow)] text-accent-green mb-5">
              Defence regulatory pressure
            </div>
            <div className="space-y-5">
              {DEFENCE_TIMELINE.map((item) => (
                <div key={item.year} className="flex gap-4">
                  <span className="text-[11px] font-light text-accent-green w-10 flex-shrink-0">{item.year}</span>
                  <div className="flex-1 border-l border-accent-green/20 pl-4">
                    <p className="text-[11px] font-light text-text-secondary leading-relaxed">{item.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </GlassPanel>
        </div>
        <GlassPanel className="mt-6 p-5" accentBorder="severity-critical">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 flex items-center justify-center border border-severity-critical/30 flex-shrink-0">
              <span className="text-severity-critical text-lg">{"⬥"}</span>
            </div>
            <div className="flex-1">
              <p className="text-[11px] font-medium uppercase tracking-[var(--tracking-label)] text-white mb-1">
                The convergence point
              </p>
              <p className="text-sm font-light text-text-secondary leading-relaxed">
                Every deadline above demands the same capability: autonomous agents that can prove what they did,
                who authorized it, and that it was within policy — with cryptographic evidence, not compliance PDFs.
                The organization that solves this once, across both domains, owns the governance layer for agentic AI.
              </p>
            </div>
          </div>
        </GlassPanel>
      </Section>


      {/* TODO: Re-enable when social proof content is available
      <Section eyebrow="// SOCIAL PROOF" title="Design partners & advisors">
        <div className="grid gap-4 md:grid-cols-3">
          <GlassPanel className="flex h-24 items-center justify-center p-5" hover>
            <span className="telemetry">Partner logo placeholder</span>
          </GlassPanel>
          <GlassPanel className="p-5" hover>
            <CardHeader label="ADVISORY QUOTE" />
            <p className="text-sm italic text-text-secondary leading-relaxed">
              "The catalog invariant changes how we audit agentic security — every surface is pre-declared."
            </p>
            <CardFooter timestamp="2026" label="ADVISOR // REDACTED" />
          </GlassPanel>
          <GlassPanel className="flex h-24 items-center justify-center p-5" hover>
            <span className="telemetry">Government LOI placeholder</span>
          </GlassPanel>
        </div>
      </Section>
      */}

    </>
  );
}
