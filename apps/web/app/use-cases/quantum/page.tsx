import { PageHero } from "@/components/Hero";
import { UseCaseTemplate } from "@/components/UseCaseTemplate";
import { pageMetadata } from "@/lib/metadata";
import { UC2_PHASES } from "@/lib/data/narrative";
import { QUANTUM_METRICS, QUANTUM_STANDARDS, QUANTUM_ARTIFACTS } from "@/lib/data/use-cases";

export const metadata = pageMetadata(
  "PQC Migration",
  "CBOM-driven post-quantum migration with quantum cipher enforcement interlocks.",
  "/use-cases/quantum"
);

export default function QuantumPage() {
  return (
    <>
      <PageHero
        eyebrow="// USE CASE 02 — PQC / CBOM"
        title="CBOM-driven PQC migration governed by quantum cipher interlocks."
        subtitle="Morning governance surfaces CBOM discovery, executive summary, and PQC-only / hybrid / classical-allowed interlock states."
      />
      <UseCaseTemplate
        phases={UC2_PHASES}
        metrics={QUANTUM_METRICS}
        standards={QUANTUM_STANDARDS}
        artifacts={QUANTUM_ARTIFACTS}
      />
    </>
  );
}
