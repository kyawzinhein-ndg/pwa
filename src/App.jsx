// src/App.jsx
import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import BottomNav from "./components/BottomNav";
import ProfileDrawer from "./components/ProfileDrawer";
import PageWrapper from "./components/PageWrapper";
import LoadingScreen from "./components/LoadingScreen";
import UpdateToast from "./components/UpdateToast";

// Pages
import HomePage from "./pages/HomePage";
import ContactPage from "./pages/ContactPage";
import EducationPage from "./pages/EducationPage";
import LearningPage from "./pages/LearningPage";
import QuizPage from "./pages/QuizPage";

export default function App() {
  const [page, setPage] = useState("home");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bottomVisible, setBottomVisible] = useState(true); // ✅ controls bottom nav

  // ✅ Theme state (light, dark, auto)
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "auto";
  });

  useEffect(() => {
    const root = document.documentElement;

    const applyTheme = () => {
      if (theme === "dark") {
        root.classList.add("dark");
      } else if (theme === "light") {
        root.classList.remove("dark");
      } else {
        // auto → follow system
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
          root.classList.add("dark");
        } else {
          root.classList.remove("dark");
        }
      }
    };

    applyTheme();
    localStorage.setItem("theme", theme);

    if (theme === "auto") {
      const media = window.matchMedia("(prefers-color-scheme: dark)");
      const listener = () => applyTheme();
      media.addEventListener("change", listener);
      return () => media.removeEventListener("change", listener);
    }
  }, [theme]);

  // ✅ Load city list from shops.json
  useEffect(() => {
    fetch("/shops.json")
      .then((res) => res.json())
      .then((data) => {
        const uniqueCities = [...new Set(data.map((s) => s.city))].sort();
        setCities(uniqueCities);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // ✅ Sync tab with history API (deep-link URLs)
  useEffect(() => {
    window.history.pushState(null, "", `/${page}`);
  }, [page]);

  // ✅ Page mapping
  const pages = {
    home: <HomePage setPage={setPage} />,
    contact: <ContactPage />,
    education: <EducationPage setPage={setPage} />,
    learning: <LearningPage />,
    quiz: <QuizPage setBottomVisible={setBottomVisible} />, // ✅ pass setter
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      {/* Profile drawer (for settings/theme chooser) */}
      <ProfileDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        cities={cities}
        onCityChange={(city) => {
          localStorage.setItem("selectedCity", city);
          window.dispatchEvent(new Event("city-changed"));
        }}
        theme={theme}
        setTheme={setTheme}
      />

      {/* Animated page transitions */}
      <AnimatePresence mode="wait">
        <motion.div
          key={page}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.25 }}
          className="
            pt-[env(safe-area-inset-top)]
            pb-[calc(56px+env(safe-area-inset-bottom))]
          "
        >
          <PageWrapper noPadding={page === "quiz"}>
            {loading && page === "contact" ? (
              <LoadingScreen />
            ) : (
              pages[page]
            )}
          </PageWrapper>
        </motion.div>
      </AnimatePresence>

      {/* ✅ Show BottomNav only if visible */}
      {bottomVisible && (
        <BottomNav
          page={page}
          setPage={setPage}
          onProfile={() => setDrawerOpen(true)}
        />
      )}

      {/* PWA update toast */}
      <UpdateToast />
    </div>
  );
}
