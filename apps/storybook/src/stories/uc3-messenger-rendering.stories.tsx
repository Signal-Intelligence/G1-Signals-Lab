import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { SignalsUIStage } from "../stage/SignalsUIStage";
import {
  MESSENGER_ACT1_BREACH,
  MESSENGER_ACT2_GEOFENCE,
  MESSENGER_ACT3_REMEDIATION,
  MESSENGER_ACT4_MORNING,
  MESSENGER_ACT5_QUANTUM,
  MESSENGER_ACT6_RESOLUTION,
  ALL_COMPONENT_PACKETS,
  CELL_CYPHER_ONE,
  CELL_ONE_ECHO,
  TRUST_TIMELINE,
} from "../data/demo-fixtures";
import type { SignalsUiMessenger } from "../types/signals-wire-schema";
import type { HsmlState } from "../types/hsml";

const meta: Meta = {
  title: "Walkthroughs/UC3 — Messenger Rendering Pipeline",
  parameters: { layout: "padded" },
};

export default meta;

const PRESET_PACKETS: Record<string, SignalsUiMessenger> = {
  "Act 1 — Breach Detection": MESSENGER_ACT1_BREACH,
  "Act 2 — Geofence Halt": MESSENGER_ACT2_GEOFENCE,
  "Act 3 — Remediation": MESSENGER_ACT3_REMEDIATION,
  "Act 4 — Morning Briefing": MESSENGER_ACT4_MORNING,
  "Act 5 — Quantum Interlock": MESSENGER_ACT5_QUANTUM,
  "Act 6 — Resolution": MESSENGER_ACT6_RESOLUTION,
};

