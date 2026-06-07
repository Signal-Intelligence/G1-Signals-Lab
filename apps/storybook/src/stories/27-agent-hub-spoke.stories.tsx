import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { AgentHubSpoke } from "../components/AgentHubSpoke";
import { NIST_CELL_MAPPINGS } from "../data/demo-fixtures";

const meta: Meta<typeof AgentHubSpoke> = {
  title: "Signal Components/27 — Agent Hub Spoke",
  component: AgentHubSpoke,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof AgentHubSpoke>;

export const Default: Story = {
  render: () => (
    <div className="max-w-md mx-auto">
      <div className="glass-panel px-3 py-3">
        <AgentHubSpoke mappings={NIST_CELL_MAPPINGS} />
      </div>
    </div>
  ),
};

export const CustomCenter: Story = {
  render: () => (
    <div className="max-w-md mx-auto">
      <div className="glass-panel px-3 py-3">
        <AgentHubSpoke mappings={NIST_CELL_MAPPINGS} centerLabel="NEXUS" />
      </div>
    </div>
  ),
};
