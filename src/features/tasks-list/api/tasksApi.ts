import { TaskData } from "@/entities/task";

export const tasksApi = {
  createTask: async (
    task: Omit<TaskData, "id" | "status" | "time">
  ): Promise<TaskData> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return {
      id: crypto.randomUUID(),
      status: "todo",
      time: 0,
      ...task,
    };
  },

  fetchTasks: async (): Promise<TaskData[]> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return [
      {
        id: "1",
        title: "Initial task",
        description: "This is a mock task",
        status: "todo",
        time: 0,
      },
    ];
  },
};
