/* ------------------------------------------------------------------
   ManualModal.jsx – centred markdown modal with icon buttons + pulse
------------------------------------------------------------------- */

import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function ManualModal({ markdown, onClose }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const handleCopy = () => {
    navigator.clipboard.writeText(markdown).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 700);
    });
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <style>{`
        .modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
        }
        .modal-wrapper {
          background: #1b1f23;
          border: 1px solid #2c3136;
          border-radius: 8px;
          width: 80%;
          max-width: 900px;
          max-height: 80vh;
          display: flex;
          flex-direction: column;
          box-shadow: 0 8px 24px rgba(0,0,0,0.4);
          overflow: hidden;
        }
        @media (max-width: 768px) {
          .modal-wrapper {
            width: 94%;
            max-height: 88vh;
          }
        }
        .modal-header {
          padding: 0.8rem 1rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #16191d;
          border-bottom: 1px solid #2c3136;
        }
        .modal-header h2 {
          margin: 0;
          font-size: 1.1rem;
          font-weight: 600;
          color: #e6edf3;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
        }
        .modal-header-buttons {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .modal-content {
          flex: 1;
          overflow-y: auto;
          padding: 1rem 1.25rem;
          background: #1b1f23;
        }
        .modal-btn {
          background-color: #24292e;
          color: #ffffff;
          font-size: 16px;
          line-height: 1;
          border: 1px solid #444;
          border-radius: 6px;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background-color 0.1s ease, transform 0.2s ease;
          position: relative;
          box-shadow: 0 1px 0 rgba(27, 31, 35, 0.6);
        }
        .modal-btn:hover {
          background-color: #2c3136;
        }
        .modal-btn:active {
          background-color: #1b1f23;
          transform: translateY(1px);
          box-shadow: none;
        }
        .modal-btn.copied {
          animation: pulse 0.5s ease;
        }
        @keyframes pulse {
          0% { transform: scale(1); background-color: #2c3136; }
          50% { transform: scale(1.2); background-color: #3a4047; }
          100% { transform: scale(1); background-color: #2c3136; }
        }
        .modal-btn svg {
          width: 18px;
          height: 18px;
          stroke: #ccc;
        }
        .modal-btn::after {
          content: attr(data-tooltip);
          position: absolute;
          bottom: -1.8em;
          left: 50%;
          transform: translateX(-50%);
          background: #333;
          color: #ddd;
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 0.75rem;
          white-space: nowrap;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.2s;
        }
        .modal-btn:hover::after {
          opacity: 1;
        }

        /* --- markdown styling (unchanged) --- */
        .modal-content h1, .modal-content h2, .modal-content h3 {
          margin-top: 2rem;
          margin-bottom: 1rem;
          font-weight: 600;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
        }

        .modal-content h1 {
          color: rgba(96, 208, 136, 1); /* Full opacity */
        }

        .modal-content h2 {
          color: rgba(96, 208, 136, 0.85); /* 85% opacity */
        }

        .modal-content h3 {
          color: rgba(96, 208, 136, 0.7); /* 70% opacity */
        }
        .modal-content p {
          color: #c9d1d9;
          margin: 0.75rem 0;
          line-height: 1.6;
          font-size: 0.95rem;
        }
        .modal-content ul, .modal-content ol {
          padding-left: 1.5rem;
          margin: 1rem 0;
          color: #c9d1d9;
          font-size: 0.95rem;
        }
        .modal-content li {
          margin-bottom: 0.5rem;
        }
        .modal-content code {
          background: #272c33;
          padding: 0.2em 0.4em;
          border-radius: 4px;
          font-family: ui-monospace, SFMono-Regular, monospace;
          color: #f0f6fc;
          font-size: 0.9em;
        }
        .modal-content pre {
          background: #272c33;
          padding: 1rem;
          border-radius: 6px;
          overflow-x: auto;
          color: #c9d1d9;
          font-family: ui-monospace, SFMono-Regular, monospace;
          font-size: 0.9em;
        }
        .modal-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 1.5rem 0;
          display: block;
          overflow-x: auto;
          white-space: nowrap;
          background: #1b1f23;
        }
        .modal-content th, .modal-content td {
          border: 1px solid #2c3136;
          padding: 0.6rem 1rem;
          text-align: left;
          color: #c9d1d9;
          font-size: 0.95rem;
        }
        .modal-content th {
          background: #22272e;
          font-weight: 600;
          color: #e6edf3;
        }
        .modal-content hr {
          border: none;
          border-top: 1px solid #2c3136;
          margin: 2rem 0;
        }
        .modal-content a {
          color: #58a6ff;
          text-decoration: underline;
        }
      `}</style>

      <div className="modal-wrapper" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Instruction Manual</h2>
          <div className="modal-header-buttons">
            <button
              className={`modal-btn ${copied ? "copied" : ""}`}
              onClick={handleCopy}
              data-tooltip="Copy markdown"
              aria-label="Copy markdown"
            >
              {/* modern overlapping-squares copy icon */}
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
            </button>

            <button
              className="modal-btn"
              onClick={onClose}
              data-tooltip="Close"
              aria-label="Close"
            >
              ×
            </button>
          </div>
        </div>

        <div className="modal-content">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
