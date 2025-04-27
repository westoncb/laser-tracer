import variant from "@jitl/quickjs-singlefile-browser-release-sync";
import { newQuickJSWASMModuleFromVariant } from "quickjs-emscripten-core";

/* ------------------------------------------------------------------ */
/* 1 · PRELUDE (executed inside QuickJS VM)                           */
/* ------------------------------------------------------------------ */
const PRELUDE_VERSION = 3;

const PRELUDE = String.raw`
// ==== Laser-Tracer PRELUDE (v${PRELUDE_VERSION}) ====================
// Single-source API:  pen.*  (raw turtle)  +  draw.* (stateless helpers)

/* ---- host opcodes on globalThis ---------------------------------- */
const _h = globalThis;

/* ---- wrappers needed by draw.text ------------------------------- */
const drawText    = (t,x,y,z,h=4)=>_h.drawText(t,x,y,z,h);
const drawTextRel = (t,dx,dy,dz,h=4)=>_h.drawTextRel(t,dx,dy,dz,h);

/* ────────────── pen: the only stateful object ───────────────────── */
const pen = {
  /* transform stack & orientation */
  push : ()       => _h.push(),
  pop  : ()       => _h.pop(),
  yaw  : d        => _h.yaw(d),
  pitch: d        => _h.pitch(d),
  roll : d        => _h.roll(d),

  /* brush setters (instant; no local shadow state) */
  dotSize : px                    => { _h.dotSize(px); return pen; },
  traceGap: d                     => { _h.traceGap(d); return pen; },
  residue : s                     => { _h.residue(s); return pen; },
  fuzz    : (n=0,sx=4,sy=sx,sz=sx)=> { _h.fuzz(n|0,+sx,+sy,+sz); return pen; },
  colorHex: hex                   => { _h.colorHex(hex>>>0); return pen; },
  colorRGB: (r,g,b)               => { _h.colorRGB(r,g,b); return pen; },
  colorHSV: (h,s,v)               => { _h.colorHSV(h,s,v); return pen; },
  colorViridis:t                  => { _h.colorViridis(t); return pen; },
  colorCubehelix:(t,st=.5,rot=-1.5,g=1)=>{ _h.colorCubehelix(t,st,rot,g); return pen; },

  /* raw motion & strokes */
  moveTo :(x,y,z)     => _h.moveTo(x,y,z),
  moveBy :(dx,dy,dz)  => _h.moveBy(dx,dy,dz),
  traceTo:(x,y,z)     => _h.traceTo(x,y,z),
  traceBy:(dx,dy,dz)  => _h.traceBy(dx,dy,dz),
  dot    : ()         => _h.dot(),
  dotAt  : (x,y,z)    => _h.dotAt(x,y,z),

  polyline: (pts, close=false)=> _h.polylineLocal(pts, close|0),
  sweep: (path, prof, close=false)=>
    _h.sweepLocal(path, prof, close|0)
};

/* make pen visible inside QuickJS for debugging/REPL */
globalThis.pen = pen;

/* ────────────── stateless draw helpers ─────────────────────────── */
const draw = {
  line(p0, p1) {
    pen.push();
    pen.moveTo(p0.x, p0.y, p0.z);
    pen.traceTo(p1.x, p1.y, p1.z);
    pen.pop();
  },
  point(p) {
    pen.push(); pen.moveTo(p.x, p.y, p.z); pen.dot(); pen.pop();
  },
  text(str, p, h = 4) {
    pen.push();
    drawText(str, p.x, p.y, p.z, h);
    pen.pop();
  },
  polyline: (pts, close=false)=> _h.polylineWorld(pts, close|0),
  sweep: (path, prof, close=false)=>
    _h.sweepWorld(path, prof, close|0)
};

// ---- colour utilities (kept from v2) ------------------------------
const setBGColor = hex => _h.setBGColor(hex);


globalThis.draw = draw;
`; // ← end of String.raw

function buildProgramWrapper(userSource) {
  return (
    // Line-1 wrapper ⇣   (user code now starts on line-2)
    "globalThis.program = (function () {\n" +
    userSource +
    "\nreturn program;\n})();"
  );
}

