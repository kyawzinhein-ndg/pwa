// src/pages/HomePage.jsx
import { useState, useEffect } from "react";
import { Phone, BookOpen, ClipboardList } from "lucide-react";
import { motion } from "framer-motion";

const ads = [
  { id: 1, img: "/ads/ad1.png", alt: "Ad 1" },
  { id: 2, img: "/ads/ad2.png", alt: "Ad 2" },
  { id: 3, img: "/ads/ad3.png", alt: "Ad 3" },
];

export default function HomePage({ setPage }) {
  const [current, setCurrent] = useState(0);

  // ✅ Auto-rotate ads
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % ads.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const shortcuts = [
    {
      id: "contact",
      title: "Contacts",
      desc: "Find repair shops & spare parts.",
      icon: <Phone size={28} />,
      bg: "from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-900/10",
      iconBg: "bg-purple-600",
    },
    {
      id: "learning",
      title: "Learning",
      desc: "Step-by-step tutorials & guides.",
      icon: <BookOpen size={28} />,
      bg: "from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-900/10",
      iconBg: "bg-blue-600",
    },
    {
      id: "quiz",
      title: "Quiz",
      desc: "Test your knowledge & skills.",
      icon: <ClipboardList size={28} />,
      bg: "from-teal-50 to-teal-100 dark:from-teal-900/30 dark:to-teal-900/10",
      iconBg: "bg-teal-600",
    },
  ];

  return (
    <div className="flex flex-col h-full pb-20">
      {/* Ads Carousel with colorful gradient overlay */}
      <div className="w-full h-44 sm:h-56 relative overflow-hidden rounded-xl mt-4">
        {/* Gradient overlay before images */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-40 z-10" />

        {ads.map((ad, idx) => (
          <motion.img
            key={ad.id}
            src={ad.img}
            alt={ad.alt}
            className="absolute inset-0 w-full h-full object-cover rounded-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: idx === current ? 1 : 0 }}
            transition={{ duration: 0.8 }}
          />
        ))}
      </div>

      {/* Shortcut Blocks */}
      <div className="px-4 mt-6 space-y-4">
        {shortcuts.map((item) => (
          <motion.button
            key={item.id}
            onClick={() => setPage(item.id)}
            whileTap={{ scale: 0.98 }}
            className={`w-full flex items-center gap-4 p-5 rounded-xl border shadow-md
                        bg-gradient-to-r ${item.bg} hover:shadow-lg transition text-left`}
          >
            <div className={`p-3 rounded-lg ${item.iconBg} text-white`}>
              {item.icon}
            </div>
            <div className="flex flex-col items-start">
              <span className="font-semibold text-lg">{item.title}</span>
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {item.desc}
              </span>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
