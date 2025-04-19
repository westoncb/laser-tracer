import Editor from "@monaco-editor/react";

/**
 * Left‑hand code editor panel.
 *
 * Props:
 *   onChange(string)   – called whenever the user edits the source.
 *   compileErr(string) – optional compile‑time error to display.
 */
export default function CodeEditor({ boilerplate, onChange, compileErr }) {
  return (
    <div className="code-pane">
      <Editor
        defaultLanguage="javascript"
        defaultValue={boilerplate}
        theme="vs-dark"
        onChange={(val) => onChange(val ?? "")}
        options={{ minimap: { enabled: false } }}
      />
      {compileErr && <div className="compile-error">{compileErr}</div>}
    </div>
  );
}
