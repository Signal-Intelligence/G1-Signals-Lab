"use client";

import { useCallback, useEffect, useId, useRef } from "react";
import { cn } from "@/lib/cn";

export function Modal({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (open) {
      triggerRef.current = document.activeElement as HTMLElement;
      document.body.style.overflow = "hidden";
      panelRef.current?.querySelector<HTMLElement>("input, button, textarea")?.focus();
    } else {
      document.body.style.overflow = "";
      triggerRef.current?.focus();
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && panelRef.current) {
        const focusable = panelRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const list = Array.from(focusable).filter((el) => !el.hasAttribute("disabled"));
        if (list.length === 0) return;
        const first = list[0];
        const last = list[list.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (!open) return;
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, handleKeyDown]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="presentation"
      onMouseDown={onClose}
    >
      <div className="absolute inset-0 bg-black/70" aria-hidden="true" />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={cn("glass-panel relative z-10 w-full max-w-lg p-8")}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="mb-6 flex items-start justify-between gap-4">
          <h2 id={titleId} className="text-xl font-extralight text-glow-sm">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="signal-btn-secondary px-3 py-2 focus-ring"
            aria-label="Close dialog"
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
