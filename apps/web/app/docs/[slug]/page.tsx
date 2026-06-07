import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { GlassPanel } from "@/components/GlassPanel";
import { CardHeader } from "@/components/CardHeader";
import { CardFooter } from "@/components/CardFooter";
import { DOCS_SECTIONS } from "@/lib/data/docs-sections";
import { pageMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return DOCS_SECTIONS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const section = DOCS_SECTIONS.find((s) => s.slug === slug);
  if (!section) return {};
  return pageMetadata(section.title, section.desc, `/docs/${slug}`);
}

export default async function DocsStubPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const section = DOCS_SECTIONS.find((s) => s.slug === slug);
  if (!section) notFound();

  return (
    <>
      <PageHero eyebrow="// DOCS" title={section.title} subtitle={section.desc} />
      <Section>
        <GlassPanel className="max-w-2xl p-5">
          <CardHeader label="COMING SOON" />
          <div className="callout-accent">
            <span className="eyebrow block mb-2">{"// STATUS"}</span>
            <p className="text-sm font-light text-text-secondary leading-relaxed">
              Documentation for <strong className="text-white">{section.title}</strong> is coming soon.
              Full developer portal will ship on a dedicated subdomain.
            </p>
          </div>
          <div className="mt-6">
            <Link href="/docs" className="signal-btn-secondary inline-block">
              ← Back to docs hub
            </Link>
          </div>
          <CardFooter />
        </GlassPanel>
      </Section>
    </>
  );
}
