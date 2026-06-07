import type { Meta, StoryObj } from "@storybook/react";
import { TrustDecayGauge } from "../components/TrustDecayGauge";
import { CELL_CYPHER_ONE, TRUST_TIMELINE, NIST_POSTURE_BASELINE } from "../data/demo-fixtures";
import type { SignalsUiEnvelope } from "../types/signals-ui-envelope";

const meta: Meta<typeof TrustDecayGauge> = {
  title: "Signal Components/21 — Trust Decay Gauge",
  component: TrustDecayGauge,
  parameters: { layout: "padded" },
  argTypes: {
    c0: { control: { type: "range", min: 0.5, max: 1.0, step: 0.01 } },
    lambda: { control: { type: "range", min: 0.001, max: 0.05, step: 0.001 } },
    elapsedSeconds: { control: { type: "range", min: 0, max: 3600, step: 10 } },
  },
};

export default meta;
type Story = StoryObj<typeof TrustDecayGauge>;

export const HighConfidence: Story = {
  args: {
    c0: 0.99,
    lambda: 0.005,
    elapsedSeconds: 42,
    cellHandle: "CYPHER ONE",
  },
};

export const MediumDecay: Story = {
  args: {
    c0: 0.98,
    lambda: 0.008,
    elapsedSeconds: 300,
    cellHandle: "one-vector",
  },
};

export const LowHalted: Story = {
  args: {
    c0: 0.95,
    lambda: 0.01,
    elapsedSeconds: 600,
    cellHandle: "one-echo",
  },
};

export const FreshAttestation: Story = {
  args: {
    c0: 1.0,
    lambda: 0.003,
    elapsedSeconds: 0,
    cellHandle: "1G",
  },
};

export const WithEnvelope: Story = {
  args: {
    ...HighConfidence.args,
    envelope: {
      hsmlState: "HSML_ACTIVE",
      confidence: TRUST_TIMELINE[0],
      emittingCell: CELL_CYPHER_ONE,
      nistPosture: NIST_POSTURE_BASELINE[4],
      said: "E_DEMO_SAID_INFRA",
    } satisfies SignalsUiEnvelope,
  },
};
