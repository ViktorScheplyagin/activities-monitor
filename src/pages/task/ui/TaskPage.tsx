"use client";
import { Timer } from "@/features/timer";
import { Header } from "@/widgets/header";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { tasksApi } from "@/entities/task/api/tasksApi";
import { TaskDetailsForm } from "@/features/task-form";
import { Task } from "@prisma/client";
import type { TaskFormValues } from "@/features/task-form";
import { Button, Card } from "@/shared/ui";

interface Props {
  id: string;
}

export const TaskPage = ({ id }: Props) => {
  const router = useRouter();
  const [task, setTask] = useState<Task | null>(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const taskData = await tasksApi.getById(id);
        setTask(taskData);
      } catch (error) {
        router.push("/");
      }
    };

    fetchTask();
  }, [id]);

  const handleSubmit = async (values: TaskFormValues) => {
    try {
      await tasksApi.update(id, values);
      router.push("/");
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
      <Header />
      <div className="flex-1 flex gap-8 justify-center items-start p-8">
        <div className="w-1/3">
          <Timer />
        </div>
        <div className="w-1/2">
          <Card>
            <TaskDetailsForm
              defaultValues={task || undefined}
              onSubmit={handleSubmit}
              actions={({ isDirty, isSubmitting }) => (
                <div className="flex justify-between items-center">
                  <Button
                    type="button"
                    variant="link"
                    className="text-gray-600 hover:text-gray-800"
                    onClick={() => router.push("/")}
                  >
                    ← Back to Tasks
                  </Button>
                  {isDirty && (
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? "Saving..." : "Save Changes"}
                    </Button>
                  )}
                </div>
              )}
            />
          </Card>
        </div>
      </div>
    </div>
  );
};
