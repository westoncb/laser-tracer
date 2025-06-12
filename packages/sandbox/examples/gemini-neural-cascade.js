// A "Neural Cascade" for the Laser-Tracer System

// --- Configuration ---
const FIRE_THRESHOLD = 0.6; // Activation level needed to fire
const REFRACTORY_PERIOD = 0.1; // Cooldown time (sec) after firing
const ACTIVATION_DECAY = 0.999; // Multiplier for activation decay per frame
const SIGNAL_STRENGTH = 0.6; // Activation added by an incoming signal
const SIGNAL_TRAVEL_TIME = 1; // Time (sec) for a signal to cross an axon

// --- State (persists between frames) ---
let network = {
  neurons: [], // { pos: {x,y,z}, activation: 0, lastFired: -1 }
  connections: [], // { from: neuron_idx, to: neuron_idx }
};

// Array to hold currently traveling signals
let signals = []; // { from: idx, to: idx, startTime: t, duration: d }

let isInitialized = false;
let lastStimulusTime = -1;

/**
 * Creates the network structure: four layers of neurons with connections
 * between adjacent layers.
 */
function setupNetwork() {
  const layers = [3, 5, 5, 2]; // Neurons per layer: Input, Hidden1, Hidden2, Output
  const layerSpacingX = 35;
  const neuronSpacingY = 12;
  let neuronIndex = 0;
  let layerStartIndices = [0];

  for (let i = 0; i < layers.length; i++) {
    const numNeurons = layers[i];
    const x = (i - (layers.length - 1) / 2) * layerSpacingX;

    for (let j = 0; j < numNeurons; j++) {
      const y = (j - (numNeurons - 1) / 2) * neuronSpacingY;
      const z = Math.random() * 10 - 5; // Add some Z-depth
      network.neurons.push({ pos: { x, y, z }, activation: 0, lastFired: -1 });

      // Connect to all neurons in the previous layer
      if (i > 0) {
        for (let k = 0; k < layers[i - 1]; k++) {
          const fromIndex = layerStartIndices[i - 1] + k;
          network.connections.push({ from: fromIndex, to: neuronIndex });
        }
      }
      neuronIndex++;
    }
    layerStartIndices.push(neuronIndex);
  }
}

/**
 * Main animation loop, called every frame by the Laser-Tracer engine.
 */
function program(pen, scene, time) {
  // --- One-Time Initialization ---
  if (!isInitialized) {
    scene.setBGColor(0x000003); // Deep blue-black
    setupNetwork();
    isInitialized = true;
  }

  // --- Animate the Camera ---
  // scene.orbitCamera(
  //   { x: 0, y: 0, z: 0 },
  //   130,
  //   time * -3,
  //   15 + Math.sin(time * 0.2) * 10,
  // );

  // --- Draw Static Axon Connections (as faint guides) ---
  pen.push();
  pen.colorRGB(0.1, 0.2, 0.35).residue(1).dotSize(6).traceGap(0.65);
  for (const conn of network.connections) {
    const from = network.neurons[conn.from].pos;
    const to = network.neurons[conn.to].pos;
    pen.moveTo(from.x, from.y, from.z).traceTo(to.x, to.y, to.z);
  }
  pen.pop();

  // --- Periodically Stimulate an Input Neuron ---
  if (Math.floor(time) % 4 === 0 && Math.floor(time) !== lastStimulusTime) {
    const inputNeuronIdx = Math.floor(Math.random() * 3); // Pick one of the first 3
    network.neurons[inputNeuronIdx].activation = 1.0;
    lastStimulusTime = Math.floor(time);
  }

  // --- Update Signal Positions and Deliver Them ---
  let remainingSignals = [];
  for (const sig of signals) {
    if (time >= sig.startTime + sig.duration) {
      // Signal arrives: energize the target neuron
      network.neurons[sig.to].activation = Math.min(
        2.0,
        network.neurons[sig.to].activation + SIGNAL_STRENGTH,
      );
    } else {
      remainingSignals.push(sig);
    }
  }
  signals = remainingSignals;

  // --- Update and Draw Neurons ---
  for (let i = 0; i < network.neurons.length; i++) {
    const neuron = network.neurons[i];

    // Check for firing condition
    if (
      neuron.activation >= FIRE_THRESHOLD &&
      time - neuron.lastFired > REFRACTORY_PERIOD
    ) {
      neuron.lastFired = time;

      // Visual flash for firing
      pen.push();
      pen
        .moveTo(neuron.pos.x, neuron.pos.y, neuron.pos.z)
        .colorHex(0xffffff)
        .residue(1)
        .dotSize(8)
        .fuzz(30, 2) // Big, energetic burst
        .dot();
      pen.pop();

      // Launch new signals to connected neurons
      for (const conn of network.connections) {
        if (conn.from === i) {
          signals.push({
            from: i,
            to: conn.to,
            startTime: time,
            duration: SIGNAL_TRAVEL_TIME + (Math.random() - 0.5) * 0.2,
          });
        }
      }
      neuron.activation = 0; // Reset after firing
    }

    // Draw the neuron's resting/charging state
    const charge = neuron.activation / FIRE_THRESHOLD;
    pen.push();
    pen
      .moveTo(neuron.pos.x, neuron.pos.y, neuron.pos.z)
      .colorViridis(charge * 0.8) // Color maps to activation level
      .residue(3)
      .dotSize(5 + charge * 2)
      .fuzz(Math.floor(charge * 25), 0.5 + charge) // Fuzz increases with charge
      .dot();
    pen.pop();

    // Apply natural decay to activation
    neuron.activation *= ACTIVATION_DECAY;
  }

  // --- Draw Traveling Signal Pulses ---
  pen.push();
  pen.colorHex(0xaaccff).residue(2).dotSize(6).fuzz(5, 0.5);
  for (const sig of signals) {
    const fromPos = network.neurons[sig.from].pos;
    const toPos = network.neurons[sig.to].pos;
    const progress = (time - sig.startTime) / sig.duration;

    // Linear interpolation of signal position
    const x = fromPos.x + (toPos.x - fromPos.x) * progress;
    const y = fromPos.y + (toPos.y - fromPos.y) * progress;
    const z = fromPos.z + (toPos.z - fromPos.z) * progress;

    pen.moveTo(x, y, z).dot();
  }
  pen.pop();
}
