/**
 * LASER-TRACER INITIALIZATION SEQUENCE
 *
 * A professional boot sequence that initializes the 3D environment,
 * runs system diagnostics, and materializes the calibration test cube
 * with progressive refinement and precision measurements.
 */

// ===== CONSTANTS =====
const CUBE_SIZE = 10; // Base cube size (half-width)
const PRECISION = 3; // Decimal precision for measurements
const GRID_DIVISIONS = 10; // Grid divisions per face
const BOOT_DURATION = 3; // Seconds for boot sequence
const CALIBRATION_CYCLES = 3; // Number of calibration cycles

// ===== STYLE PRESETS =====
const STYLES = {
  boot: {
    color: [0.0, 0.8, 1.0], // Cyan
    dotSize: 4,
    traceGap: 0.15,
    fuzz: 2,
    fuzzSize: 0.05,
    residue: 0.5,
  },
  primary: {
    color: [0.9, 0.9, 1.0], // Cool white
    dotSize: 2.3,
    traceGap: 0.18,
    fuzz: 3,
    fuzzSize: 0.08,
    residue: 1,
  },
  secondary: {
    color: [0.2, 0.8, 1.0], // Cyan blue
    dotSize: 2.5,
    traceGap: 0.15,
    fuzz: 1,
    fuzzSize: 0.04,
    residue: 0.6,
  },
  highlight: {
    color: [0.0, 1.0, 0.7], // Bright turquoise
    dotSize: 3.5,
    traceGap: 0.1,
    fuzz: 3,
    fuzzSize: 0.08,
    residue: 0.9,
  },
  measurement: {
    color: [1.0, 0.9, 0.2], // Pale yellow
    dotSize: 3,
    traceGap: 0.1,
    fuzz: 0,
    fuzzSize: 0,
    residue: 0.6,
  },
  grid: {
    color: [0.3, 0.6, 0.8], // Muted blue
    dotSize: 3,
    traceGap: 0.2,
    fuzz: 0,
    fuzzSize: 0,
    residue: 0.5,
  },
  projection: {
    color: [0.5, 0.5, 0.5], // Medium gray
    dotSize: 1.5,
    traceGap: 0.2,
    fuzz: 0,
    fuzzSize: 0,
    residue: 0.4,
  },
  reference: {
    color: [1.0, 0.4, 0.0], // Orange
    dotSize: 4.0,
    traceGap: 0.1,
    fuzz: 4,
    fuzzSize: 0.1,
    residue: 0.8,
  },
  axis: {
    x: [1.0, 0.3, 0.3], // Red
    y: [0.3, 1.0, 0.3], // Green
    z: [0.3, 0.3, 1.0], // Blue
    dotSize: 3,
    traceGap: 0.15,
    fuzz: 1,
    fuzzSize: 0.05,
    residue: 0.6,
  },
  scan: {
    color: [0.0, 1.0, 0.7], // Scanner green
    dotSize: 3.0,
    traceGap: 0.1,
    fuzz: 4,
    fuzzSize: 0.2,
    residue: 0.3,
  },
};

// Apply a style preset to the pen
function applyStyle(pen, style) {
  return pen
    .colorRGB(...style.color)
    .dotSize(style.dotSize)
    .traceGap(style.traceGap)
    .fuzz(style.fuzz, style.fuzzSize)
    .residue(style.residue);
}

// ===== HELPER FUNCTIONS =====

// Create random points for boot sequence particles
function randomPoints(count, maxDist) {
  const points = [];
  for (let i = 0; i < count; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.random() * Math.PI;
    const r = Math.random() * maxDist;

    points.push({
      x: r * Math.sin(phi) * Math.cos(theta),
      y: r * Math.sin(phi) * Math.sin(theta),
      z: r * Math.cos(phi),
    });
  }
  return points;
}

// Generate boot text lines
function bootTextLines() {
  return [
    "INITIALIZING LASER-TRACER SYSTEM v2.0",
    "PARTICLE RENDERER: ONLINE",
    "VECTOR DISPLAY: CALIBRATING",
    "LOADING COORDINATE SYSTEM",
    "QUANTUM POSITIONING ACTIVE",
    "VERIFYING SPATIAL INTEGRITY",
    "CHECKING VISUALIZATION PARAMETERS",
    "RENDERING ENGINE: READY",
    "INITIALIZING CALIBRATION ROUTINE",
  ];
}

