// ---------------------------------------------------------------------------
// CYPHER ONE Implementation Dashboard — Event & Config Fixture Data
// Extracted from dashboard.ts to keep both files under 300 lines.
// ---------------------------------------------------------------------------

import type { NistFunction, ExecutionEvent } from "./dashboard";
import { NIST_COLORS } from "./dashboard";

// ---------------------------------------------------------------------------
// Event Type Colors
// ---------------------------------------------------------------------------

export const EVENT_TYPE_COLORS: Record<ExecutionEvent["type"], string> = {
  patch: NIST_COLORS.PR,
  validation: NIST_COLORS.PR,
  evidence: NIST_COLORS.RC,
  health_check: NIST_COLORS.DE,
  rollback: NIST_COLORS.RS,
  escalation: NIST_COLORS.RS,
};

// ---------------------------------------------------------------------------
// Execution Events
// ---------------------------------------------------------------------------

export const EXECUTION_EVENTS: ExecutionEvent[] = [
  { id: "evt-001", timestamp: "2026-06-01T02:25:12Z", type: "patch", message: "Deploying Cisco ASA firmware 9.16.4.85 to Host-01 VPN Gateway — ArcaneDoor RCE fix", system: "Host-01", provenanceHash: "sha256:a3f8c1d9e2b74506f819ae3c2d5b7e01" },
  { id: "evt-002", timestamp: "2026-06-01T02:42:03Z", type: "validation", message: "Health check passed — AnyConnect VPN tunnel latency <100ms, within baseline", system: "Host-01", provenanceHash: "sha256:b7e2f4a1c8d63912d04bc5e1a9f27830" },
  { id: "evt-003", timestamp: "2026-06-01T02:42:18Z", type: "patch", message: "Revoking compromised Honeywell Secure Connection vendor credentials, rotating ASA certificates", system: "Host-02", provenanceHash: "sha256:c9d1e5f3a2b847209e3fa6b1d0c48927" },
  { id: "evt-004", timestamp: "2026-06-01T03:08:44Z", type: "evidence", message: "Microledger receipt sealed — batch-002 complete, Bill C-8 §15 72-hour notification clock started", system: "Host-02", provenanceHash: "sha256:d4a8b2c6e1f950318c7ea2d3b5f06941" },
  { id: "evt-005", timestamp: "2026-06-01T03:08:55Z", type: "patch", message: "Isolating Honeywell PHD Historian — validating process history integrity from Experion DCS backup", system: "Host-04", provenanceHash: "sha256:d5b9c3e7f1a260429f4cb8d6e3a17052" },
  { id: "evt-006", timestamp: "2026-06-01T03:31:22Z", type: "patch", message: "Applying IT/OT DMZ east-west firewall segmentation via Palo Alto PA-850 across Host-01/02/04", system: "Host-01", provenanceHash: "sha256:e5f9c3d7a0b168424d19ba5c6e2f7053" },
  { id: "evt-007", timestamp: "2026-06-01T03:45:58Z", type: "health_check", message: "DEGRADED — Modbus/TCP disrupted between ControlLogix PLCs and SAGE 3030 RTUs — latency 680ms (340% above 200ms threshold)", system: "Host-04", provenanceHash: "sha256:f6a0d4e8b1c279536e2ab7d4c3f81064" },
  { id: "evt-008", timestamp: "2026-06-01T03:46:14Z", type: "rollback", message: "Auto-rollback initiated for batch-004 — restoring prior PA-850 firewall state within 47 seconds", system: "Host-04", provenanceHash: "sha256:07b1e5f9c2d38a648f3cb6e5d4a92175" },
  { id: "evt-009", timestamp: "2026-06-01T03:48:02Z", type: "validation", message: "Rollback verified — Modbus/TCP between ControlLogix and SAGE 3030 restored to baseline", system: "Host-04", provenanceHash: "sha256:18c2f6a0d3e49b75a04dc7f6e5ba3286" },
  { id: "evt-010", timestamp: "2026-06-01T03:48:30Z", type: "escalation", message: "Batch-004 escalated to morning review — Prairie Fuels OT team + CISO action required", system: "Host-04", provenanceHash: "sha256:29d3a7b1e4f50c86b15ed8a7f6cb4397" },
  { id: "evt-011", timestamp: "2026-06-01T07:00:00Z", type: "evidence", message: "Morning summary sealed — 47 evidence receipts, Bill C-8 VERIFIED_COMPLIANT, CSE notification filed", system: "cypher-one-core", provenanceHash: "sha256:3ae4b8c2f5061d97c26fe9b8a7dc54a8" },
];

// ---------------------------------------------------------------------------
// Agent-to-Event Type Mapping (used by EventLog for agent filtering)
// ---------------------------------------------------------------------------

export const AGENT_EVENT_TYPES: Record<string, ExecutionEvent["type"][]> = {
  "one-echo": ["health_check"],
  "one-vector": ["patch"],
  "one-surge": ["patch", "rollback"],
  "one-ghost": ["evidence"],
  "one-intel": [],
  "one-shadow": [],
};

// ---------------------------------------------------------------------------
// Pillar Display Order
// ---------------------------------------------------------------------------

export const PILLAR_ORDER: NistFunction[] = ["GV", "ID", "PR", "DE", "RS", "RC"];
