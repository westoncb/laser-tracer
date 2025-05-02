//o3 vibe sketching 2

/* ================================================================
   Laser‑Tracer : “Collective Unconscious · Mandala”
   ----------------------------------------------------------------
   visual layers
     1. Pulsing core  – undifferentiated psychic seed
     2. Four counter‑rotating archetype rings
     3. Dynamic bridges between adjacent rings
     4. Spiralling dream‑particle drift
================================================================ */

//// ---------- parameters ----------
const CORE_R        = 10;
const RINGS = [
  { r:  9, n:  6,  speed:  6, hue: 0.00 },
  { r: 13, n: 10,  speed: -4, hue: 0.10 },
  { r: 17, n: 14,  speed:  3, hue: 0.25 },
  { r: 21, n: 18,  speed: -2, hue: 0.40 },
];
const BRIDGE_DENSITY  = 0.4;   // fraction of ring nodes that sprout a bridge
const SWARM_N         = 1500;
const SWARM_R         = 26;

//// ---------- persistent state ----------
const swarm = [];                // {x,y,z,vx,vy,vz,born}
let first = true;

function spawnParticle(i, t) {
  const th = Math.random()*Math.PI*2;
  const ph = Math.acos(2*Math.random()-1);
  const r  = SWARM_R*(0.2+0.8*Math.random());
  swarm[i] = {
    x: r*Math.sin(ph)*Math.cos(th),
    y: r*Math.sin(ph)*Math.sin(th),
    z: r*Math.cos(ph),
    vx: (Math.random()-0.5)*0.03,
    vy: (Math.random()-0.5)*0.03,
    vz: (Math.random()-0.5)*0.03,
    born: t,
  };
}

//// ---------- utility ----------
function nodePos(rSpec, k, time) {
  const ang = (k/rSpec.n)*Math.PI*2 + time*rSpec.speed*Math.PI/180;
  return {
    x: Math.cos(ang)*rSpec.r,
    y: Math.sin(ang)*rSpec.r,
    z: 0,
  };
}

//// ---------- main program ----------
function program(pen,draw, time) {
  if (first) {
    setBGColor(0x000007);
    for (let i=0;i<SWARM_N;i++) spawnParticle(i,0);
    first=false;
  }

  // orbitCamera({x:0,y:0,z:0}, 75, time*8, 22);

  //// 1 · Pulsing core
  pen.push();
  const pulse = 0.65+0.35*Math.sin(time*2);
  pen.dotSize(2).fuzz(3,0.2).residue(2);
  for (let s=0;s<18;s++){
    const r = CORE_R*pulse*Math.sqrt(s/18);
    const dots = 28+40*r;
    pen.colorCubehelix((time*0.08+s/20)%1,0.5,-1.4,1);
    for (let d=0; d<dots; d++){
      const a = d/dots*Math.PI*2;
      pen.moveTo(Math.cos(a)*r, Math.sin(a)*r, 0).dot();
    }
  }
  pen.pop();

  //// 2 · Archetype rings
  const ringNodes = [];       // collect node coords for bridge step

  for (const ring of RINGS){
    pen.push();
    pen.dotSize(3).traceGap(0.12).fuzz(2,0.12).residue(1.6);
    pen.colorCubehelix((ring.hue+time*0.05)%1,0.55,-1.5,0.9);

    for (let k=0;k<ring.n;k++){
      const p = nodePos(ring,k,time);
      const q = nodePos(ring,k+1,time);   // next node for arc segment
      pen.moveTo(p.x,p.y,p.z);
      pen.traceTo(q.x,q.y,q.z);           // small arc piece
      ringNodes.push({ringIdx:RINGS.indexOf(ring), idx:k, ...p});
    }
    pen.pop();
  }

  //// 3 · Bridges (adjacent-ring threads)
  pen.push();
  pen.dotSize(6).traceGap(0.1).fuzz(3,0.1).residue(1.2);

  for (const node of ringNodes){
    if (Math.random()>BRIDGE_DENSITY) continue;
    const nextRingIdx = node.ringIdx+1;
    if (nextRingIdx>=RINGS.length) continue;

    const target = nodePos(RINGS[nextRingIdx], node.idx % RINGS[nextRingIdx].n, time);
    const hue = (RINGS[node.ringIdx].hue + 0.07)%1;
    pen.colorCubehelix(hue,0.6,-1.4,0.85);
    pen.moveTo(node.x,node.y,node.z);
    pen.traceTo(target.x,target.y,target.z);
  }
  pen.pop();

  //// 4 · Dream‑particle drift
  pen.push();
  pen.dotSize(8).traceGap(0.25).fuzz(0).residue(0.7);
  for (let i=0;i<SWARM_N;i++){
    const p = swarm[i];

    // update motion
    p.x += p.vx; p.y += p.vy; p.z += p.vz;
    const pull = -0.0003;
    p.vx += p.x*pull; p.vy += p.y*pull; p.vz += p.z*pull;
    p.vx += (Math.random()-0.5)*0.0007;
    p.vy += (Math.random()-0.5)*0.0007;
    p.vz += (Math.random()-0.5)*0.0007;

    // respawn
    const life = 15;
    if (time-p.born>life) spawnParticle(i,time);

    // render
    const dist = Math.sqrt(p.x**2+p.y**2+p.z**2)/SWARM_R;
    pen.colorCubehelix((dist+time*0.03)%1,0.5,-1.4,0.8);
    pen.moveTo(p.x,p.y,p.z).dot();
  }
  pen.pop();
}
