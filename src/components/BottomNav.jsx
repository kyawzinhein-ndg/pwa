import { Home, BookOpen, Phone, Settings } from "lucide-react"; // 🔹 replaced User with Settings
import { motion } from "framer-motion";

export default function BottomNav({ page, setPage, onProfile }) {
  const tabs = [
    { id: "home", icon: Home, label: "Home" },
    { id: "contact", icon: Phone, label: "Contacts" },
    { id: "education", icon: BookOpen, label: "Education" },
    { id: "profile", icon: Settings, label: "Settings", onClick: onProfile }, // 🔹 updated here
  ];

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40
                 bg-white/95 dark:bg-black/95 backdrop-blur-md
                 border-t border-gray-200 dark:border-gray-800
                 pb-[env(safe-area-inset-bottom)]"
    >
      <nav className="flex items-center justify-around h-14">
        {tabs.map((t) => {
          const Icon = t.icon;
          const isActive = page === t.id;

          return (
            <button
              key={t.id}
              onClick={() => (t.onClick ? t.onClick() : setPage(t.id))}
              className="relative flex flex-col items-center justify-center flex-1 h-full"
            >
              {/* Icon */}
              <Icon
                size={22}
                className={`${
                  isActive
                    ? "text-blue-500 dark:text-teal-400"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              />

              {/* Label */}
              <span
                className={`text-xs mt-1 ${
                  isActive
                    ? "text-blue-500 dark:text-teal-400 font-medium"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              >
                {t.label}
              </span>

              {/* Active underline */}
              {isActive && (
                <motion.div
                  layoutId="nav-underline"
                  className="absolute bottom-0 w-8 h-[2px] bg-blue-500 dark:bg-teal-400 rounded-full"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
