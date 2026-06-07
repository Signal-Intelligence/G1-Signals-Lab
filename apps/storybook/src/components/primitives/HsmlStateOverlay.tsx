import type { HsmlState } from "../../types/hsml";

export interface HsmlStateOverlayProps {
  hsmlState: HsmlState;
  onAttestation?: () => void;
}

export function HsmlStateOverlay({ hsmlState, onAttestation }: HsmlStateOverlayProps) {
  if (hsmlState === "HSML_ACTIVE") return null;

  if (hsmlState === "HSML_HALTED") {
    return (
      <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-bg-primary/80 backdrop-blur-sm border border-severity-critical/30">
        <div className="flex flex-col items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-severity-critical animate-glow-pulse" />
          <span className="text-[10px] font-medium uppercase tracking-eyebrow text-severity-critical">
            HSML_HALTED
          </span>
          <span className="text-[9px] text-text-muted max-w-48 text-center">
            Trust confidence below threshold. Biometric re-attestation required.
          </span>
          {onAttestation && (
            <button
              onClick={onAttestation}
              className="signal-btn-primary mt-2 text-[9px]"
            >
              RE-ATTEST
            </button>
          )}
        </div>
      </div>
    );
  }

  if (hsmlState === "HSML_INIT") {
    return (
      <div className="absolute inset-0 z-50 flex items-center justify-center bg-bg-primary/60 backdrop-blur-[2px]">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-accent-blue animate-glow-pulse" />
          <span className="text-[10px] font-medium uppercase tracking-eyebrow text-text-muted">
            INITIALIZING
          </span>
        </div>
      </div>
    );
  }

  if (hsmlState === "HSML_RESOLVED") {
    return (
      <div className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none">
        <div className="absolute inset-0 border border-accent-green/20" />
        <span className="text-[9px] font-medium uppercase tracking-eyebrow text-accent-green bg-bg-primary/80 px-3 py-1">
          SEALED
        </span>
      </div>
    );
  }

  return null;
}
