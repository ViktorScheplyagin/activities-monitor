export type TaskStatus = "in-progress" | "done";

export interface TaskData {
    id: string;
    title: string;
    description: string;
    time?: number;
    status: TaskStatus;
    createdAt: Date;
    updatedAt?: Date;
    tags: string[];
}
