import { Card } from "@/shared/ui";
import { TaskData } from "../api/dto/task";
import { Trash2 } from "lucide-react";

interface Props {
  task: TaskData;
  className?: string;
  onDeleteClick?: (taskId: string) => void;
}

export const Task = ({ task, className, onDeleteClick }: Props) => {
  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent link navigation
    onDeleteClick?.(task.id);
  };

  return (
    <Card
      className={`cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 ${className}`}
    >
      <div className="p-4 flex justify-between items-start">
        <div>
          <h3 className="text-lg font-medium">{task.title}</h3>
          <p className="text-gray-500 dark:text-gray-400">{task.description}</p>
        </div>
        {onDeleteClick && (
          <button
            onClick={handleDeleteClick}
            className="p-2 text-gray-500 hover:text-red-500 transition-colors"
            aria-label="Delete task"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        )}
      </div>
    </Card>
  );
};
