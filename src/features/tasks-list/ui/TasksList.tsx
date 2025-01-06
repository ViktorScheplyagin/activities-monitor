import { Button, Card } from "@/shared/ui/neomorphic";
import { DeleteTaskDialog } from "./DeleteTaskDialog";
import Link from "next/link";
import { Task } from "@/entities/task/ui/Task";
import { useTasksList } from "../model/use-tasks-list";
import { CreateTaskDialog } from "./CreateTaskDialog";

export const TasksList = () => {
    const {
        tasks,
        isLoading,
        openEditor,
        taskIdToDelete,
        handleDeleteClick,
        handleDeleteConfirm,
        handleDeleteCancel,
    } = useTasksList();

    if (isLoading) {
        return (
            <div className="text-center text-2xl font-bold text-gray-500 dark:text-gray-400">
                Loading tasks...
            </div>
        );
    }

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
                {tasks.map((task) => (
                    <Link
                        key={task.id}
                        href={`/tasks/${task.id}`}
                        className="block"
                    >
                        <Task task={task} onDeleteClick={handleDeleteClick} />
                    </Link>
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
