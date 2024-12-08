import { TaskStatus } from "@prisma/client";

export interface TaskData {
  id: string;
  title: string;
  status: TaskStatus;
  description: string;
  time?: number;
}
