import React, { useMemo } from "react";
import {
  ReactFlow,
  type Node,
  type Edge,
  type NodeProps,
  Handle,
  Position,
  ReactFlowProvider,
} from "@xyflow/react";

export interface ChainNode {
  id: string;
  cve: string;
  cvss: number;
  system: string;
  label: string;
}

const NODE_WIDTH = 160;
const NODE_GAP = 70;

function severityColor(cvss: number) {
  if (cvss >= 9.0) return { ring: "#c4506a", bg: "rgba(196,80,106,0.12)", glow: "rgba(196,80,106,0.5)", label: "CRITICAL" };
  if (cvss >= 7.0) return { ring: "#b8784a", bg: "rgba(184,120,74,0.10)", glow: "rgba(184,120,74,0.4)", label: "HIGH" };
  if (cvss >= 4.0) return { ring: "#d4a843", bg: "rgba(212,168,67,0.10)", glow: "rgba(212,168,67,0.35)", label: "MEDIUM" };
  return { ring: "#5a8a6a", bg: "rgba(90,138,106,0.10)", glow: "rgba(90,138,106,0.3)", label: "LOW" };
}

function VulnNode({ data }: NodeProps) {
  const d = data as { cve: string; cvss: number; system: string; label: string; index: number; total: number };
  const sev = severityColor(d.cvss);
  const isFirst = d.index === 0;
  const isLast = d.index === d.total - 1;

  return (
    <>
      {!isFirst && (
        <Handle
          type="target"
          position={Position.Left}
          className="!w-0 !h-0 !bg-transparent !border-none !min-w-0 !min-h-0"
        />
      )}
      <div className="flex flex-col items-center" style={{ width: NODE_WIDTH }}>
        {/* Severity tag */}
        <div
          className="text-[8px] font-medium uppercase tracking-[0.15em] px-2 py-[2px] mb-2 rounded-sm"
          style={{ color: sev.ring, background: sev.bg, border: `1px solid ${sev.ring}33` }}
        >
          {sev.label}
        </div>

        {/* Diamond node */}
        <div className="relative flex items-center justify-center" style={{ width: 56, height: 56 }}>
          {/* Outer ring — breathing glow */}
          <div
            className="absolute inset-0 animate-glow-pulse"
            style={{
              transform: "rotate(45deg)",
              border: `1.5px solid ${sev.ring}`,
              boxShadow: `0 0 12px ${sev.glow}, inset 0 0 8px ${sev.bg}`,
              background: sev.bg,
            }}
          />
          {/* Inner score */}
          <span
            className="relative z-10 font-thin text-lg tabular-nums"
            style={{ color: sev.ring, textShadow: `0 0 20px ${sev.glow}` }}
          >
            {d.cvss.toFixed(1)}
          </span>
        </div>

        {/* CVE label */}
        <p
          className="text-[10px] font-medium tracking-[0.12em] uppercase mt-2 mb-0.5"
          style={{ color: sev.ring }}
        >
          {d.cve}
        </p>

        {/* System name */}
        <p className="text-[9px] font-normal tracking-[0.08em] text-text-muted uppercase text-center leading-tight max-w-[140px]">
          {d.system}
        </p>

        {/* Chain step indicator */}
        <div className="flex items-center gap-1 mt-2">
          <div
            className="w-1 h-1 rounded-full"
            style={{ background: sev.ring, boxShadow: `0 0 4px ${sev.glow}` }}
          />
          <span className="text-[8px] font-normal tracking-[0.12em] text-text-muted uppercase">
            {isFirst ? "ENTRY" : isLast ? "TARGET" : "PIVOT"}
          </span>
          <div
            className="w-1 h-1 rounded-full"
            style={{ background: sev.ring, boxShadow: `0 0 4px ${sev.glow}` }}
          />
        </div>
      </div>
      {!isLast && (
        <Handle
          type="source"
          position={Position.Right}
          className="!w-0 !h-0 !bg-transparent !border-none !min-w-0 !min-h-0"
        />
      )}
    </>
  );
}

const nodeTypes = { vulnNode: VulnNode };

export interface ChainFlowDiagramProps {
  chainNodes: ChainNode[];
}

export function ChainFlowDiagram({ chainNodes }: ChainFlowDiagramProps) {
  const { nodes, edges } = useMemo(() => {
    const totalWidth = chainNodes.length * NODE_WIDTH + (chainNodes.length - 1) * NODE_GAP;
    const startX = -totalWidth / 2;

    const nodes: Node[] = chainNodes.map((cn, i) => ({
      id: cn.id,
      type: "vulnNode",
      position: { x: startX + i * (NODE_WIDTH + NODE_GAP), y: 0 },
      data: { cve: cn.cve, cvss: cn.cvss, system: cn.system, label: cn.label, index: i, total: chainNodes.length },
      draggable: false,
      selectable: false,
      connectable: false,
    }));

    const edges: Edge[] = chainNodes.slice(0, -1).map((cn, i) => {
      const sourceSev = severityColor(cn.cvss);
      const targetSev = severityColor(chainNodes[i + 1].cvss);
      return {
        id: `e-${cn.id}-${chainNodes[i + 1].id}`,
        source: cn.id,
        target: chainNodes[i + 1].id,
        type: "default",
        animated: true,
        label: "→",
        labelStyle: { fill: "#ffffff30", fontSize: 10, fontWeight: 300 },
        labelBgStyle: { fill: "transparent" },
        style: {
          stroke: `${sourceSev.ring}88`,
          strokeWidth: 1.5,
          strokeDasharray: "8 5",
        },
      };
    });

    return { nodes, edges };
  }, [chainNodes]);

  return (
    <div className="relative">
      <ReactFlowProvider>
        <div style={{ height: 200, width: "100%" }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            colorMode="dark"
            fitView
            fitViewOptions={{ padding: 0.35 }}
            panOnDrag={false}
            zoomOnScroll={false}
            zoomOnPinch={false}
            zoomOnDoubleClick={false}
            nodesDraggable={false}
            nodesConnectable={false}
            nodesFocusable={false}
            edgesFocusable={false}
            elementsSelectable={false}
            proOptions={{ hideAttribution: true }}
            style={{ background: "transparent" }}
          />
        </div>
      </ReactFlowProvider>
    </div>
  );
}

export default ChainFlowDiagram;
