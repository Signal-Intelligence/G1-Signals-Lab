/**
 * TopologyDiagram
 * Stateless visualization of the G1 Signals Systems Topology using React Flow.
 * All data passed via signalsUiProperties.
 */

import React, { useMemo } from "react";
import {
  ReactFlow,
  ReactFlowProvider,
  type Node,
  type Edge,
  Position,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import type { TopologyNode, TopologyEdge } from "../types/topology";
import type { SignalsUiEnvelope } from "../types/signals-ui-envelope";
import { CellBadge, ConfidenceBar, NistTag, HsmlStateOverlay } from "./primitives";

export interface TopologyDiagramProps {
  nodes: TopologyNode[];
  edges: TopologyEdge[];
  envelope?: SignalsUiEnvelope;
}

const LAYER_Y: Record<string, number> = {
  SynMCP: 0,
  SignalsAI: 120,
  SignalsDNA: 120,
  AgentSwarms: 240,
  TriQuality: 240,
  LiveTelemetry: 400,
  Neo4jUDG: 400,
  PolicyServices: 400,
  PatchManagement: 560,
  HypervisorOrchestration: 560,
};

const LAYER_X: Record<string, number> = {
  SynMCP: 300,
  SignalsAI: 150,
  SignalsDNA: 450,
  AgentSwarms: 150,
  TriQuality: 450,
  LiveTelemetry: 50,
  Neo4jUDG: 300,
  PolicyServices: 550,
  PatchManagement: 150,
  HypervisorOrchestration: 450,
};

const STATUS_COLORS: Record<string, string> = {
  active: "#00ff88",
  degraded: "#9a8a42",
  offline: "#ef4444",
};

function TopologyInner({ nodes: topoNodes, edges: topoEdges, envelope }: TopologyDiagramProps) {
  const flowNodes: Node[] = useMemo(
    () =>
      topoNodes.map((n) => ({
        id: n.id,
        position: { x: LAYER_X[n.layer] ?? 300, y: LAYER_Y[n.layer] ?? 0 },
        sourcePosition: Position.Bottom,
        targetPosition: Position.Top,
        data: { label: n.label },
        style: {
          background: "rgba(255,255,255,0.03)",
          border: `1px solid ${STATUS_COLORS[n.status] ?? "#333"}40`,
          borderRadius: "2px",
          padding: "8px 12px",
          color: "#9ca3af",
          fontSize: "10px",
          fontFamily: "Inter, system-ui, sans-serif",
          letterSpacing: "0.1em",
          textTransform: "uppercase" as const,
          boxShadow: n.status === "active" ? `0 0 8px ${STATUS_COLORS.active}20` : undefined,
        },
      })),
    [topoNodes]
  );

  const flowEdges: Edge[] = useMemo(
    () =>
      topoEdges.map((e) => ({
        id: e.id,
        source: e.source,
        target: e.target,
        label: e.transportType,
        style: { stroke: "rgba(0,102,255,0.3)", strokeWidth: 1 },
        labelStyle: { fontSize: "8px", fill: "#6b7280", letterSpacing: "0.1em" },
        animated: true,
      })),
    [topoEdges]
  );

  return (
    <div className="relative">
      {envelope && <HsmlStateOverlay hsmlState={envelope.hsmlState} />}
      <div className="glass-panel rounded-none p-5 overflow-hidden">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-2 h-2 rounded-full bg-accent-blue" />
          <span className="text-[11px] font-medium uppercase tracking-label text-text-secondary">
            G1 SIGNALS SYSTEMS TOPOLOGY
          </span>
        </div>

        <div className="h-[500px] bg-bg-primary border border-border-subtle">
          <ReactFlow
            nodes={flowNodes}
            edges={flowEdges}
            fitView
            proOptions={{ hideAttribution: true }}
            nodesDraggable={false}
            nodesConnectable={false}
            panOnDrag={false}
            zoomOnScroll={false}
          />
        </div>

        <div className="mt-4 pt-3 border-t border-border-subtle flex items-center justify-between">
          <div className="flex items-center gap-4">
            {Object.entries(STATUS_COLORS).map(([status, color]) => (
              <div key={status} className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
                <span className="text-[9px] uppercase tracking-telemetry text-text-muted">{status}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2">
            {envelope?.nistPosture && <NistTag posture={envelope.nistPosture} />}
            {envelope?.emittingCell && <CellBadge cell={envelope.emittingCell} />}
          </div>
        </div>
        {envelope && <div className="mt-2"><ConfidenceBar confidence={envelope.confidence} /></div>}
      </div>
    </div>
  );
}

export function TopologyDiagram(props: TopologyDiagramProps) {
  return (
    <ReactFlowProvider>
      <TopologyInner {...props} />
    </ReactFlowProvider>
  );
}

export default TopologyDiagram;
