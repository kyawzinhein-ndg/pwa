import React, { useEffect, useState } from "react";
import { Sun, Moon, User, LogIn, LogOut, MapPin } from "lucide-react";

export default function MenuPage({
  isDark,
  setTheme,
  currentCity,
  onChangeCity,
  onLogin = () => alert("TODO: connect Google Auth"),
  onLogout = () => alert("Signed out"),
}) {
  const [cities, setCities] = useState([]);

  // 🔹 Fetch unique cities from shops.json
  useEffect(() => {
    fetch("/shops.json")
      .then((res) => res.json())
      .then((data) => {
        const uniqueCities = [...new Set(data.map((shop) => shop.city))].sort();
        setCities(uniqueCities);
      })
      .catch((err) => console.error("Error loading cities:", err));
  }, []);

  return (
    <div
      className="
        min-h-full 
        bg-white dark:bg-black 
        text-gray-800 dark:text-gray-200 
        pt-[calc(56px+env(safe-area-inset-top))] 
        pb-[calc(56px+env(safe-area-inset-bottom)+56px)]
        flex flex-col
      "
    >
      {/* ===== Header ===== */}
      <div className="relative bg-gradient-to-r from-blue-500 to-teal-500 h-36 flex items-end justify-center">
        <div className="absolute -bottom-12 flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center shadow-lg border-4 border-white dark:border-black">
            <User className="h-10 w-10 text-gray-500 dark:text-gray-300" />
          </div>
          <h2 className="mt-3 text-lg font-semibold text-gray-900 dark:text-white">
            Welcome!
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Sign in to personalize your experience
          </p>
          <div className="mt-4 flex gap-3">
            <button
              onClick={onLogin}
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-blue-600 text-white font-medium shadow hover:bg-blue-700 transition"
            >
              <LogIn size={18} /> Sign In
            </button>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-5 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 font-medium shadow hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              <LogOut size={18} /> Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* ===== Settings ===== */}
      <div className="mt-20 px-4 flex-1 space-y-5">
        <h3 className="text-base font-semibold text-gray-700 dark:text-gray-300">
          Settings
        </h3>

        {/* Theme Card */}
        <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-2xl shadow flex items-center justify-between">
          <div className="flex items-center gap-3">
            {isDark ? <Moon size={20} /> : <Sun size={20} />}
            <span className="font-medium">Theme</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setTheme("light")}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium ${
                !isDark
                  ? "bg-blue-600 text-white"
                  : "border border-gray-300 dark:border-gray-700"
              }`}
            >
              Light
            </button>
            <button
              onClick={() => setTheme("dark")}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium ${
                isDark
                  ? "bg-teal-600 text-white"
                  : "border border-gray-300 dark:border-gray-700"
              }`}
            >
              Dark
            </button>
          </div>
        </div>

        {/* City Card */}
        <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-2xl shadow flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MapPin size={20} />
            <span className="font-medium">Home City</span>
          </div>
          <select
            value={currentCity}
            onChange={(e) => onChangeCity(e.target.value)}
            className="ml-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Cities</option>
            {cities.map((city, idx) => (
              <option key={idx} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
