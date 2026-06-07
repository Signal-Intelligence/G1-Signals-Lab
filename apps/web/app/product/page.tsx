import { PageHero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { ProductGallery } from "@/components/ProductGallery";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Product",
  "The Signals UI Catalog — if not declared, it cannot be rendered.",
  "/product"
);

export default function ProductPage() {
  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "G1 Signals UI Catalog",
          applicationCategory: "SecurityApplication",
          description:
            "Registered, NIST-mapped, cell-owned UI contract registry for agentic security.",
        })}
      </script>
      <PageHero
        eyebrow="// PRODUCT — SIGNALS UI CATALOG"
        title="The catalog is the contract."
        subtitle="If not declared in the Catalog, it cannot be rendered. Every visual surface is a registered, NIST-mapped, cell-owned contract."
      />
      <Section eyebrow="// SECTION 01 — GALLERY">
        <ProductGallery />
      </Section>
    </>
  );
}
