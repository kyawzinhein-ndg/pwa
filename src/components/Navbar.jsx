import React, { useEffect, useState } from "react";
import { Bell, Sun, Moon } from "lucide-react";

export default function Navbar() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className="
        fixed top-0 left-0 right-0 z-40
        bg-white/80 dark:bg-black/80
        backdrop-blur-md border-b border-gray-200 dark:border-gray-800
        flex items-center justify-between px-4
        h-[calc(56px+env(safe-area-inset-top))] pt-[env(safe-area-inset-top)]
      "
    >
      {/* Logo */}
      <img
        src={isDark ? "/logo-dark.png" : "/logo-light.png"}
        alt="App Logo"
        className="h-8 w-auto"
      />

      {/* Right actions */}
      <div className="flex items-center gap-3">
        {/* Notification */}
        <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
          <Bell size={20} className="text-gray-600 dark:text-gray-300" />
        </button>

        {/* Theme toggle */}
        <button
          onClick={() => document.documentElement.classList.toggle("dark")}
          className="p-2 rounded-full border bg-gray-50 dark:bg-gray-800"
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </header>
  );
}