// Create the main cube structure
function createCubeEdges(size, detail = 1.0) {
  // Scale the size by detail factor
  const s = size * detail;

  return [
    // Bottom face
    [
      { x: -s, y: -s, z: -s },
      { x: s, y: -s, z: -s },
      { x: s, y: s, z: -s },
      { x: -s, y: s, z: -s },
      { x: -s, y: -s, z: -s },
    ],
    // Top face
    [
      { x: -s, y: -s, z: s },
      { x: s, y: -s, z: s },
      { x: s, y: s, z: s },
      { x: -s, y: s, z: s },
      { x: -s, y: -s, z: s },
    ],
    // Connecting edges
    [
      { x: -s, y: -s, z: -s },
      { x: -s, y: -s, z: s },
    ],
    [
      { x: s, y: -s, z: -s },
      { x: s, y: -s, z: s },
    ],
    [
      { x: s, y: s, z: -s },
      { x: s, y: s, z: s },
    ],
    [
      { x: -s, y: s, z: -s },
      { x: -s, y: s, z: s },
    ],
  ];
}

// Create a scanning plane that moves through the cube
function createScanPlane(normal, position, size) {
  const corners = [];
  const s = size * 1.2; // Slightly larger than the cube

  if (normal === "x") {
    corners.push(
      { x: position, y: -s, z: -s },
      { x: position, y: s, z: -s },
      { x: position, y: s, z: s },
      { x: position, y: -s, z: s },
      { x: position, y: -s, z: -s },
    );
  } else if (normal === "y") {
    corners.push(
      { x: -s, y: position, z: -s },
      { x: s, y: position, z: -s },
      { x: s, y: position, z: s },
      { x: -s, y: position, z: s },
      { x: -s, y: position, z: -s },
    );
  } else {
    // z
    corners.push(
      { x: -s, y: -s, z: position },
      { x: s, y: -s, z: position },
      { x: s, y: s, z: position },
      { x: -s, y: s, z: position },
      { x: -s, y: -s, z: position },
    );
  }

  return corners;
}

// Create grid lines for a face
function createGridLines(size, divisions, normal, detail = 1.0) {
  const lines = [];
  // Scale the size by detail factor
  const s = size * detail;
  const step = (2 * s) / divisions;

  // Determine which axes to use based on normal direction
  let axis1, axis2;
  if (normal === "x") {
    axis1 = "y";
    axis2 = "z";
  } else if (normal === "y") {
    axis1 = "x";
    axis2 = "z";
  } else {
    axis1 = "x";
    axis2 = "y";
  }

  // Create grid lines along axis1
  for (let i = 0; i <= divisions; i++) {
    const pos = -s + i * step;
    const point1 = { x: 0, y: 0, z: 0 };
    const point2 = { x: 0, y: 0, z: 0 };

    point1[normal] = s;
    point2[normal] = s;

    point1[axis1] = pos;
    point2[axis1] = pos;

    point1[axis2] = -s;
    point2[axis2] = s;

    lines.push([point1, point2]);
  }

  // Create grid lines along axis2
  for (let i = 0; i <= divisions; i++) {
    const pos = -s + i * step;
    const point1 = { x: 0, y: 0, z: 0 };
    const point2 = { x: 0, y: 0, z: 0 };

    point1[normal] = s;
    point2[normal] = s;

    point1[axis1] = -s;
    point2[axis1] = s;

    point1[axis2] = pos;
    point2[axis2] = pos;

    lines.push([point1, point2]);
  }

  return lines;
}

// Create coordinate axes with customizable length
function createCoordinateAxes(length) {
  return {
    x: [
      { x: 0, y: 0, z: 0 },
      { x: length, y: 0, z: 0 },
    ],
    y: [
      { x: 0, y: 0, z: 0 },
      { x: 0, y: length, z: 0 },
    ],
    z: [
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 0, z: length },
    ],
  };
}

