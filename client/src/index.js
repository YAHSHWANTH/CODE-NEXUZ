import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css"; // tailwind etc if used

// 🛠️ Suppress third-party react-scroll warning for anonymous listeners
const originalWarn = console.warn;
console.warn = (...args) => {
  if (args[0] && typeof args[0] === "string" && args[0].includes("Listener must be a named function")) {
    return;
  }
  originalWarn(...args);
};

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
