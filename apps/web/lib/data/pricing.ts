export interface PricingTier {
  name: string;
  audience: string;
  includes: string[];
}

export const TIERS: PricingTier[] = [
  {
    name: "Design Partner",
    audience: "Strategic enterprises, government agencies",
    includes: [
      "Full platform access",
      "White-glove deployment",
      "Joint roadmap participation",
      "Direct founder line",
    ],
  },
  {
    name: "Lab Access",
    audience: "Researchers, allied analysts",
    includes: [
      "Sandbox environment",
      "Read-only Catalog access",
      "Lab notes and briefings",
      "Community channel",
    ],
  },
  {
    name: "Federal / Sovereign",
    audience: "Government buyers",
    includes: [
      "On-prem / sovereign cloud",
      "IRAP / FedRAMP path",
      "Custom AIDs provisioning",
      "Compliance counsel briefings",
    ],
  },
];
