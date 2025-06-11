// The Geometries Beyond
// A Lovecraftian visualization of non-Euclidean spaces,
// interdimensional bleeding, and cosmic horror

// Global state for eldritch manifestations
let ancientOnes = [];
let dimensionalRifts = [];
let madnessLevel = 0;
let realityStability = 1.0;
let lastRitual = 0;
let cosmicCycle = 0;
let observerSanity = 100;

// Non-Euclidean geometry helpers
function impossibleAngle(base, distortion) {
  // Angles that don't add up to what they should
  return base + Math.sin(distortion * 13.7) * Math.PI * 0.3;
}

function hyperbolicDistance(p1, p2, curvature) {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  const dz = p2.z - p1.z;
  const euclidean = Math.sqrt(dx * dx + dy * dy + dz * dz);
  // Distance becomes non-linear in curved space-time
  return euclidean * (1 + curvature * Math.sin(euclidean * 0.1));
}

// Initialize the Ancient Ones - entities from beyond
function initializeAncientOnes() {
  ancientOnes = [];
  for (let i = 0; i < 7; i++) {
    ancientOnes.push({
      id: i,
      center: {
        x: (Math.random() - 0.5) * 200,
        y: (Math.random() - 0.5) * 150,
        z: (Math.random() - 0.5) * 100,
      },
      tentacles: [],
      awakening: Math.random() * 0.1,
      malevolence: 0.2 + Math.random() * 0.8,
      dimensionPhase: Math.random() * Math.PI * 2,
      lastManifestation: -1000,
      geometryType: Math.floor(Math.random() * 3), // 0: tentacled, 1: angular, 2: amorphous
    });

    // Generate tentacle structure for each entity
    const tentacleCount = 3 + Math.floor(Math.random() * 8);
    for (let t = 0; t < tentacleCount; t++) {
      ancientOnes[i].tentacles.push({
        segments: 12 + Math.floor(Math.random() * 8),
        baseAngle: (t / tentacleCount) * Math.PI * 2,
        writhing: Math.random() * 3 + 1,
        length: 15 + Math.random() * 25,
      });
    }
  }
}

// Initialize dimensional rifts
function initializeDimensionalRifts() {
  dimensionalRifts = [];
  for (let i = 0; i < 5; i++) {
    dimensionalRifts.push({
      center: {
        x: (Math.random() - 0.5) * 180,
        y: (Math.random() - 0.5) * 120,
        z: (Math.random() - 0.5) * 80,
      },
      size: 5 + Math.random() * 15,
      instability: Math.random(),
      leakage: 0,
      otherworldly: Math.random() > 0.5,
    });
  }
}

// Draw a tentacle using impossible curves
function drawTentacle(pen, entity, tentacle, time, awakening) {
  const segments = tentacle.segments;
  const segmentLength = tentacle.length / segments;

  pen
    .push()
    .residue(1.5)
    .dotSize(2 + awakening * 4)
    .traceGap(0.3)
    .fuzz(8 + Math.floor(awakening * 15), 1 + awakening * 2);

  let currentPos = { ...entity.center };
  let currentAngle = tentacle.baseAngle;
  let currentPitch = 0;

  pen.moveTo(currentPos.x, currentPos.y, currentPos.z);

  for (let seg = 0; seg < segments; seg++) {
    const segTime = time * tentacle.writhing + seg * 0.5;

    // Non-Euclidean writhing - tentacles bend through impossible angles
    const writhe = Math.sin(segTime) * 0.8 + Math.sin(segTime * 2.7) * 0.4;
    const impossibleBend = impossibleAngle(writhe, time + entity.id);

    currentAngle += impossibleBend;
    currentPitch += Math.sin(segTime * 1.3) * 0.6;

    // Each segment position calculated with hyperbolic geometry
    const dx = Math.cos(currentAngle) * Math.cos(currentPitch) * segmentLength;
    const dy = Math.sin(currentAngle) * Math.cos(currentPitch) * segmentLength;
    const dz = Math.sin(currentPitch) * segmentLength;

    currentPos.x += dx;
    currentPos.y += dy;
    currentPos.z += dz;

    // Color shifts toward eldritch hues as awakening increases
    const eldritchHue = 0.8 - awakening * 0.4 + Math.sin(segTime) * 0.1;
    const corruption = awakening * (0.7 + 0.3 * Math.sin(time * 3 + seg));

    pen
      .colorCubehelix(eldritchHue, 0.9, -2.5, 1.5 - corruption * 0.5)
      .traceTo(currentPos.x, currentPos.y, currentPos.z);

    // Sucker marks on tentacles - they pulse with malevolent life
    if (seg % 3 === 0 && Math.sin(time * 4 + seg) > 0.3) {
      pen
        .push()
        .dotSize(1 + awakening * 3)
        .fuzz(5, 0.8)
        .colorHex(0x8b0000 + Math.floor(corruption * 0x004400))
        .dot()
        .pop();
    }
  }

  pen.pop();
}

