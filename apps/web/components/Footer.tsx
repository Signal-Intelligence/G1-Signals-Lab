import Link from "next/link";
import Image from "next/image";
import { SITE } from "@/lib/site";
import { FOOTER_COLUMNS } from "@/lib/data/navigation";

export function Footer() {
  return (
    <footer className="border-t border-border-subtle px-6 py-16 md:px-12 lg:px-32">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/4 space-y-4">
          <Image
            src="/brand/bull-nav.png"
            alt=""
            width={40}
            height={40}
            className="opacity-40"
            aria-hidden="true"
          />
          <p className="font-mono text-[11px] text-text-muted tracking-wider">
            {SITE.tagline}
          </p>
        </div>

        <div className="lg:w-3/4 grid grid-cols-2 md:grid-cols-4 gap-8">
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="text-[11px] font-medium uppercase tracking-[var(--tracking-eyebrow)] text-text-muted mb-4">
                {col.title}
              </p>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l.href}>
                    {"disabled" in l && l.disabled ? (
                      <span className="text-[11px] text-text-muted/40 cursor-default">
                        {l.label}
                        <span className="text-[11px] normal-case tracking-normal text-accent-blue/50 ml-2">Coming Soon</span>
                      </span>
                    ) : (
                      <Link
                        href={l.href}
                        className="focus-ring text-[11px] text-text-secondary hover:text-accent-blue transition-colors"
                      >
                        {l.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <hr className="my-8 border-0 border-t border-border-subtle" />

      <div className="flex items-center justify-between">
        <p className="text-[11px] text-text-muted">
          &copy; {new Date().getFullYear()} {SITE.org} All rights reserved.
        </p>
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-green animate-status-breathe" />
          <span className="font-mono text-[11px] text-text-muted">SYS: ONLINE // SEC: ACTIVE</span>
        </div>
      </div>
    </footer>
  );
}
