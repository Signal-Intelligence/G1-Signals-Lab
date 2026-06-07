import type { Meta, StoryObj } from "@storybook/react";
import { BillC8MandateCard } from "../components/BillC8MandateCard";
import { CELL_ONE_INTEL, TRUST_TIMELINE, NIST_POSTURE_BASELINE } from "../data/demo-fixtures";
import type { SignalsUiEnvelope } from "../types/signals-ui-envelope";

const meta: Meta<typeof BillC8MandateCard> = {
  title: "Signal Components/16 — Bill C-8 Mandate Card",
  component: BillC8MandateCard,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof BillC8MandateCard>;

export const Default: Story = {
  args: {},
};

export const Bypassed: Story = {
  args: {
    kpis: [
      { label: "OPERATOR", value: "PRAIRIE FUELS" },
      { label: "CLAUSE", value: "§9 / §15" },
      { label: "LIABILITY", value: "72h", accent: "text-amber-400" },
      { label: "GATE STATUS", value: "BYPASS", accent: "text-amber-400" },
    ],
  },
};

export const WithEnvelope: Story = {
  args: {
    ...Default.args,
    envelope: {
      hsmlState: "HSML_ACTIVE",
      confidence: TRUST_TIMELINE[0],
      emittingCell: CELL_ONE_INTEL,
      nistPosture: NIST_POSTURE_BASELINE[0],
      said: "E_DEMO_SAID_ENVELOPE",
    } satisfies SignalsUiEnvelope,
  },
};
