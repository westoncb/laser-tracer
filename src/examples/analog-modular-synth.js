// Vector Synthesizer Demo - A Classic Analog Modular Synth Visualization
// Glowing waveforms, animated controls, and interactive signal path tracing

// Persistent state variables
let frameCount = 0;
let lastRenderTime = 0;
let activeOscillator = 0;
let patchConnections = [];
let knobValues = [];
let waveformPhase = 0;
let envelopeStage = 0;
let activeModule = "oscillator";

// Synthesizer color palette
const SYNTH_COLORS = {
  PANEL: { r: 0.0, g: 0.1, b: 0.15 }, // Dark blue-gray panel
  MODULE: { r: 0.05, g: 0.15, b: 0.2 }, // Module background
  KNOB: { r: 0.8, g: 0.8, b: 0.9 }, // Silver knobs
  JACK: { r: 0.7, g: 0.7, b: 0.8 }, // Silver jacks
  LABEL: { r: 0, g: 0.8, b: 0.3 }, // Green labels
  ACTIVE: { r: 0.9, g: 0.2, b: 0.1 }, // Red for active controls
  SINE: { r: 1, g: 0.8, b: 0.2 }, // Yellow for sine waves
  SQUARE: { r: 0.2, g: 1, b: 0.3 }, // Green for square waves
  SAW: { r: 1, g: 0.3, b: 0.2 }, // Red for saw waves
  TRIANGLE: { r: 0.2, g: 0.8, b: 1 }, // Cyan for triangle waves
  PATCH: { r: 1, g: 0.8, b: 0.1 }, // Yellow patch cables
  ENVELOPE: { r: 1, g: 0.5, b: 1 }, // Purple envelope
  FILTER: { r: 0.3, g: 1, b: 0.7 }, // Green-cyan filter
};

// Initialize synth state
function initializeSynth() {
  // Create knob values
  for (let i = 0; i < 20; i++) {
    knobValues.push(Math.random());
  }

  // Create some default patch connections
  patchConnections = [
    {
      from: { module: "oscillator", jack: 0 },
      to: { module: "filter", jack: 0 },
    },
    {
      from: { module: "envelope", jack: 0 },
      to: { module: "amplifier", jack: 1 },
    },
    {
      from: { module: "filter", jack: 1 },
      to: { module: "amplifier", jack: 0 },
    },
    { from: { module: "lfo", jack: 0 }, to: { module: "filter", jack: 2 } },
  ];
}

// Draw a module panel
function drawModule(pen, x, y, width, height, title, color) {
  pen.push();

  // Module panel
  pen.colorRGB(color.r, color.g, color.b);
  pen.dotSize(3).traceGap(0.15).fuzz(2, 0.05).residue(0.6);

  // Panel outline
  const panelPoints = [
    { x: x, y: y, z: 0 },
    { x: x + width, y: y, z: 0 },
    { x: x + width, y: y + height, z: 0 },
    { x: x, y: y + height, z: 0 },
  ];

  pen.polyline(panelPoints, true);

  // Panel screws
  const screwRadius = 0.5;
  const screwPositions = [
    { x: x + 2, y: y + 2, z: 0 },
    { x: x + width - 2, y: y + 2, z: 0 },
    { x: x + width - 2, y: y + height - 2, z: 0 },
    { x: x + 2, y: y + height - 2, z: 0 },
  ];

  pen.colorRGB(SYNTH_COLORS.KNOB.r, SYNTH_COLORS.KNOB.g, SYNTH_COLORS.KNOB.b);

  for (const pos of screwPositions) {
    const screwPoints = [];

    // Draw a circle for the screw
    for (let i = 0; i <= 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      screwPoints.push({
        x: pos.x + Math.cos(angle) * screwRadius,
        y: pos.y + Math.sin(angle) * screwRadius,
        z: 0,
      });
    }

    pen.polyline(screwPoints, true);

    // Draw screw slot
    pen.polyline(
      [
        { x: pos.x - 0.3, y: pos.y, z: 0 },
        { x: pos.x + 0.3, y: pos.y, z: 0 },
      ],
      false,
    );
  }

  // Module title
  pen.colorRGB(
    SYNTH_COLORS.LABEL.r,
    SYNTH_COLORS.LABEL.g,
    SYNTH_COLORS.LABEL.b,
  );
  draw.text(title, { x: x + width / 2, y: y + 3, z: 0 }, 1.5);

  pen.pop();
}

// Draw a control knob
function drawKnob(pen, x, y, label, value, isActive) {
  pen.push();

  const knobRadius = 2;

  // Knob base
  pen.colorRGB(SYNTH_COLORS.KNOB.r, SYNTH_COLORS.KNOB.g, SYNTH_COLORS.KNOB.b);
  if (isActive) {
    pen.colorRGB(
      SYNTH_COLORS.ACTIVE.r,
      SYNTH_COLORS.ACTIVE.g,
      SYNTH_COLORS.ACTIVE.b,
    );
  }

  pen.dotSize(2.5).fuzz(2, 0.04).residue(0.7);

  const knobPoints = [];

  // Draw knob circle
  for (let i = 0; i <= 16; i++) {
    const angle = (i / 16) * Math.PI * 2;
    knobPoints.push({
      x: x + Math.cos(angle) * knobRadius,
      y: y + Math.sin(angle) * knobRadius,
      z: 0,
    });
  }

  pen.polyline(knobPoints, true);

  // Draw knob pointer
  const pointerAngle = value * Math.PI * 1.5 - Math.PI * 0.75;
  pen.polyline(
    [
      { x: x, y: y, z: 0 },
      {
        x: x + Math.cos(pointerAngle) * knobRadius * 0.8,
        y: y + Math.sin(pointerAngle) * knobRadius * 0.8,
        z: 0,
      },
    ],
    false,
  );

  // Knob label
  pen.colorRGB(
    SYNTH_COLORS.LABEL.r,
    SYNTH_COLORS.LABEL.g,
    SYNTH_COLORS.LABEL.b,
  );
  draw.text(label, { x: x, y: y + knobRadius + 1.5, z: 0 }, 0.9);

  // Draw value arc
  pen.colorRGB(0.3, 0.8, 1);
  pen.dotSize(1.5).fuzz(1, 0.03);

  const arcPoints = [];
  const startAngle = -Math.PI * 0.75;
  const endAngle = startAngle + value * Math.PI * 1.5;

  for (let angle = startAngle; angle <= endAngle; angle += 0.2) {
    arcPoints.push({
      x: x + Math.cos(angle) * (knobRadius + 0.5),
      y: y + Math.sin(angle) * (knobRadius + 0.5),
      z: 0,
    });
  }

  if (arcPoints.length > 1) {
    pen.polyline(arcPoints, false);
  }

  pen.pop();
}

