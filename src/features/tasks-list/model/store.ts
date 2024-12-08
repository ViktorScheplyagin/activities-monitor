import { TaskData } from "@/entities/task";
import { create } from "zustand";
import { tasksApi } from "../api/tasksApi";

interface TasksListStore {
  tasks: TaskData[];
  isLoading: boolean;
  isEditorOpen: boolean;
  editingTask: TaskData | null;
  openEditor: (task?: TaskData) => void;
  closeEditor: () => void;
  createTask: (task: Omit<TaskData, "id" | "status" | "time">) => Promise<void>;
  fetchTasks: () => Promise<void>;
  editTask: (id: string, task: Partial<Omit<TaskData, "id">>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
}

export const useTasksListStore = create<TasksListStore>((set) => ({
  tasks: [],
  isLoading: false,
  isEditorOpen: false,
  editingTask: null,
  openEditor: (task) => set({ isEditorOpen: true, editingTask: task || null }),
  closeEditor: () => set({ isEditorOpen: false, editingTask: null }),
  createTask: async (taskData) => {
    try {
      set({ isLoading: true });
      const newTask = await tasksApi.createTask(taskData);
      set((state) => ({
        tasks: [...state.tasks, newTask],
        isEditorOpen: false,
        editingTask: null,
        isLoading: false,
      }));
    } catch (error) {
      console.error("Failed to create task:", error);
      set({ isLoading: false });
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
  editTask: async (id, taskData) => {
    try {
      set({ isLoading: true });
      const updatedTask = await tasksApi.editTask(id, taskData);
      set((state) => ({
        tasks: state.tasks.map((task) => (task.id === id ? updatedTask : task)),
        isEditorOpen: false,
        editingTask: null,
        isLoading: false,
      }));
    } catch (error) {
      console.error("Failed to edit task:", error);
      set({ isLoading: false });
    }
  },
  deleteTask: async (id) => {
    try {
      set({ isLoading: true });
      await tasksApi.deleteTask(id);
      set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== id),
        isLoading: false,
      }));
    } catch (error) {
      console.error("Failed to delete task:", error);
      set({ isLoading: false });
    }
  },
}));
