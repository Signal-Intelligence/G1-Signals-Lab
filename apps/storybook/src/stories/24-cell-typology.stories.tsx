import type { Meta, StoryObj } from "@storybook/react";
import { CellTypologyPanel } from "../components/CellTypologyPanel";
import { CELL_REGISTRY, CELL_CYPHER_ONE, TRUST_TIMELINE, NIST_POSTURE_BASELINE } from "../data/demo-fixtures";
import type { SignalsUiEnvelope } from "../types/signals-ui-envelope";

const meta: Meta<typeof CellTypologyPanel> = {
  title: "Signal Components/24 — Cell Typology",
  component: CellTypologyPanel,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof CellTypologyPanel>;

export const AllActive: Story = {
  args: {
    cells: CELL_REGISTRY,
  },
};

export const OneHalted: Story = {
  args: {
    cells: CELL_REGISTRY.map((c) =>
      c.cell.handle === "one-echo"
        ? { ...c, isActive: false, cell: { ...c.cell, currentAutonomy: 0 as any } }
        : c
    ),
  },
};

export const WithEnvelope: Story = {
  args: {
    ...AllActive.args,
    envelope: {
      hsmlState: "HSML_ACTIVE",
      confidence: TRUST_TIMELINE[0],
      emittingCell: CELL_CYPHER_ONE,
      nistPosture: NIST_POSTURE_BASELINE[4],
      said: "E_DEMO_SAID_INFRA",
    } satisfies SignalsUiEnvelope,
  },
};
