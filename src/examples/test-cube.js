/* ---------------- configuration knobs ------------------------- */
const CFG = {
  halfExtent: 32, // cube half-size
  cellsMinor: 16, // # small cells per edge
  majorStep: 8, // every Nth line is “major”

  /* band (picture-frame) parameters */
  bandRowHeight: 8, // -> dotSize()
  bandRowCount: 8,

  /* colours */
  colourMinor: 0x004455,
  colourMajor: 0x507560,
  colourBand: 0x503035,
  colourEdge: 0x202020,
  colourLabel: 0xaaaa00,
};

/* ----------------------------------------------------------------
   ENTRY POINT  –  called once per animation frame
-----------------------------------------------------------------*/
function program(pen, draw, t) {
  /* global brush defaults */
  pen
    .dotSize(10) // will be overridden by setLineStyle
    .traceGap(0.2)
    .residue(0.4)
    .fuzz(0);

  /* spin the entire cube */
  pen
    .push()
    .yaw(t * 15)
    .pitch(Math.sin(t * 0.3) * 20);

  const L = CFG.halfExtent;
  drawCube(pen, L);
  labelFaces(pen, L);

  pen.pop();
}

/* ----------------------------------------------------------------
   drawCube – grid, bands, and accent edges (all relative)
-----------------------------------------------------------------*/
function drawCube(pen, L) {
  /* ---------- helpers ----------------------------------------- */
  const cell = (2 * L) / CFG.cellsMinor;
  const majorRows = new Set();
  for (let i = 0; i <= CFG.cellsMinor; i += CFG.majorStep) majorRows.add(i);

  /* choose thickness & colour */
  const setLineStyle = (kind) => {
    switch (kind) {
      case "minor":
        pen.dotSize(10).colorHex(CFG.colourMinor);
        break;
      case "major":
        pen.dotSize(10).colorHex(CFG.colourMajor);
        break;
      case "band":
        pen.dotSize(CFG.bandRowHeight).colorHex(CFG.colourBand);
        break;
      case "edge":
        pen.dotSize(20).colorHex(CFG.colourEdge);
        break;
    }
  };

  /* A. regular grid (minor + major) ---------------------------- */
  const drawGrid = () => {
    for (let i = 0; i <= CFG.cellsMinor; i++) {
      const x = -L + i * cell;
      const isMajor = majorRows.has(i);

      setLineStyle(isMajor ? "major" : "minor");

      /* vertical */
      pen
        .push()
        .moveBy(x, -L, 0)
        .traceBy(0, 2 * L, 0)
        .pop();

      /* horizontal */
      pen
        .push()
        .moveBy(-L, x, 0)
        .traceBy(2 * L, 0, 0)
        .pop();
    }
  };

  /* B. picture-frame bands ------------------------------------- */
  const drawBands = () => {
    setLineStyle("band");

    const step = CFG.bandRowHeight / 20; // inward offset per row
    const n = CFG.bandRowCount;

    for (let j = 0; j < n; j++) {
      const o = j * step; // current inset
      const len = 2 * L - 2 * o; // shrinking edge length

      /* vertical left / right */
      pen
        .push()
        .moveBy(-L + o, -L + o, 0)
        .traceBy(0, len, 0)
        .pop();
      pen
        .push()
        .moveBy(L - o, -L + o, 0)
        .traceBy(0, len, 0)
        .pop();

      /* horizontal top / bottom */
      pen
        .push()
        .moveBy(-L + o, -L + o, 0)
        .traceBy(len, 0, 0)
        .pop();
      pen
        .push()
        .moveBy(-L + o, L - o, 0)
        .traceBy(len, 0, 0)
        .pop();
    }
  };

  /* ---------- iterate over the six faces ---------------------- */
  const faces = [
    [0, 0, 0], // front  (+Z)
    [0, 180, 0], // back   (–Z)
    [0, -90, 0], // left   (–X)
    [0, 90, 0], // right  (+X)
    [90, 0, 180], // top    (+Y)
    [-90, 0, 180], // bottom (–Y)
  ];

  for (const [p, y, r] of faces) {
    pen.push().pitch(p).yaw(y).roll(r).moveBy(0, 0, -L); // bring face toward camera

    drawGrid();
    drawBands();

    pen.pop();
  }
}

/* ----------------------------------------------------------------
   labelFaces
-----------------------------------------------------------------*/
function labelFaces(pen, L) {
  const H = 5; // glyph height
  pen.dotSize(10).traceGap(0.15).fuzz(0).colorHex(CFG.colourLabel);

  const faces = [
    { rot: [0, 0, 0], txt: "FRONT" }, // +Z
    { rot: [0, 180, 0], txt: "BACK" }, // –Z
    { rot: [0, -90, 0], txt: "LEFT" }, // –X
    { rot: [0, 90, 0], txt: "RIGHT" }, // +X
    { rot: [90, 0, 180], txt: "TOP" }, // +Y
    { rot: [-90, 0, 180], txt: "BOTTOM" }, // –Y
  ];

  for (const f of faces) {
    pen
      .push()
      .pitch(f.rot[0])
      .yaw(f.rot[1])
      .roll(f.rot[2])
      .moveBy(0, 0, -L + 0.2) // just in front of the face
      .text(f.txt, H) // pen.text uses current pos
      .pop();
  }
}
