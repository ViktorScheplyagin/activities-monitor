import { Task } from "@/entities/task";
import { Button, Card } from "@/shared/ui";
import { useEffect, useState } from "react";
import { useTasksListStore } from "../model/store";
import { TaskEditor } from "./TaskEditor";

interface Props {
  onFocusChange: (id: string | null) => void;
}

export const TasksList = ({ onFocusChange }: Props) => {
  const [focusedTaskId, setFocusedTaskId] = useState<string | null>(null);

  const tasks = useTasksListStore((state) => state.tasks);
  const isLoading = useTasksListStore((state) => state.isLoading);
  const openEditor = useTasksListStore((state) => state.openEditor);
  const fetchTasks = useTasksListStore((state) => state.fetchTasks);
  const deleteTask = useTasksListStore((state) => state.deleteTask);

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

  const handleEditTask = (id: string) => {
    const task = tasks.find((t) => t.id === id);
    if (task) {
      openEditor(task);
    }
  };

  const handleDeleteTask = async (id: string) => {
    await deleteTask(id);
    if (focusedTaskId === id) {
      setFocusedTaskId(null);
    }
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
        <Button onClick={() => openEditor()}>New Task</Button>
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
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
            key={task.id}
            {...task}
            isFocused={task.id === focusedTaskId}
          />
        ))}
      </div>
      <TaskEditor />
    </div>
  );
};
