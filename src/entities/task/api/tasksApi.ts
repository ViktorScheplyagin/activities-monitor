import { Task, TaskStatus } from "@prisma/client";
import { api } from "@/shared/api/axios";
import { SearchParams } from "../model/types";

interface CreateTaskData {
  title: string;
  description: string;
  status?: TaskStatus;
}

interface UpdateTaskData {
  title?: string;
  description?: string;
  status?: TaskStatus;
  time?: number;
}

export const tasksApi = {
  getAll: async (searchParams?: SearchParams): Promise<Task[]> => {
    const params = new URLSearchParams();
    if (searchParams?.query) {
      params.set("q", searchParams.query);
    }
    if (searchParams?.filters) {
      params.set("in", searchParams.filters.join(","));
    }

    const { data } = await api.get(`/tasks?${params}`);
    return data;
  },

  getById: async (id: string): Promise<Task> => {
    const { data } = await api.get(`/tasks/${id}`);
    return data;
  },

  create: async (data: CreateTaskData): Promise<Task> => {
    const { data: response } = await api.post("/tasks", data);
    return response;
  },

  update: async (id: string, data: UpdateTaskData): Promise<Task> => {
    const { data: response } = await api.patch(`/tasks/${id}`, data);
    return response;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/tasks/${id}`);
  },
};
