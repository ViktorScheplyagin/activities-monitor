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
        "text-2xl font-bold",
        {
          "text-red-500 dark:text-red-400": mode === "work",
          "text-green-500 dark:text-green-400": mode === "break",
          "text-blue-500 dark:text-blue-400": mode === "longBreak",
        },
        className,
      )}
    >
      {minutes.toString().padStart(2, "0")}:
      {seconds.toString().padStart(2, "0")}
    </div>
  );
};
//
