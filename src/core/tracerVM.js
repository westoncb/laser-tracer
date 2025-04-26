// TracerVM.js – direct‑binding rewrite (v2.2)
// ===============================================================
// Fix: host binding now invokes tracer methods with the correct
//      `this` context (avoids `this === undefined` errors).
//      No other behavioural changes.

import variant from "@jitl/quickjs-singlefile-browser-release-sync";
import { newQuickJSWASMModuleFromVariant } from "quickjs-emscripten-core";

/* ------------------------------------------------------------------ */
/* 1.  PRELUDE (executed inside QuickJS VM)                            */
/* ------------------------------------------------------------------ */
const PRELUDE_VERSION = 2;

const PRELUDE = String.raw`
// ==== Laser-Tracer PRELUDE (v${PRELUDE_VERSION}) ====================
// Thin wrappers that forward to host‑injected opcodes.  No recursion!

/* --- orientation & transform stack ------------------------------- */
const push  = () => globalThis.push();
const pop   = () => globalThis.pop();
const yaw   = d  => globalThis.yaw(d);
const pitch = d  => globalThis.pitch(d);
const roll  = d  => globalThis.roll(d);

/* --- movement / drawing ------------------------------------------ */
const move       = (x,y,z)        => globalThis.move(x,y,z);
const moveRel    = (dx,dy,dz)     => globalThis.moveRel(dx,dy,dz);
const trace      = (x,y,z)        => globalThis.trace(x,y,z);
const traceRel   = (dx,dy,dz)     => globalThis.traceRel(dx,dy,dz);
const deposit    = (x,y,z)        => globalThis.deposit(x,y,z);
const depositRel = (dx,dy,dz)     => globalThis.depositRel(dx,dy,dz);

/* --- text helpers ------------------------------------------------- */
const drawText    = (t,x,y,z,h=4)    => globalThis.drawText(t,x,y,z,h);
const drawTextRel = (t,dx,dy,dz,h=4) => globalThis.drawTextRel(t,dx,dy,dz,h);

/* --- particle parameters ----------------------------------------- */
const size     = px => globalThis.size(px);
const spacing  = d  => globalThis.spacing(d);
const residue  = s  => globalThis.residue(s);
const fuzz     = (n=0,sx=4,sy=sx,sz=sx)=>globalThis.fuzz(n|0,+sx,+sy,+sz);

/* --- colour helpers ---------------------------------------------- */
const colorRGB       = (r,g,b)                  => globalThis.colorRGB(r,g,b);
const colorHSV       = (h,s,v)                  => globalThis.colorHSV(h,s,v);
const colorViridis   = t                        => globalThis.colorViridis(t);
const colorCubehelix = (t,st=.5,rot=-1.5,g=1)   => globalThis.colorCubehelix(t,st,rot,g);
const colorHex       = hex                      => globalThis.colorHex(hex>>>0);
const color          = colorHex; // back‑compat

const setBGColor = hex => globalThis.setBGColor(hex);

// t ∈ [0,1]  ·  start ∈ [0,3]  (0 = red, 1 = green, 2 = blue)
function cubehelixHex(t, start = 0.5, rot = -1.5, gamma = 1) {
  t = Math.pow(Math.max(0, Math.min(1, t)), gamma);
  const phi = 2 * Math.PI * (start / 3 + rot * t);
  const amp = 0.5 * t * (1 - t);
  let r = t + amp * (-0.14861 * Math.cos(phi) + 1.78277 * Math.sin(phi));
  let g = t + amp * (-0.29227 * Math.cos(phi) - 0.90649 * Math.sin(phi));
  let b = t + amp * (+1.97294 * Math.cos(phi));
  r = Math.min(1, Math.max(0, r));
  g = Math.min(1, Math.max(0, g));
  b = Math.min(1, Math.max(0, b));
  return ((r * 255) << 16) | ((g * 255) << 8) | (b * 255) | 0;
}
`;

