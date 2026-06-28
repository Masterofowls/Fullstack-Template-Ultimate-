import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import { App } from "./App.js";

if (import.meta.env.DEV) {
}

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error('Root element "#root" not found. Check your index.html file.');
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
