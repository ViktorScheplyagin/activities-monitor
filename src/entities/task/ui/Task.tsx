import { Card } from "@/shared/ui";
import { TaskData } from "../api/dto/task";

interface Props {
  task: TaskData;
  className?: string;
}

export const Task = ({ task, className }: Props) => {
  return (
    <Card
      className={`cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 ${className}`}
    >
      <div className="p-4">
        <h3 className="text-lg font-medium">{task.title}</h3>
        <p className="text-gray-500 dark:text-gray-400">{task.description}</p>
      </div>
    </Card>
  );
};
