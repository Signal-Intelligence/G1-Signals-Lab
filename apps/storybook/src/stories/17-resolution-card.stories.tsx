import type { Meta, StoryObj } from "@storybook/react";
import { ResolutionCard } from "../components/ResolutionCard";
import { CELL_ONE_GHOST, TRUST_TIMELINE, NIST_POSTURE_BASELINE } from "../data/demo-fixtures";
import type { SignalsUiEnvelope } from "../types/signals-ui-envelope";

const meta: Meta<typeof ResolutionCard> = {
  title: "Signal Components/17 — Resolution Card",
  component: ResolutionCard,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof ResolutionCard>;

export const EnclaveVerified: Story = {
  args: {
    events: [
      { time: "02:17", event: "vLEI credential validated via KERI witness network" },
      { time: "02:17", event: "iPhone Secure Enclave signature verified (Face ID)" },
      { time: "02:18", event: "Microledger KEL event #4291 sealed" },
      { time: "02:18", event: "Geofence bypass LEVEL_4 authorized — confidence restored to HIGH" },
    ],
  },
};

export const MinimalResolution: Story = {
  args: {
    title: "Compliance Gate Verified",
    kpis: [
      { label: "GATE", value: "C-8 §9/§15", accent: "text-accent-green" },
      { label: "STATUS", value: "VERIFIED", accent: "text-accent-green" },
    ],
    events: [
      { time: "07:00", event: "Bill C-8 continuous mitigation evidence package sealed" },
    ],
  },
};

export const WithEnvelope: Story = {
  args: {
    ...EnclaveVerified.args,
    envelope: {
      hsmlState: "HSML_ACTIVE",
      confidence: TRUST_TIMELINE[0],
      emittingCell: CELL_ONE_GHOST,
      nistPosture: NIST_POSTURE_BASELINE[5],
      said: "E_DEMO_SAID_ENVELOPE",
    } satisfies SignalsUiEnvelope,
  },
};
