"use client";
import { TasksList } from "@/features/tasks-list";
import { TaskSearch } from "@/features/task-search";

export const HomePage: React.FC = () => {
    return (
        <div className="flex flex-col justify-center gap-8">
            <TaskSearch />
            <TasksList />
        </div>
    );
};
