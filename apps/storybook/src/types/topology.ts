/**
 * G1 Signals Systems Topology Types
 * Models the layers from the G1 Signals Systems Topology Blueprint.
 */

export type TopologyLayer =
  | "SynMCP"
  | "SignalsAI"
  | "SignalsDNA"
  | "AgentSwarms"
  | "TriQuality"
  | "LiveTelemetry"
  | "Neo4jUDG"
  | "PolicyServices"
  | "PatchManagement"
  | "HypervisorOrchestration";

export type TopologyNodeStatus = "active" | "degraded" | "offline";

export interface TopologyNode {
  id: string;
  layer: TopologyLayer;
  label: string;
  status: TopologyNodeStatus;
  integrations: string[];
}

export interface TopologyEdge {
  id: string;
  source: string;
  target: string;
  transportType: string;
}
