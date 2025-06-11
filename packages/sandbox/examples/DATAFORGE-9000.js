// Retrofuturistic Vector Terminal - "DATAFORGE-9000"
// A high-fidelity recreation of an alternate history computer terminal

// Persistent state variables
let frameCount = 0;
let lastRenderTime = 0;
let screenAngle = 0;
let powerState = "on";
let bootSequence = 0;
let cursorPosition = 0;
let screenContent = 0;

// Material definitions with distinct visual styles
const MATERIALS = {
  // Brushed metal for main case
  METAL_CASE: {
    name: "BRUSHED TITANIUM",
    color: { r: 0.2, g: 0.8, b: 0.4 }, // Soft green
    dotSize: 4,
    traceGap: 0.12,
    fuzz: 3,
    fuzzSize: 0.05,
    residue: 0.7,
  },
  // Control panel materials
  CONTROLS: {
    name: "CONTROL PANEL",
    color: { r: 0.9, g: 0.7, b: 0.1 }, // Amber
    dotSize: 3.5,
    traceGap: 0.1,
    fuzz: 2,
    fuzzSize: 0.04,
    residue: 0.6,
  },
  // Screen phosphor
  PHOSPHOR: {
    name: "P1 PHOSPHOR",
    color: { r: 0, g: 1.0, b: 0.5 }, // Bright green
    dotSize: 5,
    traceGap: 0.08,
    fuzz: 4,
    fuzzSize: 0.06,
    residue: 1.2,
  },
  // Secondary indicators
  INDICATOR: {
    name: "INDICATOR",
    color: { r: 0.1, g: 0.9, b: 1.0 }, // Cyan-blue
    dotSize: 3,
    traceGap: 0.1,
    fuzz: 3,
    fuzzSize: 0.05,
    residue: 0.8,
  },
  // Red alert/warning indicators
  WARNING: {
    name: "WARNING",
    color: { r: 1.0, g: 0.2, b: 0.1 }, // Red
    dotSize: 3.5,
    traceGap: 0.09,
    fuzz: 2,
    fuzzSize: 0.04,
    residue: 0.5,
  },
  // Dark elements
  DARK: {
    name: "SHADOW",
    color: { r: 0.05, g: 0.2, b: 0.1 }, // Very dark green
    dotSize: 2,
    traceGap: 0.15,
    fuzz: 1,
    fuzzSize: 0.03,
    residue: 0.3,
  },
};

// Apply material settings to pen
function applyMaterial(pen, material) {
  pen
    .colorRGB(material.color.r, material.color.g, material.color.b)
    .dotSize(material.dotSize)
    .traceGap(material.traceGap)
    .fuzz(material.fuzz, material.fuzzSize)
    .residue(material.residue);

  return pen;
}

