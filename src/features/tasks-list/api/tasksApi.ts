import { TaskData } from "@/entities/task";
import { api } from "@/shared/api/axios";

export const tasksApi = {
  createTask: async (
    task: Omit<TaskData, "id" | "status" | "time">
  ): Promise<TaskData> => {
    const { data } = await api.post<TaskData>("/tasks", task);
    return data;
  },

  fetchTasks: async (): Promise<TaskData[]> => {
    const { data } = await api.get<TaskData[]>("/tasks");
    return data;
  },
};
