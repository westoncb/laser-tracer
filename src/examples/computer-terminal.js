// Vector Computer Terminal with CAD Interface
// A detailed retro-futuristic computer with interactive vector display

// State variables
let frameCount = 0;
let lastRenderTime = 0;
let powerState = false;
let bootProgress = 0;
let screenMode = "boot"; // boot, grid, cad, terminal
let screenRotation = 0;
let cursorPosition = { x: 0, y: 0 };
let focusedComponent = null;
let keyboardAnimation = 0;
let diskAnimation = 0;

// Material definitions
const MATERIALS = {
  CASING: {
    name: "COMPUTER HOUSING",
    color: { r: 0.2, g: 0.6, b: 1.0 },  // Blue-tinted
    dotSize: 4,
    traceGap: 0.15,
    fuzz: 2,
    fuzzSize: 0.05,
    residue: 0.8
  },
  SCREEN: {
    name: "DISPLAY",
    color: { r: 0, g: 0.9, b: 0.4 },  // Green phosphor
    dotSize: 3,
    traceGap: 0.1,
    fuzz: 3,
    fuzzSize: 0.08,
    residue: 1.0
  },
  GRID: {
    name: "GRID",
    color: { r: 0, g: 0.7, b: 0.3 },  // Darker green
    dotSize: 2,
    traceGap: 0.3,
    fuzz: 1,
    fuzzSize: 0.04,
    residue: 0.6
  },
  KEYBOARD: {
    name: "KEYBOARD",
    color: { r: 0.8, g: 0.8, b: 1.0 },  // Light purple
    dotSize: 3,
    traceGap: 0.1,
    fuzz: 2,
    fuzzSize: 0.05,
    residue: 0.7
  },
  HIGHLIGHT: {
    name: "HIGHLIGHT",
    color: { r: 1, g: 1, b: 1 },  // White
    dotSize: 5,
    traceGap: 0.08,
    fuzz: 4,
    fuzzSize: 0.1,
    residue: 1.2
  },
  WARNING: {
    name: "WARNING",
    color: { r: 1, g: 0.5, b: 0 },  // Orange
    dotSize: 4,
    traceGap: 0.1,
    fuzz: 3,
    fuzzSize: 0.08,
    residue: 0.9
  },
  LABELS: {
    name: "LABELS",
    color: { r: 1, g: 0.9, b: 0.1 },  // Yellow
    dotSize: 3,
    traceGap: 0.1,
    fuzz: 2,
    fuzzSize: 0.03,
    residue: 0.5
  },
  PLATONIC: {
    name: "CAD_OBJECT",
    color: { r: 1, g: 1, b: 0.5 },  // Pale yellow
    dotSize: 2.5,
    traceGap: 0.15,
    fuzz: 1,
    fuzzSize: 0.03,
    residue: 0.6
  }
};

// Apply material settings to pen
function applyMaterial(pen, material, intensity = 1.0) {
  pen.colorRGB(
    material.color.r * intensity,
    material.color.g * intensity,
    material.color.b * intensity
  )
  .dotSize(material.dotSize)
  .traceGap(material.traceGap)
  .fuzz(material.fuzz, material.fuzzSize)
  .residue(material.residue);
  
  return pen;
}

// Animation helpers
function easeInOut(t) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

