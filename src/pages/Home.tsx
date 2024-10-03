"use client";
import { Timer } from "@/features/pomodoro/components/Timer";
import { Controls } from "@/features/pomodoro/components/Controls";
import { usePomodoro } from "@/features/pomodoro/hooks/usePomodoro";

const HomePage: React.FC = () => {
  const {
    mode,
    timeLeft,
    isActive,
    toggleTimer,
    resetTimer,
    changeWorkDuration,
    changeBreakDuration,
  } = usePomodoro();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Pomodoro Timer</h1>
        <Timer timeLeft={timeLeft} mode={mode} />
        <Controls
          isActive={isActive}
          toggleTimer={toggleTimer}
          resetTimer={resetTimer}
          changeWorkDuration={changeWorkDuration}
          changeBreakDuration={changeBreakDuration}
        />
      </div>
    </div>
  );
};

export default HomePage;
