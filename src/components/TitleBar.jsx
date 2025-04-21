import logo from "../assets/logo1.png";

export default function TitleBar({ onManual }) {
  return (
    <header className="title-bar logo-only">
      <div className="logo-container">
        <img src={logo} alt="LaserTracer Logo" className="logo-image" />
      </div>
      <button className="graphite" onClick={onManual}>
        Instruction&nbsp;Manual
        <span className="subtext">(LLM&nbsp;friendly)</span>
      </button>
    </header>
  );
}
