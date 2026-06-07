export interface NavLink {
  href: string;
  label: string;
  disabled?: boolean;
}

export interface FooterColumn {
  title: string;
  links: NavLink[];
}

export const PRODUCT_LINKS: NavLink[] = [
  { href: "/products/cypher1", label: "Cypher", disabled: false },
  { href: "/products/stratos1", label: "Stratos", disabled: true },
];

export const LAB_LINKS: NavLink[] = [
  { href: "/lab/cypher", label: "Cypher", disabled: false },
  { href: "/lab/stratos", label: "Stratos", disabled: true },
];

export const NAV_LINKS: NavLink[] = [
  { href: "/about", label: "About" },
  { href: "/architecture", label: "Architecture" },
  { href: "/partnerships", label: "Partnerships" },
];

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "Products",
    links: [
      { href: "/products/cypher1", label: "CYPHER ONE", disabled: false },
      { href: "/products/stratos1", label: "STRATOS ONE", disabled: true },
    ],
  },
  {
    title: "Platform",
    links: [
      { href: "/architecture", label: "Architecture" },
      { href: "/lab/cypher", label: "Lab" },
      { href: "/docs", label: "Docs", disabled: true },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About G1 Signals" },
      { href: "/partnerships", label: "Partnerships" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/trust", label: "Trust Center", disabled: true },
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
      { href: "/cookies", label: "Cookies" },
      { href: "/acceptable-use", label: "Acceptable Use" },
    ],
  },
];
