// ABYSSAL GEOMETRY - Eldritch horrors from non-Euclidean space
let pulse = 0;
let entities = [];
const VOID_COLOR = 0x050510;

// Initialize our eldritch entities
for (let i = 0; i < 7; i++) {
  entities.push({
    phase: Math.random() * Math.PI * 2,
    speed: 0.2 + Math.random() * 0.3,
    size: 10 + Math.random() * 40,
    complexity: 3 + Math.floor(Math.random() * 5),
    distortion: 0.2 + Math.random() * 0.8,
  });
}

function program(pen, draw, time) {
  setBGColor(VOID_COLOR);
  pulse = Math.sin(time * 0.7) * 0.5 + 0.5;

  // Global ambience - distant whispers from the void
  pen.push().dotSize(1).residue(20).traceGap(5).fuzz(30, 10);
  for (let i = 0; i < 20; i++) {
    const angle = (i / 20) * Math.PI * 2 + time * 0.1;
    const radius = 100 + Math.sin(i * 7.3 + time) * 20;
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    const z = Math.sin(time * 0.2 + i) * 20;

    pen.colorHSV(
      (270 + Math.sin(time * 0.3 + i) * 30) / 360,
      0.3,
      0.2 + pulse * 0.2,
    );
    draw.dot({ x, y, z });
  }
  pen.pop();

  // Main manifestation function - renders a single eldritch entity
  function manifestEntity(entity, centerX, centerY, centerZ) {
    const t = time * entity.speed + entity.phase;
    const pulseSize = entity.size * (1 + pulse * 0.3 * entity.distortion);

    pen
      .push()
      .dotSize(1 + pulse)
      .traceGap(0.5)
      .residue(5 + pulse * 10)
      .fuzz(8, 0.4);

    // Non-Euclidean geometries
    for (let layer = 0; layer < 3; layer++) {
      const layerOffset = layer * 0.2;

      for (let i = 0; i < 60; i++) {
        const theta = (i / 60) * Math.PI * 2;
        const progress = i / 60 + t * 0.1;

        // Complex oscillating radius
        const r1 =
          pulseSize * (0.8 + 0.2 * Math.sin(theta * entity.complexity + t * 2));
        const r2 =
          pulseSize *
          (0.7 + 0.3 * Math.sin(theta * (entity.complexity - 1) + t * 3));

        // Position with deliberate distortion
        const x1 =
          centerX +
          r1 *
            Math.cos(theta + layerOffset) *
            (1 + Math.sin(t + theta * 5) * 0.1 * entity.distortion);
        const y1 =
          centerY +
          r1 *
            Math.sin(theta + layerOffset) *
            (1 + Math.cos(t * 1.3 + theta * 3) * 0.1 * entity.distortion);
        const z1 =
          centerZ +
          Math.sin(theta * entity.complexity + t) * 10 * entity.distortion;

        const x2 =
          centerX +
          r2 *
            Math.cos(theta + layerOffset + 0.1) *
            (1 + Math.sin(t * 1.1 + theta * 4) * 0.1 * entity.distortion);
        const y2 =
          centerY +
          r2 *
            Math.sin(theta + layerOffset + 0.1) *
            (1 + Math.cos(t * 1.4 + theta * 3.2) * 0.1 * entity.distortion);
        const z2 =
          centerZ +
          Math.sin(theta * (entity.complexity + 1) + t * 1.2) *
            10 *
            entity.distortion;

        // Unsettling color palette
        const colorPhase = (progress * 0.2 + layer * 0.3) % 1;
        if (layer === 0) {
          pen.colorCubehelix(colorPhase, 0.3, -2.5, 0.8);
        } else if (layer === 1) {
          pen.colorHSV(
            (270 + Math.sin(colorPhase * Math.PI * 4) * 40) / 360,
            0.6,
            0.4 + pulse * 0.3,
          );
        } else {
          pen.colorCubehelix(1 - colorPhase, 0.9, -1.2, 0.7);
        }

        // Connect points to form unsettling patterns
        draw.trace({ x: x1, y: y1, z: z1 }, { x: x2, y: y2, z: z2 });

        // Occasionally emit tendrils into the void
        if (i % 15 === 0 && Math.random() < 0.3) {
          const tendrilLength = 15 + Math.random() * 25;
          const endX = x1 + Math.cos(theta + t) * tendrilLength;
          const endY = y1 + Math.sin(theta + t) * tendrilLength;
          const endZ = z1 + Math.sin(t * 1.5) * tendrilLength * 0.3;

          pen
            .push()
            .dotSize(1)
            .traceGap(1)
            .residue(3)
            .colorHSV(
              (270 + Math.sin(t + i) * 30) / 360,
              0.7,
              0.3 + pulse * 0.2,
            );

          draw.trace({ x: x1, y: y1, z: z1 }, { x: endX, y: endY, z: endZ });
          pen.pop();
        }
      }
    }
    pen.pop();
  }

  // Render entities with overlapping geometries
  manifestEntity(entities[0], 0, 0, -20);
  manifestEntity(entities[1], -40, 20, 0);
  manifestEntity(entities[2], 35, -15, 10);

  // Tendrils connecting the manifestations
  pen.push().dotSize(1).traceGap(2).residue(15).fuzz(3, 1);

  // Pulsing connections between entities
  const points = [
    { x: 0, y: 0, z: -20 },
    { x: -40, y: 20, z: 0 },
    { x: 35, y: -15, z: 10 },
  ];

  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const p1 = points[i];
      const p2 = points[j];

      // Distort the connection path
      const midX = (p1.x + p2.x) / 2 + Math.sin(time) * 15;
      const midY = (p1.y + p2.y) / 2 + Math.cos(time * 1.3) * 15;
      const midZ = (p1.z + p2.z) / 2 + Math.sin(time * 0.7) * 15;

      pen.colorHSV((280 + Math.sin(time + i + j) * 20) / 360, 0.5, 0.3);

      // Create distorted pathway
      const steps = 20;
      let lastX = p1.x,
        lastY = p1.y,
        lastZ = p1.z;

      for (let step = 1; step <= steps; step++) {
        const t = step / steps;
        // Quadratic Bezier curve with distortion
        const x =
          (1 - t) * (1 - t) * p1.x + 2 * (1 - t) * t * midX + t * t * p2.x;
        const y =
          (1 - t) * (1 - t) * p1.y + 2 * (1 - t) * t * midY + t * t * p2.y;
        const z =
          (1 - t) * (1 - t) * p1.z + 2 * (1 - t) * t * midZ + t * t * p2.z;

        // Add time-based distortion
        const distX = x + Math.sin(time * 2 + t * 10) * 3 * pulse;
        const distY = y + Math.cos(time * 1.7 + t * 8) * 3 * pulse;
        const distZ = z + Math.sin(time * 1.3 + t * 12) * 3 * pulse;

        draw.trace(
          { x: lastX, y: lastY, z: lastZ },
          { x: distX, y: distY, z: distZ },
        );

        lastX = distX;
        lastY = distY;
        lastZ = distZ;
      }
    }
  }
  pen.pop();

  // Subtle camera movement to induce unease
  pen.yaw(Math.sin(time * 0.1) * 3);
  pen.pitch(Math.cos(time * 0.13) * 2);
  pen.roll(Math.sin(time * 0.07) * 1);
}
