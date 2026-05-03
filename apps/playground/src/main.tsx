import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./global.css";

// Design tokens CSS custom properties
import "@synerity/tokens/css";

// UI component styles (compiled CSS Modules output by tsup)
import "@synerity/ui/styles";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
