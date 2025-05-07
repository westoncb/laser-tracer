function program(pen, d, time) {
  //ignore 'd' param--legacy
  const R = 30;
  const arms = 7; // number of spikes

  // Set up styling (updated to use pen methods)
  pen.dotSize(2).traceGap(15).residue(12).fuzz(40, 0.2);

  for (let a = 0; a < arms; a++) {
    const angle = (a / arms) * Math.PI * 2 + time * 0.6;
    const x = R * Math.cos(angle);
    const y = R * Math.sin(angle);
    const z = Math.sin(angle * 3 + time) * 30; // wavy height

    // Use viridis color palette instead of fixed color
    // Each arm gets a different position in the spectrum
    // The position shifts over time for animation
    pen.colorViridis((a / arms + time * 0.2) % 1);

    // Move to hub position first (without tracing)
    pen.moveTo(0, 0, 0);
    // Trace to the arm's endpoint
    pen.traceTo(x, y, z);
    // Return to hub so next arm is clean
    pen.traceTo(0, 0, 0);
  }
}
