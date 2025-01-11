import { TaskData } from "./dto/task";
import { db } from "@/shared/api/indexed-db";
import { SearchParams } from "../model/types";

type CreateTaskData = Pick<TaskData, "title" | "description">;

type UpdateTaskData = Partial<TaskData>;

export const tasksApi = {
    getAll: async (searchParams?: SearchParams): Promise<TaskData[]> => {
        return db.getAllTasks(searchParams?.query, searchParams?.filters);
    },

    getById: async (id: string): Promise<TaskData> => {
        const task = await db.getTaskById(id);
        if (!task) throw new Error("Task not found");
        return task;
    },

    create: async (data: CreateTaskData): Promise<TaskData> => {
        return db.createTask({
            ...data,
            createdAt: new Date(),
        });
    },

    update: async (id: string, data: UpdateTaskData): Promise<TaskData> => {
        return db.updateTask(id, data);
    },

    delete: async (id: string): Promise<void> => {
        return db.deleteTask(id);
    },
};
