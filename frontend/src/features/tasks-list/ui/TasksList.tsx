import { Card } from "@/shared/ui/neomorphic";
import Link from "next/link";
import { Task } from "@/entities/task/ui/Task";
import { useTasksList } from "../model/use-tasks-list";
import { Separator } from "@/shared/ui/neomorphic";
import { formatDate } from "../lib/format-date";
import { sortTasksByDate, groupTasksByDate } from "../lib/tasks-grouping";

interface TasksListProps {
    showCompleted?: boolean;
}

export const TasksList = ({ showCompleted = false }: TasksListProps) => {
    const { tasks, isLoading, allTags, selectedTags, toggleTag } =
        useTasksList();

    if (isLoading) {
        return (
            <div className="text-center text-2xl font-bold text-gray-500 dark:text-gray-400">
                Loading tasks...
            </div>
        );
    }

    const filteredTasks = tasks.filter((task) => {
        const statusMatch = showCompleted
            ? task.status === "done"
            : task.status === "in-progress";

        const tagsMatch =
            selectedTags.length === 0 ||
            selectedTags.some((tagId) => task.tags?.includes(tagId));

        return statusMatch && tagsMatch;
    });

    const sortedTasks = sortTasksByDate(filteredTasks);
    const groupedTasks = groupTasksByDate(sortedTasks);

    return (
        <div className="flex flex-col gap-4">
            <div data-testid="tasks-list" className="space-y-4">
                {filteredTasks.length === 0 && (
                    <Card>
                        <div className="text-center text-2xl font-bold text-foreground dark:text-gray-400">
                            {showCompleted ? "No completed tasks" : "No tasks"}
                        </div>
                    </Card>
                )}
                {Object.entries(groupedTasks).map(([date, dateTasks]) => {
                    const firstTask = dateTasks[0];
                    const displayDate = new Date(
                        firstTask.updatedAt || firstTask.createdAt
                    );

                    return (
                        <div key={date}>
                            <div className="flex items-center justify-center gap-4 my-6">
                                <div className="flex-grow">
                                    <Separator />
                                </div>
                                <span className="text-sm font-medium text-foreground whitespace-nowrap">
                                    {formatDate(displayDate)}
                                </span>
                                <div className="flex-grow">
                                    <Separator />
                                </div>
                            </div>
                            <div className="space-y-4">
                                {dateTasks.map((task) => (
                                    <Link
                                        key={task.id}
                                        href={`/tasks/${task.id}`}
                                        className="block"
                                    >
                                        <Task
                                            task={task}
                                            tags={allTags}
                                            onTagClick={toggleTag}
                                        />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
