import type { Meta, StoryObj } from "@storybook/react";
import { TimelineView } from "../components/TimelineView";
import { PQC_MILESTONES, CELL_ONE_SHADOW, TRUST_TIMELINE, NIST_POSTURE_BASELINE } from "../data/demo-fixtures";
import type { SignalsUiEnvelope } from "../types/signals-ui-envelope";

const meta: Meta<typeof TimelineView> = {
  title: "Signal Components/08 — Timeline View",
  component: TimelineView,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof TimelineView>;

export const PQCReadinessTimeline: Story = {
  args: {
    milestones: PQC_MILESTONES,
    currentDate: "2026-06",
  },
};

export const EarlyTimeline: Story = {
  args: {
    milestones: PQC_MILESTONES,
    currentDate: "2024-08",
  },
};

export const WithEnvelope: Story = {
  args: {
    ...PQCReadinessTimeline.args,
    envelope: {
      hsmlState: "HSML_ACTIVE",
      confidence: TRUST_TIMELINE[0],
      emittingCell: CELL_ONE_SHADOW,
      nistPosture: NIST_POSTURE_BASELINE[1],
      said: "E_DEMO_SAID_ENVELOPE",
    } satisfies SignalsUiEnvelope,
  },
};
