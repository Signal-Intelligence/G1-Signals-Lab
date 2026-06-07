import Link from "next/link";
import { PageHero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { GlassPanel } from "@/components/GlassPanel";
import { CardHeader } from "@/components/CardHeader";
import { CardFooter } from "@/components/CardFooter";
import { pageMetadata } from "@/lib/metadata";
import { CASES } from "@/lib/data/use-cases";

export const metadata = pageMetadata("Use Cases", "Governed autonomy scenarios for enterprise and sovereign buyers.", "/use-cases");

export default function UseCasesIndexPage() {
  return (
    <>
      <PageHero
        eyebrow="// USE CASES"
        title="Governed autonomy in production"
        subtitle="Investor-grade narratives backed by fixture data and catalog-registered surfaces."
      />
      <Section>
        <div className="grid gap-4 md:grid-cols-3">
          {CASES.map((c) => (
            <Link key={c.href} href={c.href} className="focus-ring block">
              <GlassPanel className="h-full p-5" hover>
                <CardHeader label={c.label} />
                <h3 className="font-extralight text-lg text-white text-glow-sm mb-2">{c.title}</h3>
                <p className="text-sm font-light text-text-secondary leading-relaxed">{c.desc}</p>
                <CardFooter />
              </GlassPanel>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
