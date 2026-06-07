import type { Meta, StoryObj } from "@storybook/react";
import { MorningDashboard } from "../components/MorningDashboard";
import { DEMO_DASHBOARD_STATS, DEMO_REMEDIATION_BATCHES, DEMO_EXECUTION_EVENTS, DEMO_ACTION_ITEMS, CELL_CYPHER_ONE, TRUST_TIMELINE, NIST_POSTURE_BASELINE } from "../data/demo-fixtures";
import type { SignalsUiEnvelope } from "../types/signals-ui-envelope";

const meta: Meta<typeof MorningDashboard> = {
  title: "Signal Components/07 — Morning Dashboard",
  component: MorningDashboard,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof MorningDashboard>;

export const FullReport: Story = {
  args: {
    stats: DEMO_DASHBOARD_STATS,
    batches: DEMO_REMEDIATION_BATCHES,
    events: DEMO_EXECUTION_EVENTS,
    actionItems: DEMO_ACTION_ITEMS,
  },
};

export const CleanRun: Story = {
  args: {
    stats: { ...DEMO_DASHBOARD_STATS, failed: 0, rolledBack: 0, pendingManual: 0, remediated: 3, trustScoreAfter: 92 },
    batches: DEMO_REMEDIATION_BATCHES.map((b) => ({ ...b, status: "completed" as const, rollbackReason: undefined })),
    events: DEMO_EXECUTION_EVENTS.filter((e) => e.type !== "rollback" && e.type !== "escalation"),
    actionItems: [],
  },
};

export const WithEnvelope: Story = {
  args: {
    ...FullReport.args,
    envelope: {
      hsmlState: "HSML_ACTIVE",
      confidence: TRUST_TIMELINE[0],
      emittingCell: CELL_CYPHER_ONE,
      nistPosture: NIST_POSTURE_BASELINE[4],
      said: "E_DEMO_SAID_ENVELOPE",
    } satisfies SignalsUiEnvelope,
  },
};
