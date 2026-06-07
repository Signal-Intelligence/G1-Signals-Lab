import { PageHero } from "@/components/Hero";
import { CypherLabDashboard } from "@/components/lab/CypherLabDashboard";

export default function CypherLabPage() {
  return (
    <>
      <PageHero
        eyebrow="// CYPHER ONE — IMPLEMENTATION DASHBOARD"
        title="Signals Lab"
        subtitle="Live look into the CYPHER ONE agentic ecosystem. Drill into NIST governance pillars, agent trust scores, execution logs, and key performance indicators."
      />
      <CypherLabDashboard />
    </>
  );
}
