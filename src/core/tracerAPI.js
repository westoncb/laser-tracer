// tracerApi.js — QuickJS ⇄ host opcode bridge
// -------------------------------------------
// 1.  VM side (inside PRELUDE):
//       helpers like move(), trace(), color() all call `emit(...)`.
// 2.  Host side:
//       • bindEmit(ctx)         – injects emit() into the VM
//       • flushOps()            – returns [["MOVE", x,y,z], …] and clears buffer
//       • tracerOps.replayOps() – feed that list into any target (e.g. LaserTracer)
//
// Typical frame loop (DisplayCanvas):
//
//     bindEmit(ctx);
//     ... run user program ...
//     const ops = flushOps();        // raw tuples
//     replayOps(laserTracer, ops);   // converts to method calls

/* ---------------------------------------------------------- */
/* 1.  Internal opcode buffer                                  */
/* ---------------------------------------------------------- */

// one global buffer; cost is negligible versus per‑frame allocs
const _ops = [];

/**
 * Returns & clears the buffered opcodes.
 * Call this once per frame *after* the VM ran program(time).
 */
export function flushOps() {
  const out = _ops.slice(); // cheap shallow copy
  _ops.length = 0;
  return out;
}

/* ---------------------------------------------------------- */
/* 2.  bindEmit(ctx)                                           */
/* ---------------------------------------------------------- */

/**
 * Injects a single function `emit(opId, ...args)` into the provided
 * QuickJS context.  VM helpers will call it to queue drawing ops.
 */
export function bindEmit(ctx) {
  const emitHandle = ctx.newFunction("emit", (...handles) => {
    // first arg: op id (string)
    const op = ctx.dump(handles[0]); // QuickJSHandle -> JS string

    // remaining args are numbers; convert en masse
    const args = handles.slice(1).map((h) => ctx.dump(h));

    _ops.push([op, ...args]);
  });

  ctx.setProp(ctx.global, "emit", emitHandle);
  emitHandle.dispose();
}

/* ---------------------------------------------------------- */
/* 3.  Prelude injected into *every* user program              */
/* ---------------------------------------------------------- */

/**
 * A template string containing convenience helpers that forward to `emit`.
 * Inject this *before* the user‑authored code when you build the wrapper in
 * compileSource().  Keeping it here centralises the canonical helper list.
 */
