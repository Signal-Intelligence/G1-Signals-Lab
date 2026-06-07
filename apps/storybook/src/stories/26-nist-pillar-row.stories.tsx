import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { NistPillarRow } from "../components/NistPillarRow";
import { NIST_CELL_MAPPINGS, CELL_REGISTRY } from "../data/demo-fixtures";

const meta: Meta<typeof NistPillarRow> = {
  title: "Signal Components/26 — NIST Pillar Row",
  component: NistPillarRow,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof NistPillarRow>;

export const Default: Story = {
  args: {
    mappings: NIST_CELL_MAPPINGS,
    registry: CELL_REGISTRY,
  },
};

export const PartialPillars: Story = {
  args: {
    mappings: NIST_CELL_MAPPINGS.slice(0, 3),
    registry: CELL_REGISTRY,
  },
};
