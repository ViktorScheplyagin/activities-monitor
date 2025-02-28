"use client";

import { TasksList, useTasksListStore } from "@/features/tasks-list";
import { TaskSearch, useTaskSearchStore } from "@/features/task-search";
import { TaskCreate } from "@/features/task-create";
import { TaskDelete } from "@/features/task-delete";
import { useTaskDelete } from "@/features/task-delete";

export const HomePage: React.FC = () => {
    const fetchTasks = useTasksListStore((state) => state.fetchTasks);
    const searchQuery = useTaskSearchStore((state) => state.query);
    const searchFilters = useTaskSearchStore((state) => state.filters);

    const refetchTasks = () =>
        fetchTasks({ query: searchQuery, filters: searchFilters });

    const { openDialogFor: openDeleteDialogFor } = useTaskDelete({
        onDelete: refetchTasks,
    });

    return (
        <div className="flex flex-col justify-center gap-8">
            <TaskSearch />
            <TaskCreate onTaskCreated={refetchTasks} />
            <TasksList onDeleteClick={openDeleteDialogFor} />
            <TaskDelete />
        </div>
    );
};