// Draw the computer monitor
function drawMonitor(pen, highlight = false) {
  pen.push();
  
  // Apply appropriate material
  if (highlight) {
    applyMaterial(pen, MATERIALS.HIGHLIGHT);
  } else {
    applyMaterial(pen, MATERIALS.CASING);
  }
  
  // Monitor dimensions
  const monitorWidth = 30;
  const monitorHeight = 24;
  const monitorDepth = 25;
  const bezelSize = 2;
  
  // Draw monitor front bezel
  pen.polyline([
    { x: -monitorWidth/2 - bezelSize, y: -monitorHeight/2 - bezelSize, z: 0 },
    { x: monitorWidth/2 + bezelSize, y: -monitorHeight/2 - bezelSize, z: 0 },
    { x: monitorWidth/2 + bezelSize, y: monitorHeight/2 + bezelSize, z: 0 },
    { x: -monitorWidth/2 - bezelSize, y: monitorHeight/2 + bezelSize, z: 0 },
    { x: -monitorWidth/2 - bezelSize, y: -monitorHeight/2 - bezelSize, z: 0 }
  ], false);
  
  // Draw screen inset
  pen.polyline([
    { x: -monitorWidth/2, y: -monitorHeight/2, z: 0 },
    { x: monitorWidth/2, y: -monitorHeight/2, z: 0 },
    { x: monitorWidth/2, y: monitorHeight/2, z: 0 },
    { x: -monitorWidth/2, y: monitorHeight/2, z: 0 },
    { x: -monitorWidth/2, y: -monitorHeight/2, z: 0 }
  ], false);
  
  // Draw monitor sides
  pen.polyline([
    { x: -monitorWidth/2 - bezelSize, y: -monitorHeight/2 - bezelSize, z: 0 },
    { x: -monitorWidth/2 - bezelSize, y: -monitorHeight/2 - bezelSize, z: -monitorDepth }
  ], false);
  
  pen.polyline([
    { x: monitorWidth/2 + bezelSize, y: -monitorHeight/2 - bezelSize, z: 0 },
    { x: monitorWidth/2 + bezelSize, y: -monitorHeight/2 - bezelSize, z: -monitorDepth }
  ], false);
  
  pen.polyline([
    { x: monitorWidth/2 + bezelSize, y: monitorHeight/2 + bezelSize, z: 0 },
    { x: monitorWidth/2 + bezelSize, y: monitorHeight/2 + bezelSize, z: -monitorDepth }
  ], false);
  
  pen.polyline([
    { x: -monitorWidth/2 - bezelSize, y: monitorHeight/2 + bezelSize, z: 0 },
    { x: -monitorWidth/2 - bezelSize, y: monitorHeight/2 + bezelSize, z: -monitorDepth }
  ], false);
  
  // Draw monitor back
  pen.polyline([
    { x: -monitorWidth/2 - bezelSize, y: -monitorHeight/2 - bezelSize, z: -monitorDepth },
    { x: monitorWidth/2 + bezelSize, y: -monitorHeight/2 - bezelSize, z: -monitorDepth },
    { x: monitorWidth/2 + bezelSize, y: monitorHeight/2 + bezelSize, z: -monitorDepth },
    { x: -monitorWidth/2 - bezelSize, y: monitorHeight/2 + bezelSize, z: -monitorDepth },
    { x: -monitorWidth/2 - bezelSize, y: -monitorHeight/2 - bezelSize, z: -monitorDepth }
  ], false);
  
  // Draw monitor stand
  const standWidth = 12;
  const standHeight = 5;
  const standDepth = 8;
  
  pen.polyline([
    { x: -standWidth/2, y: monitorHeight/2 + bezelSize, z: 0 },
    { x: standWidth/2, y: monitorHeight/2 + bezelSize, z: 0 },
    { x: standWidth/2, y: monitorHeight/2 + bezelSize + standHeight, z: 0 },
    { x: -standWidth/2, y: monitorHeight/2 + bezelSize + standHeight, z: 0 },
    { x: -standWidth/2, y: monitorHeight/2 + bezelSize, z: 0 }
  ], false);
  
  // Stand sides
  pen.polyline([
    { x: -standWidth/2, y: monitorHeight/2 + bezelSize, z: 0 },
    { x: -standWidth/2, y: monitorHeight/2 + bezelSize, z: -standDepth }
  ], false);
  
  pen.polyline([
    { x: standWidth/2, y: monitorHeight/2 + bezelSize, z: 0 },
    { x: standWidth/2, y: monitorHeight/2 + bezelSize, z: -standDepth }
  ], false);
  
  pen.polyline([
    { x: standWidth/2, y: monitorHeight/2 + bezelSize + standHeight, z: 0 },
    { x: standWidth/2, y: monitorHeight/2 + bezelSize + standHeight, z: -standDepth }
  ], false);
  
  pen.polyline([
    { x: -standWidth/2, y: monitorHeight/2 + bezelSize + standHeight, z: 0 },
    { x: -standWidth/2, y: monitorHeight/2 + bezelSize + standHeight, z: -standDepth }
  ], false);
  
  // Stand back
  pen.polyline([
    { x: -standWidth/2, y: monitorHeight/2 + bezelSize, z: -standDepth },
    { x: standWidth/2, y: monitorHeight/2 + bezelSize, z: -standDepth },
    { x: standWidth/2, y: monitorHeight/2 + bezelSize + standHeight, z: -standDepth },
    { x: -standWidth/2, y: monitorHeight/2 + bezelSize + standHeight, z: -standDepth },
    { x: -standWidth/2, y: monitorHeight/2 + bezelSize, z: -standDepth }
  ], false);
  
  // Add monitor controls and details
  if (!highlight) {
    applyMaterial(pen, MATERIALS.KEYBOARD);
  }
  
  // Control knobs on right side of monitor
  for (let i = 0; i < 3; i++) {
    const y = -monitorHeight/4 + i * monitorHeight/4;
    
    // Knob base
    pen.polyline([
      { x: monitorWidth/2 + bezelSize, y: y - 0.8, z: -monitorDepth/4 },
      { x: monitorWidth/2 + bezelSize, y: y + 0.8, z: -monitorDepth/4 },
      { x: monitorWidth/2 + bezelSize + 1.5, y: y + 0.8, z: -monitorDepth/4 },
      { x: monitorWidth/2 + bezelSize + 1.5, y: y - 0.8, z: -monitorDepth/4 },
      { x: monitorWidth/2 + bezelSize, y: y - 0.8, z: -monitorDepth/4 }
    ], false);
    
    // Knob
    const knobPoints = [];
    const segments = 8;
    for (let j = 0; j <= segments; j++) {
      const angle = (j / segments) * Math.PI * 2;
      knobPoints.push({
        x: monitorWidth/2 + bezelSize + 2.2,
        y: y + Math.sin(angle) * 0.6,
        z: -monitorDepth/4 + Math.cos(angle) * 0.6
      });
    }
    pen.polyline(knobPoints, true);
    
    // Indicator line on knob
    const rotation = i * Math.PI / 4;
    pen.polyline([
      { x: monitorWidth/2 + bezelSize + 2.2, y: y, z: -monitorDepth/4 },
      { x: monitorWidth/2 + bezelSize + 2.2, 
        y: y + Math.sin(rotation) * 0.5, 
        z: -monitorDepth/4 + Math.cos(rotation) * 0.5 }
    ], false);
  }
  
  // Power indicator light
  if (powerState) {
    applyMaterial(pen, MATERIALS.WARNING);
    const blinkIntensity = 0.5 + Math.sin(Date.now() * 0.005) * 0.3;
    pen.colorRGB(1 * blinkIntensity, 0.3 * blinkIntensity, 0.1 * blinkIntensity);
  } else {
    applyMaterial(pen, MATERIALS.CASING, 0.5);
  }
  
  pen.moveTo(monitorWidth/2 + bezelSize - 1, monitorHeight/2 + bezelSize - 1, 0);
  pen.dotSize(5).fuzz(4, 0.1);
  pen.dot();
  
  pen.pop();
  
  return pen;
}

