import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { MessageCard } from "../components/MessageCard";
import { CELL_CYPHER_ONE, TRUST_TIMELINE, NIST_POSTURE_BASELINE } from "../data/demo-fixtures";
import type { SignalsUiEnvelope } from "../types/signals-ui-envelope";

const meta: Meta<typeof MessageCard> = {
  title: "Signal Components/02 — Message Card",
  component: MessageCard,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof MessageCard>;

export const ChainAnalysis: Story = {
  args: {
    sender: "CYPHER ONE",
    sections: [
      {
        title: "Chain Analysis",
        content: "CVE-2026-901A on Host-01 (Cisco ASA 5545-X VPN) chains with CVE-2026-3142 on Host-02 (ASA Mgmt Plane) via compromised Honeywell vendor credentials to Host-04 (Honeywell PHD Historian). ArcaneDoor campaign (UAT4356). Combined CVSS path score: 9.8.",
      },
      {
        title: "Blast Radius",
        content: "3 systems on Tier-0 Prairie Fuels operations path. Potential impact: false process data injection to Experion HMI operators, SCADA telemetry disruption, Bill C-8 §15 72-hour CSE notification triggered.",
      },
      {
        title: "Recommendation",
        content: "Immediate Level-4 autonomous remediation: ASA firmware upgrade (9.16.4.85), vendor credential revocation, PHD Historian isolation, IT/OT DMZ tightening via PA-850, TLS rotation. Rollback on Modbus/TCP latency >200ms between ControlLogix PLCs and SAGE 3030 RTUs.",
      },
    ],
    actionLabel: "Build Remediation Plan",
    onAction: () => alert("Plan generation started"),
  },
};

export const CBOMPrompt: Story = {
  args: {
    sender: "CYPHER ONE",
    sections: [
      {
        title: "Priority #1: Cryptographic Bill of Materials",
        content: "Pipeline SCADA and OT systems have no current CBOM. Without a complete inventory of cryptographic algorithms and key lengths, quantum readiness planning operates on assumptions.",
      },
      {
        title: "Why Now",
        content: "Bill C-8 §9(1)(e) anticipated regulations mandate PQC migration roadmaps for designated operators. Allen-Bradley ControlLogix 5580 PLCs use RSA-1024 for firmware signing with zero crypto-agility — immediate action required.",
      },
    ],
    actionLabel: "Build CBOM Plan",
    onAction: () => alert("CBOM plan generation started"),
  },
};

export const StatusUpdate: Story = {
  args: {
    sender: "CYPHER ONE",
    sections: [
      {
        title: "Status Update",
        content: "Overnight remediation complete. 3 of 3 chain vulnerabilities patched. 1 batch rolled back (SCADA latency threshold). Trust score: 62 → 89 (+27). Bill C-8 gate: VERIFIED_COMPLIANT.",
      },
    ],
  },
};

export const WithEnvelope: Story = {
  args: {
    ...ChainAnalysis.args,
    envelope: {
      hsmlState: "HSML_ACTIVE",
      confidence: TRUST_TIMELINE[0],
      emittingCell: CELL_CYPHER_ONE,
      nistPosture: NIST_POSTURE_BASELINE[4],
      said: "E_DEMO_SAID_ENVELOPE",
    } satisfies SignalsUiEnvelope,
  },
};
