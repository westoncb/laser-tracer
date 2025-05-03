let first = true;

//o3 "neon ant swarm - connected"
function program(p, d, t) {
  setBGColor(0x010003);

  if (first) {
    setCamera({ x: 0, y: 0, z: 42 }, { x: 0, y: 0, z: 0 });
    first = false;
  }

  const S = [];
  for (let i = 0; i < 100; i++) {
    S.push({
      x: (Math.random() - 0.5) * 30,
      y: (Math.random() - 0.5) * 30,
      z: (Math.random() - 0.5) * 30,
      v: Math.random() * 6,
      w: Math.random() * 6,
    });
  }

  // Same camera movement
  p.roll(t * 7).pitch(Math.sin(t * 0.13) * 9);

  const SCALE = 1;

  // First update all positions (keeping original motion logic)
  S.forEach((s) => {
    const k = Math.sin(t * 0.3 + s.w);
    s.x += Math.sin(t * 0.2 + s.v) * k * SCALE;
    s.y += Math.cos(t * 0.22 + s.w) * k * SCALE;
    s.z += Math.sin(t * 0.17 + s.v + s.w) * k * SCALE;
  });

  // Draw connections between nearby particles
  const CONNECT_THRESHOLD = 12;
  const MIN_DIST = 4; // Minimum expected distance

  // Set up base style for connections
  p.dotSize(2).traceGap(0.1).fuzz(0, 0).residue(2);

  for (let i = 0; i < S.length; i++) {
    for (let j = i + 1; j < S.length; j++) {
      const a = S[i];
      const b = S[j];
      const dist = Math.sqrt(
        Math.pow(a.x - b.x, 2) +
          Math.pow(a.y - b.y, 2) +
          Math.pow(a.z - b.z, 2),
      );

      if (dist < CONNECT_THRESHOLD) {
        // Alternative coloring option (replace the colorT calculation):
        const avgZ = (a.z + b.z) / 2; // Average Z-position of connection
        const normZ = (avgZ + 30) / 60; // Normalize from -30 to +30 range to 0-1
        const colorT = (normZ + Math.sin(t * 0.5) * 0.1) % 1; // Add subtle time variation
        p.colorViridis(colorT);

        p.moveTo(a.x, a.y, a.z);
        p.traceTo(b.x, b.y, b.z);
      }
    }
  }

  // Draw particles exactly as in original
  S.forEach((s) => {
    const k = Math.sin(t * 0.3 + s.w);
    p.colorHSV((s.v * 0.02 + t * 0.05) % 1, 0.6, 0.7);
    p.dotSize(6 + Math.sin(t + s.v) * 3)
      .fuzz(3, 0.2)
      .residue(0.65)
      .moveTo(s.x, s.y, s.z)
      .dot();
  });
}