// Draw a patch jack
function drawJack(pen, x, y, label, isConnected, isActive) {
  pen.push();

  const jackRadius = 1;

  // Jack socket
  if (isActive) {
    pen.colorRGB(
      SYNTH_COLORS.ACTIVE.r,
      SYNTH_COLORS.ACTIVE.g,
      SYNTH_COLORS.ACTIVE.b,
    );
  } else if (isConnected) {
    pen.colorRGB(
      SYNTH_COLORS.PATCH.r,
      SYNTH_COLORS.PATCH.g,
      SYNTH_COLORS.PATCH.b,
    );
  } else {
    pen.colorRGB(SYNTH_COLORS.JACK.r, SYNTH_COLORS.JACK.g, SYNTH_COLORS.JACK.b);
  }

  pen.dotSize(3).fuzz(3, 0.05).residue(0.8);

  const jackPoints = [];

  // Draw jack circle
  for (let i = 0; i <= 12; i++) {
    const angle = (i / 12) * Math.PI * 2;
    jackPoints.push({
      x: x + Math.cos(angle) * jackRadius,
      y: y + Math.sin(angle) * jackRadius,
      z: 0,
    });
  }

  pen.polyline(jackPoints, true);

  // Draw center hole
  pen.colorRGB(0, 0, 0.1);
  pen.dotSize(2).fuzz(1, 0.02);

  const holePoints = [];

  for (let i = 0; i <= 8; i++) {
    const angle = (i / 8) * Math.PI * 2;
    holePoints.push({
      x: x + Math.cos(angle) * jackRadius * 0.4,
      y: y + Math.sin(angle) * jackRadius * 0.4,
      z: 0,
    });
  }

  pen.polyline(holePoints, true);

  // Jack label
  pen.colorRGB(
    SYNTH_COLORS.LABEL.r,
    SYNTH_COLORS.LABEL.g,
    SYNTH_COLORS.LABEL.b,
  );
  draw.text(label, { x: x, y: y + jackRadius + 1.2, z: 0 }, 0.8);

  pen.pop();
}

// Draw a patch cable connection
function drawPatchCable(pen, from, to, pulsePhase) {
  pen.push();

  // Cable properties
  const cableColor = SYNTH_COLORS.PATCH;
  const pulseSpeed = 3;
  const pulseSpacing = 0.5;

  // Base cable color
  pen.colorRGB(cableColor.r, cableColor.g, cableColor.b);
  pen.dotSize(2.5).traceGap(0.1).fuzz(2, 0.05).residue(0.7);

  // Calculate control points for a nice curve
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  // Middle control point offset
  const midX = (from.x + to.x) / 2;
  const midY = (from.y + to.y) / 2;

  // Add some vertical height to the cable curve
  const controlHeight = distance * 0.3;

  // Generate cable points along a quadratic curve
  const cablePoints = [];
  const numPoints = Math.max(20, Math.floor(distance * 2));

  for (let i = 0; i <= numPoints; i++) {
    const t = i / numPoints;

    // Quadratic bezier curve
    const x =
      (1 - t) * (1 - t) * from.x + 2 * (1 - t) * t * midX + t * t * to.x;
    const y =
      (1 - t) * (1 - t) * from.y +
      2 * (1 - t) * t * (midY - controlHeight) +
      t * t * to.y;

    cablePoints.push({ x: x, y: y, z: 0 });
  }

  // Draw the base cable
  pen.polyline(cablePoints, false);

  // Draw signal pulse traveling along the cable
  const pulseOffset = (pulsePhase * pulseSpeed) % 1;
  let pulsePosition = pulseOffset;

  pen.colorRGB(1, 1, 1);
  pen.dotSize(3.5).fuzz(4, 0.1);

  while (pulsePosition < 1) {
    // Find the point along the cable
    const idx = Math.floor(pulsePosition * numPoints);
    if (idx < cablePoints.length) {
      pen.moveTo(cablePoints[idx].x, cablePoints[idx].y, 0);
      pen.dot();
    }

    pulsePosition += pulseSpacing;
  }

  pen.pop();
}

