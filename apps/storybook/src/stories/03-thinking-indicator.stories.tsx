import type { Meta, StoryObj } from "@storybook/react";
import { ThinkingIndicator } from "../components/ThinkingIndicator";
import { CELL_CYPHER_ONE, TRUST_TIMELINE, NIST_POSTURE_BASELINE } from "../data/demo-fixtures";
import type { SignalsUiEnvelope } from "../types/signals-ui-envelope";

const meta: Meta<typeof ThinkingIndicator> = {
  title: "Signal Components/03 — Thinking Indicator",
  component: ThinkingIndicator,
  tags: ["autodocs"],
  argTypes: {
    currentStep: { control: { type: "number", min: 0, max: 10 } },
  },
};
export default meta;
type Story = StoryObj<typeof ThinkingIndicator>;

export const RemediationPlan: Story = {
  args: {
    steps: [
      "Scanning pipeline asset inventory (SCADA + IT)",
      "Building dependency graph — Host-01/02/04 blast radius",
      "Running post-Mythos priority scoring (EPSS + KEV + chainability)",
      "Generating time-boxed remediation plan with SCADA health gates",
    ],
    currentStep: 2,
    isComplete: false,
  },
};

export const PlanComplete: Story = {
  args: {
    steps: [
      "Scanning pipeline asset inventory (SCADA + IT)",
      "Building dependency graph — Host-01/02/04 blast radius",
      "Running post-Mythos priority scoring (EPSS + KEV + chainability)",
      "Generating time-boxed remediation plan with SCADA health gates",
    ],
    currentStep: 3,
    isComplete: true,
  },
};

export const CBOMScan: Story = {
  args: {
    steps: [
      "Scanning SCADA/OT protocol fingerprints",
      "Inventorying TLS endpoints (pipeline perimeter)",
      "Analyzing code repositories for crypto usage",
      "Detecting runtime libraries on OT systems",
      "Generating CycloneDX 1.6 CBOM",
    ],
    currentStep: 1,
    isComplete: false,
  },
};

export const QuantumReadiness: Story = {
  args: {
    steps: [
      "Analyzing CBOM inventory results",
      "Assessing harvest-now-decrypt-later exposure",
      "Mapping Bill C-8 quantum mandate requirements",
      "Building FIPS-203/204 migration sequence",
      "Generating PQC readiness plan",
    ],
    currentStep: 2,
    isComplete: false,
  },
};

export const WithEnvelope: Story = {
  args: {
    ...RemediationPlan.args,
    envelope: {
      hsmlState: "HSML_ACTIVE",
      confidence: TRUST_TIMELINE[0],
      emittingCell: CELL_CYPHER_ONE,
      nistPosture: NIST_POSTURE_BASELINE[4],
      said: "E_DEMO_SAID_ENVELOPE",
    } satisfies SignalsUiEnvelope,
  },
};
