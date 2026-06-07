import { PlatformBrief } from "@/components/PlatformBrief";
import { pageMetadata } from "@/lib/metadata";
import { HSML_SECTIONS } from "@/lib/data/platform-briefs";

export const metadata = pageMetadata(
  "HSML / HSTP-1.0",
  "IEEE 2874 transport protocol and packet anatomy.",
  "/platform/hsml"
);

export default function HsmlPage() {
  return (
    <PlatformBrief
      eyebrow="// PLATFORM — IEEE 2874"
      title="HSTP-1.0 transport"
      subtitle="Policy-governed secure state machine language with signalsUiCatalogId resolver invariant."
      sections={HSML_SECTIONS}
    />
  );
}
