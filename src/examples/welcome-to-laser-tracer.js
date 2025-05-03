// Welcome to Laser-Tracer: Interactive Demo
// An introduction to the virtual 3D vector display system

// State variables
let frameCount = 0;
let lastRenderTime = 0;
let demoSection = 0;
let sectionTime = 0;
let userInteraction = { x: 0, y: 0, z: 0 };
let drawingComplete = false;
let particleSystem = [];

// Demo sections/chapters
const SECTIONS = [
  { title: "WELCOME TO LASER TRACER", duration: 8 },
  { title: "DRAW WITH PARTICLES IN 3 DIMENSIONS", duration: 10 },
  { title: "COLORS AND LINES", duration: 10 },
  { title: "3D TRANSFORMATIONS", duration: 10 },
  { title: "INFINITE POSSIBILITIES", duration: 30 },
];

// Color palette
const COLORS = {
  title: { r: 0, g: 1, b: 0.5 }, // Cyan-green
  highlight: { r: 1, g: 1, b: 0.4 }, // Yellow
  accent1: { r: 1, g: 0.4, b: 0.1 }, // Orange
  accent2: { r: 0.3, g: 0.7, b: 1.0 }, // Light blue
  accent3: { r: 1, g: 0.3, b: 0.7 }, // Pink
  subtle: { r: 0.5, g: 0.5, b: 0.5 }, // Gray
};

// Apply style preset to pen
function applyStyle(pen, style) {
  const {
    color,
    dotSize = 4,
    traceGap = 0.2,
    fuzz = 3,
    fuzzSize = 0.05,
    residue = 0.6,
  } = style;

  pen
    .colorRGB(color.r, color.g, color.b)
    .dotSize(dotSize)
    .traceGap(traceGap)
    .fuzz(fuzz, fuzzSize)
    .residue(residue);

  return pen;
}

// Draw animated title text
function drawAnimatedTitle(pen, text, position, size, time, style) {
  pen.push();

  applyStyle(pen, style);

  // Apply subtle hovering animation
  const hoverY = Math.sin(time * 1.5) * 0.5;
  position.y += hoverY;

  // Apply subtle glow pulsation
  const glowFactor = 0.8 + Math.sin(time * 2) * 0.2;
  pen.fuzz(style.fuzz * glowFactor, style.fuzzSize * glowFactor);

  // Draw the text
  draw.text(text, position, size);

  pen.pop();
}

// Draw code example with syntax highlighting
function drawCodeExample(pen, x, y, z, time) {
  pen.push();

  const codeLines = [
    "function program(pen, draw, time) {",
    "  // Move the pen in 3D space",
    "  pen.moveTo(0, 0, 0);",
    "  ",
    "  // Set style attributes",
    "  pen.colorRGB(0, 1, 0.5)",
    "     .dotSize(4)",
    "     .traceGap(0.2)",
    "     .fuzz(3, 0.05);",
    "  ",
    "  // Draw a shape",
    "  pen.traceTo(10, 0, 0);",
    "  pen.traceTo(10, 10, 0);",
    "  pen.traceTo(0, 10, 0);",
    "  pen.traceTo(0, 0, 0);",
    "}",
  ];

  // Reveal lines progressively based on time
  const linesRevealed = Math.min(codeLines.length, Math.floor(time * 6));

  // Draw each line with syntax highlighting
  for (let i = 0; i < linesRevealed; i++) {
    const line = codeLines[i];
    const lineY = y - i * 1.2;

    // Choose color based on syntax
    let lineColor;
    if (
      line.includes("function") ||
      line.includes("pen.") ||
      line.includes("draw.")
    ) {
      lineColor = COLORS.accent2; // Functions/methods
    } else if (line.includes("//")) {
      lineColor = COLORS.subtle; // Comments
    } else if (line.includes("(") && line.includes(")")) {
      lineColor = COLORS.accent1; // Function calls
    } else {
      lineColor = COLORS.title; // Regular code
    }

    // Draw the line
    applyStyle(pen, {
      color: lineColor,
      dotSize: 2.5,
      traceGap: 0.08,
      fuzz: 1,
      residue: 0.4,
    });

    draw.text(line, { x, y: lineY, z }, 0.8);
  }

  // Highlight current line being typed
  if (linesRevealed < codeLines.length) {
    const currentLine = codeLines[linesRevealed];
    const lineY = y - linesRevealed * 1.2;

    // Calculate how much of the line to show
    const charProgress = (time * 2) % 1;
    const charsToShow = Math.floor(currentLine.length * charProgress);
    const partialLine = currentLine.substring(0, charsToShow);

    // Draw partial line
    applyStyle(pen, {
      color: COLORS.highlight,
      dotSize: 3,
      traceGap: 0.08,
      fuzz: 2,
      residue: 0.8,
    });

    draw.text(partialLine, { x, y: lineY, z }, 0.8);

    // Draw cursor
    if (Math.sin(time * 10) > 0) {
      draw.text(
        "_",
        {
          x: x + partialLine.length * 0.8,
          y: lineY,
          z,
        },
        0.8,
      );
    }
  }

  pen.pop();
}