export const PRELUDE = `
 // === Laser‑tracer turtle primitives (auto‑generated) ===
 // These live *inside* the QuickJS VM and call the host‑side emit().
 const move     = (x,y,z)      => emit('MOVE',     x,y,z);
 const trace    = (x,y,z)      => emit('TRACE',    x,y,z);
 const deposit  = (x,y,z)      => emit('DEPOSIT',  x,y,z);
 const moveRel  = (dx,dy,dz)   => emit('MOVE_REL', dx,dy,dz);
 const traceRel = (dx,dy,dz)   => emit('TRACE_REL',dx,dy,dz);

 const turn     = (d)          => emit('TURN',     d);
 const pitch    = (d)          => emit('PITCH',    d);
 const roll     = (d)          => emit('ROLL',     d);
 const push     = (d)          => emit('PUSH',     d);
 const pop     = (d)          => emit('POP',     d);

 const size     = (px)         => emit('SIZE',     px);
 const spacing  = (d)          => emit('SPACING',  d);
 const residue  = (s)          => emit('RESIDUE',  s);
 const fuzz     = (n=0,sx=4,sy=sx,sz=sx) =>
   emit('FUZZ', n|0, +sx, +sy, +sz);

 // ---- colour helpers --------------------------------------------------
 // All channel values are floats 0‑1 unless noted. color() is kept as a
 // legacy alias for hex.
 const colorHex      = (hex)                 => emit('COLOR', hex >>> 0);
 const colorRGB      = (r,g,b)               => emit('COLOR', rgb2hex(r,g,b));
 const colorHSV      = (h,s,v)               => emit('COLOR', hsv2hex(h,s,v));
 const colorViridis  = t                     => emit('COLOR', viridisHex(t));
 const colorCubehelix = (t,start=0.5,rot=-1.5,gamma=1) =>
   emit('COLOR', cubehelixHex(t,start,rot,gamma));
 const color         = colorHex;             // back‑compat

 /* ---------- tiny converters ---------------------------------------- */
 function rgb2hex(r,g,b){
   const toB = x => Math.max(0, Math.min(255, Math.round(x*255)));
   return (toB(r)<<16) | (toB(g)<<8) | toB(b);
 }

 function hsv2hex(h,s,v){
   h = ((h % 1) + 1) % 1;                    // wrap hue
   const i = Math.floor(h * 6);
   const f = h * 6 - i;
   const p = v * (1 - s);
   const q = v * (1 - f * s);
   const t = v * (1 - (1 - f) * s);
   const [r,g,b] = [
     [v,t,p],[q,v,p],[p,v,t],[p,q,v],[t,p,v],[v,p,q]
   ][i % 6];
   return rgb2hex(r,g,b);
 }

 /* ---------- viridis palette (lookup + lerp) ------------------------- */
 /* 64‑entry table keeps size tiny; linear interpolation is smooth.     */
 const _viridis = [
   0x440154,0x471164,0x482071,0x472d7b,0x453882,0x414287,0x3b4b8a,0x35538c,
   0x2f5c8e,0x2a648f,0x266c91,0x227394,0x1e7b96,0x1c8397,0x1b8a98,0x1d9299,
   0x219a98,0x28a197,0x30a897,0x39af95,0x42b694,0x4cbd92,0x55c390,0x5fc98d,
   0x68ce8a,0x72d387,0x7cd784,0x86db81,0x8fdf7e,0x99e37b,0xa2e678,0xacea74,
   0xb5ed70,0xbeef6d,0xc7f169,0xcff366,0xd7f562,0xdff65e,0xe7f65a,0xeff756,
   0xf7f752,0xfef74e
 ];
 function viridisHex(t){
   t = Math.max(0, Math.min(1, t));
   const idx = t * (_viridis.length - 1);
   const i0  = Math.floor(idx);
   const i1  = Math.min(i0 + 1, _viridis.length - 1);
   const f   = idx - i0;
   const lerp = (a,b) => {
     const rb = a & 0xff,   gb = (a>>8)&0xff,   bb = (a>>16);
     const re = b & 0xff,   ge = (b>>8)&0xff,   be = (b>>16);
     const r  = rb + (re - rb) * f;
     const g  = gb + (ge - gb) * f;
     const v  = bb + (be - bb) * f;
     return (Math.round(v)<<16)|(Math.round(g)<<8)|Math.round(r);
   };
   return lerp(_viridis[i0], _viridis[i1]);
 }

 /* ---------- parametric cubehelix ----------------------------------- */
 function cubehelixHex(t,start=0.5,rot=-1.5,gamma=1){
   t = Math.pow(Math.max(0, Math.min(1, t)), gamma);
   const a   = 0.5;
   const phi = 2 * Math.PI * (start + rot * t);
   const amp = a * t * (1 - t);
   const r = t + amp * (-0.14861 * Math.cos(phi) + 1.78277 * Math.sin(phi));
   const g = t + amp * (-0.29227 * Math.cos(phi) - 0.90649 * Math.sin(phi));
   const b = t + amp * ( 1.97294 * Math.cos(phi));
   return rgb2hex(r,g,b);
 }
 `;

/* ---------------------------------------------------------- */
/* 4.  Helper: build wrapper around user source                */
/* ---------------------------------------------------------- */

/**
 * Utility that returns a wrapper string ready for ctx.evalCode().
 * It injects the PRELUDE *and* returns the user‑defined `program` function
 * so the host can call it every frame.
 */
export function buildProgramWrapper(userSource) {
  return `globalThis.program = (function(){\n${PRELUDE}\n${userSource}\nreturn program;})();`;
}
