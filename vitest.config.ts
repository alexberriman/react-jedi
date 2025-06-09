import { defineConfig, mergeConfig } from "vitest/config";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import path, { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const dirname =
  typeof __dirname !== "undefined" ? __dirname : path.dirname(fileURLToPath(import.meta.url));

import viteConfig from "./vite.config";

// Check if we're running storybook tests specifically
const isStorybookTest =
  process.env.VITEST_STORYBOOK === "true" || process.argv.some((arg) => arg.includes(".stories."));

export default mergeConfig(
  viteConfig,
  defineConfig({
    plugins: isStorybookTest
      ? [
          storybookTest({
            // The location of your Storybook config, main.js|ts
            configDir: path.join(dirname, ".storybook"),
            // This should match your package.json script to run Storybook
            // The --ci flag will skip prompts and not open a browser
            storybookScript: "npm run storybook -- --ci",
          }),
        ]
      : [],
    test: {
      // Enable browser mode only for storybook tests
      browser: isStorybookTest
        ? {
            enabled: true,
            // Make sure to install Playwright
            provider: "playwright",
            headless: true,
            instances: [{ browser: "chromium" }],
            viewport: {
              width: 1280,
              height: 720,
            },
          }
        : undefined,
      environment: isStorybookTest ? "happy-dom" : "jsdom",
      pool: isStorybookTest ? "forks" : "threads",
      setupFiles: isStorybookTest ? ["./.storybook/vitest.setup.ts"] : ["./src/testing-setup.ts"],
      testTimeout: 30000,
      hookTimeout: 30000,
      // Include test files only when not in storybook mode
      include: !isStorybookTest
        ? ["src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"]
        : undefined,
      exclude: ["**/*.mdx", "node_modules/**", "dist/**", "cypress/**", "**/*.d.ts"],
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
  })
);