// Draw a 3D coordinate system
function drawCoordinateSystem(pen, origin, size) {
  pen.push();

  // X axis (red)
  applyStyle(pen, {
    color: { r: 1, g: 0.2, b: 0.2 },
    dotSize: 3,
    traceGap: 0.1,
  });

  pen.polyline(
    [
      { x: origin.x, y: origin.y, z: origin.z },
      { x: origin.x + size, y: origin.y, z: origin.z },
    ],
    false,
  );

  draw.text(
    "X",
    {
      x: origin.x + size + 1,
      y: origin.y,
      z: origin.z,
    },
    1,
  );

  // Y axis (green)
  applyStyle(pen, {
    color: { r: 0.2, g: 1, b: 0.2 },
    dotSize: 3,
    traceGap: 0.1,
  });

  pen.polyline(
    [
      { x: origin.x, y: origin.y, z: origin.z },
      { x: origin.x, y: origin.y + size, z: origin.z },
    ],
    false,
  );

  draw.text(
    "Y",
    {
      x: origin.x,
      y: origin.y + size + 1,
      z: origin.z,
    },
    1,
  );

  // Z axis (blue)
  applyStyle(pen, {
    color: { r: 0.2, g: 0.2, b: 1 },
    dotSize: 3,
    traceGap: 0.1,
  });

  pen.polyline(
    [
      { x: origin.x, y: origin.y, z: origin.z },
      { x: origin.x, y: origin.y, z: origin.z + size },
    ],
    false,
  );

  draw.text(
    "Z",
    {
      x: origin.x,
      y: origin.y,
      z: origin.z + size + 1,
    },
    1,
  );

  pen.pop();
}

