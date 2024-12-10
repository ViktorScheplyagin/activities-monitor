"use client";
import { Timer } from "@/features/timer";
import { TaskDetailsForm } from "@/features/task-form";
import { Button, Card } from "@/shared/ui";
import { useRouter } from "next/navigation";
import { useTask } from "../model/use-task";

interface Props {
  id: string;
}

export const TaskPage = ({ id }: Props) => {
  const router = useRouter();
  const { task, handleSubmit, isSubmitting } = useTask(id);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
      <div className="flex-1 flex gap-8 justify-center items-start p-8">
        <div className="w-1/3">
          <Timer />
        </div>
        <div className="w-1/2">
          <Card>
            <TaskDetailsForm
              defaultValues={task || undefined}
              onSubmit={handleSubmit}
              actions={({ isDirty }) => (
                <div className="flex justify-between items-center">
                  <Button
                    type="button"
                    variant="link"
                    className="text-gray-600 hover:text-gray-800"
                    onClick={() => router.push("/")}
                  >
                    ← Back to Tasks
                  </Button>
                  {isDirty && (
                    <Button
                      isLoading={isSubmitting}
                      disabled={isSubmitting}
                      type="submit"
                    >
                      Save Changes
                    </Button>
                  )}
                </div>
              )}
            />
          </Card>
        </div>
      </div>
    </div>
  );
};