// Draw terminal case - main structure
function drawTerminalCase(pen) {
  pen.push();

  const dimensions = {
    width: 40,
    depth: 30,
    height: 12,
    screenWidth: 32,
    screenHeight: 24,
    screenDepth: 20,
    screenTilt: 15,
  };

  // Base case - bottom plate
  const basePoints = [
    { x: -dimensions.width / 2, y: 0, z: -dimensions.depth / 2 },
    { x: dimensions.width / 2, y: 0, z: -dimensions.depth / 2 },
    { x: dimensions.width / 2, y: 0, z: dimensions.depth / 2 },
    { x: -dimensions.width / 2, y: 0, z: dimensions.depth / 2 },
    { x: -dimensions.width / 2, y: 0, z: -dimensions.depth / 2 },
  ];

  pen.polyline(basePoints, true);

  // Side walls
  for (let side = -1; side <= 1; side += 2) {
    const x = (side * dimensions.width) / 2;

    // Side panel trapezoid
    pen.polyline(
      [
        { x: x, y: 0, z: -dimensions.depth / 2 },
        { x: x, y: dimensions.height, z: -dimensions.depth / 2 + 5 },
        { x: x, y: dimensions.height, z: dimensions.depth / 2 - 5 },
        { x: x, y: 0, z: dimensions.depth / 2 },
        { x: x, y: 0, z: -dimensions.depth / 2 },
      ],
      true,
    );

    // Side panel details - cooling vents
    for (let z = -dimensions.depth / 3; z <= dimensions.depth / 3; z += 3) {
      pen.polyline(
        [
          { x: x, y: 2, z: z - 1 },
          { x: x, y: 2, z: z + 1 },
          { x: x, y: dimensions.height - 2, z: z + 1 },
          { x: x, y: dimensions.height - 2, z: z - 1 },
          { x: x, y: 2, z: z - 1 },
        ],
        true,
      );
    }
  }

  // Front panel - control area
  pen.polyline(
    [
      { x: -dimensions.width / 2, y: 0, z: -dimensions.depth / 2 },
      {
        x: -dimensions.width / 2,
        y: dimensions.height,
        z: -dimensions.depth / 2 + 5,
      },
      {
        x: dimensions.width / 2,
        y: dimensions.height,
        z: -dimensions.depth / 2 + 5,
      },
      { x: dimensions.width / 2, y: 0, z: -dimensions.depth / 2 },
      { x: -dimensions.width / 2, y: 0, z: -dimensions.depth / 2 },
    ],
    true,
  );

  // Rear panel
  pen.polyline(
    [
      { x: -dimensions.width / 2, y: 0, z: dimensions.depth / 2 },
      {
        x: -dimensions.width / 2,
        y: dimensions.height,
        z: dimensions.depth / 2 - 5,
      },
      {
        x: dimensions.width / 2,
        y: dimensions.height,
        z: dimensions.depth / 2 - 5,
      },
      { x: dimensions.width / 2, y: 0, z: dimensions.depth / 2 },
      { x: -dimensions.width / 2, y: 0, z: dimensions.depth / 2 },
    ],
    true,
  );

  // Top panel - connecting sides
  pen.polyline(
    [
      {
        x: -dimensions.width / 2,
        y: dimensions.height,
        z: -dimensions.depth / 2 + 5,
      },
      {
        x: -dimensions.width / 2,
        y: dimensions.height,
        z: dimensions.depth / 2 - 5,
      },
      {
        x: dimensions.width / 2,
        y: dimensions.height,
        z: dimensions.depth / 2 - 5,
      },
      {
        x: dimensions.width / 2,
        y: dimensions.height,
        z: -dimensions.depth / 2 + 5,
      },
      {
        x: -dimensions.width / 2,
        y: dimensions.height,
        z: -dimensions.depth / 2 + 5,
      },
    ],
    true,
  );

  // Draw feet at corners
  const footHeight = 1.5;
  const footSize = 2;

  for (let x = -1; x <= 1; x += 2) {
    for (let z = -1; z <= 1; z += 2) {
      const footX = x * (dimensions.width / 2 - footSize);
      const footZ = z * (dimensions.depth / 2 - footSize);

      // Foot cylinder
      const footPoints = [];
      const segments = 8;

      for (let i = 0; i <= segments; i++) {
        const angle = (i / segments) * Math.PI * 2;
        footPoints.push({
          x: footX + Math.cos(angle) * footSize,
          y: -footHeight,
          z: footZ + Math.sin(angle) * footSize,
        });
      }

      pen.polyline(footPoints, true);

      // Connect to base
      for (let i = 0; i < segments; i += 2) {
        const angle = (i / segments) * Math.PI * 2;
        const fx = footX + Math.cos(angle) * footSize;
        const fz = footZ + Math.sin(angle) * footSize;

        pen.polyline(
          [
            { x: fx, y: -footHeight, z: fz },
            { x: fx, y: 0, z: fz },
          ],
          false,
        );
      }
    }
  }

  // Draw manufacturer details
  applyMaterial(pen, MATERIALS.INDICATOR);
  scene.text(
    "DATAFORGE-9000",
    { x: -15, y: 5, z: dimensions.depth / 2 - 4.5 },
    1.5,
  );
  scene.text(
    "QUANTUM DYNAMICS CORP",
    { x: -12, y: 3, z: dimensions.depth / 2 - 4.5 },
    0.9,
  );

  // Model details
  applyMaterial(pen, MATERIALS.INDICATOR);
  scene.text(
    "SN: QD-9284-B",
    { x: dimensions.width / 2 - 10, y: 1, z: dimensions.depth / 2 - 1 },
    0.7,
  );

  // Manufacturer logo - stylized "QD" inside hexagon
  const logoSize = 2;
  const logoX = -dimensions.width / 2 + 5;
  const logoY = 5;
  const logoZ = dimensions.depth / 2 - 4.5;

  // Hexagon outline
  const hexPoints = [];
  for (let i = 0; i <= 6; i++) {
    const angle = (i / 6) * Math.PI * 2 + Math.PI / 6;
    hexPoints.push({
      x: logoX + Math.cos(angle) * logoSize,
      y: logoY + Math.sin(angle) * logoSize * 0.8,
      z: logoZ,
    });
  }

  pen.polyline(hexPoints, true);

  // "QD" inside hexagon
  scene.text("QD", { x: logoX - 1, y: logoY - 0.5, z: logoZ }, 0.8);

  pen.pop();
}

