/* =============================================================
   Laser-Tracer demo : Pulsed Ion Thruster Array
   -------------------------------------------------------------
   A futuristic ion propulsion system with multiple acceleration
   stages, particle emitters, and electromagnetic field coils.
   Features:
   - Central ion acceleration chamber with pulsing beam
   - Multiple electromagnetic field coils with animated currents
   - Radiating heat exchanger fins
   - Particle injection rings that pulse with activity
   - Exhaust grid with variable aperture
================================================================ */

// ────────────────── high-level system description ─────────────
const ION_CHAMBER = {
  innerR: 5,
  outerR: 8,
  length: 15,
  segments: 8,
  emitters: 4
};

const FIELD_COILS = [
  // { pos: 5, innerR: 9, outerR: 14, thickness: 1.2, turns: 6 },
  // { pos: 12, innerR: 9, outerR: 16, thickness: 1.5, turns: 8 },
  { pos: 20, innerR: 10, outerR: 18, thickness: 2, turns: 10 }
];

const PARTICLE_RINGS = [
  // { pos: 8, radius: 9, emitters: 12, pulseFreq: 1.2 },
  // { pos: 15, radius: 10, emitters: 16, pulseFreq: 0.8 },
  { pos: 24, radius: 12, emitters: 18, pulseFreq: 0.5 }
];

const RADIATOR_FINS = {
  pos: 17,
  count: 4,
  innerR: 18,
  outerR: 28,
  length: 10,
  segments: 5
};

const EXHAUST_GRID = {
  pos: 30,
  innerR: 2,
  outerR: 14,
  holes: 24,
  holeSize: 2.5
};

// ────────────────── materials ──────────────────────────────────
const MATERIALS = {
  chamber: { r: 0.1, g: 0.8, b: 0.9, size: 12, gap: 0.2 },
  coils: { r: 0.7, g: 0.3, b: 1.0, size: 13, gap: 0.2 },
  emitters: { r: 1.0, g: 0.5, b: 0.0, size: 14, gap: 0.2 },
  radiator: { r: 0.2, g: 0.6, b: 0.8, size: 11, gap: 0.2 },
  exhaust: { r: 1, g: 0.8, b: .0, size: 12, gap: 0.2 },
  beam: { r: 1, g: 0.0, b: .0, size: 10, gap: 0.1 },
  particles: { r: 1.0, g: 0.9, b: 0.4, size: 12, gap: 0.3 }
};

function mat(p, m, intensityMod = 1.0) {
  const { r, g, b, size, gap } = MATERIALS[m];
  return p.colorRGB(r * intensityMod, g * intensityMod, b * intensityMod)
          .dotSize(size)
          .traceGap(gap)
          .fuzz(0)
          .residue(0.7);
}

// ────────────────── geometry helpers ───────────────────────────
function circle(r, z, segs = 36) {
  const pts = [];
  for (let i = 0; i <= segs; i++) {
    const a = (i / segs) * Math.PI * 2;
    pts.push({ x: Math.cos(a) * r, y: Math.sin(a) * r, z });
  }
  return pts;
}

function spiral(innerR, outerR, z, turns, segs = 72) {
  const pts = [];
  for (let i = 0; i <= segs; i++) {
    const t = i / segs;
    const r = innerR + (outerR - innerR) * t;
    const a = t * Math.PI * 2 * turns;
    pts.push({ x: Math.cos(a) * r, y: Math.sin(a) * r, z });
  }
  return pts;
}

