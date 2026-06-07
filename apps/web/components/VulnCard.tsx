import { GlassPanel } from "@/components/GlassPanel";
import { CardHeader } from "@/components/CardHeader";
import { CardFooter } from "@/components/CardFooter";
import { KpiStrip } from "@/components/KpiStrip";
import type { Vulnerability } from "@/lib/data/vulnerabilities";

const SEVERITY_ACCENT: Record<string, string> = {
  Critical: "severity-critical",
  High: "severity-high",
  Medium: "severity-medium",
  Low: "accent-blue",
};

const SEVERITY_DOT: Record<string, string> = {
  Critical: "bg-severity-critical",
  High: "bg-severity-high",
  Medium: "bg-severity-medium",
  Low: "bg-text-muted",
};

const SEVERITY_GLOW: Record<string, string> = {
  Critical: "var(--color-glow-critical)",
  High: "var(--color-glow-high)",
  Medium: "var(--color-glow-medium)",
  Low: "var(--color-glow-blue)",
};

export function VulnCard({ vuln }: { vuln: Vulnerability }) {
  return (
    <GlassPanel
      className="p-5"
      accentBorder={SEVERITY_ACCENT[vuln.severity] ?? "accent-blue"}
      glowColor={SEVERITY_GLOW[vuln.severity]}
      hover
    >
      <CardHeader
        label={`${vuln.severity} — ${vuln.cve}`}
        dotColor={SEVERITY_DOT[vuln.severity] ?? "bg-accent-blue"}
      />
      <h3 className="font-extralight text-xl text-white leading-tight mb-2 text-glow-sm">
        {vuln.title}
      </h3>
      <p className="text-xs font-light text-text-muted uppercase tracking-[var(--tracking-telemetry)] mb-4">
        {vuln.affectedSystem}
      </p>
      <KpiStrip
        items={[
          { label: "CVSS", value: vuln.cvss.toFixed(1), accent: "text-severity-critical" },
          { label: "EPSS", value: vuln.epss.toFixed(2) },
          { label: "KEV", value: vuln.kev ? "YES" : "NO", accent: vuln.kev ? "text-severity-critical" : undefined },
          { label: "CHAINABILITY", value: vuln.chainability.toFixed(2) },
        ]}
      />
      <div className="callout-accent mt-4">
        <span className="eyebrow block mb-1">{"// CLASSIFICATION"}</span>
        <p className="text-[11px] font-light text-text-muted leading-snug">{vuln.cweCategory}</p>
      </div>
      <CardFooter timestamp={`${vuln.ageDays}d old`} />
    </GlassPanel>
  );
}