// Create reference points at corners and key positions
function createReferencePoints(size, detail = 1.0) {
  // Scale the size by detail factor
  const s = size * detail;

  // Corner vertices
  const corners = [
    { x: -s, y: -s, z: -s },
    { x: s, y: -s, z: -s },
    { x: s, y: s, z: -s },
    { x: -s, y: s, z: -s },
    { x: -s, y: -s, z: s },
    { x: s, y: -s, z: s },
    { x: s, y: s, z: s },
    { x: -s, y: s, z: s },
  ];

  // Face centers
  const faceCenters = [
    { x: 0, y: 0, z: -s }, // Front
    { x: 0, y: 0, z: s }, // Back
    { x: -s, y: 0, z: 0 }, // Left
    { x: s, y: 0, z: 0 }, // Right
    { x: 0, y: -s, z: 0 }, // Bottom
    { x: 0, y: s, z: 0 }, // Top
  ];

  return { corners, faceCenters };
}

// Create measurement dimensions
function createDimension(start, end, offset, value) {
  const startOffset = {
    x: start.x + offset.x,
    y: start.y + offset.y,
    z: start.z + offset.z,
  };

  const endOffset = {
    x: end.x + offset.x,
    y: end.y + offset.y,
    z: end.z + offset.z,
  };

  return {
    line: [startOffset, endOffset],
    labelPos: {
      x: (startOffset.x + endOffset.x) / 2,
      y: (startOffset.y + endOffset.y) / 2 - 1,
      z: (startOffset.z + endOffset.z) / 2,
    },
    value: value.toFixed(PRECISION),
  };
}

// ===== DRAWING FUNCTIONS =====

// Draw boot sequence particles
function drawBootParticles(pen, time, maxTime) {
  const progress = Math.min(time / maxTime, 1);
  const particleCount = Math.floor(progress * 100);

  pen.push();
  applyStyle(pen, STYLES.boot);
  pen.fuzz(3, 1).dotSize(6);

  const points = randomPoints(particleCount, 40);
  for (const pt of points) {
    pen.moveTo(pt.x, pt.y, pt.z).dot();
  }

  pen.pop();
}

// Draw boot sequence text
function drawBootText(pen, time, maxTime) {
  const lines = bootTextLines();
  const linesPerScreen = 5;
  const lineHeight = 3;
  const startY = 10;

  pen.push();
  applyStyle(pen, STYLES.boot);

  const progress = Math.min(time / maxTime, 1);
  const lineCount = Math.floor(progress * lines.length);

  // Calculate which lines should be visible based on scroll position
  const scrollOffset = Math.max(0, lineCount - linesPerScreen);

  for (let i = scrollOffset; i < lineCount; i++) {
    if (i < lines.length) {
      const y = startY - (i - scrollOffset) * lineHeight;
      pen.moveTo(-30, y, 0).text(lines[i], 1.5);

      // Add a "COMPLETE" indicator for finished items
      if (i < lineCount - 1) {
        pen.colorRGB(0, 1, 0.5).moveTo(25, y, 0).text("[OK]", 1.5);
      } else {
        const blinkPhase = (time * 4) % 1 > 0.5;
        if (blinkPhase) {
          pen.colorRGB(1, 0.7, 0).moveTo(25, y, 0).text("[...]", 1.5);
        }
      }
    }
  }

  pen.pop();
}

