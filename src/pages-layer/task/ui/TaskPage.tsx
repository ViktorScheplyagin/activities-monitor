"use client";
import { TimeAccumulator } from "@/features/time-accumulator";
import { TaskDetailsForm } from "@/features/task-form";
import { Button, Card } from "@/shared/ui";
import { useTask } from "../model/use-task";
import { Timer } from "@/features/timer";
import { DeleteTaskDialog } from "@/features/tasks-list";
import { useState } from "react";
import { useTimerNotification } from "@/features/notification";

interface Props {
  id: string;
}

export const TaskPage = ({ id }: Props) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { task, handleSubmit, handleDelete, isSubmitting, isDeleting } =
    useTask(id);

  useTimerNotification({
    title: "Pomodoro завершён!",
  });

  const onDeleteConfirm = async () => {
    await handleDelete();
    setIsDeleteDialogOpen(false);
  };

  return (
    <>
      <div className="flex-1 flex gap-8 justify-center items-start p-8">
        <div className="w-1/3">
          <Timer />
        </div>
        <div className="w-1/2 space-y-4">
          <div className="flex justify-between items-center">
            <TimeAccumulator taskId={id} initialTime={task?.time} />
            <Button
              variant="destructive"
              onClick={() => setIsDeleteDialogOpen(true)}
              disabled={isDeleting}
              isLoading={isDeleting}
            >
              Delete task
            </Button>
          </div>
          <Card>
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
