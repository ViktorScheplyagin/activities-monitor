"use client";
import { TimeAccumulator } from "@/features/time-accumulator";
import { TaskDetailsForm } from "@/features/task-form";
import { Button, Card } from "@/shared/ui";
import { useTask } from "../model/use-task";
import { Timer } from "@/features/timer";

interface Props {
  id: string;
}

export const TaskPage = ({ id }: Props) => {
  const { task, handleSubmit, isSubmitting } = useTask(id);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
      <div className="flex-1 flex gap-8 justify-center items-start p-8">
        <div className="w-1/3">
          <Timer />
        </div>
        <div className="w-1/2 space-y-4">
          <TimeAccumulator taskId={id} initialTime={task?.time} />
          <Card>
            <TaskDetailsForm
              defaultValues={task || undefined}
              onSubmit={handleSubmit}
              actions={({ isDirty }) =>
                isDirty && (
                  <Button
                    isLoading={isSubmitting}
                    disabled={isSubmitting}
                    type="submit"
                  >
                    Save Changes
                  </Button>
                )
              }
            />
          </Card>
        </div>
      </div>
    </div>
  );
};