// Draw terminal mode
function drawTerminalMode(pen, time, width, height) {
  // Apply screen material
  applyMaterial(pen, MATERIALS.SCREEN);
  
  // Terminal header
  draw.text("VECTOR OS v3.14.15 - TERMINAL", { x: 0, y: height/2 - 2, z: 0 }, 0.9);
  
  // Command prompt lines
  const commands = [
    "> SYSTEM.INFO",
    "VECTOR PROCESSING UNIT: ONLINE",
    "MEMORY: 64K VECTORS AVAILABLE",
    "DISPLAY: 1024x768 VECTOR RESOLUTION",
    "",
    "> DIR /MODELS",
    "TETRAHEDRON.VEC    512 BYTES",
    "CUBE.VEC          1024 BYTES",
    "OCTAHEDRON.VEC     768 BYTES",
    "DODECAHEDRON.VEC  3072 BYTES",
    "ICOSAHEDRON.VEC   2560 BYTES",
    "",
    "> RENDER CUBE.VEC"
  ];
  
  // Calculate visible lines based on time
  const visibleLines = Math.min(commands.length, Math.floor((time - 20) * 2));
  
  // Draw terminal text
  for (let i = 0; i < visibleLines; i++) {
    draw.text(commands[i], { x: -width/2 + 3, y: height/2 - 5 - i * 1.5, z: 0 }, 0.7);
  }
  
  // Draw cursor
  if (visibleLines >= commands.length) {
    const cursorBlink = Math.sin(time * 5) > 0;
    if (cursorBlink) {
      draw.text("_", { x: -width/2 + 3 + commands[commands.length-1].length * 0.42, y: height/2 - 5 - (commands.length-1) * 1.5, z: 0 }, 0.7);
    }
    
    // Draw small cube if last command is fully visible
    if (visibleLines >= commands.length) {
      pen.push();
      pen.moveBy(width/4, 0, 0);
      pen.dotSize(3);
      applyMaterial(pen, MATERIALS.PLATONIC);
      pen.yaw(time * 30);
      pen.pitch(time * 20);
      drawCube(pen, 1);
      pen.pop();
    }
  }
  
  // Status bar
  draw.text("READY | MEMORY: 64K | DISK: 1.2MB FREE", { x: 0, y: -height/2 + 2, z: 0 }, 0.6);
  
  // Switch back to grid mode to loop
  if (time > 35 && screenMode === "terminal") {
    screenMode = "grid";
  }
}

// Draw screen content
function drawScreen(pen, time) {
  pen.push();
  
  // Position at the screen surface
  pen.moveBy(0, 0, 0.1);
  
  // Screen dimensions (slightly smaller than the bezel inset)
  const screenWidth = 29;
  const screenHeight = 23;
  
  // Apply screen material
  applyMaterial(pen, MATERIALS.SCREEN);
  
  // Draw content based on screen mode
  switch(screenMode) {
    case "boot":
      drawBootSequence(pen, time, screenWidth, screenHeight);
      break;
    case "grid":
      drawGridMode(pen, time, screenWidth, screenHeight);
      break;
    case "cad":
      drawCADMode(pen, time, screenWidth, screenHeight);
      break;
    case "terminal":
      drawTerminalMode(pen, time, screenWidth, screenHeight);
      break;
  }
  
  pen.pop();
  
  return pen;
}

// Draw boot sequence
function drawBootSequence(pen, time, width, height) {
  // Calculate boot progress
  bootProgress = Math.min(1.0, bootProgress + 0.01);
  
  // Draw progress bar
  pen.polyline([
    { x: -width/2 + 2, y: 0, z: 0 },
    { x: -width/2 + 2 + (width - 4) * bootProgress, y: 0, z: 0 }
  ], false);
  
  // Boot text
  const messages = [
    "INITIALIZING SYSTEM...",
    "MEMORY CHECK... OK",
    "DISK SUBSYSTEM... OK",
    "VECTOR PROCESSOR... OK",
    "LOADING OPERATING SYSTEM..."
  ];
  
  // Display messages based on boot progress
  const messageCount = Math.floor(bootProgress * messages.length);
  
  for (let i = 0; i < messageCount; i++) {
    draw.text(messages[i], { x: 0, y: -8 + i * 3, z: 0 }, 0.8);
  }
  
  // Show percentage
  draw.text("BOOT: " + Math.floor(bootProgress * 100) + "%", { x: 0, y: 5, z: 0 }, 1);
  
  // Switch to grid mode when boot completes
  if (bootProgress >= 1.0 && time > 5) {
    screenMode = "grid";
  }
}

// Draw grid mode
function drawGridMode(pen, time, width, height) {
  // Apply grid material
  applyMaterial(pen, MATERIALS.GRID);
  
  // Draw major grid lines
  const gridSpacing = 5;
  
  // Horizontal lines
  for (let y = -height/2; y <= height/2; y += gridSpacing) {
    pen.polyline([
      { x: -width/2, y: y, z: 0 },
      { x: width/2, y: y, z: 0 }
    ], false);
  }
  
  // Vertical lines
  for (let x = -width/2; x <= width/2; x += gridSpacing) {
    pen.polyline([
      { x: x, y: -height/2, z: 0 },
      { x: x, y: height/2, z: 0 }
    ], false);
  }
  
  // Apply screen material for text
  applyMaterial(pen, MATERIALS.SCREEN);
  
  // Draw grid labels
  for (let x = -width/2 + gridSpacing; x < width/2; x += gridSpacing) {
    draw.text(x.toString(), { x: x, y: -height/2 + 1, z: 0 }, 0.6);
  }
  
  for (let y = -height/2 + gridSpacing; y < height/2; y += gridSpacing) {
    draw.text(y.toString(), { x: -width/2 + 1, y: y, z: 0 }, 0.6);
  }
  
  // Draw origin marker
  pen.polyline([
    { x: -1, y: 0, z: 0 },
    { x: 1, y: 0, z: 0 }
  ], false);
  
  pen.polyline([
    { x: 0, y: -1, z: 0 },
    { x: 0, y: 1, z: 0 }
  ], false);
  
  // Draw system status
  draw.text("GRID MODE: READY", { x: 0, y: height/2 - 2, z: 0 }, 1);
  draw.text("PRESS F1 FOR HELP | F2 FOR CAD MODE", { x: 0, y: -height/2 + 2, z: 0 }, 0.7);
  
  // Switch to CAD mode after some time
  if (time > 10 && screenMode === "grid") {
    screenMode = "cad";
  }
}

