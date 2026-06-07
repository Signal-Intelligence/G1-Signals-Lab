import type { Meta, StoryObj } from "@storybook/react";
import { TeamsAttestationCard } from "../components/TeamsAttestationCard";
import { ATTESTATION_DATA, CELL_ONE_VECTOR, TRUST_TIMELINE, NIST_POSTURE_BASELINE } from "../data/demo-fixtures";
import type { SignalsUiEnvelope } from "../types/signals-ui-envelope";

const meta: Meta<typeof TeamsAttestationCard> = {
  title: "Signal Components/14 — Teams Attestation Card",
  component: TeamsAttestationCard,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof TeamsAttestationCard>;

export const CEOAttestation: Story = {
  args: {
    metadata: [
      { label: "IDENTITY", value: ATTESTATION_DATA.identity },
      { label: "AUTHORITY", value: ATTESTATION_DATA.governingAuthority },
      { label: "TEE STATUS", value: ATTESTATION_DATA.teeStatus },
      { label: "BYPASS LEVEL", value: ATTESTATION_DATA.bypassLevel },
    ],
  },
};

export const WithEnvelope: Story = {
  args: {
    ...CEOAttestation.args,
    envelope: {
      hsmlState: "HSML_ACTIVE",
      confidence: TRUST_TIMELINE[0],
      emittingCell: CELL_ONE_VECTOR,
      nistPosture: NIST_POSTURE_BASELINE[2],
      said: "E_DEMO_SAID_ENVELOPE",
    } satisfies SignalsUiEnvelope,
  },
};
