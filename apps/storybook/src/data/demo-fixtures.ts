// G1 Signals Lab — Demo Fixtures (barrel)
// Re-exports all fixture data from split modules under fixtures/

export type {
  Phase,
  Vulnerability,
  RemediationBatch,
  DashboardStats,
  ExecutionEvent,
  TimelineMilestone,
  PQCPriority,
  Priority,
  CBOMEntry,
  CBOMDiscoveryMethod,
  DiscoveryMethod,
  CBOMCoverageGap,
  CoverageGap,
  CBOMScanFailure,
  ScanFailure,
  ActionItem,
  PolicyExcerpt,
} from "../types/domain";

export * from "./fixtures/narrative";
export * from "./fixtures/cells";
export * from "./fixtures/topology";
export * from "./fixtures/messenger-packets";
export * from "./fixtures/policy-excerpts";
