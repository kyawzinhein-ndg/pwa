import React, { useEffect, useState } from "react";

export default function InstallPWAButton() {
  const [promptEvent, setPromptEvent] = useState(null);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setPromptEvent(e);
    };
    const installedHandler = () => setInstalled(true);

    window.addEventListener("beforeinstallprompt", handler);
    window.addEventListener("appinstalled", installedHandler);
    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      window.removeEventListener("appinstalled", installedHandler);
    };
  }, []);

  if (installed) return null;

  return (
    <button
      disabled={!promptEvent}
      onClick={async () => {
        if (!promptEvent) return;
        promptEvent.prompt();
        const choice = await promptEvent.userChoice;
        if (choice.outcome === "accepted") {
          setPromptEvent(null);
        }
      }}
      className={`px-4 py-2 rounded-lg border text-sm ${
        promptEvent ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-600"
      }`}
      title={!promptEvent ? "App already installed or not eligible" : "Install App"}
    >
      {promptEvent ? "Install App" : "Installed"}
    </button>
  );
}
