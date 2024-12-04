import { Card } from "@/shared/ui";
import { TimerDisplay } from "./TimerDisplay";
import { Controls } from "./Controls";
import { useTimer } from "../model/timer";

interface Props {
  title?: string;
}

export const Timer = ({ title }: Props) => {
  const timer = useTimer();

  return (
    <Card>
      <h1 className="text-3xl font-bold mb-6 text-center dark:text-gray-400 truncate">
        {title ?? "Pomodoro Timer"}
      </h1>
      <div className="text-6xl font-bold text-center">
        <TimerDisplay timeLeft={timer.timeLeft} mode={timer.mode} />
        <div className="text-2xl mt-2 dark:text-gray-400">
          {timer.mode === "work" ? "Work" : "Break"}
        </div>
      </div>
      <Controls
        isTimerRunning={timer.isRunning}
        toggleTimer={timer.toggle}
        resetTimer={timer.reset}
        changeWorkDuration={timer.changeWorkDuration}
        changeBreakDuration={timer.changeBreakDuration}
      />
    </Card>
  );
};
