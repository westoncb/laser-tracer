// tracerOps.js
import * as THREE from "three";
const v3 = (x, y, z) => new THREE.Vector3(x, y, z);

/* ---- 1. handler table ---------------------------------------------- */
export const HANDLERS = {
  MOVE: (t, [x, y, z]) => t.move?.(v3(x, y, z)),
  MOVE_REL: (t, [x, y, z]) => t.moveRel?.(v3(x, y, z)),
  TRACE: (t, [x, y, z]) => t.trace?.(v3(x, y, z)),
  TRACE_REL: (t, [x, y, z]) => t.traceRel?.(v3(x, y, z)),
  DEPOSIT: (t, [x, y, z]) => t.deposit?.(v3(x, y, z)),
  DEPOSIT_REL: (t, [x, y, z]) => t.depositRel?.(v3(x, y, z)),
  DRAW_TEXT: (t, [text, x, y, z, h = 4]) => t.drawText?.(text, x, y, z, h),
  DRAW_TEXT_REL: (t, [text, dx, dy, dz, h = 4]) =>
    t.drawTextRel?.(text, dx, dy, dz, h),
  COLOR: (t, [c]) => t.color?.(c),
  SIZE: (t, [s]) => t.size?.(s),
  SPACING: (t, [d]) => t.spacing?.(d),
  RESIDUE: (t, [r]) => t.residue?.(r),
  FUZZ: (t, args) => t.fuzz?.(...args),
  YAW: (t, [d]) => t.yaw?.(d),
  PITCH: (t, [d]) => t.pitch?.(d),
  ROLL: (t, [d]) => t.roll?.(d),
  PUSH: (t) => t.push?.(),
  POP: (t) => t.pop?.(),
};

/* ---- 2. utility to play a raw opcode list onto a target ------------ */
export function replayOps(target, opTuples) {
  for (const [op, ...a] of opTuples) {
    const fn = HANDLERS[op];
    if (fn) fn(target, a);
    else console.warn("Unknown opcode", op);
  }
}
