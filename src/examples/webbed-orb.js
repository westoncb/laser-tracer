function program(t) {
  const R = 30;
  const arms = 7; // number of spikes
  size(2);
  spacing(15);
  residue(12);
  fuzz(40, 0.2);

  for (let a = 0; a < arms; a++) {
    const angle = (a / arms) * Math.PI * 2 + t * 0.6;
    const x = R * Math.cos(angle);
    const y = R * Math.sin(angle);
    const z = Math.sin(angle * 3 + t) * 30; // wavy height

    // Use viridis color palette instead of fixed color
    // Each arm gets a different position in the spectrum
    // The position shifts over time for animation
    colorViridis((a / arms + t * 0.2) % 1);

    trace(x, y, z);

    /* return to hub so next arm is clean */
    trace(0, 0, 0);
  }
}
