import { Card } from "@/shared/ui";
import { TimerDisplay } from "./TimerDisplay";
import { Controls } from "./Controls";
import { useTimerWorkerSetup } from "../model/timer";
import { useStore } from "../model/store";
import {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";

interface Props {
  title?: string;
}

export const Timer = ({ title }: Props) => {
  const timeLeft = useStore((state) => state.timeLeft);
  const mode = useStore((state) => state.mode);

  useTimerWorkerSetup();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">
          {title ?? "Pomodoro Timer"}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <TimerDisplay className="text-6xl" timeLeft={timeLeft} mode={mode} />
        <div className="text-2xl mt-2 dark:text-gray-400">
          {mode === "work" ? "Work" : "Break"}
        </div>
      </CardContent>
      <CardFooter>
        <Controls />
      </CardFooter>
    </Card>
  );
};
