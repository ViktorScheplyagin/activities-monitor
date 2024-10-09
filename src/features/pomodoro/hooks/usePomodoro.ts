import { useState, useEffect, useCallback } from "react";
import { TIMER_OPTIONS } from "@/shared/constants/timerOptions";

type TimerMode = "work" | "break";

export const usePomodoro = () => {
  const [mode, setMode] = useState<TimerMode>("work");
  const [timeLeft, setTimeLeft] = useState(TIMER_OPTIONS.work[0].value);
  const [isActive, setIsActive] = useState(false);
  const [workDuration, setWorkDuration] = useState(TIMER_OPTIONS.work[0].value);
  const [breakDuration, setBreakDuration] = useState(
    TIMER_OPTIONS.break[0].value
  );

  useEffect(() => {
    const timeWorker = new Worker(
      new URL("@/features/pomodoro/workers/timeWorker.ts", import.meta.url)
    );
    timeWorker.onmessage = () => {
      setTimeLeft((prev) => Math.max(prev - 1, 0));
    };

    if (isActive && timeLeft > 0) {
      timeWorker.postMessage({ command: "start", interval: 1000 });
    } else if (timeLeft === 0) {
      setMode((prevMode) => (prevMode === "work" ? "break" : "work"));
      setTimeLeft(mode === "work" ? breakDuration : workDuration);
    }

    return () => {
      timeWorker.postMessage({ command: "stop" });
      timeWorker.terminate();
    };
  }, [isActive, timeLeft, mode, workDuration, breakDuration]);

  const toggleTimer = useCallback(() => {
    setIsActive((prev) => !prev);
  }, []);

  const resetTimer = useCallback(() => {
    setIsActive(false);
    setMode("work");
    setTimeLeft(workDuration);
  }, [workDuration]);

  const changeWorkDuration = useCallback(
    (duration: number) => {
      setWorkDuration(duration);
      if (mode === "work") {
        setTimeLeft(duration);
        setIsActive(false);
      }
    },
    [mode]
  );

  const changeBreakDuration = useCallback(
    (duration: number) => {
      setBreakDuration(duration);
      if (mode === "break") {
        setTimeLeft(duration);
        setIsActive(false);
      }
    },
    [mode]
  );

  return {
    mode,
    timeLeft,
    isActive,
    toggleTimer,
    resetTimer,
    changeWorkDuration,
    changeBreakDuration,
  };
};
