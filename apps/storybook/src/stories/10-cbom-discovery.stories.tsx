import type { Meta, StoryObj } from "@storybook/react";
import { CBOMDiscoveryDashboard } from "../components/CBOMDiscoveryDashboard";
import { CBOM_DISCOVERY_METHODS, CBOM_SCAN_FAILURES, CELL_ONE_SHADOW, TRUST_TIMELINE, NIST_POSTURE_BASELINE } from "../data/demo-fixtures";
import type { SignalsUiEnvelope } from "../types/signals-ui-envelope";

const meta: Meta<typeof CBOMDiscoveryDashboard> = {
  title: "Signal Components/10 — CBOM Discovery Dashboard",
  component: CBOMDiscoveryDashboard,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof CBOMDiscoveryDashboard>;

export const ScanComplete: Story = {
  args: {
    methods: CBOM_DISCOVERY_METHODS,
    totalInventoryCount: 337,
    coveragePercent: 72,
    failures: CBOM_SCAN_FAILURES,
  },
};

export const ScanInProgress: Story = {
  args: {
    methods: CBOM_DISCOVERY_METHODS.map((m, i) =>
      i < 2 ? m : { ...m, status: "in_progress" as const, targetsScanned: Math.floor(m.totalTargets * 0.3), itemsFound: Math.floor(m.itemsFound * 0.2) }
    ),
    totalInventoryCount: 140,
    coveragePercent: 38,
    failures: [],
  },
};

export const WithEnvelope: Story = {
  args: {
    ...ScanComplete.args,
    envelope: {
      hsmlState: "HSML_ACTIVE",
      confidence: TRUST_TIMELINE[0],
      emittingCell: CELL_ONE_SHADOW,
      nistPosture: NIST_POSTURE_BASELINE[1],
      said: "E_DEMO_SAID_ENVELOPE",
    } satisfies SignalsUiEnvelope,
  },
};
