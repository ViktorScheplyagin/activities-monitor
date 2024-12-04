import { TaskData } from "../api/dto/task";

export function formatSeconds(time: TaskData["time"]) {
  if (time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }
  return "00:00";
}
