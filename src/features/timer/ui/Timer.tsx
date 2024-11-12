interface TimerProps {
  timeLeft: number;
  mode: "work" | "break";
}

export const Timer: React.FC<TimerProps> = ({ timeLeft, mode }) => {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div
      className={
        mode === "work"
          ? "text-red-500 dark:text-red-400"
          : "text-green-500 dark:text-green-400"
      }
    >
      {minutes.toString().padStart(2, "0")}:
      {seconds.toString().padStart(2, "0")}
    </div>
  );
};
// 