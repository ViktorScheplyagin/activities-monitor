import React from "react";
import { Button, Select } from "@/shared/ui";
import { TIMER_OPTIONS } from "../constants/timerOptions";

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
        <Select
          options={TIMER_OPTIONS.work}
          onChange={(value) => changeWorkDuration(value)}
        />
        <Select
          options={TIMER_OPTIONS.break}
          onChange={(value) => changeBreakDuration(value)}
        />
      </div>
    </div>
  );
};
