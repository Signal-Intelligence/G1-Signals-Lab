import Link from "next/link";
import { GlassPanel } from "@/components/GlassPanel";
import { CardHeader } from "@/components/CardHeader";
import { CardFooter } from "@/components/CardFooter";

export function TierCard({
  name,
  audience,
  includes,
}: {
  name: string;
  audience: string;
  includes: string[];
}) {
  return (
    <GlassPanel className="flex h-full flex-col p-5" hover>
      <CardHeader label="ENGAGEMENT TIER" />
      <h3 className="font-extralight text-xl text-white leading-tight mb-2 text-glow-sm">
        {name}
      </h3>
      <p className="text-xs font-light text-text-muted uppercase tracking-[var(--tracking-telemetry)] mb-5">
        {audience}
      </p>
      <div className="callout-accent flex-1">
        <span className="eyebrow block mb-2">{"// INCLUDES"}</span>
        <ul className="space-y-2">
          {includes.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="connector-dot mt-1.5 flex-shrink-0" />
              <span className="text-[11px] font-light text-text-secondary leading-snug">{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <Link href="/contact" className="signal-btn-primary mt-6 block text-center">
        Contact us
      </Link>
      <CardFooter />
    </GlassPanel>
  );
}
