import { cn } from "@/lib/utils";
import { TimerMode } from "../model/types";

interface TimerProps {
    timeLeft: number;
    mode: TimerMode;
    className?: string;
}

export const TimerDisplay: React.FC<TimerProps> = ({
    timeLeft,
    mode,
    className,
}) => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return (
        <div
            className={cn(
                "text-6xl m-auto rounded-lg font-bold shadow-inset w-44 py-2",
                "font-['DS-Digital'] tracking-wider",
                "dark:[text-shadow:0_0_15px_currentColor]",
                {
                    "text-red-500": mode === "work",
                    "text-green-500 dark:text-green-400": mode === "break",
                    "text-blue-500 dark:text-blue-400": mode === "longBreak",
                },
                className
            )}
        >
            {minutes.toString().padStart(2, "0")}:
            {seconds.toString().padStart(2, "0")}
        </div>
    );
};
//
