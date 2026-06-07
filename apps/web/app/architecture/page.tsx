import { PageHero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { GlassPanel } from "@/components/GlassPanel";
import { TrustPillarCards } from "@/components/architecture/TrustPillarCards";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Architecture",
  "The trust fabric that reinforces CYPHER ONE and STRATOS ONE agent ecosystems.",
  "/architecture"
);

export default function ArchitecturePage() {
  return (
    <main className="holo-field">
      <PageHero
        eyebrow="// ARCHITECTURE — TRUST FABRIC"
        title="How the stack reinforces the ecosystems."
        subtitle="Four foundational pillars create a self-reinforcing trust fabric. Each layer strengthens the others — transport secures identity, identity governs policy, policy constrains autonomy, cryptography future-proofs the whole."
      />

      <Section
        eyebrow="// THE TRUST FABRIC"
        title="Four pillars. One self-reinforcing architecture."
      >
        <div className="max-w-3xl mb-12">
          <p className="text-sm font-light text-text-secondary leading-relaxed">
            The G1 trust fabric is not a stack of independent technologies bolted together. Each
            pillar is load-bearing — remove one and the architecture fails. Together they create
            a closed-loop system where transport integrity, cryptographic identity, governance
            alignment, and quantum resilience reinforce each other continuously.
          </p>
        </div>

        <TrustPillarCards />

        <GlassPanel className="mt-8 p-5" accentBorder="severity-critical">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 flex items-center justify-center border border-severity-critical/30 flex-shrink-0">
              <span className="text-severity-critical text-lg">{"⬥"}</span>
            </div>
            <div className="flex-1">
              <p className="text-[11px] font-medium uppercase tracking-[var(--tracking-label)] text-white mb-1">
                The reinforcement loop
              </p>
              <p className="text-sm font-light text-text-secondary leading-relaxed">
                HSTP-1.0 carries KERI-anchored identity on every frame. KERI binds each agent to its
                governance domain with cryptographic constraints. The governance layer enforces posture
                across all bound functions continuously — whether those functions come from NIST CSF,
                CMMC, ITAR, or sovereign mandates. PQC ensures every cryptographic operation —
                including the identity layer itself — is quantum-resilient. Break any pillar and the
                loop opens. This is the moat.
              </p>
            </div>
          </div>
        </GlassPanel>
      </Section>
    </main>
  );
}