// Draw monitor screen housing
function drawScreenHousing(pen, time) {
  pen.push();

  const dims = {
    width: 32,
    height: 24,
    depth: 20,
    tilt: 15, // Degrees
    bezelThickness: 2,
  };

  // Apply tilt angle to screen
  pen.pitch(dims.tilt);

  // Draw outer case
  const casePoints = [
    {
      x: -dims.width / 2 - dims.bezelThickness,
      y: -dims.height / 2 - dims.bezelThickness,
      z: 0,
    },
    {
      x: dims.width / 2 + dims.bezelThickness,
      y: -dims.height / 2 - dims.bezelThickness,
      z: 0,
    },
    {
      x: dims.width / 2 + dims.bezelThickness,
      y: dims.height / 2 + dims.bezelThickness,
      z: 0,
    },
    {
      x: -dims.width / 2 - dims.bezelThickness,
      y: dims.height / 2 + dims.bezelThickness,
      z: 0,
    },
    {
      x: -dims.width / 2 - dims.bezelThickness,
      y: -dims.height / 2 - dims.bezelThickness,
      z: 0,
    },
  ];

  pen.polyline(casePoints, true);

  // Draw screen bezel - inner rectangle
  const bezelPoints = [
    { x: -dims.width / 2, y: -dims.height / 2, z: 0 },
    { x: dims.width / 2, y: -dims.height / 2, z: 0 },
    { x: dims.width / 2, y: dims.height / 2, z: 0 },
    { x: -dims.width / 2, y: dims.height / 2, z: 0 },
    { x: -dims.width / 2, y: -dims.height / 2, z: 0 },
  ];

  pen.polyline(bezelPoints, true);

  // Draw bezel corner details - rounded corners effect
  for (let x = -1; x <= 1; x += 2) {
    for (let y = -1; y <= 1; y += 2) {
      const cornerX = x * (dims.width / 2 + dims.bezelThickness / 2);
      const cornerY = y * (dims.height / 2 + dims.bezelThickness / 2);

      pen.polyline(
        [
          { x: cornerX - (x * dims.bezelThickness) / 2, y: cornerY, z: 0 },
          { x: cornerX, y: cornerY, z: 0 },
          { x: cornerX, y: cornerY - (y * dims.bezelThickness) / 2, z: 0 },
        ],
        false,
      );
    }
  }

  // Draw screen depth - sides of monitor case
  for (let x = -1; x <= 1; x += 2) {
    const sideX = x * (dims.width / 2 + dims.bezelThickness);

    pen.polyline(
      [
        { x: sideX, y: -dims.height / 2 - dims.bezelThickness, z: 0 },
        { x: sideX, y: -dims.height / 2 - dims.bezelThickness, z: -dims.depth },
        { x: sideX, y: dims.height / 2 + dims.bezelThickness, z: -dims.depth },
        { x: sideX, y: dims.height / 2 + dims.bezelThickness, z: 0 },
      ],
      false,
    );
  }

  // Draw top and bottom sides
  for (let y = -1; y <= 1; y += 2) {
    const sideY = y * (dims.height / 2 + dims.bezelThickness);

    pen.polyline(
      [
        { x: -dims.width / 2 - dims.bezelThickness, y: sideY, z: 0 },
        { x: -dims.width / 2 - dims.bezelThickness, y: sideY, z: -dims.depth },
        { x: dims.width / 2 + dims.bezelThickness, y: sideY, z: -dims.depth },
        { x: dims.width / 2 + dims.bezelThickness, y: sideY, z: 0 },
      ],
      false,
    );
  }

  // Draw back panel
  pen.polyline(
    [
      {
        x: -dims.width / 2 - dims.bezelThickness,
        y: -dims.height / 2 - dims.bezelThickness,
        z: -dims.depth,
      },
      {
        x: dims.width / 2 + dims.bezelThickness,
        y: -dims.height / 2 - dims.bezelThickness,
        z: -dims.depth,
      },
      {
        x: dims.width / 2 + dims.bezelThickness,
        y: dims.height / 2 + dims.bezelThickness,
        z: -dims.depth,
      },
      {
        x: -dims.width / 2 - dims.bezelThickness,
        y: dims.height / 2 + dims.bezelThickness,
        z: -dims.depth,
      },
      {
        x: -dims.width / 2 - dims.bezelThickness,
        y: -dims.height / 2 - dims.bezelThickness,
        z: -dims.depth,
      },
    ],
    true,
  );

  // Draw cooling vents on top
  applyMaterial(pen, MATERIALS.DARK);

  for (let x = -dims.width / 3; x <= dims.width / 3; x += 4) {
    pen.polyline(
      [
        {
          x: x - 1.5,
          y: dims.height / 2 + dims.bezelThickness,
          z: -dims.depth / 4,
        },
        {
          x: x + 1.5,
          y: dims.height / 2 + dims.bezelThickness,
          z: -dims.depth / 4,
        },
        {
          x: x + 1.5,
          y: dims.height / 2 + dims.bezelThickness,
          z: -dims.depth / 4 - 3,
        },
        {
          x: x - 1.5,
          y: dims.height / 2 + dims.bezelThickness,
          z: -dims.depth / 4 - 3,
        },
        {
          x: x - 1.5,
          y: dims.height / 2 + dims.bezelThickness,
          z: -dims.depth / 4,
        },
      ],
      true,
    );
  }

  // Screen status LEDs
  applyMaterial(
    pen,
    powerState === "on" ? MATERIALS.INDICATOR : MATERIALS.DARK,
  );

  const ledSize = 0.5;
  const ledSpacing = 3;
  const ledY = dims.height / 2 + dims.bezelThickness - 1;
  const ledZ = -0.2;

  for (let i = 0; i < 3; i++) {
    const ledX = dims.width / 2 + dims.bezelThickness - ledSpacing * (i + 1);

    // LED circle
    const ledPoints = [];
    for (let j = 0; j <= 8; j++) {
      const angle = (j / 8) * Math.PI * 2;
      ledPoints.push({
        x: ledX + Math.cos(angle) * ledSize,
        y: ledY + Math.sin(angle) * ledSize,
        z: ledZ,
      });
    }

    pen.polyline(ledPoints, true);

    // LED label
    const labels = ["PWR", "HDD", "NET"];
    scene.text(labels[i], { x: ledX - 1, y: ledY - 1.2, z: ledZ }, 0.6);
  }

  // Draw adjustment knobs
  applyMaterial(pen, MATERIALS.CONTROLS);

  const knobSize = 0.8;
  const knobY = -dims.height / 2 - dims.bezelThickness + 1;
  const knobZ = -0.2;

  for (let i = 0; i < 3; i++) {
    const knobX = -dims.width / 2 - dims.bezelThickness + 3 + i * 5;

    // Knob circle
    const knobPoints = [];
    for (let j = 0; j <= 8; j++) {
      const angle = (j / 8) * Math.PI * 2;
      knobPoints.push({
        x: knobX + Math.cos(angle) * knobSize,
        y: knobY + Math.sin(angle) * knobSize,
        z: knobZ,
      });
    }

    pen.polyline(knobPoints, true);

    // Knob indicator line
    const knobAngle = (i * 60 + time * 20) % 360;
    const radAngle = (knobAngle * Math.PI) / 180;

    pen.polyline(
      [
        { x: knobX, y: knobY, z: knobZ },
        {
          x: knobX + Math.cos(radAngle) * knobSize,
          y: knobY + Math.sin(radAngle) * knobSize,
          z: knobZ,
        },
      ],
      false,
    );

    // Knob label
    const labels = ["BRT", "CON", "FOC"];
    scene.text(labels[i], { x: knobX - 1, y: knobY - 1.5, z: knobZ }, 0.6);
  }

  pen.pop();
}

