import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  css: {
    // Ensure all CSS is processed correctly
    modules: false,
    postcss: "./postcss.config.js",
  },
  build: {
    emptyOutDir: false,
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "ReactJedi",
      formats: ["es", "cjs"],
      fileName: "index",
    },
    sourcemap: true,
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react/jsx-runtime": "jsx",
        },
        // Ensure CSS gets extracted
        assetFileNames: "styles.css",
      },
    },
    // Ensure CSS is extracted
    cssCodeSplit: false,
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
      "@sb": resolve(__dirname, "./.storybook"),
    },
  },
});
