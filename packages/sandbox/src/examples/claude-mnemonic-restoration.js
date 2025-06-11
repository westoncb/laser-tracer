// Mnemonic Restoration
// A simulation of digital archeology, data decay, and the ghost in the machine.

// --- Enhanced Color Palettes ---

// Deep space archaeological palette
const archaeo_palette = [
  { r: 0.067, g: 0.125, b: 0.329 }, // Deep space blue
  { r: 0.154, g: 0.301, b: 0.566 }, // Cosmic blue
  { r: 0.222, g: 0.455, b: 0.632 }, // Stellar blue
  { r: 0.338, g: 0.598, b: 0.64 }, // Artifact teal
  { r: 0.507, g: 0.735, b: 0.585 }, // Memory green
  { r: 0.722, g: 0.864, b: 0.48 }, // Restoration gold
  { r: 0.993, g: 0.806, b: 0.345 }, // Pure data gold
];

// Corruption/glitch palette
const corruption_palette = [
  { r: 0.8, g: 0.1, b: 0.2 }, // Deep red
  { r: 0.9, g: 0.3, b: 0.1 }, // Orange corruption
  { r: 0.7, g: 0.0, b: 0.4 }, // Magenta void
  { r: 0.5, g: 0.0, b: 0.6 }, // Purple decay
];

function lerp(a, b, t) {
  return a * (1 - t) + b * t;
}

function getArchaeoColor(t) {
  t = Math.max(0, Math.min(1, t));
  const scaled_t = t * (archaeo_palette.length - 1);
  const i = Math.floor(scaled_t);
  const j = Math.ceil(scaled_t);
  const frac = scaled_t - i;

  if (i === j) return archaeo_palette[i];
  const c1 = archaeo_palette[i];
  const c2 = archaeo_palette[j];

  return {
    r: lerp(c1.r, c2.r, frac),
    g: lerp(c1.g, c2.g, frac),
    b: lerp(c1.b, c2.b, frac),
  };
}

function getCorruptionColor(t) {
  t = Math.max(0, Math.min(1, t));
  const scaled_t = t * (corruption_palette.length - 1);
  const i = Math.floor(scaled_t);
  const j = Math.ceil(scaled_t);
  const frac = scaled_t - i;

  if (i === j) return corruption_palette[i];
  const c1 = corruption_palette[i];
  const c2 = corruption_palette[j];

  return {
    r: lerp(c1.r, c2.r, frac),
    g: lerp(c1.g, c2.g, frac),
    b: lerp(c1.b, c2.b, frac),
  };
}

function colorLerp(colorA, colorB, t) {
  return {
    r: lerp(colorA.r, colorB.r, t),
    g: lerp(colorA.g, colorB.g, t),
    b: lerp(colorA.b, colorB.b, t),
  };
}

// --- Enhanced System Configuration ---
const FRAGMENT_COUNT = 1500;
const ARCHIVIST_COUNT = 8;
const ARTIFACT_RADIUS = 40;
const GLITCH_THRESHOLD = 0.97;

// --- Enhanced System State ---
let fragments = [];
let archivists = [];
let artifactCompletion = 0;
let systemStability = 1.0;
let lastGlitchTime = 0;
let structuralWelds = [];
let lastRestoreEvent = { pos: { x: 0, y: 0, z: 0 }, time: -10 };
let atmosphericParticles = [];
let dataStreams = [];

// --- Enhanced Initialization ---
function initializeFragments() {
  fragments = [];
  for (let i = 0; i < FRAGMENT_COUNT; i++) {
    const u = Math.random();
    const v = Math.random();
    const theta = 2 * Math.PI * u;
    const phi = Math.acos(2 * v - 1);
    const r =
      ARTIFACT_RADIUS * (0.8 + 0.2 * Math.sin(theta * 6) * Math.sin(phi * 8));
    const targetPos = {
      x: r * Math.sin(phi) * Math.cos(theta),
      y: r * Math.sin(phi) * Math.sin(theta),
      z: r * Math.cos(phi),
    };
    fragments.push({
      pos: {
        x: (Math.random() - 0.5) * 250,
        y: (Math.random() - 0.5) * 200,
        z: (Math.random() - 0.5) * 150,
      },
      targetPos: targetPos,
      state: "LOST",
      velocity: { x: 0, y: 0, z: 0 },
      color: getArchaeoColor((i / FRAGMENT_COUNT) * 0.8 + 0.1),
      lastTouched: 0,
      pulsePhase: Math.random() * Math.PI * 2,
      corruptionLevel: Math.random() * 0.3,
    });
  }
}