// ────────────────── component builders ─────────────────────────
function buildIonChamber(p, spec, time) {
  const { innerR, outerR, length, segments, emitters } = spec;
  mat(p, "chamber");

  // Chamber rings
  const rings = [];
  for (let i = 0; i <= segments; i++) {
    const z = (i / segments) * length;
    // Create a slightly bulging profile
    const t = i / segments;
    const bulge = Math.sin(t * Math.PI) * 0.2 + 1;
    const r = outerR * bulge;
    
    const ring = circle(r, z);
    p.polyline(ring, true);
    rings.push(ring);
  }
  
  // Longitudinal supports
  for (let i = 0; i < SEG; i += 3) {
    p.polyline(rings.map((ring) => ring[i]), false);
  }
  
  // Inner chamber with pulsing ion beam
  const pulseIntensity = (Math.sin(time * 5) * 0.5 + 0.5) * 0.8 + 0.2;
  mat(p, "beam", pulseIntensity);
  p.push();
  
  // Central beam - use spiral to create a helix effect
  for (let i = 0; i < 3; i++) {
    const phaseOffset = i * (Math.PI * 2 / 3);
    const beamR = innerR * 0.8;
    
    const beamPoints = [];
    const steps = 80;
    for (let j = 0; j <= steps; j++) {
      const z = (j / steps) * length;
      const t = j / steps;
      const wobble = Math.sin(t * Math.PI * 8 + time * 20 + phaseOffset) * 0.3;
      beamPoints.push({ 
        x: Math.cos(t * 20 + time * 15 + phaseOffset) * beamR * (0.5 + wobble), 
        y: Math.sin(t * 20 + time * 15 + phaseOffset) * beamR * (0.5 + wobble), 
        z 
      });
    }
    p.polyline(beamPoints, false);
  }
  p.pop();
  
  // Emitter nodes
  mat(p, "emitters");
  for (let i = 0; i < emitters; i++) {
    const angle = (i / emitters) * Math.PI * 2;
    const emitterPos = { 
      x: Math.cos(angle) * innerR * 1.1, 
      y: Math.sin(angle) * innerR * 1.1, 
      z: length * 0.3
    };
    
    p.push();
    p.moveTo(emitterPos.x, emitterPos.y, emitterPos.z);
    p.dot();
    
    // Draw small emitter structures
    const emitterRays = 5;
    for (let j = 0; j < emitterRays; j++) {
      const rayAngle = (j / emitterRays) * Math.PI * 2;
      const rayLength = 0.8 + Math.sin(time * 3 + i + j) * 0.3;
      p.push();
      p.yaw(rayAngle * (180 / Math.PI));
      p.pitch(45);
      p.traceBy(rayLength, 0, 0);
      p.pop();
    }
    p.pop();
  }
  
  return length;
}

function buildFieldCoil(p, spec, time) {
  const { innerR, outerR, thickness, turns } = spec;
  
  // Animate the field intensity
  const pulseFreq = 2 + turns * 0.2;
  const pulsePhase = (Math.sin(time * pulseFreq) * 0.3 + 0.7);
  mat(p, "coils", pulsePhase);
  
  // Main coil windings - a spiral with thickness
  for (let layer = 0; layer < thickness; layer += thickness / 3) {
    const layerZ = layer - thickness / 2;
    p.polyline(spiral(innerR, outerR, layerZ, turns), false);
  }
  
  // End caps at both ends of the coil
  p.polyline(circle(innerR, -thickness/2), true);
  p.polyline(circle(outerR, -thickness/2), true);
  p.polyline(circle(innerR, thickness/2), true);
  p.polyline(circle(outerR, thickness/2), true);
  
  // Radial connectors
  const spokes = 6;
  for (let i = 0; i < spokes; i++) {
    const angle = (i / spokes) * Math.PI * 2;
    const x1 = Math.cos(angle) * innerR;
    const y1 = Math.sin(angle) * innerR;
    const x2 = Math.cos(angle) * outerR;
    const y2 = Math.sin(angle) * outerR;
    
    p.polyline([
      { x: x1, y: y1, z: -thickness/2 },
      { x: x2, y: y2, z: -thickness/2 }
    ], false);
    
    p.polyline([
      { x: x1, y: y1, z: thickness/2 },
      { x: x2, y: y2, z: thickness/2 }
    ], false);
  }
  
  // // Field lines visualization (optional)
  // if (pulsePhase > 0.6) {
  //   mat(p, "beam", pulsePhase * 0.5);
  //   const fieldLines = 8;
  //   for (let i = 0; i < fieldLines; i++) {
  //     const angle = (i / fieldLines) * Math.PI * 2;
  //     const radius = innerR * 0.8;
  //     const x = Math.cos(angle) * radius;
  //     const y = Math.sin(angle) * radius;
      
  //     // Create curved field lines
  //     const linePoints = [];
  //     const lineSteps = 20;
  //     for (let j = 0; j <= lineSteps; j++) {
  //       const t = j / lineSteps;
  //       const bend = Math.sin(t * Math.PI) * 3;
  //       const fieldX = x * (1 + bend * 0.1);
  //       const fieldY = y * (1 + bend * 0.1);
  //       const fieldZ = (t - 0.5) * 8;
        
  //       linePoints.push({ x: fieldX, y: fieldY, z: fieldZ });
  //     }
  //     p.polyline(linePoints, false);
  //   }
  // }
  
  return thickness;
}

