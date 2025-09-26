import React from "react";

export default function PageWrapper({ children }) {
  return (
    <div
      className="
        pt-14   /* push below navbar (fixed top, h-14 = 56px) */
        pb-16   /* push above bottom nav */
        px-4
        min-h-screen
        bg-white dark:bg-black
        text-black dark:text-white
      "
    >
      {children}
    </div>
  );
}
