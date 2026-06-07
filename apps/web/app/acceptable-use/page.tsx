import { LegalPageTemplate, LegalSection } from "@/components/LegalPageTemplate";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Acceptable Use",
  "Acceptable use policy for the G1 Signals Lab website.",
  "/acceptable-use"
);

export default function AcceptableUsePage() {
  return (
    <LegalPageTemplate
      title="Acceptable use policy"
      lastUpdated="June 2026"
      intro="This policy outlines permitted and prohibited uses of the G1 Signals Lab website."
    >
      <LegalSection title="Permitted use">
        <ul className="list-disc list-inside space-y-1">
          <li>Viewing and evaluating product information</li>
          <li>Using the interactive lab dashboard for evaluation purposes</li>
          <li>Submitting contact and access request forms</li>
          <li>Sharing links to public pages</li>
        </ul>
      </LegalSection>

      <LegalSection title="Prohibited use">
        <ul className="list-disc list-inside space-y-1">
          <li>Attempting to access non-public systems or data</li>
          <li>Reverse engineering site infrastructure or security measures</li>
          <li>Automated scraping or data extraction</li>
          <li>Misrepresenting affiliation with G1 Signals</li>
          <li>Using information from this site to develop competing products</li>
          <li>Any activity that violates applicable law including the Criminal Code of Canada</li>
        </ul>
      </LegalSection>

      <LegalSection title="Enforcement">
        <p>
          G1 Signals reserves the right to restrict or terminate access to this
          site for any user who violates this policy, without notice. Violations may be
          reported to appropriate authorities.
        </p>
      </LegalSection>
    </LegalPageTemplate>
  );
}