// Draw oscillator module
function drawOscillator(pen, x, y, isActive) {
  const width = 30;
  const height = 35;

  // Draw the module panel
  drawModule(
    pen,
    x,
    y,
    width,
    height,
    "OSCILLATOR",
    isActive ? SYNTH_COLORS.ACTIVE : SYNTH_COLORS.MODULE,
  );

  // Draw waveform selector switch
  pen.push();

  pen.colorRGB(
    SYNTH_COLORS.LABEL.r,
    SYNTH_COLORS.LABEL.g,
    SYNTH_COLORS.LABEL.b,
  );
  draw.text("WAVEFORM", { x: x + width / 2, y: y + 6, z: 0 }, 1);

  // Draw waveform options
  const waveforms = ["SINE", "SQUARE", "SAW", "TRIANGLE"];
  const waveColors = [
    SYNTH_COLORS.SINE,
    SYNTH_COLORS.SQUARE,
    SYNTH_COLORS.SAW,
    SYNTH_COLORS.TRIANGLE,
  ];

  for (let i = 0; i < waveforms.length; i++) {
    const isSelected = i === activeOscillator;
    const waveX = x + 7 + (i * (width - 14)) / (waveforms.length - 1);
    const waveY = y + 9;

    // Selection indicator
    if (isSelected) {
      pen.colorRGB(waveColors[i].r, waveColors[i].g, waveColors[i].b);
      pen.dotSize(3).fuzz(3, 0.1).residue(0.9);

      pen.polyline(
        [
          { x: waveX - 3, y: waveY - 1, z: 0 },
          { x: waveX + 3, y: waveY - 1, z: 0 },
          { x: waveX + 3, y: waveY + 1, z: 0 },
          { x: waveX - 3, y: waveY + 1, z: 0 },
          { x: waveX - 3, y: waveY - 1, z: 0 },
        ],
        true,
      );
    }

    // Waveform label
    pen.colorRGB(waveColors[i].r, waveColors[i].g, waveColors[i].b);
    draw.text(waveforms[i], { x: waveX, y: waveY, z: 0 }, 0.8);
  }

  // Draw knobs
  drawKnob(pen, x + width / 4, y + 15, "FREQ", knobValues[0], isActive);
  drawKnob(pen, x + (width * 3) / 4, y + 15, "FINE", knobValues[1], isActive);
  drawKnob(pen, x + width / 4, y + 23, "PW", knobValues[2], isActive);
  drawKnob(pen, x + (width * 3) / 4, y + 23, "SYNC", knobValues[3], isActive);

  // Draw output jacks
  drawJack(pen, x + width / 3, y + 30, "OUT", true, isActive);
  drawJack(pen, x + (width * 2) / 3, y + 30, "SUB", false, isActive);

  pen.pop();

  // Draw active waveform
  drawWaveform(
    pen,
    x + width / 2,
    y + height + 3,
    width - 4,
    6,
    activeOscillator,
    waveformPhase,
  );
}

// Draw filter module
function drawFilter(pen, x, y, isActive) {
  const width = 30;
  const height = 35;

  // Draw the module panel
  drawModule(
    pen,
    x,
    y,
    width,
    height,
    "FILTER",
    isActive ? SYNTH_COLORS.ACTIVE : SYNTH_COLORS.MODULE,
  );

  // Draw filter type switch
  pen.push();

  pen.colorRGB(
    SYNTH_COLORS.LABEL.r,
    SYNTH_COLORS.LABEL.g,
    SYNTH_COLORS.LABEL.b,
  );
  draw.text("FILTER TYPE", { x: x + width / 2, y: y + 6, z: 0 }, 1);

  // Draw filter options
  const filterTypes = ["LP", "BP", "HP"];
  const filterSelected = 0; // Low-pass selected

  for (let i = 0; i < filterTypes.length; i++) {
    const isSelected = i === filterSelected;
    const filterX = x + 10 + (i * (width - 20)) / (filterTypes.length - 1);
    const filterY = y + 9;

    // Selection indicator
    if (isSelected) {
      pen.colorRGB(
        SYNTH_COLORS.FILTER.r,
        SYNTH_COLORS.FILTER.g,
        SYNTH_COLORS.FILTER.b,
      );
      pen.dotSize(3).fuzz(3, 0.1).residue(0.9);

      pen.polyline(
        [
          { x: filterX - 2.5, y: filterY - 1, z: 0 },
          { x: filterX + 2.5, y: filterY - 1, z: 0 },
          { x: filterX + 2.5, y: filterY + 1, z: 0 },
          { x: filterX - 2.5, y: filterY + 1, z: 0 },
          { x: filterX - 2.5, y: filterY - 1, z: 0 },
        ],
        true,
      );
    }

    // Filter type label
    pen.colorRGB(
      SYNTH_COLORS.FILTER.r,
      SYNTH_COLORS.FILTER.g,
      SYNTH_COLORS.FILTER.b,
    );
    draw.text(filterTypes[i], { x: filterX, y: filterY, z: 0 }, 0.8);
  }

  // Draw knobs
  drawKnob(pen, x + width / 4, y + 15, "CUTOFF", knobValues[4], isActive);
  drawKnob(pen, x + (width * 3) / 4, y + 15, "RES", knobValues[5], isActive);
  drawKnob(pen, x + width / 4, y + 23, "ENV AMT", knobValues[6], isActive);
  drawKnob(
    pen,
    x + (width * 3) / 4,
    y + 23,
    "KEY TRK",
    knobValues[7],
    isActive,
  );

  // Draw jacks
  drawJack(pen, x + width / 4, y + 30, "IN", true, isActive);
  drawJack(pen, x + width / 2, y + 30, "OUT", true, isActive);
  drawJack(pen, x + (width * 3) / 4, y + 30, "MOD", true, isActive);

  pen.pop();

  // Draw filter response curve
  drawFilterCurve(
    pen,
    x + width / 2,
    y + height + 3,
    width - 4,
    6,
    knobValues[4],
    knobValues[5],
  );
}

