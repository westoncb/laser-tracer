import logo from "../../assets/logo1.png";

export default function TitleBar({ onManual }) {
  return (
    <header className="title-bar">
      <div className="logo">
        <img src={logo} alt="LaserTracer logo" />
      </div>

      <div className="header-actions">
        <button className="graphite" onClick={onManual}>
          Instruction&nbsp;Manual
          <span
            style={{
              fontWeight: 400,
              fontSize: "0.85em",
              color: "#60d088",
              marginLeft: "0.3em",
            }}
          >
            (LLM&nbsp;friendly)
          </span>
        </button>
        {/* future buttons */}
      </div>
    </header>
  );
}
