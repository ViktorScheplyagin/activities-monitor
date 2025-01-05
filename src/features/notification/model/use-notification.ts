import { useEffect } from "react";
import { useTimerStore } from "@/features/timer";
import { requestNotificationPermission } from "../lib/requestNotificationPermission";
import { showNotification } from "../lib/showNotification";

interface NotificationConfig {
    title: string;
    options?: NotificationOptions;
}

export const useTimerNotification = (config: NotificationConfig) => {
    const timeLeft = useTimerStore((state) => state.timeLeft);

    useEffect(() => {
        requestNotificationPermission();
    }, []);

    useEffect(() => {
        if (timeLeft === 0) {
            showNotification(config.title, config.options);
        }
    }, [timeLeft]);
};
