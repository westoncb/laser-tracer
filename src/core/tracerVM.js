// TracerVM.js – owns QuickJS, compilation, opcode replay
import { bindEmit, flushOps, buildProgramWrapper } from "./tracerAPI";
import { replayOps } from "./tracerOps";
import variant from "@jitl/quickjs-singlefile-browser-release-sync";
import { newQuickJSWASMModuleFromVariant } from "quickjs-emscripten-core";

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

/**
 * Construct a readable string from a QuickJS error handle.
 * Handles plain strings, JS Error objects, and JSON‑able values.
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
   * @param {(errString|null)=>void} onError    – compile/runtime banner setter
   * @param {LaserTracer}            laserTracer
   */
  constructor(onError, laserTracer) {
    this.onError = onError;
    this.laserTracer = laserTracer;

    /* async‑initialisation bookkeeping */
    this._ready = false; // true once QuickJS context exists
    this._queuedSrc = null; // last source edit that arrived pre‑init
  }

  /* ---------- QuickJS spin‑up ------------------------------------- */
  async init() {
    const QuickJS = await newQuickJSWASMModuleFromVariant(variant);
    this.ctx = QuickJS.newContext();
    bindEmit(this.ctx);

    this._ready = true;

    /* compile the latest queued source if one arrived early */
    if (this._queuedSrc !== null) {
      const src = this._queuedSrc;
      this._queuedSrc = null;
      this.loadSource(src);
    }
  }

  /* ---------- compile / recompile user source --------------------- */
  loadSource(src) {
    /* Not ready?  Remember the request and bail out. */
    if (!this._ready) {
      this._queuedSrc = src;
      return;
    }

    const wrapped = buildProgramWrapper(src);
    const res = this.ctx.evalCode(wrapped);

    if (res.error) {
      this.onError(stringifyQJSError(this.ctx, res.error));
      res.error.dispose(); // avoid leaks
      this.programHandle?.dispose?.();
      this.programHandle = null;
      return;
    }

    this.onError(null); // clear banner

    /* Hold handle to globalThis.program */
    this.programHandle?.dispose?.();
    this.programHandle = this.ctx.getProp(this.ctx.global, "program");
  }

  /* ---------- run one frame and push ops to laserTracer ----------- */
  tick(timeMs) {
    if (!this._ready || !this.programHandle) return;

    /* program(time) */
    const t = this.ctx.newNumber(timeMs);
    const res = this.ctx.callFunction(
      this.programHandle,
      this.ctx.undefined,
      t,
    );
    t.dispose();

    if (res.error) {
      const pretty = stringifyQJSError(this.ctx, res.error);
      console.error("Runtime error in user program:", pretty);
      this.onError(pretty);
      res.error.dispose();
      return;
    }
    res.value?.dispose();

    /* Pull opcodes produced by tracerAPI and replay them */
    const ops = flushOps();
    console.log("ops", ops.length);
    if (ops.length) {
      replayOps(this.laserTracer, ops);
    }
  }

  /* ---------- tidy‑up --------------------------------------------- */
  dispose() {
    this.programHandle?.dispose?.();
    this.ctx?.dispose();
  }
}
