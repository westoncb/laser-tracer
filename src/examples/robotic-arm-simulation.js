// Advanced Vector Display: Robotic Assistant Arm Simulation
// Demonstrates capabilities of a next-gen robotic assistant in diagnostic mode

// Persistent state variables
let frameCount = 0;
let lastRenderTime = 0;
let testPhase = 0;
let subPhase = 0;

// Robot arm component positions
let baseRotation = 0;
let shoulderAngle = 0;
let elbowAngle = 0;
let wristAngle = 0;
let wristRotation = 0;
let gripperWidth = 0;
let toolExtension = 0;

// Testing environment variables
let targetObject = null;
let sensorReadings = [];
let diagnosticText = [];
let systemStatus = "INITIALIZING";
let powerLevel = 100;

// Material definitions with enhanced patterns
const MATERIALS = {
  PRIMARY: {
    name: "CARBON COMPOSITE",
    color: { r: .8, g: 1, b: 0.2 },
    dotSize: 2,
    traceGap: 0.1,
    fuzz: 1,
    fuzzSize: 0.1,
    residue: 0.8
  },
  SECONDARY: {
    name: "TITANIUM ALLOY",
    color: { r: 0.2, g: 0.8, b: 1.0 },
    dotSize: 4,
    traceGap: 0.12,
    fuzzSize: 0.05,
    fuzz: 2,
    residue: 0.6
  },
  HIGHLIGHT: {
    name: "ACTIVE COMPONENT",
    color: { r: .8, g: 0.2, b: 0.0 },
    dotSize: 2,
    traceGap: 0.08,
    fuzzSize: 0.1,
    fuzz: 4,
    residue: 1.2
  },
  WARNING: {
    name: "WARNING",
    color: { r: 1, g: 0.5, b: 0 },  // Orange
    dotSize: 5,
    traceGap: 0.1,
    fuzzSize: 0.08,
    fuzz: 3,
    residue: 1.0
  },
  INTERFACE: {
    name: "INTERFACE",
    color: { r: 0.7, g: 0.7, b: 1.0 },  // Lavender
    dotSize: 3,
    traceGap: 0.1,
    fuzzSize: 0.04,
    fuzz: 2,
    residue: 0.5
  },
  SCAN: {
    name: "SCAN",
    color: { r: 1, g: 0.9, b: 0.1 },  // Yellow
    dotSize: 2,
    traceGap: 0.15,
    fuzzSize: 0.1,
    fuzz: 5,
    residue: 0.3
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

// Draw the base of the robot
function drawRobotBase(pen, rotation = 0, highlight = false) {
  pen.push();
  
  // Apply appropriate material
  if (highlight) {
    applyMaterial(pen, MATERIALS.HIGHLIGHT);
  } else {
    applyMaterial(pen, MATERIALS.PRIMARY);
  }
  
  // Apply base rotation around Y axis
  pen.yaw(rotation);
  
  // Draw main cylindrical base
  const baseRadius = 8;
  const baseHeight = 3;
  const segments = 24;
  
  // Base top circle
  const topCircle = [];
  for (let i = 0; i <= segments; i++) {
    const angle = (i / segments) * Math.PI * 2;
    topCircle.push({
      x: Math.cos(angle) * baseRadius,
      y: baseHeight,
      z: Math.sin(angle) * baseRadius
    });
  }
  pen.polyline(topCircle, true);
  
  // Base bottom circle
  const bottomCircle = [];
  for (let i = 0; i <= segments; i++) {
    const angle = (i / segments) * Math.PI * 2;
    bottomCircle.push({
      x: Math.cos(angle) * baseRadius,
      y: 0,
      z: Math.sin(angle) * baseRadius
    });
  }
  pen.polyline(bottomCircle, true);
  
  // Connect top and bottom with vertical lines
  for (let i = 0; i < segments; i += 3) {
    const angle = (i / segments) * Math.PI * 2;
    const x = Math.cos(angle) * baseRadius;
    const z = Math.sin(angle) * baseRadius;
    
    pen.polyline([
      { x: x, y: 0, z: z },
      { x: x, y: baseHeight, z: z }
    ], false);
  }
  
  // Add mounting plate on top
  const mountRadius = baseRadius * 0.7;
  const mountPlate = [];
  for (let i = 0; i <= segments; i++) {
    const angle = (i / segments) * Math.PI * 2;
    mountPlate.push({
      x: Math.cos(angle) * mountRadius,
      y: baseHeight + 0.5,
      z: Math.sin(angle) * mountRadius
    });
  }
  pen.polyline(mountPlate, true);
  
  // Add cross reinforcement on mounting plate
  pen.polyline([
    { x: -mountRadius, y: baseHeight + 0.5, z: 0 },
    { x: mountRadius, y: baseHeight + 0.5, z: 0 }
  ], false);
  
  pen.polyline([
    { x: 0, y: baseHeight + 0.5, z: -mountRadius },
    { x: 0, y: baseHeight + 0.5, z: mountRadius }
  ], false);
  
  // Draw interface panel on front of base
  if (!highlight) {
    applyMaterial(pen, MATERIALS.INTERFACE);
  }
  
  pen.polyline([
    { x: -baseRadius * 0.5, y: baseHeight * 0.3, z: baseRadius - 0.1 },
    { x: baseRadius * 0.5, y: baseHeight * 0.3, z: baseRadius - 0.1 },
    { x: baseRadius * 0.5, y: baseHeight * 0.8, z: baseRadius - 0.1 },
    { x: -baseRadius * 0.5, y: baseHeight * 0.8, z: baseRadius - 0.1 },
    { x: -baseRadius * 0.5, y: baseHeight * 0.3, z: baseRadius - 0.1 }
  ], false);
  
  // Draw status lights on base
  const lightColors = [
    { r: 0, g: 1, b: 0 },   // Green
    { r: 1, g: 1, b: 0 },   // Yellow
    { r: 1, g: 0, b: 0 }    // Red
  ];
  
  for (let i = 0; i < 3; i++) {
    // Blink the light based on system status
    let lightIntensity = 0.3;
    if (i === 0 && systemStatus === "OPERATIONAL") {
      lightIntensity = 0.8 + Math.sin(Date.now() * 0.005) * 0.2;
    } else if (i === 1 && systemStatus === "TESTING") {
      lightIntensity = 0.8 + Math.sin(Date.now() * 0.01) * 0.2;
    } else if (i === 2 && systemStatus === "ALERT") {
      lightIntensity = 0.8 + Math.sin(Date.now() * 0.02) * 0.2;
    }
    
    pen.colorRGB(
      lightColors[i].r * lightIntensity,
      lightColors[i].g * lightIntensity,
      lightColors[i].b * lightIntensity
    );
    
    const lightX = -baseRadius * 0.3 + i * baseRadius * 0.3;
    pen.moveTo(lightX, baseHeight * 0.6, baseRadius);
    pen.dotSize(4).fuzz(4, 0.1);
    pen.dot();
  }
  
  pen.pop();
  
  return pen;
}

// Draw shoulder joint and upper arm
function drawShoulder(pen, angle = 0, highlight = false) {
  pen.push();
  
  // Position at the top of the base
  pen.moveBy(0, 3.5, 0);
  
  // Apply appropriate material
  if (highlight) {
    applyMaterial(pen, MATERIALS.HIGHLIGHT);
  } else {
    applyMaterial(pen, MATERIALS.SECONDARY);
  }
  
  // Draw shoulder joint (sphere approximation)
  const jointRadius = 2;
  const segments = 12;
  
  // Draw horizontal circles
  for (let j = 0; j <= segments; j++) {
    const phi = (j / segments) * Math.PI;
    const radius = jointRadius * Math.sin(phi);
    const y = jointRadius * Math.cos(phi);
    
    const points = [];
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      points.push({
        x: radius * Math.cos(theta),
        y: y,
        z: radius * Math.sin(theta)
      });
    }
    
    pen.polyline(points, true);
  }
  
  // Apply shoulder rotation
  pen.pitch(angle);
  
  // Draw upper arm (cylinder with detail)
  const armLength = 12;
  const armRadius = 1.5;
  
  // Upper arm circles
  for (let i = 0; i <= 1; i++) {
    const z = i * armLength;
    const points = [];
    
    for (let j = 0; j <= segments; j++) {
      const theta = (j / segments) * Math.PI * 2;
      points.push({
        x: armRadius * Math.cos(theta),
        y: armRadius * Math.sin(theta),
        z: z
      });
    }
    
    pen.polyline(points, true);
  }
  
  // Connect circles with lines
  for (let i = 0; i < segments; i += 3) {
    const theta = (i / segments) * Math.PI * 2;
    const x = armRadius * Math.cos(theta);
    const y = armRadius * Math.sin(theta);
    
    pen.polyline([
      { x: x, y: y, z: 0 },
      { x: x, y: y, z: armLength }
    ], false);
  }
  
  // Add structural details to the arm
  if (!highlight) {
    applyMaterial(pen, MATERIALS.PRIMARY, 0.8);
  }
  
  // Structural rings
  for (let i = 1; i < 3; i++) {
    const z = armLength * (i / 3);
    const ringPoints = [];
    
    for (let j = 0; j <= segments; j++) {
      const theta = (j / segments) * Math.PI * 2;
      ringPoints.push({
        x: armRadius * 1.1 * Math.cos(theta),
        y: armRadius * 1.1 * Math.sin(theta),
        z: z
      });
    }
    
    pen.push();
      pen.dotSize(5)
      pen.polyline(ringPoints, true);
    pen.pop();
  }
  
  // Hydraulic lines
  pen.polyline([
    { x: 0, y: armRadius * 1.2, z: armLength * 0.2 },
    { x: 0, y: armRadius * 1.2, z: armLength * 0.8 }
  ], false);
  
  pen.polyline([
    { x: armRadius * 1.2, y: 0, z: armLength * 0.2 },
    { x: armRadius * 1.2, y: 0, z: armLength * 0.8 }
  ], false);
  
  pen.pop();
  
  return pen;
}

// Draw elbow joint and forearm
function drawElbow(pen, angle = 0, highlight = false) {
  pen.push();
  
  // Position at the end of the upper arm
  pen.moveBy(0, 0, 12);
  
  // Apply appropriate material
  if (highlight) {
    applyMaterial(pen, MATERIALS.HIGHLIGHT);
  } else {
    applyMaterial(pen, MATERIALS.SECONDARY);
  }
  
  // Draw elbow joint (simpler than shoulder)
  const jointRadius = 1.8;
  const segments = 12;
  
  // Draw joint disc
  const discPoints = [];
  for (let i = 0; i <= segments; i++) {
    const theta = (i / segments) * Math.PI * 2;
    discPoints.push({
      x: jointRadius * Math.cos(theta),
      y: jointRadius * Math.sin(theta),
      z: 0
    });
  }
  pen.push()
    pen.dotSize(7)
    pen.polyline(discPoints, true);
  pen.pop()
  
  // Apply elbow rotation
  pen.pitch(angle);
  
  // Draw forearm (tapered cylinder)
  const armLength = 10;
  const startRadius = 1.5;
  const endRadius = 1.2;
  
  // Forearm circles
  for (let i = 0; i <= 1; i++) {
    const z = i * armLength;
    const radius = startRadius * (1 - i) + endRadius * i;
    const points = [];
    
    for (let j = 0; j <= segments; j++) {
      const theta = (j / segments) * Math.PI * 2;
      points.push({
        x: radius * Math.cos(theta),
        y: radius * Math.sin(theta),
        z: z
      });
    }
    
    pen.push();
      pen.dotSize(8);
      pen.polyline(points, true);
    pen.pop();
  }
  
  // Connect circles with lines
  for (let i = 0; i < segments; i += 2) {
    const theta = (i / segments) * Math.PI * 2;
    
    pen.polyline([
      { x: startRadius * Math.cos(theta), y: startRadius * Math.sin(theta), z: 0 },
      { x: endRadius * Math.cos(theta), y: endRadius * Math.sin(theta), z: armLength }
    ], false);
  }
  
  // Add details to forearm
  if (!highlight) {
    applyMaterial(pen, MATERIALS.PRIMARY, 0.8);
  }

  pen.push();
    pen.dotSize(8);
  pen.pop();
  
  // Cooling vents
  for (let i = 1; i <= 3; i++) {
    const z = armLength * (i / 4);
    const radius = startRadius * (1 - z/armLength) + endRadius * (z/armLength);
    
    // Top vent
    pen.polyline([
      { x: -radius * 0.6, y: radius * 0.8, z: z - 0.3 },
      { x: radius * 0.6, y: radius * 0.8, z: z - 0.3 },
      { x: radius * 0.6, y: radius * 0.8, z: z + 0.3 },
      { x: -radius * 0.6, y: radius * 0.8, z: z + 0.3 },
      { x: -radius * 0.6, y: radius * 0.8, z: z - 0.3 }
    ], false);
    
    // Bottom vent
    pen.polyline([
      { x: -radius * 0.6, y: -radius * 0.8, z: z - 0.3 },
      { x: radius * 0.6, y: -radius * 0.8, z: z - 0.3 },
      { x: radius * 0.6, y: -radius * 0.8, z: z + 0.3 },
      { x: -radius * 0.6, y: -radius * 0.8, z: z + 0.3 },
      { x: -radius * 0.6, y: -radius * 0.8, z: z - 0.3 }
    ], false);
    
    // Add vent details
    for (let j = -1; j <= 1; j += 2) {
      for (let v = -2; v <= 2; v++) {
        pen.polyline([
          { x: v * 0.2, y: j * radius * 0.8, z: z - 0.2 },
          { x: v * 0.2, y: j * radius * 0.8, z: z + 0.2 }
        ], false);
      }
    }
  }
  
  pen.pop();
  
  return pen;
}

// Draw wrist and end effector
function drawWrist(pen, angle = 0, rotation = 0, gripWidth = 0.5, toolExtended = false, highlight = false) {
  pen.push();
  
  // Position at the end of forearm
  pen.moveBy(0, 0, 10);
  
  // Apply appropriate material
  if (highlight) {
    applyMaterial(pen, MATERIALS.HIGHLIGHT);
  } else {
    applyMaterial(pen, MATERIALS.PRIMARY);
  }
  
  // Draw wrist joint (ball-like)
  const jointRadius = 1.5;
  const segments = 10;
  
  // Draw simplified sphere
  for (let j = 0; j <= 1; j++) {
    const phi = j * Math.PI;
    const y = jointRadius * Math.cos(phi);
    const radius = jointRadius * Math.sin(phi);
    
    const points = [];
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      points.push({
        x: radius * Math.cos(theta),
        y: y,
        z: radius * Math.sin(theta)
      });
    }
    
    pen.push();
      pen.dotSize(8);
    pen.pop();
    pen.polyline(points, true);
  }
  
  // Add equatorial circle
  const equator = [];
  for (let i = 0; i <= segments; i++) {
    const theta = (i / segments) * Math.PI * 2;
    equator.push({
      x: jointRadius * Math.cos(theta),
      y: 0,
      z: jointRadius * Math.sin(theta)
    });
  }
  pen.polyline(equator, true);
  
  // Apply wrist pitch and rotation
  pen.pitch(angle);
  pen.roll(rotation);
  
  // Draw tool mounting plate
  const plateRadius = 1.2;
  const platePoints = [];
  for (let i = 0; i <= segments; i++) {
    const theta = (i / segments) * Math.PI * 2;
    platePoints.push({
      x: plateRadius * Math.cos(theta),
      y: plateRadius * Math.sin(theta),
      z: 0.5
    });
  }
  pen.polyline(platePoints, true);
  
  // Draw gripper base
  const gripperBaseWidth = 1.8;
  const gripperBaseHeight = 0.8;
  
  pen.polyline([
    { x: -gripperBaseWidth/2, y: -gripperBaseHeight/2, z: 0.5 },
    { x: gripperBaseWidth/2, y: -gripperBaseHeight/2, z: 0.5 },
    { x: gripperBaseWidth/2, y: gripperBaseHeight/2, z: 0.5 },
    { x: -gripperBaseWidth/2, y: gripperBaseHeight/2, z: 0.5 },
    { x: -gripperBaseWidth/2, y: -gripperBaseHeight/2, z: 0.5 }
  ], false);
  
  // Connect joint to plate
  for (let i = 0; i < 4; i++) {
    const theta = (i / 4) * Math.PI * 2;
    const x = jointRadius * 0.7 * Math.cos(theta);
    const y = jointRadius * 0.7 * Math.sin(theta);
    
    pen.polyline([
      { x: x, y: y, z: 0 },
      { x: x * 0.8, y: y * 0.8, z: 0.5 }
    ], false);
  }
  
  // Draw grippers
  if (!highlight) {
    applyMaterial(pen, MATERIALS.SECONDARY);
  }
  
  // Gripper dimensions
  const gripperLength = 3;
  const gripperThickness = 0.4;
  
  // Left gripper
  pen.polyline([
    { x: -gripperBaseWidth/2, y: 0, z: 0.5 },
    { x: -gripperBaseWidth/2 - gripWidth, y: 0, z: gripperLength + 0.5 }
  ], false);
  
  pen.polyline([
    { x: -gripperBaseWidth/2 - gripWidth - gripperThickness, y: 0, z: gripperLength + 0.5 },
    { x: -gripperBaseWidth/2 - gripWidth, y: 0, z: gripperLength + 0.5 },
    { x: -gripperBaseWidth/2 - gripWidth, y: 0, z: gripperLength + 0.5 - gripperThickness },
  ], false);
  
  // Right gripper
  pen.polyline([
    { x: gripperBaseWidth/2, y: 0, z: 0.5 },
    { x: gripperBaseWidth/2 + gripWidth, y: 0, z: gripperLength + 0.5 }
  ], false);
  
  pen.polyline([
    { x: gripperBaseWidth/2 + gripWidth + gripperThickness, y: 0, z: gripperLength + 0.5 },
    { x: gripperBaseWidth/2 + gripWidth, y: 0, z: gripperLength + 0.5 },
    { x: gripperBaseWidth/2 + gripWidth, y: 0, z: gripperLength + 0.5 - gripperThickness },
  ], false);
  
  // Draw tool attachments
  if (toolExtended) {
    if (!highlight) {
      applyMaterial(pen, MATERIALS.WARNING);
    }
    
    // Tool extends from center
    const toolLength = 4;
    
    // Draw tool shaft
    pen.polyline([
      { x: 0, y: 0, z: 0.5 },
      { x: 0, y: 0, z: toolLength + 0.5 }
    ], false);
    
    // Draw tool tip (laser emitter or probe)
    const tipRadius = 0.4;
    const tipPoints = [];
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      tipPoints.push({
        x: tipRadius * Math.cos(theta),
        y: tipRadius * Math.sin(theta),
        z: toolLength + 0.5
      });
    }
    pen.polyline(tipPoints, true);
    
    // Tool effect (laser or scan beam)
    pen.colorRGB(1, 0.3, 0);
    pen.dotSize(3).fuzz(6, 0.15).residue(0.2);
    
    // Draw beam
    const beamLength = 8;
    pen.polyline([
      { x: 0, y: 0, z: toolLength + 0.5 },
      { x: 0, y: 0, z: toolLength + beamLength + 0.5 }
    ], false);
    
    // Add beam endpoint
    pen.moveTo(0, 0, toolLength + beamLength + 0.5);
    pen.dot();
  }
  
  pen.pop();
  
  return pen;
}

