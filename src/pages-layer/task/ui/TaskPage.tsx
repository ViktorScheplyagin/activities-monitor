"use client";
import { TimeAccumulator } from "@/features/time-accumulator";
import { TaskDetailsForm } from "@/features/task-form";
import { Button, Card } from "@/shared/ui/neomorphic";
import { useTask } from "../model/use-task";
import { Timer } from "@/features/timer";
import { DeleteTaskDialog } from "@/features/tasks-list";
import { useState } from "react";
import { useTimerNotification } from "@/features/notification";
import { TaskMenu } from "./TaskMenu";
interface Props {
    id: string;
}

export const TaskPage = ({ id }: Props) => {
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const {
        task,
        handleSubmit,
        handleDelete,
        handleStatusChange,
        isSubmitting,
        isDeleting,
    } = useTask(id);

    useTimerNotification({
        title: "Pomodoro завершён!",
    });

    const onDeleteConfirm = async () => {
        await handleDelete();
        setIsDeleteDialogOpen(false);
    };

    return (
        <>
            <div className="flex flex-col lg:flex-row gap-8 justify-center items-start">
                <div className="w-full lg:w-1/3">
                    <Timer />
                </div>
                <div className="w-full lg:w-2/3">
                    <Card className="space-y-6">
                        <div className="flex justify-between items-end lg:items-center">
                            <TimeAccumulator
                                taskId={id}
                                initialTime={task?.time}
                            />

                            <TaskMenu
                                status={task?.status || "in-progress"}
                                onStatusChange={handleStatusChange}
                                onDeleteClick={() => {
                                    setIsDeleteDialogOpen(true);
                                }}
                                disabled={isDeleting}
                            />
                        </div>
                        <TaskDetailsForm
                            defaultValues={task || undefined}
                            onSubmit={handleSubmit}
                            actions={({ isDirty }) => (
                                <Button
                                    isLoading={isSubmitting}
                                    disabled={isSubmitting || !isDirty}
                                    type="submit"
                                >
                                    Save Changes
                                </Button>
                            )}
                        />
                    </Card>
                </div>
            </div>
            <DeleteTaskDialog
                isOpen={isDeleteDialogOpen}
                onClose={() => setIsDeleteDialogOpen(false)}
                onConfirm={onDeleteConfirm}
            />
        </>
    );
};