// Draw envelope module
function drawEnvelope(pen, x, y, isActive) {
  const width = 30;
  const height = 35;

  // Draw the module panel
  drawModule(
    pen,
    x,
    y,
    width,
    height,
    "ENVELOPE",
    isActive ? SYNTH_COLORS.ACTIVE : SYNTH_COLORS.MODULE,
  );

  // Draw knobs for ADSR
  drawKnob(pen, x + width / 4, y + 10, "ATTACK", knobValues[8], isActive);
  drawKnob(pen, x + (width * 3) / 4, y + 10, "DECAY", knobValues[9], isActive);
  drawKnob(pen, x + width / 4, y + 18, "SUSTAIN", knobValues[10], isActive);
  drawKnob(
    pen,
    x + (width * 3) / 4,
    y + 18,
    "RELEASE",
    knobValues[11],
    isActive,
  );

  // Draw output jacks
  drawJack(pen, x + width / 3, y + 30, "OUT", true, isActive);
  drawJack(pen, x + (width * 2) / 3, y + 30, "INV", false, isActive);

  pen.pop();

  // Draw envelope shape
  drawEnvelopeShape(
    pen,
    x + width / 2,
    y + height + 3,
    width - 4,
    6,
    knobValues[8],
    knobValues[9],
    knobValues[10],
    knobValues[11],
    envelopeStage,
  );
}

// Draw LFO module
function drawLFO(pen, x, y, isActive) {
  const width = 30;
  const height = 35;

  // Draw the module panel
  drawModule(
    pen,
    x,
    y,
    width,
    height,
    "LFO",
    isActive ? SYNTH_COLORS.ACTIVE : SYNTH_COLORS.MODULE,
  );

  // Draw waveform selector
  pen.push();

  pen.colorRGB(
    SYNTH_COLORS.LABEL.r,
    SYNTH_COLORS.LABEL.g,
    SYNTH_COLORS.LABEL.b,
  );
  draw.text("SHAPE", { x: x + width / 2, y: y + 6, z: 0 }, 1);

  // Draw LFO shapes
  const lfoShapes = ["SINE", "TRI", "SQR", "S/H"];
  const lfoSelected = 0; // Sine selected

  for (let i = 0; i < lfoShapes.length; i++) {
    const isSelected = i === lfoSelected;
    const shapeX = x + 7 + (i * (width - 14)) / (lfoShapes.length - 1);
    const shapeY = y + 9;

    // Selection indicator
    if (isSelected) {
      pen.colorRGB(
        SYNTH_COLORS.SINE.r,
        SYNTH_COLORS.SINE.g,
        SYNTH_COLORS.SINE.b,
      );
      pen.dotSize(3).fuzz(3, 0.1).residue(0.9);

      pen.polyline(
        [
          { x: shapeX - 2.5, y: shapeY - 1, z: 0 },
          { x: shapeX + 2.5, y: shapeY - 1, z: 0 },
          { x: shapeX + 2.5, y: shapeY + 1, z: 0 },
          { x: shapeX - 2.5, y: shapeY + 1, z: 0 },
          { x: shapeX - 2.5, y: shapeY - 1, z: 0 },
        ],
        true,
      );
    }

    // Shape label
    pen.colorRGB(SYNTH_COLORS.SINE.r, SYNTH_COLORS.SINE.g, SYNTH_COLORS.SINE.b);
    draw.text(lfoShapes[i], { x: shapeX, y: shapeY, z: 0 }, 0.8);
  }

  // Draw knobs
  drawKnob(pen, x + width / 4, y + 15, "RATE", knobValues[12], isActive);
  drawKnob(
    pen,
    x + (width * 3) / 4,
    y + 15,
    "AMOUNT",
    knobValues[13],
    isActive,
  );
  drawKnob(pen, x + width / 4, y + 23, "DELAY", knobValues[14], isActive);
  drawKnob(pen, x + (width * 3) / 4, y + 23, "PHASE", knobValues[15], isActive);

  // Draw jacks
  drawJack(pen, x + width / 3, y + 30, "OUT", true, isActive);
  drawJack(pen, x + (width * 2) / 3, y + 30, "SYNC", false, isActive);

  pen.pop();

  // Draw LFO waveform
  drawWaveform(
    pen,
    x + width / 2,
    y + height + 3,
    width - 4,
    6,
    0,
    waveformPhase * 0.2,
  );
}

