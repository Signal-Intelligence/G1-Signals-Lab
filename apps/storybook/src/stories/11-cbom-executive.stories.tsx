import type { Meta, StoryObj } from "@storybook/react";
import { CBOMExecutiveDashboard } from "../components/CBOMExecutiveDashboard";
import { CBOM_ENTRIES, CBOM_COVERAGE_GAPS, CBOM_SCAN_FAILURES, QUANTUM_ACTION_ITEMS, CELL_ONE_SHADOW, TRUST_TIMELINE, NIST_POSTURE_BASELINE } from "../data/demo-fixtures";
import type { SignalsUiEnvelope } from "../types/signals-ui-envelope";

const meta: Meta<typeof CBOMExecutiveDashboard> = {
  title: "Signal Components/11 — CBOM Executive Dashboard",
  component: CBOMExecutiveDashboard,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof CBOMExecutiveDashboard>;

export const FullInventory: Story = {
  args: {
    entries: CBOM_ENTRIES,
    gaps: CBOM_COVERAGE_GAPS,
    failures: CBOM_SCAN_FAILURES,
    actionItems: QUANTUM_ACTION_ITEMS,
  },
};

export const WithEnvelope: Story = {
  args: {
    ...FullInventory.args,
    envelope: {
      hsmlState: "HSML_ACTIVE",
      confidence: TRUST_TIMELINE[0],
      emittingCell: CELL_ONE_SHADOW,
      nistPosture: NIST_POSTURE_BASELINE[1],
      said: "E_DEMO_SAID_ENVELOPE",
    } satisfies SignalsUiEnvelope,
  },
};