// Demonstrate tracing versus effects using the pen directly
// Draw a demonstration of various tracing techniques
function drawTracingDemo(pen, time) {
  pen.push();

  // 1. SPIRAL TRACE - shows elegant continuous motion
  pen.push();

  // Position the spiral
  pen.moveTo(20, 0, 0);

  // Apply elegant style
  pen
    .colorRGB(1, 0.75, 0.1)
    .dotSize(2.5)
    .traceGap(0.2)
    .fuzz(3, 0.45)
    .residue(0.7);

  // Draw spiral with time-based animation
  const spiralPoints = 60;
  const innerRadius = 2;
  const outerRadius = 8;
  const startAngle = time * 2;

  pen.moveTo(
    0 + Math.cos(startAngle) * innerRadius,
    Math.sin(startAngle) * innerRadius,
    0,
  );

  for (let i = 1; i <= spiralPoints; i++) {
    const t = i / spiralPoints;
    const angle = startAngle + t * Math.PI * 6;
    const radius = innerRadius + t * (outerRadius - innerRadius);

    pen.traceTo(
      0 + Math.cos(angle) * radius,
      Math.sin(angle) * radius,
      Math.sin(t * Math.PI * 2 * time) * 10,
    );
  }

  pen.pop();

  // 2. GEOMETRIC TRACE - shows precise shapes
  pen.push();

  // Position the shape
  pen.moveTo(0, 0, 0);

  // Apply geometric style
  pen
    .colorRGB(0.2, 0.7, 1.0) // Cyan blue
    .dotSize(6)
    .traceGap(1)
    .fuzz(0)
    .residue(0.8);

  // Draw animated polygon
  const sides = 5;
  const radius = 6;
  const rotation = time * 0.5;

  // Start at first vertex
  const firstAngle = rotation;
  pen.moveTo(
    15 + Math.cos(firstAngle) * radius,
    Math.sin(firstAngle) * radius,
    0,
  );

  // Trace the polygon
  for (let i = 1; i <= sides; i++) {
    const angle = rotation + (i / sides) * Math.PI * 2;

    pen.traceTo(
      15 + Math.cos(angle) * radius,
      Math.sin(angle) * radius,
      Math.sin(time + i) * 2,
    );
  }

  // Close the shape
  pen.traceTo(
    15 + Math.cos(firstAngle) * radius,
    Math.sin(firstAngle) * radius,
    0,
  );

  pen.pop();

  // 3. BURST EFFECT - shows dots vs traces
  pen.push();

  // Position the burst
  pen.moveTo(15, 0, 0);

  // Apply effect style
  pen
    .colorRGB(1, 0.5, 0.1) // Orange
    .dotSize(5)
    .fuzz(4, 0.08)
    .residue(2);

  // Create burst pattern based on time
  const burstTrigger = Math.sin(time * 2) > 0.7;
  const burstPhase = (time * 2) % 1;
  const burstCount = 12;

  if (burstTrigger || burstPhase < 0.5) {
    // Calculate how far particles have traveled
    const distance = burstPhase * 8;

    for (let i = 0; i < burstCount; i++) {
      const angle = (i / burstCount) * Math.PI * 2;

      // Calculate position
      const x = 15 + Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;
      const z = Math.sin(time + i) * 3;

      // Draw dot at this position
      pen.moveTo(x, y, z);
      pen.dot();

      // For some particles, draw traces back to center
      if (i % 3 === 0) {
        pen.moveTo(15, 0, 0);
        pen.traceTo(x, y, z);
      }
    }
  }

  pen.pop();

  // 4. OSCILLATING WAVE - shows smooth motion
  pen.push();

  // Draw at the bottom of the scene
  pen.moveTo(0, -10, 0);

  // Apply wave style
  pen
    .colorRGB(1, 0.4, 0.8) // Pink
    .dotSize(6)
    .traceGap(0.2)
    .fuzz(0)
    .residue(0.2);

  // Create wave parameters
  const waveWidth = 30;
  const waveAmplitude = 5;
  const waveFrequency = 2;
  const waveSpeed = time * 3;

  // Draw wave
  const wavePoints = 40;

  pen.moveTo(-waveWidth / 2, -10, 0);

  for (let i = 0; i <= wavePoints; i++) {
    const t = i / wavePoints;
    const x = -waveWidth / 2 + t * waveWidth;
    const y =
      -10 + Math.sin(t * Math.PI * waveFrequency + waveSpeed) * waveAmplitude;
    const z = Math.cos(t * Math.PI * waveFrequency + waveSpeed) * 2;

    pen.traceTo(x, y, z);
  }

  pen.pop();

  pen.pop();
}

// Draw a spline curve with evolving shape
function drawSplineCurve(pen, time, complexity) {
  pen.push();

  // Generate control points for the curve
  const points = [];
  const count = 10 + complexity * 10;

  for (let i = 0; i < count; i++) {
    const t = i / (count - 1);
    const angle = t * Math.PI * 2;

    // Create evolving spiral shape
    const radius = 10 + Math.sin(t * 6 + time) * 4;
    const height = Math.sin(t * 4 + time * 1.5) * 8;

    points.push({
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
      z: height,
    });
  }

  // Draw the curve with color progression
  for (let i = 0; i < points.length - 1; i++) {
    const t = i / (points.length - 1);

    applyStyle(pen, {
      color: {
        r: 0.5 + Math.sin(t * Math.PI * 2) * 0.5,
        g: 0.5 + Math.sin(t * Math.PI * 2 + (Math.PI * 2) / 3) * 0.5,
        b: 0.5 + Math.sin(t * Math.PI * 2 + (Math.PI * 4) / 3) * 0.5,
      },
      dotSize: 3 + Math.sin(t * Math.PI * 4 + time * 2) * 1.5,
      traceGap: 0.1,
      fuzz: 3,
      residue: 0.6,
    });

    pen.polyline([points[i], points[i + 1]], false);
  }

  pen.pop();
}

