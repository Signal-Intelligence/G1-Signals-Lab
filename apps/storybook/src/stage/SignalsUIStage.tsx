/**
 * Signals UI Stage
 * Stateless viewport that receives a full HSTP-1.0 Messenger packet,
 * resolves signalsUiCatalogId against the Catalog, and renders the
 * target component with signalsUiProperties + SignalsUiEnvelope as explicit props.
 */

import React from "react";
import type { SignalsUiMessenger } from "../types/signals-wire-schema";
import type { SignalsUiEnvelope } from "../types/signals-ui-envelope";
import type { TrustConfidence, CellIdentity, HsmlState } from "../types/hsml";
import { resolveCatalogEntry } from "../catalog/signals-ui-catalog";
import { computeConfidenceTier } from "../types/hsml";

export interface SignalsUIStageProps {
  messenger: SignalsUiMessenger;
  hsmlState?: HsmlState;
  emittingCell?: CellIdentity;
  confidence?: TrustConfidence;
  ambientCanvas?: React.ReactNode;
}

function BlockedEntry({ catalogId }: { catalogId: string }) {
  return (
    <div className="glass-panel border-l-2 border-l-severity-critical rounded-none p-5">
      <div className="flex items-center gap-2.5 mb-3">
        <div className="w-2 h-2 rounded-full bg-severity-critical" />
        <span className="text-[11px] font-medium uppercase tracking-label text-severity-critical">
          CATALOG VIOLATION
        </span>
      </div>
      <p className="text-sm font-light text-text-secondary">
        Component <span className="text-white font-mono text-xs">{catalogId}</span> is not registered
        in the Signals UI Catalog. Rendering blocked per invariant rule.
      </p>
      <div className="mt-3 pt-3 border-t border-border-subtle">
        <span className="telemetry">INVARIANT: IF NOT DECLARED, CANNOT RENDER</span>
      </div>
    </div>
  );
}

export function SignalsUIStage({
  messenger,
  hsmlState = "HSML_ACTIVE",
  emittingCell,
  confidence,
  ambientCanvas,
}: SignalsUIStageProps) {
  const { ieee_2874_transport_header, signals_compliance_ledger, keri_infrastructure, g1_signals_payload_blocks } =
    messenger;

  return (
    <div className="relative min-h-[200px]">
      {ambientCanvas && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
          {ambientCanvas}
        </div>
      )}

      <div className="relative z-10 space-y-4">
        {g1_signals_payload_blocks.map((block) => {
          const entry = resolveCatalogEntry(block.signalsUiCatalogId);

          if (!entry) {
            return <BlockedEntry key={block.said} catalogId={block.signalsUiCatalogId} />;
          }

          const resolvedConfidence: TrustConfidence = confidence ?? {
            score: 0.98,
            tier: computeConfidenceTier(0.98),
            lambda: 0.005,
            lastVerifiedAt: "2026-06-01T02:15:00Z",
          };

          const resolvedCell: CellIdentity = emittingCell ?? {
            handle: "CYPHER ONE",
            role: entry.owningCell,
            aid: ieee_2874_transport_header.routing_context_aid,
            autonomyCeiling: 4,
            currentAutonomy: 4,
            permissions: [],
          };

          const envelope: SignalsUiEnvelope = {
            hsmlState,
            confidence: resolvedConfidence,
            emittingCell: resolvedCell,
            nistPosture: {
              function: entry.nistFunction,
              category: `${entry.nistFunction}.01`,
              posture: "HYDRATED",
              confidence: resolvedConfidence.score,
            },
            transport: ieee_2874_transport_header,
            compliance: signals_compliance_ledger,
            keri: keri_infrastructure,
            said: block.said,
          };

          const Component = entry.component;
          return (
            <Component
              key={block.said}
              {...block.signalsUiProperties}
              envelope={envelope}
            />
          );
        })}
      </div>
    </div>
  );
}

export default SignalsUIStage;
