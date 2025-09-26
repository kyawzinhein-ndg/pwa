// src/components/UpdateToast.jsx
import { useEffect, useState } from "react";

export default function UpdateToast() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handler = () => setShow(true);
    window.addEventListener("pwa-update-available", handler);
    return () => window.removeEventListener("pwa-update-available", handler);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed bottom-16 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 z-50">
      <span>🔄 New version available</span>
      <button
        onClick={() => window.location.reload()}
        className="bg-blue-600 px-3 py-1 rounded-md text-sm font-semibold"
      >
        Refresh
      </button>
    </div>
  );
}
