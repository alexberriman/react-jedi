import React from "react";
import type { Preview } from "@storybook/react";
import { setProjectAnnotations } from "@storybook/react";
import "../src/styles/global.css";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: "light",
      values: [
        {
          name: "light",
          value: "#ffffff",
        },
        {
          name: "dark",
          value: "#1a1a1a",
        },
      ],
    },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: "1rem" }}>
        <Story />
      </div>
    ),
  ],
  globalTypes: {
    theme: {
      description: "Global theme for components",
      defaultValue: "light",
      toolbar: {
        title: "Theme",
        items: ["light", "dark"],
        dynamicTitle: true,
      },
    },
  },
};

// Support for portable stories (testing outside of Storybook)
const annotations = setProjectAnnotations([preview]);

// Apply project annotations for Vitest
if (globalThis.beforeAll) {
  globalThis.beforeAll(annotations.beforeAll);
}

export default preview;