import { defineConfig } from "vitest/config";
import { resolve } from "path";

export default defineConfig({
  test: {
    environment: "jsdom",
    include: ["src/**/*.test.{ts,tsx}"],
    coverage: {
      reporter: ["text", "json", "html"],
      include: ["src/**/*.{ts,tsx}"],
      exclude: ["src/**/*.test.{ts,tsx}", "src/**/*.stories.{ts,tsx}"],
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
    },
  },
});