// Draw coordinate system initialization
function drawCoordinateInit(pen, time, maxTime) {
  const progress = Math.min(time / maxTime, 1);
  if (progress < 0.3) return; // Start after some boot text appears

  pen.push();

  // Draw expanding axes
  const axisLength = 25 * Math.min((progress - 0.3) / 0.4, 1);
  const axes = createCoordinateAxes(axisLength);

  // X-axis (red)
  pen
    .colorRGB(...STYLES.axis.x)
    .dotSize(STYLES.axis.dotSize)
    .traceGap(STYLES.axis.traceGap)
    .fuzz(STYLES.axis.fuzz, STYLES.axis.fuzzSize)
    .residue(STYLES.axis.residue);

  pen.polyline(axes.x, false);

  // Y-axis (green)
  pen
    .colorRGB(...STYLES.axis.y)
    .dotSize(STYLES.axis.dotSize)
    .traceGap(STYLES.axis.traceGap)
    .fuzz(STYLES.axis.fuzz, STYLES.axis.fuzzSize)
    .residue(STYLES.axis.residue);

  pen.polyline(axes.y, false);

  // Z-axis (blue)
  pen
    .colorRGB(...STYLES.axis.z)
    .dotSize(STYLES.axis.dotSize)
    .traceGap(STYLES.axis.traceGap)
    .fuzz(STYLES.axis.fuzz, STYLES.axis.fuzzSize)
    .residue(STYLES.axis.residue);

  pen.polyline(axes.z, false);

  // Add axis labels if axes are almost fully extended
  if (progress > 0.6) {
    const labelFade = Math.min((progress - 0.6) / 0.2, 1);
    const labelOffset = 1;

    pen
      .push()
      .colorRGB(...STYLES.axis.x)
      .dotSize(STYLES.axis.dotSize * labelFade)
      .moveTo(axisLength + labelOffset, 0, 0)
      .text("X", 1.5 * labelFade);

    pen
      .colorRGB(...STYLES.axis.y)
      .dotSize(STYLES.axis.dotSize * labelFade)
      .moveTo(0, axisLength + labelOffset, 0)
      .text("Y", 1.5 * labelFade);

    pen
      .colorRGB(...STYLES.axis.z)
      .dotSize(STYLES.axis.dotSize * labelFade)
      .moveTo(0, 0, axisLength + labelOffset)
      .text("Z", 1.5 * labelFade);

    pen.pop();
  }

  // Draw origin marker if axes are mostly extended
  if (progress > 0.5) {
    const originFade = Math.min((progress - 0.5) / 0.3, 1);

    pen
      .push()
      .colorRGB(1, 1, 1)
      .dotSize(2 * originFade)
      .fuzz(4, 0.1)
      .moveTo(0, 0, 0)
      .dot();

    if (progress > 0.7) {
      pen
        .colorRGB(1, 1, 1)
        .dotSize(2 * originFade)
        .moveTo(2, -4, 0)
        .text("ORIGIN", 1.5 * originFade);
    }

    pen.pop();
  }

  pen.pop();
}

