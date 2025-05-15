import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
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