// Draw CAD mode with platonic solids
function drawCADMode(pen, time, width, height) {
  // Apply grid material for background grid (fainter)
  applyMaterial(pen, MATERIALS.GRID, 0.5);
  
  // Draw minor grid (more sparse)
  const minorGridSpacing = 5;
  
  // Horizontal minor lines
  for (let y = -height/2; y <= height/2; y += minorGridSpacing) {
    pen.polyline([
      { x: -width/2, y: y, z: 0 },
      { x: width/2, y: y, z: 0 }
    ], false);
  }
  
  // Vertical minor lines
  for (let x = -width/2; x <= width/2; x += minorGridSpacing) {
    pen.polyline([
      { x: x, y: -height/2, z: 0 },
      { x: x, y: height/2, z: 0 }
    ], false);
  }
  
  // Apply platonic solid material
  applyMaterial(pen, MATERIALS.PLATONIC);
  
  // Calculate rotation based on time
  screenRotation = time * 20;
  
  // Draw different platonic solids based on time
  const cycleTime = 15; // seconds per solid
  const solidType = Math.floor((time % cycleTime) / (cycleTime / 5));
  
  // Position for the solid
  pen.push();
  pen.moveBy(0, 0, 0);
  pen.yaw(screenRotation);
  pen.pitch(screenRotation * 0.7);
  
  switch(solidType) {
    case 0:
      drawTetrahedron(pen, 8);
      break;
    case 1:
      drawCube(pen, 7);
      break;
    case 2:
      drawOctahedron(pen, 7);
      break;
    case 3:
      drawDodecahedron(pen, 7);
      break;
    case 4:
      drawIcosahedron(pen, 7);
      break;
  }
  
  pen.pop();
  
  // Apply screen material for text
  applyMaterial(pen, MATERIALS.SCREEN);
  
  // Draw CAD interface elements
  const solidNames = [
    "TETRAHEDRON",
    "CUBE",
    "OCTAHEDRON",
    "DODECAHEDRON",
    "ICOSAHEDRON"
  ];
  
  // Title and solid name
  draw.text("CAD MODEL: " + solidNames[solidType], { x: 0, y: height/2 - 2, z: 0 }, 1);
  
  // Properties
  const propX = -width/2 + 3;
  draw.text("PROPERTIES:", { x: propX, y: height/2 - 5, z: 0 }, 0.8);
  draw.text("- VERTICES: " + getVertexCount(solidType), { x: propX + 2, y: height/2 - 7, z: 0 }, 0.7);
  draw.text("- EDGES: " + getEdgeCount(solidType), { x: propX + 2, y: height/2 - 9, z: 0 }, 0.7);
  draw.text("- FACES: " + getFaceCount(solidType), { x: propX + 2, y: height/2 - 11, z: 0 }, 0.7);
  
  // Dimensions
  draw.text("DIMENSIONS:", { x: propX, y: 0, z: 0 }, 0.8);
  draw.text("- SCALE: 7.00 UNITS", { x: propX + 2, y: -2, z: 0 }, 0.7);
  draw.text("- ROTATION: " + Math.floor(screenRotation % 360) + "°", { x: propX + 2, y: -4, z: 0 }, 0.7);
  
  // Draw coordinate axes with labels
  applyMaterial(pen, MATERIALS.WARNING, 0.8);
  pen.polyline([
    { x: -width/2 + 4, y: -height/2 + 6, z: 0 },
    { x: -width/2 + 10, y: -height/2 + 6, z: 0 }
  ], false);
  draw.text("X", { x: -width/2 + 11, y: -height/2 + 6, z: 0 }, 0.7);
  
  pen.polyline([
    { x: -width/2 + 4, y: -height/2 + 6, z: 0 },
    { x: -width/2 + 4, y: -height/2 + 12, z: 0 }
  ], false);
  draw.text("Y", { x: -width/2 + 4, y: -height/2 + 13, z: 0 }, 0.7);
  
  // Draw circle around the solid
  const circlePoints = [];
  const segments = 32;
  const circleRadius = 10;
  
  for (let i = 0; i <= segments; i++) {
    const angle = (i / segments) * Math.PI * 2;
    circlePoints.push({
      x: Math.cos(angle) * circleRadius,
      y: Math.sin(angle) * circleRadius,
      z: 0
    });
  }
  
  applyMaterial(pen, MATERIALS.GRID, 0.7);
  pen.polyline(circlePoints, true);
  
  // Control info
  applyMaterial(pen, MATERIALS.SCREEN);
  draw.text("VIEW CONTROLS | R-ROTATE | S-SCALE | TAB-NEXT MODEL", { x: 0, y: -height/2 + 2, z: 0 }, 0.6);
  
  // Switch to terminal mode after some time
  if (time > 20 && screenMode === "cad") {
    screenMode = "terminal";
  }
}

