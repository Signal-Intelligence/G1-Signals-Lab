import type { Preview } from "@storybook/react";
import React from "react";
import "../src/index.css";

const preview: Preview = {
  decorators: [
    (Story) => (
      <div
        className="text-white font-sans antialiased relative"
        style={{ background: "#0a0a0f" }}
      >
        {/* Ambient background layers that give glass panels something to refract */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 bg-signal-grid opacity-60" />
          <div
            className="absolute"
            style={{
              top: "-10%",
              left: "15%",
              width: "600px",
              height: "600px",
              background:
                "radial-gradient(circle, rgba(0,102,255,0.10) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute"
            style={{
              bottom: "-5%",
              right: "10%",
              width: "500px",
              height: "500px",
              background:
                "radial-gradient(circle, rgba(0,102,255,0.06) 0%, transparent 70%)",
            }}
          />
        </div>
        <div className="relative z-10 p-8">
          <Story />
        </div>
      </div>
    ),
  ],
  parameters: {
    backgrounds: { disable: true },
    layout: "fullscreen",
  },
};

export default preview;
