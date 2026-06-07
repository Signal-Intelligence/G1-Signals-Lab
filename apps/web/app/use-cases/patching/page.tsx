import { PageHero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { UseCaseTemplate } from "@/components/UseCaseTemplate";
import { VulnCard } from "@/components/VulnCard";
import { UC1_PHASES } from "@/lib/data/narrative";
import { DEMO_VULNERABILITIES } from "@/lib/data/vulnerabilities";
import { PATCHING_METRICS, PATCHING_STANDARDS, PATCHING_ARTIFACTS } from "@/lib/data/use-cases";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Autonomous Patching",
  "CVE chain detection through overnight Level-4 remediation with cryptographic evidence.",
  "/use-cases/patching"
);

export default function PatchingPage() {
  return (
    <>
      <PageHero
        eyebrow="// USE CASE 01 — AUTONOMOUS PATCHING"
        title="From chain detection to overnight remediation"
        subtitle="CVE-2026-901A → CVE-2026-3142 chaining across the edge mesh, governed by KERI attestation and Bill C-8 scope."
      />
      <UseCaseTemplate
        phases={UC1_PHASES}
        metrics={PATCHING_METRICS}
        standards={PATCHING_STANDARDS}
        artifacts={PATCHING_ARTIFACTS}
        extra={
          <Section eyebrow="// VULNERABILITY CHAIN">
            <div className="grid gap-6 md:grid-cols-2">
              {DEMO_VULNERABILITIES.map((v) => (
                <VulnCard key={v.id} vuln={v} />
              ))}
            </div>
          </Section>
        }
      />
    </>
  );
}
