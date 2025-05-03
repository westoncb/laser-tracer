/* ==========================================================
   Laser‑Tracer demo : "Mini Quasicrystal Deck"
   ----------------------------------------------------------
   3 slides · horizontal ease‑in/out wipes · navigation dots
========================================================== */

/* ───── 1 · Palette & quick style helper ─────────────────── */
const STYLE = {//[r,g,b , size , gap , fuzz , residue]
  title  : [0,0.9,0.4  , 4 , .1 , 1 ,.8],
  caption: [1,1,0.4    , 2.5 , .1   , 2 ,.6],
  real   : [0.9,0.4,0.1, 3.5 ,.15 , 1 ,0.6],
  recip  : [0.2,0.7,1.0, 3.0 ,.15 , 1 ,0.6],
  grid   : [0.4,0.5,0.6, 4 , .3   , 4 ,0.6],
  arrow  : [0.7,0.7,0.7, 3.0 , .2 , 1 ,0.6],
};

function styl(p, key, k = 1) {                  // k = fade scale
  const [r,g,b,s,gap,f,res] = STYLE[key];
  return p.colorRGB(r,g,b).dotSize(s*k).traceGap(gap)
          .fuzz(f,0.1).residue(res*k);
}

/* ───── 2 · Micro‑primitives ─────────────────────────────── */
const SEG = 24;
function ring(p, r) {               // XY ring
  const v=[]; for(let i=0;i<=SEG;i++){
    const a=i/SEG*Math.PI*2; v.push({x:Math.cos(a)*r,y:Math.sin(a)*r,z:0});
  } p.polyline(v,true);
}
function arrowFig(p) { styl(p,'arrow');
  p.moveTo(-4,0,0).traceTo(4,0,0)
   .moveTo(4,0,0).traceTo(2,1,0)
   .moveTo(4,0,0).traceTo(2,-1,0);
}

/* ---- Penrose star ---- */
function penrose(p){ styl(p,'real');
  const R=10, pts=[];
  for(let i=0;i<10;i++){ const a=i*Math.PI/5;
    pts.push({x:R*Math.cos(a),y:R*Math.sin(a),z:0});
  }
  p.polyline(pts,true);                         // outer star
  for(let i=0;i<5;i++){                         // inner rhombs
    const a=i*2*Math.PI/5, b=((i+1)%5)*2*Math.PI/5,
          r1=4, r2=7, c=Math.PI/10;
    p.polyline([
      {x:0,y:0,z:0},
      {x:r1*Math.cos(a),y:r1*Math.sin(a),z:0},
      {x:r2*Math.cos(a+c),y:r2*Math.sin(a+c),z:0},
      {x:r1*Math.cos(b),y:r1*Math.sin(b),z:0},
      {x:0,y:0,z:0}
    ],false);
  }
}

/* ---- Diffraction rings ---- */
function diffraction(p){ styl(p,'recip');
  const rings=5, sym=10;
  for(let r=1;r<=rings;r++){
    const R=r*2.5;
    for(let i=0;i<sym;i++){ const a=i*2*Math.PI/sym;
      p.moveTo(Math.cos(a)*R,Math.sin(a)*R,0).dot();
      if(r>1 && !(i&1)){                      // connectors
        const a2=((i+1)%sym)*2*Math.PI/sym,
              R2=R-2.5;
        p.moveTo(Math.cos(a)*R2,Math.sin(a)*R2,0)
         .traceTo(Math.cos(a2)*R,Math.sin(a2)*R,0);
      }
    }
  }
}

/* ---- 4D→3D projection cube ---- */
function projCube(p,time){
  const S=8, pts=[[-S,-S,-S],[S,-S,-S],[S,S,-S],[-S,S,-S],
                  [-S,-S,S ],[S,-S,S ],[S,S,S ],[-S,S,S ]]
                .map(([x,y,z])=>({x,y,y,z}));
  styl(p,'grid');
  [[0,1,2,3,0],[4,5,6,7,4]].forEach(loop=>
    p.polyline(loop.map(i=>pts[i]),false));
  [0,1,2,3].forEach(i=>p.polyline([pts[i],pts[i+4]],false));
  // fourth‑dimension spokes
  styl(p,'recip');
  const t=(Math.sin(time*0.8)*.3+.5)*.7;
  pts.forEach(({x,y,z})=>{
    const q={x:x*(1-t),y:y*(1-t),z:z*(1-t)};
    p.moveTo(x,y,z).traceTo(q.x,q.y,q.z);
  });
}

/* ───── 3 · Slide registry ───────────────────────────────── */
const SLIDES = [
  { title:"QUASICRYSTALS", caption:"ORDERED • APERIODIC",
    draw(p,t){p.yaw(t*10); penrose(p);} },

  { title:"REAL → RECIPROCAL", caption:"FOURIER TRANSFORM",
    draw(p,t){
      p.push().moveBy(-12,0,0).yaw(t*5); penrose(p); p.pop();
      arrowFig(p);
      p.push().moveBy( 12,0,0).yaw(-t*5); diffraction(p); p.pop();
    }},

  { title:"HIGHER‑D SLICE", caption:"4D CUBE → 3D PROJECTION",
    draw(p,t){ p.yaw(t*8).pitch(Math.sin(t*.4)*15); projCube(p,t);} },
];

/* ───── 4 · Layout helpers ───────────────────────────────── */
const DUR=8, TRANS=2, X=40;
function ease(t){ return t<.5 ? 2*t*t : 1-(-2*t+2)**2/2; }

function drawSlide(p,idx,phase,time,fade){
  const dir=idx&1?1:-1;
  p.push().moveBy(dir*X*ease(phase),0,0);

  styl(p,'title',fade).text(SLIDES[idx].title, 2.2*fade);
  p.push().moveBy(0,-16,0);
    styl(p,'caption',fade).text(SLIDES[idx].caption,1.2*fade);
  p.pop();

  p.push(); SLIDES[idx].draw(p,time); p.pop();
  p.pop();
}

function navDots(p,cur){
  const dx=3,w=(SLIDES.length-1)*dx;
  for(let i=0;i<SLIDES.length;i++){
    styl(p,i===cur?'caption':'grid');
    p.moveTo(-w/2+i*dx,-18,0).dot();
  }
}

/* ───── 5 · Main loop ───────────────────────────────────── */
let first=true;
function program(pen,d,time){
  if(first){
    setBGColor(0x000015);
    setCamera({x:0,y:0,z:60},{x:0,y:0,z:0});
    first=false;
  }

  const n=SLIDES.length, t=time%(n*DUR),
        idx=Math.floor(t/DUR), prog=(t%DUR)/DUR,
        f = Math.max(0,(prog - (1-TRANS/DUR))*DUR/TRANS); // 0→1

  drawSlide(pen, idx           , f , time, 1-f );
  drawSlide(pen,(idx+1)%n, 1-f , time,   f );

  pen.push(); navDots(pen,idx); pen.pop();
}