// Draw the main cube as it materializes
function drawMaterializingCube(pen, time, startTime, duration) {
  // Calculate localized progress for this phase
  const progress = Math.max(0, Math.min((time - startTime) / duration, 1));
  if (progress <= 0) return;

  pen.push();

  // Phase 1: Corner points appear
  if (progress < 0.3) {
    const pointsProgress = progress / 0.3;
    const { corners } = createReferencePoints(CUBE_SIZE);

    applyStyle(pen, STYLES.reference);
    for (let i = 0; i < Math.ceil(corners.length * pointsProgress); i++) {
      if (i < corners.length) {
        pen.moveTo(corners[i].x, corners[i].y, corners[i].z).dot();
      }
    }
  }

  // Phase 2: Connect corners with edges
  if (progress >= 0.2 && progress < 0.5) {
    const edgesProgress = (progress - 0.2) / 0.3;
    const cubeEdges = createCubeEdges(CUBE_SIZE);

    applyStyle(pen, STYLES.primary);
    for (let i = 0; i < Math.ceil(cubeEdges.length * edgesProgress); i++) {
      if (i < cubeEdges.length) {
        pen.polyline(cubeEdges[i], false);
      }
    }
  }

  // Phase 3: Add grid lines to faces
  if (progress >= 0.4 && progress < 0.7) {
    const gridProgress = (progress - 0.4) / 0.3;

    applyStyle(pen, STYLES.grid);

    // Front face grid (z = -CUBE_SIZE)
    const frontGrid = createGridLines(CUBE_SIZE, GRID_DIVISIONS, "z");
    for (let i = 0; i < Math.ceil(frontGrid.length * gridProgress); i++) {
      if (i < frontGrid.length) {
        // Adjust z coordinate for front face
        const adjustedLine = frontGrid[i].map((pt) => ({
          ...pt,
          z: -CUBE_SIZE,
        }));
        pen.polyline(adjustedLine, false);
      }
    }
  }

  // Phase 4: Add complete structure
  if (progress >= 0.6) {
    const finalProgress = (progress - 0.6) / 0.4;

    // Draw the cube edges
    applyStyle(pen, STYLES.primary);
    const cubeEdges = createCubeEdges(CUBE_SIZE);
    for (const edge of cubeEdges) {
      pen.polyline(edge, false);
    }

    // Draw the grids on all faces
    applyStyle(pen, STYLES.grid);

    // Front face grid (z = -CUBE_SIZE)
    const frontGrid = createGridLines(CUBE_SIZE, GRID_DIVISIONS, "z");
    for (const line of frontGrid) {
      const adjustedLine = line.map((pt) => ({ ...pt, z: -CUBE_SIZE }));
      pen.polyline(adjustedLine, false);
    }

    // All other faces appear with progress
    if (finalProgress > 0.3) {
      // Back face grid (z = CUBE_SIZE)
      const backGrid = createGridLines(CUBE_SIZE, GRID_DIVISIONS, "z");
      for (const line of backGrid) {
        const adjustedLine = line.map((pt) => ({ ...pt, z: CUBE_SIZE }));
        pen.polyline(adjustedLine, false);
      }

      // Right face grid (x = CUBE_SIZE)
      const rightGrid = createGridLines(CUBE_SIZE, GRID_DIVISIONS, "x");
      for (const line of rightGrid) {
        const adjustedLine = line.map((pt) => ({ ...pt, x: CUBE_SIZE }));
        pen.polyline(adjustedLine, false);
      }
    }

    if (finalProgress > 0.6) {
      // Left face grid (x = -CUBE_SIZE)
      const leftGrid = createGridLines(CUBE_SIZE, GRID_DIVISIONS, "x");
      for (const line of leftGrid) {
        const adjustedLine = line.map((pt) => ({ ...pt, x: -CUBE_SIZE }));
        pen.polyline(adjustedLine, false);
      }

      // Top face grid (y = CUBE_SIZE)
      const topGrid = createGridLines(CUBE_SIZE, GRID_DIVISIONS, "y");
      for (const line of topGrid) {
        const adjustedLine = line.map((pt) => ({ ...pt, y: CUBE_SIZE }));
        pen.polyline(adjustedLine, false);
      }

      // Bottom face grid (y = -CUBE_SIZE)
      const bottomGrid = createGridLines(CUBE_SIZE, GRID_DIVISIONS, "y");
      for (const line of bottomGrid) {
        const adjustedLine = line.map((pt) => ({ ...pt, y: -CUBE_SIZE }));
        pen.polyline(adjustedLine, false);
      }
    }

    // Add face label
    if (finalProgress > 0.8) {
      applyStyle(pen, STYLES.highlight);
      pen.dotSize(2);
      pen.moveTo(0, 0, -CUBE_SIZE).text("FACE 1", 0.7);

      pen.moveTo(0, -CUBE_SIZE, 0).text("FACE 2", 0.7);

      pen.moveTo(0, CUBE_SIZE, 0).text("FACE 3", 0.7);

      pen.moveTo(0, 0, CUBE_SIZE).text("FACE 4", 0.7);

      pen.moveTo(-CUBE_SIZE, 0, 0).text("FACE 5", 0.7);

      pen.moveTo(-CUBE_SIZE, 0, 0).text("FACE 6", 0.7);
    }

    // Add dimensions
    if (finalProgress > 0.9) {
      applyStyle(pen, STYLES.measurement);

      // X dimension
      const xDimension = createDimension(
        { x: -CUBE_SIZE, y: -CUBE_SIZE, z: -CUBE_SIZE },
        { x: CUBE_SIZE, y: -CUBE_SIZE, z: -CUBE_SIZE },
        { x: 0, y: -2, z: 0 },
        CUBE_SIZE * 2,
      );

      // pen.polyline(xDimension.line, false);
      pen
        .moveTo(
          xDimension.labelPos.x,
          xDimension.labelPos.y,
          xDimension.labelPos.z,
        )
        .text(xDimension.value, 1.2);

      // Z dimension
      const zDimension = createDimension(
        { x: CUBE_SIZE, y: -CUBE_SIZE, z: -CUBE_SIZE },
        { x: CUBE_SIZE, y: -CUBE_SIZE, z: CUBE_SIZE },
        { x: 2, y: 0, z: 0 },
        CUBE_SIZE * 2,
      );

      // pen.polyline(zDimension.line, false);
      pen
        .moveTo(
          zDimension.labelPos.x,
          zDimension.labelPos.y,
          zDimension.labelPos.z,
        )
        .text(zDimension.value, 1.2);
    }
  }

  pen.pop();
}

