import { PageHero } from "@/components/Hero";
import { Section } from "@/components/Section";

interface LegalSectionProps {
  title: string;
  children: React.ReactNode;
}

export function LegalSection({ title, children }: LegalSectionProps) {
  return (
    <section className="py-4 border-b border-border-subtle last:border-b-0">
      <h2 className="text-sm font-medium text-white mb-2">{title}</h2>
      <div className="space-y-2 text-sm font-light text-text-secondary leading-relaxed pl-4">
        {children}
      </div>
    </section>
  );
}

interface LegalPageTemplateProps {
  eyebrow?: string;
  title: string;
  lastUpdated: string;
  intro: string;
  children: React.ReactNode;
}

export function LegalPageTemplate({ eyebrow = "// LEGAL", title, lastUpdated, intro, children }: LegalPageTemplateProps) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} />
      <Section className="!pt-6">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[11px] font-light italic text-text-muted">
              Last updated: {lastUpdated}
            </span>
            <span className="h-px flex-1 bg-border-subtle" />
          </div>
          <p className="text-sm font-light text-text-secondary leading-relaxed mb-6">
            {intro}
          </p>
          <div className="border-t border-border-subtle">
            {children}
          </div>
        </div>
      </Section>
    </>
  );
}
