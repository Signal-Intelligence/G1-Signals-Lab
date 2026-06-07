/**
 * Signals UI Envelope
 * Standard metadata prop passed to every component when agent-driven.
 * Components receive this via explicit props (never context).
 */

import type { HsmlState, TrustConfidence, CellIdentity, NistPosture } from "./hsml";
import type {
  Ieee2874TransportHeader,
  SignalsComplianceLedger,
  KeriInfrastructure,
} from "./signals-wire-schema";

export interface SignalsUiEnvelope {
  hsmlState: HsmlState;
  confidence: TrustConfidence;
  emittingCell: CellIdentity;
  nistPosture?: NistPosture;
  transport?: Ieee2874TransportHeader;
  compliance?: SignalsComplianceLedger;
  keri?: KeriInfrastructure;
  said: string;
}
