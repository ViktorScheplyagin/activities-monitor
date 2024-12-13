import { useTimerStore } from "@/features/timer/@x/time-accumulator";
import { useTimeAccumulatorStore } from "../model/store";
import { formatSeconds } from "@/entities/task";
import { useEffect } from "react";

interface Props {
  taskId: string;
  initialTime?: number;
}

export const TimeAccumulator = ({ taskId, initialTime = 0 }: Props) => {
  const timeLeft = useTimerStore((state) => state.timeLeft);
  const mode = useTimerStore((state) => state.mode);
  const workDuration = useTimerStore((state) => state.workDuration);
  const totalTime = useTimeAccumulatorStore((state) => state.totalTime);
  const setTotalTime = useTimeAccumulatorStore((state) => state.setTotalTime);
  const updateAccumulatedTime = useTimeAccumulatorStore(
    (state) => state.updateAccumulatedTime
  );

  useEffect(() => {
    setTotalTime(initialTime);
  }, [initialTime]);

  useEffect(() => {
    if (timeLeft === 0 && mode === "work") {
      updateAccumulatedTime(taskId, totalTime + workDuration);
    }
  }, [timeLeft, mode]);

  return (
    <div className="text-center text-gray-500">
      Total time: {formatSeconds(totalTime)}
    </div>
  );
};
