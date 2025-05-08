import React from "react";
import { Button } from "@/shared/ui/neomorphic";
import { useTimerStore } from "../model/store";

interface ControlsProps {
    disabled?: boolean;
}

export const Controls: React.FC<ControlsProps> = ({ disabled = false }) => {
    const isRunning = useTimerStore((state) => state.isRunning);
    const setIsRunning = useTimerStore((state) => state.setIsRunning);
    const resetTimer = useTimerStore((state) => state.resetTimer);
    const skipTimer = useTimerStore((state) => state.skipTimer);

    return (
        <div className="w-full flex justify-center gap-4">
            <Button
                onClick={() => setIsRunning(!isRunning)}
                disabled={disabled}
            >
                {isRunning ? "Pause" : "Start"}
            </Button>
            <Button onClick={resetTimer} disabled={disabled}>
                Reset
            </Button>
            <Button onClick={skipTimer} disabled={disabled}>
                Skip
            </Button>
        </div>
    );
};
