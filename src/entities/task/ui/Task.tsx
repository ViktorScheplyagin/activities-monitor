import { TaskData } from "../api/dto/task";
import { formatSeconds } from "../lib/formatSeconds";
import { Badge, Card } from "@/shared/ui/neomorphic";
import { Tag } from "@/entities/tag";
import { cn } from "@/lib/utils";

interface Props {
    task: TaskData;
    className?: string;
    tags: Tag[];
    onTagClick?: (tagId: string) => void;
}

export const Task = ({ task, tags, className, onTagClick }: Props) => {
    const taskTags = tags.filter((tag) => task.tags?.includes(tag.id));

    const handleTagClick = (e: React.MouseEvent, tagId: string) => {
        e.preventDefault(); // Prevent link navigation
        onTagClick?.(tagId);
    };

    return (
        <Card
            className={cn(
                "bg-[hsl(0,_0%,_88%)] dark:bg-card cursor-pointer transition-all duration-300",
                "hover:shadow-lifted",
                className
            )}
        >
            <div className="flex justify-between">
                <div>
                    <div className="flex items-center gap-2">
                        <h3 className="text-lg font-medium">{task.title}</h3>
                        {task.updatedAt && <Badge>updated</Badge>}
                    </div>
                    <p className="text-foreground dark:text-gray-400">
                        {task.description}
                    </p>
                    <div className="pt-4 text-foreground dark:text-gray-400">
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
            </div>
        </Card>
    );
};
