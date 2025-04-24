import variant from "@jitl/quickjs-singlefile-browser-release-sync";
import { newQuickJSWASMModuleFromVariant } from "quickjs-emscripten-core";

/* ------------------------------------------------------------------ */
/* 1.  PRELUDE  (lives inside QuickJS VM)                              */
/* ------------------------------------------------------------------ */
const PRELUDE_VERSION = 1;

const PRELUDE = String.raw`
// ==== Laser-Tracer PRELUDE (v${PRELUDE_VERSION}) ====================


/* ---- tracer-side helpers ---------------------------------------- */
const move       = (x,y,z)        => emit('move',       x,y,z);
const moveRel    = (dx,dy,dz)     => emit('moveRel',    dx,dy,dz);
const trace      = (x,y,z)        => emit('trace',      x,y,z);
const traceRel   = (dx,dy,dz)     => emit('traceRel',   dx,dy,dz);
const deposit    = (x,y,z)        => emit('deposit',    x,y,z);
const depositRel = (dx,dy,dz)     => emit('depositRel', dx,dy,dz);
const drawText   = (t,x,y,z,h=4)  => emit('drawText',   t,x,y,z,h);
const drawTextRel= (t,dx,dy,dz,h=4)=>emit('drawTextRel',t,dx,dy,dz,h);

const yaw   = d => emit('yaw',   d);
const pitch = d => emit('pitch', d);
const roll  = d => emit('roll',  d);
const push  = () => emit('push');
const pop   = () => emit('pop');

const size    = px => emit('size',    px);
const spacing = d  => emit('spacing', d);
const residue = s  => emit('residue', s);
const fuzz    = (n=0,sx=4,sy=sx,sz=sx)=>emit('fuzz', n|0,+sx,+sy,+sz);

/* ---- lib-side helpers  (handled in host-side lib) -------------- */
const colorRGB      = (r,g,b)                 => emit('colorRGB', r,g,b);
const colorHSV      = (h,s,v)                 => emit('colorHSV', h,s,v);
const colorViridis  = t                       => emit('colorViridis', t);
const colorCubehelix= (t,st=.5,rot=-1.5,g=1)  => emit('colorCubehelix', t,st,rot,g);
const colorHex      = hex                     => emit('colorHex', hex>>>0);
const color         = colorHex; // back-compat

move(0, 0, 0);
`;

/* ------------------------------------------------------------------ */
/* 2.  buildProgramWrapper                                            */
/* ------------------------------------------------------------------ */
function buildProgramWrapper(userSource) {
  return `
// --- wrapped by TracerVM -------------------------------------------
${PRELUDE}
${userSource}
return program;  // ← expose to host
`;
}

/* ------------------------------------------------------------------ */
/* 3.  Utility: stringify QuickJS errors                               */
/* ------------------------------------------------------------------ */
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
/* Host-side opcode buffer                                            */
/* ------------------------------------------------------------------ */
const _ops = [];

function bindEmit(ctx) {
  const emitH = ctx.newFunction("emit", (...h) => {
    try {
      const op = ctx.dump(h[0]);
      const args = h.slice(1).map((x) => ctx.dump(x));
      _ops.push([op, ...args]);
    } catch (e) {
      console.error("[emit ERROR]", e);
    }
  });

  ctx.setProp(ctx.global, "emit", emitH, /*configurable=*/ false);
  emitH.dispose();
}

/* ------------------------------------------------------------------ */
/* 4.  TracerVM class                                                  */
/* ------------------------------------------------------------------ */
export default class TracerVM {
  /**
   * @param {(errString|null)=>void} onError
   */
  constructor(onError) {
    this.onError = onError;

    this._ready = false;
    this._queuedSrc = null;
    this.hasError = false;
    this.programHandle = null;
  }

  /* ---- Initialise QuickJS --------------------------------------- */
  async init() {
    const QuickJS = await newQuickJSWASMModuleFromVariant(variant);
    this.ctx = QuickJS.newContext();
    bindEmit(this.ctx);

    this._ready = true;

    if (this._queuedSrc !== null) {
      const s = this._queuedSrc;
      this._queuedSrc = null;
      this.loadSource(s);
    }
  }

  /* ---- Compile (or queue until ready) --------------------------- */
  loadSource(src) {
    if (!this._ready) {
      this._queuedSrc = src;
      return;
    }

    const wrapped = `globalThis.program = (function(){${buildProgramWrapper(src)}})();`;

    const res = this.ctx.evalCode(wrapped);
    if (res.error) {
      this._enterError(stringifyQJSError(this.ctx, res.error));
      res.error.dispose();
      return;
    }

    this.hasError = false;
    this.onError(null);

    /* hold handle to globalThis.program */
    this.programHandle?.dispose?.();
    this.programHandle = this.ctx.getProp(this.ctx.global, "program");
  }

  tick(timeSeconds, tracer, lib = {}) {
    if (this.hasError || !this._ready || !this.programHandle) return;

    tracer._beginTick();

    /* run user program ------------------------------------------------ */
    const tMs = this.ctx.newNumber(timeSeconds);
    const r = this.ctx.callFunction(
      this.programHandle,
      this.ctx.undefined,
      tMs,
    );
    tMs.dispose();
    if (r.error) {
      this._enterError(stringifyQJSError(this.ctx, r.error));
      r.error.dispose();
      return;
    }
    r.value?.dispose();

    /* ---- take buffered ops (host-side) ----------------------------- */
    const ops = _ops.splice(0, _ops.length); // grab & clear in O(1)

    /* ---- dispatch -------------------------------------------------- */
    for (const [op, ...args] of ops) {
      const tf = tracer[op];
      if (typeof tf === "function") {
        tf.apply(tracer, args);
        continue;
      }

      const lf = lib[op];
      if (typeof lf === "function") {
        lf.apply(lib, [tracer, ...args]);
        continue;
      }

      console.warn("TracerVM: unknown opcode", op);
    }

    tracer._endTick();
  }

  /* ---- Error helper -------------------------------------------- */
  _enterError(msg) {
    this.hasError = true;
    this.onError(msg);
    this.programHandle?.dispose?.();
    this.programHandle = null;
  }

  /* ---- Cleanup -------------------------------------------------- */
  dispose() {
    this.programHandle?.dispose?.();
    this.ctx?.dispose();
  }
}