// Draw the keyboard
function drawKeyboard(pen, highlight = false) {
  pen.push();
  
  // Position keyboard below monitor
  pen.moveBy(0, 30, 0);
  
  // Apply appropriate material
  if (highlight) {
    applyMaterial(pen, MATERIALS.HIGHLIGHT);
  } else {
    applyMaterial(pen, MATERIALS.KEYBOARD);
  }
  
  // Keyboard dimensions
  const keyboardWidth = 35;
  const keyboardHeight = 12;
  const keyboardDepth = 3;
  
  // Draw keyboard base
  pen.polyline([
    { x: -keyboardWidth/2, y: 0, z: 0 },
    { x: keyboardWidth/2, y: 0, z: 0 },
    { x: keyboardWidth/2, y: keyboardHeight, z: 0 },
    { x: -keyboardWidth/2, y: keyboardHeight, z: 0 },
    { x: -keyboardWidth/2, y: 0, z: 0 }
  ], false);
  
  // Draw keyboard sides
  pen.polyline([
    { x: -keyboardWidth/2, y: 0, z: 0 },
    { x: -keyboardWidth/2, y: 0, z: keyboardDepth }
  ], false);
  
  pen.polyline([
    { x: keyboardWidth/2, y: 0, z: 0 },
    { x: keyboardWidth/2, y: 0, z: keyboardDepth }
  ], false);
  
  pen.polyline([
    { x: keyboardWidth/2, y: keyboardHeight, z: 0 },
    { x: keyboardWidth/2, y: keyboardHeight, z: keyboardDepth }
  ], false);
  
  pen.polyline([
    { x: -keyboardWidth/2, y: keyboardHeight, z: 0 },
    { x: -keyboardWidth/2, y: keyboardHeight, z: keyboardDepth }
  ], false);
  
  // Draw keyboard top
  pen.polyline([
    { x: -keyboardWidth/2, y: 0, z: keyboardDepth },
    { x: keyboardWidth/2, y: 0, z: keyboardDepth },
    { x: keyboardWidth/2, y: keyboardHeight, z: keyboardDepth },
    { x: -keyboardWidth/2, y: keyboardHeight, z: keyboardDepth },
    { x: -keyboardWidth/2, y: 0, z: keyboardDepth }
  ], false);
  
  // Draw keyboard keys
  if (!highlight) {
    applyMaterial(pen, MATERIALS.CASING, 0.8);
  }
  
  // Key layout parameters
  const keySize = 1.5;
  const keySpacing = 2;
  const keyRows = 5;
  const keyCols = 15;
  
  // Animation for typing effect
  const animatedRow = Math.floor(keyboardAnimation * keyRows);
  const animatedCol = Math.floor((keyboardAnimation * keyRows * keyCols) % keyCols);
  
  // Draw key grid
  for (let row = 0; row < keyRows; row++) {
    for (let col = 0; col < keyCols; col++) {
      // Calculate key position
      const x = -keyboardWidth/2 + 2 + col * keySpacing;
      const y = 2 + row * keySpacing;
      
      // Determine if this key is being "pressed" in the animation
      const isAnimated = (row === animatedRow && col === animatedCol);
      const keyHeight = isAnimated ? keyboardDepth * 0.5 : keyboardDepth * 1.2;
      
      // Draw key
      pen.polyline([
        { x: x - keySize/2, y: y - keySize/2, z: keyHeight },
        { x: x + keySize/2, y: y - keySize/2, z: keyHeight },
        { x: x + keySize/2, y: y + keySize/2, z: keyHeight },
        { x: x - keySize/2, y: y + keySize/2, z: keyHeight },
        { x: x - keySize/2, y: y - keySize/2, z: keyHeight }
      ], false);
      
      // Draw special keys with different colors
      if (row === 0 && col >= 12) {
        // Function keys
        if (!highlight) {
          applyMaterial(pen, MATERIALS.WARNING, 0.7);
        }
      } else if (row === 4 && col > 2 && col < 10) {
        // Space bar
        if (!highlight) {
          applyMaterial(pen, MATERIALS.CASING);
        }
      } else if (row === 0 && col === 0) {
        // Escape key
        if (!highlight) {
          applyMaterial(pen, MATERIALS.WARNING, 0.7);
        }
      } else if (row === 4 && col >= 10) {
        // Arrow keys
        if (!highlight) {
          applyMaterial(pen, MATERIALS.LABELS, 0.7);
        }
      } else {
        if (!highlight) {
          applyMaterial(pen, MATERIALS.CASING, 0.8);
        }
      }
    }
  }
  
  // Draw label for space bar
  if (!highlight) {
    applyMaterial(pen, MATERIALS.SCREEN, 0.9);
    draw.text("SPACE", { x: 0, y: 2 + 4 * keySpacing, z: keyboardDepth * 1.3 }, 0.8);
    
    // ESC label
    draw.text("ESC", { x: -keyboardWidth/2 + 2, y: 2 + 0 * keySpacing, z: keyboardDepth * 1.3 }, 0.6);
    
    // F1-F3 labels
    for (let i = 0; i < 3; i++) {
      draw.text("F" + (i+1), { x: -keyboardWidth/2 + 2 + (12+i) * keySpacing, y: 2, z: keyboardDepth * 1.3 }, 0.6);
    }
    
    // Arrow key labels
    const arrowLabels = ["←", "↓", "→"];
    for (let i = 0; i < 3; i++) {
      draw.text(arrowLabels[i], { x: -keyboardWidth/2 + 2 + (11+i) * keySpacing, y: 2 + 4 * keySpacing, z: keyboardDepth * 1.3 }, 0.6);
    }
  }
  
  // Draw keyboard data cable
  if (!highlight) {
    applyMaterial(pen, MATERIALS.CASING, 0.6);
  }
  
  pen.polyline([
    { x: 0, y: 0, z: keyboardDepth / 2 },
    { x: 0, y: -5, z: 0 },
    { x: 15, y: -10, z: 0 },
    { x: 15, y: -15, z: -5 }
  ], false);
  
  pen.pop();
  
  return pen;
}

