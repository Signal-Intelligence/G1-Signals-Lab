import { addons } from "@storybook/manager-api";
import { create } from "@storybook/theming";

addons.setConfig({
  theme: create({
    base: "dark",
    brandTitle: "CYPHER ONE — G1 Signals Lab",
    brandUrl: "#",

    colorPrimary: "#0066ff",
    colorSecondary: "#0066ff",

    appBg: "#0f0f0f",
    appContentBg: "#0f0f0f",
    appBorderColor: "rgba(255,255,255,0.05)",
    appBorderRadius: 0,

    textColor: "#e5e7eb",
    textInverseColor: "#0f0f0f",
    textMutedColor: "#9ca3af",

    barTextColor: "#9ca3af",
    barSelectedColor: "#0066ff",
    barBg: "#171717",

    inputBg: "#171717",
    inputBorder: "rgba(255,255,255,0.10)",
    inputTextColor: "#e5e7eb",
    inputBorderRadius: 2,
  }),
});
