import { Card } from "@/shared/ui";
import { TimerDisplay } from "./TimerDisplay";
import { Controls } from "./Controls";
import { useTimerLogicSetup } from "../model/timer";
import { useTimerStore } from "../model/store";
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
  const timeLeft = useTimerStore((state) => state.timeLeft);
  const mode = useTimerStore((state) => state.mode);
  const sessionsCount = useTimerStore((state) => state.sessionsCount);

  useTimerLogicSetup();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">
          {title ?? "Pomodoro Timer"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <TimerDisplay className="text-6xl" timeLeft={timeLeft} mode={mode} />
          <div className="text-2xl mt-2 dark:text-gray-400 capitalize">
            {mode}
          </div>
          <div className="text-sm text-gray-500 mt-1">
            Finished {sessionsCount} sessions
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Controls />
      </CardFooter>
    </Card>
  );
};
