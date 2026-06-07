import type { Meta, StoryObj } from "@storybook/react";
import { TeamsNotificationCard } from "../components/TeamsNotificationCard";
import { GEOFENCE_DATA, CELL_ONE_ECHO, TRUST_TIMELINE, NIST_POSTURE_BASELINE } from "../data/demo-fixtures";
import type { SignalsUiEnvelope } from "../types/signals-ui-envelope";

const meta: Meta<typeof TeamsNotificationCard> = {
  title: "Signal Components/13 — Teams Notification Card",
  component: TeamsNotificationCard,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof TeamsNotificationCard>;

export const BreakGlass: Story = {
  args: {
    kpis: [
      { label: "CHAIN LENGTH", value: "3", accent: "text-accent-danger" },
      { label: "DELTA KM", value: "+2,714", accent: "text-amber-400" },
      { label: "C-8 GATE", value: "ASSERTED", accent: "text-accent-green" },
    ],
    bullets: [
      {
        header: "CHAIN PATH",
        items: [
          "Host-01 (Cisco ASA 5545-X VPN) → CVE-2026-901A → RCE",
          "Host-02 (ASA Mgmt Plane) → CVE-2026-3142 → Auth Bypass",
          "Host-04 (Honeywell PHD Historian) → Lateral via vendor credentials",
        ],
      },
      {
        header: "GEOFENCE",
        items: [
          `Expected: ${GEOFENCE_DATA.expectedZone}`,
          `Detected: ${GEOFENCE_DATA.detectedZone}`,
        ],
      },
    ],
  },
};

export const WithEnvelope: Story = {
  args: {
    ...BreakGlass.args,
    envelope: {
      hsmlState: "HSML_ACTIVE",
      confidence: TRUST_TIMELINE[0],
      emittingCell: CELL_ONE_ECHO,
      nistPosture: NIST_POSTURE_BASELINE[3],
      said: "E_DEMO_SAID_ENVELOPE",
    } satisfies SignalsUiEnvelope,
  },
};
