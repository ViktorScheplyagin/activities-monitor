import { Task } from "@/entities/task";
import { Button, Card } from "@/shared/ui";
import { useEffect, useState } from "react";
import { useTasksListStore } from "../model/store";
import { TaskCreator } from "./TaskCreator";

interface Props {
  onFocusChange: (id: string | null) => void;
}

export const TasksList = ({ onFocusChange }: Props) => {
  const [focusedTaskId, setFocusedTaskId] = useState<string | null>(null);
  const openCreator = useTasksListStore((state) => state.openCreator);
  const tasks = useTasksListStore((state) => state.tasks);
  const fetchTasks = useTasksListStore((state) => state.fetchTasks);
  const isLoading = useTasksListStore((state) => state.isLoading);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  useEffect(() => {
    onFocusChange(focusedTaskId);
  }, [focusedTaskId, onFocusChange]);

  const handleTaskClick = (id: string) => {
    const newId = id === focusedTaskId ? null : id;
    setFocusedTaskId(newId);
  };

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
        <Button onClick={openCreator}>New Task</Button>
      </div>
      <div data-testid="tasks-list">
        {tasks.length === 0 && (
          <Card>
            <div className="text-center text-2xl font-bold text-gray-500 dark:text-gray-400">
              No tasks
            </div>
          </Card>
        )}
        {tasks.map((task) => (
          <Task
            onClick={handleTaskClick}
            key={task.id}
            {...task}
            isFocused={task.id === focusedTaskId}
          />
        ))}
      </div>
      <TaskCreator />
    </div>
  );
};