// Draw screen content
function drawScreenContent(pen, time) {
  pen.push();

  // Position at front of screen but slightly in front
  pen.pitch(15); // Match screen tilt

  const dims = {
    width: 30, // Slightly smaller than screen bezel
    height: 22,
  };

  applyMaterial(pen, MATERIALS.PHOSPHOR);

  // Draw grid background
  applyMaterial(pen, MATERIALS.DARK);

  // Horizontal grid lines
  for (let y = -dims.height / 2; y <= dims.height / 2; y += 2) {
    pen.polyline(
      [
        { x: -dims.width / 2, y: y, z: 0.1 },
        { x: dims.width / 2, y: y, z: 0.1 },
      ],
      false,
    );
  }

  // Vertical grid lines
  for (let x = -dims.width / 2; x <= dims.width / 2; x += 2) {
    pen.polyline(
      [
        { x: x, y: -dims.height / 2, z: 0.1 },
        { x: x, y: dims.height / 2, z: 0.1 },
      ],
      false,
    );
  }

  // Origin indicator
  pen.polyline(
    [
      { x: -0.5, y: 0, z: 0.1 },
      { x: 0.5, y: 0, z: 0.1 },
    ],
    false,
  );

  pen.polyline(
    [
      { x: 0, y: -0.5, z: 0.1 },
      { x: 0, y: 0.5, z: 0.1 },
    ],
    false,
  );

  // Screen content based on mode
  applyMaterial(pen, MATERIALS.PHOSPHOR);

  if (bootSequence < 1.0) {
    // Draw boot sequence
    const bootProgress = Math.min(bootSequence, 1.0);

    // System initialization text
    scene.text("INITIALIZING SYSTEM", { x: -12, y: 8, z: 0.2 }, 1.2);

    // Progress bar
    const barWidth = 20;
    const progress = barWidth * bootProgress;

    pen.polyline(
      [
        { x: -barWidth / 2, y: 5, z: 0.2 },
        { x: -barWidth / 2 + progress, y: 5, z: 0.2 },
        { x: -barWidth / 2 + progress, y: 6, z: 0.2 },
        { x: -barWidth / 2, y: 6, z: 0.2 },
        { x: -barWidth / 2, y: 5, z: 0.2 },
      ],
      true,
    );

    // Status messages based on boot progress
    const statusMessages = [
      "SYSTEM BIOS V9.5.2",
      "CPU DIAGNOSTICS COMPLETE",
      "MEMORY CHECK: 576K OK",
      "INITIALIZING QUANTUM CORE",
      "LOADING DATAFORGE OS V3.7",
    ];

    const messageCount = Math.floor(bootProgress * statusMessages.length);

    for (let i = 0; i < messageCount; i++) {
      scene.text(statusMessages[i], { x: -12, y: 2 - i * 2, z: 0.2 }, 0.9);
    }

    // If boot almost complete, add 'READY' message
    if (bootProgress > 0.95) {
      applyMaterial(pen, MATERIALS.INDICATOR);
      scene.text("SYSTEM READY", { x: -6, y: -6, z: 0.2 }, 1.2);
    }
  } else {
    // Main display content - oscilloscope patterns
    // Choose pattern based on time
    const pattern = Math.floor(time / 5) % 3;

    if (pattern === 0) {
      // Lissajous pattern
      const points = [];
      const steps = 100;
      const a = 3 + Math.sin(time * 0.2);
      const b = 2 + Math.cos(time * 0.3);
      const amplitude = 8;

      for (let i = 0; i <= steps; i++) {
        const t = (i / steps) * Math.PI * 2;
        points.push({
          x: Math.sin(a * t + time) * amplitude,
          y: Math.sin(b * t) * amplitude,
          z: 0.2,
        });
      }

      pen.polyline(points, false);

      // Pattern info
      applyMaterial(pen, MATERIALS.INDICATOR);
      scene.text(
        "LISSAJOUS PATTERN",
        { x: -10, y: -dims.height / 2 + 2, z: 0.2 },
        1,
      );
      scene.text(
        `A=${a.toFixed(2)} B=${b.toFixed(2)}`,
        { x: -8, y: -dims.height / 2 + 4, z: 0.2 },
        0.8,
      );
    } else if (pattern === 1) {
      // Sine wave patterns
      for (let phase = 0; phase < Math.PI * 2; phase += Math.PI / 2) {
        const points = [];
        const steps = 120;

        for (let i = 0; i <= steps; i++) {
          const x = -dims.width / 2 + (dims.width * i) / steps;
          const freq = 0.3 + 0.1 * Math.sin(time * 0.2);
          const amplitude = 5 + 2 * Math.cos(time * 0.3 + phase);

          points.push({
            x: x,
            y: Math.sin(x * freq + time + phase) * amplitude,
            z: 0.2,
          });
        }

        pen.polyline(points, false);
      }

      // Pattern info
      applyMaterial(pen, MATERIALS.INDICATOR);
      scene.text(
        "WAVEFORM ANALYSIS",
        { x: -10, y: -dims.height / 2 + 2, z: 0.2 },
        1,
      );
      const freq = (0.3 + 0.1 * Math.sin(time * 0.2)) * 10;
      scene.text(
        `FREQ=${freq.toFixed(2)}Hz`,
        { x: -8, y: -dims.height / 2 + 4, z: 0.2 },
        0.8,
      );
    } else {
      // Spiral pattern
      const spiralPoints = [];
      const spiralSteps = 150;
      const spiralTurns = 5 + Math.sin(time * 0.1) * 2;
      const maxRadius = 10;

      for (let i = 0; i <= spiralSteps; i++) {
        const t = i / spiralSteps;
        const angle = t * Math.PI * 2 * spiralTurns + time;
        const radius = t * maxRadius;

        spiralPoints.push({
          x: Math.cos(angle) * radius,
          y: Math.sin(angle) * radius,
          z: 0.2,
        });
      }

      pen.polyline(spiralPoints, false);

      // Add circular markers
      for (let r = 2; r <= maxRadius; r += 2) {
        const circlePoints = [];
        const circleSteps = 40;

        for (let i = 0; i <= circleSteps; i++) {
          const angle = (i / circleSteps) * Math.PI * 2;

          circlePoints.push({
            x: Math.cos(angle) * r,
            y: Math.sin(angle) * r,
            z: 0.2,
          });
        }

        // Use darker color for markers
        applyMaterial(pen, MATERIALS.DARK);
        pen.polyline(circlePoints, true);
      }

      // Pattern info
      applyMaterial(pen, MATERIALS.INDICATOR);
      scene.text("SPIRAL SCAN", { x: -6, y: -dims.height / 2 + 2, z: 0.2 }, 1);
      scene.text(
        `TURNS=${spiralTurns.toFixed(1)}`,
        { x: -8, y: -dims.height / 2 + 4, z: 0.2 },
        0.8,
      );
    }

    // Add system info overlay in corner
    applyMaterial(pen, MATERIALS.CONTROLS);

    // Current time
    const sysTime = Math.floor(time);
    const minutes = Math.floor(sysTime / 60);
    const seconds = sysTime % 60;
    const timeString = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

    scene.text(
      `SYS: ${timeString}`,
      { x: dims.width / 2 - 10, y: dims.height / 2 - 2, z: 0.2 },
      0.8,
    );

    // System status
    const statusIndicators = ["CPU: NORMAL", "MEM: 87%", "QBT: STABLE"];

    for (let i = 0; i < statusIndicators.length; i++) {
      scene.text(
        statusIndicators[i],
        { x: dims.width / 2 - 10, y: dims.height / 2 - 4 - i * 1.5, z: 0.2 },
        0.7,
      );
    }

    // Blinking cursor in command area
    const showCursor = Math.sin(time * 5) > 0;

    applyMaterial(pen, MATERIALS.PHOSPHOR);
    scene.text(
      "CMD>",
      { x: -dims.width / 2 + 2, y: -dims.height / 2 + 2, z: 0.2 },
      0.8,
    );

    if (showCursor) {
      pen.polyline(
        [
          { x: -dims.width / 2 + 6, y: -dims.height / 2 + 2, z: 0.2 },
          { x: -dims.width / 2 + 6, y: -dims.height / 2 + 3, z: 0.2 },
        ],
        false,
      );
    }
  }

  pen.pop();
}

