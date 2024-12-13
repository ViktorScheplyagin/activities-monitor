import React from "react";
import { Button } from "@/shared/ui";
import { Select } from "./Select";
import { TIMER_OPTIONS } from "../constants/timerOptions";
import { useTimerStore } from "../model/store";

export const Controls: React.FC = () => {
  const workDuration = useTimerStore((state) => state.workDuration);
  const breakDuration = useTimerStore((state) => state.breakDuration);
  const longBreakDuration = useTimerStore((state) => state.longBreakDuration);
  const isRunning = useTimerStore((state) => state.isRunning);
  const setIsRunning = useTimerStore((state) => state.setIsRunning);
  const setWorkDuration = useTimerStore((state) => state.setWorkDuration);
  const setTimeLeft = useTimerStore((state) => state.setTimeLeft);
  const setBreakDuration = useTimerStore((state) => state.setBreakDuration);
  const setLongBreakDuration = useTimerStore(
    (state) => state.setLongBreakDuration
  );
  const resetTimer = useTimerStore((state) => state.resetTimer);

  const handleWorkDurationChange = (value: string) => {
    setWorkDuration(Number(value));
    setTimeLeft(Number(value));
  };

  const handleBreakDurationChange = (value: string) => {
    setBreakDuration(Number(value));
    setTimeLeft(Number(value));
  };

  const handleLongBreakDurationChange = (value: string) => {
    setLongBreakDuration(Number(value));
    setTimeLeft(Number(value));
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <Select
        testId="work-duration"
        options={TIMER_OPTIONS.work}
        value={workDuration}
        onChange={handleWorkDurationChange}
        placeholder="Work duration"
        className="w-40 mx-auto"
        label="Work duration"
      />
      <div className="flex justify-center gap-4">
        <Button onClick={() => setIsRunning(!isRunning)}>
          {isRunning ? "Pause" : "Start"}
        </Button>
        <Button onClick={resetTimer}>Reset</Button>
      </div>
      <div className="flex justify-center gap-4">
        <Select
          testId="break-duration"
          options={TIMER_OPTIONS.break}
          value={breakDuration}
          onChange={handleBreakDurationChange}
          placeholder="Break duration"
          label="Break duration"
          className="w-40"
        />
        <Select
          testId="long-break-duration"
          options={TIMER_OPTIONS.longBreak}
          value={longBreakDuration}
          onChange={handleLongBreakDurationChange}
          placeholder="Long break duration"
          label="Long break duration"
          className="w-40"
        />
      </div>
    </div>
  );
};
