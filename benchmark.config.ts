import { defineConfig } from "vitest/config";
import { resolve } from "path";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    include: ["src/benchmark/**/*.bench.{ts,tsx}"],
    benchmark: {
      include: ["src/benchmark/**/*.bench.{ts,tsx}"],
      outputFile: "./benchmark-results.json",
    },
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
      "@benchmark": resolve(__dirname, "./src/benchmark"),
    },
  },
});