// Draw control panel with buttons and indicators
function drawControlPanel(pen, time) {
  pen.push();

  // Position control panel at front of case
  pen.moveTo(0, 6, -14);

  const panelWidth = 38;
  const panelHeight = 10;

  // Panel background
  applyMaterial(pen, MATERIALS.DARK);
  pen.polyline(
    [
      { x: -panelWidth / 2, y: 0, z: 0 },
      { x: panelWidth / 2, y: 0, z: 0 },
      { x: panelWidth / 2, y: -panelHeight, z: 0 },
      { x: -panelWidth / 2, y: -panelHeight, z: 0 },
      { x: -panelWidth / 2, y: 0, z: 0 },
    ],
    true,
  );

  // Draw row of function keys
  applyMaterial(pen, MATERIALS.CONTROLS);

  const keyCount = 8;
  const keyWidth = 3;
  const keyHeight = 2;
  const keySpacing = 4.5;
  const keyRowY = -2;

  for (let i = 0; i < keyCount; i++) {
    const keyX = -panelWidth / 2 + 5 + i * keySpacing;

    // Key rectangle
    pen.polyline(
      [
        { x: keyX - keyWidth / 2, y: keyRowY - keyHeight / 2, z: 0.1 },
        { x: keyX + keyWidth / 2, y: keyRowY - keyHeight / 2, z: 0.1 },
        { x: keyX + keyWidth / 2, y: keyRowY + keyHeight / 2, z: 0.1 },
        { x: keyX - keyWidth / 2, y: keyRowY + keyHeight / 2, z: 0.1 },
        { x: keyX - keyWidth / 2, y: keyRowY - keyHeight / 2, z: 0.1 },
      ],
      true,
    );

    // Function key labels
    scene.text(`F${i + 1}`, { x: keyX - 0.8, y: keyRowY - 0.6, z: 0.2 }, 0.9);
  }

  // Draw large control buttons
  const controlButtons = [
    { label: "INIT", x: -panelWidth / 2 + 6, y: -6, state: "off" },
    { label: "RUN", x: -panelWidth / 2 + 13, y: -6, state: "on" },
    { label: "DEBUG", x: -panelWidth / 2 + 20, y: -6, state: "off" },
    { label: "RESET", x: -panelWidth / 2 + 27, y: -6, state: "off" },
  ];

  for (const button of controlButtons) {
    // Use appropriate color based on button state
    if (button.state === "on") {
      applyMaterial(pen, MATERIALS.INDICATOR);
    } else {
      applyMaterial(pen, MATERIALS.CONTROLS);
    }

    // Button rectangle with rounded corners
    const btnWidth = 5;
    const btnHeight = 2.5;

    // Base rectangle
    pen.polyline(
      [
        { x: button.x - btnWidth / 2, y: button.y - btnHeight / 2, z: 0.1 },
        { x: button.x + btnWidth / 2, y: button.y - btnHeight / 2, z: 0.1 },
        { x: button.x + btnWidth / 2, y: button.y + btnHeight / 2, z: 0.1 },
        { x: button.x - btnWidth / 2, y: button.y + btnHeight / 2, z: 0.1 },
        { x: button.x - btnWidth / 2, y: button.y - btnHeight / 2, z: 0.1 },
      ],
      true,
    );

    // Button label
    scene.text(
      button.label,
      { x: button.x - btnWidth / 2 + 0.5, y: button.y - 0.5, z: 0.2 },
      0.9,
    );
  }

  // Draw rotary dial and status indicators
  applyMaterial(pen, MATERIALS.CONTROLS);

  // Rotary mode selector
  const dialRadius = 3;
  const dialX = panelWidth / 2 - 10;
  const dialY = -5;

  // Dial circle
  const dialPoints = [];
  for (let i = 0; i <= 16; i++) {
    const angle = (i / 16) * Math.PI * 2;
    dialPoints.push({
      x: dialX + Math.cos(angle) * dialRadius,
      y: dialY + Math.sin(angle) * dialRadius,
      z: 0.1,
    });
  }

  pen.polyline(dialPoints, true);

  // Dial modes around the circle
  const modes = ["DIAG", "STBY", "NORM", "ADV", "PROG"];

  for (let i = 0; i < modes.length; i++) {
    const angle = (i / modes.length) * Math.PI * 2 - Math.PI / 2;
    const labelX = dialX + Math.cos(angle) * (dialRadius + 1.5);
    const labelY = dialY + Math.sin(angle) * (dialRadius + 1.5);

    scene.text(modes[i], { x: labelX - 1.5, y: labelY - 0.5, z: 0.2 }, 0.7);

    // Tick marks
    const innerX = dialX + Math.cos(angle) * (dialRadius - 0.5);
    const innerY = dialY + Math.sin(angle) * (dialRadius - 0.5);
    const outerX = dialX + Math.cos(angle) * dialRadius;
    const outerY = dialY + Math.sin(angle) * dialRadius;

    pen.polyline(
      [
        { x: innerX, y: innerY, z: 0.1 },
        { x: outerX, y: outerY, z: 0.1 },
      ],
      false,
    );
  }

  // Dial position indicator (rotates slowly)
  const dialPosition = 2; // NORM mode
  const posAngle = (dialPosition / modes.length) * Math.PI * 2 - Math.PI / 2;

  applyMaterial(pen, MATERIALS.INDICATOR);
  pen.polyline(
    [
      { x: dialX, y: dialY, z: 0.2 },
      {
        x: dialX + Math.cos(posAngle) * dialRadius,
        y: dialY + Math.sin(posAngle) * dialRadius,
        z: 0.2,
      },
    ],
    false,
  );

  // Status indicators - LED array
  const ledCount = 6;
  const ledSpacing = 3;
  const ledY = -8;

  for (let i = 0; i < ledCount; i++) {
    const ledX = panelWidth / 2 - 6 - i * ledSpacing;

    // LED state based on pattern
    const ledOn = (i + Math.floor(time)) % 3 === 0;

    if (ledOn) {
      applyMaterial(
        pen,
        i % 3 === 0
          ? MATERIALS.INDICATOR
          : i % 3 === 1
            ? MATERIALS.WARNING
            : MATERIALS.PHOSPHOR,
      );
    } else {
      applyMaterial(pen, MATERIALS.DARK);
    }

    // LED circle
    const ledPoints = [];
    for (let j = 0; j <= 8; j++) {
      const angle = (j / 8) * Math.PI * 2;
      ledPoints.push({
        x: ledX + Math.cos(angle) * 0.8,
        y: ledY + Math.sin(angle) * 0.8,
        z: 0.2,
      });
    }

    pen.polyline(ledPoints, true);
  }

  // Labels for status indicators
  applyMaterial(pen, MATERIALS.CONTROLS);
  scene.text(
    "SYSTEM STATUS",
    { x: panelWidth / 2 - 18, y: ledY - 2, z: 0.2 },
    0.8,
  );

  // Data port - rectangular with connector details
  applyMaterial(pen, MATERIALS.DARK);

  const portWidth = 5;
  const portHeight = 2;
  const portX = -panelWidth / 2 + 15;
  const portY = -8;

  pen.polyline(
    [
      { x: portX - portWidth / 2, y: portY - portHeight / 2, z: 0.1 },
      { x: portX + portWidth / 2, y: portY - portHeight / 2, z: 0.1 },
      { x: portX + portWidth / 2, y: portY + portHeight / 2, z: 0.1 },
      { x: portX - portWidth / 2, y: portY + portHeight / 2, z: 0.1 },
      { x: portX - portWidth / 2, y: portY - portHeight / 2, z: 0.1 },
    ],
    true,
  );

  // Connector details - pin holes
  for (let i = 0; i < 8; i++) {
    const pinX = portX - portWidth / 2 + 0.8 + i * 0.6;

    pen.polyline(
      [
        { x: pinX, y: portY - 0.5, z: 0.2 },
        { x: pinX, y: portY + 0.5, z: 0.2 },
      ],
      false,
    );
  }

  // Port label
  applyMaterial(pen, MATERIALS.CONTROLS);
  scene.text("DATA I/O", { x: portX - 2.5, y: portY + 1.5, z: 0.2 }, 0.7);

  pen.pop();
}

