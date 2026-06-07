export interface PlatformPage {
  href: string;
  title: string;
  desc: string;
  icon: string;
}

export const PLATFORM_PAGES: PlatformPage[] = [
  { href: "/platform/hsml", title: "HSML / HSTP-1.0", desc: "IEEE 2874 transport", icon: "◆" },
  { href: "/platform/keri-vlei", title: "KERI / vLEI", desc: "Decentralized identity", icon: "▣" },
  { href: "/platform/nist-csf", title: "NIST CSF 2.0", desc: "Six-function matrix", icon: "▲" },
  { href: "/platform/pqc", title: "Post-Quantum", desc: "FIPS 203/204", icon: "◈" },
];
