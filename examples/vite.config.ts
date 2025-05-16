import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  root: path.resolve(__dirname),
  resolve: {
    alias: [
      // Example app aliases
      { find: "@", replacement: path.resolve(__dirname, "./src") },
      // Library CSS import
      { 
        find: "@banja/react-jedi/dist/index.css", 
        replacement: path.resolve(__dirname, "../dist/index.css") 
      },
      // Library JS imports
      { 
        find: "@banja/react-jedi", 
        replacement: path.resolve(__dirname, "../dist/index.js") 
      },
    ],
  },
  server: {
    open: false,
    port: 5173,
    host: '0.0.0.0',
  },
});