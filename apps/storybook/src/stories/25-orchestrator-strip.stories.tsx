import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { OrchestratorStrip } from "../components/OrchestratorStrip";
import { NIST_CELL_MAPPINGS } from "../data/demo-fixtures";

const meta: Meta<typeof OrchestratorStrip> = {
  title: "Signal Components/25 — Orchestrator Strip",
  component: OrchestratorStrip,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof OrchestratorStrip>;

export const Default: Story = {
  args: {
    mappings: NIST_CELL_MAPPINGS,
  },
};

export const CustomOrchestrator: Story = {
  args: {
    handle: "SENTINEL-7",
    subtitle: "PERIMETER DELEGATION \u00B7 ZERO-TRUST ENFORCEMENT \u00B7 LEVEL 4",
    autonomyLevel: 4,
    confidence: 94,
    delegations: [
      { function: "GV", cellHandle: "gov-agent", color: "#0066ff" },
      { function: "ID", cellHandle: "id-agent", color: "#7c3aed" },
      { function: "PR", cellHandle: "pr-agent", color: "#00ff88" },
    ],
  },
};
