/* ================================================================
   ICOSAHEDRAL QUASICRYSTAL SLICE
   ----------------------------------------------------------------
   12 k-vectors = 6 golden-ratio body diagonals of an icosahedron.
   Signed amplitude → height; |A| → Viridis hue.
================================================================= */

/* -------- 1 · icosahedral k-vectors ---------------------------
   Use the six axes (±ϕ,±1,0) etc. where ϕ = (1+√5)/2.
   We normalise each to length KLEN.
---------------------------------------------------------------- */
const ϕ    = (1 + Math.sqrt(5)) / 2;
const RAW  = [
  [  ϕ,  1,  0], [ -ϕ, -1,  0],
  [  ϕ, -1,  0], [ -ϕ,  1,  0],
  [  1,  0,  ϕ], [ -1,  0, -ϕ],
  [  1,  0, -ϕ], [ -1,  0,  ϕ],
  [  0,  ϕ,  1], [  0, -ϕ, -1],
  [  0,  ϕ, -1], [  0, -ϕ,  1],
];

const KLEN = 0.35;
const K    = RAW.map(v => {
  const n = Math.hypot(...v);
  return { kx: (v[0] / n) * KLEN,
           kz: (v[2] / n) * KLEN };        // slice ignores y-component
});

/* -------- 2 · sampling lattice (2-D slice) ------------------- */
const GRID = 50, STEP = 1;               // 2,500 deposits / frame
const OFF  = [];
for (let z = 0; z < GRID; z++)
 for (let x = 0; x < GRID; x++)
   OFF.push({ x:(x-(GRID-1)/2)*STEP,
              z:(z-(GRID-1)/2)*STEP });

/* -------- 3 · amplitude from the 12 k-vectors ---------------- */
function amp12(px, pz, θ){
  let a = 0;
  for (const kv of K){
    a += Math.cos(px*kv.kx + pz*kv.kz + θ);   // phase θ animates pattern
  }
  return a / K.length;                       // [-1,1]
}

/* -------- 4 · per-frame render -------------------------------- */
const AMP_Y   = 16;     // height scale
const RESID   = 1;      // trail seconds
const FUZZ_N  = 3, FUZZ_R = 0.25;

// First frame flag
let firstFrame = true;

function program(pen, d,time) {
  // First-time initialization if needed
  if (firstFrame) {
    setCamera({x: 0, y: 0, z: 75}, {x: 0, y: 0, z: 0});  // Similar to default camera
    firstFrame = false;
  }
  
  // Setup pen appearance
  pen.dotSize(9)
     .residue(RESID)
     .fuzz(FUZZ_N, FUZZ_R);
  
  // Position and orient the pen
  pen.push()
     .moveTo(0, 0, 48)      // Slice ~102 wu from camera
     .yaw(time * 10)
     .pitch(time * 6);      // Gentle inspection spin
  
  // Calculate phase for animation
  const θ = time * 1;      // Field phase drift
  
  // Draw the quasicrystal pattern
  for (const p of OFF) {
    const A = amp12(p.x, p.z, θ);
    pen.colorViridis(Math.abs(A))
       .moveTo(p.x, A * AMP_Y, p.z)
       .dot();              // Replace "deposit" with "dot"
  }
  
  pen.pop();                // Restore pen state
}