"use client";
import { TasksList } from "@/features/tasks-list";
import { TaskSearch } from "@/features/task-search";

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
      <div className="flex-1 flex justify-center p-8">
        <div className="w-2/3 space-y-4">
          <TaskSearch />
          <TasksList />
        </div>
      </div>
    </div>
  );
};
