import { useState } from "react";
import { TIMER_OPTIONS } from "../constants/timerOptions";
import { TimerMode } from "./timer";

export const useStore = () => {
  const [mode, setMode] = useState<TimerMode>("work");
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TIMER_OPTIONS.work[0].value);
  const [workDuration, setWorkDuration] = useState(TIMER_OPTIONS.work[0].value);
  const [breakDuration, setBreakDuration] = useState(
    TIMER_OPTIONS.break[0].value
  );

  const toggleTimer = () => {
    setIsRunning((prev) => !prev);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setMode("work");
    setTimeLeft(workDuration);
  };

  const changeWorkDuration = (duration: number) => {
    setWorkDuration(duration);
    if (mode === "work") {
      setTimeLeft(duration);
      setIsRunning(false);
    }
  };

  const changeBreakDuration = (duration: number) => {
    setBreakDuration(duration);
    if (mode === "break") {
      setTimeLeft(duration);
      setIsRunning(false);
    }
  };

  return {
    mode,
    isRunning,
    timeLeft,
    workDuration,
    breakDuration,
    setMode,
    setIsRunning,
    setTimeLeft,
    changeWorkDuration,
    changeBreakDuration,
    toggleTimer,
    resetTimer,
  };
};
