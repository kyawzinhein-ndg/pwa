// src/components/ShopList.jsx
import { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Search, X, ChevronLeft } from "lucide-react";
import ShopDetailsContent from "./ShopDetailsContent";
import AZSidebar from "./AZSidebar";

// --- Bottom Sheet ---
function BottomSheet({ shop, onClose }) {
  if (!shop) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="absolute bottom-0 left-0 right-0 bg-white dark:bg-gray-900 
                     rounded-t-2xl shadow-xl max-h-[85%] w-full overflow-hidden"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-12 h-1.5 bg-gray-300 dark:bg-gray-700 rounded-full mx-auto my-3" />
          <div
            className="overflow-y-auto max-h-[75vh] px-6 pb-6 scrollbar-hide overscroll-contain"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            <ShopDetailsContent shop={shop} />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function ShopList({ shops, onBack }) {
  const [selected, setSelected] = useState(null);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const [scrollLetter, setScrollLetter] = useState(null);
  const [cityFilter, setCityFilter] = useState(
    localStorage.getItem("selectedCity") || ""
  );

  const bannerRef = useRef(null);
  const cardRef = useRef(null);
  const headerRef = useRef(null);

  const [railRightCSS, setRailRightCSS] = useState("8px");
  const [railBoxStyle, setRailBoxStyle] = useState({
    top: "0px",
    bottom: "0px",
  });

  const AZ_INSET = 16;

  // ✅ Carousel banners
  const banners = [
    "/images/banner1.png",
    "/images/banner2.png",
    "/images/banner3.png",
  ];
  const [bannerIndex, setBannerIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setBannerIndex((p) => (p + 1) % banners.length),
      3000
    );
    return () => clearInterval(timer);
  }, [banners.length]);

  // ✅ React to city changes
  useEffect(() => {
    const handler = () =>
      setCityFilter(localStorage.getItem("selectedCity") || "");
    window.addEventListener("city-changed", handler);
    return () => window.removeEventListener("city-changed", handler);
  }, []);

  // ✅ Filter by query + city
  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return shops.filter(
      (s) =>
        (!cityFilter || s.city === cityFilter) &&
        (!q ||
          s.name?.toLowerCase().includes(q) ||
          s.city?.toLowerCase().includes(q) ||
          s.town?.toLowerCase().includes(q))
    );
  }, [shops, query, cityFilter]);

  // ✅ Group A–Z
  const grouped = useMemo(() => {
    const sorted = [...filtered].sort((a, b) =>
      (a.name || "").localeCompare(b.name || "")
    );
    return sorted.reduce((acc, shop) => {
      const letter = shop.name?.charAt(0).toUpperCase() || "#";
      (acc[letter] ||= []).push(shop);
      return acc;
    }, {});
  }, [filtered]);

  const letters = Object.keys(grouped).sort();

  // ✅ scroll helper
  const scrollToLetter = (letter, smooth = true) => {
    const el = document.getElementById(letter);
    if (el) {
      el.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "start" });
    }
    setScrollLetter(letter);
  };

  // --- Scroll spy (iOS-like) ---
  useEffect(() => {
    const scroller = cardRef.current;
    if (!scroller) return;

    const handleScroll = () => {
      let current = null;
      const containerTop = scroller.getBoundingClientRect().top;

      for (let letter of letters) {
        const el = document.getElementById(letter);
        if (!el) continue;
        const rect = el.getBoundingClientRect();

        if (rect.top <= containerTop + 60) {
          current = letter;
        }
      }
      if (current) setScrollLetter(current);
    };

    scroller.addEventListener("scroll", handleScroll, { passive: true });
    return () => scroller.removeEventListener("scroll", handleScroll);
  }, [letters]);

  // --- Rail positioning ---
  useEffect(() => {
    const computeRailRight = () => {
      const card = cardRef.current;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const gapToViewportRight = window.innerWidth - rect.right;
      const px = Math.max(gapToViewportRight + AZ_INSET, AZ_INSET);
      setRailRightCSS(`${px}px`);
    };
    computeRailRight();
    window.addEventListener("resize", computeRailRight);
    window.addEventListener("orientationchange", computeRailRight);
    return () => {
      window.removeEventListener("resize", computeRailRight);
      window.removeEventListener("orientationchange", computeRailRight);
    };
  }, []);

  useEffect(() => {
    const computeRailBox = () => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      setRailBoxStyle({
        top: `${rect.top}px`,
        bottom: `${window.innerHeight - rect.bottom}px`,
      });
    };
    computeRailBox();
    window.addEventListener("resize", computeRailBox);
    window.addEventListener("orientationchange", computeRailBox);
    return () => {
      window.removeEventListener("resize", computeRailBox);
      window.removeEventListener("orientationchange", computeRailBox);
    };
  }, []);

  return (
   <div
  className="fixed inset-0 flex flex-col overflow-hidden
             bg-gradient-to-b from-blue-500 via-blue-400 via-25% to-transparent to-25%
             dark:from-blue-900 dark:via-blue-800 dark:via-25% dark:to-transparent dark:to-25%"
>


      {/* 🔹 Header */}
      <div
        ref={headerRef}
        className="px-4 pt-[env(safe-area-inset-top)] bg-transparent"
      >
        <div className="flex items-center justify-between py-3">
          <button
            onClick={onBack}
            className="p-2 rounded-full hover:bg-white/20 dark:hover:bg-black/20"
          >
            <ChevronLeft className="h-6 w-6 text-white" />
          </button>

          <h1 className="text-white font-semibold text-lg">Contact</h1>

          <div className="w-8 flex justify-end">
            {!showSearch ? (
              <button
                onClick={() => setShowSearch(true)}
                className="p-2 rounded-full hover:bg-white/20 dark:hover:bg-black/20"
              >
                <Search className="h-5 w-5 text-white" />
              </button>
            ) : (
              <button
                onClick={() => {
                  setShowSearch(false);
                  setQuery("");
                }}
                className="p-2 rounded-full hover:bg-white/20 dark:hover:bg-black/20"
              >
                <X className="h-5 w-5 text-white" />
              </button>
            )}
          </div>
        </div>

        {/* 🔎 Animated Search Bar */}
        <AnimatePresence>
          {showSearch && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="pb-3"
            >
              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
                className="w-full px-3 py-2 rounded-md bg-white text-gray-800 text-sm focus:outline-none"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 🔹 Banner + White container */}
      <div ref={bannerRef} className="px-4">
        {/* Banner */}
        <div className="aspect-[16/9] w-full rounded-t-3xl overflow-hidden shadow-md relative">
          <img
            src={banners[bannerIndex]}
            alt={`Banner ${bannerIndex + 1}`}
            className="h-full w-full object-cover transition-opacity duration-700"
          />
          <div className="absolute bottom-2 w-full flex justify-center gap-2">
            {banners.map((_, i) => (
              <span
                key={i}
                className={`h-2 w-2 rounded-full transition-colors duration-300 ${
                  i === bannerIndex ? "bg-white" : "bg-gray-400/50"
                }`}
              />
            ))}
          </div>
        </div>

        {/* White contact container */}
        <div
          ref={cardRef}
          className="relative bg-white dark:bg-black
                     rounded-b-3xl shadow-2xl shadow-blue-200/50 dark:shadow-blue-900/40
                     w-full max-h-[60vh] overflow-y-auto overscroll-contain"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          <div className="pr-12">
            {letters.map((letter) => (
              <div key={letter} id={letter} className="px-2 scroll-mt-[60px]">
             <h2
  id={letter}
  className="sticky top-0 z-10 text-xs font-semibold text-gray-600 dark:text-gray-300 ml-2
             bg-transparent pointer-events-none"
>
  {letter}
</h2>



                {grouped[letter].map((shop, idx) => {
                  const safeName = shop.name || "No Name";
                  const placeholderUrl = `https://placehold.co/80x80/e2e8f0/64748b.png?text=${safeName
                    .charAt(0)
                    .toUpperCase()}`;
                  const imageUrl =
                    shop.logo && shop.logo.startsWith("/images/")
                      ? shop.logo
                      : placeholderUrl;

                  return (
                    <motion.div
                      key={idx}
                      className="flex items-center justify-between gap-4 py-3 border-b 
                                 border-gray-200 dark:border-gray-700 cursor-pointer 
                                 bg-white dark:bg-black pl-6"
                      onClick={() => setSelected(shop)}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={imageUrl}
                          alt={safeName}
                          className="h-10 w-10 rounded-full object-cover border"
                        />
                        <div className="flex flex-col">
                          <span className="font-medium">{safeName}</span>
                          <span className="text-sm text-gray-500">
                            {[shop.town, shop.city].filter(Boolean).join(", ")}
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    </motion.div>
                  );
                })}
              </div>
            ))}

            {letters.length === 0 && (
              <p className="p-6 text-center text-gray-500">No results found.</p>
            )}
          </div>

          <BottomSheet shop={selected} onClose={() => setSelected(null)} />
        </div>
      </div>

      {/* 📌 A–Z rail OUTSIDE white container, fixed */}
      <AZSidebar
  letters={letters}
  scrollLetter={scrollLetter}
  onScrollToLetter={scrollToLetter}
  railRightCSS={railRightCSS}
  railBoxStyle={railBoxStyle}
  disabled={showSearch || !!selected}
/>

    </div>
  );
}
