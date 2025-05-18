import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  root: path.resolve(__dirname),
  build: {
    sourcemap: true,
  },
  resolve: {
    alias: [
      // Example app aliases
      { find: "@", replacement: path.resolve(__dirname, "./src") },
      // Library CSS import
      {
        find: "@banja/react-jedi/dist/index.css",
        replacement: path.resolve(__dirname, "../src/styles/global.css"),
      },
      // Library JS imports - use source directly for development
      {
        find: "@banja/react-jedi",
        replacement: path.resolve(__dirname, "../src/index.ts"),
      },
    ],
  },
  server: {
    open: false,
    port: 5173,
    host: "0.0.0.0",
    sourcemap: true,
  },
});
