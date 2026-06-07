import { NIST_COLORS } from "@/lib/data/dashboard";
import { NIST_FUNCTION_LABELS } from "@/lib/nist-colors";
import type { NistFunction } from "@/lib/data/dashboard";

interface TrustDecayGaugeProps {
  handle: string;
  nistFunction: NistFunction;
  confidence: number;
  lambda?: number;
  c0?: number;
}

export function TrustDecayGauge({
  handle,
  nistFunction,
  confidence,
  lambda = 0.005,
  c0,
}: TrustDecayGaugeProps) {
  const effectiveC0 = c0 ?? confidence;
  const ttd = -Math.log(0.5) / lambda;
  const ttdHours = ttd.toFixed(1);

  const color = NIST_COLORS[nistFunction] ?? 'var(--color-text-muted)';
  const label = NIST_FUNCTION_LABELS[nistFunction] ?? nistFunction;

  const cx = 60;
  const cy = 65;
  const r = 45;
  const arcLength = Math.PI * r;
  const filled = (confidence / 100) * arcLength;

  const startX = cx - r;
  const startY = cy;
  const endX = cx + r;
  const endY = cy;
  const arcPath = `M ${startX} ${startY} A ${r} ${r} 0 0 1 ${endX} ${endY}`;

  return (
    <div className="flex flex-col items-center gap-2 p-4">
      <svg viewBox="0 0 120 80" className="w-full max-w-[200px]" role="img" aria-label={`${label} gauge`}>
        <title>{label} gauge</title>
        <path
          d={arcPath}
          fill="none"
          stroke="var(--color-border-subtle)"
          strokeWidth={6}
        />
        <path
          d={arcPath}
          fill="none"
          stroke={color}
          strokeWidth={6}
          strokeLinecap="round"
          strokeDasharray={`${filled} ${arcLength}`}
          style={{ filter: `drop-shadow(0 0 6px ${color}80)` }}
        />
        <text
          x={cx}
          y={cy - 8}
          textAnchor="middle"
          fill={color}
          className="text-2xl font-light"
        >
          {confidence}%
        </text>
      </svg>

      <span className="text-sm font-medium text-white">{handle}</span>
      <span className="text-[11px] font-mono uppercase" style={{ color }}>
        {label}
      </span>

      <div className="flex items-center gap-3 text-[11px] text-text-muted">
        <span>
          C₀ <span className="text-white/80">{effectiveC0}</span>
        </span>
        <span>
          λ <span className="text-white/80">{lambda}</span>
        </span>
        <span>
          TTD <span className="text-white/80">{ttdHours}h</span>
        </span>
      </div>
    </div>
  );
}
