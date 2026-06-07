import type { Meta, StoryObj } from "@storybook/react";
import { QuantumInterlockCard } from "../components/QuantumInterlockCard";
import { CELL_ONE_VECTOR, TRUST_TIMELINE, NIST_POSTURE_BASELINE } from "../data/demo-fixtures";
import type { SignalsUiEnvelope } from "../types/signals-ui-envelope";

const meta: Meta<typeof QuantumInterlockCard> = {
  title: "Signal Components/18 — Quantum Interlock Card",
  component: QuantumInterlockCard,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof QuantumInterlockCard>;

export const Default: Story = {
  args: {},
};

export const ExpandedScope: Story = {
  args: {
    kpis: [
      { label: "TARGET", value: "ML-KEM-768", accent: "text-accent-blue" },
      { label: "SCOPE", value: "28 SYS" },
      { label: "VULN ALGS", value: "8", accent: "text-accent-danger" },
      { label: "AGILITY", value: "42%", accent: "text-amber-400" },
    ],
  },
};

export const WithEnvelope: Story = {
  args: {
    ...Default.args,
    envelope: {
      hsmlState: "HSML_ACTIVE",
      confidence: TRUST_TIMELINE[0],
      emittingCell: CELL_ONE_VECTOR,
      nistPosture: NIST_POSTURE_BASELINE[2],
      said: "E_DEMO_SAID_ENVELOPE",
    } satisfies SignalsUiEnvelope,
  },
};
