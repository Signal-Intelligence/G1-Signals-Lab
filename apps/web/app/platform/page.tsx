import Link from "next/link";
import { PageHero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { GlassPanel } from "@/components/GlassPanel";
import { CardHeader } from "@/components/CardHeader";
import { CardFooter } from "@/components/CardFooter";
import { pageMetadata } from "@/lib/metadata";
import { PLATFORM_PAGES } from "@/lib/data/platform-index";

export const metadata = pageMetadata("Platform", "Technical briefs for G1 platform pillars.", "/platform");

export default function PlatformIndexPage() {
  return (
    <>
      <PageHero eyebrow="// PLATFORM" title="Technical briefs" />
      <Section>
        <div className="grid gap-3 md:grid-cols-2">
          {PLATFORM_PAGES.map((p) => (
            <Link key={p.href} href={p.href} className="focus-ring block">
              <GlassPanel className="p-5" hover>
                <CardHeader label="PLATFORM BRIEF" />
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 flex items-center justify-center border border-border-accent rounded-sm flex-shrink-0">
                    <span className="text-accent-blue text-base">{p.icon}</span>
                  </div>
                  <div>
                    <h3 className="text-[11px] font-medium uppercase tracking-[var(--tracking-label)] text-white mb-0.5">
                      {p.title}
                    </h3>
                    <p className="text-[11px] font-light uppercase tracking-[var(--tracking-telemetry)] text-text-muted">
                      {p.desc}
                    </p>
                  </div>
                </div>
                <CardFooter />
              </GlassPanel>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
