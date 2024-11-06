import { useEffect } from "react";
import { useStore } from "./store";

export type TimerMode = "work" | "break";

export const useTimer = () => {
  const {
    mode,
    isRunning,
    timeLeft,
    workDuration,
    breakDuration,
    setMode,
    setTimeLeft,
    toggleTimer,
    resetTimer,
    changeWorkDuration,
    changeBreakDuration,
  } = useStore();

  useEffect(() => {
    const timeWorker = new Worker(
      new URL("@/features/timer/workers/timeWorker.ts", import.meta.url)
    );

    timeWorker.onmessage = () => {
      setTimeLeft((prev) => Math.max(prev - 1, 0));
    };

    if (isRunning && timeLeft > 0) {
      timeWorker.postMessage({ command: "start", interval: 1000 });
    } else if (timeLeft === 0) {
      setMode((prevMode) => (prevMode === "work" ? "break" : "work"));
      setTimeLeft(mode === "work" ? breakDuration : workDuration);
    }

    return () => {
      timeWorker.postMessage({ command: "stop" });
      timeWorker.terminate();
    };
  }, [isRunning, timeLeft, mode, workDuration, breakDuration]);

  return {
    mode,
    timeLeft,
    isRunning,
    toggle: toggleTimer,
    reset: resetTimer,
    changeWorkDuration,
    changeBreakDuration,
  };
};
