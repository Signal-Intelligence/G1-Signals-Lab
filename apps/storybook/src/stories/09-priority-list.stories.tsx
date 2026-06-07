import type { Meta, StoryObj } from "@storybook/react";
import { PriorityList } from "../components/PriorityList";
import { PQC_PRIORITIES, CELL_ONE_SHADOW, TRUST_TIMELINE, NIST_POSTURE_BASELINE } from "../data/demo-fixtures";
import type { SignalsUiEnvelope } from "../types/signals-ui-envelope";

const meta: Meta<typeof PriorityList> = {
  title: "Signal Components/09 — Priority List",
  component: PriorityList,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof PriorityList>;

export const TopThreePQCPriorities: Story = {
  args: {
    priorities: PQC_PRIORITIES,
  },
};

export const SinglePriority: Story = {
  args: {
    priorities: [PQC_PRIORITIES[0]],
  },
};

export const WithEnvelope: Story = {
  args: {
    ...TopThreePQCPriorities.args,
    envelope: {
      hsmlState: "HSML_ACTIVE",
      confidence: TRUST_TIMELINE[0],
      emittingCell: CELL_ONE_SHADOW,
      nistPosture: NIST_POSTURE_BASELINE[1],
      said: "E_DEMO_SAID_ENVELOPE",
    } satisfies SignalsUiEnvelope,
  },
};
