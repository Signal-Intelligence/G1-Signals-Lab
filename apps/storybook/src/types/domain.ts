/**
 * Domain Types
 * Shared business-domain types used by Signals UI components.
 * Extracted from demo-fixtures to eliminate component → fixture coupling.
 */

export type Phase = {
  id: string;
  time: string;
  actor: string;
  action: string;
  uiSurface: string;
  hydrationDeps: string[];
  autonomyLevel: "autonomous" | "supervised" | "manual";
};

export type Vulnerability = {
  id: string;
  cve: string;
  title: string;
  cvss: number;
  severity: "Critical" | "High" | "Medium" | "Low";
  epss: number;
  kev: boolean;
  chainability: number;
  exposure: number;
  assetCriticality: number;
  ageDays: number;
  postMythosScore: number;
  affectedSystem: string;
  cweCategory: string;
  cryptoRelated: boolean;
};

export type RemediationBatch = {
  id: string;
  name: string;
  systems: string[];
  vulns: string[];
  status: "completed" | "in_progress" | "pending" | "failed" | "rolled_back";
  startTime?: string;
  endTime?: string;
  rollbackReason?: string;
};

export type DashboardStats = {
  totalVulns: number;
  remediated: number;
  failed: number;
  rolledBack: number;
  pendingManual: number;
  trustScoreBefore: number;
  trustScoreAfter: number;
  evidenceReceipts: number;
};

export type ExecutionEvent = {
  id: string;
  timestamp: string;
  type: "patch" | "rollback" | "validation" | "escalation" | "evidence" | "health_check";
  message: string;
  system: string;
  provenanceHash: string;
};

export type TimelineMilestone = {
  date: string;
  label: string;
  description: string;
  category: "standard" | "regulatory" | "vendor" | "internal";
  risk: "high" | "medium" | "low";
};

export type PQCPriority = {
  id: string;
  title: string;
  description: string;
  rationale: string;
  estimatedEffort: string;
  owner: string;
};

export type Priority = PQCPriority;

export type CBOMEntry = {
  id: string;
  system: string;
  algorithm: string;
  keyLength: number;
  usage: string;
  pqcVulnerable: boolean;
  agility: "high" | "medium" | "low" | "none";
  riskScore: number;
};

export type CBOMDiscoveryMethod = {
  name: string;
  targetsScanned: number;
  totalTargets: number;
  status: "completed" | "in_progress" | "failed";
  itemsFound: number;
};

export type DiscoveryMethod = CBOMDiscoveryMethod;

export type CBOMCoverageGap = {
  area: string;
  description: string;
  severity: "high" | "medium" | "low";
};

export type CoverageGap = CBOMCoverageGap;

export type CBOMScanFailure = {
  method: string;
  target: string;
  error: string;
  timestamp: string;
};

export type ScanFailure = CBOMScanFailure;

export type ActionItem = {
  title: string;
  owner: string;
  priority: "critical" | "high" | "medium" | "low";
  status: "open" | "in_progress" | "done";
};

export type PolicyExcerpt = {
  id: string;
  documentTitle: string;
  section: string;
  excerpt: string;
  applicability: string;
  agentConsumer: string;
  complianceFramework: string;
};
