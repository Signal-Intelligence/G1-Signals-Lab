import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Stratos Lab",
  "STRATOS ONE Lab — Coming Soon",
  "/lab/stratos"
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
