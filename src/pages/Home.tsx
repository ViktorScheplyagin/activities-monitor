"use client";
import { Timer, Controls, usePomodoro } from "@/features/pomodoro";
import { Theme, ThemeContext } from "@/features/theme/api/themeContext";
import { Header } from "@/widgets/Header";
import { useEffect, useState } from "react";

export const HomePage: React.FC = () => {
  const {
    mode,
    timeLeft,
    isActive,
    toggleTimer,
    resetTimer,
    changeWorkDuration,
    changeBreakDuration,
  } = usePomodoro();
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="bg-white p-8 rounded-lg shadow-md dark:bg-gray-800">
          <Header />
          <h1 className="text-3xl font-bold mb-6 text-center dark:text-gray-400">
            Pomodoro Timer
          </h1>
          <Timer timeLeft={timeLeft} mode={mode} />
          <Controls
            isActive={isActive}
            toggleTimer={toggleTimer}
            resetTimer={resetTimer}
            changeWorkDuration={changeWorkDuration}
            changeBreakDuration={changeBreakDuration}
          />
        </div>
      </div>
    </ThemeContext.Provider>
  );
};
