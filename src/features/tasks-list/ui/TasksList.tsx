import { Button, Card } from "@/shared/ui";
import { useEffect } from "react";
import { useTasksListStore } from "../model/store";
import { TaskEditor } from "./TaskEditor";
import Link from "next/link";
import { Task } from "@/entities/task/ui/Task";

export const TasksList = () => {
  const tasks = useTasksListStore((state) => state.tasks);
  const isLoading = useTasksListStore((state) => state.isLoading);
  const openEditor = useTasksListStore((state) => state.openEditor);
  const fetchTasks = useTasksListStore((state) => state.fetchTasks);
  const deleteTask = useTasksListStore((state) => state.deleteTask);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  if (isLoading) {
    return (
      <div className="text-center text-2xl font-bold text-gray-500 dark:text-gray-400">
        Loading tasks...
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="mb-4 flex justify-end">
        <Button onClick={() => openEditor()}>New Task</Button>
      </div>
      <div data-testid="tasks-list" className="space-y-4">
        {tasks.length === 0 && (
          <Card>
            <div className="text-center text-2xl font-bold text-gray-500 dark:text-gray-400">
              No tasks
            </div>
          </Card>
        )}
        {tasks.map((task) => (
          <Link
            key={task.id}
            href={`/tasks/${task.id}`}
            className="block transition-transform hover:scale-[1.02]"
          >
            <Task task={task} />
          </Link>
        ))}
      </div>
      <TaskEditor />
    </div>
  );
};
