import type { Meta, StoryObj } from "@storybook/react";
import { ExecutionDashboard } from "../components/ExecutionDashboard";
import { DEMO_REMEDIATION_BATCHES, DEMO_EXECUTION_EVENTS, CELL_ONE_SURGE, TRUST_TIMELINE, NIST_POSTURE_BASELINE } from "../data/demo-fixtures";
import type { SignalsUiEnvelope } from "../types/signals-ui-envelope";

const meta: Meta<typeof ExecutionDashboard> = {
  title: "Signal Components/06 — Execution Dashboard",
  component: ExecutionDashboard,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof ExecutionDashboard>;

export const MidExecution: Story = {
  args: {
    batches: DEMO_REMEDIATION_BATCHES.map((b, i) =>
      i < 2 ? { ...b, status: "completed" as const } : i === 2 ? { ...b, status: "in_progress" as const } : b
    ),
    events: DEMO_EXECUTION_EVENTS.slice(0, 5),
    trustScore: { before: 62, after: 74 },
    evidenceCount: 22,
  },
};

export const WithRollback: Story = {
  args: {
    batches: DEMO_REMEDIATION_BATCHES,
    events: DEMO_EXECUTION_EVENTS,
    trustScore: { before: 62, after: 89 },
    evidenceCount: 47,
  },
};

export const EarlyStage: Story = {
  args: {
    batches: DEMO_REMEDIATION_BATCHES.map((b, i) =>
      i === 0 ? { ...b, status: "in_progress" as const } : { ...b, status: "pending" as const }
    ),
    events: DEMO_EXECUTION_EVENTS.slice(0, 2),
    trustScore: { before: 62, after: 62 },
    evidenceCount: 4,
  },
};

export const WithEnvelope: Story = {
  args: {
    ...MidExecution.args,
    envelope: {
      hsmlState: "HSML_ACTIVE",
      confidence: TRUST_TIMELINE[0],
      emittingCell: CELL_ONE_SURGE,
      nistPosture: NIST_POSTURE_BASELINE[4],
      said: "E_DEMO_SAID_ENVELOPE",
    } satisfies SignalsUiEnvelope,
  },
};
