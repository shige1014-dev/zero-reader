"use client";

import { useEffect, useState } from "react";

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const nextProgress =
        scrollHeight <= 0 ? 0 : Math.min((scrollTop / scrollHeight) * 100, 100);

      setProgress(nextProgress);
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return (
    <div className="fixed left-0 right-0 top-0 z-50 h-[2px] bg-transparent">
      <div
        className="h-full bg-accent transition-[width] duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
