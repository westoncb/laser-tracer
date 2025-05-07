import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import wasm from "vite-plugin-wasm";

// ─────────────────────────────────────────────────────────────
// Vite config for the *sandbox* package (React SPA)
// ─────────────────────────────────────────────────────────────
export default defineConfig({
  // root defaults to "." (the folder containing this config) – no change needed.
  base: "/laser-tracer/", // adjust if you deploy under a different sub-path

  server: {
    open: true, // auto-launch browser on `pnpm dev`
    port: 5173,
  },

  build: {
    outDir: "dist", // output dir relative to this package
    emptyOutDir: true,
  },

  plugins: [
    react(), // JSX + fast-refresh
    wasm(), // allow inline/remote WASM imports
  ],

  assetsInclude: [/\.wasm$/], // treat .wasm as static assets when imported

  worker: {
    format: "es", // ensures web-worker bundles use ES modules
  },
});
