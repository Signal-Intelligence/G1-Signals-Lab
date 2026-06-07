import { GlassPanel } from "@/components/GlassPanel";
import { ARCHITECTURE_PILLARS } from "@/lib/data/architecture-data";

export function TrustPillarCards() {
  return (
    <div className="space-y-6">
      {ARCHITECTURE_PILLARS.map((pillar) => (
        <GlassPanel key={pillar.title} className="p-6" accentBorder="accent-blue">
          <div className="flex items-start gap-5">
            <div className="w-12 h-12 flex items-center justify-center border border-accent-blue/25 flex-shrink-0">
              <span className="text-accent-blue text-xl">{pillar.icon}</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <h3 className="text-[13px] font-medium uppercase tracking-[var(--tracking-label)] text-white">
                  {pillar.title}
                </h3>
                <span className="text-[11px] uppercase tracking-[var(--tracking-telemetry)] text-text-muted">
                  {pillar.subtitle}
                </span>
              </div>
              <p className="text-sm font-light text-text-secondary leading-relaxed mb-4">
                {pillar.description}
              </p>
              <div className="grid gap-3 md:grid-cols-3">
                {pillar.details.map((item) => (
                  <div key={item.label} className="border-l border-border-accent pl-3">
                    <p className="text-[11px] font-medium uppercase tracking-[var(--tracking-telemetry)] text-accent-blue mb-1">
                      {item.label}
                    </p>
                    <p className="text-[11px] font-light text-text-muted leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </GlassPanel>
      ))}
    </div>
  );
}
