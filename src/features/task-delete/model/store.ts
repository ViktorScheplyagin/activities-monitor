import { create } from "zustand";
import { tasksApi } from "@/entities/task/api/tasksApi";

interface TaskDeleteState {
    isOpen: boolean;
    targetTaskId: string | null;
    isDeleting: boolean;
    lastDeletedTaskId: string | null;
    setIsOpen: (isOpen: boolean) => void;
    setTargetTaskId: (id: string | null) => void;
    deleteTask: () => Promise<void>;
}

export const useTaskDeleteStore = create<TaskDeleteState>((set, get) => ({
    isOpen: false,
    targetTaskId: null,
    isDeleting: false,
    lastDeletedTaskId: null,

    setIsOpen: (isOpen) => {
        set({ isOpen });
        if (!isOpen) {
            set({ targetTaskId: null });
        }
    },

    setTargetTaskId: (id) => set({ targetTaskId: id }),

    deleteTask: async () => {
        const { targetTaskId } = get();
        if (!targetTaskId) return;

        try {
            set({ isDeleting: true });
            await tasksApi.delete(targetTaskId);
            set({
                isOpen: false,
                targetTaskId: null,
                lastDeletedTaskId: targetTaskId,
            });
        } catch (error) {
            console.error("Failed to delete task:", error);
        } finally {
            set({ isDeleting: false });
        }
    },
}));
