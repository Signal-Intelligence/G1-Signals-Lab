import { PageHero } from "@/components/Hero";

export default function StratosLabPage() {
  return (
    <>
      <PageHero
        eyebrow="// STRATOS ONE — IMPLEMENTATION DASHBOARD"
        title="Stratos Lab"
        subtitle="The STRATOS ONE implementation dashboard is currently under development."
      />
      <div className="px-6 md:px-12 lg:px-32 pb-24">
        <div className="glass-panel max-w-2xl p-8 text-center">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full border border-accent-blue/30 bg-accent-blue/10 mb-6">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent-blue)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </div>
          <h2 className="text-2xl md:text-3xl font-extralight text-white text-glow-sm">
            Coming Soon
          </h2>
          <p className="mt-4 text-sm font-light text-text-secondary leading-relaxed max-w-md mx-auto">
            The STRATOS ONE agentic dashboard is being built. Check back for live telemetry, trust scores, and execution logs for the Stratos ecosystem.
          </p>
        </div>
      </div>
    </>
  );
}
