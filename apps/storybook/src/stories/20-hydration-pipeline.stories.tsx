import type { Meta, StoryObj } from "@storybook/react";
import { HydrationPipelineView } from "../components/HydrationPipelineView";
import { PIPELINE_LAYERS, CELL_CYPHER_ONE, TRUST_TIMELINE, NIST_POSTURE_BASELINE } from "../data/demo-fixtures";
import type { SignalsUiEnvelope } from "../types/signals-ui-envelope";

const meta: Meta<typeof HydrationPipelineView> = {
  title: "Signal Components/20 — Hydration Pipeline",
  component: HydrationPipelineView,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof HydrationPipelineView>;

export const MidProcessing: Story = {
  args: {
    layers: PIPELINE_LAYERS,
    currentPacketId: "E3A9x_Session_SAID_20260601",
  },
};

export const FullyPassed: Story = {
  args: {
    layers: PIPELINE_LAYERS.map((l) => ({ ...l, status: "passed" as const })),
    currentPacketId: "E3A9x_COMPLETED",
  },
};

export const BlockedAtValidation: Story = {
  args: {
    layers: PIPELINE_LAYERS.map((l, i) =>
      i < 6
        ? { ...l, status: "passed" as const }
        : i === 6
          ? { ...l, status: "blocked" as const }
          : l
    ),
    currentPacketId: "E3A9x_BLOCKED_L7",
  },
};

export const WithEnvelope: Story = {
  args: {
    ...MidProcessing.args,
    envelope: {
      hsmlState: "HSML_ACTIVE",
      confidence: TRUST_TIMELINE[0],
      emittingCell: CELL_CYPHER_ONE,
      nistPosture: NIST_POSTURE_BASELINE[4],
      said: "E_DEMO_SAID_INFRA",
    } satisfies SignalsUiEnvelope,
  },
};
