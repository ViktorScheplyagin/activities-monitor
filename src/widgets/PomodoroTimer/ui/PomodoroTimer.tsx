"use client";
import { useTimer, Timer, Controls } from "@/features/timer";
import {
  requestNotificationPermission,
  showNotification,
} from "@/features/notification";
import { Card } from "@/shared/ui";
import { useEffect } from "react";

export const PomodoroTimer = () => {
  const timer = useTimer();

  useEffect(() => {
    requestNotificationPermission();
  }, []);

  useEffect(() => {
    showNotification("Pomodoro завершён!");
  }, [timer.mode]);

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
