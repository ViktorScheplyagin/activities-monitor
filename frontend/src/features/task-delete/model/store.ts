import { create } from "zustand";
import { tasksApi } from "@/entities/task/api/tasksApi";

interface TaskDeleteState {
    isOpen: boolean;
    targetTaskId: string | null;
    isDeleting: boolean;
    isTaskDeleted: boolean;
    setIsOpen: (isOpen: boolean) => void;
    setTargetTaskId: (id: string | null) => void;
    setIsTaskDeleted: (id: boolean) => void;
    deleteTask: () => Promise<void>;
}

export const useTaskDeleteStore = create<TaskDeleteState>((set, get) => ({
    isOpen: false,
    targetTaskId: null,
    isDeleting: false,
    isTaskDeleted: false,

    setIsOpen: (isOpen) => {
        set({ isOpen });
        if (!isOpen) {
            set({ targetTaskId: null });
        }
    },

    setTargetTaskId: (id) => set({ targetTaskId: id }),

    setIsTaskDeleted: (id) => set({ isTaskDeleted: id }),

    deleteTask: async () => {
        const { targetTaskId } = get();
        if (!targetTaskId) return;

        try {
            set({ isDeleting: true });
            await tasksApi.delete(targetTaskId);
            set({
                isOpen: false,
                targetTaskId: null,
                isTaskDeleted: true,
            });
        } catch (error) {
            console.error("Failed to delete task:", error);
        } finally {
            set({ isDeleting: false });
        }
    },
}));