// Draw connector panel on the rear of the terminal
function drawConnectorPanel(pen) {
  pen.push();

  // Position at back of case
  pen.moveTo(0, 6, 14);

  const panelWidth = 36;
  const panelHeight = 10;

  // Panel background
  applyMaterial(pen, MATERIALS.DARK);
  pen.polyline(
    [
      { x: -panelWidth / 2, y: 0, z: 0 },
      { x: panelWidth / 2, y: 0, z: 0 },
      { x: panelWidth / 2, y: -panelHeight, z: 0 },
      { x: -panelWidth / 2, y: -panelHeight, z: 0 },
      { x: -panelWidth / 2, y: 0, z: 0 },
    ],
    true,
  );

  // Connector types
  const connectors = [
    {
      type: "power",
      x: -panelWidth / 2 + 5,
      y: -3,
      width: 4,
      height: 4,
      label: "POWER",
    },
    {
      type: "serial",
      x: -panelWidth / 2 + 14,
      y: -3,
      width: 6,
      height: 3,
      label: "SERIAL",
    },
    {
      type: "network",
      x: -panelWidth / 2 + 24,
      y: -3,
      width: 3,
      height: 3,
      label: "NETWORK",
    },
    {
      type: "expansion",
      x: -panelWidth / 2 + 32,
      y: -3,
      width: 6,
      height: 6,
      label: "EXPANSION",
    },
  ];

  // Draw each connector
  for (const conn of connectors) {
    // Connector outline
    if (conn.type === "power") {
      // Circular power connector
      const powerPoints = [];
      for (let i = 0; i <= 16; i++) {
        const angle = (i / 16) * Math.PI * 2;
        powerPoints.push({
          x: conn.x + (Math.cos(angle) * conn.width) / 2,
          y: conn.y + (Math.sin(angle) * conn.width) / 2,
          z: 0.1,
        });
      }

      pen.polyline(powerPoints, true);

      // Power connector details - central pin
      const pinPoints = [];
      for (let i = 0; i <= 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        pinPoints.push({
          x: conn.x + Math.cos(angle) * 0.8,
          y: conn.y + Math.sin(angle) * 0.8,
          z: 0.2,
        });
      }

      pen.polyline(pinPoints, true);
    } else if (conn.type === "serial") {
      // D-sub style connector
      const topPoints = [];
      const bottomPoints = [];

      for (let i = 0; i <= 8; i++) {
        const t = i / 8;
        const x = conn.x - conn.width / 2 + t * conn.width;

        // Top curved edge
        topPoints.push({
          x: x,
          y: conn.y + conn.height / 2 - 0.5 * Math.sin(t * Math.PI),
          z: 0.1,
        });

        // Bottom edge
        bottomPoints.push({
          x: x,
          y: conn.y - conn.height / 2,
          z: 0.1,
        });
      }

      // Connect the points
      const allPoints = [...topPoints, ...bottomPoints.reverse(), topPoints[0]];

      pen.polyline(allPoints, false);

      // Add pin details
      for (let row = 0; row < 2; row++) {
        for (let col = 0; col < 4; col++) {
          const pinX = conn.x - conn.width / 3 + (col * conn.width) / 3;
          const pinY = conn.y - conn.height / 4 + (row * conn.height) / 2;

          const pinPoints = [];
          for (let i = 0; i <= 6; i++) {
            const angle = (i / 6) * Math.PI * 2;
            pinPoints.push({
              x: pinX + Math.cos(angle) * 0.3,
              y: pinY + Math.sin(angle) * 0.3,
              z: 0.2,
            });
          }

          pen.polyline(pinPoints, true);
        }
      }
    } else if (conn.type === "network") {
      // RJ-style connector
      pen.polyline(
        [
          { x: conn.x - conn.width / 2, y: conn.y - conn.height / 2, z: 0.1 },
          { x: conn.x + conn.width / 2, y: conn.y - conn.height / 2, z: 0.1 },
          { x: conn.x + conn.width / 2, y: conn.y + conn.height / 2, z: 0.1 },
          { x: conn.x - conn.width / 2, y: conn.y + conn.height / 2, z: 0.1 },
          { x: conn.x - conn.width / 2, y: conn.y - conn.height / 2, z: 0.1 },
        ],
        true,
      );

      // Connection details
      for (let i = 0; i < 4; i++) {
        const lineY = conn.y - conn.height / 3 + (i * conn.height) / 4;

        pen.polyline(
          [
            { x: conn.x - conn.width / 3, y: lineY, z: 0.2 },
            { x: conn.x + conn.width / 3, y: lineY, z: 0.2 },
          ],
          false,
        );
      }
    } else if (conn.type === "expansion") {
      // Card-edge style connector
      pen.polyline(
        [
          { x: conn.x - conn.width / 2, y: conn.y - conn.height / 2, z: 0.1 },
          { x: conn.x + conn.width / 2, y: conn.y - conn.height / 2, z: 0.1 },
          { x: conn.x + conn.width / 2, y: conn.y + conn.height / 2, z: 0.1 },
          { x: conn.x - conn.width / 2, y: conn.y + conn.height / 2, z: 0.1 },
          { x: conn.x - conn.width / 2, y: conn.y - conn.height / 2, z: 0.1 },
        ],
        true,
      );

      // Connection pins
      for (let i = 0; i < 8; i++) {
        const pinX = conn.x - conn.width / 2 + 0.5 + (i * conn.width) / 8;

        pen.polyline(
          [
            { x: pinX, y: conn.y - conn.height / 3, z: 0.2 },
            { x: pinX, y: conn.y + conn.height / 3, z: 0.2 },
          ],
          false,
        );
      }
    }

    // Connector label
    applyMaterial(pen, MATERIALS.CONTROLS);
    scene.text(
      conn.label,
      {
        x: conn.x - conn.label.length * 0.3,
        y: conn.y - conn.height / 2 - 1,
        z: 0.2,
      },
      0.7,
    );
  }

  // Ventilation grille
  applyMaterial(pen, MATERIALS.DARK);

  const grillX = 0;
  const grillY = -panelHeight + 4;
  const grillWidth = 20;
  const grillHeight = 3;

  // Grille outline
  pen.polyline(
    [
      { x: grillX - grillWidth / 2, y: grillY - grillHeight / 2, z: 0.1 },
      { x: grillX + grillWidth / 2, y: grillY - grillHeight / 2, z: 0.1 },
      { x: grillX + grillWidth / 2, y: grillY + grillHeight / 2, z: 0.1 },
      { x: grillX - grillWidth / 2, y: grillY + grillHeight / 2, z: 0.1 },
      { x: grillX - grillWidth / 2, y: grillY - grillHeight / 2, z: 0.1 },
    ],
    true,
  );

  // Grille slats
  for (let i = 0; i < 10; i++) {
    const slatX = grillX - grillWidth / 2 + 1 + (i * grillWidth) / 10;

    pen.polyline(
      [
        { x: slatX, y: grillY - grillHeight / 2, z: 0.1 },
        { x: slatX, y: grillY + grillHeight / 2, z: 0.1 },
      ],
      false,
    );
  }

  // Caution warning
  applyMaterial(pen, MATERIALS.WARNING);
  scene.text(
    "CAUTION: HIGH VOLTAGE",
    { x: grillX - 8, y: grillY + grillHeight / 2 + 1, z: 0.2 },
    0.7,
  );

  pen.pop();
}

