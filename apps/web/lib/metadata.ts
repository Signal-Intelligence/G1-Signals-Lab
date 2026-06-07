import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export function pageMetadata(
  title: string,
  description: string,
  path = ""
): Metadata {
  const fullTitle = title === "Home" ? `${SITE.name} | ${SITE.org}` : `${title} | ${SITE.name}`;
  return {
    title: fullTitle,
    description,
    openGraph: {
      title: fullTitle,
      description,
      url: `${SITE.url}${path}`,
      siteName: SITE.name,
      type: "website",
    },
  };
}
