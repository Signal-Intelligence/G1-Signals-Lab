export interface Vulnerability {
  id: string;
  cve: string;
  title: string;
  cvss: number;
  severity: "Critical" | "High" | "Medium" | "Low";
  epss: number;
  kev: boolean;
  chainability: number;
  exposure: number;
  assetCriticality: number;
  ageDays: number;
  affectedSystem: string;
  cweCategory: string;
}

export const DEMO_VULNERABILITIES: Vulnerability[] = [
  {
    id: "vuln-901a",
    cve: "CVE-2026-901A",
    title: "Unauthenticated RCE via Edge VPN Gateway Memory Corruption",
    cvss: 9.8,
    severity: "Critical",
    epss: 0.89,
    kev: true,
    chainability: 0.96,
    exposure: 0.94,
    assetCriticality: 0.98,
    ageDays: 2,
    affectedSystem: "Host-01 (Edge VPN)",
    cweCategory: "CWE-787: Out-of-bounds Write",
  },
  {
    id: "vuln-3142",
    cve: "CVE-2026-3142",
    title: "Privilege Escalation via Internal API Authentication Bypass",
    cvss: 8.1,
    severity: "High",
    epss: 0.72,
    kev: false,
    chainability: 0.91,
    exposure: 0.7,
    assetCriticality: 0.85,
    ageDays: 5,
    affectedSystem: "Host-02 / Host-04 (Internal API)",
    cweCategory: "CWE-287: Improper Authentication",
  },
];
