import type { Meta, StoryObj } from "@storybook/react";
import { AutonomyGateCard } from "../components/AutonomyGateCard";
import { CELL_CYPHER_ONE, CELL_ONE_ECHO, CELL_ONE_VECTOR, TRUST_TIMELINE, NIST_POSTURE_BASELINE } from "../data/demo-fixtures";
import type { SignalsUiEnvelope } from "../types/signals-ui-envelope";

const meta: Meta<typeof AutonomyGateCard> = {
  title: "Signal Components/22 — Autonomy Gate",
  component: AutonomyGateCard,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof AutonomyGateCard>;

export const SupervisorHigh: Story = {
  args: {
    cell: CELL_CYPHER_ONE,
    confidenceTier: "HIGH",
    isHalted: false,
  },
};

export const SensorDroneMedium: Story = {
  args: {
    cell: CELL_ONE_ECHO,
    confidenceTier: "MEDIUM",
    isHalted: false,
  },
};

export const EnforcementHalted: Story = {
  args: {
    cell: CELL_ONE_VECTOR,
    confidenceTier: "LOW",
    isHalted: true,
  },
};

export const WithEnvelope: Story = {
  args: {
    ...SupervisorHigh.args,
    envelope: {
      hsmlState: "HSML_ACTIVE",
      confidence: TRUST_TIMELINE[0],
      emittingCell: CELL_CYPHER_ONE,
      nistPosture: NIST_POSTURE_BASELINE[4],
      said: "E_DEMO_SAID_INFRA",
    } satisfies SignalsUiEnvelope,
  },
};
