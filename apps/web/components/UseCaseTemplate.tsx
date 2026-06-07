"use client";

import { useState } from "react";
import { Section } from "@/components/Section";
import { Timeline } from "@/components/TimelineAct";
import { GlassPanel } from "@/components/GlassPanel";
import { CardHeader } from "@/components/CardHeader";
import { CardFooter } from "@/components/CardFooter";
import { KpiStrip } from "@/components/KpiStrip";
import { Modal } from "@/components/Modal";
import { GatedAccessForm } from "@/components/GatedAccessForm";
import type { Phase } from "@/lib/data/narrative";

export function UseCaseTemplate({
  phases,
  metrics,
  standards,
  artifacts,
  extra,
}: {
  phases: Phase[];
  metrics: { label: string; value: string }[];
  standards: string[];
  artifacts: string[];
  extra?: React.ReactNode;
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const surfaces = [
    ...new Set(
      phases.flatMap((p) => p.uiSurface.split("+").map((s) => s.trim()))
    ),
  ];

  return (
    <>
      <Section eyebrow="// SCENARIO — TIMELINE" title="Narrative sequence">
        <Timeline phases={phases} />
      </Section>

      {extra}

      <Section eyebrow="// METRICS — BEFORE / AFTER">
        <GlassPanel className="p-5">
          <CardHeader label="OUTCOME METRICS" />
          <KpiStrip
            items={metrics.map((m) => ({ label: m.label.toUpperCase(), value: m.value }))}
          />
          <CardFooter />
        </GlassPanel>
      </Section>

      <Section eyebrow="// SURFACES — CATALOG">
        <GlassPanel className="p-5">
          <CardHeader label="UI SURFACES INVOLVED" />
          <div className="flex flex-wrap gap-2">
            {surfaces.map((s) => (
              <span
                key={s}
                className="border border-border-accent px-2 py-0.5 text-[11px] uppercase tracking-[var(--tracking-telemetry)] text-text-muted"
              >
                {s}
              </span>
            ))}
          </div>
          <CardFooter />
        </GlassPanel>
      </Section>

      <Section eyebrow="// STANDARDS">
        <GlassPanel className="p-5">
          <CardHeader label="COMPLIANCE FRAMEWORK" />
          <div className="callout-accent">
            <span className="eyebrow block mb-2">{"// INVOKED"}</span>
            <ul className="space-y-2">
              {standards.map((s) => (
                <li key={s} className="flex items-start gap-2">
                  <span className="connector-dot mt-1.5 flex-shrink-0" />
                  <span className="text-[11px] font-light text-text-secondary leading-snug">{s}</span>
                </li>
              ))}
            </ul>
          </div>
          <CardFooter />
        </GlassPanel>
      </Section>

      <Section eyebrow="// EVIDENCE CHAIN">
        <GlassPanel className="p-5">
          <CardHeader label="ARTIFACTS" />
          <div className="callout-accent">
            <span className="eyebrow block mb-2">{"// PROVENANCE"}</span>
            <ul className="space-y-2">
              {artifacts.map((a) => (
                <li key={a} className="flex items-start gap-2">
                  <span className="connector-dot mt-1.5 flex-shrink-0" />
                  <span className="text-[11px] font-light text-text-secondary leading-snug">{a}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-6">
            <button
              type="button"
              className="signal-btn-primary"
              onClick={() => setModalOpen(true)}
            >
              Try this scenario
            </button>
          </div>
          <CardFooter />
        </GlassPanel>
      </Section>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Gated walkthrough access">
        <GatedAccessForm onSuccess={() => setModalOpen(false)} />
      </Modal>
    </>
  );
}
