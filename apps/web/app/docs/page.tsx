import Link from "next/link";
import { PageHero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { GlassPanel } from "@/components/GlassPanel";
import { CardHeader } from "@/components/CardHeader";
import { CardFooter } from "@/components/CardFooter";
import { DOCS_SECTIONS } from "@/lib/data/docs-sections";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Docs",
  "Developer hub for G1 Signals Lab.",
  "/docs"
);

export default function DocsPage() {
  return (
    <>
      <PageHero
        eyebrow="// DOCS"
        title="Developer hub"
        subtitle="Full docs subdomain deferred — stub pages for each section below."
      />
      <Section>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {DOCS_SECTIONS.map((s) => (
            <Link key={s.slug} href={`/docs/${s.slug}`} className="focus-ring block">
              <GlassPanel className="h-full p-5" hover>
                <CardHeader label="DOCUMENTATION" />
                <h3 className="text-[11px] font-medium uppercase tracking-[var(--tracking-label)] text-white mb-1">
                  {s.title}
                </h3>
                <p className="text-[11px] font-light uppercase tracking-[var(--tracking-telemetry)] text-text-muted">
                  {s.desc}
                </p>
                <CardFooter />
              </GlassPanel>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