// Draw 3D transformation demo
function drawTransformationDemo(pen, time) {
  pen.push();

  // Create a cube
  const cubeSize = 8;
  const vertices = [
    { x: -cubeSize, y: -cubeSize, z: -cubeSize },
    { x: cubeSize, y: -cubeSize, z: -cubeSize },
    { x: cubeSize, y: cubeSize, z: -cubeSize },
    { x: -cubeSize, y: cubeSize, z: -cubeSize },
    { x: -cubeSize, y: -cubeSize, z: cubeSize },
    { x: cubeSize, y: -cubeSize, z: cubeSize },
    { x: cubeSize, y: cubeSize, z: cubeSize },
    { x: -cubeSize, y: cubeSize, z: cubeSize },
  ];

  // Define edges
  const edges = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 0],
    [4, 5],
    [5, 6],
    [6, 7],
    [7, 4],
    [0, 4],
    [1, 5],
    [2, 6],
    [3, 7],
  ];

  // Set up transformation animation
  const rotX = time * 0.5;
  const rotY = time * 0.7;
  const rotZ = time * 0.3;

  // Apply rotation to vertices
  const transformedVertices = vertices.map((v) => {
    // Apply rotations (simplified rotation matrices)

    // Rotate around X
    let y1 = v.y * Math.cos(rotX) - v.z * Math.sin(rotX);
    let z1 = v.y * Math.sin(rotX) + v.z * Math.cos(rotX);

    // Rotate around Y
    let x2 = v.x * Math.cos(rotY) + z1 * Math.sin(rotY);
    let z2 = -v.x * Math.sin(rotY) + z1 * Math.cos(rotY);

    // Rotate around Z
    let x3 = x2 * Math.cos(rotZ) - y1 * Math.sin(rotZ);
    let y3 = x2 * Math.sin(rotZ) + y1 * Math.cos(rotZ);

    return { x: x3, y: y3, z: z2 };
  });

  // Draw edges with color based on orientation
  for (let i = 0; i < edges.length; i++) {
    const [A, B] = edges[i];
    const vertA = transformedVertices[A];
    const vertB = transformedVertices[B];

    // Calculate color based on edge orientation
    const dx = vertB.x - vertA.x;
    const dy = vertB.y - vertA.y;
    const dz = vertB.z - vertA.z;
    const length = Math.sqrt(dx * dx + dy * dy + dz * dz);

    // Normalize direction
    const nx = dx / length;
    const ny = dy / length;
    const nz = dz / length;

    // Color based on direction
    const r = 0.5 + nx * 0.5;
    const g = 0.5 + ny * 0.5;
    const b = 0.5 + nz * 0.5;

    applyStyle(pen, {
      color: { r, g, b },
      dotSize: 3,
      traceGap: 0.1,
      fuzz: 2,
      residue: 0.8,
    });

    pen.polyline([vertA, vertB], false);
  }

  // Draw vertices as dots
  for (const vert of transformedVertices) {
    applyStyle(pen, {
      color: COLORS.highlight,
      dotSize: 2,
      fuzz: 4,
      residue: 0.5,
    });

    pen.moveTo(vert.x, vert.y, vert.z);
    pen.dot();
  }

  // Draw transformation axes
  drawCoordinateSystem(pen, { x: -20, y: -10, z: 0 }, 5);

  // Draw transformation labels
  applyStyle(pen, {
    color: COLORS.title,
    dotSize: 3,
    traceGap: 0.1,
    fuzz: 1,
  });

  draw.text("YAW PITCH ROLL", { x: 0, y: 15, z: 0 }, 1.2);

  // Draw rotation values
  draw.text(
    "X: " + Math.round(rotX * 57.3) + " DEG",
    { x: -20, y: -5, z: 0 },
    1,
  );
  draw.text(
    "Y: " + Math.round(rotY * 57.3) + " DEG",
    { x: -20, y: -7, z: 0 },
    1,
  );
  draw.text(
    "Z: " + Math.round(rotZ * 57.3) + " DEG",
    { x: -20, y: -9, z: 0 },
    1,
  );

  pen.pop();
}