// Draw non-Euclidean angular geometry
function drawImpossibleGeometry(pen, entity, time, awakening) {
  pen.push().residue(2.0).dotSize(3).traceGap(0.4).fuzz(12, 2);

  const vertices = [];
  const vertexCount = 5 + Math.floor(awakening * 8);

  // Generate vertices that violate Euclidean rules
  for (let i = 0; i < vertexCount; i++) {
    const angle = impossibleAngle(
      (i * Math.PI * 2) / vertexCount,
      time + entity.id,
    );
    const radius = 20 + Math.sin(time * 2 + i) * 10 * awakening;
    const height = Math.sin(time * 1.7 + i * 0.8) * 15 * awakening;

    vertices.push({
      x: entity.center.x + Math.cos(angle) * radius,
      y: entity.center.y + Math.sin(angle) * radius,
      z: entity.center.z + height,
    });
  }

  // Connect vertices in impossible ways - edges that shouldn't connect do
  for (let i = 0; i < vertices.length; i++) {
    for (let j = i + 1; j < vertices.length; j++) {
      // Connections follow non-Euclidean logic
      const shouldConnect =
        Math.sin(time + i * j * 0.73) > 0.6 - awakening * 0.4;

      if (shouldConnect) {
        const corruption = awakening * (0.5 + 0.5 * Math.sin(time * 2 + i + j));
        pen
          .moveTo(vertices[i].x, vertices[i].y, vertices[i].z)
          .colorViridis(0.1 + corruption * 0.6)
          .traceTo(vertices[j].x, vertices[j].y, vertices[j].z);
      }
    }
  }

  pen.pop();
}

// Draw dimensional rift with otherworldly leakage
function drawDimensionalRift(pen, rift, time) {
  pen
    .push()
    .residue(0.8)
    .dotSize(4)
    .fuzz(20, rift.size * 0.3);

  // The rift itself - a tear in reality
  const riftPhase = time * 2 + rift.instability * 5;
  const riftRadius = rift.size * (1 + Math.sin(riftPhase) * 0.3);

  for (let angle = 0; angle < Math.PI * 2; angle += 0.2) {
    const distortion =
      1 + rift.instability * Math.sin(angle * 3 + riftPhase) * 0.5;
    const x = rift.center.x + Math.cos(angle) * riftRadius * distortion;
    const y = rift.center.y + Math.sin(angle) * riftRadius * distortion;
    const z = rift.center.z + Math.sin(angle * 2 + riftPhase) * rift.size * 0.2;

    pen
      .moveTo(x, y, z)
      .colorHex(rift.otherworldly ? 0x4b0082 : 0x800080)
      .dot();
  }

  // Things leak through from the other side
  if (rift.leakage > 0.3) {
    for (let leak = 0; leak < 8; leak++) {
      const leakAngle = (leak / 8) * Math.PI * 2 + time;
      const leakDist = riftRadius * (0.5 + rift.leakage);
      const leakHeight = Math.sin(time * 3 + leak) * rift.size;

      pen
        .push()
        .moveTo(
          rift.center.x + Math.cos(leakAngle) * leakDist,
          rift.center.y + Math.sin(leakAngle) * leakDist,
          rift.center.z + leakHeight,
        )
        .dotSize(2)
        .fuzz(8, 1.5)
        .colorHex(0x20b2aa + Math.floor(rift.leakage * 0x200020))
        .dot()
        .pop();
    }
  }

  pen.pop();
}

// Draw reality distortion field around observer
function drawRealityDistortion(pen, time, sanity) {
  const distortionLevel = 1 - sanity / 100;

  if (distortionLevel > 0.1) {
    pen
      .push()
      .residue(0.4)
      .dotSize(1 + distortionLevel * 3)
      .fuzz(Math.floor(distortionLevel * 25), distortionLevel * 4);

    // Reality "tears" around the observer
    for (let i = 0; i < 20; i++) {
      const angle = (i / 20) * Math.PI * 2 + time * distortionLevel;
      const radius = 50 + Math.sin(time * 3 + i) * 20 * distortionLevel;
      const height = Math.sin(time * 2.3 + i) * 30 * distortionLevel;

      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      const z = height;

      pen.moveTo(x, y, z).colorCubehelix(distortionLevel, 1, -3, 0.7).dot();
    }

    pen.pop();
  }
}

