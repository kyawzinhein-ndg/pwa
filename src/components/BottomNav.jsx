import React from "react";
import { Home, BookOpen, Users, Menu } from "lucide-react";

export default function BottomNav({ current, onChange }) {
  const items = [
    { id: "home", label: "Home", icon: <Home size={20} /> },
    { id: "contact", label: "Contacts", icon: <Users size={20} /> },
    { id: "education", label: "Education", icon: <BookOpen size={20} /> },
    { id: "menu", label: "Menu", icon: <Menu size={20} /> }, // ✅ New tab
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-black border-t border-gray-200 dark:border-gray-700 flex justify-around h-14 items-center">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => onChange(item.id)}
          className={`flex flex-col items-center justify-center flex-1 ${
            current === item.id ? "text-blue-500" : "text-gray-500"
          }`}
        >
          {item.icon}
          <span className="text-[11px]">{item.label}</span>
        </button>
      ))}
    </nav>
  );
}
