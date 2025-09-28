// src/components/AZSidebar.jsx
import { useState, useRef, useEffect } from "react";

export default function AZSidebar({
  letters,
  scrollLetter,
  onScrollToLetter,
  railRightCSS,
  railBoxStyle,
  disabled,
}) {
  const [activeLetter, setActiveLetter] = useState(null);
  const railRef = useRef(null);
  const isTouching = useRef(false);

  const selectLetter = (letter) => {
    if (!letter) return;
    onScrollToLetter(letter);
    setActiveLetter(letter);
  };

  const handleTouchMove = (e) => {
    if (!isTouching.current || !railRef.current) return;
    const touch = e.touches[0];
    const railBox = railRef.current.getBoundingClientRect();
    const y = touch.clientY - railBox.top;
    const index = Math.floor((y / railBox.height) * letters.length);
    if (index >= 0 && index < letters.length) {
      selectLetter(letters[index]);
    }
  };

  const endTouch = () => {
    isTouching.current = false;
    setActiveLetter(null);
  };

  useEffect(() => {
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", endTouch);
    window.addEventListener("mouseup", endTouch);
    return () => {
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", endTouch);
      window.removeEventListener("mouseup", endTouch);
    };
  }, [letters]);

  if (!letters?.length || disabled) return null;

  return (
    <>
      {/* Right rail */}
      <div
        ref={railRef}
        className="absolute z-50 flex flex-col items-center select-none pointer-events-auto"
        style={{
          right: railRightCSS,
          top: railBoxStyle.top,
          bottom: railBoxStyle.bottom,
        }}
      >
        <div className="flex flex-col gap-1 text-[11px] font-medium text-gray-400 dark:text-gray-500">
          {letters.map((letter) => {
            const isActive = scrollLetter === letter;
            return (
              <button
                key={letter}
                className={`w-5 h-5 flex items-center justify-center rounded 
                  ${
                    isActive
                      ? "bg-blue-500 text-white"
                      : "hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                onClick={() => selectLetter(letter)}
                onTouchStart={() => {
                  isTouching.current = true;
                  selectLetter(letter);
                }}
                onMouseDown={() => {
                  isTouching.current = true;
                  selectLetter(letter);
                }}
              >
                {letter}
              </button>
            );
          })}
        </div>
      </div>

      {/* Center overlay bubble */}
      {activeLetter && (
        <div className="fixed inset-0 z-40 flex items-center justify-center pointer-events-none">
          <div className="w-20 h-20 rounded-full bg-blue-600 text-white flex items-center justify-center text-4xl font-bold shadow-2xl">
            {activeLetter}
          </div>
        </div>
      )}
    </>
  );
}
