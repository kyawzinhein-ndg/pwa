import { motion } from "framer-motion";

export default function LoadingScreen() {
  const dotVariants = {
    start: { y: 0, opacity: 0.5 },
    animate: { y: -6, opacity: 1 },
  };

  return (
    <div className="flex items-center justify-center h-full w-full">
      <div className="flex gap-2">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="w-3 h-3 rounded-full bg-blue-500"
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
    </div>
  );
}
