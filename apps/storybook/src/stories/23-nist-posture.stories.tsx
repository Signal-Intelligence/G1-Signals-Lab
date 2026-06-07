import type { Meta, StoryObj } from "@storybook/react";
import { NistPostureMatrix } from "../components/NistPostureMatrix";
import { NIST_CELL_MAPPINGS, CELL_CYPHER_ONE, TRUST_TIMELINE, NIST_POSTURE_BASELINE } from "../data/demo-fixtures";
import type { SignalsUiEnvelope } from "../types/signals-ui-envelope";

const meta: Meta<typeof NistPostureMatrix> = {
  title: "Signal Components/23 — NIST Posture Matrix",
  component: NistPostureMatrix,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof NistPostureMatrix>;

export const NominalBaseline: Story = {
  args: {
    mappings: NIST_CELL_MAPPINGS,
  },
};

export const DegradedGovernance: Story = {
  args: {
    mappings: NIST_CELL_MAPPINGS.map((m) =>
      m.function === "GV"
        ? { ...m, posture: { ...m.posture, posture: "DEGRADED" as const, confidence: 0.62 } }
        : m
    ),
  },
};

export const WithEnvelope: Story = {
  args: {
    ...NominalBaseline.args,
    envelope: {
      hsmlState: "HSML_ACTIVE",
      confidence: TRUST_TIMELINE[0],
      emittingCell: CELL_CYPHER_ONE,
      nistPosture: NIST_POSTURE_BASELINE[4],
      said: "E_DEMO_SAID_INFRA",
    } satisfies SignalsUiEnvelope,
  },
};
