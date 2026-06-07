import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { NotificationCard } from "../components/NotificationCard";
import { GeofenceHaltCard } from "../components/GeofenceHaltCard";
import { TeamsNotificationCard } from "../components/TeamsNotificationCard";
import { TeamsAttestationCard } from "../components/TeamsAttestationCard";
import { ResolutionCard } from "../components/ResolutionCard";
import { MessageCard } from "../components/MessageCard";
import { ThinkingIndicator } from "../components/ThinkingIndicator";
import { PlanCard } from "../components/PlanCard";
import { ApprovalCard } from "../components/ApprovalCard";
import { ExecutionDashboard } from "../components/ExecutionDashboard";
import { MorningDashboard } from "../components/MorningDashboard";
import {
  DEMO_VULNERABILITIES,
  DEMO_REMEDIATION_BATCHES,
  DEMO_EXECUTION_EVENTS,
  DEMO_DASHBOARD_STATS,
  DEMO_ACTION_ITEMS,
  GEOFENCE_DATA,
  ATTESTATION_DATA,
} from "../data/demo-fixtures";

const chainNodes = DEMO_VULNERABILITIES.map((v) => ({
  id: v.id,
  cve: v.cve,
  cvss: v.cvss,
  system: v.affectedSystem,
  label: v.title,
}));

const meta: Meta = {
  title: "Walkthroughs/01 — UC1 Patching",
};
export default meta;

// ---------------------------------------------------------------------------
// ACT I — 02:15 AM — Detection & Geofence
// ---------------------------------------------------------------------------

export const ActI_ChainDetected: StoryObj = {
  name: "02:15 — Chain Detected",
  render: () => (
    <div className="max-w-2xl">
      <p className="text-[10px] tracking-telemetry text-text-data uppercase mb-4">Act I — one-echo detection • Autonomy Level 2</p>
      <NotificationCard
        severity="Critical"
        title="Chaining Vulnerability Detected"
        systemCount={3}
        vulnCount={2}
        chainSummary="CVE-2026-901A (Cisco ASA 5545-X VPN RCE) chains with CVE-2026-3142 (ASA management plane auth bypass) via compromised Honeywell vendor credentials to Host-04 Honeywell PHD Historian. ArcaneDoor (UAT4356) IOCs confirmed. Bill C-8 §15 incident reporting gate ASSERTED — 72h CSE notification window active."
        timestamp="02:15 AM — June 1, 2026"
        chainNodes={chainNodes}
      />
    </div>
  ),
};

export const ActI_GeofenceHalt: StoryObj = {
  name: "02:15 — Geofence Exception",
  render: () => (
    <div className="max-w-2xl">
      <p className="text-[10px] tracking-telemetry text-text-data uppercase mb-4">Act I — Spatial fence triggered • 1G out-of-band (+2,714 KM)</p>
      <GeofenceHaltCard
        kpis={[
          { label: "OPERATOR", value: GEOFENCE_DATA.operator.split(" ")[0] },
          { label: "SITE", value: GEOFENCE_DATA.site },
          { label: "STATUS", value: "OOB", accent: "text-amber-400" },
          { label: "DELTA", value: `+${GEOFENCE_DATA.deltaKm.toLocaleString()} KM`, accent: "text-accent-danger" },
        ]}
        expectedZone={GEOFENCE_DATA.expectedZone}
        detectedZone={GEOFENCE_DATA.detectedZone}
      />
    </div>
  ),
};