/* ------------------------------------------------------------------ */
/* 2.  Source wrapper                                                 */
/* ------------------------------------------------------------------ */
function buildProgramWrapper(userSource) {
  return `// — wrapped by TracerVM —\n${PRELUDE}\n${userSource}\nreturn program;`;
}

/* ------------------------------------------------------------------ */
/* 3.  QuickJS error → string                                         */
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
/* 4.  Host bindings                                                  */
/* ------------------------------------------------------------------ */
function makeDecoders(ctx) {
  const N = (h) => ctx.getNumber(h);
  const S = (h) => ctx.getString(h);
  const D = (h) => ctx.dump(h);
  return {
    move: [N, N, N],
    moveRel: [N, N, N],
    trace: [N, N, N],
    traceRel: [N, N, N],
    deposit: [N, N, N],
    depositRel: [N, N, N],
    yaw: [N],
    pitch: [N],
    roll: [N],
    size: [N],
    spacing: [N],
    residue: [N],
    fuzz: [N, N, N, N],
    push: [],
    pop: [],
    drawText: [S, N, N, N, N],
    drawTextRel: [S, N, N, N, N],
    colorRGB: [N, N, N],
    colorHSV: [N, N, N],
    colorViridis: [N],
    colorCubehelix: [N, N, N, N],
    colorHex: [N],
    setBGColor: [N],
  };
}

let _tracer = null;
let _lib = null;

function bindAllHostFns(ctx) {
  const decTbl = makeDecoders(ctx);

  Object.entries(decTbl).forEach(([op, decoders]) => {
    const fn = ctx.newFunction(op, (...handles) => {
      /* ---- decode arguments ------------------------------------- */
      const args = handles.map((h, i) => {
        const val = (decoders[i] || ctx.dump)(h);
        h.dispose();
        return val;
      });

      /* ---- dispatch --------------------------------------------- */
      if (_tracer && typeof _tracer[op] === "function") {
        // Method call preserves `this` === _tracer
        _tracer[op](...args);
      } else if (_lib && typeof _lib[op] === "function") {
        _lib[op](_tracer, ...args);
      } else {
        console.warn("TracerVM: unknown opcode", op);
      }
    });

    ctx.setProp(ctx.global, op, fn, false);
    fn.dispose();
  });
}

/* ------------------------------------------------------------------ */
/* 5.  TracerVM                                                       */
/* ------------------------------------------------------------------ */
export default class TracerVM {
  constructor(onError) {
    this.onError = onError;
    this._ready = false;
    this._queuedSrc = null;
    this.hasError = false;
    this.programHandle = null;
  }

  async init() {
    const QuickJS = await newQuickJSWASMModuleFromVariant(variant);
    this.ctx = QuickJS.newContext();
    bindAllHostFns(this.ctx);
    this._ready = true;
    if (this._queuedSrc !== null) {
      const s = this._queuedSrc;
      this._queuedSrc = null;
      this.loadSource(s);
    }
  }

  loadSource(src, tracer) {
    if (!this._ready) {
      this._queuedSrc = src;
      return;
    }

    const wrapped = `globalThis.program=(function(){${buildProgramWrapper(src)}})();`;
    const res = this.ctx.evalCode(wrapped);
    if (res.error) {
      this._enterError(stringifyQJSError(this.ctx, res.error));
      res.error.dispose();
      return;
    }
    this.hasError = false;
    this.onError(null);
    this.programHandle?.dispose?.();
    this.programHandle = this.ctx.getProp(this.ctx.global, "program");
  }

  tick(timeSeconds, tracer, lib = {}) {
    if (this.hasError || !this._ready || !this.programHandle) return;
    _tracer = tracer;
    _lib = lib;
    tracer._beginTick();

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
    } else {
      r.value?.dispose();
    }

    tracer._endTick();
    _tracer = _lib = null; // reset globals
  }

  _enterError(msg) {
    this.hasError = true;
    this.onError(msg);
    this.programHandle?.dispose?.();
    this.programHandle = null;
  }

  dispose() {
    this.programHandle?.dispose?.();
    this.ctx?.dispose();
  }
}
