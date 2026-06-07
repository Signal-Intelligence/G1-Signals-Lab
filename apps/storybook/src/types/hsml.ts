/**
 * HSML State Machine, Trust Confidence, Cell Typology, and NIST CSF 2.0 Types
 * Used exclusively as prop shapes — never as context values.
 */

export type HsmlState =
  | "HSML_INIT"
  | "HSML_ACTIVE"
  | "HSML_HALTED"
  | "HSML_RESOLVED";

export type ConfidenceTier = "HIGH" | "MEDIUM" | "LOW";

export interface TrustConfidence {
  score: number;
  tier: ConfidenceTier;
  lambda: number;
  lastVerifiedAt: string;
}

export type AutonomyLevel = 1 | 2 | 3 | 4 | 5;

export type CellRole =
  | "SUPERVISOR_CORE"
  | "SENSOR_DRONE"
  | "COMPLIANCE_ENGINE"
  | "ENFORCEMENT_GATE"
  | "RECON_SCANNER"
  | "SANITIZATION_GHOST"
  | "RESPONSE_UNIT";

export interface CellIdentity {
  handle: string;
  role: CellRole;
  aid: string;
  autonomyCeiling: AutonomyLevel;
  currentAutonomy: AutonomyLevel;
  permissions: string[];
}

export type NistFunction = "GV" | "ID" | "PR" | "DE" | "RS" | "RC";

export type PostureStatus = "HYDRATED" | "ENFORCED" | "DEGRADED" | "UNKNOWN";

export interface NistPosture {
  function: NistFunction;
  category: string;
  posture: PostureStatus;
  confidence: number;
}

export function computeConfidenceTier(score: number): ConfidenceTier {
  if (score >= 0.95) return "HIGH";
  if (score >= 0.70) return "MEDIUM";
  return "LOW";
}

export function computeTrustDecay(
  c0: number,
  lambda: number,
  elapsedSeconds: number
): number {
  return c0 * Math.exp(-lambda * elapsedSeconds);
}