/* ------------------------------------------------------------------ */
/* 3 · QuickJS error → string                                         */
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
/* 4 · Host bindings                                                  */
/* ------------------------------------------------------------------ */
function makeDecoders(ctx) {
  const N = (h) => ctx.getNumber(h);
  const S = (h) => ctx.getString(h);
  const D = (h) => ctx.dump(h);

  return {
    /* ── motion & pen ─────────────────────────────────────────── */
    moveTo: [N, N, N],
    moveBy: [N, N, N],
    traceTo: [N, N, N],
    traceBy: [N, N, N],
    dotAt: [N, N, N],
    dot: [],
    push: [],
    pop: [],
    yaw: [N],
    pitch: [N],
    roll: [N],
    drawText: [S, N, N, N, N],
    drawTextRel: [S, N, N, N, N],

    /* ── colour helpers ───────────────────────────────────────── */
    colorRGB: [N, N, N],
    colorHSV: [N, N, N],
    colorViridis: [N],
    colorCubehelix: [N, N, N, N],
    colorHex: [N],
    setBGColor: [N],

    /* ── brush setters ───────────────────────────────────────── */
    dotSize: [N],
    traceGap: [N],
    residue: [N],
    fuzz: [N, N, N, N],

    /* ── new high-level geometry ops ─────────────────────────── */
    polylineLocal: [D, N], // (ptsArray, closeBool?)
    polylineWorld: [D, N],
    sweepLocal: [D, D, N], // (path, prof, closeFlag)
    sweepWorld: [D, D, N],
  };
}

let _tracer = null;
let _lib = null;

function bindAllHostFns(ctx) {
  const decTbl = makeDecoders(ctx);
  Object.entries(decTbl).forEach(([op, decoders]) => {
    const fn = ctx.newFunction(op, (...handles) => {
      const args = handles.map((h, i) => {
        const v = (decoders[i] || ctx.dump)(h);
        h.dispose();
        return v;
      });
      if (_tracer && typeof _tracer[op] === "function") {
        _tracer[op](...args);
      } else if (_lib && typeof _lib[op] === "function") {
        _lib[op](_tracer, ...args);
      }
    });
    ctx.setProp(ctx.global, op, fn, false);
    fn.dispose();
  });
}

/* ------------------------------------------------------------------ */
/* 6 · TracerVM                                                       */
/* ------------------------------------------------------------------ */
export default class TracerVM {
  constructor(onError) {
    this.onError = onError;
    this._ready = false;
    this._queuedSrc = null;
    this.hasError = false;
    this.programHandle = null;
    this.penHandle = null;
    this.drawHandle = null;
  }

  async init() {
    const QuickJS = await newQuickJSWASMModuleFromVariant(variant);
    this.ctx = QuickJS.newContext();
    bindAllHostFns(this.ctx);

    // ── evaluate the prelude as its own “module” ───────────────
    const preRes = this.ctx.evalCode(PRELUDE, "prelude.js");
    if (preRes.error) {
      const msg = stringifyQJSError(this.ctx, preRes.error);
      console.error("Prelude failed:", msg);
      throw new Error("QuickJS prelude failed to load");
    }
    preRes.value?.dispose();

    this._ready = true;
    if (this._queuedSrc !== null) {
      const s = this._queuedSrc;
      this._queuedSrc = null;
      this.loadSource(s);
    }
  }

  loadSource(src) {
    if (!this._ready) {
      this._queuedSrc = src;
      return;
    }

    const res = this.ctx.evalCode(buildProgramWrapper(src), "usercode.js");
    if (res.error) {
      this._enterError(stringifyQJSError(this.ctx, res.error));
      res.error.dispose();
      return;
    }

    this.hasError = false;
    this.onError(null);
    this.programHandle?.dispose?.();
    this.programHandle = this.ctx.getProp(this.ctx.global, "program");

    // fetch persistent handles to pen & draw (global objects)
    this.penHandle?.dispose?.();
    this.drawHandle?.dispose?.();
    this.penHandle = this.ctx.getProp(this.ctx.global, "pen");
    this.drawHandle = this.ctx.getProp(this.ctx.global, "draw");

    res.value.dispose();
  }

  tick(timeSeconds, tracer, lib = {}) {
    if (this.hasError || !this._ready || !this.programHandle) return;
    _tracer = tracer;
    _lib = lib;

    tracer._beginTick();

    // ---- call user program -------------------------------------------
    const tMs = this.ctx.newNumber(timeSeconds);
    const r = this.ctx.callFunction(
      this.programHandle,
      this.ctx.undefined,
      this.penHandle,
      this.drawHandle,
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
    _tracer = _lib = null;
  }

  _enterError(msg) {
    this.hasError = true;
    this.onError(msg);
    this.programHandle?.dispose?.();
    this.programHandle = null;
  }

  dispose() {
    this.programHandle?.dispose?.();
    this.penHandle?.dispose?.();
    this.drawHandle?.dispose?.();
    this.ctx?.dispose();
  }
}
