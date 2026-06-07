import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { LAB_POSTS } from "@/lib/data/lab-posts";
import { DOCS_SECTIONS } from "@/lib/data/docs-sections";

const staticRoutes = [
  "",
  "/products",
  "/products/cypher1",
  "/products/stratos1",
  "/architecture",
  "/partnerships",
  "/product",
  "/use-cases",
  "/use-cases/patching",
  "/use-cases/quantum",
  "/use-cases/bill-c8",
  "/platform",
  "/platform/hsml",
  "/platform/keri-vlei",
  "/platform/nist-csf",
  "/platform/pqc",
  "/trust",
  "/trust/security",
  "/trust/compliance",
  "/trust/responsible-ai",
  "/about",
  "/pricing",
  "/contact",
  "/lab",
  "/lab/cypher",
  "/docs",
  "/privacy",
  "/terms",
  "/cookies",
  "/acceptable-use",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url;
  return [
    ...staticRoutes.map((path) => ({
      url: `${base}${path}`,
      lastModified: new Date(),
    })),
    ...LAB_POSTS.map((p) => ({
      url: `${base}/lab/${p.slug}`,
      lastModified: new Date(),
    })),
    ...DOCS_SECTIONS.map((s) => ({
      url: `${base}/docs/${s.slug}`,
      lastModified: new Date(),
    })),
  ];
}
