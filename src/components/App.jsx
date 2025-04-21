import { useState, useEffect } from "react";
import TitleBar from "./TitleBar.jsx";
import ManualModal from "./ManualModal.jsx";
import ExampleSelector from "./ExampleSelector.jsx";
import CodeEditor from "./CodeEditor.jsx";
import LaserCanvas from "./LaserCanvas.jsx";
import SplashScreen from "./SplashScreen.jsx";
import examples from "../examples.js";
import manualMarkdown from "../manual.md?raw";

const SYSTEM_EXAMPLES = examples.map((ex, i) => ({
  key: `sys-${i}`,
  label: ex.label,
  code: ex.code,
  user: false,
}));

export default function App() {
  const [compileErr, setCompileErr] = useState(null);
  const [source, setSource] = useState(examples[0].code); // same
  const [showManual, setShowManual] = useState(false);
  const [monacoReady, setMonacoReady] = useState(false);

  const [userProgs, setUserProgs] = useState(() => {
    const raw = localStorage.getItem("laserTracer_user");
    return raw ? JSON.parse(raw) : [];
  });

  /* ── derived lists & helpers ─────────────────────────────── */
  const combined = [...SYSTEM_EXAMPLES, ...userProgs];
  const findByKey = (k) => combined.find((p) => p.key === k);
  const [selectedKey, setSelectedKey] = useState(SYSTEM_EXAMPLES[0].key);
  const sel = findByKey(selectedKey);
  const [title, setTitle] = useState(sel.label);
  const isDirty = source !== sel.code;

  /* keep editor & dropdown in sync when selection changes */
  useEffect(() => {
    setSource(sel.code);
    setTitle(sel.label);
  }, [selectedKey]);

  /* ----- handlers ----- */
  const handleCodeChange = setSource;

  const handleNew = () => {
    const idx = userProgs.length + 1;
    const key = `user-${idx}`;
    const label = `user_program_${idx}`;
    const blank = { key, label, code: "", user: true };
    setUserProgs((p) => [...p, blank]);
    setSelectedKey(key);
  };

  const persistUser = (arr) =>
    localStorage.setItem("laserTracer_user", JSON.stringify(arr));

  const handleSave = () => {
    setUserProgs((prev) => {
      const next = prev.map((p) =>
        p.key === selectedKey ? { ...p, code: source, label: title } : p,
      );
      persistUser(next);
      return next;
    });
  };

  const handleDelete = () => {
    setUserProgs((prev) => {
      const next = prev.filter((p) => p.key !== selectedKey);
      persistUser(next);
      const first = SYSTEM_EXAMPLES[0].key;
      setSelectedKey(first);
      return next;
    });
  };

  const handleSelect = (key) => setSelectedKey(key);
  const handleTitle = setTitle;

  /* ----- render ----- */
  return (
    <div className="app-root">
      <TitleBar onManual={() => setShowManual(true)} />

      <div className="left-col">
        <ExampleSelector
          options={combined}
          selectedKey={selectedKey}
          title={title}
          isUserProgram={sel.user}
          isDirty={isDirty}
          onSelect={handleSelect}
          onNew={handleNew}
          onTitleChange={handleTitle}
          onSave={handleSave}
          onDelete={handleDelete}
        />

        <CodeEditor
          source={source}
          onChange={handleCodeChange}
          compileErr={compileErr}
          onEditorReady={() => setMonacoReady(true)} /* already added earlier */
        />
      </div>

      <LaserCanvas
        className="canvas-pane"
        srcCode={source}
        compileErrCb={setCompileErr}
      />

      <SplashScreen
        ready={monacoReady} // becomes true when Monaco reports ready
        minDuration={800} // tweak to taste
        onHide={() => {}}
      />

      {showManual && (
        <ManualModal
          markdown={manualMarkdown}
          onClose={() => setShowManual(false)}
        />
      )}
    </div>
  );
}