// Draw scanning planes for calibration
function drawCalibrationScan(pen, time, startTime, duration) {
  // Calculate localized progress for this phase
  const progress = Math.max(0, Math.min((time - startTime) / duration, 1));
  if (progress <= 0) return;

  pen.push();
  applyStyle(pen, STYLES.scan);

  // Cycle through multiple scan planes
  const cycle = (progress * CALIBRATION_CYCLES) % 1;
  const phase = Math.floor(progress * CALIBRATION_CYCLES);

  // Determine which axis to scan based on phase
  let scanAxis;
  if (phase % 3 === 0) scanAxis = "x";
  else if (phase % 3 === 1) scanAxis = "y";
  else scanAxis = "z";

  // Position the scan plane based on cycle progress
  const scanPosition = (cycle * 2 - 1) * CUBE_SIZE;
  const scanPlane = createScanPlane(scanAxis, scanPosition, CUBE_SIZE);

  pen.polyline(scanPlane, true);

  // Add scan grid lines
  const scanGridDivisions = 5;
  const scanSize = CUBE_SIZE * 1.2;
  const gridStep = (2 * scanSize) / scanGridDivisions;

  // Determine which axes to use for grid based on scan axis
  let axis1, axis2;
  if (scanAxis === "x") {
    axis1 = "y";
    axis2 = "z";
  } else if (scanAxis === "y") {
    axis1 = "x";
    axis2 = "z";
  } else {
    axis1 = "x";
    axis2 = "y";
  }

  // Draw scan grid
  pen
    .push()
    .dotSize(STYLES.scan.dotSize * 0.7)
    .traceGap(0.25)
    .fuzz(1, 0.05);

  for (let i = 0; i <= scanGridDivisions; i++) {
    const pos = -scanSize + i * gridStep;

    // First set of grid lines
    const line1Start = { x: 0, y: 0, z: 0 };
    const line1End = { x: 0, y: 0, z: 0 };

    line1Start[scanAxis] = scanPosition;
    line1End[scanAxis] = scanPosition;

    line1Start[axis1] = pos;
    line1End[axis1] = pos;

    line1Start[axis2] = -scanSize;
    line1End[axis2] = scanSize;

    pen.polyline([line1Start, line1End], false);

    // Second set of grid lines
    const line2Start = { x: 0, y: 0, z: 0 };
    const line2End = { x: 0, y: 0, z: 0 };

    line2Start[scanAxis] = scanPosition;
    line2End[scanAxis] = scanPosition;

    line2Start[axis1] = -scanSize;
    line2End[axis1] = scanSize;

    line2Start[axis2] = pos;
    line2End[axis2] = pos;

    pen.polyline([line2Start, line2End], false);
  }

  // Add scan text
  pen.push().fuzz(0, 0).colorRGB(0, 1, 0.7);

  const scanText = `SCANNING ${scanAxis.toUpperCase()}-AXIS: ${(cycle * 100).toFixed(0)}%`;

  const textPos = { x: 0, y: 0, z: 0 };
  textPos[scanAxis] = scanPosition;

  if (scanAxis === "x") {
    textPos.y = 0;
    textPos.z = 0;
  } else if (scanAxis === "y") {
    textPos.x = 0;
    textPos.z = 0;
  } else {
    textPos.x = 0;
    textPos.y = 0;
  }

  pen
    .moveTo(textPos.x, textPos.y, textPos.z)
    .traceGap(0.1)
    .dotSize(6)
    .colorHex(0xff0000)
    .text(scanText, 2);

  pen.pop();
  pen.pop();

  pen.pop();
}