// Draw target object for interaction
function drawTargetObject(pen, position, type = "cube") {
  pen.push();
  
  // Move to object position
  pen.moveTo(position.x, position.y, position.z);
  
  // Apply material
  applyMaterial(pen, MATERIALS.INTERFACE);
  
  if (type === "cube") {
    // Draw cube with dimension 3
    const size = 3;
    const halfSize = size / 2;
    
    // Bottom face
    pen.polyline([
      { x: -halfSize, y: -halfSize, z: -halfSize },
      { x: halfSize, y: -halfSize, z: -halfSize },
      { x: halfSize, y: halfSize, z: -halfSize },
      { x: -halfSize, y: halfSize, z: -halfSize },
      { x: -halfSize, y: -halfSize, z: -halfSize }
    ], false);
    
    // Top face
    pen.polyline([
      { x: -halfSize, y: -halfSize, z: halfSize },
      { x: halfSize, y: -halfSize, z: halfSize },
      { x: halfSize, y: halfSize, z: halfSize },
      { x: -halfSize, y: halfSize, z: halfSize },
      { x: -halfSize, y: -halfSize, z: halfSize }
    ], false);
    
    // Connect faces with vertical lines
    pen.polyline([
      { x: -halfSize, y: -halfSize, z: -halfSize },
      { x: -halfSize, y: -halfSize, z: halfSize }
    ], false);
    
    pen.polyline([
      { x: halfSize, y: -halfSize, z: -halfSize },
      { x: halfSize, y: -halfSize, z: halfSize }
    ], false);
    
    pen.polyline([
      { x: halfSize, y: halfSize, z: -halfSize },
      { x: halfSize, y: halfSize, z: halfSize }
    ], false);
    
    pen.polyline([
      { x: -halfSize, y: halfSize, z: -halfSize },
      { x: -halfSize, y: halfSize, z: halfSize }
    ], false);
  } else if (type === "sphere") {
    // Draw sphere with radius 2
    const radius = 2;
    const segments = 12;
    
    // Draw three orthogonal circles
    for (let axis = 0; axis < 3; axis++) {
      const points = [];
      for (let i = 0; i <= segments; i++) {
        const angle = (i / segments) * Math.PI * 2;
        const x = axis === 0 ? 0 : radius * Math.cos(angle);
        const y = axis === 1 ? 0 : (axis === 0 ? radius * Math.cos(angle) : radius * Math.sin(angle));
        const z = axis === 2 ? 0 : radius * Math.sin(angle);
        
        points.push({ x, y, z });
      }
      pen.polyline(points, true);
    }
  } else if (type === "cylinder") {
    // Draw cylinder with radius 1.5 and height 4
    const radius = 1.5;
    const height = 4;
    const halfHeight = height / 2;
    const segments = 16;
    
    // Top and bottom circles
    for (let end = -1; end <= 1; end += 2) {
      const points = [];
      for (let i = 0; i <= segments; i++) {
        const angle = (i / segments) * Math.PI * 2;
        points.push({
          x: radius * Math.cos(angle),
          y: radius * Math.sin(angle),
          z: end * halfHeight
        });
      }
      pen.polyline(points, true);
    }
    
    // Connect circles with lines
    for (let i = 0; i < segments; i += 2) {
      const angle = (i / segments) * Math.PI * 2;
      const x = radius * Math.cos(angle);
      const y = radius * Math.sin(angle);
      
      pen.polyline([
        { x, y, z: -halfHeight },
        { x, y, z: halfHeight }
      ], false);
    }
  }
  
  pen.pop();
  
  return pen;
}

