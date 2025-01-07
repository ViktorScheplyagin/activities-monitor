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
    const minutesChars = Math.floor(timeLeft / 60)
        .toString()
        .padStart(2, "0")
        .split("");
    const secondsChars = (timeLeft % 60).toString().padStart(2, "0").split("");

    return (
        <div
            className={cn(
                "text-6xl m-auto rounded-lg font-bold shadow-inset w-44 py-2",
                "font-['DS-Digital',monospace] tracking-wider tabular-nums",
                "dark:[text-shadow:0_0_15px_currentColor]",
                {
                    "text-red-500": mode === "work",
                    "text-green-500 dark:text-green-400": mode === "break",
                    "text-blue-500 dark:text-blue-400": mode === "longBreak",
                },
                className
            )}
        >
            <span className="inline-block w-[1ch] text-end">
                {minutesChars[0]}
            </span>
            <span className="inline-block w-[1ch] text-end">
                {minutesChars[1]}
            </span>
            :
            <span className="inline-block w-[1ch] text-end">
                {secondsChars[0]}
            </span>
            <span className="inline-block w-[1ch] text-end">
                {secondsChars[1]}
            </span>
        </div>
    );
};
//
