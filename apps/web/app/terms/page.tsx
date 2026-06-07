import { LegalPageTemplate, LegalSection } from "@/components/LegalPageTemplate";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Terms",
  "Terms of service for the G1 Signals Lab website.",
  "/terms"
);

export default function TermsPage() {
  return (
    <LegalPageTemplate
      title="Terms of service"
      lastUpdated="June 2026"
      intro="By accessing the G1 Signals Lab website, you agree to these terms. If you do not agree, please discontinue use."
    >
      <LegalSection title="Use of this site">
        <p>
          This website is for informational and evaluation purposes. No account creation is
          required. The interactive lab dashboard uses fixture data and does not connect to
          live systems.
        </p>
      </LegalSection>

      <LegalSection title="Intellectual property">
        <p>
          All content, code architecture descriptions, product names (CYPHER ONE, STRATOS ONE),
          and visual design are the property of G1 Signals. You may not reproduce,
          distribute, or create derivative works without written permission.
        </p>
      </LegalSection>

      <LegalSection title="Product descriptions">
        <p>
          Product capabilities described on this site represent current development targets.
          The lab dashboard demonstrates architecture concepts using simulated data. Nothing
          on this site constitutes a warranty or guarantee of specific capabilities.
        </p>
      </LegalSection>

      <LegalSection title="Limitation of liability">
        <p>
          G1 Signals provides this site &ldquo;as is&rdquo; without warranties
          of any kind. We are not liable for any damages arising from your use of or inability
          to use this site.
        </p>
      </LegalSection>

      <LegalSection title="Governing law">
        <p>
          These terms are governed by the laws of the Province of Ontario and the federal laws
          of Canada applicable therein. Any disputes shall be resolved in the courts of Ontario.
        </p>
      </LegalSection>

      <LegalSection title="Changes to these terms">
        <p>
          We reserve the right to modify these terms at any time. Continued use after changes
          constitutes acceptance. The &ldquo;last updated&rdquo; date governs.
        </p>
      </LegalSection>
    </LegalPageTemplate>
  );
}