// Draw calibration metadata
function drawCalibrationMetadata(pen, time, startTime, duration) {
  // Calculate localized progress for this phase
  const progress = Math.max(0, Math.min((time - startTime) / duration, 1));
  if (progress <= 0) return;

  pen.push();
  applyStyle(pen, STYLES.secondary);

  // Metadata that appears gradually
  const metadataLines = [
    { text: "SCALE: 1:0.100", threshold: 0.2 },
    { text: "TEST CUBE v2.0", threshold: 0.4 },
    { text: "LASER TRACER CALIBRATION OBJECT", threshold: 0.6 },
    { text: "PRECISION: " + PRECISION + " DECIMAL POINTS", threshold: 0.8 },
    { text: "CALIBRATION COMPLETE", threshold: 0.95 },
  ];

  const baseY = -CUBE_SIZE - 5;
  const spacing = 2;

  for (let i = 0; i < metadataLines.length; i++) {
    if (progress >= metadataLines[i].threshold) {
      let fadeIn = Math.min((progress - metadataLines[i].threshold) / 0.1, 1);

      // Special effect for "CALIBRATION COMPLETE"
      if (i === metadataLines.length - 1 && progress > 0.95) {
        const pulseEffect = (Math.sin(time * 5) + 1) / 2;

        pen
          .colorRGB(0, 1, 0.4 + pulseEffect * 0.6)
          .dotSize(STYLES.secondary.dotSize * (1 + pulseEffect * 0.3))
          .traceGap(0.1)
          .fuzz(
            STYLES.secondary.fuzz * (1 + pulseEffect * 0.5),
            STYLES.secondary.fuzzSize,
          );

        fadeIn += 0.5;
      }

      pen
        .push()
        .dotSize(STYLES.secondary.dotSize * fadeIn)
        .fuzz(STYLES.secondary.fuzz * fadeIn, STYLES.secondary.fuzzSize)
        .moveTo(-CUBE_SIZE - 5, baseY - i * spacing, -CUBE_SIZE)
        .text(metadataLines[i].text, fadeIn);

      pen.pop();
    }
  }

  pen.pop();
}

// Draw coordinate readouts
function drawCoordinateReadouts(pen, time, startTime, duration) {
  // Calculate localized progress for this phase
  const progress = Math.max(0, Math.min((time - startTime) / duration, 1));
  if (progress <= 0.5) return;

  pen.push();

  // Show coordinate values at the corner
  const fadeIn = Math.min((progress - 0.5) / 0.3, 1);
  const pulseEffect = (Math.sin(time * 2) + 1) / 4;

  pen.traceGap(0.2);

  // X coordinate
  pen
    .push()
    .colorRGB(...STYLES.axis.x)
    .dotSize(STYLES.axis.dotSize * fadeIn * (1 + pulseEffect))
    .fuzz(STYLES.axis.fuzz * fadeIn, STYLES.axis.fuzzSize)
    .residue(STYLES.axis.residue * fadeIn)
    .moveTo(CUBE_SIZE + 2, -CUBE_SIZE, -CUBE_SIZE)
    .text("X: " + CUBE_SIZE.toFixed(PRECISION), 1.5 * fadeIn);
  pen.pop();

  // Y coordinate
  pen
    .push()
    .colorRGB(...STYLES.axis.y)
    .dotSize(STYLES.axis.dotSize * fadeIn * (1 + pulseEffect))
    .fuzz(STYLES.axis.fuzz * fadeIn, STYLES.axis.fuzzSize)
    .residue(STYLES.axis.residue * fadeIn)
    .moveTo(CUBE_SIZE + 2, -CUBE_SIZE - 2, -CUBE_SIZE)
    .text("Y: " + CUBE_SIZE.toFixed(PRECISION), 1.5 * fadeIn);
  pen.pop();

  // Z coordinate
  pen
    .push()
    .colorRGB(...STYLES.axis.z)
    .dotSize(STYLES.axis.dotSize * fadeIn * (1 + pulseEffect))
    .fuzz(STYLES.axis.fuzz * fadeIn, STYLES.axis.fuzzSize)
    .residue(STYLES.axis.residue * fadeIn)
    .moveTo(CUBE_SIZE + 2, -CUBE_SIZE - 4, -CUBE_SIZE)
    .text("Z: " + CUBE_SIZE.toFixed(PRECISION), 1.5 * fadeIn);
  pen.pop();

  pen.pop();
}

// ===== MAIN PROGRAM =====

let firstFrame = true;

