import { defineConfig, mergeConfig } from "vitest/config";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import path, { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const dirname =
  typeof __dirname !== "undefined" ? __dirname : path.dirname(fileURLToPath(import.meta.url));

import viteConfig from "./vite.config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    plugins: [
      storybookTest({
        // The location of your Storybook config, main.js|ts
        configDir: path.join(dirname, ".storybook"),
        // This should match your package.json script to run Storybook
        // The --ci flag will skip prompts and not open a browser
        storybookScript: "yarn storybook --ci",
      }),
    ],
    test: {
      // Enable browser mode
      browser: {
        enabled: true,
        // Make sure to install Playwright
        provider: "playwright",
        headless: true,
        instances: [{ browser: "chromium" }],
      },
      setupFiles: ["./.storybook/vitest.setup.ts"],
    },
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src"),
        "@components": resolve(__dirname, "./src/components"),
        "@ui": resolve(__dirname, "./src/components/ui"),
        "@lib": resolve(__dirname, "./src/lib"),
        "@types": resolve(__dirname, "./src/types"),
        "@schemas": resolve(__dirname, "./src/lib/schemas"),
        "@styles": resolve(__dirname, "./src/styles"),
        "@hooks": resolve(__dirname, "./src/hooks"),
        "@utils": resolve(__dirname, "./src/lib/utils.ts"),
      },
    },
    // Add projects field to replace workspace file
    projects: [
      {
        name: "storybook",
        extends: "./vite.config.ts",
        plugins: [
          storybookTest({
            configDir: path.join(dirname, ".storybook"),
            storybookScript: "npm run storybook --ci",
          }),
        ],
        test: {
          browser: {
            enabled: true,
            headless: true,
            provider: "playwright",
            instances: [{ browser: "chromium" }],
          },
          setupFiles: [".storybook/vitest.setup.ts"],
        },
      },
    ],
  })
);