// Draw amplifier/output module
function drawAmplifier(pen, x, y, isActive) {
  const width = 30;
  const height = 35;

  // Draw the module panel
  drawModule(
    pen,
    x,
    y,
    width,
    height,
    "AMPLIFIER",
    isActive ? SYNTH_COLORS.ACTIVE : SYNTH_COLORS.MODULE,
  );

  // Draw VU meter
  pen.push();

  pen.colorRGB(
    SYNTH_COLORS.LABEL.r,
    SYNTH_COLORS.LABEL.g,
    SYNTH_COLORS.LABEL.b,
  );
  draw.text("OUTPUT LEVEL", { x: x + width / 2, y: y + 6, z: 0 }, 1);

  // VU meter background
  pen.colorRGB(0.1, 0.1, 0.15);
  pen.dotSize(2).fuzz(1, 0.03).residue(0.5);

  pen.polyline(
    [
      { x: x + 5, y: y + 9, z: 0 },
      { x: x + width - 5, y: y + 9, z: 0 },
      { x: x + width - 5, y: y + 13, z: 0 },
      { x: x + 5, y: y + 13, z: 0 },
      { x: x + 5, y: y + 9, z: 0 },
    ],
    true,
  );

  // VU meter level
  const level = 0.2 + 0.6 * Math.abs(Math.sin(waveformPhase * 5));
  const meterWidth = (width - 10) * level;

  // Draw level with color gradient
  const segments = 10;
  for (let i = 0; i < segments; i++) {
    const t = i / segments;
    if (t > level) break;

    // Color from green to yellow to red
    let color;
    if (t < 0.6) {
      // Green to yellow
      const blend = t / 0.6;
      color = {
        r: blend * SYNTH_COLORS.SINE.r + (1 - blend) * SYNTH_COLORS.SQUARE.r,
        g: blend * SYNTH_COLORS.SINE.g + (1 - blend) * SYNTH_COLORS.SQUARE.g,
        b: blend * SYNTH_COLORS.SINE.b + (1 - blend) * SYNTH_COLORS.SQUARE.b,
      };
    } else {
      // Yellow to red
      const blend = (t - 0.6) / 0.4;
      color = {
        r: blend * SYNTH_COLORS.SAW.r + (1 - blend) * SYNTH_COLORS.SINE.r,
        g: blend * SYNTH_COLORS.SAW.g + (1 - blend) * SYNTH_COLORS.SINE.g,
        b: blend * SYNTH_COLORS.SAW.b + (1 - blend) * SYNTH_COLORS.SINE.b,
      };
    }

    pen.colorRGB(color.r, color.g, color.b);
    pen.dotSize(3).fuzz(2, 0.05);

    const segWidth = (width - 10) / segments;
    const segX = x + 5 + t * (width - 10);

    pen.polyline(
      [
        { x: segX, y: y + 9, z: 0 },
        { x: segX, y: y + 13, z: 0 },
      ],
      false,
    );
  }

  // Draw knobs
  drawKnob(pen, x + width / 4, y + 19, "LEVEL", knobValues[16], isActive);
  drawKnob(pen, x + (width * 3) / 4, y + 19, "PAN", knobValues[17], isActive);

  // Draw jacks
  drawJack(pen, x + width / 4, y + 27, "IN", true, isActive);
  drawJack(pen, x + width / 2, y + 27, "ENV", true, isActive);
  drawJack(pen, x + (width * 3) / 4, y + 27, "OUT", true, isActive);

  // Output connectors
  pen.colorRGB(SYNTH_COLORS.JACK.r, SYNTH_COLORS.JACK.g, SYNTH_COLORS.JACK.b);

  // Left output
  pen.polyline(
    [
      { x: x + width / 3, y: y + 32, z: 0 },
      { x: x + width / 3 + 3, y: y + 32, z: 0 },
      { x: x + width / 3 + 3, y: y + 33, z: 0 },
      { x: x + width / 3, y: y + 33, z: 0 },
      { x: x + width / 3, y: y + 32, z: 0 },
    ],
    true,
  );

  // Right output
  pen.polyline(
    [
      { x: x + (width * 2) / 3, y: y + 32, z: 0 },
      { x: x + (width * 2) / 3 + 3, y: y + 32, z: 0 },
      { x: x + (width * 2) / 3 + 3, y: y + 33, z: 0 },
      { x: x + (width * 2) / 3, y: y + 33, z: 0 },
      { x: x + (width * 2) / 3, y: y + 32, z: 0 },
    ],
    true,
  );

  pen.pop();
}

// Draw a waveform visualization
function drawWaveform(pen, x, y, width, height, waveType, phase) {
  pen.push();

  // Choose waveform color
  const waveColors = [
    SYNTH_COLORS.SINE,
    SYNTH_COLORS.SQUARE,
    SYNTH_COLORS.SAW,
    SYNTH_COLORS.TRIANGLE,
  ];
  const color = waveColors[waveType];

  pen.colorRGB(color.r, color.g, color.b);
  pen.dotSize(2).traceGap(0.08).fuzz(3, 0.04).residue(0.9);

  // Create waveform points
  const points = [];
  const segments = 40;

  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const xPos = x - width / 2 + t * width;
    let yPos;

    const angle = (t + phase) * Math.PI * 2;

    switch (waveType) {
      case 0: // Sine
        yPos = y + (Math.sin(angle) * height) / 2;
        break;
      case 1: // Square
        yPos = y + (Math.sin(angle) >= 0 ? height / 2 : -height / 2);
        break;
      case 2: // Saw
        yPos =
          y + height / 2 - ((angle % (Math.PI * 2)) / (Math.PI * 2)) * height;
        break;
      case 3: // Triangle
        const tri = Math.asin(Math.sin(angle)) / (Math.PI / 2);
        yPos = y + (tri * height) / 2;
        break;
    }

    points.push({ x: xPos, y: yPos, z: 0 });
  }

  pen.polyline(points, false);

  // Draw bounding box for oscilloscope
  pen.colorRGB(0.3, 0.3, 0.4);
  pen.dotSize(1.5).traceGap(0.15).fuzz(1, 0.02);

  pen.polyline(
    [
      { x: x - width / 2, y: y - height / 2, z: 0 },
      { x: x + width / 2, y: y - height / 2, z: 0 },
      { x: x + width / 2, y: y + height / 2, z: 0 },
      { x: x - width / 2, y: y + height / 2, z: 0 },
      { x: x - width / 2, y: y - height / 2, z: 0 },
    ],
    true,
  );

  pen.pop();
}

