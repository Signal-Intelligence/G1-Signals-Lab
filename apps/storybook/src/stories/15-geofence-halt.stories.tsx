import type { Meta, StoryObj } from "@storybook/react";
import { GeofenceHaltCard } from "../components/GeofenceHaltCard";
import { CELL_ONE_ECHO, TRUST_TIMELINE, NIST_POSTURE_BASELINE } from "../data/demo-fixtures";
import type { SignalsUiEnvelope } from "../types/signals-ui-envelope";

const meta: Meta<typeof GeofenceHaltCard> = {
  title: "Signal Components/15 — Geofence Halt Card",
  component: GeofenceHaltCard,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof GeofenceHaltCard>;

export const Default: Story = {
  args: {},
};

export const Compact: Story = {
  args: {
    compact: true,
  },
};

export const WithEnvelope: Story = {
  args: {
    ...Default.args,
    envelope: {
      hsmlState: "HSML_ACTIVE",
      confidence: TRUST_TIMELINE[0],
      emittingCell: CELL_ONE_ECHO,
      nistPosture: NIST_POSTURE_BASELINE[3],
      said: "E_DEMO_SAID_ENVELOPE",
    } satisfies SignalsUiEnvelope,
  },
};