function buildParticleRing(p, spec, time) {
  // const { radius, emitters, pulseFreq } = spec;
  
  // // Base ring structure
  // mat(p, "chamber");
  // p.polyline(circle(radius, 0), true);
  // p.polyline(circle(radius, 0.8), true);
  
  // // Connect rings
  // for (let i = 0; i < 12; i++) {
  //   const angle = (i / 12) * Math.PI * 2;
  //   const x = Math.cos(angle) * radius;
  //   const y = Math.sin(angle) * radius;
    
  //   p.polyline([
  //     { x, y, z: 0 },
  //     { x, y, z: 0.8 }
  //   ], false);
  // }
  
  // // Particle emitters that pulse
  // const particlePhase = (Math.sin(time * pulseFreq) * 0.5 + 0.5);
  
  // if (particlePhase > 0.3) {
  //   mat(p, "particles", particlePhase);
    
  //   for (let i = 0; i < emitters; i++) {
  //     const angle = (i / emitters) * Math.PI * 2;
  //     const emitterX = Math.cos(angle) * radius;
  //     const emitterY = Math.sin(angle) * radius;
      
  //     // Particle spray with randomized pattern
  //     const particleCount = Math.floor(3 + particlePhase * 5);
  //     for (let j = 0; j < particleCount; j++) {
  //       // Randomized particle positions
  //       const randAngle = angle + (Math.random() - 0.5) * 0.2;
  //       const randDist = 0.5 + Math.random() * 1.5 * particlePhase;
  //       const particleX = emitterX + Math.cos(randAngle) * randDist;
  //       const particleY = emitterY + Math.sin(randAngle) * randDist;
  //       const particleZ = 0.4 + Math.random() * 0.5;
        
  //       p.moveTo(particleX, particleY, particleZ).dot();
  //     }
  //   }
  // }
  
  return 1;
}

function buildRadiatorFins(p, spec) {
  const { count, innerR, outerR, length, segments } = spec;
  mat(p, "radiator");
  
  // Create tapered fins radiating outward
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2;
    const baseAngle = angle - (Math.PI / count);
    const tipAngle = angle + (Math.PI / count);
    
    // Fin points
    const finPoints = [];
    for (let j = 0; j <= segments; j++) {
      const t = j / segments;
      // Taper the fin
      const width = 1 - t * 0.7;
      const currentR = innerR + (outerR - innerR) * t;
      const currentBaseAngle = baseAngle * width;
      const currentTipAngle = tipAngle * width;
      const interpAngle = currentBaseAngle * (1 - t) + currentTipAngle * t;
      
      // Add some subtle curvature to the fins
      const curveOffset = Math.sin(t * Math.PI) * 2;
      const angularOffset = (Math.PI / 180) * curveOffset;
      
      const x = Math.cos(angle + angularOffset) * currentR;
      const y = Math.sin(angle + angularOffset) * currentR;
      const z = t * length;
      
      finPoints.push({ x, y, z });
    }
    
    // Draw the fin outline
    p.polyline(finPoints, false);
    
    // Draw some internal structure lines
    // const structureLines = 3;
    // for (let k = 1; k <= structureLines; k++) {
    //   const structureFactor = k / (structureLines + 1);
    //   const structurePoints = finPoints.map((pt, idx) => {
    //     const t = idx / finPoints.length;
    //     // Scale points toward fin center line
    //     return {
    //       x: pt.x * structureFactor,
    //       y: pt.y * structureFactor,
    //       z: pt.z
    //     };
    //   });
    //   p.polyline(structurePoints, false);
    // }
  }
  
  return length;
}

function buildExhaustGrid(p, spec, time) {
  const { innerR, outerR, holes, holeSize } = spec;
  mat(p, "exhaust");
  
  // Base grid ring
  p.polyline(circle(outerR, 0), true);
  p.polyline(circle(innerR, 0), true);
  
  // Grid structure - concentric rings
  const rings = 3;
  for (let i = 1; i < rings; i++) {
    const ringR = innerR + (outerR - innerR) * (i / rings);
    p.polyline(circle(ringR, 0), true);
  }
  
  // Radial spokes
  const spokes = 12;
  for (let i = 0; i < spokes; i++) {
    const angle = (i / spokes) * Math.PI * 2;
    const x1 = Math.cos(angle) * innerR;
    const y1 = Math.sin(angle) * innerR;
    const x2 = Math.cos(angle) * outerR;
    const y2 = Math.sin(angle) * outerR;
    
    p.polyline([
      { x: x1, y: y1, z: 0 },
      { x: x2, y: y2, z: 0 }
    ], false);
  }
  
  // Exhaust aperture holes that pulsate
  const apertureFactor = (Math.sin(time * 2) * 0.3 + 0.7);
  
  for (let ring = 0; ring < rings; ring++) {
    const ringR = innerR + (outerR - innerR) * ((ring + 0.5) / rings);
    const ringHoles = Math.floor(holes * (ringR / outerR));
    
    for (let i = 0; i < ringHoles; i++) {
      const angle = (i / ringHoles) * Math.PI * 2;
      const holeX = Math.cos(angle) * ringR;
      const holeY = Math.sin(angle) * ringR;
      
      // Draw exhaust energy coming from each hole
      if (apertureFactor > 0.5) {
        const beamIntensity = (apertureFactor - 0.5) * 2;
        const beamLength = 5 * beamIntensity;
        
        mat(p, "beam", beamIntensity);
        p.push();
        p.moveTo(holeX, holeY, 0);
        p.traceBy(0, 0, beamLength);
        p.pop();
      }
    }
  }
  
  return 2;
}

