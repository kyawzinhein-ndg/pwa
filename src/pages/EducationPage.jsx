export default function EducationPage() {
  const lessons = [
    { step: 1, title: "Basics of Phone Repair", desc: "Understand tools and safety" },
    { step: 2, title: "Disassembly", desc: "Learn how to open phones safely" },
    { step: 3, title: "Common Issues", desc: "Battery, charging, and screen problems" },
    { step: 4, title: "Advanced Repairs", desc: "Board-level troubleshooting" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">📘 Education</h1>
      <ul className="space-y-3">
        {lessons.map((lesson) => (
          <li
            key={lesson.step}
            className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            <h2 className="font-semibold">
              {lesson.step}. {lesson.title}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {lesson.desc}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
