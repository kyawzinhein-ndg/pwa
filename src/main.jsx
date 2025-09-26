import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

// Register SW
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((reg) => {
        console.log("✅ Service Worker registered:", reg);

        // 🔄 Listen for new updates
        reg.addEventListener("updatefound", () => {
          const newWorker = reg.installing;
          newWorker.addEventListener("statechange", () => {
            if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
              window.dispatchEvent(new Event("pwa-update-available"));
            }
          });
        });
      })
      .catch((err) => console.error("SW registration failed:", err));
  });
}

// ✅ Show toast when update available
window.addEventListener("pwa-update-available", () => {
  const toast = document.createElement("div");
  toast.innerHTML = `
    <div style="
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: #111;
      color: #fff;
      padding: 12px 20px;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 14px;
      z-index: 9999;
    ">
      🔄 New version available
      <button id="refresh-app" style="
        background: #2563eb;
        color: white;
        border: none;
        padding: 6px 12px;
        border-radius: 8px;
        cursor: pointer;
        font-weight: 600;
      ">
        Refresh
      </button>
    </div>
  `;
  document.body.appendChild(toast);

  document.getElementById("refresh-app").onclick = () => {
    if (navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({ type: "SKIP_WAITING" });
    }
    window.location.reload();
  };
});
