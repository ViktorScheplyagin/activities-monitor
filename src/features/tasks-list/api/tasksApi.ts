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

  editTask: async (
    id: string,
    task: Partial<Omit<TaskData, "id">>
  ): Promise<TaskData> => {
    const { data } = await api.patch<TaskData>(`/tasks/${id}`, task);
    return data;
  },

  deleteTask: async (id: string): Promise<void> => {
    await api.delete(`/tasks/${id}`);
  },
};