// Draw scan pattern for environment analysis
function drawScanPattern(pen, target, time) {
  pen.push();
  
  // Apply scan material
  applyMaterial(pen, MATERIALS.SCAN);
  
  // Draw scanning pattern based on target type
  if (target.type === "cube") {
    // Grid scan pattern
    const size = 3;
    const halfSize = size / 2;
    const scanProgress = time % 3; // 3-second cycle
    
    if (scanProgress < 1) {
      // Horizontal scan
      const scanY = lerp(-halfSize, halfSize, scanProgress);
      
      pen.polyline([
        { x: -halfSize, y: scanY, z: -halfSize },
        { x: halfSize, y: scanY, z: -halfSize },
        { x: halfSize, y: scanY, z: halfSize },
        { x: -halfSize, y: scanY, z: halfSize }
      ], false);
    } else if (scanProgress < 2) {
      // Vertical scan
      const scanX = lerp(-halfSize, halfSize, scanProgress - 1);
      
      pen.polyline([
        { x: scanX, y: -halfSize, z: -halfSize },
        { x: scanX, y: halfSize, z: -halfSize },
        { x: scanX, y: halfSize, z: halfSize },
        { x: scanX, y: -halfSize, z: halfSize }
      ], false);
    } else {
      // Depth scan
      const scanZ = lerp(-halfSize, halfSize, scanProgress - 2);
      
      pen.polyline([
        { x: -halfSize, y: -halfSize, z: scanZ },
        { x: halfSize, y: -halfSize, z: scanZ },
        { x: halfSize, y: halfSize, z: scanZ },
        { x: -halfSize, y: halfSize, z: scanZ }
      ], false);
    }
  } else if (target.type === "sphere") {
    // Spiral scan pattern
    const radius = 2;
    const scanProgress = (time % 2) / 2; // 2-second cycle
    const spiralTurns = 8;
    const scanPoints = [];
    
    // Create spiral pattern
    for (let i = 0; i <= 30; i++) {
      const t = i / 30 * scanProgress;
      const theta = t * Math.PI * 2 * spiralTurns;
      const phi = t * Math.PI;
      
      // Spherical to Cartesian conversion
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      
      scanPoints.push({ x, y, z });
    }
    
    pen.polyline(scanPoints, false);
    
    // Add scan endpoint
    if (scanPoints.length > 0) {
      pen.moveTo(scanPoints[scanPoints.length - 1].x, 
                scanPoints[scanPoints.length - 1].y, 
                scanPoints[scanPoints.length - 1].z);
      pen.dot();
    }
  } else if (target.type === "cylinder") {
    // Radial scan pattern
    const radius = 1.5;
    const height = 4;
    const halfHeight = height / 2;
    const scanProgress = (time % 2) / 2; // 2-second cycle
    
    // Calculate current scan angle
    const scanAngle = scanProgress * Math.PI * 2;
    const segments = 12;
    
    // Vertical scan line
    const x = radius * Math.cos(scanAngle);
    const y = radius * Math.sin(scanAngle);
    
    pen.polyline([
      { x, y, z: -halfHeight },
      { x, y, z: halfHeight }
    ], false);
    
    // Circular scan at current height
    const scanHeight = lerp(-halfHeight, halfHeight, Math.sin(time * 2) * 0.5 + 0.5);
    const circlePoints = [];
    
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      circlePoints.push({
        x: radius * Math.cos(angle),
        y: radius * Math.sin(angle),
        z: scanHeight
      });
    }
    
    pen.polyline(circlePoints, true);
  }
  
  pen.pop();
}

