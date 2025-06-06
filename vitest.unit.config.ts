import { defineConfig, mergeConfig } from "vitest/config";
import path, { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const dirname =
  typeof __dirname !== "undefined" ? __dirname : path.dirname(fileURLToPath(import.meta.url));

import viteConfig from "./vite.config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: "jsdom",
      globals: true,
      setupFiles: ["./src/testing-setup.ts"],
      include: ["src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
      exclude: ["**/*.stories.*", "**/*.mdx", "node_modules/**", "dist/**", "cypress/**", "**/*.d.ts"],
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