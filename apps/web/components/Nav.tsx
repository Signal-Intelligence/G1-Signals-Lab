"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { SITE } from "@/lib/site";
import { PRODUCT_LINKS, LAB_LINKS, NAV_LINKS } from "@/lib/data/navigation";

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuToggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      if (
        menuRef.current &&
        !menuRef.current.contains(target) &&
        menuToggleRef.current &&
        !menuToggleRef.current.contains(target)
      ) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setMenuOpen(false);
    }
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 right-0 left-0 z-50 transition-all duration-200",
        scrolled || menuOpen
          ? "glass-panel rounded-none border-b border-border-glass backdrop-blur-xl"
          : "bg-transparent"
      )}
    >
      <div className="flex items-center justify-between px-6 py-0 md:px-12 lg:px-32">
        <Link
          href="/"
          className="focus-ring flex items-center gap-3 lg:gap-4 group lg:-ml-[112px]"
        >
          <Image
            src="/brand/bull-nav.png"
            alt=""
            width={96}
            height={96}
            className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 group-hover:drop-shadow-[0_0_8px_var(--color-accent-blue)] transition-[filter] duration-300"
            priority
          />
          <span className="text-lg md:text-xl lg:text-[22px] font-extralight uppercase tracking-[0.35em] text-white/80 group-hover:text-accent-blue transition-colors">
            {SITE.name}
          </span>
        </Link>
        <div className="flex items-center gap-3">
          <button
            ref={menuToggleRef}
            type="button"
            className="signal-btn-secondary flex items-center gap-1.5"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-label="Toggle menu"
            aria-controls="nav-menu"
          >
            Menu
            <svg
              className={cn("w-3 h-3 transition-transform duration-200", menuOpen && "rotate-180")}
              viewBox="0 0 12 12"
              fill="none"
              aria-hidden="true"
            >
              <path d="M3 5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <Link href="/contact" className="signal-btn-primary">
            Request Access
          </Link>
        </div>
      </div>
      {menuOpen && (
        <div id="nav-menu" ref={menuRef} className="glass-panel rounded-none border-t border-border-glass px-6 md:px-12 lg:px-32 py-6">
          <div className="flex flex-col gap-4">
            <span className="text-[11px] font-medium uppercase tracking-[var(--tracking-label)] text-text-muted/60">
              Products
            </span>
            {PRODUCT_LINKS.map((p) =>
              p.disabled ? (
                <span
                  key={p.href}
                  className="flex items-center gap-2 text-[11px] uppercase tracking-[var(--tracking-label)] text-text-muted/40 cursor-default pl-3"
                >
                  <span className="connector-dot opacity-30" />
                  {p.label}
                  <span className="text-[11px] normal-case tracking-normal text-accent-blue/50 ml-2">Coming Soon</span>
                </span>
              ) : (
                <Link
                  key={p.href}
                  href={p.href}
                  className="focus-ring flex items-center gap-2 text-[11px] uppercase tracking-[var(--tracking-label)] text-text-secondary hover:text-accent-blue transition-colors pl-3"
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="connector-dot" />
                  {p.label}
                </Link>
              )
            )}
            <div className="border-t border-border-subtle my-1" />
            <span className="text-[11px] font-medium uppercase tracking-[var(--tracking-label)] text-text-muted/60">
              Lab
            </span>
            {LAB_LINKS.map((l) =>
              l.disabled ? (
                <span
                  key={l.href}
                  className="flex items-center gap-2 text-[11px] uppercase tracking-[var(--tracking-label)] text-text-muted/40 cursor-default pl-3"
                >
                  <span className="connector-dot opacity-30" />
                  {l.label}
                  <span className="text-[11px] normal-case tracking-normal text-accent-blue/50 ml-2">Coming Soon</span>
                </span>
              ) : (
                <Link
                  key={l.href}
                  href={l.href}
                  className="focus-ring flex items-center gap-2 text-[11px] uppercase tracking-[var(--tracking-label)] text-text-secondary hover:text-accent-blue transition-colors pl-3"
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="connector-dot" />
                  {l.label}
                </Link>
              )
            )}
            <div className="border-t border-border-subtle my-1" />
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="focus-ring flex items-center gap-2 text-[11px] uppercase tracking-[var(--tracking-label)] text-text-secondary hover:text-accent-blue transition-colors"
                onClick={() => setMenuOpen(false)}
                aria-current={pathname === l.href ? "page" : undefined}
              >
                <span className="connector-dot" />
                {l.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="signal-btn-primary text-center mt-2 lg:hidden"
              onClick={() => setMenuOpen(false)}
            >
              Request Access
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
