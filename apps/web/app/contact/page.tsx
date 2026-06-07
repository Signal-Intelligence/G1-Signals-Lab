import { PageHero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { ContactForm } from "@/components/ContactForm";
import { GlassPanel } from "@/components/GlassPanel";
import { CardHeader } from "@/components/CardHeader";
import { CardFooter } from "@/components/CardFooter";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Contact",
  "Book a demo or reach G1 Signals.",
  "/contact"
);

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="// CONTACT"
        title="Request access"
        subtitle="Design partners, government buyers, and investors — we respond within two business days."
      />
      <Section>
        <div className="grid gap-8 lg:grid-cols-2">
          <ContactForm />
          <div className="space-y-4">
            <GlassPanel className="p-5">
              <CardHeader label="DIRECT LINES" />
              <div className="space-y-3">
                {[
                  { email: "investors@signalintelligence.inc", label: "INVESTORS" },
                  { email: "partners@signalintelligence.inc", label: "PARTNERS" },
                  { email: "security@signalintelligence.inc", label: "SECURITY" },
                  { email: "press@signalintelligence.inc", label: "PRESS" },
                ].map((line) => (
                  <div key={line.email} className="flex items-center gap-3 py-1">
                    <span className="connector-dot" />
                    <span className="text-[11px] font-medium uppercase tracking-[var(--tracking-label)] text-text-muted w-20">
                      {line.label}
                    </span>
                    <a
                      href={`mailto:${line.email}`}
                      className="focus-ring text-sm font-light text-text-secondary hover:text-accent-blue transition-colors"
                    >
                      {line.email}
                    </a>
                  </div>
                ))}
              </div>
              <CardFooter />
            </GlassPanel>
            <GlassPanel className="flex h-48 items-center justify-center p-5">
              <span className="telemetry">Calendly embed placeholder</span>
            </GlassPanel>
          </div>
        </div>
      </Section>
    </>
  );
}