function MessengerSimulator() {
  const [selectedPreset, setSelectedPreset] = useState<string>("Act 1 — Breach Detection");
  const [hsmlState, setHsmlState] = useState<HsmlState>("HSML_ACTIVE");
  const [customJson, setCustomJson] = useState("");
  const [useCustom, setUseCustom] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const activePacket = useCustom
    ? (() => {
        try {
          const parsed = JSON.parse(customJson);
          setError(null);
          return parsed as SignalsUiMessenger;
        } catch {
          return null;
        }
      })()
    : PRESET_PACKETS[selectedPreset];

  return (
    <div className="space-y-6">
      <div className="glass-panel rounded-none p-5">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-2 h-2 rounded-full bg-accent-blue" />
          <span className="text-[11px] font-medium uppercase tracking-label text-text-secondary">
            SIGNALS UI MESSENGER SIMULATOR
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="eyebrow block mb-2">// PRESET PACKETS</label>
            <div className="space-y-1.5">
              {Object.keys(PRESET_PACKETS).map((name) => (
                <button
                  key={name}
                  onClick={() => { setSelectedPreset(name); setUseCustom(false); }}
                  className={`block w-full text-left px-3 py-2 text-[10px] uppercase tracking-telemetry border rounded-sm transition-all ${
                    !useCustom && selectedPreset === name
                      ? "border-accent-blue/40 bg-accent-blue/5 text-accent-blue"
                      : "border-border-subtle text-text-muted hover:border-border-default"
                  }`}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="eyebrow block mb-2">// HSML STATE OVERRIDE</label>
            <div className="space-y-1.5">
              {(["HSML_INIT", "HSML_ACTIVE", "HSML_HALTED", "HSML_RESOLVED"] as HsmlState[]).map((state) => (
                <button
                  key={state}
                  onClick={() => setHsmlState(state)}
                  className={`block w-full text-left px-3 py-2 text-[10px] font-mono tracking-telemetry border rounded-sm transition-all ${
                    hsmlState === state
                      ? "border-accent-blue/40 bg-accent-blue/5 text-accent-blue"
                      : "border-border-subtle text-text-muted hover:border-border-default"
                  }`}
                >
                  {state}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label className="eyebrow block mb-2">// CUSTOM HSTP-1.0 JSON</label>
          <textarea
            className="w-full h-32 bg-bg-primary border border-border-subtle rounded-sm p-3 text-[10px] font-mono text-text-secondary focus:border-accent-blue/40 focus:outline-none resize-none"
            placeholder="Paste a full SignalsUiMessenger JSON packet here..."
            value={customJson}
            onChange={(e) => { setCustomJson(e.target.value); setUseCustom(true); }}
          />
          {error && (
            <p className="text-[9px] text-severity-critical mt-1">{error}</p>
          )}
        </div>
      </div>

      <div className="glass-panel rounded-none p-4">
        <div className="flex items-center gap-2.5 mb-3">
          <div className="w-2 h-2 rounded-full bg-accent-green animate-status-breathe" />
          <span className="text-[11px] font-medium uppercase tracking-label text-text-secondary">
            SIGNALS UI STAGE OUTPUT
          </span>
          <span className="text-[9px] text-text-muted tracking-telemetry ml-auto">
            STATE: {hsmlState}
          </span>
        </div>

        {activePacket ? (
          <SignalsUIStage
            messenger={activePacket}
            hsmlState={hsmlState}
            confidence={TRUST_TIMELINE[0]}
            emittingCell={CELL_ONE_ECHO}
          />
        ) : (
          <div className="text-center py-8">
            <span className="text-[10px] text-severity-critical uppercase tracking-label">
              INVALID JSON — PACKET PARSE FAILED
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

function ComponentPicker() {
  const componentNames = Object.keys(ALL_COMPONENT_PACKETS);
  const [selected, setSelected] = useState<string>(componentNames[0]);
  const [hsmlState, setHsmlState] = useState<HsmlState>("HSML_ACTIVE");

  const packet = ALL_COMPONENT_PACKETS[selected];

  return (
    <div className="space-y-6">
      <div className="glass-panel rounded-none p-5">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-2 h-2 rounded-full bg-accent-blue" />
          <span className="text-[11px] font-medium uppercase tracking-label text-text-secondary">
            COMPONENT PACKET PICKER — {componentNames.length} REGISTERED
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="eyebrow block mb-2">// SELECT COMPONENT</label>
            <div className="space-y-1 max-h-[400px] overflow-y-auto pr-2">
              {componentNames.map((name) => (
                <button
                  key={name}
                  onClick={() => setSelected(name)}
                  className={`block w-full text-left px-3 py-1.5 text-[10px] uppercase tracking-telemetry border rounded-sm transition-all ${
                    selected === name
                      ? "border-accent-blue/40 bg-accent-blue/5 text-accent-blue"
                      : "border-border-subtle text-text-muted hover:border-border-default"
                  }`}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="eyebrow block mb-2">// HSML STATE</label>
            <div className="space-y-1.5">
              {(["HSML_INIT", "HSML_ACTIVE", "HSML_HALTED", "HSML_RESOLVED"] as HsmlState[]).map((state) => (
                <button
                  key={state}
                  onClick={() => setHsmlState(state)}
                  className={`block w-full text-left px-3 py-2 text-[10px] font-mono tracking-telemetry border rounded-sm transition-all ${
                    hsmlState === state
                      ? "border-accent-blue/40 bg-accent-blue/5 text-accent-blue"
                      : "border-border-subtle text-text-muted hover:border-border-default"
                  }`}
                >
                  {state}
                </button>
              ))}
            </div>
            <div className="mt-4">
              <label className="eyebrow block mb-2">// CATALOG ID</label>
              <p className="text-[9px] font-mono text-text-muted break-all">
                {packet?.g1_signals_payload_blocks[0]?.signalsUiCatalogId ?? "—"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="glass-panel rounded-none p-4">
        <div className="flex items-center gap-2.5 mb-3">
          <div className="w-2 h-2 rounded-full bg-accent-green animate-status-breathe" />
          <span className="text-[11px] font-medium uppercase tracking-label text-text-secondary">
            STAGE OUTPUT — {selected}
          </span>
          <span className="text-[9px] text-text-muted tracking-telemetry ml-auto">
            STATE: {hsmlState}
          </span>
        </div>

        {packet ? (
          <SignalsUIStage
            messenger={packet}
            hsmlState={hsmlState}
            confidence={TRUST_TIMELINE[0]}
            emittingCell={CELL_CYPHER_ONE}
          />
        ) : (
          <div className="text-center py-8">
            <span className="text-[10px] text-severity-critical uppercase tracking-label">
              NO PACKET FOR COMPONENT
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export const Simulator: StoryObj = {
  render: () => <MessengerSimulator />,
};

export const AllComponents: StoryObj = {
  name: "All Components",
  render: () => <ComponentPicker />,
};
