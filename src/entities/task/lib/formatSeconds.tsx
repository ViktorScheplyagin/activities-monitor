import { TaskData } from "../api/dto/task";

export function formatSeconds(time: TaskData["time"]) {
    if (time) {
        const totalMinutes = Math.floor(time / 60);
        const hoursStr = Math.floor(totalMinutes / 60)
            .toString()
            .padStart(2, "0");
        const minutesStr = (totalMinutes % 60).toString().padStart(2, "0");
        const secondsStr = (time % 60).toString().padStart(2, "0");

        return `${hoursStr}:${minutesStr}:${secondsStr}`;
    }
    return "00:00:00";
}
