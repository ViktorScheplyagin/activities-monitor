import { create } from "zustand";
import { TaskData } from "@/entities/task/api/dto/task";
import { tasksApi } from "@/entities/task/api/tasksApi";
import { SearchParams } from "@/entities/task";

interface TasksListState {
    tasks: TaskData[];
    isLoading: boolean;
    setTasks: (tasks: TaskData[]) => void;
    fetchTasks: (searchParams?: SearchParams) => Promise<void>;
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
}));
