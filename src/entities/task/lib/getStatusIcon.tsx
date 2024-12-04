import { CheckIcon, InboxIcon, PauseIcon, PlayIcon } from "@/shared/lib/icons";
import { TaskData } from "../api/dto/task";

export function getStatusIcon(status: TaskData["status"]) {
  switch (status) {
    case "completed":
      return <CheckIcon />;
    case "todo":
      return <InboxIcon />;
    case "paused":
      return <PauseIcon />;
    case "inProgress":
      return <PlayIcon />;
    default:
      return null;
  }
}