// Draw a filter response curve
function drawFilterCurve(pen, x, y, width, height, cutoff, resonance) {
  pen.push();

  pen.colorRGB(
    SYNTH_COLORS.FILTER.r,
    SYNTH_COLORS.FILTER.g,
    SYNTH_COLORS.FILTER.b,
  );
  pen.dotSize(2).traceGap(0.08).fuzz(2, 0.04).residue(0.8);

  // Create filter curve points
  const points = [];
  const segments = 40;

  // Convert 0-1 knob values to parameters
  const cutoffFreq = 0.1 + cutoff * 0.8; // Normalized cutoff freq
  const q = 0.1 + resonance * 10; // Resonance factor

  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const xPos = x - width / 2 + t * width;

    // Create filter response curve
    let response;

    if (t < cutoffFreq) {
      // Pass band
      response = 1.0;

      // Add resonance peak
      if (t > cutoffFreq * 0.8) {
        const resonanceFactor =
          1 - Math.pow((cutoffFreq - t) / (cutoffFreq * 0.2), 2);
        response += resonanceFactor * resonance * 0.5;
      }
    } else {
      // Stop band with slope
      const stopFactor = Math.pow(2, -((t - cutoffFreq) / 0.2) * 6);
      response = stopFactor;
    }

    // Limit response range
    response = Math.max(0, Math.min(response, 1.5));

    const yPos = y + height / 2 - (response * height) / 2;
    points.push({ x: xPos, y: yPos, z: 0 });
  }

  pen.polyline(points, false);

  // Draw bounding box for filter display
  pen.colorRGB(0.3, 0.3, 0.4);
  pen.dotSize(1.5).traceGap(0.15).fuzz(1, 0.02);

  pen.polyline(
    [
      { x: x - width / 2, y: y - height / 2, z: 0 },
      { x: x + width / 2, y: y - height / 2, z: 0 },
      { x: x + width / 2, y: y + height / 2, z: 0 },
      { x: x - width / 2, y: y + height / 2, z: 0 },
      { x: x - width / 2, y: y - height / 2, z: 0 },
    ],
    true,
  );

  pen.pop();
}

// Draw an envelope shape
function drawEnvelopeShape(
  pen,
  x,
  y,
  width,
  height,
  attack,
  decay,
  sustain,
  release,
  stage,
) {
  pen.push();

  pen.colorRGB(
    SYNTH_COLORS.ENVELOPE.r,
    SYNTH_COLORS.ENVELOPE.g,
    SYNTH_COLORS.ENVELOPE.b,
  );
  pen.dotSize(2).traceGap(0.08).fuzz(2, 0.04).residue(0.8);

  // Calculate envelope timing
  const attackTime = 0.05 + attack * 0.25; // 0.05-0.3 of the width
  const decayTime = 0.05 + decay * 0.25; // 0.05-0.3 of the width
  const sustainLevel = 0.1 + sustain * 0.7; // 0.1-0.8 of the height
  const releaseTime = 0.05 + release * 0.3; // 0.05-0.35 of the width

  // Sustain portion takes up the remaining space
  const sustainTime = 0.4 - (attackTime + decayTime) * 0.5;

  // Create envelope shape points
  const points = [];
  const segments = 40;

  // Highlight positions
  let highlightX = x - width / 2;
  let highlightY = y + height / 2;

  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const xPos = x - width / 2 + t * width;
    let yPos;

    if (t < attackTime) {
      // Attack phase - linear ramp up
      yPos = y + height / 2 - ((t / attackTime) * height) / 2;

      if (stage === 0) {
        // Highlight attack
        const progress = t / attackTime;
        if (progress <= stage) {
          highlightX = xPos;
          highlightY = yPos;
        }
      }
    } else if (t < attackTime + decayTime) {
      // Decay phase - curve down to sustain level
      const decayProgress = (t - attackTime) / decayTime;
      yPos =
        y +
        height / 2 -
        ((1 - decayProgress * (1 - sustainLevel)) * height) / 2;

      if (stage === 1) {
        // Highlight decay
        const progress = (t - attackTime) / decayTime;
        if (progress <= 1) {
          highlightX = xPos;
          highlightY = yPos;
        }
      }
    } else if (t < attackTime + decayTime + sustainTime) {
      // Sustain phase - flat
      yPos = y + height / 2 - (sustainLevel * height) / 2;

      if (stage === 2) {
        // Highlight sustain
        highlightX = xPos;
        highlightY = yPos;
      }
    } else {
      // Release phase - exponential decay to zero
      const releaseProgress =
        (t - (attackTime + decayTime + sustainTime)) / releaseTime;
      const releaseShape = Math.pow(1 - releaseProgress, 2);
      yPos = y + height / 2 - (sustainLevel * releaseShape * height) / 2;

      if (stage === 3) {
        // Highlight release
        const progress =
          (t - (attackTime + decayTime + sustainTime)) / releaseTime;
        if (progress <= 1) {
          highlightX = xPos;
          highlightY = yPos;
        }
      }
    }

    points.push({ x: xPos, y: yPos, z: 0 });
  }

  pen.polyline(points, false);

  // Draw stage highlight
  if (stage >= 0 && stage <= 3) {
    pen.colorRGB(1, 1, 0.5);
    pen.dotSize(3).fuzz(4, 0.1);

    pen.moveTo(highlightX, highlightY, 0);
    pen.dot();
  }

  // Draw bounding box for envelope display
  pen.colorRGB(0.3, 0.3, 0.4);
  pen.dotSize(1.5).traceGap(0.15).fuzz(1, 0.02);

  pen.polyline(
    [
      { x: x - width / 2, y: y - height / 2, z: 0 },
      { x: x + width / 2, y: y - height / 2, z: 0 },
      { x: x + width / 2, y: y + height / 2, z: 0 },
      { x: x - width / 2, y: y + height / 2, z: 0 },
      { x: x - width / 2, y: y - height / 2, z: 0 },
    ],
    true,
  );

  // Label the ADSR stages
  pen.colorRGB(
    SYNTH_COLORS.LABEL.r,
    SYNTH_COLORS.LABEL.g,
    SYNTH_COLORS.LABEL.b,
  );
  pen.dotSize(1.5).fuzz(1, 0.02);

  draw.text(
    "A",
    {
      x: x - width / 2 + (attackTime * width) / 2,
      y: y + height / 2 + 1,
      z: 0,
    },
    0.7,
  );
  draw.text(
    "D",
    {
      x: x - width / 2 + (attackTime + decayTime / 2) * width,
      y: y + height / 2 + 1,
      z: 0,
    },
    0.7,
  );
  draw.text(
    "S",
    {
      x: x - width / 2 + (attackTime + decayTime + sustainTime / 2) * width,
      y: y + height / 2 + 1,
      z: 0,
    },
    0.7,
  );
  draw.text(
    "R",
    {
      x:
        x -
        width / 2 +
        (attackTime + decayTime + sustainTime + releaseTime / 2) * width,
      y: y + height / 2 + 1,
      z: 0,
    },
    0.7,
  );

  pen.pop();
}

