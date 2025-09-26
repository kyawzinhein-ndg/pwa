import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import BottomNav from "./components/BottomNav";

// Pages
import HomePage from "./pages/HomePage";
import ContactPage from "./pages/ContactPage";
import EducationPage from "./pages/EducationPage";
import MenuPage from "./pages/MenuPage"; // ✅ new tab

const tabs = ["home", "contact", "education", "menu"]; // ✅ add menu

export default function App() {
  const [page, setPage] = useState("home");
  const [direction, setDirection] = useState(0);

  const [isDark, setIsDark] = useState(
    () => document.documentElement.classList.contains("dark")
  );
  const [homeCity, setHomeCity] = useState(
    () => localStorage.getItem("homeCity") || ""
  );

  // Load theme preference once
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (
      saved === "dark" ||
      (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  }, []);

  // Sync URL on first load
  useEffect(() => {
    const path = window.location.pathname.replace("/", "");
    if (tabs.includes(path)) setPage(path);
  }, []);

  // Update URL when page changes
  useEffect(() => {
    if (page) window.history.pushState(null, "", `/${page}`);
  }, [page]);

  const currentIndex = tabs.indexOf(page);

  const pages = {
    home: <HomePage />,
    contact: <ContactPage city={homeCity} />, // ✅ pass city to filter shops
    education: <EducationPage />,
    menu: (
      <MenuPage
        isDark={isDark}
        setTheme={(mode) => {
          const dark = mode === "dark";
          document.documentElement.classList.toggle("dark", dark);
          setIsDark(dark);
          localStorage.setItem("theme", dark ? "dark" : "light");
        }}
        currentCity={homeCity}
        onChangeCity={(city) => {
          setHomeCity(city);
          localStorage.setItem("homeCity", city);
        }}
        cities={[
          "Yangon",
          "Mandalay",
          "Naypyidaw",
          "Bago",
          "Monywa",
          "Hledan",
          "Thanlyin",
        ]}
      />
    ),
  };

  const variants = {
    enter: (dir) => ({ x: dir > 0 ? 220 : -220, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir < 0 ? 220 : -220, opacity: 0 }),
  };

  // Swipe between tabs
  const touchStartX = useRef(null);
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    if (touchStartX.current == null) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;

    if (diff > 70 && currentIndex > 0) {
      setDirection(-1);
      setPage(tabs[currentIndex - 1]);
    } else if (diff < -70 && currentIndex < tabs.length - 1) {
      setDirection(1);
      setPage(tabs[currentIndex + 1]);
    }
    touchStartX.current = null;
  };

  return (
    <div
      className="min-h-screen bg-white dark:bg-black text-black dark:text-white overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top navbar (with iOS safe area) */}
      <Navbar />

      {/* Pages */}
      <div className="relative min-h-screen pb-[calc(56px+env(safe-area-inset-bottom))] pt-[calc(56px+env(safe-area-inset-top))] overflow-hidden">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={page}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="absolute inset-0 p-4"
          >
            {pages[page]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom nav */}
      <BottomNav
        current={page}
        onChange={(next) => {
          const nextIndex = tabs.indexOf(next);
          setDirection(nextIndex > currentIndex ? 1 : -1);
          setPage(next);
        }}
      />
    </div>
  );
}
