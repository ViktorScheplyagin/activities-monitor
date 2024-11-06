"use client";
import { useTimer, Timer, Controls } from "@/features/timer";
import { Card } from "@/shared/ui";

export const PomodoroTimer = () => {
  const timer = useTimer();

  return (
    <Card>
      <h1 className="text-3xl font-bold mb-6 text-center dark:text-gray-400">
        Pomodoro Timer
      </h1>
      <div className="text-6xl font-bold text-center">
        <Timer timeLeft={timer.timeLeft} mode={timer.mode} />
        <div className="text-2xl mt-2 dark:text-gray-400">
          {timer.mode === "work" ? "Work" : "Break"}
        </div>
      </div>
      <Controls
        isTimerRunning={timer.isRunning}
        toggleTimer={timer.toggle}
        resetTimer={timer.reset}
        changeWorkDuration={timer.changeWorkDuration}
        changeBreakDuration={timer.changeBreakDuration}
      />
    </Card>
  );
};