// Draw diagnostic interface elements
function drawDiagnostics(pen, time) {
  pen.push();
  
  applyMaterial(pen, MATERIALS.INTERFACE);
  
  // Position interface elements in view space
  // Main status text
  draw.text(systemStatus, { x: 0, y: 22, z: 0 }, 1.5);
  
  // Test phase info
  const phaseNames = [
    "INITIALIZATION",
    "ROTATIONAL MOBILITY TEST",
    "ARTICULATION TEST",
    "GRIP STRENGTH TEST",
    "TOOL OPERATION TEST",
    "OBJECT INTERACTION TEST",
    "DIAGNOSTICS COMPLETE"
  ];
  
  // Show current test phase
  if (testPhase < phaseNames.length) {
    draw.text("TEST: " + phaseNames[testPhase], { x: 0, y: 19, z: 0 }, 1.2);
  }
  
  // Power level indicator
  draw.text("POWER: " + powerLevel.toFixed(1) + "%", { x: -20, y: 22, z: 0 }, 1);
  
  // Make power level blink if low
  if (powerLevel < 20 && Math.sin(time * 10) > 0) {
    pen.colorRGB(1, 0.3, 0);
    draw.text("LOW POWER", { x: -20, y: 20, z: 0 }, 1);
  }
  
  // Show sensor readings
  for (let i = 0; i < sensorReadings.length && i < 5; i++) {
    const reading = sensorReadings[i];
    pen.colorRGB(reading.color.r, reading.color.g, reading.color.b);
    draw.text(reading.label + ": " + reading.value, { x: -20, y: 17 - i * 2, z: 0 }, 0.8);
  }
  
  // Show diagnostic text
  for (let i = 0; i < diagnosticText.length && i < 3; i++) {
    const text = diagnosticText[i];
    draw.text(text, { x: 0, y: -20 - i * 2, z: 0 }, 0.8);
  }
  
  // Add time indicator
  draw.text("T+" + time.toFixed(1) + "s", { x: 20, y: 22, z: 0 }, 1);
  
  pen.pop();
}

