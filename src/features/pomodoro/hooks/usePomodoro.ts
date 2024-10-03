import { useState, useEffect, useCallback } from "react";
import { TIMER_OPTIONS } from "@/shared/constants/timerOptions";

type TimerMode = "work" | "break";

export const usePomodoro = () => {
  const [mode, setMode] = useState<TimerMode>("work");
  const [timeLeft, setTimeLeft] = useState(TIMER_OPTIONS.work[0].value);
  const [isActive, setIsActive] = useState(false);
  const [selectedWork, setSelectedWork] = useState(TIMER_OPTIONS.work[0].value);
  const [selectedBreak, setSelectedBreak] = useState(
    TIMER_OPTIONS.break[0].value
  );

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setMode((prevMode) => (prevMode === "work" ? "break" : "work"));
      setTimeLeft(mode === "work" ? selectedBreak : selectedWork);
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft, mode, selectedWork, selectedBreak]);

  const toggleTimer = useCallback(() => {
    setIsActive((prev) => !prev);
  }, []);

  const resetTimer = useCallback(() => {
    setIsActive(false);
    setMode("work");
    setTimeLeft(selectedWork);
  }, [selectedWork]);

  const changeWorkDuration = useCallback(
    (duration: number) => {
      setSelectedWork(duration);
      if (mode === "work") {
        setTimeLeft(duration);
        setIsActive(false);
      }
    },
    [mode]
  );

  const changeBreakDuration = useCallback(
    (duration: number) => {
      setSelectedBreak(duration);
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
