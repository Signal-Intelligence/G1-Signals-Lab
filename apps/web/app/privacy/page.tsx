import { LegalPageTemplate, LegalSection } from "@/components/LegalPageTemplate";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Privacy",
  "Privacy policy for the G1 Signals Lab website.",
  "/privacy"
);

export default function PrivacyPage() {
  return (
    <LegalPageTemplate
      title="Privacy policy"
      lastUpdated="June 2026"
      intro="G1 Signals is committed to protecting your privacy. This policy explains what information we collect through the G1 Signals Lab website and how we use it."
    >
      <LegalSection title="What we collect">
        <ul className="list-disc list-inside space-y-1">
          <li>Contact form submissions (name, email, organization, message)</li>
          <li>Basic analytics (page views, session duration, referral source)</li>
          <li>Technical data (browser type, device type, IP address for security)</li>
        </ul>
      </LegalSection>

      <LegalSection title="What we do not collect">
        <ul className="list-disc list-inside space-y-1">
          <li>No passwords or credentials</li>
          <li>No classified or sensitive operational data</li>
          <li>No biometric data</li>
          <li>No third-party tracking cookies</li>
          <li>No data from the interactive lab demos</li>
        </ul>
      </LegalSection>

      <LegalSection title="How we use your information">
        <ul className="list-disc list-inside space-y-1">
          <li>Respond to inquiries</li>
          <li>Improve the website</li>
          <li>Ensure site security</li>
          <li>Comply with legal obligations including Canadian privacy law (PIPEDA)</li>
        </ul>
      </LegalSection>

      <LegalSection title="Data retention">
        <ul className="list-disc list-inside space-y-1">
          <li>Contact form submissions retained for 12 months then deleted</li>
          <li>Analytics data aggregated and anonymized within 90 days</li>
        </ul>
      </LegalSection>

      <LegalSection title="Your rights">
        <p>Under PIPEDA and applicable law, you have the right to:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Access your data</li>
          <li>Request correction</li>
          <li>Request deletion</li>
          <li>Withdraw consent</li>
        </ul>
        <p>Contact privacy@signalintelligence.ai to exercise these rights.</p>
      </LegalSection>

      <LegalSection title="Changes to this policy">
        <p>
          We may update this policy periodically. The &ldquo;last updated&rdquo; date at the
          top governs.
        </p>
      </LegalSection>
    </LegalPageTemplate>
  );
}