// Draw title header
function drawSynthTitle(pen, time) {
  pen.push();

  // Title text
  pen.colorRGB(0, 0.9, 0.5);
  pen.dotSize(5).fuzz(5, 0.1).residue(1.2).traceGap(0.5);

  // Make text pulse
  const pulse = 0.9 + Math.sin(time * 3) * 0.1;
  pen.colorRGB(0, 0.9 * pulse, 0.5 * pulse);

  draw.text("VECTOR SYNTHESIZER", { x: 0, y: 30, z: 10 }, 3);

  // Label system status
  pen.colorRGB(
    SYNTH_COLORS.LABEL.r,
    SYNTH_COLORS.LABEL.g,
    SYNTH_COLORS.LABEL.b,
  );
  pen.dotSize(2).fuzz(2, 0.05);

  // Clock speed
  const clockPulse = Math.sin(time * 10) > 0;
  pen.colorRGB(0, 0.7, clockPulse ? 0.9 : 0.3);
  draw.text(
    "CLOCK: " + (120 * (0.8 + knobValues[0] * 0.4)).toFixed(1) + " BPM",
    { x: -45, y: 25, z: 10 },
    1,
  );

  // Current patch
  pen.colorRGB(0, 0.8, 0.4);
  draw.text("PATCH: VECTOR PULSE 2.7", { x: 0, y: 25, z: 10 }, 1);

  // System status
  const recPulse = Math.sin(time * 2) > 0;
  pen.colorRGB(recPulse ? 0.9 : 0.3, 0, 0);
  draw.text("REC", { x: 45, y: 25, z: 10 }, 1);

  pen.pop();
}

// Main program function
function program(pen, draw, time) {
  // Initialize on first frame
  if (frameCount === 0) {
    setBGColor(0x000408); // Deep blue-black background
    initializeSynth();

    // Position camera for a nice view
    setCamera({ x: 0, y: 0, z: 100 }, { x: 0, y: 0, z: 0 });
  }

  // Update animation variables
  waveformPhase = time % 1;
  envelopeStage = Math.floor(time % 4);

  // Change oscillator type periodically
  if (frameCount % 240 === 0) {
    activeOscillator = (activeOscillator + 1) % 4;
  }

  // Change active module periodically
  if (frameCount % 180 === 0) {
    const modules = ["oscillator", "filter", "envelope", "lfo", "amplifier"];
    activeModule = modules[Math.floor(time) % modules.length];
  }

  // Animate some knob values
  knobValues[0] = 0.5 + Math.sin(time * 0.2) * 0.2; // Oscillator frequency
  knobValues[4] = 0.3 + Math.sin(time * 0.5) * 0.3; // Filter cutoff
  knobValues[12] = 0.4 + Math.sin(time * 0.3) * 0.3; // LFO rate

  // Draw synth modules
  drawSynthTitle(pen, time);

  // Draw modules in a rack layout
  const moduleWidth = 30;
  const moduleHeight = 35;
  const spacing = 10;

  drawOscillator(
    pen,
    -moduleWidth * 2 - spacing * 1.5,
    -10,
    activeModule === "oscillator",
  );
  drawFilter(
    pen,
    -moduleWidth / 2 - spacing / 2,
    -10,
    activeModule === "filter",
  );
  drawEnvelope(
    pen,
    moduleWidth / 2 + spacing / 2,
    -10,
    activeModule === "envelope",
  );
  drawLFO(
    pen,
    -moduleWidth * 1.5 - spacing,
    -moduleHeight - 15,
    activeModule === "lfo",
  );
  drawAmplifier(pen, 0, -moduleHeight - 15, activeModule === "amplifier");

  // Draw patch cables
  for (const connection of patchConnections) {
    // Find module positions
    let fromX, fromY, toX, toY;

    switch (connection.from.module) {
      case "oscillator":
        fromX =
          -moduleWidth * 2 -
          spacing * 1.5 +
          moduleWidth / 3 +
          (connection.from.jack * moduleWidth) / 3;
        fromY = -10 + 30;
        break;
      case "filter":
        fromX =
          -moduleWidth / 2 -
          spacing / 2 +
          moduleWidth / 4 +
          (connection.from.jack * moduleWidth) / 4;
        fromY = -10 + 30;
        break;
      case "envelope":
        fromX =
          moduleWidth / 2 +
          spacing / 2 +
          moduleWidth / 3 +
          (connection.from.jack * moduleWidth) / 3;
        fromY = -10 + 30;
        break;
      case "lfo":
        fromX =
          -moduleWidth * 1.5 -
          spacing +
          moduleWidth / 3 +
          (connection.from.jack * moduleWidth) / 3;
        fromY = -moduleHeight - 15 + 30;
        break;
      case "amplifier":
        fromX = 0 + moduleWidth / 4 + (connection.from.jack * moduleWidth) / 4;
        fromY = -moduleHeight - 15 + 27;
        break;
    }

    switch (connection.to.module) {
      case "oscillator":
        toX =
          -moduleWidth * 2 -
          spacing * 1.5 +
          moduleWidth / 3 +
          (connection.to.jack * moduleWidth) / 3;
        toY = -10 + 30;
        break;
      case "filter":
        toX =
          -moduleWidth / 2 -
          spacing / 2 +
          moduleWidth / 4 +
          (connection.to.jack * moduleWidth) / 4;
        toY = -10 + 30;
        break;
      case "envelope":
        toX =
          moduleWidth / 2 +
          spacing / 2 +
          moduleWidth / 3 +
          (connection.to.jack * moduleWidth) / 3;
        toY = -10 + 30;
        break;
      case "lfo":
        toX =
          -moduleWidth * 1.5 -
          spacing +
          moduleWidth / 3 +
          (connection.to.jack * moduleWidth) / 3;
        toY = -moduleHeight - 15 + 30;
        break;
      case "amplifier":
        toX = 0 + moduleWidth / 4 + (connection.to.jack * moduleWidth) / 4;
        toY = -moduleHeight - 15 + 27;
        break;
    }

    // Draw the cable
    drawPatchCable(
      pen,
      { x: fromX, y: fromY, z: 0 },
      { x: toX, y: toY, z: 0 },
      waveformPhase,
    );
  }

  // Draw key sequence
  drawKeyboard(pen, 0, -moduleHeight * 2 - 25, 100, 15);

  // Update frame counter
  frameCount++;
}

