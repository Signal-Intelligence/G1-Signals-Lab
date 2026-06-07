import { PlatformBrief } from "@/components/PlatformBrief";
import { pageMetadata } from "@/lib/metadata";
import { KERI_VLEI_SECTIONS } from "@/lib/data/platform-briefs";

export const metadata = pageMetadata(
  "KERI / vLEI",
  "Decentralized identity and biometric break-glass attestation.",
  "/platform/keri-vlei"
);

export default function KeriPage() {
  return (
    <PlatformBrief
      eyebrow="// PLATFORM — KERI / vLEI"
      title="Decentralized identity"
      subtitle="Autonomic identifiers (AIDs) with vLEI attestation and Teams break-glass flow."
      sections={KERI_VLEI_SECTIONS}
    />
  );
}
