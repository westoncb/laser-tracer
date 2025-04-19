import { useState } from "react";
import CodeEditor from "./CodeEditor.jsx";
import DisplayCanvas from "./DisplayCanvas.jsx";

const boilerplate = `/*
Available drawing primitives (call them directly):
 move(x,y,z)      – teleport without drawing
 trace(x,y,z)     – draw a line to absolute position
 moveRel(dx,dy,dz) / traceRel(dx,dy,dz)   – relative moves in local turtle space
 deposit(x,y,z)   – draw a single point (dot)
 turn(°) pitch(°) roll(°)                – update turtle orientation
 color(0xRRGGBB)  size(px)  spacing(d)    residue(seconds)

Your code lives inside function 'program(time)';
It is executed **once per animation frame** with 'time' in milliseconds.
*/
function program(time) {
  // Example: morphing sine‑wave sphere
  const samples = 80;
  const radius  = 40 + 10 * Math.sin(time * 0.001);
  color(0xaa88ff);
  size(6);
  residue(4);
  spacing(15);

  for (let i = 0; i < samples; i++) {
    const a = Math.acos(1 - 2 * (i + 0.5) / samples);   // golden‑spiral sampling
    const b = Math.PI * (1 + Math.sqrt(5)) * i;
    const r = radius + Math.sin(b * 3 + time * 0.002) * 5;
    const x = r * Math.sin(a) * Math.cos(b);
    const y = r * Math.cos(a);
    const z = r * Math.sin(a) * Math.sin(b);
    deposit(x, y, z);
  }
}
`;

export default function App() {
  const [compileErr, setCompileErr] = useState(null);
  const [source, setSource] = useState(boilerplate);

  /**
   * Editor callback – stores latest source in state.
   */
  const handleCodeChange = (src) => setSource(src);

  return (
    <div className="app-container">
      <CodeEditor
        onChange={handleCodeChange}
        compileErr={compileErr}
        boilerplate={boilerplate}
      />

      <DisplayCanvas
        className="canvas-pane"
        srcCode={source}
        compileErrCb={setCompileErr}
      />
    </div>
  );
}
