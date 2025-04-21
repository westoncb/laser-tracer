/* ------------------------------------------------------------------
   ManualModal.jsx – centred markdown modal with dark backdrop
   ------------------------------------------------------------------
   Props
   ─────
   • markdown : string        – raw markdown to render
   • onClose  : () => void    – called when user dismisses (click backdrop or ×)

   Notes
   ─────
   • Uses react-markdown to render content.
   • Injects a small <style> block so we don't need external CSS updates.
   • Esc key closes the dialog for accessibility.
-------------------------------------------------------------------*/

import { useEffect } from "react";
import ReactMarkdown from "react-markdown";

export default function ManualModal({ markdown, onClose }) {
  /* ---- close on Esc ------------------------------------------- */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  /* ---- copy helper -------------------------------------------- */
  const handleCopy = () => {
    navigator.clipboard.writeText(markdown).then(() => {
      /* simple visual feedback */
      const el = document.createElement("div");
      el.textContent = "Copied!";
      Object.assign(el.style, {
        position: "fixed",
        bottom: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        background: "#333",
        color: "#ddd",
        padding: "6px 12px",
        borderRadius: "4px",
        zIndex: 2001,
        opacity: 0,
        transition: "opacity 0.2s",
      });
      document.body.appendChild(el);
      requestAnimationFrame(() => (el.style.opacity = 1));
      setTimeout(() => {
        el.style.opacity = 0;
        setTimeout(() => document.body.removeChild(el), 200);
      }, 900);
    });
  };

  /* ---- render -------------------------------------------------- */
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <style>{`
        .modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.55);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
        }
        .modal-wrapper {
          background: #14191e;
          border: 1px solid #333;
          border-radius: 8px;
          width: 80%;
          max-width: 900px;
          max-height: 80vh;
          display: flex;
          flex-direction: column;
        }
        @media (max-width: 768px) {
          .modal-wrapper {
            width: 94%;
            max-height: 88vh;
          }
        }
        .modal-header, .modal-footer {
          padding: 0.8rem 1rem;
          display: flex;
          align-items: center;
        }
        .modal-header {
          justify-content: space-between;
          border-bottom: 1px solid #222;
        }
        .modal-footer {
          justify-content: flex-end;
          border-top: 1px solid #222;
        }
        .modal-header h2 {
          margin: 0;
          font-size: 1.05rem;
          font-weight: 600;
        }
        .modal-content {
          flex: 1;
          overflow-y: auto;
          padding: 1rem 1.25rem;
        }
        .modal-btn {
          background: #333;
          color: #ddd;
          border: none;
          padding: 0.45rem 0.8rem;
          border-radius: 4px;
          cursor: pointer;
        }
        .modal-btn:hover {
          background: #444;
        }
      `}</style>

      {/* stop propagation so clicks inside don't close */}
      <div className="modal-wrapper" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Instruction Manual</h2>
          <button className="modal-btn" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        <div className="modal-content">
          <ReactMarkdown>{markdown}</ReactMarkdown>
        </div>

        <div className="modal-footer">
          <button className="modal-btn" onClick={handleCopy}>
            Copy markdown
          </button>
        </div>
      </div>
    </div>
  );
}
