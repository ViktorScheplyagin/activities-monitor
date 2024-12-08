import React from "react";
import { Button, Select } from "@/shared/ui";
import { TIMER_OPTIONS } from "../constants/timerOptions";

export interface ControlsProps {
  isTimerRunning: boolean;
  toggleTimer: () => void;
  resetTimer: () => void;
  changeWorkDuration: (duration: number) => void;
  changeBreakDuration: (duration: number) => void;
}

export const Controls: React.FC<ControlsProps> = ({
  isTimerRunning,
  toggleTimer,
  resetTimer,
  changeWorkDuration,
  changeBreakDuration,
}) => {
  return (
    <div className="mt-8 space-y-4">
      <div className="flex justify-center gap-4">
        <Button onClick={toggleTimer}>
          {isTimerRunning ? "Pause" : "Start"}
        </Button>
        <Button onClick={resetTimer}>Reset</Button>
      </div>
      <div className="flex justify-center gap-4">
        <Select
          data-testid="work"
          options={TIMER_OPTIONS.work}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            changeWorkDuration(Number(e.currentTarget.value));
          }}
        />
        <Select
          data-testid="break"
          options={TIMER_OPTIONS.break}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            changeBreakDuration(Number(e.target.value));
          }}
        />
      </div>
    </div>
  );
};