// Draw the system unit / CPU
function drawSystemUnit(pen, highlight = false) {
  pen.push();
  
  // Position system unit to the right of the monitor
  pen.moveBy(25, 15, -10);
  
  // Apply appropriate material
  if (highlight) {
    applyMaterial(pen, MATERIALS.HIGHLIGHT);
  } else {
    applyMaterial(pen, MATERIALS.CASING);
  }
  
  // System unit dimensions
  const unitWidth = 15;
  const unitHeight = 25;
  const unitDepth = 30;
  
  // Draw front panel
  pen.polyline([
    { x: 0, y: -unitHeight/2, z: 0 },
    { x: unitWidth, y: -unitHeight/2, z: 0 },
    { x: unitWidth, y: unitHeight/2, z: 0 },
    { x: 0, y: unitHeight/2, z: 0 },
    { x: 0, y: -unitHeight/2, z: 0 }
  ], false);
  
  // Draw sides
  pen.polyline([
    { x: 0, y: -unitHeight/2, z: 0 },
    { x: 0, y: -unitHeight/2, z: -unitDepth }
  ], false);
  
  pen.polyline([
    { x: unitWidth, y: -unitHeight/2, z: 0 },
    { x: unitWidth, y: -unitHeight/2, z: -unitDepth }
  ], false);
  
  pen.polyline([
    { x: unitWidth, y: unitHeight/2, z: 0 },
    { x: unitWidth, y: unitHeight/2, z: -unitDepth }
  ], false);
  
  pen.polyline([
    { x: 0, y: unitHeight/2, z: 0 },
    { x: 0, y: unitHeight/2, z: -unitDepth }
  ], false);
  
  // Draw back panel
  pen.polyline([
    { x: 0, y: -unitHeight/2, z: -unitDepth },
    { x: unitWidth, y: -unitHeight/2, z: -unitDepth },
    { x: unitWidth, y: unitHeight/2, z: -unitDepth },
    { x: 0, y: unitHeight/2, z: -unitDepth },
    { x: 0, y: -unitHeight/2, z: -unitDepth }
  ], false);
  
  // Draw top panel
  pen.polyline([
    { x: 0, y: unitHeight/2, z: 0 },
    { x: unitWidth, y: unitHeight/2, z: 0 },
    { x: unitWidth, y: unitHeight/2, z: -unitDepth },
    { x: 0, y: unitHeight/2, z: -unitDepth },
    { x: 0, y: unitHeight/2, z: 0 }
  ], false);
  
  // Draw bottom panel
  pen.polyline([
    { x: 0, y: -unitHeight/2, z: 0 },
    { x: unitWidth, y: -unitHeight/2, z: 0 },
    { x: unitWidth, y: -unitHeight/2, z: -unitDepth },
    { x: 0, y: -unitHeight/2, z: -unitDepth },
    { x: 0, y: -unitHeight/2, z: 0 }
  ], false);
  
  // Draw system unit details
  if (!highlight) {
    applyMaterial(pen, MATERIALS.KEYBOARD);
  }
  
  // Draw disk drives
  const driveHeight = 2;
  const driveSpacing = 4;
  
  for (let i = 0; i < 2; i++) {
    const y = unitHeight/2 - 4 - i * driveSpacing;
    
    pen.polyline([
      { x: 1, y: y - driveHeight, z: 0.1 },
      { x: unitWidth - 1, y: y - driveHeight, z: 0.1 },
      { x: unitWidth - 1, y: y, z: 0.1 },
      { x: 1, y: y, z: 0.1 },
      { x: 1, y: y - driveHeight, z: 0.1 }
    ], false);
    
    // Drive eject button
    pen.polyline([
      { x: unitWidth - 3, y: y - driveHeight/2 - 0.5, z: 0.2 },
      { x: unitWidth - 2, y: y - driveHeight/2 - 0.5, z: 0.2 },
      { x: unitWidth - 2, y: y - driveHeight/2 + 0.5, z: 0.2 },
      { x: unitWidth - 3, y: y - driveHeight/2 + 0.5, z: 0.2 },
      { x: unitWidth - 3, y: y - driveHeight/2 - 0.5, z: 0.2 }
    ], false);
    
    // Disk activity light
    if (i === 0 && powerState) {
      const blinkIntensity = (Math.sin(diskAnimation * Math.PI * 2) + 1) / 2;
      applyMaterial(pen, MATERIALS.WARNING, blinkIntensity);
      pen.moveTo(unitWidth - 4, y - driveHeight/2, 0.2);
      pen.dotSize(3).fuzz(2, 0.05);
      pen.dot();
      
      // Switch back to keyboard material
      if (!highlight) {
        applyMaterial(pen, MATERIALS.KEYBOARD);
      }
    }
  }
  
  // Draw power button
  const buttonSize = 2;
  pen.polyline([
    { x: 2, y: -unitHeight/2 + 5 - buttonSize/2, z: 0.1 },
    { x: 2 + buttonSize, y: -unitHeight/2 + 5 - buttonSize/2, z: 0.1 },
    { x: 2 + buttonSize, y: -unitHeight/2 + 5 + buttonSize/2, z: 0.1 },
    { x: 2, y: -unitHeight/2 + 5 + buttonSize/2, z: 0.1 },
    { x: 2, y: -unitHeight/2 + 5 - buttonSize/2, z: 0.1 }
  ], false);
  
  // Power status light
  if (powerState) {
    applyMaterial(pen, MATERIALS.WARNING);
    pen.moveTo(5, -unitHeight/2 + 5, 0.2);
    pen.dotSize(3).fuzz(3, 0.1);
    pen.dot();
  }
  
  // Draw vent lines on the sides
  if (!highlight) {
    applyMaterial(pen, MATERIALS.CASING, 0.6);
  }
  
  for (let i = 0; i < 15; i++) {
    const z = -5 - i * 1.5;
    
    // Left side vents
    pen.polyline([
      { x: 0.1, y: -unitHeight/2 + 5, z: z },
      { x: 0.1, y: unitHeight/2 - 5, z: z }
    ], false);
    
    // Right side vents
    pen.polyline([
      { x: unitWidth - 0.1, y: -unitHeight/2 + 5, z: z },
      { x: unitWidth - 0.1, y: unitHeight/2 - 5, z: z }
    ], false);
  }
  
  // Draw system labels
  if (!highlight) {
    applyMaterial(pen, MATERIALS.LABELS);
    
    // Labels for drives
    draw.text("5.25\" DRIVE", { x: unitWidth/2, y: unitHeight/2 - 4, z: 0.2 }, 0.6);
    draw.text("3.5\" DRIVE", { x: unitWidth/2, y: unitHeight/2 - 8, z: 0.2 }, 0.6);
    
    // Power button label
    draw.text("POWER", { x: 5, y: -unitHeight/2 + 8, z: 0.2 }, 0.6);
    
    // System model label
    draw.text("VECTOR-3000", { x: unitWidth/2, y: -unitHeight/2 + 15, z: 0.2 }, 0.9);
    draw.text("GRAPHICS WORKSTATION", { x: unitWidth/2, y: -unitHeight/2 + 13, z: 0.2 }, 0.6);
  }
  
  // Draw data cables
  if (!highlight) {
    applyMaterial(pen, MATERIALS.CASING, 0.6);
  }
  
  // Cable to monitor
  pen.polyline([
    { x: 0, y: 0, z: -unitDepth/2 },
    { x: -10, y: 0, z: -unitDepth/2 },
    { x: -20, y: -5, z: -unitDepth/2 }
  ], false);
  
  // Cable to keyboard
  pen.polyline([
    { x: 0, y: -10, z: -unitDepth/2 },
    { x: -5, y: -15, z: -unitDepth/2 },
    { x: -10, y: -15, z: 0 }
  ], false);
  
  pen.pop();
  
  return pen;
}

