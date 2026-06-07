import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { SITE } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} | ${SITE.org}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.positioning,
  icons: { icon: "/brand/bull-favicon.png" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-bg-primary font-sans antialiased relative">
        <div className="holo-sweep" aria-hidden="true" />
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        <Nav />
        <main id="main-content" className="relative z-[1]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
