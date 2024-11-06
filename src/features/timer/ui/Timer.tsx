import { useEffect } from "react";

interface TimerProps {
  timeLeft: number;
  mode: "work" | "break";
}

// TODO: move notification control logic to another component
// TODO: render the stateful component in the feature and pass a mode prop to it

function requestNotificationPermission() {
  if ("Notification" in window) {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        console.log("Notification permission granted.");
      } else {
        console.log("Notification permission denied.");
      }
    });
  }
}

function showNotification(title: string, options?: NotificationOptions) {
  if (Notification.permission === "granted") {
    new Notification(title, options);
  }
}

export const Timer: React.FC<TimerProps> = ({ timeLeft, mode }) => {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  useEffect(() => {
    requestNotificationPermission();
  }, []);

  useEffect(() => {
    showNotification("Pomodoro завершён!");
  }, [mode]);

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
