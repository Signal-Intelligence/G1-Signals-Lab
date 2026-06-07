"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

export function ProductsDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <div ref={ref} className="mt-10">
      <div className="flex flex-wrap gap-4 items-center">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-haspopup="true"
          className="signal-btn-primary inline-flex items-center gap-1.5"
        >
          Explore Products
          <svg
            className={cn("w-3 h-3 transition-transform duration-200", open && "rotate-180")}
            viewBox="0 0 12 12"
            fill="none"
            aria-hidden="true"
          >
            <path d="M3 5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <Link href="/architecture" className="signal-btn-secondary inline-block">
          View Architecture
        </Link>
      </div>

      <div
        className={cn(
          "grid transition-all duration-200 ease-out",
          open ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0 mt-0"
        )}
      >
        <div className="overflow-hidden">
          <div className="flex flex-wrap items-center gap-6">
            <Link
              href="/products/cypher1"
              onClick={() => setOpen(false)}
              className="focus-ring group flex items-center gap-3 transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-accent-blue shadow-[0_0_8px_rgba(0,102,255,0.6)]" />
              <span className="text-[11px] font-medium uppercase tracking-[var(--tracking-label)] text-white group-hover:text-accent-blue transition-colors">
                CYPHER ONE
              </span>
              <span className="text-[11px] font-light text-text-secondary group-hover:text-text-primary transition-colors">
                — Agentic cyber ecosystem
              </span>
              <svg className="w-3 h-3 text-accent-blue opacity-0 group-hover:opacity-100 transition-opacity" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>

            <span className="w-px h-4 bg-border-subtle" />

            <div className="flex items-center gap-3 opacity-40">
              <span className="w-2 h-2 rounded-full bg-accent-green/40" />
              <span className="text-[11px] font-medium uppercase tracking-[var(--tracking-label)] text-text-muted">
                STRATOS ONE
              </span>
              <span className="text-[11px] font-light text-text-tertiary">
                — Agentic defence ecosystem
              </span>
              <span className="font-mono text-[11px] text-accent-green/50 tracking-wider">
                PENDING
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
