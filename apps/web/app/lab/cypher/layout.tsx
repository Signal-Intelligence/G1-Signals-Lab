import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Cypher Lab",
  "CYPHER ONE Implementation Dashboard — real-time NIST CSF compliance monitoring",
  "/lab/cypher"
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
