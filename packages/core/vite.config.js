import { defineConfig } from "vite";
import { resolve } from "path";

// ─────────────────────────────────────────────────────────────
// Vite config for the *core* package (library build)
// ─────────────────────────────────────────────────────────────
export default defineConfig({
  build: {
    lib: {
      // Correct entry point that exports your full public API
      entry: resolve(__dirname, "src/index.js"),
      // The global variable name for the UMD build
      name: "LaserTracerCore",
      // Generate different file names for each format
      fileName: (format) => `laser-tracer-core.${format}.js`,
      // Build for both ES module and UMD for maximum compatibility
      formats: ["es", "umd"],
    },

    // Rollup-specific tweaks
    rollupOptions: {
      // Do not bundle three.js
      external: ["three"],
      output: {
        // Keep asset references unchanged for consumer bundlers
        assetFileNames: "assets/[name].[extname]",
        // Provide the global variable name for 'three' in the UMD build
        globals: {
          three: "THREE",
        },
      },
    },

    // Generate sourcemaps for debugging
    sourcemap: true,
  },

  worker: {
    // Ensure any web-worker bundles stay ESM
    format: "es",
  },
});
