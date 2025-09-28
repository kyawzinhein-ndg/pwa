// src/components/Navbar.jsx
import React, { useEffect, useState } from "react";
import { Bell } from "lucide-react";

export default function Navbar() {
  const [isDark, setIsDark] = useState(false);

  // ✅ Detect current theme
  useEffect(() => {
    const updateTheme = () => {
      const dark = document.documentElement.classList.contains("dark");
      setIsDark(dark);

      // ✅ Update status bar color
      const metaTheme = document.querySelector("meta[name=theme-color]");
      if (metaTheme) {
        if (dark) {
          metaTheme.setAttribute("content", "#000000"); // dark → black
        } else {
          metaTheme.setAttribute("content", "#3B82F6"); // light → Tailwind blue-500
        }
      }
    };

    updateTheme();

    // Watch for theme changes
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="
        relative
        bg-gradient-to-b from-blue-500 to-blue-400
        text-white
        h-[40vh]
        pt-[env(safe-area-inset-top)]
        flex flex-col
        justify-between
        shadow-md
      "
    >
      {/* Top Bar (status bar + nav controls) */}
      <header className="flex items-center justify-between px-4 h-14">
        <img
          src={isDark ? "/logo-dark.png" : "/logo-white.png"}
          alt="App Logo"
          className="h-8 w-auto drop-shadow"
        />
        <button className="p-2 rounded-full hover:bg-white/20 transition">
          <Bell size={20} className="text-white" />
        </button>
      </header>

      {/* Optional hero text or placeholder */}
      <div className="px-6 pb-6">
        <h1 className="text-2xl font-bold">Welcome Back</h1>
        <p className="text-sm text-white/80">Your personalized dashboard</p>
      </div>
    </div>
  );
}
