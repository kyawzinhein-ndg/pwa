// src/pages/EducationPage.jsx
import { BookOpen, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function EducationPage({ setPage }) {
  const blocks = [
    {
      id: "learning",
      title: "Learning",
      desc: "Step-by-step tutorials with text & video.",
      icon: <BookOpen size={28} />,
      bg: "from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-900/10",
      iconBg: "bg-blue-600",
    },
    {
      id: "quiz",
      title: "Quiz",
      desc: "Test your repair knowledge with fun quizzes.",
      icon: <HelpCircle size={28} />,
      bg: "from-teal-50 to-teal-100 dark:from-teal-900/30 dark:to-teal-900/10",
      iconBg: "bg-teal-600",
    },
  ];

  return (
    <div className="px-4 py-8 space-y-6">
      <h1 className="text-2xl font-bold">🎓 Education</h1>
      <p className="text-gray-500 dark:text-gray-400">
        Learn step-by-step phone repair or test your knowledge with quizzes.
      </p>

      <div className="space-y-4 mt-6">
        {blocks.map((item) => (
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
