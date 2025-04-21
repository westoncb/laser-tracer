// TracerVM.js – owns QuickJS, compilation, opcode replay
// ==============================================================

import { bindEmit, flushOps, buildProgramWrapper } from "./tracerAPI.js";
import { replayOps } from "./tracerOps.js";

import variant from "@jitl/quickjs-singlefile-browser-release-sync";
import { newQuickJSWASMModuleFromVariant } from "quickjs-emscripten-core";

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

/**
 * Build a readable string from a QuickJS error handle.
 */
function stringifyQJSError(ctx, errHandle) {
  const dumped = ctx.dump(errHandle);
  if (typeof dumped === "string") return dumped;

  if (dumped && typeof dumped === "object") {
    const { name = "Error", message = "", stack = "" } = dumped;
    return `${name}: ${message}${stack ? "\n" + stack : ""}`;
  }
  try {
    return JSON.stringify(dumped);
  } catch {
    return String(dumped);
  }
}

/* ------------------------------------------------------------------ */
/* VM class                                                            */
/* ------------------------------------------------------------------ */

export default class TracerVM {
  /**
   * @param {(errString|null)=>void} onError – banner setter
   */
  constructor(onError, laserTracer) {
    this.onError = onError;
    this.laserTracer = laserTracer;

    /* async‑initialisation bookkeeping */
    this._ready = false;
    this._queuedSrc = null;

    // ★ NEW – track if we’re currently in an error state
    this.hasError = false;
  }

  /* ---------- QuickJS spin‑up ------------------------------------- */
  async init() {
    const QuickJS = await newQuickJSWASMModuleFromVariant(variant);
    this.ctx = QuickJS.newContext();
    bindEmit(this.ctx);

    this._ready = true;

    if (this._queuedSrc !== null) {
      const src = this._queuedSrc;
      this._queuedSrc = null;
      this.loadSource(src);
    }
  }

  /* ---------- compile / recompile user source --------------------- */
  loadSource(src) {
    if (!this._ready) {
      this._queuedSrc = src;
      return;
    }

    const wrapped = buildProgramWrapper(src);
    const res = this.ctx.evalCode(wrapped);

    if (res.error) {
      this._enterError(stringifyQJSError(this.ctx, res.error));
      res.error.dispose();
      return;
    }

    // success  →  reset error state
    this.hasError = false;
    this.onError(null);

    /* Hold handle to globalThis.program */
    this.programHandle?.dispose?.();
    this.programHandle = this.ctx.getProp(this.ctx.global, "program");
  }

  /* ---------- run one frame and push ops to laserTracer ----------- */
  tick(timeMs) {
    if (this.hasError || !this._ready || !this.programHandle) return;

    /* program(timeMs) */
    const t = this.ctx.newNumber(timeMs);
    const res = this.ctx.callFunction(
      this.programHandle,
      this.ctx.undefined,
      t,
    );
    t.dispose();

    if (res.error) {
      this._enterError(stringifyQJSError(this.ctx, res.error));
      res.error.dispose();
      return;
    }
    res.value?.dispose();

    /* Pull opcodes and replay */
    const ops = flushOps();
    if (ops.length) replayOps(this.laserTracer, ops);
  }

  /* ---------- enter error state (compile OR runtime) -------------- */
  _enterError(msg) {
    // ★ NEW helper
    this.hasError = true;
    this.onError(msg);
    this.programHandle?.dispose?.();
    this.programHandle = null;
  }

  /* ---------- tidy‑up --------------------------------------------- */
  dispose() {
    this.programHandle?.dispose?.();
    this.ctx?.dispose();
  }
}
