import React from "react";

export interface DiagonalAccentProps {
  width?: number;
  height?: number;
  showHatch?: boolean;
  showConnector?: boolean;
  connectorY?: number;
  lineX?: number;
  className?: string;
}

export function DiagonalAccent({
  width = 800,
  height = 600,
  showHatch = false,
  showConnector = false,
  connectorY = 0.5,
  lineX = 0.6,
  className = "",
}: DiagonalAccentProps) {
  const lx = Math.round(width * lineX);
  const cy = Math.round(height * connectorY);

  return (
    <svg
      className={`absolute inset-0 w-full h-full pointer-events-none z-0 ${className}`}
      preserveAspectRatio="none"
      viewBox={`0 0 ${width} ${height}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {showHatch && (
          <pattern
            id="diag-hatch"
            width="4"
            height="4"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2"
              stroke="#0066ff"
              strokeOpacity="0.1"
              strokeWidth="1"
            />
          </pattern>
        )}
      </defs>

      {showHatch && (
        <path
          d={`M${Math.round(width * 0.02)} ${height} L${Math.round(width * 0.35)} ${Math.round(height * 0.15)} L${Math.round(width * 0.55)} ${height} Z`}
          fill="url(#diag-hatch)"
          opacity="0.4"
        />
      )}

      {/* Primary diagonal line */}
      <line
        x1={lx}
        y1="0"
        x2={lx - Math.round(width * 0.12)}
        y2={height}
        stroke="#0066ff"
        strokeOpacity="0.5"
        strokeWidth="1"
      />
      {/* Secondary offset lines */}
      <line
        x1={lx + Math.round(width * 0.025)}
        y1="0"
        x2={lx - Math.round(width * 0.095)}
        y2={height}
        stroke="#0066ff"
        strokeOpacity="0.2"
        strokeWidth="1"
      />
      <line
        x1={lx - Math.round(width * 0.025)}
        y1="0"
        x2={lx - Math.round(width * 0.145)}
        y2={height}
        stroke="#0066ff"
        strokeOpacity="0.2"
        strokeWidth="1"
      />

      {showConnector && (
        <>
          <circle cx={lx - Math.round(width * 0.06)} cy={cy} r="2" fill="#0066ff" />
          <line
            x1={lx - Math.round(width * 0.06)}
            y1={cy}
            x2={lx + Math.round(width * 0.12)}
            y2={cy}
            stroke="#0066ff"
            strokeOpacity="0.3"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
          <circle cx={lx + Math.round(width * 0.12)} cy={cy} r="2" fill="#0066ff" />
        </>
      )}
    </svg>
  );
}

export default DiagonalAccent;
