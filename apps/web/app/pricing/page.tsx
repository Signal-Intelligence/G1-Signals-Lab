import { PageHero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { TierCard } from "@/components/TierCard";
import { pageMetadata } from "@/lib/metadata";
import { TIERS } from "@/lib/data/pricing";

export const metadata = pageMetadata(
  "Pricing",
  "Design Partner, Lab Access, and Federal / Sovereign tiers — contact us for engagement.",
  "/pricing"
);

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="// PRICING"
        title="Engagement tiers"
        subtitle="No published prices — every engagement is scoped to your sovereignty and compliance requirements."
      />
      <Section>
        <div className="grid gap-4 lg:grid-cols-3">
          {TIERS.map((t) => (
            <TierCard key={t.name} {...t} />
          ))}
        </div>
      </Section>
    </>
  );
}