// Functions to draw platonic solids
function drawTetrahedron(pen, size) {
  const h = size * Math.sqrt(2/3);
  const vertices = [
    { x: 0, y: h, z: 0 },
    { x: -size/2, y: -h/3, z: -size/(2*Math.sqrt(3)) },
    { x: size/2, y: -h/3, z: -size/(2*Math.sqrt(3)) },
    { x: 0, y: -h/3, z: size/Math.sqrt(3) }
  ];
  
  // Draw edges
  pen.polyline([vertices[0], vertices[1], vertices[2], vertices[0], vertices[3], vertices[1]], false);
  pen.polyline([vertices[2], vertices[3]], false);
  
  return pen;
}

function drawCube(pen, size) {
  const halfSize = size / 2;
  
  // Vertices
  const vertices = [
    { x: -halfSize, y: -halfSize, z: -halfSize },
    { x: halfSize, y: -halfSize, z: -halfSize },
    { x: halfSize, y: halfSize, z: -halfSize },
    { x: -halfSize, y: halfSize, z: -halfSize },
    { x: -halfSize, y: -halfSize, z: halfSize },
    { x: halfSize, y: -halfSize, z: halfSize },
    { x: halfSize, y: halfSize, z: halfSize },
    { x: -halfSize, y: halfSize, z: halfSize }
  ];
  
  // Draw faces
  pen.polyline([vertices[0], vertices[1], vertices[2], vertices[3], vertices[0]], false);
  pen.polyline([vertices[4], vertices[5], vertices[6], vertices[7], vertices[4]], false);
  pen.polyline([vertices[0], vertices[4]], false);
  pen.polyline([vertices[1], vertices[5]], false);
  pen.polyline([vertices[2], vertices[6]], false);
  pen.polyline([vertices[3], vertices[7]], false);
  
  return pen;
}

function drawOctahedron(pen, size) {
  const vertices = [
    { x: 0, y: 0, z: size },
    { x: size, y: 0, z: 0 },
    { x: 0, y: size, z: 0 },
    { x: -size, y: 0, z: 0 },
    { x: 0, y: -size, z: 0 },
    { x: 0, y: 0, z: -size }
  ];
  
  // Draw edges
  pen.polyline([vertices[0], vertices[1], vertices[2], vertices[0], vertices[3], vertices[4], vertices[0]], false);
  pen.polyline([vertices[1], vertices[5], vertices[2]], false);
  pen.polyline([vertices[2], vertices[5], vertices[3]], false);
  pen.polyline([vertices[3], vertices[5], vertices[4]], false);
  pen.polyline([vertices[4], vertices[5], vertices[1]], false);
  
  return pen;
}

function drawDodecahedron(pen, size) {
  const phi = (1 + Math.sqrt(5)) / 2;
  const scale = size / 2;
  
  // Vertices
  const vertices = [
    { x: scale, y: scale, z: scale },
    { x: scale, y: scale, z: -scale },
    { x: scale, y: -scale, z: scale },
    { x: scale, y: -scale, z: -scale },
    { x: -scale, y: scale, z: scale },
    { x: -scale, y: scale, z: -scale },
    { x: -scale, y: -scale, z: scale },
    { x: -scale, y: -scale, z: -scale },
    
    { x: 0, y: scale/phi, z: scale*phi },
    { x: 0, y: scale/phi, z: -scale*phi },
    { x: 0, y: -scale/phi, z: scale*phi },
    { x: 0, y: -scale/phi, z: -scale*phi },
    
    { x: scale*phi, y: 0, z: scale/phi },
    { x: scale*phi, y: 0, z: -scale/phi },
    { x: -scale*phi, y: 0, z: scale/phi },
    { x: -scale*phi, y: 0, z: -scale/phi },
    
    { x: scale/phi, y: scale*phi, z: 0 },
    { x: scale/phi, y: -scale*phi, z: 0 },
    { x: -scale/phi, y: scale*phi, z: 0 },
    { x: -scale/phi, y: -scale*phi, z: 0 }
  ];
  
  // Simplified drawing of the dodecahedron edges - just draw some key faces
  // This is a simplified representation for visual effect
  const faces = [
    [0, 8, 10, 2, 12],
    [0, 16, 1, 13, 12],
    [0, 8, 4, 18, 16],
    [8, 10, 6, 14, 4],
    [16, 18, 5, 9, 1],
    [12, 13, 3, 17, 2],
    [2, 17, 19, 6, 10],
    [4, 14, 15, 5, 18],
    [1, 9, 11, 3, 13],
    [7, 19, 17, 3, 11],
    [7, 11, 9, 5, 15],
    [7, 15, 14, 6, 19]
  ];
  
  // Draw faces
  for (const face of faces) {
    const points = face.map(idx => vertices[idx]);
    points.push(vertices[face[0]]); // Close the loop
    pen.polyline(points, false);
  }
  
  return pen;
}

