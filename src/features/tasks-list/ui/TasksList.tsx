import { Button, Card } from "@/shared/ui/neomorphic";
import { DeleteTaskDialog } from "./DeleteTaskDialog";
import Link from "next/link";
import { Task } from "@/entities/task/ui/Task";
import { useTasksList } from "../model/use-tasks-list";
import { CreateTaskDialog } from "./CreateTaskDialog";
import { Separator } from "@/shared/ui/neomorphic";
import { formatDate } from "../lib/format-date";
import { sortTasksByDate, groupTasksByDate } from "../lib/tasks-grouping";

export const TasksList = () => {
    const {
        tasks,
        isLoading,
        openEditor,
        taskIdToDelete,
        handleDeleteClick,
        handleDeleteCancel,
        handleDeleteConfirm,
    } = useTasksList();

    if (isLoading) {
        return (
            <div className="text-center text-2xl font-bold text-gray-500 dark:text-gray-400">
                Loading tasks...
            </div>
        );
    }

    const sortedTasks = sortTasksByDate(tasks);
    const groupedTasks = groupTasksByDate(sortedTasks);

    return (
        <div className="flex flex-col gap-4">
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
                {Object.entries(groupedTasks).map(([date, dateTasks]) => (
                    <div key={date}>
                        <div className="flex items-center justify-center gap-4 my-6">
                            <div className="flex-grow">
                                <Separator />
                            </div>
                            <span className="text-sm font-medium text-gray-500 whitespace-nowrap">
                                {formatDate(new Date(date))}
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
                                        onDeleteClick={handleDeleteClick}
                                    />
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <CreateTaskDialog />
            <DeleteTaskDialog
                isOpen={taskIdToDelete !== null}
                onClose={handleDeleteCancel}
                onConfirm={handleDeleteConfirm}
            />
        </div>
    );
};
