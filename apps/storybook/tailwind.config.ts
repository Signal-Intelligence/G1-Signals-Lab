import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
import tokens from "./src/tokens/signals-ui-tokens.json";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: tokens.color.bg,
        accent: tokens.color.accent,
        severity: tokens.color.severity,
        text: tokens.color.text,
        border: tokens.color.border,
      },
      fontFamily: {
        sans: tokens.font.family.sans,
      },
      fontWeight: {
        thin: tokens.font.weight.thin,
        extralight: tokens.font.weight.extralight,
      },
      letterSpacing: {
        eyebrow: tokens.spacing.tracking.eyebrow,
        telemetry: tokens.spacing.tracking.telemetry,
        label: tokens.spacing.tracking.label,
      },
      boxShadow: {
        "glow-blue": tokens.shadow["glow-blue"],
        "glow-blue-sm": tokens.shadow["glow-blue-sm"],
        "glow-blue-lg": tokens.shadow["glow-blue-lg"],
        "glow-dot": tokens.shadow["glow-dot"],
      },
      backgroundImage: {
        "signal-gradient": "linear-gradient(135deg, #0066ff 0%, #00ff88 100%)",
        "signal-grid":
          "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        "radial-glow":
          "radial-gradient(circle, rgba(0,102,255,0.15) 0%, rgba(0,0,0,0) 70%)",
        "diagonal-hatch":
          "url(\"data:image/svg+xml,%3Csvg width='4' height='4' viewBox='0 0 4 4' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2' stroke='%230066ff' stroke-opacity='0.1' stroke-width='1'/%3E%3C/svg%3E\")",
      },
      borderRadius: {
        none: tokens.radius.none,
        sm: tokens.radius.sm,
        DEFAULT: tokens.radius.DEFAULT,
      },
      animation: {
        "pulse-logo": "pulse-logo 4s ease-in-out infinite",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        "status-breathe": "status-breathe 4s ease-in-out infinite",
      },
      keyframes: {
        "pulse-logo": {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
        fadeIn: {
          from: { opacity: "0", transform: "translateY(4px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 6px rgba(0,102,255,0.4)" },
          "50%": { boxShadow: "0 0 14px rgba(0,102,255,0.8)" },
        },
        "status-breathe": {
          "0%, 100%": { opacity: "0.6", boxShadow: "0 0 3px rgba(0,255,136,0.2)" },
          "50%": { opacity: "1", boxShadow: "0 0 6px rgba(0,255,136,0.4)" },
        },
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".text-glow": {
          "text-shadow": "0 0 60px rgba(0,102,255,0.3)",
        },
        ".text-glow-sm": {
          "text-shadow": "0 0 30px rgba(0,102,255,0.25)",
        },
      });
    }),
  ],
} satisfies Config;
