import { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Image as ImageIcon, ChevronRight } from "lucide-react";
import ShopDetailsContent from "./ShopDetailsContent";

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
          <div className="overflow-y-auto max-h-[75vh] px-6 pb-6">
            <ShopDetailsContent shop={shop} />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function ShopList({ shops }) {
  const [selected, setSelected] = useState(null);
  const [query, setQuery] = useState("");
  const [activeLetter, setActiveLetter] = useState(null);
  const [scrollLetter, setScrollLetter] = useState(null);
  const [bubbleY, setBubbleY] = useState(null);
  const [cityFilter, setCityFilter] = useState(
    localStorage.getItem("selectedCity") || ""
  );

  const sidebarRef = useRef(null);
  const lastLetterRef = useRef(null);
  const scrollTimeoutRef = useRef(null);

  // ✅ React to city changes from drawer
  useEffect(() => {
    const handler = () => {
      setCityFilter(localStorage.getItem("selectedCity") || "");
    };
    window.addEventListener("city-changed", handler);
    return () => window.removeEventListener("city-changed", handler);
  }, []);

  // ✅ Filter by query + city
  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return shops.filter(
      (s) =>
        (!cityFilter || s.city === cityFilter) && // ← filter by chosen city
        (s.name?.toLowerCase().includes(q) ||
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
      if (!acc[letter]) acc[letter] = [];
      acc[letter].push(shop);
      return acc;
    }, {});
  }, [filtered]);

  const letters = Object.keys(grouped).sort();

  // ✅ Scroll to letter
  const scrollToLetter = (letter) => {
    const el = document.getElementById(letter);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });

    if (lastLetterRef.current !== letter) {
      lastLetterRef.current = letter;
      if (navigator.vibrate) navigator.vibrate(15);
    }

    setActiveLetter(letter);
    setScrollLetter(letter);
    clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => setScrollLetter(null), 700);
  };

  // ✅ Touch handling
  const handleTouch = (e) => {
    if (!sidebarRef.current) return;
    const touch = e.touches[0];
    const rect = sidebarRef.current.getBoundingClientRect();
    const relY = touch.clientY - rect.top;
    const index = Math.floor((relY / rect.height) * letters.length);

    if (index >= 0 && index < letters.length) {
      scrollToLetter(letters[index]);
      setBubbleY(touch.clientY);
    }
  };

  const handleEnd = () => {
    setTimeout(() => {
      setActiveLetter(null);
      setBubbleY(null);
      if (navigator.vibrate) navigator.vibrate(25);
    }, 500);
  };

  // ✅ Detect scroll
  useEffect(() => {
    const handleScroll = () => {
      const visible = letters.find((letter) => {
        const el = document.getElementById(letter);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top >= 0 && rect.top < window.innerHeight * 0.25;
      });
      if (visible) {
        setScrollLetter(visible);
        clearTimeout(scrollTimeoutRef.current);
        scrollTimeoutRef.current = setTimeout(() => setScrollLetter(null), 800);
      }
    };

    window.addEventListener("scroll", handleScroll, true);
    return () => window.removeEventListener("scroll", handleScroll, true);
  }, [letters]);

  return (
    <div className="flex h-full relative pt-14">
      {/* Contact list */}
      <div className="flex-1 overflow-y-auto pb-20 bg-white dark:bg-black">
        {/* Show selected city */}
        {cityFilter && (
          <div className="sticky top-14 z-20 bg-blue-50 dark:bg-gray-800 text-center py-2 text-sm font-medium text-blue-700 dark:text-teal-300 border-b border-gray-200 dark:border-gray-700">
            Showing shops in {cityFilter}
          </div>
        )}

        {letters.map((letter) => (
          <div key={letter} id={letter}>
            <h2 className="sticky top-[calc(3.5rem+32px)] z-10 ml-3 mt-1 mb-0.5 text-[11px] font-semibold text-gray-500">
              {letter}
            </h2>

            {grouped[letter].map((shop, idx) => {
              const safeName = shop.name || "No Name";
              const placeholderUrl = `https://placehold.co/80x80/e2e8f0/64748b.png?text=${safeName.charAt(
                0
              ).toUpperCase()}`;
              const imageUrl =
                shop.logo && shop.logo.startsWith("/images/")
                  ? shop.logo
                  : placeholderUrl;

              return (
                <motion.div
                  key={idx}
                  className="flex items-center justify-between gap-4 px-4 py-3 border-b 
                             border-gray-200 dark:border-gray-700 cursor-pointer 
                             bg-white dark:bg-black"
                  onClick={() => setSelected(shop)}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center gap-4">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={safeName}
                        className="h-10 w-10 rounded-full object-cover border"
                      />
                    ) : (
                      <div className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700">
                        <ImageIcon className="h-5 w-5 text-gray-500" />
                      </div>
                    )}
                    <div className="flex flex-col">
                      <span className="font-medium">{safeName}</span>
                      <span className="text-sm text-gray-500">
                        {shop.town}, {shop.city}
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

      {/* A–Z sidebar */}
      <div
        ref={sidebarRef}
        className="fixed right-1 top-1/2 -translate-y-1/2 flex flex-col items-center 
                   text-[10px] text-gray-500 dark:text-gray-400 select-none z-30
                   bg-white/40 dark:bg-black/30 backdrop-blur-sm rounded-xl px-2 py-1"
        onTouchStart={handleTouch}
        onTouchMove={handleTouch}
        onTouchEnd={handleEnd}
      >
        {letters.map((letter) => (
          <button
            key={letter}
            onClick={() => scrollToLetter(letter)}
            className="py-0.5 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            {letter}
          </button>
        ))}
      </div>

      {/* Overlay bubble */}
      <AnimatePresence>
        {activeLetter && bubbleY && (
          <motion.div
            key={"active-" + activeLetter}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="fixed right-12 top-1/2 -translate-y-1/2 z-50 pointer-events-none"
          >
            <div className="h-20 w-20 flex items-center justify-center 
                            text-4xl font-bold text-gray-700 dark:text-gray-200 
                            bg-white/90 dark:bg-black/80 rounded-full shadow-lg">
              {activeLetter}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll indicator bubble */}
      <AnimatePresence>
        {scrollLetter && !activeLetter && (
          <motion.div
            key={"scroll-" + scrollLetter}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ type: "spring", stiffness: 250, damping: 18 }}
            className="fixed right-3 top-1/2 -translate-y-1/2 z-40 pointer-events-none"
          >
            <div className="h-16 w-16 flex items-center justify-center 
                            text-3xl font-bold text-gray-700 dark:text-gray-200 
                            bg-white/90 dark:bg-black/80 rounded-full shadow-lg">
              {scrollLetter}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <BottomSheet shop={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
