import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import wasm from "vite-plugin-wasm";

// everything is zero‑config by default;
// set values only when you actually need them.
export default defineConfig({
  root: ".", // your index.html is already at the repo root
  server: {
    open: true, // auto‑launch the browser
    port: 5173,
  },
  build: {
    outDir: "dist", // change if you prefer another folder
    emptyOutDir: true,
  },
  plugins: [react(), wasm()],
  assetsInclude: [/\.wasm$/], // just in case
  worker: { format: "es" },
});