function initializeArchivists() {
  archivists = [];
  for (let i = 0; i < ARCHIVIST_COUNT; i++) {
    archivists.push({
      pos: {
        x: (Math.random() - 0.5) * 50,
        y: (Math.random() - 0.5) * 50,
        z: (Math.random() - 0.5) * 50,
      },
      state: "SEEKING",
      targetFrag: null,
      velocity: { x: 0, y: 0, z: 0 },
      energy: 1.0,
      trailPoints: [],
    });
  }
}

function initializeAtmosphere() {
  atmosphericParticles = [];
  for (let i = 0; i < 100; i++) {
    atmosphericParticles.push({
      pos: {
        x: (Math.random() - 0.5) * 400,
        y: (Math.random() - 0.5) * 300,
        z: (Math.random() - 0.5) * 300,
      },
      velocity: {
        x: (Math.random() - 0.5) * 0.2,
        y: (Math.random() - 0.5) * 0.2,
        z: (Math.random() - 0.5) * 0.2,
      },
      size: Math.random() * 0.5 + 0.2,
      brightness: Math.random() * 0.3 + 0.1,
    });
  }
}

// --- Enhanced Drawing Functions ---

function drawArchivist(pen, archivist, time) {
  // Add trail points
  archivist.trailPoints.push({ ...archivist.pos, time: time });
  if (archivist.trailPoints.length > 15) {
    archivist.trailPoints.shift();
  }

  // Draw energy trail
  pen.push();
  for (let i = 0; i < archivist.trailPoints.length - 1; i++) {
    const alpha = i / archivist.trailPoints.length;
    const point = archivist.trailPoints[i];
    const nextPoint = archivist.trailPoints[i + 1];

    pen
      .colorRGB(0.8 + alpha * 0.2, 0.2 + alpha * 0.6, 0.8 + alpha * 0.2)
      .fuzz(2, 0.3)
      .dotSize(alpha * 2)
      .traceGap(0.1)
      .moveTo(point.x, point.y, point.z)
      .traceTo(nextPoint.x, nextPoint.y, nextPoint.z);
  }
  pen.pop();

  // Draw main archivist body with enhanced aesthetics
  pen
    .push()
    .moveTo(archivist.pos.x, archivist.pos.y, archivist.pos.z)
    .residue(0.3)
    .dotSize(6 + Math.sin(time * 3) * 1.5)
    .fuzz(0)
    .colorRGB(1.0, 0.4 + archivist.energy * 0.4, 0.8 + archivist.energy * 0.2)
    .traceGap(0.15);

  // Enhanced geometric form
  const size = 1.5 + Math.sin(time * 2) * 0.3;
  const pts = [
    { x: size, y: size, z: -size },
    { x: -size, y: size, z: size },
    { x: -size, y: -size, z: -size },
    { x: size, y: -size, z: size },
  ];

  // Draw with subtle animation
  pen.polyline([pts[0], pts[1], pts[2]], true);
  pen.polyline([pts[0], pts[1], pts[3]], true);
  pen.polyline([pts[1], pts[2], pts[3]], true);
  pen.polyline([pts[0], pts[2], pts[3]], true);

  // Enhanced connection beam
  if (archivist.state === "RETURNING" && archivist.targetFrag) {
    pen
      .push()
      .colorRGB(1, 0.8 + Math.sin(time * 5) * 0.2, 0.3)
      .traceGap(0.1)
      .fuzz(4, 0.2)
      .dotSize(3)
      .moveTo(archivist.pos.x, archivist.pos.y, archivist.pos.z)
      .traceTo(
        archivist.targetFrag.pos.x,
        archivist.targetFrag.pos.y,
        archivist.targetFrag.pos.z,
      )
      .pop();
  }
  pen.pop();
}

