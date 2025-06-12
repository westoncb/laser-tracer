export default function CanvasGuard({ onConfirm, onWatchVideo }) {
  return (
    <>
      <div className="guard-overlay">
        <div className="guard-box">
          <h3>Heads-Up!</h3>
          <p>
            Laser-Tracer runs a live sandbox that can be demanding on your CPU
            and GPU, especially on mobile or low-power devices.
          </p>
          <div className="guard-actions">
            <button className="graphite primary" onClick={onConfirm}>
              Run Sandbox
            </button>
            <button className="graphite" onClick={onWatchVideo}>
              Watch Video Instead
            </button>
          </div>
        </div>
      </div>

      {/* Scoped CSS for the overlay */}
      <style>{`
        .guard-overlay {
          position: absolute;
          inset: 0;
          background: rgba(10, 10, 10, 0.7);
          backdrop-filter: blur(5px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 100;
          padding: 1rem;
        }
        .guard-box {
          background: var(--btn-face, #2b2b2b);
          border: 1px solid #444;
          border-radius: 8px;
          padding: 1.5rem 2rem;
          max-width: 400px;
          text-align: center;
          box-shadow: 0 8px 30px rgba(0,0,0,0.5);
        }
        .guard-box h3 {
          margin-top: 0;
          color: var(--btn-accent, #9ddcff);
          font-size: 1.5rem;
        }
        .guard-box p {
          color: var(--btn-text, #e2e2e2);
          line-height: 1.6;
          margin-bottom: 2rem;
        }
        .guard-actions {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        /* Style the primary button to be more prominent */
        .guard-actions button.primary {
            background-color: #3a5;
            border-color: #4b6;
        }
        .guard-actions button.primary:hover {
            background-color: #4b6;
        }
      `}</style>
    </>
  );
}