export const ActI_TeamsNotification: StoryObj = {
  name: "02:15 — Teams Notification",
  render: () => (
    <div className="max-w-2xl">
      <p className="text-[10px] tracking-telemetry text-text-data uppercase mb-4">Act I — Break-glass routed to Microsoft Teams</p>
      <TeamsNotificationCard
        kpis={[
          { label: "CHAIN LENGTH", value: "3", accent: "text-accent-danger" },
          { label: "DELTA KM", value: "+2,714", accent: "text-amber-400" },
          { label: "C-8 GATE", value: "ASSERTED", accent: "text-accent-green" },
        ]}
        bullets={[
          {
            header: "CHAIN PATH",
            items: [
              "Host-01 (Cisco ASA 5545-X VPN) → CVE-2026-901A → RCE",
              "Host-02 (ASA Mgmt Plane) → CVE-2026-3142 → Auth Bypass",
              "Host-04 (Honeywell PHD Historian) → Lateral via vendor credentials",
            ],
          },
          {
            header: "GEOFENCE",
            items: [
              `Expected: ${GEOFENCE_DATA.expectedZone}`,
              `Detected: ${GEOFENCE_DATA.detectedZone}`,
            ],
          },
        ]}
      />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// ACT II — 02:17 AM — CEO Attestation
// ---------------------------------------------------------------------------

export const ActII_Attestation: StoryObj = {
  name: "02:17 — CEO Attestation",
  render: () => (
    <div className="max-w-2xl">
      <p className="text-[10px] tracking-telemetry text-text-data uppercase mb-4">Act II — 1G break-glass attestation via Teams • vLEI + iPhone Secure Enclave</p>
      <TeamsAttestationCard
        metadata={[
          { label: "IDENTITY", value: ATTESTATION_DATA.identity },
          { label: "AUTHORITY", value: ATTESTATION_DATA.governingAuthority },
          { label: "TEE STATUS", value: ATTESTATION_DATA.teeStatus },
          { label: "BYPASS LEVEL", value: ATTESTATION_DATA.bypassLevel },
        ]}
      />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// ACT III — 02:18–02:25 AM — Resolution, Planning, Approval
// ---------------------------------------------------------------------------

export const ActIII_Resolution: StoryObj = {
  name: "02:18 — Enclave Verified",
  render: () => (
    <div className="max-w-2xl">
      <p className="text-[10px] tracking-telemetry text-text-data uppercase mb-4">Act III — Microledger assertion verified • Trust restored</p>
      <ResolutionCard
        events={[
          { time: "02:17", event: "vLEI credential validated via KERI witness network" },
          { time: "02:17", event: "iPhone Secure Enclave signature verified (Face ID)" },
          { time: "02:18", event: "Microledger KEL event #4291 sealed" },
          { time: "02:18", event: "Geofence bypass LEVEL_4 authorized — confidence restored to HIGH" },
        ]}
      />
    </div>
  ),
};

export const ActIII_CypherAnalysis: StoryObj = {
  name: "02:18 — CYPHER ONE Analysis",
  render: () => (
    <div className="max-w-2xl">
      <p className="text-[10px] tracking-telemetry text-text-data uppercase mb-4">Act III — CYPHER ONE builds remediation plan • Autonomy Level 3</p>
      <MessageCard
        sender="CYPHER ONE"
        sections={[
          { title: "Chain Analysis", content: "CVE-2026-901A on Host-01 (Cisco ASA 5545-X VPN) chains with CVE-2026-3142 on Host-02 (ASA Mgmt Plane) via compromised Honeywell Secure Connection vendor credentials to Host-04 (Honeywell PHD Historian). ArcaneDoor campaign (UAT4356). Combined CVSS path score: 9.8." },
          { title: "Blast Radius", content: "3 systems on Tier-0 Prairie Fuels operations path. Potential impact: false process data injection to Experion HMI operators, SCADA telemetry disruption, Bill C-8 §15 72-hour CSE notification triggered." },
          { title: "Recommendation", content: "Immediate Level-4 autonomous remediation: ASA firmware upgrade (9.16.4.85), vendor credential revocation, PHD Historian isolation, IT/OT DMZ tightening via PA-850, TLS certificate rotation. Rollback on Modbus/TCP latency >200ms between ControlLogix PLCs and SAGE 3030 RTUs." },
        ]}
        actionLabel="Build Remediation Plan"
      />
    </div>
  ),
};

export const ActIII_Thinking: StoryObj = {
  name: "02:19 — Building Plan",
  render: () => (
    <div className="max-w-2xl">
      <p className="text-[10px] tracking-telemetry text-text-data uppercase mb-4">Act III — one-vector orchestration</p>
      <ThinkingIndicator
        steps={[
          "Scanning Prairie Fuels asset inventory via Claroty xDome (Honeywell DCS + Cisco ASA + IT)",
          "Building dependency graph — ASA VPN / ASA Mgmt / PHD Historian blast radius",
          "Running post-Mythos priority scoring (EPSS + KEV + ArcaneDoor IOC correlation)",
          "Generating time-boxed remediation plan with Modbus/TCP and DCS health gates",
        ]}
        currentStep={2}
        isComplete={false}
      />
    </div>
  ),
};

export const ActIII_PlanPresented: StoryObj = {
  name: "02:20 — Plan Presented",
  render: () => (
    <div className="max-w-3xl">
      <p className="text-[10px] tracking-telemetry text-text-data uppercase mb-4">Act III — Awaiting CISO approval</p>
      <PlanCard
        title="CVE-2026-901A/3142 Chain Remediation"
        sections={[
          {
            title: "Remediation Sequence",
            defaultOpen: true,
            content: (
              <table className="w-full text-sm">
                <thead><tr className="border-b border-border-default text-text-muted text-[11px] uppercase tracking-telemetry"><th className="text-left py-2 pr-4">Batch</th><th className="text-left py-2 pr-4">Target</th><th className="text-left py-2 pr-4">Action</th><th className="text-left py-2">Gate</th></tr></thead>
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
            content: <p className="text-sm text-text-secondary">Pre-patch VM snapshots for all targets. Automatic rollback on Modbus/TCP latency &gt;200ms between ControlLogix PLCs and SAGE 3030 RTUs, API latency &gt;500ms, or any availability drop below 99.9%. Bill C-8 §9(1) evidence sealed per batch on microledger.</p>,
          },
        ]}
        actionLabel="Approve & Execute"
      />
    </div>
  ),
};

export const ActIII_CISOApproves: StoryObj = {
  name: "02:20 — CISO Approves",
  render: () => (
    <div className="max-w-2xl">
      <p className="text-[10px] tracking-telemetry text-text-data uppercase mb-4">Act III — Lewis Cypher grants Level 4 execution</p>
      <ApprovalCard
        approver="Lewis Cypher, CISO"
        timestamp="02:20 AM — June 1, 2026"
        provenanceHash="sha256:a7f3c9e2d1b84f6a3e5c7d9b1a0f8e2c4d6b8a0e"
        scope="Approved: Execute CVE-2026-901A/3142 ArcaneDoor chain remediation — 5 batches, overnight Level 4 autonomous, time-boxed 02:25–06:30. Bill C-8 §9(1) cybersecurity program compliance mandatory. CSE notification filed per §15."
        status="approved"
      />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// ACT IV — Overnight Execution
// ---------------------------------------------------------------------------

export const ActIV_Execution: StoryObj = {
  name: "Overnight — Execution Dashboard",
  render: () => (
    <div className="max-w-4xl">
      <p className="text-[10px] tracking-telemetry text-text-data uppercase mb-4">Act IV — Level 4 autonomous remediation • 02:25–06:30 AM</p>
      <ExecutionDashboard
        batches={DEMO_REMEDIATION_BATCHES}
        events={DEMO_EXECUTION_EVENTS}
        trustScore={{ before: 62, after: 89 }}
        evidenceCount={47}
      />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// ACT V — 07:00 AM — Morning Briefing
// ---------------------------------------------------------------------------

export const ActV_MorningBriefing: StoryObj = {
  name: "07:00 — Morning Dashboard",
  render: () => (
    <div className="max-w-4xl">
      <p className="text-[10px] tracking-telemetry text-text-data uppercase mb-4">Act V — Morning executive summary • Bill C-8 VERIFIED_COMPLIANT</p>
      <MorningDashboard
        stats={DEMO_DASHBOARD_STATS}
        batches={DEMO_REMEDIATION_BATCHES}
        events={DEMO_EXECUTION_EVENTS}
        actionItems={DEMO_ACTION_ITEMS}
      />
    </div>
  ),
};
