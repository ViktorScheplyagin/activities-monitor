"use client";
import { useEffect, useState } from "react";
import { Timer, Controls, useTimer } from "@/features/timer";
import { Theme, ThemeContext } from "@/features/theme/model/themeContext";
import { Header } from "@/widgets/Header";
import { Card } from "@/shared/ui";

export const HomePage: React.FC = () => {
  const timer = useTimer();

  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <Header />
        <Card>
          <h1 className="text-3xl font-bold mb-6 text-center dark:text-gray-400">
            Pomodoro Timer
          </h1>

          <Timer timeLeft={timer.timeLeft} mode={timer.mode} />
          <Controls
            isActive={timer.isRunning}
            toggleTimer={timer.toggle}
            resetTimer={timer.reset}
            changeWorkDuration={timer.changeWorkDuration}
            changeBreakDuration={timer.changeBreakDuration}
          />
        </Card>
      </div>
    </ThemeContext.Provider>
  );
};
