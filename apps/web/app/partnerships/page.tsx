import Link from "next/link";
import { PageHero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { GlassPanel } from "@/components/GlassPanel";
import { CardHeader } from "@/components/CardHeader";
import { CardFooter } from "@/components/CardFooter";
import { pageMetadata } from "@/lib/metadata";
import { CHANNEL_CARDS, DESIGN_BULLETS, SOVEREIGN_BULLETS } from "@/lib/data/partnerships";

export const metadata = pageMetadata(
  "Partnerships",
  "Design partners, channel alliances, and government programs for agentic security.",
  "/partnerships"
);

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 space-y-2">
      {items.map((item) => (
        <li key={item} className="flex items-center gap-2.5">
          <span className="w-1 h-1 rounded-full bg-accent-blue flex-shrink-0" />
          <span className="text-[11px] font-light uppercase tracking-[var(--tracking-label)] text-text-secondary">
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default function PartnershipsPage() {
  return (
    <>
      <PageHero
        eyebrow="// PARTNERSHIPS"
        title="Build with us."
        subtitle="Design partners, channel alliances, systems integrators, and government programs. Every partnership is scoped to your mission and compliance requirements."
      />

      <Section eyebrow="// SECTION 01 — DESIGN PARTNERS" title="Strategic access">
        <GlassPanel className="p-6" accentBorder="accent-blue">
          <CardHeader label="DESIGN PARTNER" />
          <p className="text-sm font-light text-text-secondary leading-relaxed">
            Full platform access, white-glove deployment, joint roadmap participation, and direct
            founder line. For strategic enterprises and government agencies ready to deploy
            NIST-grounded agentic security.
          </p>
          <BulletList items={DESIGN_BULLETS} />
          <CardFooter label="G1 SIGNALS // DESIGN PROGRAM" />
        </GlassPanel>
      </Section>

      <Section eyebrow="// SECTION 02 — CHANNEL & TECHNOLOGY" title="Alliance programs">
        <div className="grid gap-4 md:grid-cols-3">
          {CHANNEL_CARDS.map((card) => (
            <GlassPanel key={card.label} className="p-5" hover>
              <CardHeader label={card.label} />
              <p className="text-sm font-light text-text-secondary leading-relaxed">{card.desc}</p>
              <CardFooter />
            </GlassPanel>
          ))}
        </div>
      </Section>

      <Section eyebrow="// SECTION 03 — GOVERNMENT & SOVEREIGN" title="Sovereign programs">
        <GlassPanel className="p-6" accentBorder="accent-green" glowColor="var(--color-glow-green)">
          <CardHeader label="SOVEREIGN" dotColor="bg-accent-green" />
          <p className="text-sm font-light text-text-secondary leading-relaxed">
            On-premise and sovereign cloud deployment for government buyers. FedRAMP and IRAP
            certification paths, custom AID provisioning, and compliance counsel briefings.
          </p>
          <BulletList items={SOVEREIGN_BULLETS} />
          <CardFooter label="G1 SIGNALS // SOVEREIGN PROGRAM" />
        </GlassPanel>
      </Section>

      <Section eyebrow="// BECOME A PARTNER">
        <GlassPanel className="p-6 text-center">
          <p className="text-lg font-extralight text-white text-glow-sm">
            Ready to build with us?
          </p>
          <div className="mt-6">
            <Link href="/contact" className="signal-btn-primary inline-block">
              Start a conversation
            </Link>
          </div>
        </GlassPanel>
      </Section>
    </>
  );
}
