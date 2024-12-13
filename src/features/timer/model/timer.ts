import { useEffect } from "react";
import { useTimerStore } from "./store";

export const useTimerLogicSetup = () => {
  const setTimeLeft = useTimerStore((state) => state.setTimeLeft);
  const setMode = useTimerStore((state) => state.setMode);
  const incrementSession = useTimerStore((state) => state.incrementSession);
  const mode = useTimerStore((state) => state.mode);
  const isRunning = useTimerStore((state) => state.isRunning);
  const timeLeft = useTimerStore((state) => state.timeLeft);
  const workDuration = useTimerStore((state) => state.workDuration);
  const breakDuration = useTimerStore((state) => state.breakDuration);
  const longBreakDuration = useTimerStore((state) => state.longBreakDuration);
  const sessionsCount = useTimerStore((state) => state.sessionsCount);

  const handleModeTransition = () => {
    console.log("handleModeTransition", mode, sessionsCount);
    switch (mode) {
      case "work":
        if (sessionsCount % 4 === 0 && sessionsCount > 0) {
          setMode("longBreak");
          setTimeLeft(longBreakDuration);
        } else {
          setMode("break");
          setTimeLeft(breakDuration);
        }
        break;
      case "break":
      case "longBreak":
        setMode("work");
        setTimeLeft(workDuration);
        break;
    }
  };

  useEffect(() => {
    const timeWorker = new Worker(
      new URL("../workers/timeWorker.ts", import.meta.url)
    );

    timeWorker.onmessage = () => {
      setTimeLeft(timeLeft - 1);
    };

    if (isRunning && timeLeft > 0) {
      timeWorker.postMessage({ command: "start", interval: 1000 });
    } else if (timeLeft === 0) {
      handleModeTransition();
      if (mode === "work") {
        incrementSession();
      }
    }

    return () => {
      timeWorker.postMessage({ command: "stop" });
      timeWorker.terminate();
    };
  }, [isRunning, timeLeft, mode, workDuration, breakDuration]);
};
