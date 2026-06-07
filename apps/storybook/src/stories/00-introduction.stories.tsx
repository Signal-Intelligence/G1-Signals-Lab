import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { G1SignalsOverviewPage } from "../components/G1SignalsOverviewPage";
import { NistAgenticDashboard } from "../components/NistAgenticDashboard";
import { ScenarioBriefingPage } from "../components/ScenarioBriefingPage";
import {
  COMPANY_ORIGIN,
  TECH_GLANCE_LAYERS,
  SCENARIO_ENTITIES,
  DEMO_TIMELINE_ARC,
  SCENARIO_RATIONALE,
} from "../data/demo-fixtures";
import {
  NIST_CELL_MAPPINGS,
  CELL_REGISTRY,
} from "../data/demo-fixtures";

const meta: Meta = {
  title: "Walkthroughs/00 — Introduction",
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj;

export const G1SignalsOverview: Story = {
  name: "G1 Signals Overview",
  render: () => (
    <div className="max-w-2xl mx-auto space-y-4">
      <p className="text-[10px] uppercase tracking-telemetry text-text-muted mb-2">
        // SECTION 00 — G1 SIGNALS OVERVIEW
      </p>
      <G1SignalsOverviewPage
        headline={COMPANY_ORIGIN.headline}
        origins={COMPANY_ORIGIN.origins}
        layers={TECH_GLANCE_LAYERS}
      />
    </div>
  ),
};

export const ProductOverview: Story = {
  name: "Product Overview",
  render: () => (
    <div className="max-w-4xl mx-auto space-y-4">
      <p className="text-[10px] uppercase tracking-telemetry text-text-muted mb-2">
        // SECTION 00 — NIST CSF 2.0 AGENTIC ECOSYSTEM
      </p>
      <NistAgenticDashboard
        mappings={NIST_CELL_MAPPINGS}
        registry={CELL_REGISTRY}
      />
    </div>
  ),
};

export const ScenarioBriefing: Story = {
  name: "Scenario Briefing",
  render: () => (
    <div className="max-w-2xl mx-auto space-y-4">
      <p className="text-[10px] uppercase tracking-telemetry text-text-muted mb-2">
        // SECTION 00 — SCENARIO BRIEFING
      </p>
      <ScenarioBriefingPage
        title={SCENARIO_ENTITIES.title}
        scenario={SCENARIO_ENTITIES.scenario}
        personas={SCENARIO_ENTITIES.personas}
        timeline={DEMO_TIMELINE_ARC}
        rationale={SCENARIO_RATIONALE}
      />
    </div>
  ),
};
