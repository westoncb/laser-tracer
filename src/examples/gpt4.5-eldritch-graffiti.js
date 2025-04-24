function program(timeSeconds) {
  const time = timeSeconds * 1000; //ms
  const spikes = 16; // Number of crystal spikes
  const segments = 40; // Segments per spike
  const radius = 15; // Base radius of spikes
  const spikeLength = 25; // Maximum spike length
  const rotationSpeed = 0.0003; // Rotation speed of entire structure

  residue(4);
  fuzz(8, 0.3);
  spacing(1);

  // Rotate entire structure slowly over time
  yaw(time * rotationSpeed * 60);
  pitch(time * rotationSpeed * 40);
  roll(time * rotationSpeed * 20);

  for (let i = 0; i < spikes; i++) {
    push();

    const spikeAngle = (360 / spikes) * i;
    yaw(spikeAngle);
    pitch(spikeAngle / 2);

    for (let j = 0; j <= segments; j++) {
      const t = j / segments;

      // Crystal-like geometry: jagged spikes modulated by sine functions
      const length =
        radius +
        spikeLength * Math.abs(Math.sin(t * Math.PI * 4 + time * 0.001 + i));

      const x = 0;
      const y = length * t;
      const z = Math.sin(t * 12 * Math.PI + time * 0.0005) * (radius / 3);

      const hue = (i / spikes + t + time * 0.0001) % 1;
      size(2 + 5 * (1 - t));
      colorCubehelix(hue, 0.5, -1.5, 1);

      if (j === 0) moveRel(x, y, z);
      else traceRel(x, y, z);
    }

    pop();
  }

  // Internal glowing core
  fuzz(800, 3.0);
  size(12);
  residue(5);
  colorViridis((time * 0.00008) % 1);
  deposit(0, 0, 0);
}
