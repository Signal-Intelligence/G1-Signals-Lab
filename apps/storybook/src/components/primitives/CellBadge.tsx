import type { CellIdentity } from "../../types/hsml";

export interface CellBadgeProps {
  cell: CellIdentity;
}

const ROLE_ICONS: Record<string, string> = {
  SUPERVISOR_CORE: "\u25C6",
  SENSOR_DRONE: "\u25CE",
  COMPLIANCE_ENGINE: "\u25A3",
  ENFORCEMENT_GATE: "\u25B2",
  RECON_SCANNER: "\u25C8",
  SANITIZATION_GHOST: "\u25CB",
  RESPONSE_UNIT: "\u25CA",
};

export function CellBadge({ cell }: CellBadgeProps) {
  return (
    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 border border-border-subtle rounded-sm bg-bg-glass text-[9px] font-medium uppercase tracking-label text-text-muted">
      <span className="text-accent-blue">{ROLE_ICONS[cell.role] ?? "\u25A1"}</span>
      <span>{cell.handle}</span>
      <span className="text-text-data">L{cell.currentAutonomy}</span>
    </span>
  );
}
