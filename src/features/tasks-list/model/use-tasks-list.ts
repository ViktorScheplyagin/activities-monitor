import { useEffect } from "react";
import { useTasksListStore } from "./store";
import { useTaskSearchStore } from "@/features/task-search/@x/tasks-list";
import { useTagsStore } from "@/features/tags/@x/tasks-list";

export const useTasksList = () => {
    const tasks = useTasksListStore((state) => state.tasks);
    const isLoading = useTasksListStore((state) => state.isLoading);
    const fetchTasks = useTasksListStore((state) => state.fetchTasks);

    const searchQuery = useTaskSearchStore((state) => state.query);
    const searchFilters = useTaskSearchStore((state) => state.filters);

    const { tags: allTags, selectedTags, toggleTag } = useTagsStore();

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            fetchTasks({ query: searchQuery, filters: searchFilters });
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [searchQuery, searchFilters]);

    return {
        tasks,
        isLoading,
        allTags,
        selectedTags,
        toggleTag,
    };
};