// ────────────────── ion beam visualizer ──────────────────────
function visualizeIonBeam(p, time, length = 60) {
  mat(p, "beam", 0.7);
  
  const beamPaths = 5;
  for (let i = 0; i < beamPaths; i++) {
    const radius = 1 + i * 0.5;
    const speed = 25 + i * 5;
    const twistFactor = 1 - i * 0.15;
    
    const beamPoints = [];
    const steps = 120;
    for (let j = 0; j <= steps; j++) {
      const t = j / steps;
      const z = t * length;
      
      // Create helix with diminishing radius toward the end
      const fadeout = 1 - Math.pow(t, 2);
      const twist = t * 20 * twistFactor + time * speed;
      const wobble = Math.sin(t * 10 + time * 3) * 0.2;
      
      beamPoints.push({
        x: Math.cos(twist) * radius * fadeout * (1 + wobble),
        y: Math.sin(twist) * radius * fadeout * (1 + wobble),
        z
      });
    }
    
    p.polyline(beamPoints, false);
  }
}

// ────────────────── environment ───────────────────────────────
const SEG = 36;

function grid(p) {
  p.push();
  p.colorRGB(0, 0.2, 0.3).dotSize(1.5).traceGap(0.5).fuzz(0).residue(0.5);
  const G = 80, S = 10;
  for (let x = -G; x <= G; x += S)
    p.polyline(
      [
        { x, y: -35, z: -G },
        { x, y: -35, z: G },
      ],
      false,
    );
  for (let z = -G; z <= G; z += S)
    p.polyline(
      [
        { x: -G, y: -35, z },
        { x: G, y: -35, z },
      ],
      false,
    );
  p.pop();
}

// ────────────────── main loop ──────────────────────────────────
let first = true;
function program(pen,d, time) {
  if (first) {
    setBGColor(0x000815); // Deep space blue
    first = false;
  }

  // Dynamic camera that showcases the structure
  const cameraAngle = time * 8;
  const cameraPitch = 15 + Math.sin(time * 0.3) * 10;
  const cameraDistance = 100 + Math.sin(time * 0.2) * 20;
  // orbitCamera({ x: 0, y: 0, z: 15 }, cameraDistance, cameraAngle, cameraPitch);
  
  grid(pen);

  pen.push();
  // Subtle overall rotation for effect
  // pen.yaw(time * 5);
  
  // Ion beam that extends from chamber through the entire system
  visualizeIonBeam(pen, time);

  // Position tracker for component assembly
  let zCursor = 0;

  // Ion chamber
  pen.push();
  zCursor += buildIonChamber(pen, ION_CHAMBER, time);
  pen.pop();

  // Place field coils at their specified positions
  for (const coil of FIELD_COILS) {
    pen.push();
    pen.moveBy(0, 0, coil.pos);
    buildFieldCoil(pen, coil, time);
    pen.pop();
  }

  // Place particle rings at their specified positions
  for (const ring of PARTICLE_RINGS) {
    pen.push();
    pen.moveBy(0, 0, ring.pos);
    buildParticleRing(pen, ring, time);
    pen.pop();
  }

  // Place radiator fins
  pen.push();
  pen.moveBy(0, 0, RADIATOR_FINS.pos);
  buildRadiatorFins(pen, RADIATOR_FINS);
  pen.pop();

  // Place exhaust grid
  pen.push();
  pen.moveBy(0, 0, EXHAUST_GRID.pos);
  buildExhaustGrid(pen, EXHAUST_GRID, time);
  pen.pop();

  pen.pop(); // global rotation frame
}