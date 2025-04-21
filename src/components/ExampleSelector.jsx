/* --------------------------------------------------------------
   ExampleSelector.jsx – dropdown + new/title/save/delete
----------------------------------------------------------------*/
import { useState } from "react";

export default function ExampleSelector({
  options,
  title,
  isUserProgram,
  isDirty,
  onSelect,
  onNew,
  onTitleChange,
  onSave,
  onDelete,
}) {
  const [selectVal, setSelectVal] = useState("__none");

  const canSave = isUserProgram && isDirty;
  const canDelete = isUserProgram;

  /* ――― inline SVG icons (same as before) ――― */
  const Plus = (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path fill="currentColor" d="M11 11V4h2v7h7v2h-7v7h-2v-7H4v-2z" />
    </svg>
  );
  const Save = (
    <svg width="17" height="17" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M17 3H5a2 2 0 0 0-2 2v14a2 2
       0 0 0 2 2h14a2 2 0 0 0 2-2V7zM5 5h11v4H5zm7 14a3 3 0 1 1 0-6
       3 3 0 0 1 0 6z"
      />
    </svg>
  );
  const Trash = (
    <svg width="17" height="17" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M9 3h6l1 1h5v2H4V4h5zm1
       5h2v10h-2zm4 0h2v10h-2zM5 8h14l-1 12H6z"
      />
    </svg>
  );

  /* ――― handlers ――― */
  const handleSelect = (e) => {
    const key = e.target.value;
    if (key === "__none") return;
    onSelect(key);
    setSelectVal("__none"); // snap back to placeholder
  };

  return (
    <>
      <div className="exsel">
        {/* ── row 1 ── */}
        <div className="row">
          <select value={selectVal} onChange={handleSelect}>
            <option value="__none" disabled>
              Select a tracer program…
            </option>
            {options.map(({ key, label }) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>

          <button className="btn" onClick={onNew} title="New sketch">
            {Plus}
          </button>
        </div>

        {/* ── row 2 ── */}
        <div className="row">
          <input
            className="title"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            placeholder="Untitled"
            disabled={!isUserProgram}
          />

          <button
            className={`btn save${canSave ? " dirty" : ""}`}
            onClick={onSave}
            title={canSave ? "Save (modified)" : "Saved"}
            disabled={!canSave}
          >
            {Save}
          </button>

          <button
            className="btn"
            onClick={onDelete}
            title="Delete"
            disabled={!canDelete}
          >
            {Trash}
          </button>
        </div>
      </div>

      {/* ――― scoped CSS ――― */}
      <style jsx>{`
        .exsel {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          padding: 4px;
        }
        .row {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
        select {
          flex: 1 1 auto;
          padding: 0.35rem 0.55rem;
          font-size: 0.95rem;
          background: #222;
          color: #666;
          border: 1px solid #444;
          border-radius: 4px;
        }
        .title {
          flex: 1 1 auto;
          padding: 0.35rem 0.55rem;
          font-size: 0.95rem;
          background: #222;
          color: #eee;
          border: 1px solid #444;
          border-radius: 4px;
        }
        .btn {
          width: 34px;
          height: 34px;
          display: grid;
          place-items: center;
          background: #333;
          border: 1px solid #444;
          border-radius: 4px;
          color: #ddd;
          cursor: pointer;
          transition: background 0.15s;
        }
        .btn:hover:not(:disabled) {
          background: #444;
        }
        .btn:disabled {
          opacity: 0.4;
          cursor: default;
        }
        .save.dirty {
          background: #3a5;
          border-color: #4b6;
        }
      `}</style>
    </>
  );
}