function drawStructuralWelds(pen, time) {
  const WELD_LIFETIME = 30;
  let remainingWelds = [];

  for (const weld of structuralWelds) {
    const age = time - weld.startTime;
    if (age < WELD_LIFETIME) {
      const progress = age / WELD_LIFETIME;
      const brightness = Math.pow(1.0 - progress, 2);
      const pulseIntensity = 1 + Math.sin(time * 8) * 0.3;

      pen
        .push()
        .colorRGB(
          0.9 + brightness * 0.1,
          0.7 + brightness * 0.3,
          brightness * 0.5,
        )
        .fuzz(3, 0.2)
        .dotSize(4.0 * brightness * pulseIntensity)
        .traceGap(0.2)
        .moveTo(weld.from.x, weld.from.y, weld.from.z)
        .traceTo(weld.to.x, weld.to.y, weld.to.z)
        .pop();
      remainingWelds.push(weld);
    }
  }
  structuralWelds = remainingWelds;
}

function drawAtmosphericEffects(pen, time) {
  // Update and draw atmospheric particles
  atmosphericParticles.forEach((particle) => {
    particle.pos.x += particle.velocity.x;
    particle.pos.y += particle.velocity.y;
    particle.pos.z += particle.velocity.z;

    // Wrap around boundaries
    if (Math.abs(particle.pos.x) > 200) particle.pos.x *= -0.8;
    if (Math.abs(particle.pos.y) > 150) particle.pos.y *= -0.8;
    if (Math.abs(particle.pos.z) > 150) particle.pos.z *= -0.8;

    const brightness =
      particle.brightness *
        (0.5 + 0.5 * Math.sin(time * 0.5 + particle.pos.x * 0.01)) +
      1;

    pen
      .push()
      .moveTo(particle.pos.x, particle.pos.y, particle.pos.z)
      .colorRGB(0.2, 0.3 + brightness * 0.4, 0.5 + brightness * 0.3)
      .dotSize(particle.size)
      .fuzz(3, 1)
      .residue(1)
      .dot()
      .pop();
  });
}

function drawDataStreams(pen, time) {
  // Create flowing data streams between clusters of fragments
  const placedFragments = fragments.filter((f) => f.state === "PLACED");

  for (let i = 0; i < Math.min(placedFragments.length, 20); i++) {
    const frag = placedFragments[i];
    const streamOffset = Math.sin(time * 2 + i) * 0.3;
    const streamColor = getArchaeoColor(0.7 + streamOffset * 0.3);

    pen
      .push()
      .moveTo(frag.pos.x, frag.pos.y, frag.pos.z)
      .colorRGB(streamColor.r, streamColor.g, streamColor.b)
      .fuzz(2, 0.4)
      .dotSize(1.5)
      .residue(1)
      .traceGap(0.3);

    // Draw flowing stream to nearby fragments
    const nearby = placedFragments.filter((other) => {
      if (other === frag) return false;
      const dx = other.pos.x - frag.pos.x;
      const dy = other.pos.y - frag.pos.y;
      const dz = other.pos.z - frag.pos.z;
      return Math.sqrt(dx * dx + dy * dy + dz * dz) < ARTIFACT_RADIUS * 0.3;
    });

    if (nearby.length > 0) {
      const target =
        nearby[
          Math.floor(
            (Math.sin(time + i) * nearby.length) / 2 + nearby.length / 2,
          )
        ];
      pen.traceTo(target.pos.x, target.pos.y, target.pos.z);
    }

    pen.pop();
  }
}

