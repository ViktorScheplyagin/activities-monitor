"use client";
import { useEffect } from "react";
import { TasksList } from "@/features/tasks-list";
import { Header } from "@/widgets/header";
import {
  requestNotificationPermission,
  showNotification,
} from "@/features/notification";
import { useTimerStore } from "@/features/timer";

export const HomePage: React.FC = () => {
  const mode = useTimerStore((state) => state.mode);

  useEffect(() => {
    requestNotificationPermission();
  }, []);

  useEffect(() => {
    showNotification("Pomodoro завершён!");
  }, [mode]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
      <Header />
      <div className="flex-1 flex justify-center p-8">
        <div className="w-2/3">
          <TasksList />
        </div>
      </div>
    </div>
  );
};