// Draw complex scene showcasing multiple features
function drawCreativeScene(pen, time) {
  pen.push();

  // Draw multiple interlocking spirals
  const spiralCount = 4;

  for (let s = 0; s < spiralCount; s++) {
    const phaseOffset = (s / spiralCount) * Math.PI * 2;
    const pointCount = 30;

    applyStyle(pen, {
      color: {
        r: 0.5 + Math.sin(phaseOffset) * 0.5,
        g: 0.5 + Math.sin(phaseOffset + (Math.PI * 2) / 3) * 0.5,
        b: 0.5 + Math.sin(phaseOffset + (Math.PI * 4) / 3) * 0.5,
      },
      dotSize: 3 + Math.sin(time + phaseOffset) * 1.5,
      traceGap: 0.15,
      fuzz: 2,
      residue: 0.6,
    });

    const points = [];

    for (let i = 0; i < pointCount; i++) {
      const t = i / (pointCount - 1);
      const angle = t * Math.PI * 6 + time * 0.5 + phaseOffset;
      const radius = t * 15;
      const height = Math.sin(t * Math.PI * 8 + time + phaseOffset) * 5;

      points.push({
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        z: height,
      });
    }

    // Draw spiral
    for (let i = 0; i < points.length - 1; i++) {
      pen.polyline([points[i], points[i + 1]], false);
    }
  }

  // Draw orbital rings
  const ringCount = 3;

  for (let r = 0; r < ringCount; r++) {
    const ringRadius = 12 + r * 6;
    const segmentCount = 60;
    const tilt = Math.sin(time * 0.2 + r) * 0.5;

    applyStyle(pen, {
      color: {
        r: 0.2 + r * 0.2,
        g: 0.5,
        b: 0.8 - r * 0.2,
      },
      dotSize: 2.5,
      traceGap: 0.2,
      fuzz: 1,
      residue: 0.4,
    });

    const ringPoints = [];

    for (let i = 0; i <= segmentCount; i++) {
      const angle = (i / segmentCount) * Math.PI * 2;

      ringPoints.push({
        x: Math.cos(angle) * ringRadius,
        y: Math.sin(angle) * ringRadius * Math.cos(tilt),
        z: Math.sin(angle) * ringRadius * Math.sin(tilt),
      });
    }

    pen.polyline(ringPoints, false);
  }

  // Draw some floating text elements
  const phrases = ["CREATE", "EXPLORE", "DESIGN", "VISUALIZE", "ANIMATE"];

  for (let i = 0; i < phrases.length; i++) {
    const angle = (i / phrases.length) * Math.PI * 2 + time * 0.1;
    const distance = 20 + Math.sin(time * 0.5 + i) * 3;
    const height = Math.sin(time * 0.3 + i * 0.7) * 10;

    drawAnimatedTitle(
      pen,
      phrases[i],
      {
        x: Math.cos(angle) * distance,
        y: height,
        z: Math.sin(angle) * distance,
      },
      1,
      time + i,
      {
        color: {
          r: 0.5 + Math.sin(i * 0.7) * 0.5,
          g: 0.5 + Math.cos(i * 0.7) * 0.5,
          b: 0.5 + Math.sin(time + i) * 0.5,
        },
        dotSize: 3,
        fuzz: 2,
        residue: 0.5,
      },
    );
  }

  pen.pop();
}

