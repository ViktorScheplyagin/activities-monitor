import { useTimerStore } from "@/features/timer/@x/time-accumulator";
import { useTimeAccumulatorStore } from "../model/store";
import { formatSeconds } from "@/entities/task";
import { useEffect } from "react";
import { Button } from "@/shared/ui/neomorphic";

interface Props {
    taskId: string;
    initialTime?: number;
}

export const TimeAccumulator = ({ taskId, initialTime = 0 }: Props) => {
    const timeLeft = useTimerStore((state) => state.timeLeft);
    const mode = useTimerStore((state) => state.mode);
    const workDuration = useTimerStore((state) => state.workDuration);
    const resetTimer = useTimerStore((state) => state.resetTimer);
    const skippedTimeSpent = useTimerStore((state) => state.skippedTimeSpent);
    const setSkippedTimeSpent = useTimerStore(
        (state) => state.setSkippedTimeSpent
    );
    const totalTime = useTimeAccumulatorStore((state) => state.totalTime);
    const setTotalTime = useTimeAccumulatorStore((state) => state.setTotalTime);
    const updateAccumulatedTime = useTimeAccumulatorStore(
        (state) => state.updateAccumulatedTime
    );

    const handleSaveProgress = () => {
        const timePassed = workDuration - timeLeft;
        updateAccumulatedTime(taskId, totalTime + timePassed);
        resetTimer();
    };

    useEffect(() => {
        setTotalTime(initialTime);
    }, [initialTime]);

    useEffect(() => {
        if (timeLeft === 0 && mode === "work") {
            updateAccumulatedTime(taskId, totalTime + workDuration);
            resetTimer();
        }
    }, [timeLeft, mode]);

    // Handle skipped time updates
    useEffect(() => {
        if (skippedTimeSpent > 0) {
            updateAccumulatedTime(taskId, totalTime + skippedTimeSpent);
            setSkippedTimeSpent(0); // Reset after handling
        }
    }, [skippedTimeSpent]);

    return (
        <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="text-gray-500">
                Total time: {formatSeconds(totalTime)}
            </div>
            <Button onClick={handleSaveProgress}>Save progress</Button>
        </div>
    );
};
