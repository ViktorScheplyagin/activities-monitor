import { useEffect } from "react";
import { useTimerStore } from "@/features/timer";
import { requestNotificationPermission } from "../lib/requestNotificationPermission";
import { showNotification } from "../lib/showNotification";

interface NotificationConfig {
  title: string;
  options?: NotificationOptions;
}

export const useTimerNotification = (config: NotificationConfig) => {
  const mode = useTimerStore((state) => state.mode);

  useEffect(() => {
    requestNotificationPermission();
  }, []);

  useEffect(() => {
    if (mode === "break" || mode === "longBreak") {
      showNotification(config.title, config.options);
    } else if (mode === "work") {
      showNotification(config.title, config.options);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);
};