// Draw section content based on current demo section
function drawSectionContent(pen, sectionIndex, time) {
  switch (sectionIndex) {
    case 0: // Welcome Introduction
      // Title and subtitle
      drawAnimatedTitle(pen, "WELCOME TO", { x: 0, y: 8, z: 0 }, 1.5, time, {
        color: COLORS.title,
        dotSize: 4,
        fuzz: 3,
        residue: 0.8,
      });

      drawAnimatedTitle(
        pen,
        "LASER TRACER",
        { x: 0, y: 4, z: 0 },
        2.5,
        time + 0.2,
        {
          color: COLORS.highlight,
          dotSize: 6,
          fuzz: 5,
          fuzzSize: 0.1,
          residue: 1.0,
        },
      );

      // Subtitle
      drawAnimatedTitle(
        pen,
        "VIRTUAL 3D VECTOR DISPLAY",
        { x: 0, y: 0, z: 0 },
        1,
        time + 0.4,
        {
          color: COLORS.title,
          dotSize: 3,
          fuzz: 2,
          residue: 0.6,
        },
      );

      // Draw subtle animated background pattern
      pen.push();

      for (let i = 0; i < 20; i++) {
        const angle = (i / 20) * Math.PI * 2;
        const speed = 0.2 + (i % 3) * 0.1;
        const radius = 25 + Math.sin(time * speed + i) * 5;

        applyStyle(pen, {
          color: {
            r: 0.5 + (i % 3) * 0.1,
            g: 0.2 + (i % 5) * 0.1,
            b: 0.3 + (i % 4) * 0.1,
          },
          dotSize: 3,
          traceGap: 0.5,
          fuzz: 3,
          fuzzSize: 0.2,
          residue: 0.5,
        });

        const x1 = Math.cos(angle) * (radius + (Math.cos(time) * radius) / 2);
        const y1 = Math.sin(angle) * (radius + (Math.cos(time) * radius) / 2);
        const z1 = Math.sin(time * 0.3 + i) * 5;

        const x2 =
          Math.cos(angle + Math.PI) * (radius + (Math.cos(time) * radius) / 2);
        const y2 =
          Math.sin(angle + Math.PI) * (radius + (Math.cos(time) * radius) / 2);
        const z2 = Math.sin(time * 0.3 + i + Math.PI) * 5;

        pen.polyline(
          [
            { x: x1, y: y1, z: z1 },
            { x: x2, y: y2, z: z2 },
          ],
          false,
        );
      }

      pen.pop();

      // Draw key information
      applyStyle(pen, {
        color: { r: 1, g: 0.75, b: 0.1 },
        dotSize: 4,
        traceGap: 0.1,
        fuzz: 1,
      });

      draw.text("A REAL TIME PROGRAMMABLE", { x: 0, y: -10, z: 0 }, 1);
      draw.text("VECTOR GRAPHICS SYSTEM", { x: 0, y: -12, z: 0 }, 1);

      // Version info
      applyStyle(pen, {
        color: COLORS.subtle,
        dotSize: 2,
        traceGap: 0.1,
        fuzz: 1,
      });

      draw.text("VERSION 1.0", { x: 0, y: -18, z: 0 }, 0.8);
      break;

    case 1: // DRAW WITH PARTICLES IN 3 DIMENSIONS
      // Section title
      drawAnimatedTitle(
        pen,
        "DRAW WITH PARTICLES IN 3 DIMENSIONS",
        { x: 0, y: 18, z: 0 },
        1.5,
        time,
        {
          color: COLORS.title,
          dotSize: 4,
          fuzz: 3,
          residue: 0.8,
        },
      );

      drawTracingDemo(pen, time);

      // Draw explanation text
      applyStyle(pen, {
        color: COLORS.title,
        dotSize: 3,
        traceGap: 0.1,
        fuzz: 1,
      });

      draw.text("PEN COMMANDS", { x: -20, y: 10, z: 0 }, 1.2);

      applyStyle(pen, {
        color: COLORS.accent1,
        dotSize: 2.5,
        traceGap: 0.1,
        fuzz: 1,
      });

      draw.text("MOVETO MOVEBY", { x: -20, y: 7, z: 0 }, 1);
      draw.text("TRACETO TRACEBY", { x: -20, y: 5, z: 0 }, 1);
      draw.text("DOT", { x: -20, y: 3, z: 0 }, 1);

      applyStyle(pen, {
        color: COLORS.title,
        dotSize: 2.5,
        traceGap: 0.1,
        fuzz: 1,
      });

      draw.text("EVERY SHAPE IS MADE", { x: -20, y: 0, z: 0 }, 0.9);
      draw.text("OF INDIVIDUAL POINTS", { x: -20, y: -2, z: 0 }, 0.9);
      draw.text("EMITTED BY THE PEN", { x: -20, y: -4, z: 0 }, 0.9);
      break;

    case 2: // Colors and Effects
      // Section title
      drawAnimatedTitle(
        pen,
        "COLORS AND LINES",
        { x: 0, y: 18, z: 0 },
        1.5,
        time,
        {
          color: COLORS.title,
          dotSize: 4,
          fuzz: 3,
          residue: 0.8,
        },
      );

      // Draw a beautiful color spline
      drawSplineCurve(pen, time, 2);

      // Draw side panel explaining style attributes
      applyStyle(pen, {
        color: COLORS.title,
        dotSize: 3,
        traceGap: 0.1,
        fuzz: 1,
      });

      draw.text("TRACE ATTRIBUTES", { x: -20, y: 10, z: 0 }, 1.2);

      // Draw attribute explanations with examples
      const attributes = [
        // { name: "COLOR", color: { r: 1, g: 0.5, b: 0.2 } },
        { name: "DOTSIZE", color: { r: 0.2, g: 0.8, b: 1.0 }, size: 12 },
        { name: "TRACE_GAP", color: { r: 0.5, g: 1, b: 0.5 }, gap: 0.5 },
        {
          name: "GAUSSIAN FUZZ",
          color: { r: 1, g: 0.3, b: 0.7 },
          fuzz: 6,
          fuzzSize: 0.8,
        },
        // { name: "RESIDUE", color: { r: 1, g: 1, b: 0.4 }, residue: 1.2 }
      ];

      for (let i = 0; i < attributes.length; i++) {
        const attr = attributes[i];
        const y = 7 - i * 3;

        // Draw attribute name
        applyStyle(pen, {
          color: COLORS.title,
          dotSize: 2.5,
          traceGap: 0.1,
          fuzz: 1,
        });

        draw.text(attr.name, { x: -21, y: y + 0.5, z: 0 }, 1);

        // Draw example line showing the attribute
        applyStyle(pen, {
          color: attr.color,
          dotSize: attr.size || 4,
          traceGap: attr.gap || 0.1,
          fuzz: attr.fuzz || 2,
          fuzzSize: attr.fuzzSize || 0.05,
          residue: attr.residue || 0.6,
        });

        // Draw sample line
        pen.polyline(
          [
            { x: -10, y: y, z: 0 },
            { x: 0, y: y, z: 0 },
          ],
          false,
        );

        // For fuzz, draw a dot instead
        if (attr.name === "FUZZ") {
          pen.moveTo(-5, y, 0);
          pen.dot();
        }
      }

      // Add explanation about phosphor effect
      applyStyle(pen, {
        color: COLORS.highlight,
        dotSize: 3,
        traceGap: 0.1,
        fuzz: 2,
      });

      draw.text("PARTICLES DECAY OVER TIME", { x: 0, y: -12, z: 0 }, 1);
      draw.text("EMULATING PHOSPHOR ACTIVATION", { x: 0, y: -14, z: 0 }, 1);
      break;

    case 3: // 3D Transformation HIERARCHY
      // Section title
      drawAnimatedTitle(
        pen,
        "3D TRANSFORMATIONS",
        { x: 0, y: 18, z: 0 },
        1.5,
        time,
        {
          color: COLORS.title,
          dotSize: 4,
          fuzz: 3,
          residue: 0.8,
        },
      );

      // Draw transformation demo
      drawTransformationDemo(pen, time);

      // Draw explanation
      applyStyle(pen, {
        color: COLORS.title,
        dotSize: 3,
        traceGap: 0.1,
        fuzz: 1,
      });

      draw.text("TRANSFORM COMMANDS", { x: 20, y: 10, z: 0 }, 1.2);

      applyStyle(pen, {
        color: COLORS.accent1,
        dotSize: 2.5,
        traceGap: 0.1,
        fuzz: 1,
      });

      draw.text("YAW PITCH ROLL", { x: 20, y: 7, z: 0 }, 1);
      draw.text("PUSH POP", { x: 20, y: 5, z: 0 }, 1);

      applyStyle(pen, {
        color: COLORS.title,
        dotSize: 2.5,
        traceGap: 0.1,
        fuzz: 1,
      });

      draw.text("NESTED COORDINATE", { x: 20, y: 2, z: 0 }, 0.9);
      draw.text("SYSTEMS ALLOW FOR", { x: 20, y: 0, z: 0 }, 0.9);
      draw.text("COMPLEX HIERARCHIES", { x: 20, y: -2, z: 0 }, 0.9);
      break;

    case 4: // Creative Possibilities
      // Section title
      drawAnimatedTitle(
        pen,
        "INFINITE POSSIBILITIES",
        { x: 0, y: 18, z: 0 },
        1.5,
        time,
        {
          color: COLORS.title,
          dotSize: 4,
          fuzz: 3,
          residue: 0.8,
        },
      );

      // Draw creative showcase
      drawCreativeScene(pen, time);

      // Show animation code
      drawCodeExample(pen, -25, -5, 0, time * 0.3);

      // Final message
      if (time > 5) {
        drawAnimatedTitle(
          pen,
          "PRESS PLAY",
          { x: 0, y: -15, z: 0 },
          1.5,
          time,
          {
            color: COLORS.highlight,
            dotSize: 5,
            fuzz: 4,
            residue: 1.0,
          },
        );
      }
      break;
  }
}