// Main program function
function program(pen, scene, time) {
  // Initialize on first frame
  if (frameCount === 0) {
    scene.setBGColor(0x000005); // Almost black background
    bootSequence = 0;

    // Set initial camera position for a good view
    scene.setCamera({ x: 0, y: 20, z: 80 }, { x: 0, y: 5, z: 0 });
  }

  // Update boot sequence progress
  if (bootSequence < 1.2) {
    bootSequence += 0.01;
  }

  // Rotate view angle for demonstration
  const viewAngle = (time * 5) % 360;
  if (frameCount % 240 === 0) {
    // Every few seconds, change the camera angle
    const radius = 60;
    const height = 20 + Math.sin(time * 0.1) * 10;
    // orbitCamera({ x: 0, y: 5, z: 0 }, radius, viewAngle, 15);
  }

  // Draw terminal components

  // 1. Main case
  applyMaterial(pen, MATERIALS.METAL_CASE);
  drawTerminalCase(pen);

  // 2. Main screen housing
  applyMaterial(pen, MATERIALS.METAL_CASE);
  pen.push();
  pen.moveTo(0, 12, 0);
  drawScreenHousing(pen, time);
  pen.pop();

  // 3. Screen content
  applyMaterial(pen, MATERIALS.PHOSPHOR);
  pen.push();
  pen.moveTo(0, 12, 0);
  drawScreenContent(pen, time);
  pen.pop();

  // 4. Control panel
  applyMaterial(pen, MATERIALS.CONTROLS);
  drawControlPanel(pen, time);

  // 5. Connector panel on rear
  applyMaterial(pen, MATERIALS.METAL_CASE);
  drawConnectorPanel(pen);

  // Update frame counter
  frameCount++;
}
