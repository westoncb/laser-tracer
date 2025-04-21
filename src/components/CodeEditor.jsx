/* ------------------------------------------------------------------
   CodeEditor.jsx – Monaco wrapper (controlled, no autocomplete)
-------------------------------------------------------------------*/
import Editor from "@monaco-editor/react";
import {
  useRef,
  useEffect,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from "react";

const CodeEditor = forwardRef(function CodeEditor(
  { source, onChange, compileErr, onEditorReady },
  ref,
) {
  const editorRef = useRef(null);

  // Forward the internal editor reference to the parent
  useImperativeHandle(ref, () => ({
    // Expose the entire editor instance or specific methods
    trigger: (...args) => editorRef.current?.trigger(...args),
    layout: () => editorRef.current?.layout(),
    // You can add any other methods you want to expose
    // This gives the parent direct access to the editor
    editor: editorRef.current,
  }));

  /* ––––– runs once, right after Monaco is ready ––––– */
  const handleMount = useCallback(
    (editor /*, monaco */) => {
      editorRef.current = editor;
      onEditorReady?.();
      /* next paint → layout, then force full colour pass */
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
});

export default CodeEditor;
