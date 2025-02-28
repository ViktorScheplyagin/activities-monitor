import { Card } from "@/shared/ui/neomorphic";
import { TaskData } from "../api/dto/task";
import { Trash2 } from "lucide-react";
import { formatSeconds } from "../lib/formatSeconds";
import { Badge } from "@/shared/ui/neomorphic";
import { Tag } from "@/entities/tag";

interface Props {
    task: TaskData;
    className?: string;
    tags: Tag[];
    onDeleteClick?: (taskId: string) => void;
    onTagClick?: (tagId: string) => void;
}

export const Task = ({
    task,
    tags,
    className,
    onDeleteClick,
    onTagClick,
}: Props) => {
    const taskTags = tags.filter((tag) => task.tags?.includes(tag.id));

    const handleDeleteClick = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent link navigation
        onDeleteClick?.(task.id);
    };

    const handleTagClick = (e: React.MouseEvent, tagId: string) => {
        e.preventDefault(); // Prevent link navigation
        onTagClick?.(tagId);
    };

    return (
        <Card
            className={`cursor-pointer hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors duration-500 ${className}`}
        >
            <div className="flex justify-between">
                <div>
                    <div className="flex items-center gap-2">
                        <h3 className="text-lg font-medium">{task.title}</h3>
                        {task.updatedAt && <Badge>updated</Badge>}
                    </div>
                    <p className="text-gray-500 dark:text-gray-400">
                        {task.description}
                    </p>
                    <div className="pt-4 text-gray-500 dark:text-gray-400">
                        Time spent: {formatSeconds(task.time)}
                    </div>
                    {taskTags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-4">
                            {taskTags.map((tag) => (
                                <Badge
                                    key={tag.id}
                                    variant="secondary"
                                    className="cursor-pointer"
                                    onClick={(e) => handleTagClick(e, tag.id)}
                                >
                                    #{tag.name}
                                </Badge>
                            ))}
                        </div>
                    )}
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
