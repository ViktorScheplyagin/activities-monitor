import { useEffect } from "react";
import { useStore } from "./store";

export const useTimerWorkerSetup = () => {
  const mode = useStore((state) => state.mode);
  const isRunning = useStore((state) => state.isRunning);
  const timeLeft = useStore((state) => state.timeLeft);
  const workDuration = useStore((state) => state.workDuration);
  const breakDuration = useStore((state) => state.breakDuration);
  const setMode = useStore((state) => state.setMode);
  const setTimeLeft = useStore((state) => state.setTimeLeft);

  useEffect(() => {
    const timeWorker = new Worker(
      new URL("@/features/timer/workers/timeWorker.ts", import.meta.url)
    );

    timeWorker.onmessage = () => {
      setTimeLeft(timeLeft - 1);
    };

    if (isRunning && timeLeft > 0) {
      timeWorker.postMessage({ command: "start", interval: 1000 });
    } else if (timeLeft === 0) {
      setMode(mode === "work" ? "break" : "work");
      setTimeLeft(mode === "work" ? breakDuration : workDuration);
    }

    return () => {
      timeWorker.postMessage({ command: "stop" });
      timeWorker.terminate();
    };
  }, [isRunning, timeLeft, mode, workDuration, breakDuration]);
};
