export interface TaskData {
  id: string;
  title: string;
  status: "completed" | "todo" | "paused" | "inProgress";
  description?: string;
  time?: number;
}
