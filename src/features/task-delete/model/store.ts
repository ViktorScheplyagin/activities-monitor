import { tasksApi } from "@/entities/task";
import { create } from "zustand";

interface TaskDeleteState {
    isOpen: boolean;
    targetTaskId: string | null;
    setIsOpen: (isOpen: boolean) => void;
    setTargetTaskId: (id: string | null) => void;
    deleteTask: () => Promise<void>;
}

export const useTaskDeleteStore = create<TaskDeleteState>()((set, get) => ({
    isOpen: false,
    targetTaskId: null,
    setIsOpen: (isOpen: boolean) => set({ isOpen }),
    setTargetTaskId: (id: string | null) => set({ targetTaskId: id }),

    deleteTask: async () => {
        try {
            await tasksApi.delete(get().targetTaskId!);
            set({ isOpen: false, targetTaskId: null });
        } catch (error) {
            console.error("Failed to delete task:", error);
        }
    },
}));
