import { useEffect } from "react";
import { TimerDisplay } from "./TimerDisplay";
import { Controls } from "./Controls";
import { useTimerLogicSetup } from "../model/timer";
import { useTimerStore } from "../model/store";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/shared/ui/neomorphic";
import { TimerSettings } from "./TimerSettings";
import { TaskData } from "@/entities/task";

interface TimerProps {
    task?: TaskData;
}

export const Timer = ({ task }: TimerProps) => {
    const timeLeft = useTimerStore((state) => state.timeLeft);
    const resetTimer = useTimerStore((state) => state.resetTimer);
    const mode = useTimerStore((state) => state.mode);
    const sessionsCount = useTimerStore((state) => state.sessionsCount);

    useTimerLogicSetup();

    const isCompleted = task?.status === "done";

    useEffect(() => resetTimer, []);

    return (
        <>
            <Card>
                <CardHeader className="flex-row justify-end">
                    <TimerSettings />
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="text-center">
                        <TimerDisplay timeLeft={timeLeft} mode={mode} />
                        <div className="text-2xl mt-2 dark:text-gray-400 capitalize">
                            {mode}
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                            Finished {sessionsCount} sessions
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Controls disabled={isCompleted} />
                </CardFooter>
            </Card>
        </>
    );
};
