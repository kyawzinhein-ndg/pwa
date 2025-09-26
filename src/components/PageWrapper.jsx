// src/components/PageWrapper.jsx
import React from "react";

export default function PageWrapper({ children, noPadding = false }) {
  return (
    <div
      className={`
        min-h-screen
        bg-white dark:bg-black
        text-black dark:text-white
        ${noPadding ? "" : "pt-14 pb-16 px-4"}
      `}
    >
      {children}
    </div>
  );
}
