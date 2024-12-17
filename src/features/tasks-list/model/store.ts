import { SearchParams, TaskData } from "@/entities/task";
import { create } from "zustand";
import { tasksApi } from "@/entities/task";

interface TasksListStore {
  tasks: TaskData[];
  isLoading: boolean;
  isEditorOpen: boolean;
  editingTask: TaskData | null;
  openEditor: (task?: TaskData) => void;
  closeEditor: () => void;
  createTask: (task: Omit<TaskData, "id" | "status" | "time">) => Promise<void>;
  fetchTasks: (searchParams?: SearchParams) => Promise<void>;
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
      const newTask = await tasksApi.create(taskData);
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
  fetchTasks: async (searchParams) => {
    try {
      set({ isLoading: true });
      const tasks = await tasksApi.getAll(searchParams);
      set({ tasks, isLoading: false });
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
      set({ isLoading: false });
    }
  },
  editTask: async (id, taskData) => {
    try {
      set({ isLoading: true });
      const updatedTask = await tasksApi.update(id, taskData);
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
      await tasksApi.delete(id);
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