// --- Simulation Logic ---
function updateSimulation(time, pen) {
  let placedCount = 0;

  archivists.forEach((archivist) => {
    // Update archivist energy based on activity
    if (archivist.state === "RETURNING") {
      archivist.energy = Math.min(1.0, archivist.energy + 0.02);
    } else {
      archivist.energy = Math.max(0.3, archivist.energy - 0.005);
    }

    if (archivist.state === "SEEKING") {
      let bestDist = Infinity;
      let bestFrag = null;
      fragments.forEach((frag) => {
        if (frag.state === "LOST") {
          const dx = frag.pos.x - archivist.pos.x;
          const dy = frag.pos.y - archivist.pos.y;
          const dz = frag.pos.z - archivist.pos.z;
          const dist = dx * dx + dy * dy + dz * dz;
          if (dist < bestDist) {
            bestDist = dist;
            bestFrag = frag;
          }
        }
      });
      if (bestFrag) {
        archivist.targetFrag = bestFrag;
        bestFrag.state = "IDENTIFIED";
        archivist.state = "RETURNING";
      }
    } else if (archivist.state === "RETURNING") {
      const frag = archivist.targetFrag;
      if (!frag) {
        archivist.state = "SEEKING";
        return;
      }

      const dx = frag.targetPos.x - archivist.pos.x;
      const dy = frag.targetPos.y - archivist.pos.y;
      const dz = frag.targetPos.z - archivist.pos.z;
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

      if (dist < 8) {
        frag.state = "PLACED";
        frag.lastTouched = time;
        frag.corruptionLevel = Math.max(0, frag.corruptionLevel - 0.5);

        lastRestoreEvent = { pos: { ...frag.pos }, time: time };

        // weld creation
        let neighborsFound = 0;
        for (const otherFrag of fragments) {
          if (neighborsFound >= 3) break;
          if (otherFrag !== frag && otherFrag.state === "PLACED") {
            const dxN = frag.pos.x - otherFrag.pos.x;
            const dyN = frag.pos.y - otherFrag.pos.y;
            const dzN = frag.pos.z - otherFrag.pos.z;
            if (
              Math.sqrt(dxN * dxN + dyN * dyN + dzN * dzN) <
              ARTIFACT_RADIUS * 0.25
            ) {
              structuralWelds.push({
                from: frag.pos,
                to: otherFrag.pos,
                startTime: time,
              });
              neighborsFound++;
            }
          }
        }

        archivist.state = "SEEKING";
        archivist.targetFrag = null;
      } else {
        archivist.velocity.x += (dx / dist) * 0.12;
        archivist.velocity.y += (dy / dist) * 0.12;
        archivist.velocity.z += (dz / dist) * 0.12;
        frag.pos.x = archivist.pos.x;
        frag.pos.y = archivist.pos.y;
        frag.pos.z = archivist.pos.z;
      }
    }

    archivist.pos.x += archivist.velocity.x;
    archivist.pos.y += archivist.velocity.y;
    archivist.pos.z += archivist.velocity.z;
    archivist.velocity.x *= 0.93;
    archivist.velocity.y *= 0.93;
    archivist.velocity.z *= 0.93;
  });

  fragments.forEach((frag) => {
    frag.pulsePhase += 0.1;

    if (frag.state === "PLACED") {
      frag.pos = { ...frag.targetPos };
      placedCount++;
      frag.corruptionLevel = Math.max(0, frag.corruptionLevel - 0.01);
    } else if (frag.state === "LOST") {
      frag.pos.x += frag.velocity.x;
      frag.pos.y += frag.velocity.y;
      frag.velocity.x += (Math.random() - 0.5) * 0.015;
      frag.velocity.y += (Math.random() - 0.5) * 0.015;
      frag.velocity.x *= 0.97;
      frag.velocity.y *= 0.97;
      frag.corruptionLevel = Math.min(1, frag.corruptionLevel + 0.001);
    }
  });

  artifactCompletion = placedCount / FRAGMENT_COUNT;
  systemStability = 0.4 + artifactCompletion * 0.6;

  // glitch system
  if (
    Math.random() > GLITCH_THRESHOLD + (1 - systemStability) * 0.03 &&
    time > lastGlitchTime + 3
  ) {
    lastGlitchTime = time;
    let glitchCount = 0;
    fragments.forEach((frag) => {
      if (frag.state === "PLACED" && Math.random() < 0.15) {
        frag.state = "LOST";
        frag.velocity = {
          x: (Math.random() - 0.5) * 3,
          y: (Math.random() - 0.5) * 3,
          z: (Math.random() - 0.5) * 3,
        };
        frag.corruptionLevel = Math.min(1, frag.corruptionLevel + 0.3);
        glitchCount++;
      }
    });

    if (glitchCount > 0) {
      const glitchColor = getCorruptionColor(Math.random());
      pen
        .push()
        .moveTo(0, 0, 0)
        .fuzz(glitchCount * 8, 40)
        .dotSize(glitchCount * 2)
        .colorRGB(glitchColor.r, glitchColor.g, glitchColor.b)
        .dot()
        .pop();
    }
  }
}

