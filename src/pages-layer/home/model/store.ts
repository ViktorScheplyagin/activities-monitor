import { TaskData } from "@/entities/task";
import { create } from "zustand";

export type HomePageStore = {
    tasks: TaskData[];
    focusedTask: TaskData | null;
    setTasks: (tasks: TaskData[]) => void;
    setFocusedTask: (taskId: string | null) => void;
};

export const useHomePageStore = create<HomePageStore>((set, get) => ({
    tasks: [],
    focusedTask: null,
    setTasks: (tasks) => set({ tasks }),
    setFocusedTask: (id) =>
        set({ focusedTask: get().tasks.find((task) => task.id === id) }),
}));
