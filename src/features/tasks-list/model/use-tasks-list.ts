import { useState, useEffect } from "react";
import { useTasksListStore } from "./store";
import { useTaskSearchStore } from "@/features/task-search/@x/tasks-list";

export const useTasksList = () => {
    const tasks = useTasksListStore((state) => state.tasks);
    const isLoading = useTasksListStore((state) => state.isLoading);
    const openEditor = useTasksListStore((state) => state.openEditor);
    const fetchTasks = useTasksListStore((state) => state.fetchTasks);
    const deleteTask = useTasksListStore((state) => state.deleteTask);

    const searchQuery = useTaskSearchStore((state) => state.query);
    const searchFilters = useTaskSearchStore((state) => state.filters);

    const [taskIdToDelete, setTaskIdToDelete] = useState<string | null>(null);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            fetchTasks({ query: searchQuery, filters: searchFilters });
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [searchQuery, searchFilters]);

    const handleDeleteClick = (taskId: string) => {
        setTaskIdToDelete(taskId);
    };

    const handleDeleteConfirm = async () => {
        if (taskIdToDelete) {
            await deleteTask(taskIdToDelete);
            setTaskIdToDelete(null);
        }
    };

    const handleDeleteCancel = () => {
        setTaskIdToDelete(null);
    };

    return {
        tasks,
        isLoading,
        openEditor,
        taskIdToDelete,
        handleDeleteClick,
        handleDeleteConfirm,
        handleDeleteCancel,
    };
};
