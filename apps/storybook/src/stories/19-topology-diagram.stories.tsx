import type { Meta, StoryObj } from "@storybook/react";
import { TopologyDiagram } from "../components/TopologyDiagram";
import { TOPOLOGY_NODES, TOPOLOGY_EDGES, CELL_CYPHER_ONE, TRUST_TIMELINE, NIST_POSTURE_BASELINE } from "../data/demo-fixtures";
import type { SignalsUiEnvelope } from "../types/signals-ui-envelope";

const meta: Meta<typeof TopologyDiagram> = {
  title: "Signal Components/19 — Topology Diagram",
  component: TopologyDiagram,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof TopologyDiagram>;

export const FullTopology: Story = {
  args: {
    nodes: TOPOLOGY_NODES,
    edges: TOPOLOGY_EDGES,
  },
};

export const DegradedNode: Story = {
  args: {
    nodes: TOPOLOGY_NODES.map((n) =>
      n.id === "neo4j-udg" ? { ...n, status: "degraded" as const } : n
    ),
    edges: TOPOLOGY_EDGES,
  },
};

export const OfflineScanner: Story = {
  args: {
    nodes: TOPOLOGY_NODES.map((n) =>
      n.id === "telemetry" ? { ...n, status: "offline" as const } : n
    ),
    edges: TOPOLOGY_EDGES,
  },
};

export const WithEnvelope: Story = {
  args: {
    ...FullTopology.args,
    envelope: {
      hsmlState: "HSML_ACTIVE",
      confidence: TRUST_TIMELINE[0],
      emittingCell: CELL_CYPHER_ONE,
      nistPosture: NIST_POSTURE_BASELINE[4],
      said: "E_DEMO_SAID_INFRA",
    } satisfies SignalsUiEnvelope,
  },
};
