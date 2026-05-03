import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// 1. Base token defaults (loaded first so our overrides in global.css win)
import "@synerity/tokens/css";

// 2. Playground shell + design system overrides (must come after tokens.css)
import "./global.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
