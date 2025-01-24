import { create } from "zustand";
import { TaskData } from "@/entities/task/api/dto/task";
import { tasksApi } from "@/entities/task/api/tasksApi";
import { SearchParams } from "@/entities/task";

interface TasksListState {
    tasks: TaskData[];
    isLoading: boolean;
    taskIdToDelete: string | null;
    setTasks: (tasks: TaskData[]) => void;
    deleteTask: (id: string) => Promise<void>;
    fetchTasks: (searchParams?: SearchParams) => Promise<void>;
    setTaskIdToDelete: (id: string | null) => void;
}

export const useTasksListStore = create<TasksListState>((set) => ({
    tasks: [],
    isLoading: true,
    taskIdToDelete: null,

    setTasks: (tasks) => set({ tasks, isLoading: false }),

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

    deleteTask: async (id) => {
        try {
            await tasksApi.delete(id);
            set((state) => ({
                tasks: state.tasks.filter((task) => task.id !== id),
                taskIdToDelete: null,
            }));
        } catch (error) {
            console.error("Failed to delete task:", error);
        }
    },

    setTaskIdToDelete: (id) => set({ taskIdToDelete: id }),
}));