// Draw keyboard with animated key presses
function drawKeyboard(pen, x, y, width, height) {
  pen.push();

  const numWhiteKeys = 14;
  const whiteKeyWidth = width / numWhiteKeys;

  // Draw white keys
  pen.colorRGB(0.8, 0.8, 0.9);
  pen.dotSize(2).traceGap(0.1).fuzz(1, 0.03).residue(0.6);

  for (let i = 0; i < numWhiteKeys; i++) {
    const keyX = x - width / 2 + i * whiteKeyWidth;

    // Determine if key is pressed (animate a sequence)
    let keyPressed = false;

    // Create a simple arpeggio pattern
    const pattern = [0, 4, 7, 12, 7, 4];
    const step = Math.floor(waveformPhase * 8) % pattern.length;
    const activeNote = pattern[step];

    if (i % 7 === activeNote % 7) {
      keyPressed = true;
    }

    // Draw key with different brightness if pressed
    if (keyPressed) {
      pen.colorRGB(0.3, 0.9, 0.6);
      pen.dotSize(3).fuzz(3, 0.05).residue(1.0);
    } else {
      pen.colorRGB(0.8, 0.8, 0.9);
      pen.dotSize(2).fuzz(1, 0.03).residue(0.6);
    }

    pen.polyline(
      [
        { x: keyX, y: y, z: 0 },
        { x: keyX + whiteKeyWidth, y: y, z: 0 },
        { x: keyX + whiteKeyWidth, y: y + height, z: 0 },
        { x: keyX, y: y + height, z: 0 },
        { x: keyX, y: y, z: 0 },
      ],
      true,
    );

    // Add key number labels
    if (i % 7 === 0) {
      pen.colorRGB(0.3, 0.3, 0.4);
      draw.text(
        "C" + Math.floor(i / 7 + 3),
        { x: keyX + whiteKeyWidth / 2, y: y + height - 2, z: 0 },
        0.8,
      );
    }
  }

  // Draw black keys
  pen.colorRGB(0.2, 0.2, 0.25);
  pen.dotSize(2).traceGap(0.1).fuzz(1, 0.02).residue(0.5);

  for (let i = 0; i < numWhiteKeys; i++) {
    // Skip positions where there are no black keys
    if (i % 7 === 2 || i % 7 === 6) continue;

    const keyX = x - width / 2 + (i + 0.7) * whiteKeyWidth;
    const blackKeyWidth = whiteKeyWidth * 0.6;
    const blackKeyHeight = height * 0.6;

    // Determine if black key is pressed
    let keyPressed = false;

    // Create a simple arpeggio pattern for black keys
    const pattern = [1, 3, 6, 8, 10];
    const step = Math.floor(waveformPhase * 8 + 0.5) % pattern.length;
    const activeNote = pattern[step];

    // Check if this is the active black key
    if (
      (i % 7 === 0 && activeNote === 1) ||
      (i % 7 === 1 && activeNote === 3) ||
      (i % 7 === 3 && activeNote === 6) ||
      (i % 7 === 4 && activeNote === 8) ||
      (i % 7 === 5 && activeNote === 10)
    ) {
      keyPressed = true;
    }

    // Draw key with different brightness if pressed
    if (keyPressed) {
      pen.colorRGB(0.3, 0.9, 0.6);
      pen.dotSize(3).fuzz(3, 0.05).residue(1.0);
    } else {
      pen.colorRGB(0.2, 0.2, 0.25);
      pen.dotSize(2).fuzz(1, 0.02).residue(0.5);
    }

    pen.polyline(
      [
        { x: keyX, y: y, z: 0 },
        { x: keyX + blackKeyWidth, y: y, z: 0 },
        { x: keyX + blackKeyWidth, y: y + blackKeyHeight, z: 0 },
        { x: keyX, y: y + blackKeyHeight, z: 0 },
        { x: keyX, y: y, z: 0 },
      ],
      true,
    );
  }

  pen.pop();
}
