import { LegalPageTemplate, LegalSection } from "@/components/LegalPageTemplate";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Cookies",
  "Cookie policy for the G1 Signals Lab website.",
  "/cookies"
);

export default function CookiesPage() {
  return (
    <LegalPageTemplate
      title="Cookie policy"
      lastUpdated="June 2026"
      intro="This policy explains how G1 Signals Lab uses cookies and similar technologies."
    >
      <LegalSection title="Essential cookies">
        <p>
          We use minimal essential cookies for site functionality: session management,
          security tokens, and user preferences (e.g., reduced motion settings). These
          cannot be disabled.
        </p>
      </LegalSection>

      <LegalSection title="Analytics">
        <p>
          We may use privacy-respecting analytics to understand aggregate usage patterns.
          No personally identifiable information is collected through analytics cookies.
        </p>
      </LegalSection>

      <LegalSection title="What we do not use">
        <ul className="list-disc list-inside space-y-1">
          <li>No third-party advertising cookies</li>
          <li>No social media tracking pixels</li>
          <li>No cross-site tracking</li>
          <li>No fingerprinting techniques</li>
        </ul>
      </LegalSection>

      <LegalSection title="Managing cookies">
        <p>
          You can control cookies through your browser settings. Disabling essential cookies
          may affect site functionality. For instructions, consult your browser&apos;s
          documentation.
        </p>
      </LegalSection>
    </LegalPageTemplate>
  );
}
