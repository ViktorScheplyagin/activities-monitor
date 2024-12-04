"use client";
import { useEffect } from "react";
import { TasksList } from "@/features/tasks-list";
import { Header } from "@/widgets/header";
import {
  requestNotificationPermission,
  showNotification,
} from "@/features/notification";
import { Timer, useTimerStore } from "@/features/timer";
import { useHomePageStore } from "../model/store";

/**
 * TODO:
 * time spent on a task should be displayed in the task
 *
 * later, remove this behaviour and make a button instead of click on a task
 * add another button to open task menu (edit, delete, etc)
 * MSKR IT WITH TDD
 */

export const HomePage: React.FC = () => {
  const tasks = useHomePageStore((state) => state.tasks);
  const focusedTask = useHomePageStore((state) => state.focusedTask);
  const setFocusedTask = useHomePageStore((state) => state.setFocusedTask);

  const mode = useTimerStore((state) => state.mode);

  useEffect(() => {
    requestNotificationPermission();
  }, []);

  useEffect(() => {
    showNotification("Pomodoro завершён!");
  }, [mode]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <Header />
      <div className="w-1/3">
        <Timer title={focusedTask?.title} />
      </div>
      <div className="w-1/2">
        <TasksList items={tasks} onFocusChange={setFocusedTask} />
      </div>
    </div>
  );
};
