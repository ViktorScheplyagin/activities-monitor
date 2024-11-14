"use client";
import { TasksList } from "@/features/tasks-list";
import { Header } from "@/widgets/Header";
import { PomodoroTimer } from "@/widgets/PomodoroTimer";

/**
 * TODO:
 * make a HomePage store
 * when user clicks on a task - make it active:
 * - highlight it
 * - load it to the store
 * when user clicks on a timer - make it inactive and make the new task active
 * time spent on a task should be displayed in the task
 *
 * later, remove this behaviour and make a button instead of click on a task
 * add another button to open task menu (edit, delete, etc)
 * MSKR IT WITH TDD
 */

import { TaskData } from "@/entities/task";

const mockTasks: TaskData[] = [
  {
    id: "2",
    title: "Write unit tests",
    status: "todo",
    description: "Create test coverage for core components",
    time: 0, // 15 minutes
  },
  {
    id: "3",
    title: "Update documentation",
    status: "completed",
    description: "Update README with new API endpoints",
    time: 300, // 5 minutes
  },
  {
    id: "4",
    title: "Update documentation",
    status: "paused",
    description: "Update README with new API endpoints",
    time: 300, // 5 minutes
  },
];

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <Header />
      <PomodoroTimer />
      <div className="w-1/2">
        <TasksList items={mockTasks} />
      </div>
    </div>
  );
};
