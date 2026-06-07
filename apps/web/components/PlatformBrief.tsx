import { PageHero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { GlassPanel } from "@/components/GlassPanel";
import { CardHeader } from "@/components/CardHeader";
import { CardFooter } from "@/components/CardFooter";

export function PlatformBrief({
  eyebrow,
  title,
  subtitle,
  sections,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  sections: { heading: string; body: string }[];
}) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} subtitle={subtitle} />
      {sections.map((s, i) => (
        <Section key={s.heading} eyebrow={`// ${s.heading.toUpperCase()}`}>
          <GlassPanel className="p-5" hover>
            <CardHeader label={s.heading.toUpperCase()} />
            <div className="callout-accent">
              <span className="eyebrow block mb-2">{"// DETAIL"}</span>
              <p className="text-sm font-light text-text-secondary leading-relaxed">{s.body}</p>
            </div>
            <CardFooter label={`G1 SIGNALS LAB // SECTION ${String(i + 1).padStart(2, "0")}`} />
          </GlassPanel>
        </Section>
      ))}
    </>
  );
}