// Main program function
function program(pen, scene, time) {
  // Initialize on first frame
  if (ancientOnes.length === 0) {
    initializeAncientOnes();
    initializeDimensionalRifts();
  }

  // Calculate cosmic horror metrics
  cosmicCycle = Math.sin(time * 0.1);
  madnessLevel = 0.3 + (0.4 * (cosmicCycle + 1)) / 2;
  realityStability = 1.0 - madnessLevel * 0.6;
  observerSanity = Math.max(0, 100 - madnessLevel * 80);

  // Background gets darker as reality weakens
  // const bgIntensity = Math.floor(realityStability * 0x0A0A0A);
  scene.setBGColor(0x000000);

  // Camera movement becomes erratic as sanity decreases
  const sanityFactor = observerSanity / 100;
  const cameraJitter = (1 - sanityFactor) * 10;
  const baseRadius = 160 + 40 * Math.sin(time * 0.3);
  const radius = baseRadius + (Math.random() - 0.5) * cameraJitter;
  const azimuth = time * 5 + Math.sin(time * 0.7) * 30 * (1 - sanityFactor);
  const elevation =
    10 + Math.sin(time * 0.4) * 20 + (Math.random() - 0.5) * cameraJitter;

  scene.orbitCamera({ x: 0, y: 0, z: 0 }, radius, azimuth, elevation);

  // Draw reality distortion around observer
  drawRealityDistortion(pen, time, observerSanity);

  // Manifest the Ancient Ones
  ancientOnes.forEach((entity, index) => {
    // Awakening increases with cosmic alignment
    entity.awakening = Math.min(1.0, entity.awakening + madnessLevel * 0.001);

    // Periodic manifestation events
    const manifestationPhase = Math.sin(time * 0.2 + entity.dimensionPhase);
    if (manifestationPhase > 0.8 && entity.awakening > 0.3) {
      entity.lastManifestation = time;
    }

    const manifestationRecency = Math.max(
      0,
      1 - (time - entity.lastManifestation) / 5,
    );
    const currentAwakening =
      entity.awakening * (0.3 + 0.7 * manifestationRecency);

    if (currentAwakening > 0.1) {
      switch (entity.geometryType) {
        case 0: // Tentacled horror
          entity.tentacles.forEach((tentacle) => {
            drawTentacle(pen, entity, tentacle, time, currentAwakening);
          });
          break;

        case 1: // Angular impossibility
          drawImpossibleGeometry(pen, entity, time, currentAwakening);
          break;

        case 2: // Amorphous dread
          pen
            .push()
            .moveTo(entity.center.x, entity.center.y, entity.center.z)
            .residue(1.0)
            .dotSize(6)
            .fuzz(Math.floor(currentAwakening * 30), 8 + currentAwakening * 12)
            .colorHex(0x2f4f2f + Math.floor(currentAwakening * 0x300030))
            .dot()
            .pop();
          break;
      }

      // Eldritch emanations from awakened entities
      if (currentAwakening > 0.7) {
        for (let emanation = 0; emanation < 6; emanation++) {
          const emanAngle = (emanation / 6) * Math.PI * 2 + time * 2;
          const emanDist = 30 + Math.sin(time * 1.5 + emanation) * 15;

          pen
            .push()
            .moveTo(
              entity.center.x + Math.cos(emanAngle) * emanDist,
              entity.center.y + Math.sin(emanAngle) * emanDist,
              entity.center.z + Math.sin(time * 2.7 + emanation) * 10,
            )
            .residue(0.6)
            .dotSize(3)
            .fuzz(15, 2)
            .colorViridis(0.9 - currentAwakening * 0.3)
            .dot()
            .pop();
        }
      }
    }
  });

  // Update and draw dimensional rifts
  dimensionalRifts.forEach((rift) => {
    rift.leakage = 0.5 + 0.5 * Math.sin(time * 0.8 + rift.instability * 3);
    rift.instability = Math.min(1.0, rift.instability + madnessLevel * 0.0005);

    drawDimensionalRift(pen, rift, time);

    // Rifts occasionally spawn temporary horrors
    if (
      Math.sin(time * 1.3 + rift.instability * 7) > 0.95 &&
      rift.leakage > 0.8
    ) {
      const spawnPos = {
        x: rift.center.x + (Math.random() - 0.5) * rift.size * 2,
        y: rift.center.y + (Math.random() - 0.5) * rift.size * 2,
        z: rift.center.z + (Math.random() - 0.5) * rift.size,
      };

      pen
        .push()
        .moveTo(spawnPos.x, spawnPos.y, spawnPos.z)
        .residue(0.3)
        .dotSize(5)
        .fuzz(25, 3)
        .colorHex(0x8b008b)
        .dot()
        .pop();
    }
  });

  // Whispers from beyond - text that appears at peak madness
  if (madnessLevel > 0.9 && Math.sin(time * 7) > 0.9) {
    pen
      .push()
      .moveTo(-20, 30, 0)
      .residue(2.0)
      .dotSize(2)
      .traceGap(0.5)
      .fuzz(8, 1)
      .colorHex(0x8b0000)
      .text("PH'NGLUI MGLW'NAFH", 6)
      .pop();
  }
}
