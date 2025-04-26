import variant from "@jitl/quickjs-singlefile-browser-release-sync";
import { newQuickJSWASMModuleFromVariant } from "quickjs-emscripten-core";

/* ------------------------------------------------------------------ */
/* 1 · PRELUDE (executed inside QuickJS VM)                           */
/* ------------------------------------------------------------------ */
const PRELUDE_VERSION = 3;

const PRELUDE = String.raw`
// ==== Laser-Tracer PRELUDE (v${PRELUDE_VERSION}) ====================
// Creates a *pen* object backed by host opcodes and a stateless *draw*
// helper.

// ----- host-bridged opcodes ----------------------------------------
const _h = globalThis; // shorthand

// ─────────────── pen object ───────────────
const pen = {
  /* stack & orientation */
  push : () => _h.push(),
  pop  : () => _h.pop(),
  yaw  : d => _h.yaw(d),
  pitch: d => _h.pitch(d),
  roll : d => _h.roll(d),

  dotSize   : px => _h.dotSize(px),
  traceGap  : d  => _h.traceGap(d),
  residue   : s  => _h.residue(s),
  fuzz      : (n=0,sx=4,sy=sx,sz=sx)=>_h.fuzz(n|0,+sx,+sy,+sz),
  colorHex  : hex => _h.colorHex(hex >>> 0),


  /* motion & strokes */
  moveTo : (x,y,z)    => _h.moveTo(x,y,z),
  moveBy : (dx,dy,dz) => _h.moveBy(dx,dy,dz),
  traceTo: (x,y,z)    => _h.traceTo(x,y,z),
  traceBy: (dx,dy,dz) => _h.traceBy(dx,dy,dz),
  dot    : ()         => _h.dot(),
  dotAt  : (x,y,z)    => _h.dotAt(x,y,z),

  /* mutable brush settings (treated as data) */
  settings : {
    dotSize  : 5,
    traceGap : 1,
    residue  : 1,
    fuzz     : { count:0, sx:0, sy:0, sz:0 },
    color    : 0xaa88ff,
  },

  /* colour helpers still convenient */
  colorRGB       : (r,g,b)                => _h.colorRGB(r,g,b),
  colorHSV       : (h,s,v)                => _h.colorHSV(h,s,v),
  colorViridis   : t                      => _h.colorViridis(t),
  colorCubehelix : (t,st=.5,rot=-1.5,g=1) => _h.colorCubehelix(t,st,rot,g),
  colorHex       : hex                    => { pen.settings.color = hex>>>0; },
  color       : hex                    => { pen.settings.color = hex>>>0; },

  /* --- text helpers ------------------------------------------------- */
  drawText    : (t,x,y,z,h=4)    => globalThis.drawText(t,x,y,z,h),
  drawTextRel : (t,dx,dy,dz,h=4) => globalThis.drawTextRel(t,dx,dy,dz,h),
};

// expose pen for ad-hoc debugging *inside* QuickJS
globalThis.pen = pen;

// ─────────────── draw helpers (stateless) ───────────────
const draw = {
  line(p0, p1) {
    pen.push();
    pen.moveTo(p0.x, p0.y, p0.z);
    pen.traceTo(p1.x, p1.y, p1.z);
    pen.pop();
  },
  polyline(pts) {
    if (!pts.length) return;
    pen.push();
    pen.moveTo(pts[0].x, pts[0].y, pts[0].z);
    for (let i = 1; i < pts.length; i++)
      pen.traceTo(pts[i].x, pts[i].y, pts[i].z);
    pen.pop();
  },
  point(p) {
    pen.push(); pen.moveTo(p.x,p.y,p.z); pen.dot(); pen.pop();
  },
  text(str, p, h = 4) {
    pen.push(); pen.moveTo(p.x,p.y,p.z);
    drawText(str, 0, 0, 0, h);
    pen.pop();
  },
};

globalThis.draw = draw;

// ---- colour utilities (kept from v2) ------------------------------
const setBGColor = hex => _h.setBGColor(hex);

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
  return {
    // motion & pen
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

    // colour helpers
    colorRGB: [N, N, N],
    colorHSV: [N, N, N],
    colorViridis: [N],
    colorCubehelix: [N, N, N, N],
    colorHex: [N],
    setBGColor: [N],

    // pen settings
    dotSize: [N],
    traceGap: [N],
    residue: [N],
    fuzz: [N, N, N, N],
    colorHex: [N],
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
    preRes.value?.dispose(); // (usually undefined)

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
