import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  const dotVariants = {
    start: { y: 0, opacity: 0.5 },
    animate: { y: -6, opacity: 1 },
  };

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white dark:bg-black z-50">
      {/* Logo */}
      <img
        src={isDark ? "/logo-dark.png" : "/logo-white.png"}
        alt="App Logo"
        className="h-14 w-auto mb-6"
      />

      {/* Dots */}
      <div className="flex gap-2">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="w-3 h-3 rounded-full bg-[#3B82F6] dark:bg-[#2DD4BF]"
            variants={dotVariants}
            initial="start"
            animate="animate"
            transition={{
              duration: 0.4,
              repeat: Infinity,
              repeatType: "reverse",
              delay: i * 0.2,
            }}
          />
        ))}
      </div>

      {/* Text */}
      <p className="mt-4 text-sm font-medium text-[#3B82F6] dark:text-[#2DD4BF]">
        Loading...
      </p>
    </div>
  );
}
