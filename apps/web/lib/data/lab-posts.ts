export interface LabPost {
  slug: string;
  title: string;
  tag: string;
  date: string;
  excerpt: string;
  content: string;
}

export const LAB_POSTS: LabPost[] = [
  {
    slug: "reading-hstp",
    title: "Reading HSTP-1.0: A Field Guide",
    tag: "Standards note",
    date: "2026-05-28",
    excerpt: "Deep dive on IEEE 2874 packet anatomy — header, compliance ledger, KERI, payload.",
    content: `HSTP-1.0 frames are the wire contract for policy-governed autonomy. Every payload block carries a **signalsUiCatalogId** that must resolve against the signed Catalog registry.

## Packet blocks

1. **Header** — version, mesh node ID, autonomy level at emit time
2. **Compliance ledger** — Bill C-8 / NIST crosswalk hashes
3. **KERI infrastructure** — event SAID, anchor digest
4. **Payload** — catalogId + hydrated props envelope

If resolution fails, hydration returns \`REFUSED_UNREGISTERED_SURFACE\` — the runtime does not fall back to generic UI.`,
  },
  {
    slug: "catalog-entry-28",
    title: "Catalog Entry #28: priority list with confidence tiers",
    tag: "Lab release",
    date: "2026-05-30",
    excerpt: "Release notes for signals-ui-catalog-list--priority.",
    content: `**signals-ui-catalog-list--priority** is now registered under SUPERVISOR_CORE with NIST function RS (Respond).

The surface renders ranked items with confidence tiers (A/B/C), wired to the overnight remediation narrative. Catalog version bump: \`2026.05.30-rc1\`.`,
  },
  {
    slug: "chain-analysis-901a-3142",
    title: "Chain Analysis: CVE-2026-901A → CVE-2026-3142",
    tag: "Threat briefing",
    date: "2026-05-31",
    excerpt: "Fixture chain analysis across Host-01/02/04.",
    content: `one-echo detected **CVE-2026-901A** (Critical, CVSS 9.8, KEV) on Host-01 Edge VPN, chained to **CVE-2026-3142** (High, CVSS 8.1) on Host-02/04 Internal API.

Chainability scores: 0.96 → 0.91. EPSS: 0.89 / 0.72. This chain drives the UC1 patching walkthrough timeline starting at 02:15 AM, June 1 2026.`,
  },
];

export function getLabPost(slug: string): LabPost | undefined {
  return LAB_POSTS.find((p) => p.slug === slug);
}
