import { defineConfig } from 'vite';
import { resolve } from 'path';

// ─────────────────────────────────────────────────────────────
// Vite config for the *core* package (library build)
// ─────────────────────────────────────────────────────────────
export default defineConfig({
  build: {
    lib: {
      // Entry file exposed to consumers (`import { System } from "@laser-tracer/core"`)
      entry: resolve(__dirname, 'src/system.js'),
      name: 'LaserTracer',                // UMD/IIFE global name (ignored for ES build but required)
      fileName: (format) => `laser-tracer.${format}.js`,
      formats: ['es']                     // ship pure ESM
    },

    // Rollup-specific tweaks (Vite delegates final bundling to Rollup)
    rollupOptions: {
      external: ['three'],                // do not bundle three.js
      output: {
        // leave asset references unchanged so consumer bundlers copy textures
        assetFileNames: 'assets/[name][extname]'
      }
    },

    sourcemap: true                       // generate *.map alongside the bundle
  },

  worker: {
    format: 'es'                          // ensure any web-worker bundles stay ESM
  }
});
