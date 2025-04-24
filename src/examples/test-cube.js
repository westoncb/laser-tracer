/* ================================================================
   PARAMETRIC  CAD-GRID  CUBE
   --------------------------------------------------------------- */

/* ---------------- configuration knobs ------------------------- */
const CFG = {
  halfExtent: 32, // cube half-size
  cellsMinor: 16, // # small cells per edge
  majorStep: 8, // every Nth grid line is “major”

  /* band (picture-frame) parameters */
  bandRowHeight: 8, // thickness of one band line  → sets size()
  bandRowCount: 8, // how many nested band rows per face

  /* colours */
  colourMinor: 0x4455,
  colourMajor: 0x507560,
  colourBand: 0x503035,
  colourEdge: 0x202020,
  colourLabel: 0xaaaa00,
};

/* ----------------------------------------------------------------
   ENTRY POINT – called once per animation frame
-----------------------------------------------------------------*/
function program(timeMs) {
  const t = timeMs * 0.001;

  residue(0.4);
  spacing(0.2);
  fuzz(0);

  push();
  yaw(t * 15);
  pitch(Math.sin(t * 0.3) * 20);

  const L = CFG.halfExtent;
  drawCube(L);
  labelFaces(L);
  pop();
}

/* ----------------------------------------------------------------
   drawCube – grid, bands, and accent edges (all relative)
-----------------------------------------------------------------*/
function drawCube(L) {
  /* ----------- helpers ---------------------------------------- */

  /* A. regular grid (minor + major) ----------------------------- */
  const cell = (2 * L) / CFG.cellsMinor;
  const majorRows = new Set();
  for (let i = 0; i <= CFG.cellsMinor; i += CFG.majorStep) majorRows.add(i);

  const drawGrid = () => {
    for (let i = 0; i <= CFG.cellsMinor; i++) {
      const x = -L + i * cell;
      const isMajor = majorRows.has(i);

      setLineStyle(isMajor ? "major" : "minor");

      /* vertical */
      push();
      moveRel(x, -L, 0);
      traceRel(0, 2 * L, 0);
      pop();

      /* horizontal */
      push();
      moveRel(-L, x, 0);
      traceRel(2 * L, 0, 0);
      pop();
    }
  };

  /* B. picture-frame bands ------------------------------------- */
  const drawBands = () => {
    size(CFG.bandRowHeight);
    const h = CFG.bandRowHeight / 20;
    const n = CFG.bandRowCount;

    setLineStyle("band"); // sets size(h) + colour

    for (let j = 0; j < n; j++) {
      const o = j * h; // inward offset
      const len = 2 * L - 2 * o; // shrinking edge length

      /* vertical left / right */
      push();
      moveRel(-L + o, -L + o, 0);
      traceRel(0, len, 0);
      pop();
      push();
      moveRel(L - o, -L + o, 0);
      traceRel(0, len, 0);
      pop();

      /* horizontal top / bottom */
      push();
      moveRel(-L + o, -L + o, 0);
      traceRel(len, 0, 0);
      pop();
      push();
      moveRel(-L + o, L - o, 0);
      traceRel(len, 0, 0);
      pop();
    }
  };

  /* C. accent edges -------------------------------------------- */
  const drawEdges = () => {
    setLineStyle("edge");
    const c = [-L, L];

    const edge = (p, q) => {
      push();
      moveRel(...p);
      traceRel(q[0] - p[0], q[1] - p[1], q[2] - p[2]);
      pop();
    };

    for (const y of c) for (const z of c) edge([-L, y, z], [L, y, z]); // X
    for (const x of c) for (const z of c) edge([x, -L, z], [x, L, z]); // Y
    for (const x of c) for (const y of c) edge([x, y, -L], [x, y, L]); // Z
  };

  /* ----------- iterate over the six faces --------------------- */
  const faces = [
    [0, 0, 0], // front  (+Z)
    [0, 180, 0], // back   (–Z)
    [0, -90, 0], // left   (–X)
    [0, 90, 0], // right  (+X)
    [90, 0, 180], // top    (+Y)
    [-90, 0, 180], // bottom (–Y)
  ];

  for (const r of faces) {
    push();
    pitch(r[0]);
    yaw(r[1]);
    roll(r[2]);
    moveRel(0, 0, -L + 0.05); // inset so grid & bands don’t z-fight
    drawGrid();
    drawBands();
    pop();
  }

  /* world-space edge pass */
  // drawEdges();
}

/* ----------------------------------------------------------------
   setLineStyle – choose thickness & colour
-----------------------------------------------------------------*/
function setLineStyle(kind) {
  switch (kind) {
    case "minor":
      size(9);
      colorHex(CFG.colourMinor);
      break;
    case "major":
      size(10);
      colorHex(CFG.colourMajor);
      break;
    case "band":
      size(CFG.bandRowHeight);
      colorHex(CFG.colourBand);
      break;
    case "edge":
      size(20);
      colorHex(CFG.colourEdge);
      break;
  }
}

/* ----------------------------------------------------------------
   labelFaces
-----------------------------------------------------------------*/
function labelFaces(L) {
  size(10);
  spacing(0.15);
  fuzz(0);
  colorHex(CFG.colourLabel);

  const H = 5; // glyph height
  const faces = [
    { rot: [0, 0, 0], txt: "FRONT" }, // +Z
    { rot: [0, 180, 0], txt: "BACK" }, // –Z  (roll removed)
    { rot: [0, -90, 0], txt: "LEFT" }, // –X  (roll removed)
    { rot: [0, 90, 0], txt: "RIGHT" }, // +X  (roll removed)
    { rot: [90, 0, 180], txt: "TOP" }, // +Y  (unchanged)
    { rot: [-90, 0, 180], txt: "BOTTOM" }, // –Y  (unchanged)
  ];

  for (const f of faces) {
    push();
    pitch(f.rot[0]);
    yaw(f.rot[1]);
    roll(f.rot[2]);
    moveRel(0, 0, -L + 0.2);
    drawTextRel(f.txt, 0, 0, 0, H);
    pop();
  }
}
