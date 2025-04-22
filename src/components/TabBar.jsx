export default function TabBar({ active, onChange }) {
  return (
    <div className="tab-bar">
      <button
        className={active === "canvas" ? "active" : ""}
        onClick={() => onChange("canvas")}
      >
        Canvas
      </button>
      <button
        className={active === "code" ? "active" : ""}
        onClick={() => onChange("code")}
      >
        Code
      </button>
    </div>
  );
}
