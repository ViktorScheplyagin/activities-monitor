import { TaskFormValues } from "./schema";
import { tasksApi } from "@/entities/task";
import { create } from "zustand";

interface TaskCreateState {
    isEditorOpen: boolean;
    isTaskCreated: boolean;
    openEditor: () => void;
    closeEditor: () => void;
    createTask: (data: TaskFormValues) => Promise<void>;
}

export const useTaskCreateStore = create<TaskCreateState>((set) => ({
    isEditorOpen: false,
    isTaskCreated: false,
    openEditor: () => set({ isEditorOpen: true, isTaskCreated: false }),
    closeEditor: () => set({ isEditorOpen: false }),

    createTask: async (data) => {
        try {
            await tasksApi.create({
                ...data,
                tags: data.tags || [],
            });
            set({ isTaskCreated: true });
        } catch (error) {
            console.error("Failed to create task:", error);
        }
    },
}));
