import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { PlanCard } from "../components/PlanCard";
import { CELL_CYPHER_ONE, TRUST_TIMELINE, NIST_POSTURE_BASELINE } from "../data/demo-fixtures";
import type { SignalsUiEnvelope } from "../types/signals-ui-envelope";

const meta: Meta<typeof PlanCard> = {
  title: "Signal Components/04 — Plan Card",
  component: PlanCard,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof PlanCard>;

export const ChainRemediation: Story = {
  args: {
    title: "CVE-2026-901A/3142 Chain Remediation",
    sections: [
      {
        title: "Remediation Sequence",
        defaultOpen: true,
        content: (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border-default text-text-muted text-[11px] uppercase tracking-telemetry">
                <th className="text-left py-2 pr-4">Batch</th>
                <th className="text-left py-2 pr-4">Target</th>
                <th className="text-left py-2 pr-4">Action</th>
                <th className="text-left py-2">Health Gate</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary font-light">
              <tr className="border-b border-border-subtle"><td className="py-2 pr-4">1</td><td className="pr-4">Host-01</td><td className="pr-4">Cisco ASA firmware upgrade to 9.16.4.85</td><td>VPN tunnel latency &lt;100ms</td></tr>
              <tr className="border-b border-border-subtle"><td className="py-2 pr-4">2</td><td className="pr-4">Host-02</td><td className="pr-4">Revoke Honeywell vendor VPN credentials, rotate certs</td><td>API response &lt;500ms</td></tr>
              <tr className="border-b border-border-subtle"><td className="py-2 pr-4">3</td><td className="pr-4">Host-04</td><td className="pr-4">Isolate PHD Historian, validate from DCS backup</td><td>DB connection health</td></tr>
              <tr className="border-b border-border-subtle"><td className="py-2 pr-4">4</td><td className="pr-4">Host-01/02/04</td><td className="pr-4">IT/OT DMZ tightening via PA-850</td><td>Modbus/TCP &lt;200ms</td></tr>
              <tr><td className="py-2 pr-4">5</td><td className="pr-4">Host-01</td><td className="pr-4">TLS certificate rotation — ASA perimeter</td><td>Certificate chain valid</td></tr>
            </tbody>
          </table>
        ),
      },
      {
        title: "Rollback Strategy",
        content: (
          <div className="text-sm text-text-secondary space-y-2">
            <p>Pre-patch VM snapshots for all targets. Automatic rollback on: Modbus/TCP latency &gt;200ms between ControlLogix PLCs and SAGE 3030 RTUs, API latency &gt;500ms, or availability drop below 99.9%.</p>
            <p className="text-amber-400">Bill C-8 evidence sealed per batch via microledger.</p>
          </div>
        ),
      },
    ],
    actionLabel: "Approve & Execute",
    onAction: () => alert("Execution approved"),
  },
};

export const CBOMDiscoveryPlan: Story = {
  args: {
    title: "CBOM Discovery — Pipeline SCADA + IT",
    sections: [
      {
        title: "Phase 1: Automated Discovery",
        defaultOpen: true,
        content: (
          <div className="text-sm text-text-secondary space-y-2">
            <p>Scan pipeline perimeter TLS endpoints, SCADA/OT protocol fingerprints, and code repositories.</p>
            <p className="text-text-muted">Estimated duration: 8 minutes</p>
          </div>
        ),
      },
      {
        title: "Phase 2: Classification & Risk Scoring",
        content: <p className="text-sm text-text-secondary">Classify by algorithm family, key length, PQC vulnerability. Risk = data sensitivity × algorithm exposure × crypto-agility.</p>,
      },
      {
        title: "Phase 3: Gap Analysis",
        content: <p className="text-sm text-text-secondary">Identify uncovered areas: satellite-linked RTUs, vendor SCADA firmware, DR site crypto posture.</p>,
      },
    ],
    actionLabel: "Execute CBOM Discovery",
    onAction: () => alert("CBOM discovery started"),
  },
};

export const WithEnvelope: Story = {
  args: {
    ...ChainRemediation.args,
    envelope: {
      hsmlState: "HSML_ACTIVE",
      confidence: TRUST_TIMELINE[0],
      emittingCell: CELL_CYPHER_ONE,
      nistPosture: NIST_POSTURE_BASELINE[4],
      said: "E_DEMO_SAID_ENVELOPE",
    } satisfies SignalsUiEnvelope,
  },
};
