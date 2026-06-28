import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import { App } from "./App.js";
import { registerServiceWorker } from "./utils/pwa.js";

if (import.meta.env.DEV) {
  const appName = import.meta.env.VITE_APP_NAME ?? "App";
  // biome-ignore lint/suspicious/noConsole: intentional dev-only log
  console.debug(`[${appName}] Starting in development mode`);
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

// Register the service worker after the app has rendered.
// This avoids delaying the first paint with SW registration overhead.
registerServiceWorker();
