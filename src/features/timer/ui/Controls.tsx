import React from "react";
import { Button } from "@/shared/ui";
import { Select } from "./Select";
import { TIMER_OPTIONS } from "../constants/timerOptions";
import { useStore } from "../model/store";

export const Controls: React.FC = () => {
  const workDuration = useStore((state) => state.workDuration);
  const breakDuration = useStore((state) => state.breakDuration);
  const isRunning = useStore((state) => state.isRunning);
  const toggleTimer = useStore((state) => state.toggleTimer);
  const resetTimer = useStore((state) => state.resetTimer);
  const changeWorkDuration = useStore((state) => state.changeWorkDuration);
  const changeBreakDuration = useStore((state) => state.changeBreakDuration);

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex justify-center gap-4">
        <Button onClick={toggleTimer}>{isRunning ? "Pause" : "Start"}</Button>
        <Button onClick={resetTimer}>Reset</Button>
      </div>
      <div className="flex justify-center gap-4">
        <Select
          testId="work"
          options={TIMER_OPTIONS.work}
          value={String(workDuration)}
          onChange={(value) => {
            changeWorkDuration(Number(value));
          }}
        />
        <Select
          testId="break"
          options={TIMER_OPTIONS.break}
          value={String(breakDuration)}
          onChange={(value) => {
            changeBreakDuration(Number(value));
          }}
        />
      </div>
    </div>
  );
};
