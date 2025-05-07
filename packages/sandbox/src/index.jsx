// src/index.jsx
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App";
import "./style.css"; // minimal reset / flex layout

createRoot(document.getElementById("root")).render(<App />);
