import type { Meta, StoryObj } from "@storybook/react";
import { ApprovalCard } from "../components/ApprovalCard";
import { CELL_ONE_INTEL, TRUST_TIMELINE, NIST_POSTURE_BASELINE } from "../data/demo-fixtures";
import type { SignalsUiEnvelope } from "../types/signals-ui-envelope";

const meta: Meta<typeof ApprovalCard> = {
  title: "Signal Components/05 — Approval Card",
  component: ApprovalCard,
  tags: ["autodocs"],
  argTypes: {
    status: { control: "select", options: ["approved", "pending", "rejected"] },
  },
};
export default meta;
type Story = StoryObj<typeof ApprovalCard>;

export const CISOApproved: Story = {
  args: {
    approver: "Lewis Cypher, CISO",
    timestamp: "02:20 AM — June 1, 2026",
    provenanceHash: "sha256:a7f3c9e2d1b84f6a3e5c7d9b1a0f8e2c4d6b8a0e",
    scope: "Execute CVE-2026-901A/3142 ArcaneDoor chain remediation — 5 batches, overnight Level 4 autonomous, time-boxed 02:25–06:30. Bill C-8 §9(1) compliance mandatory. CSE notification filed per §15.",
    status: "approved",
  },
};

export const PendingApproval: Story = {
  args: {
    approver: "Lewis Cypher, CISO",
    timestamp: "02:20 AM — June 1, 2026",
    provenanceHash: "sha256:pending...",
    scope: "CBOM discovery scan — pipeline SCADA + IT, read-only, one-shadow cell",
    status: "pending",
  },
};

export const Rejected: Story = {
  args: {
    approver: "Lewis Cypher, CISO",
    timestamp: "02:20 AM — June 1, 2026",
    provenanceHash: "sha256:b2e4d1f8a9c37e2b1d5f8a0c3e6b9d2f4a7c0e3b",
    scope: "Production patching outside maintenance window — SCADA safety risk",
    status: "rejected",
  },
};

export const WithEnvelope: Story = {
  args: {
    ...CISOApproved.args,
    envelope: {
      hsmlState: "HSML_ACTIVE",
      confidence: TRUST_TIMELINE[0],
      emittingCell: CELL_ONE_INTEL,
      nistPosture: NIST_POSTURE_BASELINE[0],
      said: "E_DEMO_SAID_ENVELOPE",
    } satisfies SignalsUiEnvelope,
  },
};
