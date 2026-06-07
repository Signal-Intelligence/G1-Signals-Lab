// G1 Signals Lab — Topology Fixtures

import type { TopologyNode, TopologyEdge } from "../../types/topology";
import type { PipelineLayer } from "../../components/HydrationPipelineView";

// ---------------------------------------------------------------------------
// Topology Nodes
// ---------------------------------------------------------------------------

export const TOPOLOGY_NODES: TopologyNode[] = [
  { id: "synmcp", layer: "SynMCP", label: "SynMCP Plane", status: "active", integrations: ["Global Multi-Cluster Mesh"] },
  { id: "signals-ai", layer: "SignalsAI", label: "G1 Signals AI", status: "active", integrations: ["Probabilistic Mind", "GenUI"] },
  { id: "signals-dna", layer: "SignalsDNA", label: "G1 Signals DNA", status: "active", integrations: ["Deterministic Engine", "Camel ETL"] },
  { id: "agent-swarms", layer: "AgentSwarms", label: "Agent Swarms", status: "active", integrations: ["Detective", "Broker", "Custom"] },
  { id: "tri-quality", layer: "TriQuality", label: "Tri-Quality Processors", status: "active", integrations: ["Syntactic", "Synthetic", "Synchronic"] },
  { id: "telemetry", layer: "LiveTelemetry", label: "Live Telemetry Scanners", status: "active", integrations: ["Qualys VMDR", "Tenable InsightVM", "Rapid7"] },
  { id: "neo4j-udg", layer: "Neo4jUDG", label: "Neo4j Enterprise UDG", status: "active", integrations: ["Exploitation Graph", "Lateral Movement Mapping"] },
  { id: "policy-svc", layer: "PolicyServices", label: "Distributed Policy", status: "active", integrations: ["OPA Clusters", "SysML v2", "Immutable Ledgers"] },
  { id: "patch-mgmt", layer: "PatchManagement", label: "Patch Management", status: "active", integrations: ["Automox", "Tanium", "Ansible Controller"] },
  { id: "hypervisor", layer: "HypervisorOrchestration", label: "Hypervisor Orchestration", status: "active", integrations: ["VMware vCenter", "Hyper-V", "AWS/GCP Snapshots"] },
];

// ---------------------------------------------------------------------------
// Topology Edges
// ---------------------------------------------------------------------------

export const TOPOLOGY_EDGES: TopologyEdge[] = [
  { id: "e1", source: "synmcp", target: "signals-ai", transportType: "Dynamic Tooling" },
  { id: "e2", source: "synmcp", target: "signals-dna", transportType: "Dynamic Tooling" },
  { id: "e3", source: "signals-ai", target: "agent-swarms", transportType: "GenUI" },
  { id: "e4", source: "signals-dna", target: "tri-quality", transportType: "Camel" },
  { id: "e5", source: "agent-swarms", target: "telemetry", transportType: "mTLS" },
  { id: "e6", source: "agent-swarms", target: "neo4j-udg", transportType: "HSTP-1.0" },
  { id: "e7", source: "tri-quality", target: "policy-svc", transportType: "HSTP-1.0" },
  { id: "e8", source: "telemetry", target: "patch-mgmt", transportType: "OpenC2" },
  { id: "e9", source: "neo4j-udg", target: "patch-mgmt", transportType: "HSTP-1.0" },
  { id: "e10", source: "policy-svc", target: "hypervisor", transportType: "mTLS" },
  { id: "e11", source: "neo4j-udg", target: "hypervisor", transportType: "Snapshot API" },
];

// ---------------------------------------------------------------------------
// Hydration Pipeline Layers (L1-L9)
// ---------------------------------------------------------------------------

export const PIPELINE_LAYERS: PipelineLayer[] = [
  { id: "L1", label: "Structural Sources", description: "Hardware registers, directory clusters, statutory boundaries", status: "passed", owningCell: "one-echo" },
  { id: "L2", label: "Source Registry", description: "Telemetry pipelines with data provenance and refresh cadences", status: "passed", owningCell: "one-echo" },
  { id: "L3", label: "Acquisition Channels", description: "API pulls, webhook listeners, out-of-band captures to /hstp_routing_bus", status: "passed", owningCell: "one-echo" },
  { id: "L4", label: "XDBML Normalization", description: "Unstructured data parsed into strongly typed hierarchical XML elements", status: "passed", owningCell: "one-intel" },
  { id: "L5", label: "Composite Reconciliation", description: "Authority Hierarchy resolution — platform attestation overrides software self-attestation", status: "passed", owningCell: "one-intel" },
  { id: "L6", label: "Trust-Weighted Scoring", description: "Real-time confidence tier computation via mathematical decay matrix", status: "processing", owningCell: "CYPHER ONE" },
  { id: "L7", label: "Boundary Validation", description: "Cross-field consistency, range validation, completeness checks", status: "pending", owningCell: "one-vector" },
  { id: "L8", label: "Structural Field Mapping", description: "Bind verified data blocks to active runtime state in /hsml_state_machine", status: "pending", owningCell: "one-vector" },
  { id: "L9", label: "Secure Handoff Block", description: "Cryptographic seal + FCM broadcast notification", status: "pending", owningCell: "one-ghost" },
];
