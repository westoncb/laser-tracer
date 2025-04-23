/* ================================================================
   PARAMETRIC CAD-GRID CUBE
   --------------------------------------------------------------- */

/* ---------------- configuration knobs ------------------------- */
const CFG = {
  halfExtent   : 30,          // cube half-size
  cellsMinor   : 24,          // # small cells per edge
  majorStep    : 8,           // every Nth line is major
  edgeBandRows : 3,           // rows of extra-dark “bands” near edges

  colourMinor  : 0x303540,    // low-sat grey blue
  colourMajor  : 0x507560,    // green-ish
  colourBand   : 0x503035,    // orange-ish for bands
  colourEdge   : 0x202020,
  colourLabel  : 0xffffff,
};

function program(timeMs) {
  const t = timeMs * 0.001;

  residue(.75);
  spacing(.25);
  fuzz(0);

  push();
    yaw( t * 15 );
    pitch( Math.sin(t * 0.3) * 20 );

    const L = CFG.halfExtent;
    drawCube(L);
    labelFaces(L);
  pop();
}

/* ----------------------------------------------------------------
   drawCube – faces + bands + accent edges, all relative
-----------------------------------------------------------------*/
function drawCube(L) {
  const cell      = (2 * L) / CFG.cellsMinor;
  const majorRows = new Set();                 // indices of major lines

  for (let i = 0; i <= CFG.cellsMinor; i += CFG.majorStep) majorRows.add(i);

  /* helper draws one oriented face (+Z outward) */
  const drawFace = () => {
    for (let i = 0; i <= CFG.cellsMinor; i++) {
      const x = -L + i * cell;

      // select style for this line index
      const isBand  = i < CFG.edgeBandRows || i > CFG.cellsMinor - CFG.edgeBandRows;
      const isMajor = majorRows.has(i);

      const style = isBand ? "band" : isMajor ? "major" : "minor";
      setLineStyle(style);

      /* vertical */
      push(); moveRel(x, -L, 0); traceRel(0, 2*L, 0); pop();

      /* horizontal */
      push(); moveRel(-L, x, 0); traceRel(2*L, 0, 0); pop();
    }
  };

  const faces = [
    [   0,   0,   0],   // front  (+Z) – viewed normally
    [   0, 180, 180],   // back   (-Z) – extra 180° roll so text outward
    [   0, -90, 180],   // left   (-X)
    [   0,  90, 180],   // right  (+X)
    [  90,   0, 180],   // top    (+Y)
    [ -90,   0, 180],   // bottom (-Y)
  ];

  for (const r of faces) {
    push();
      pitch(r[0]); yaw(r[1]); roll(r[2]);      // align +Z outward, text upright
      moveRel(0, 0, -L + 0.05);                // tiny inset
      drawFace();
    pop();
  }

  /* ---- edges -------------------------------------------------- */
  setLineStyle("edge");
  const c = [-L, L];
  const edge = (p, q) => {
    push(); moveRel(...p); traceRel(q[0]-p[0], q[1]-p[1], q[2]-p[2]); pop();
  };

  for (const y of c) for (const z of c) edge([-L,y,z],[ L,y,z]);  // X edges
  for (const x of c) for (const z of c) edge([x,-L,z],[x, L,z]);  // Y edges
  for (const x of c) for (const y of c) edge([x,y,-L],[x,y, L]);  // Z edges
}

/* switch line thickness / colour based on style key */
function setLineStyle(kind) {
  switch (kind) {
    case "minor": size(6); colorHex(CFG.colourMinor); break;
    case "major": size(8); colorHex(CFG.colourMajor); break;
    case "band" : size(8); colorHex(CFG.colourBand ); break;
    case "edge" : size(10); colorHex(CFG.colourEdge ); break;
  }
}

/* ----------------------------------------------------------------
   labelFaces – outward-facing text
-----------------------------------------------------------------*/
function labelFaces(L) {
  size(4);
  fuzz(0);
  colorHex(CFG.colourLabel);

  const H = 5;
  const faces = [
    { rot:[   0,   0,   0], txt:"FRONT"  },
    { rot:[   0, 180, 180], txt:"BACK"   },
    { rot:[   0, -90, 180], txt:"LEFT"   },
    { rot:[   0,  90, 180], txt:"RIGHT"  },
    { rot:[  90,   0, 180], txt:"TOP"    },
    { rot:[ -90,   0, 180], txt:"BOTTOM" },
  ];

  for (const f of faces) {
    push();
      pitch(f.rot[0]); yaw(f.rot[1]); roll(f.rot[2]);
      moveRel(0, 0, -L + 0.2);
      drawTextRel(f.txt, 0, 0, 0, H);
    pop();
  }
}
