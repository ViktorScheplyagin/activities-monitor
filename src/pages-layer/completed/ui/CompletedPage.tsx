"use client";

import { TasksList } from "@/features/tasks-list";
import { TaskSearch } from "@/features/task-search";

export const CompletedPage = () => {
    return (
        <div className="space-y-6">
            <TaskSearch />
            <TasksList showCompleted />
        </div>
    );
};
