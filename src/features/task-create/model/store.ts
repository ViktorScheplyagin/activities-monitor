import { TaskFormValues } from "./schema";
import { tasksApi } from "@/entities/task";
import { create } from "zustand";

interface TaskCreateState {
    isEditorOpen: boolean;
    closeEditor: () => void;
    createTask: (data: TaskFormValues) => Promise<void>;
}

export const useTaskCreateStore = create<TaskCreateState>((set) => ({
    isEditorOpen: false,
    openEditor: () => set({ isEditorOpen: true }),
    closeEditor: () => set({ isEditorOpen: false }),

    createTask: async (data) => {
        try {
            await tasksApi.create({
                ...data,
                tags: data.tags || [],
            });
        } catch (error) {
            console.error("Failed to create task:", error);
        }
    },
}));
