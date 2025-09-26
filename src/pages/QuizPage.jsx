// src/pages/QuizPage.jsx
import { useEffect, useState } from "react";
import {
  HelpCircle,
  ArrowRight,
  RotateCcw,
  Trophy,
  Lightbulb,
  X,
  ArrowLeft,
  CheckCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import OptionButton from "../components/OptionButton"; // 🔹 Reusable Option Button
import {
  GOOGLE_SHEET_CATEGORIES_URL,
  GOOGLE_SHEET_QUESTIONS_URL,
} from "../config.js";

// --- CSV Fetch Helper ---
async function fetchCSV(url) {
  try {
    if (!url) return [];
    const res = await fetch(
      `${url}${url.includes("?") ? "&" : "?"}t=${Date.now()}`
    );
    if (!res.ok) throw new Error(`CSV fetch failed: ${res.status}`);
    const text = await res.text();
    const lines = text.trim().split(/\r?\n/);
    if (lines.length <= 1) return [];
    const headers = lines[0].split(",").map((h) => h.replace(/"/g, "").trim());
    return lines.slice(1).map((line) => {
      const values = line.match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g) || [];
      const row = {};
      headers.forEach((h, i) => {
        row[h] = (values[i] || "").replace(/(^"|"$)/g, "").trim();
      });
      return row;
    });
  } catch (e) {
    console.error("fetchCSV error:", e);
    return [];
  }
}

export default function QuizPage({ setBottomVisible }) {
  const [stage, setStage] = useState("categories");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentCat, setCurrentCat] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState([]);

  const [showHint, setShowHint] = useState(false);

  // Hide BottomNav during quiz
  useEffect(() => {
    if (setBottomVisible) setBottomVisible(stage !== "quiz");
  }, [stage, setBottomVisible]);

  // Load quiz data
  useEffect(() => {
    (async () => {
      try {
        const [cats, qs] = await Promise.all([
          fetchCSV(GOOGLE_SHEET_CATEGORIES_URL),
          fetchCSV(GOOGLE_SHEET_QUESTIONS_URL),
        ]);
        if (cats.length && qs.length) {
          const structured = cats
            .map((cat, i) => ({
              id: cat.categoryId || `cat-${i}`,
              title: cat.name,
              desc: cat.description,
              icon: <HelpCircle size={24} />,
              iconBg: "bg-blue-600",
              questions: qs.filter((q) => q.categoryId === cat.categoryId),
            }))
            .filter((c) => c.questions.length);
          setCategories(structured);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // --- Actions ---
  const startQuiz = (cat) => {
    setCurrentCat(cat);
    setQuestions(cat.questions);
    setIdx(0);
    setAnswers([]);
    setStage("quiz");
  };

  const selectAnswer = (letter) => {
    if (answers[idx]) return;
    const q = questions[idx];
    let explanation = q.Explanation || q.explanation || q.Right || q.Why || "";

    setAnswers((prev) => [
      ...prev,
      {
        selected: letter,
        correct: q.correctAnswer,
        explanation,
        hint: q.hint,
      },
    ]);
  };

  const next = () => {
    if (idx < questions.length - 1) setIdx((v) => v + 1);
    else setStage("results");
  };

  const backToCategories = () => {
    setStage("categories");
    setCurrentCat(null);
    setQuestions([]);
    setAnswers([]);
    setIdx(0);
  };

  // --- UI ---
  if (loading)
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500 dark:text-gray-400">Loading quizzes...</p>
      </div>
    );

  // --- QUIZ STAGE ---
  if (stage === "quiz") {
    const q = questions[idx];
    const userAns = answers[idx];
    const opts = ["A", "B", "C", "D"]
      .map((L) => ({ L, text: q[`option${L}`] }))
      .filter((o) => o.text);

    const progressPercent = ((idx + 1) / questions.length) * 100;

    return (
      <div className="flex flex-col h-full">
        {/* Fixed Top Bar */}
        <div className="sticky top-0 z-40 bg-white dark:bg-black">
          <div className="flex items-center gap-3 px-4 py-3 border-b dark:border-gray-700">
            <button onClick={backToCategories} className="p-2">
              <ArrowLeft size={20} />
            </button>
            <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                className="h-2 bg-teal-500"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </div>
            <span className="ml-3 text-sm text-gray-500 dark:text-gray-400">
              {idx + 1}/{questions.length}
            </span>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
          {/* Question */}
          <AnimatePresence mode="wait">
            <motion.div
              key={q.questionId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="p-6 rounded-2xl shadow-md border
                         bg-gradient-to-br from-indigo-50 to-pink-50
                         dark:from-gray-900 dark:to-gray-800"
            >
              <p className="text-lg font-semibold leading-relaxed text-gray-800 dark:text-gray-200">
                {q.questionText}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Options */}
          <div className="space-y-3">
            {opts.map((o) => {
              const isCorrect = userAns && o.L === userAns.correct;
              const isSelected = userAns && o.L === userAns.selected;

              return (
                <OptionButton
                  key={o.L}
                  label={o.L}
                  text={o.text}
                  isCorrect={isCorrect}
                  isSelected={isSelected}
                  disabled={!!userAns}
                  onSelect={() => selectAnswer(o.L)}
                />
              );
            })}
          </div>

          {/* Hint link */}
          {q.hint && !userAns && (
            <button
              onClick={() => setShowHint(true)}
              className="mt-4 flex items-center gap-2 text-sm text-blue-600 dark:text-teal-400"
            >
              <Lightbulb size={16} /> Show Hint
            </button>
          )}
        </div>

        {/* Bottom Sheet Feedback */}
        <AnimatePresence>
          {userAns && (
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 250, damping: 25 }}
              className="fixed bottom-0 left-0 right-0 z-50 
                         bg-white dark:bg-gray-900 shadow-lg rounded-t-2xl
                         p-6 pb-[calc(20px+env(safe-area-inset-bottom))]"
            >
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle className="text-green-500" size={20} />
                <h3 className="font-semibold text-green-600 dark:text-green-400">
                  Correct Answer
                </h3>
              </div>

              {userAns.explanation && (
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {userAns.explanation}
                </p>
              )}

              <button
                onClick={next}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 
                           text-white font-semibold text-lg shadow-lg shadow-teal-500/30
                           flex items-center justify-center gap-2 active:scale-95 transition"
              >
                {idx === questions.length - 1 ? "Finish" : "Next"}
                <ArrowRight size={20} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hint Modal */}
        <AnimatePresence>
          {showHint && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-end z-50"
              onClick={() => setShowHint(false)}
            >
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", stiffness: 250, damping: 25 }}
                drag="y"
                dragConstraints={{ top: 0, bottom: 0 }}
                onDragEnd={(_, info) => {
                  if (info.offset.y > 100) setShowHint(false);
                }}
                className="w-full max-w-md bg-white dark:bg-gray-900 rounded-t-2xl p-6"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="w-12 h-1.5 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto mb-4" />
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Lightbulb size={18} /> Hint
                  </h3>
                  <button
                    onClick={() => setShowHint(false)}
                    className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  >
                    <X size={20} />
                  </button>
                </div>
                <p className="text-gray-700 dark:text-gray-300">{q.hint}</p>
                <p className="mt-4 text-xs text-center text-gray-400">
                  Swipe down to close
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // --- RESULTS ---
  if (stage === "results") {
    const score = answers.filter((a) => a.selected === a.correct).length;
    return (
      <div className="flex flex-col items-center justify-center h-full px-6 text-center space-y-6">
        <Trophy size={48} className="text-yellow-500" />
        <h2 className="text-xl font-bold">Your Score</h2>
        <p className="text-lg">
          {score} / {questions.length}
        </p>
        <button
          onClick={backToCategories}
          className="w-full py-3 rounded-lg bg-gradient-to-r from-teal-500 to-emerald-500 text-white mt-6 flex items-center justify-center gap-2"
        >
          <RotateCcw size={18} /> Back to Categories
        </button>
      </div>
    );
  }

  // --- CATEGORIES ---
  return (
    <div className="px-4 py-8 space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-extrabold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          📝 Quiz Categories
        </h1>
        <p className="mt-1 text-gray-600 dark:text-gray-400 text-sm">
          Pick a level and start testing your knowledge
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        {categories.map((c, i) => {
          const gradients = [
            "from-indigo-50 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/10",
            "from-teal-50 to-emerald-100 dark:from-teal-900/30 dark:to-emerald-900/10",
            "from-amber-50 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/10",
            "from-pink-50 to-rose-100 dark:from-pink-900/30 dark:to-rose-900/10",
            "from-blue-50 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/10",
          ];
          const gradient = gradients[i % gradients.length];

          return (
            <motion.button
              key={c.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => startQuiz(c)}
              className={`relative flex items-center gap-3 p-4 rounded-xl border shadow-sm
                bg-gradient-to-br ${gradient} hover:shadow-md transition-all`}
            >
              {/* Icon */}
              <div className={`p-2 rounded-lg ${c.iconBg} text-white`}>
                {c.icon}
              </div>

              {/* Title + description */}
              <div className="flex flex-col flex-1">
                <span className="font-semibold text-base">{c.title}</span>
                <span className="text-xs text-gray-600 dark:text-gray-300 truncate">
                  {c.desc || "Challenge yourself!"}
                </span>
              </div>

              {/* Question count */}
              {c.questions?.length > 0 && (
                <span className="text-xs font-semibold bg-green-500 text-white px-2 py-0.5 rounded-full">
                  {c.questions.length} Qs
                </span>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
