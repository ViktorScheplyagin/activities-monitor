"use client";
import { TimeAccumulator } from "@/features/time-accumulator";
import { TaskDetailsForm } from "@/features/task-form";
import { Button, Card } from "@/shared/ui/neomorphic";
import { useTask } from "../model/use-task";
import { Timer } from "@/features/timer";
import { useTimerNotification } from "@/features/notification";
import { TaskMenu } from "./TaskMenu";
import { TagsCombobox } from "@/features/tags";
import { TaskDelete } from "@/features/task-delete";
import { useTaskDelete } from "@/features/task-delete";
import { useRouter } from "next/navigation";

interface Props {
  id: string;
}

export const TaskPage = ({ id }: Props) => {
  const { task, handleSubmit, handleStatusChange, isSubmitting } = useTask(id);

  const router = useRouter();
  const { openDialogFor } = useTaskDelete({
    onTaskDelete: () => router.push("/"),
  });

  useTimerNotification({
    title: "Pomodoro завершён!",
  });

  return (
    <div className="flex flex-col lg:flex-row gap-8 justify-center items-start">
      <div className="w-full lg:w-1/3">
        <Timer task={task || undefined} />
      </div>
      <div className="w-full lg:w-2/3">
        <Card className="space-y-6">
          <div className="flex justify-between items-end lg:items-center">
            <TimeAccumulator taskId={id} initialTime={task?.time} />

            <TaskMenu
              status={task?.status || "in-progress"}
              onStatusChange={handleStatusChange}
              onDeleteClick={() => {
                openDialogFor(id);
              }}
            />
          </div>
          <TaskDetailsForm
            defaultValues={task || undefined}
            onSubmit={handleSubmit}
            actions={({ isDirty, form }) => (
              <>
                <TagsCombobox
                  selectedTagIds={form.watch("tags")}
                  onTagsChange={(tags) =>
                    form.setValue("tags", tags, {
                      shouldDirty: true,
                    })
                  }
                />
                <Button
                  isLoading={isSubmitting}
                  disabled={isSubmitting || !isDirty}
                  type="submit"
                >
                  Save Changes
                </Button>
              </>
            )}
          />
        </Card>
      </div>
      <TaskDelete />
    </div>
  );
};
