/* ------------------------------------------------------------------
   CodeEditor.jsx – Monaco wrapper (controlled, no autocomplete)
-------------------------------------------------------------------*/

import Editor from "@monaco-editor/react";
import { useRef, useEffect, useCallback } from "react";

export default function CodeEditor({
  source,
  onChange,
  compileErr,
  onEditorReady,
}) {
  const editorRef = useRef(null);

  /* ––––– runs once, right after Monaco is ready ––––– */
  const handleMount = useCallback(
    (editor /*, monaco */) => {
      editorRef.current = editor;
      onEditorReady?.();

      /* next paint → layout, then force full colour pass */
      requestAnimationFrame(() => {
        editor.layout();
        editor.trigger("react", "editor.action.forceRetokenize", null);
      });
    },
    [onEditorReady],
  );

  /* ––––– run the same retokenize on every external source change ––––– */
  useEffect(() => {
    const ed = editorRef.current;
    if (!ed) return;
    ed.trigger("react", "editor.action.forceRetokenize", null);
    requestAnimationFrame(() => ed.layout()); // handles flex/grid height
  }, [source]);

  /* ––––– resize guard ––––– */
  useEffect(() => {
    const onResize = () => editorRef.current?.layout();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div className="code-pane">
      <Editor
        language="javascript"
        value={source}
        onChange={(v) => onChange(v ?? "")}
        onMount={handleMount}
        theme="vs-dark"
        loading={null}
        options={{
          automaticLayout: true,
          minimap: { enabled: false },
          quickSuggestions: false,
          suggestOnTriggerCharacters: false,
          parameterHints: { enabled: false },
          wordBasedSuggestions: false,
          suggest: { showWords: false },
        }}
      />
      {compileErr && <div className="compile-error">{compileErr}</div>}
    </div>
  );
}
