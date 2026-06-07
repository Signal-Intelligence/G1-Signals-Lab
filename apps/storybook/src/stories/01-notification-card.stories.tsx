import type { Meta, StoryObj } from "@storybook/react";
import { NotificationCard } from "../components/NotificationCard";
import { DEMO_VULNERABILITIES, CELL_ONE_ECHO, TRUST_TIMELINE, NIST_POSTURE_BASELINE } from "../data/demo-fixtures";
import type { SignalsUiEnvelope } from "../types/signals-ui-envelope";

const chainNodes = DEMO_VULNERABILITIES.map((v) => ({
  id: v.id,
  cve: v.cve,
  cvss: v.cvss,
  system: v.affectedSystem,
  label: v.title,
}));

const meta: Meta<typeof NotificationCard> = {
  title: "Signal Components/01 — Notification Card",
  component: NotificationCard,
  tags: ["autodocs"],
  argTypes: {
    severity: { control: "select", options: ["Critical", "High", "Medium", "Low"] },
    systemCount: { control: { type: "number", min: 1, max: 100 } },
    vulnCount: { control: { type: "number", min: 1, max: 50 } },
  },
};
export default meta;
type Story = StoryObj<typeof NotificationCard>;

export const CriticalChain: Story = {
  args: {
    severity: "Critical",
    title: "Chaining Vulnerability Detected",
    systemCount: 3,
    vulnCount: 2,
    chainSummary: "CVE-2026-901A (Cisco ASA 5545-X VPN RCE) chains with CVE-2026-3142 (ASA management plane auth bypass) via compromised Honeywell vendor credentials to Host-04 Honeywell PHD Historian. ArcaneDoor (UAT4356) IOCs confirmed. Bill C-8 §15 incident reporting gate ASSERTED — 72h CSE notification window active.",
    timestamp: "02:15 AM — June 1, 2026",
    chainNodes,
  },
};

export const HighSeverity: Story = {
  args: {
    severity: "High",
    title: "Elevated Exploit Probability on Pipeline Edge Assets",
    systemCount: 2,
    vulnCount: 1,
    threatType: "ACTIVE EXPLOITATION CONFIRMED — KEV CATALOG",
    metrics: [
      { value: "0.89", label: "EPSS SCORE", accent: "text-severity-high" },
      { value: "CVE-2026-901A", label: "PRIMARY CVE" },
      { value: "CONFIRMED", label: "KEV STATUS", accent: "text-severity-high" },
    ],
    chainSummary: "EPSS score 0.89 for CVE-2026-901A indicates active exploitation within 30 days. Confirmed in CISA KEV catalog. Host-01 Cisco ASA 5545-X VPN Gateway is internet-facing — primary entry point for Calgary HQ and Honeywell vendor remote access on Prairie Fuels perimeter.",
    timestamp: "02:15 AM — June 1, 2026",
  },
};

export const MediumSeverity: Story = {
  args: {
    severity: "Medium",
    title: "Allen-Bradley ControlLogix 5580 Firmware Signing (RSA-1024)",
    systemCount: 1,
    vulnCount: 1,
    threatType: "QUANTUM VULNERABLE — ZERO CRYPTO-AGILITY",
    metrics: [
      { value: "0.96", label: "RISK SCORE", accent: "text-severity-medium" },
      { value: "1024", label: "KEY LENGTH" },
      { value: "NONE", label: "AGILITY", accent: "text-accent-danger" },
    ],
    chainSummary: "Allen-Bradley ControlLogix 5580 PLCs use RSA-1024 for Rockwell FactoryTalk firmware signing with zero crypto-agility. Requires physical firmware replacement — Rockwell vendor coordination critical. Flagged for Prairie Fuels PQC migration plan under Bill C-8 §9(1)(e).",
    timestamp: "08:35 AM — June 1, 2026",
  },
};

export const LowSeverity: Story = {
  args: {
    severity: "Low",
    title: "Information Disclosure in Development API Endpoint",
    systemCount: 1,
    threatType: "NON-PRODUCTION ASSET — INFORMATIONAL",
    metrics: [
      { value: "2.1", label: "CVSS" },
      { value: "0.03", label: "EPSS SCORE" },
    ],
    chainSummary: "Debug endpoint on dev-api-07 returns verbose error traces. Non-production asset with no business-critical data exposure — flagged for developer awareness.",
    timestamp: "09:00 AM — June 1, 2026",
  },
};

export const WithEnvelope: Story = {
  args: {
    ...CriticalChain.args,
    envelope: {
      hsmlState: "HSML_ACTIVE",
      confidence: TRUST_TIMELINE[0],
      emittingCell: CELL_ONE_ECHO,
      nistPosture: NIST_POSTURE_BASELINE[3],
      said: "E_DEMO_SAID_ENVELOPE",
    } satisfies SignalsUiEnvelope,
  },
};
