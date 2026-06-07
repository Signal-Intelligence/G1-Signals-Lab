import { PlatformBrief } from "@/components/PlatformBrief";
import { pageMetadata } from "@/lib/metadata";
import { PQC_SECTIONS } from "@/lib/data/platform-briefs";

export const metadata = pageMetadata(
  "Post-Quantum",
  "FIPS 203/204 cipher migration and CBOM lifecycle.",
  "/platform/pqc"
);

export default function PqcPage() {
  return (
    <PlatformBrief
      eyebrow="// PLATFORM — POST-QUANTUM"
      title="FIPS 203 / 204 migration"
      subtitle="ML-KEM encapsulation, ML-DSA signatures, and quantum cipher interlocks."
      sections={PQC_SECTIONS}
    />
  );
}
