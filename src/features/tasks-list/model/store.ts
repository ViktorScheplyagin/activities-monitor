import { TaskData } from "@/entities/task";
import { create } from "zustand";
import { tasksApi } from "../api/tasksApi";

interface TasksListStore {
  tasks: TaskData[];
  isLoading: boolean;
  isCreatorOpen: boolean;
  isCreatorLoading: boolean;
  openCreator: () => void;
  closeCreator: () => void;
  createTask: (task: Omit<TaskData, "id" | "status" | "time">) => Promise<void>;
  fetchTasks: () => Promise<void>;
}

export const useTasksListStore = create<TasksListStore>((set) => ({
  tasks: [],
  isLoading: false,
  isCreatorOpen: false,
  isCreatorLoading: false,
  openCreator: () => set({ isCreatorOpen: true }),
  closeCreator: () => set({ isCreatorOpen: false }),
  createTask: async (taskData) => {
    try {
      set({ isCreatorLoading: true });
      const newTask = await tasksApi.createTask(taskData);
      set((state) => ({
        tasks: [...state.tasks, newTask],
        isCreatorOpen: false,
        isCreatorLoading: false,
      }));
    } catch (error) {
      console.error("Failed to create task:", error);
    } finally {
      set({ isCreatorLoading: false });
    }
  },
  fetchTasks: async () => {
    try {
      set({ isLoading: true });
      const tasks = await tasksApi.fetchTasks();
      set({ tasks, isLoading: false });
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
      set({ isLoading: false });
    }
  },
}));