function program(pen, scene, time) {
  // First time setup
  if (firstFrame) {
    scene.setBGColor(0x00000a); // Almost black background
    firstFrame = false;
  }

  // Define the phase timing with longer, equal durations
  const BOOT_DURATION = 8; // Longer duration for all phases
  const phases = {
    boot: { duration: BOOT_DURATION, start: 0 },
    materialize: { duration: BOOT_DURATION, start: BOOT_DURATION },
    calibrate: { duration: BOOT_DURATION, start: BOOT_DURATION * 2 },
  };

  // Camera positioning that matches your original test cube screenshot
  let cameraX, cameraY, cameraZ;

  if (time < phases.boot.start + phases.boot.duration) {
    // Boot sequence - camera in front position
    scene.setCamera({ x: 0, y: 0, z: 100 }, { x: 0, y: 0, z: 0 });
  } else if (time < phases.materialize.start + phases.materialize.duration) {
    // Materialization phase - smooth camera movement to isometric position
    const bootProgress =
      (time - phases.materialize.start) / phases.materialize.duration;

    // Start with the front view position
    const startX = 0;
    const startY = 0;
    const startZ = 100;

    // Target isometric view position
    const targetX = 45 * Math.sin(Math.PI / 4);
    const targetY = 30;
    const targetZ = 45 * Math.cos(Math.PI / 4);

    // Smooth easing function (cubic ease-in-out)
    const ease = (t) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    const eased = ease(bootProgress);

    // Interpolate between start and target positions
    cameraX = startX + (targetX - startX) * eased;
    cameraY = startY + (targetY - startY) * eased;
    cameraZ = startZ + (targetZ - startZ) * eased;

    scene.setCamera(
      { x: cameraX, y: cameraY, z: cameraZ },
      { x: 0, y: 0, z: 0 },
    );
  } else {
    // Calibration phase - smooth orbit around the cube
    // Using tested camera settings that keep the cube in view
    const orbitRadius = 60;

    // Adjusted camera angles to ensure cube remains visible
    const baseAzimuth = 30; // Better angle to see cube with grid
    const baseElevation = 90; // Lower elevation to see cube properly

    // Add subtle movement (reduced amplitude to avoid losing the cube)
    const azimuth = (baseAzimuth + Math.sin(time * 0.2) * 3) * (Math.PI / 180);
    const elevation =
      (baseElevation + Math.sin(time * 0.3) * 2) * (Math.PI / 180);

    // Convert from spherical to Cartesian coordinates
    cameraX = orbitRadius * Math.sin(elevation) * Math.sin(azimuth);
    cameraY = orbitRadius * Math.cos(elevation);
    cameraZ = orbitRadius * Math.sin(elevation) * Math.cos(azimuth);

    scene.setCamera(
      { x: cameraX, y: cameraY, z: cameraZ },
      { x: 0, y: 0, z: 0 },
    );
  }

  // Draw phases based on time
  pen.push();

  // Phase 1: Boot sequence
  if (time < phases.materialize.start) {
    drawBootParticles(pen, time - phases.boot.start, phases.boot.duration);
    drawBootText(pen, time - phases.boot.start, phases.boot.duration);
    drawCoordinateInit(pen, time - phases.boot.start, phases.boot.duration);
  }

  // Phase 2: Cube materialization (with slight overlap from boot phase)
  if (time >= phases.materialize.start - 2 && time < phases.calibrate.start) {
    drawMaterializingCube(
      pen,
      time,
      phases.materialize.start,
      phases.materialize.duration,
    );
  }

  // Phase 3: Calibration
  if (time >= phases.calibrate.start) {
    if (time <= phases.calibrate.start + BOOT_DURATION) {
      drawCalibrationScan(
        pen,
        time,
        phases.calibrate.start,
        phases.calibrate.duration,
      );
    }
    drawCalibrationMetadata(
      pen,
      time,
      phases.calibrate.start,
      phases.calibrate.duration,
    );
    drawCoordinateReadouts(
      pen,
      time,
      phases.calibrate.start,
      phases.calibrate.duration,
    );
    drawMaterializingCube(
      pen,
      time,
      phases.materialize.start,
      phases.materialize.duration,
    );
  }

  pen.pop();
}
