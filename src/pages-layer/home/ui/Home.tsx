"use client";

import { TasksList, useTasksListStore } from "@/features/tasks-list";
import { TaskSearch, useTaskSearchStore } from "@/features/task-search";
import { TaskCreate } from "@/features/task-create";

export const HomePage: React.FC = () => {
    const fetchTasks = useTasksListStore((state) => state.fetchTasks);
    const searchQuery = useTaskSearchStore((state) => state.query);
    const searchFilters = useTaskSearchStore((state) => state.filters);

    const refetchTasks = () =>
        fetchTasks({ query: searchQuery, filters: searchFilters });

    return (
        <div className="flex flex-col justify-center gap-8">
            <TaskSearch />
            <TaskCreate onTaskCreated={refetchTasks} />
            <TasksList />
        </div>
    );
};
