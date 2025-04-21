function program(tMs) {
  const t = tMs * 0.001;
  const R = 30;
  const arms = 7; // number of spikes
  size(2);
  spacing(15);
  residue(20);
  fuzz(10, 0.4);

  for (let a = 0; a < arms; a++) {
    const angle = (a / arms) * Math.PI * 2 + t * 0.6;
    const x = R * Math.cos(angle);
    const y = R * Math.sin(angle);
    const z = Math.sin(angle * 3 + t) * 30; // wavy height
    color(0xff3366);
    trace(x, y, z);

    /* return to hub so next arm is clean */
    trace(0, 0, 0);
  }
}
