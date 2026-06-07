import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { KpiRibbon } from "../components/KpiRibbon";
import type { KpiEntry } from "../components/KpiRibbon";

const meta: Meta<typeof KpiRibbon> = {
  title: "Signal Components/28 — KPI Ribbon",
  component: KpiRibbon,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof KpiRibbon>;

const ecosystemKpis: KpiEntry[] = [
  {
    label: "TOTAL AGENTS",
    value: "7",
    drilldown: [
      { label: "CYPHER ONE", value: "Orchestrator", detail: "Supervisor Core \u2014 delegates all domain actions to bound agents" },
      { label: "one-intel", value: "GV", detail: "Compliance Engine \u2014 policy interpretation and regulatory crosswalks" },
      { label: "one-shadow", value: "ID", detail: "Recon Scanner \u2014 asset discovery and CBOM compilation" },
      { label: "one-vector", value: "PR", detail: "Enforcement Gate \u2014 quantum interlocks and containment" },
      { label: "one-echo", value: "DE", detail: "Sensor Drone \u2014 read-only network monitoring and correlation" },
      { label: "one-surge", value: "RS", detail: "Response Unit \u2014 playbook execution under governance" },
      { label: "one-ghost", value: "RC", detail: "Sanitization Ghost \u2014 evidence sealing and workspace cleanup" },
    ],
  },
  {
    label: "HYDRATION COVERAGE",
    value: "92%",
    drilldown: [
      { label: "GOVERN", value: "98%", detail: "Policy documents, regulatory feeds, and compliance ledger fully ingested" },
      { label: "IDENTIFY", value: "94%", detail: "Asset inventory current \u2014 2 legacy OT subsystems pending passive scan" },
      { label: "PROTECT", value: "96%", detail: "Enforcement rules deployed across all perimeter and DMZ endpoints" },
      { label: "DETECT", value: "97%", detail: "SIEM integration active \u2014 Claroty xDome and Splunk feeds nominal" },
      { label: "RESPOND", value: "99%", detail: "All playbook matrices loaded and validated against current topology" },
      { label: "RECOVER", value: "87%", detail: "Backup validation pending for 2 Schneider SAGE 3030 RTU configs" },
    ],
  },
  {
    label: "AVG CONFIDENCE",
    value: "96%",
    drilldown: [
      { label: "one-intel", value: "98%", detail: "Last attested 12 min ago \u2014 HIGH tier" },
      { label: "one-shadow", value: "94%", detail: "Last attested 28 min ago \u2014 MEDIUM tier" },
      { label: "one-vector", value: "96%", detail: "Last attested 18 min ago \u2014 HIGH tier" },
      { label: "one-echo", value: "97%", detail: "Last attested 8 min ago \u2014 HIGH tier" },
      { label: "one-surge", value: "99%", detail: "Last attested 3 min ago \u2014 HIGH tier" },
      { label: "one-ghost", value: "92%", detail: "Last attested 45 min ago \u2014 MEDIUM tier" },
    ],
  },
  {
    label: "ACTIVE GATES",
    value: "6/6",
    drilldown: [
      { label: "GV Gate", value: "ACTIVE", detail: "Compliance assertions require HITL review" },
      { label: "ID Gate", value: "ACTIVE", detail: "Asset discovery scoped to authorized network segments" },
      { label: "PR Gate", value: "ACTIVE", detail: "FIPS 203/204 quantum interlock enforced" },
      { label: "DE Gate", value: "ACTIVE", detail: "Read-only invariant enforced" },
      { label: "RS Gate", value: "ACTIVE", detail: "Playbook execution bounded by approved envelope" },
      { label: "RC Gate", value: "ACTIVE", detail: "KEL integrity lock \u2014 history immutable" },
    ],
  },
];

export const EcosystemKPIs: Story = {
  args: {
    items: ecosystemKpis,
  },
};

export const SimpleKPIs: Story = {
  args: {
    items: [
      { label: "INCIDENTS", value: "3" },
      { label: "RESOLVED", value: "2" },
      { label: "PENDING", value: "1" },
    ],
    columns: 3,
  },
};
