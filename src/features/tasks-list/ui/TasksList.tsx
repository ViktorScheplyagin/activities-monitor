import { TaskData, Task } from "@/entities/task";
import { useEffect, useState } from "react";

interface Props {
  items: TaskData[];
  onFocusChange: (id: string | null) => void;
}

export const TasksList = ({ items, onFocusChange }: Props) => {
  const [focusedTaskId, setFocusedTaskId] = useState<string | null>(null);

  useEffect(() => {
    onFocusChange(focusedTaskId);
  }, [focusedTaskId]);

  const handleTaskClick = (id: string) => {
    const newId = id === focusedTaskId ? null : id;
    setFocusedTaskId(newId);
  };

  return (
    <div data-testid="tasks-list">
      {items.map((item) => (
        <Task
          onClick={handleTaskClick}
          key={item.id}
          {...item}
          isFocused={item.id === focusedTaskId}
        />
      ))}
    </div>
  );
};
