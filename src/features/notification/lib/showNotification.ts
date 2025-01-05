import { FEATURE_ASSETS } from "../assets";

export function showNotification(title: string, options?: NotificationOptions) {
    if (Notification.permission === "granted") {
        new Notification(title, options);
        const audio = new Audio(FEATURE_ASSETS.sounds.notification);
        audio.play().catch((error) => {
            console.error("Failed to play notification sound:", error);
        });
    }
}