// --- Main Program ---
function program(pen, scene, time) {
  if (fragments.length === 0) {
    initializeFragments();
    initializeArchivists();
    initializeAtmosphere();
  }

  updateSimulation(time, pen);

  // background with depth
  const bgIntensity = Math.floor(systemStability * 0x18 + 0x08);
  const bgColor =
    (bgIntensity << 16) | ((bgIntensity * 0.6) << 8) | (bgIntensity * 0.8);
  scene.setBGColor(bgColor);

  //  camera movement
  const cameraDistance = 120 + artifactCompletion * 80;
  const cameraHeight = Math.sin(time * 0.3) * 20;
  scene.orbitCamera(
    { x: 0, y: cameraHeight, z: 0 },
    180 - artifactCompletion * 80,
    time * 1.5,
    cameraDistance,
  );

  // Draw atmospheric effects first
  drawAtmosphericEffects(pen, time);

  // Draw fragments with  visuals
  fragments.forEach((frag) => {
    pen.push().moveTo(frag.pos.x, frag.pos.y, frag.pos.z);

    const pulse = Math.sin(frag.pulsePhase) * 0.5 + 0.5;

    switch (frag.state) {
      case "LOST":
        const corruptColor = colorLerp(
          frag.color,
          getCorruptionColor(frag.corruptionLevel),
          frag.corruptionLevel,
        );
        pen
          .dotSize(2.5 + pulse * 1.5)
          .residue(1.0)
          .fuzz(12 + frag.corruptionLevel * 8, 2.0)
          .colorRGB(
            corruptColor.r * 0.6,
            corruptColor.g * 0.6,
            corruptColor.b * 0.6,
          )
          .dot();
        break;

      case "IDENTIFIED":
        pen
          .dotSize(5.0 + pulse * 2.0)
          .residue(0.8)
          .fuzz(15, 1.2)
          .colorRGB(1, 0.9 + pulse * 0.1, 0.4 + pulse * 0.3)
          .dot();
        break;

      case "PLACED":
        const timeSinceRipple = time - lastRestoreEvent.time;
        let rippleBonus = 0;
        if (timeSinceRipple < 2.0) {
          const dxR = frag.pos.x - lastRestoreEvent.pos.x;
          const dyR = frag.pos.y - lastRestoreEvent.pos.y;
          const dzR = frag.pos.z - lastRestoreEvent.pos.z;
          const rippleDist = Math.sqrt(dxR * dxR + dyR * dyR + dzR * dzR);
          const rippleFalloff =
            1.0 - Math.min(1, rippleDist / (ARTIFACT_RADIUS * 1.2));
          const timeFalloff = 1.0 - Math.min(1, timeSinceRipple / 2.0);
          rippleBonus =
            Math.pow(rippleFalloff, 2) * Math.pow(timeFalloff, 2) * 8.0;
        }

        const stability = Math.min(1, (time - frag.lastTouched) / 8);
        const restoredColor = colorLerp(
          frag.color,
          { r: 1, g: 0.95, b: 0.8 },
          stability * 0.7,
        );

        pen
          .colorRGB(restoredColor.r, restoredColor.g, restoredColor.b)
          .dotSize(4.0 + stability * 3.0 + rippleBonus + pulse * 0.5)
          .residue(2)
          .fuzz(Math.floor((1 - stability) * 15), (1 - stability) * 1.5)
          .dot();
        break;
    }
    pen.pop();
  });

  drawDataStreams(pen, time);
  drawStructuralWelds(pen, time);
  archivists.forEach((archivist) => drawArchivist(pen, archivist, time));
}
