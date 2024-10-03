import React from "react";
import { Button } from "@/shared/components/Button";
import { TIMER_OPTIONS } from "@/shared/constants/timerOptions";

interface ControlsProps {
  isActive: boolean;
  toggleTimer: () => void;
  resetTimer: () => void;
  changeWorkDuration: (duration: number) => void;
  changeBreakDuration: (duration: number) => void;
}

export const Controls: React.FC<ControlsProps> = ({
  isActive,
  toggleTimer,
  resetTimer,
  changeWorkDuration,
  changeBreakDuration,
}) => {
  return (
    <div className="mt-8 space-y-4">
      <div className="flex justify-center space-x-4">
        <Button onClick={toggleTimer}>{isActive ? "Pause" : "Start"}</Button>
        <Button onClick={resetTimer}>Reset</Button>
      </div>
      <div className="flex justify-center space-x-4">
        <select
          className="p-2 rounded"
          onChange={(e) => changeWorkDuration(Number(e.target.value))}
        >
          {TIMER_OPTIONS.work.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <select
          className="p-2 rounded"
          onChange={(e) => changeBreakDuration(Number(e.target.value))}
        >
          {TIMER_OPTIONS.break.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
