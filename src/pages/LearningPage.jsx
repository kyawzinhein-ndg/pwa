// src/pages/LearningPage.jsx
import { BookOpen, PlayCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function LearningPage() {
  const lessons = [
    {
      title: "Basic Phone Repair",
      desc: "Step-by-step guide for beginners.",
      icon: <BookOpen size={24} />,
      bg: "from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-900/10",
      iconBg: "bg-blue-600",
    },
    {
      title: "Understanding Circuits",
      desc: "Learn about resistors, capacitors & ICs.",
      icon: <BookOpen size={24} />,
      bg: "from-indigo-50 to-indigo-100 dark:from-indigo-900/30 dark:to-indigo-900/10",
      iconBg: "bg-indigo-600",
    },
    {
      title: "Practical Training (Video)",
      desc: "Hands-on tutorials with video support.",
      icon: <PlayCircle size={24} />,
      bg: "from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-900/10",
      iconBg: "bg-purple-600",
    },
  ];

  return (
    <div className="px-4 py-8 space-y-6">
      <h1 className="text-2xl font-bold">📘 Learning</h1>
      <p className="text-gray-500 dark:text-gray-400">
        Step-by-step tutorials to help you learn mobile phone repair.
      </p>

      <div className="space-y-4 mt-6">
        {lessons.map((lesson, idx) => (
          <motion.div
            key={idx}
            whileTap={{ scale: 0.98 }}
            className={`w-full flex items-center gap-4 p-5 rounded-xl border shadow-md
                        bg-gradient-to-r ${lesson.bg} hover:shadow-lg transition text-left`}
          >
            <div className={`p-3 rounded-lg ${lesson.iconBg} text-white`}>
              {lesson.icon}
            </div>
            <div className="flex flex-col items-start">
              <span className="font-semibold text-lg">{lesson.title}</span>
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {lesson.desc}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
