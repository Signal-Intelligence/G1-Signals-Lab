export interface PlatformBriefSection {
  heading: string;
  body: string;
}

export const KERI_VLEI_SECTIONS: PlatformBriefSection[] = [
  {
    heading: "AID structure",
    body: "Each cell operates under a KERI AID (e.g. did:keri:I2B8e84Wj_OneVictor_GSuite_Master_AID for CYPHER ONE). Events are append-only and verifiable without central authority.",
  },
  {
    heading: "Break-glass attestation",
    body: "TeamsAttestationCard surfaces vLEI biometric challenges. James Graham (1G) releases cryptographic keys from iPhone — manual autonomy, fully logged to microledger.",
  },
];

export const PQC_SECTIONS: PlatformBriefSection[] = [
  {
    heading: "FIPS 203 / 204",
    body: "FIPS 203 (ML-KEM) provides key encapsulation for session establishment. FIPS 204 (ML-DSA) replaces classical signatures in long-lived trust anchors.",
  },
  {
    heading: "CBOM lifecycle",
    body: "Discover → assess → migrate → verify. one-shadow compiles CBOM from FS_HASH and DEPENDENCY_RESOLVE permissions. QuantumInterlockCard enforces PQC-only, hybrid, or classical-allowed states.",
  },
  {
    heading: "Interlock state machine",
    body: "ENFORCEMENT_GATE blocks wire actuation when cipher policy violates interlock. Violations are catalog-registered events, not log warnings.",
  },
];

export const HSML_SECTIONS: PlatformBriefSection[] = [
  {
    heading: "Packet anatomy",
    body: "HSTP packets comprise: header block, compliance ledger, KERI infrastructure, and payload. Each payload references a catalogId — if the resolver cannot map signalsUiCatalogId to a registered entry, hydration fails closed.",
  },
  {
    heading: "Mesh transport",
    body: "Decentralized mesh nodes exchange HSTP frames with zero-latency local isolation. Cross-node actuation requires autonomy gate approval from ENFORCEMENT_GATE.",
  },
];
