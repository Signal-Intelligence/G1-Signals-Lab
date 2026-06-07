export const SITE = {
  name: "G1 Signals Lab",
  org: "G1 Signals Labs Inc.",
  tagline: "Cryptographically governed autonomy.",
  positioning:
    "A policy-governed secure state machine at the intelligent edge. Decentralized mesh architecture with zero-latency local isolation and cryptographic provenance.",
  footerTelemetry: "G1 SIGNALS LAB // SIGNAL INTELLIGENCE INC. // CONFIDENTIAL",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://g1signals.lab",
} as const;
