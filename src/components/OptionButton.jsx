import { useState } from "react";
import { motion } from "framer-motion";

export default function OptionButton({
  label,
  text,
  isCorrect,
  isSelected,
  disabled,
  onSelect,
}) {
  const [rippling, setRippling] = useState(false);

  const handleClick = () => {
    setRippling(true);
    setTimeout(() => setRippling(false), 600); // reset after animation
    onSelect();
  };

  return (
    <motion.button
      onClick={handleClick}
      disabled={disabled}
      whileTap={{ scale: 0.97 }}
      className={`relative w-full p-4 rounded-xl border text-left transition overflow-hidden
        ${
          isCorrect
            ? "bg-green-100 border-green-500 text-green-900"
            : isSelected
            ? "bg-red-100 border-red-500 text-red-900"
            : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
        }`}
    >
      {/* Ripple Layer */}
      <span
        className={`ripple ${rippling ? "ripple-active" : ""}`}
      ></span>

      <span className="font-medium relative z-10">{label}.</span>{" "}
      <span className="relative z-10">{text}</span>
    </motion.button>
  );
}
