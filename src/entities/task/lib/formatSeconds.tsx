import { TaskData } from "../api/dto/task";

export function formatSeconds(time: TaskData["time"]) {
    if (time) {
        const totalMinutes = Math.floor(time / 60);
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        const seconds = time % 60;

        return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    }
    return "00:00:00";
}