// Update robot animation based on test phase
function updateRobotAnimation(time) {
  // Decrease power slowly
  powerLevel = Math.max(0, 100 - time * 0.5);
  
  // Calculate phase timing
  const phaseDuration = 10; // 10 seconds per test phase
  testPhase = Math.min(6, Math.floor(time / phaseDuration));
  const phaseTime = time % phaseDuration;
  
  // Reset diagnostic text
  diagnosticText = [];
  
  // Update system status based on phase
  if (testPhase === 0) {
    systemStatus = "INITIALIZING";
  } else if (testPhase < 6) {
    systemStatus = "TESTING";
  } else {
    systemStatus = "OPERATIONAL";
  }
  
  // Set diagnostic text and update animation parameters based on test phase
  switch(testPhase) {
    case 0: // Initialization
      // Startup sequence
      baseRotation = 0;
      shoulderAngle = -90 + phaseTime * 9; // Gradually raise arm
      elbowAngle = phaseTime * 9; // Gradually bend elbow
      wristAngle = 0;
      wristRotation = 0;
      gripperWidth = 0;
      toolExtension = 0;
      
      // Diagnostic text
      diagnosticText = [
        "BOOTING SYSTEM...",
        "CALIBRATING SERVOS...",
        "INITIALIZING SENSORS..."
      ];
      
      // Sensor readings during boot
      sensorReadings = [
        { label: "VOLTAGE", value: (12 + Math.sin(time * 2)).toFixed(2) + "V", color: { r: 0, g: 1, b: 0 } },
        { label: "TEMP", value: (20 + phaseTime * 2).toFixed(1) + "°C", color: { r: 0, g: 1, b: 0 } },
        { label: "CPU", value: (50 + phaseTime * 5).toFixed(0) + "%", color: { r: 0, g: 1, b: 0 } }
      ];
      
      // No target object yet
      targetObject = null;
      break;
      
    case 1: // Rotational mobility test
      // Test base rotation
      baseRotation = Math.sin(phaseTime * 0.5) * 180;
      shoulderAngle = 0;
      elbowAngle = 45;
      wristAngle = -15;
      wristRotation = phaseTime * 36; // Spin wrist
      gripperWidth = 0.5;
      toolExtension = 0;
      
      // Diagnostic text
      diagnosticText = [
        "TESTING ROTATIONAL MOBILITY",
        "BASE ROTATION: " + baseRotation.toFixed(1) + "°",
        "WRIST ROTATION: " + wristRotation.toFixed(1) + "°"
      ];
      
      // Sensor readings during rotation test
      sensorReadings = [
        { label: "BASE TORQUE", value: (5 + Math.abs(Math.cos(phaseTime * 0.5) * 3)).toFixed(2) + "Nm", color: { r: 0, g: 1, b: 0 } },
        { label: "ROTATION", value: baseRotation.toFixed(1) + "°", color: { r: 0, g: 1, b: 0 } },
        { label: "WRIST SPEED", value: "36.0°/s", color: { r: 0, g: 1, b: 0 } }
      ];
      
      // No target object yet
      targetObject = null;
      break;
      
    case 2: // Articulation test
      // Test arm articulation
      baseRotation = 0;
      
      // Wave-like motion
      const t = phaseTime * 0.6;
      shoulderAngle = 30 * Math.sin(t) - 10;
      elbowAngle = 60 + 30 * Math.sin(t + 1);
      wristAngle = 20 * Math.sin(t + 2);
      wristRotation = 0;
      gripperWidth = 0.5;
      toolExtension = 0;
      
      // Diagnostic text
      diagnosticText = [
        "TESTING JOINT ARTICULATION",
        "SHOULDER: " + shoulderAngle.toFixed(1) + "°",
        "ELBOW: " + elbowAngle.toFixed(1) + "°"
      ];
      
      // Sensor readings during articulation test
      sensorReadings = [
        { label: "SHOULDER STRAIN", value: (20 + Math.abs(Math.sin(t) * 10)).toFixed(1) + "%", color: { r: 0, g: 1, b: 0 } },
        { label: "ELBOW STRAIN", value: (15 + Math.abs(Math.sin(t + 1) * 10)).toFixed(1) + "%", color: { r: 0, g: 1, b: 0 } },
        { label: "WRIST STRAIN", value: (10 + Math.abs(Math.sin(t + 2) * 10)).toFixed(1) + "%", color: { r: 0, g: 1, b: 0 } }
      ];
      
      // No target object yet
      targetObject = null;
      break;
      
    case 3: // Grip strength test
      // Position arm for grip test
      baseRotation = 0;
      shoulderAngle = -20;
      elbowAngle = 100;
      wristAngle = -30;
      wristRotation = 0;
      
      // Test gripper operation
      const gripCycle = (phaseTime % 5) / 5; // 5-second cycle
      if (gripCycle < 0.4) {
        // Open gripper
        gripperWidth = lerp(0, 2, gripCycle / 0.4);
      } else if (gripCycle < 0.5) {
        // Hold open
        gripperWidth = 2;
      } else if (gripCycle < 0.9) {
        // Close gripper
        gripperWidth = lerp(2, 0, (gripCycle - 0.5) / 0.4);
      } else {
        // Hold closed
        gripperWidth = 0;
      }
      
      toolExtension = 0;
      
      // Diagnostic text
      diagnosticText = [
        "TESTING GRIP STRENGTH",
        "GRIPPER WIDTH: " + gripperWidth.toFixed(2) + " units",
        "PRESSURE: " + (100 - gripperWidth * 50).toFixed(0) + "kPa"
      ];
      
      // Sensor readings during grip test
      sensorReadings = [
        { label: "GRIP FORCE", value: (50 - gripperWidth * 25).toFixed(1) + "N", color: { r: 0, g: 1, b: 0 } },
        { label: "MOTOR TEMP", value: (25 + (1 - gripperWidth) * 10).toFixed(1) + "°C", color: { r: 0, g: 1, b: 0 } },
        { label: "GRIP WIDTH", value: gripperWidth.toFixed(2) + " units", color: { r: 0, g: 1, b: 0 } }
      ];
      
      // Add test object (cube) in position for gripper
      targetObject = {
        type: "cube",
        position: { x: 0, y: 0, z: 25 }
      };
      break;
      
    case 4: // Tool operation test
      // Position arm for tool test
      baseRotation = 0;
      shoulderAngle = -30;
      elbowAngle = 120;
      wristAngle = -45;
      wristRotation = phaseTime * 18; // Slow rotation during tool test
      gripperWidth = 0.5;
      
      // Extend and retract tool
      const toolCycle = (phaseTime % 4) / 4; // 4-second cycle
      toolExtension = toolCycle < 0.5;
      
      // Diagnostic text
      diagnosticText = [
        "TESTING TOOL OPERATION",
        "TOOL STATUS: " + (toolExtension ? "ACTIVE" : "STANDBY"),
        "POWER OUTPUT: " + (toolExtension ? (50 + Math.sin(time * 5) * 5).toFixed(1) + "W" : "0.0W")
      ];
      
      // Sensor readings during tool test
      sensorReadings = [
        { label: "TOOL TEMP", value: (30 + (toolExtension ? 20 : 0)).toFixed(1) + "°C", 
          color: toolExtension ? { r: 1, g: 0.5, b: 0 } : { r: 0, g: 1, b: 0 } },
        { label: "POWER DRAW", value: (toolExtension ? 15 : 5).toFixed(1) + "W", 
          color: toolExtension ? { r: 1, g: 0.5, b: 0 } : { r: 0, g: 1, b: 0 } },
        { label: "FOCAL DIST", value: "8.0 units", color: { r: 0, g: 1, b: 0 } }
      ];
      
      // Add test object (sphere) for tool interaction
      targetObject = {
        type: "sphere",
        position: { x: 0, y: 0, z: 30 }
      };
      break;
      
    case 5: // Object interaction test
      // Position arm for interaction test
      baseRotation = Math.sin(phaseTime * 0.3) * 30;
      shoulderAngle = -20 + Math.sin(phaseTime * 0.4) * 10;
      elbowAngle = 100 + Math.sin(phaseTime * 0.4) * 20;
      wristAngle = -30 + Math.sin(phaseTime * 0.5) * 15;
      wristRotation = Math.sin(phaseTime * 0.2) * 90;
      
      // Grip object
      gripperWidth = 0.8 + Math.sin(phaseTime * 0.6) * 0.3;
      toolExtension = phaseTime > 5; // Activate tool in second half
      
      // Diagnostic text
      diagnosticText = [
        "TESTING OBJECT INTERACTION",
        "SURFACE ANALYSIS IN PROGRESS",
        "MATERIAL: " + (phaseTime > 7 ? "IDENTIFIED" : "ANALYZING...")
      ];
      
      // Sensor readings during interaction test
      sensorReadings = [
        { label: "PROXIMITY", value: (20 + Math.sin(phaseTime * 0.4) * 5).toFixed(1) + "mm", color: { r: 0, g: 1, b: 0 } },
        { label: "HARDNESS", value: (75 + Math.sin(phaseTime) * 5).toFixed(1), color: { r: 0, g: 1, b: 0 } },
        { label: "SCAN COMP", value: (Math.min(100, phaseTime * 10)).toFixed(0) + "%", 
          color: phaseTime > 9 ? { r: 0, g: 1, b: 0 } : { r: 1, g: 1, b: 0 } }
      ];
      
      // Add test object (cylinder) for interaction
      targetObject = {
        type: "cylinder",
        position: { x: 0, y: 0, z: 25 }
      };
      break;
      
    case 6: // Test complete
      // Position arm in ready position
      baseRotation = Math.sin(time * 0.2) * 45;
      shoulderAngle = -15;
      elbowAngle = 45;
      wristAngle = 0;
      wristRotation = time * 10;
      gripperWidth = 1;
      toolExtension = false;
      
      // Diagnostic text
      diagnosticText = [
        "ALL TESTS COMPLETE",
        "SYSTEM READY FOR OPERATION",
        "AWAITING COMMANDS..."
      ];
      
      // Sensor readings when test complete
      sensorReadings = [
        { label: "STATUS", value: "NOMINAL", color: { r: 0, g: 1, b: 0 } },
        { label: "SYSTEMS", value: "100% OPERATIONAL", color: { r: 0, g: 1, b: 0 } },
        { label: "UPTIME", value: time.toFixed(0) + "s", color: { r: 0, g: 1, b: 0 } }
      ];
      
      // No target object
      targetObject = null;
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
      { x: 40, y: 20, z: 40 },
      { x: 0, y: 10, z: 0 }
    );
  }
  
  // Update robot animation based on test phase
  updateRobotAnimation(time);
  
  // Draw diagnostic interface
  drawDiagnostics(pen, time);
  
  // Draw robot arm components in articulated position
  pen.push();
  
  // Draw base with rotation
  drawRobotBase(pen, baseRotation, testPhase === 1);
  
  // Draw shoulder and upper arm
  pen.push();
  pen.moveBy(0, 3.5, 0);
  pen.yaw(baseRotation);
  drawShoulder(pen, shoulderAngle, testPhase === 2);
  
  // Draw elbow and forearm
  pen.push();
  pen.moveBy(0, 3.25, 1);
  pen.pitch(shoulderAngle);
  drawElbow(pen, elbowAngle, testPhase === 2);
  
  // Draw wrist and end effector
  pen.push();
  pen.moveBy(0, 0, 12);
  pen.pitch(elbowAngle);
  drawWrist(pen, wristAngle, wristRotation, gripperWidth, toolExtension, testPhase >= 3 && testPhase <= 4);
  pen.pop(); // End wrist
  
  pen.pop(); // End elbow
  
  pen.pop(); // End shoulder
  
  pen.pop(); // End robot
  
  // Draw target object if present
  if (targetObject !== null) {
    // Transform object position to world space
    let worldPos = targetObject.position;

    worldPos.z -= 6;
    
    // Draw object
    drawTargetObject(pen, worldPos, targetObject.type);
    
    // Draw scan pattern during object interaction and tool test phases
    if (testPhase === 4 || testPhase === 5) {
      // Translate to object position
      pen.push();
      pen.moveTo(worldPos.x, worldPos.y, worldPos.z);
      
      // Draw scan pattern
      drawScanPattern(pen, targetObject, time);
      
      pen.pop();
    }
  }
  
  // Update frame counter
  frameCount++;
}