// Draw progress bar and navigation
function drawNavigation(pen, currentSection, progress, time) {
  pen.push();

  // Position at bottom of screen
  pen.moveTo(0, -25, 0);

  // Draw progress bar for current section
  applyStyle(pen, {
    color: COLORS.accent1,
    dotSize: 2,
    traceGap: 0.1,
    fuzz: 1,
  });

  // Bar background
  pen.polyline(
    [
      { x: -15, y: -5, z: 0 },
      { x: 15, y: -5, z: 0 },
    ],
    false,
  );

  // Bar fill
  applyStyle(pen, {
    color: COLORS.accent3,
    dotSize: 2,
    traceGap: 0.05,
    fuzz: 2,
  });

  pen.polyline(
    [
      { x: -15, y: -5, z: 0 },
      { x: -15 + progress * 30, y: -5, z: 0 },
    ],
    false,
  );

  pen.pop();
}

// Main program function
function program(pen, draw, time) {
  // Initialize on first frame
  if (frameCount === 0) {
    setBGColor(0x000005); // Almost black background

    // Set initial camera position
    setCamera({ x: 0, y: 15, z: 100 }, { x: 0, y: -5, z: 0 });
  }

  // Calculate current section and progress
  let totalTime = 0;
  demoSection = 0;
  sectionTime = 0;

  for (let i = 0; i < SECTIONS.length; i++) {
    const sectionDuration = SECTIONS[i].duration;

    if (time >= totalTime && time < totalTime + sectionDuration) {
      demoSection = i;
      sectionTime = time - totalTime;
      break;
    }

    totalTime += sectionDuration;
  }

  // Calculate section progress (0-1)
  const sectionProgress = sectionTime / SECTIONS[demoSection].duration;

  // Draw current section content
  drawSectionContent(pen, demoSection, sectionTime);

  // Draw navigation
  drawNavigation(pen, demoSection, sectionProgress, time);

  // Update frame counter
  frameCount++;
}
