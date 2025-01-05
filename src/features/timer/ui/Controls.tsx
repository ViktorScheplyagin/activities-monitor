import React from "react";
import { Button } from "@/shared/ui/neomorphic";
import { useTimerStore } from "../model/store";

export const Controls: React.FC = () => {
    const isRunning = useTimerStore((state) => state.isRunning);
    const setIsRunning = useTimerStore((state) => state.setIsRunning);
    const resetTimer = useTimerStore((state) => state.resetTimer);

    return (
        <div className="w-full flex justify-center gap-4">
            <Button onClick={() => setIsRunning(!isRunning)}>
                {isRunning ? "Pause" : "Start"}
            </Button>
            <Button onClick={resetTimer}>Reset</Button>
        </div>
    );
};
