// tailwind.config.js
module.exports = {
  darkMode: "class", // enable dark mode via .dark class
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // 🌐 Brand Primary (Blue in light mode, Teal in dark mode)
        primary: {
          DEFAULT: "#3B82F6", // blue-500
          light: "#60A5FA",   // blue-400
          dark: "#2DD4BF",    // teal-400 (used in dark mode)
        },

        // 🌐 Accent (for hover states or highlights)
        accent: {
          light: "#2563EB",   // blue-600
          dark: "#14B8A6",    // teal-500
        },

        // 🌐 Backgrounds
        background: {
          light: "#F8F9FA",   // light bg
          dark: "#111827",    // dark bg
        },

        // 🌐 Separators (borders, dividers)
        separator: {
          light: "#E5E7EB",
          dark: "#374151",
        },

        // Extra palette if you need exact mapping
        customBlue: {
          50: "#EFF6FF",
          100: "#DBEAFE",
          400: "#60A5FA",
          500: "#3B82F6",
          600: "#2563EB",
        },
        customTeal: {
          300: "#5EEAD4",
          400: "#2DD4BF",
          500: "#14B8A6",
          600: "#0D9488",
        },
        customDark: {
          500: "#374151",
          700: "#1F2937",
          800: "#161E29",
          900: "#111827",
        },
      },
    },
  },
  plugins: [],
};