function drawIcosahedron(pen, size) {
  const phi = (1 + Math.sqrt(5)) / 2;
  const scale = size / 2;
  
  // Vertices
  const vertices = [
    { x: 0, y: scale, z: scale*phi },
    { x: 0, y: scale, z: -scale*phi },
    { x: 0, y: -scale, z: scale*phi },
    { x: 0, y: -scale, z: -scale*phi },
    
    { x: scale, y: scale*phi, z: 0 },
    { x: scale, y: -scale*phi, z: 0 },
    { x: -scale, y: scale*phi, z: 0 },
    { x: -scale, y: -scale*phi, z: 0 },
    
    { x: scale*phi, y: 0, z: scale },
    { x: scale*phi, y: 0, z: -scale },
    { x: -scale*phi, y: 0, z: scale },
    { x: -scale*phi, y: 0, z: -scale }
  ];
  
  // Simplified drawing of the icosahedron edges
  const edges = [
    [0, 2], [0, 4], [0, 6], [0, 8], [0, 10],
    [1, 3], [1, 4], [1, 6], [1, 9], [1, 11],
    [2, 5], [2, 7], [2, 8], [2, 10],
    [3, 5], [3, 7], [3, 9], [3, 11],
    [4, 6], [4, 8], [4, 9],
    [5, 7], [5, 8], [5, 9],
    [6, 10], [6, 11],
    [7, 10], [7, 11],
    [8, 9], [10, 11]
  ];
  
  // Draw edges
  for (const edge of edges) {
    pen.polyline([vertices[edge[0]], vertices[edge[1]]], false);
  }
  
  return pen;
}

// Helper functions for platonic solid properties
function getVertexCount(solidType) {
  const counts = [4, 8, 6, 20, 12];
  return counts[solidType];
}

function getEdgeCount(solidType) {
  const counts = [6, 12, 12, 30, 30];
  return counts[solidType];
}

function getFaceCount(solidType) {
  const counts = [4, 6, 8, 12, 20];
  return counts[solidType];
}

// Draw labels and annotations
function drawSystemLabels(pen, time) {
  pen.push();
  
  applyMaterial(pen, MATERIALS.LABELS);
  
  // Only show labels after system is powered on
  if (powerState) {
    // Monitor label
    if (focusedComponent === "monitor") {
      draw.text("VECTOR DISPLAY", { x: 0, y: -20, z: 15 }, 1.5);
      draw.text("1024x768 RESOLUTION", { x: 0, y: -23, z: 15 }, 1);
      draw.text("REFRESH RATE: 60Hz", { x: 0, y: -26, z: 15 }, 1);
    }
    
    // Keyboard label
    if (focusedComponent === "keyboard") {
      draw.text("ERGONOMIC KEYBOARD", { x: 0, y: 20, z: 15 }, 1.5);
      draw.text("101 KEYS", { x: 0, y: 17, z: 15 }, 1);
      draw.text("PROGRAMMABLE FUNCTION KEYS", { x: 0, y: 14, z: 15 }, 1);
    }
    
    // System unit label
    if (focusedComponent === "system") {
      draw.text("VECTOR-3000 CPU", { x: 25, y: 5, z: 15 }, 1.5);
      draw.text("32MHz PROCESSOR", { x: 25, y: 2, z: 15 }, 1);
      draw.text("64K VECTOR MEMORY", { x: 25, y: -1, z: 15 }, 1);
      draw.text("DUAL 5.25\" / 3.5\" DRIVES", { x: 25, y: -4, z: 15 }, 1);
    }
    
    // Main system label when no component is focused
    if (!focusedComponent) {
      draw.text("VECTOR-3000 GRAPHICS WORKSTATION", { x: 0, y: -35, z: 0 }, 2);
      
      // Display system specs
      const specs = [
        "ADVANCED VECTOR PROCESSING UNIT",
        "32MHz CPU WITH MATH CO-PROCESSOR",
        "64K DEDICATED VECTOR MEMORY",
        "DUAL FLOPPY DISK SYSTEM",
        "HIGH-RESOLUTION DISPLAY"
      ];
      
      for (let i = 0; i < specs.length; i++) {
        draw.text(specs[i], { x: 0, y: -40 - i * 3, z: 0 }, 1.2);
      }
    }
    
    // Show time and power info
    draw.text("SYSTEM TIME: " + Math.floor(time).toString().padStart(5, '0') + "s", { x: -30, y: -35, z: 0 }, 1);
    draw.text("POWER: " + (powerState ? "ON" : "OFF"), { x: -30, y: -38, z: 0 }, 1);
  }
  
  pen.pop();
}

// Update system state
function updateSystemState(time) {
  // Update keyboard animation
  keyboardAnimation = (keyboardAnimation + 0.01) % 1;
  
  // Update disk animation (only when system is active)
  if (powerState && screenMode !== "boot") {
    diskAnimation = (diskAnimation + 0.02) % 1;
  }
  
  // Boot sequence logic
  if (powerState && bootProgress < 1) {
    bootProgress += 0.005;
  }
  
  // Power up system after 2 seconds
  if (time > 2 && !powerState) {
    powerState = true;
    screenMode = "boot";
    bootProgress = 0;
  }
  
  // Set focused component based on time
  const componentCycle = Math.floor(time / 8) % 4;
  
  switch(componentCycle) {
    case 0:
      focusedComponent = null;
      break;
    case 1:
      focusedComponent = "monitor";
      break;
    case 2:
      focusedComponent = "keyboard";
      break;
    case 3:
      focusedComponent = "system";
      break;
  }
}

// Main program
function program(pen, draw, time) {
  // Initialize on first frame
  if (frameCount === 0) {
    setBGColor(0x000005);
    
    // Set camera position
    setCamera(
      { x: 0, y: 0, z: 85 },
      { x: 0, y: 0, z: 0 }
    );
    
    // Initialize system state
    powerState = false;
    bootProgress = 0;
    screenMode = "boot";
  }
  
  // Update system state
  updateSystemState(time);
  
  // Draw components
  drawSystemUnit(pen, focusedComponent === "system");
  drawKeyboard(pen, focusedComponent === "keyboard");
  drawMonitor(pen, focusedComponent === "monitor");
  
  // Draw screen content if powered on
  if (powerState) {
    drawScreen(pen, time);
  }
  
  // Draw labels
  drawSystemLabels(pen, time);
  
  // Update frame counter
  frameCount++;
}