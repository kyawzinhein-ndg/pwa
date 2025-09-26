// src/components/ProfileDrawer.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Sun, Moon, MapPin } from "lucide-react";

export default function ProfileDrawer({ isOpen, onClose, cities = [], onCityChange }) {
  const [isDark, setIsDark] = useState(false);
  const [selectedCity, setSelectedCity] = useState(localStorage.getItem("selectedCity") || "");

  // Track dark mode
  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", document.documentElement.classList.contains("dark") ? "dark" : "light");
  };

  const handleCityChange = (e) => {
    const city = e.target.value;
    setSelectedCity(city);
    localStorage.setItem("selectedCity", city);
    if (onCityChange) onCityChange(city);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="absolute right-0 top-0 h-full w-80 bg-white dark:bg-gray-900 shadow-xl flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b dark:border-gray-800">
              <h2 className="font-bold text-lg text-gray-800 dark:text-gray-100 flex items-center gap-2">
                <User size={18} /> Profile
              </h2>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-200">
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {/* Login placeholder */}
              <div className="flex flex-col items-center gap-3">
                <img
                  src="https://placehold.co/100x100/E5E7EB/9CA3AF?text=User"
                  alt="User"
                  className="w-20 h-20 rounded-full border-4 shadow"
                />
                <h3 className="font-bold text-gray-800 dark:text-gray-100">Welcome!</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Sign in to get started.</p>
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600">
                  Sign In with Google
                </button>
              </div>

              {/* Theme chooser */}
              <div>
                <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                  {isDark ? <Moon size={16} /> : <Sun size={16} />} Theme
                </h4>
                <button
                  onClick={toggleTheme}
                  className="w-full px-4 py-2 rounded-lg border dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Switch to {isDark ? "Light" : "Dark"} Mode
                </button>
              </div>

              {/* City chooser */}
              <div>
                <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                  <MapPin size={16} /> City
                </h4>
                <select
                  value={selectedCity}
                  onChange={handleCityChange}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
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
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
