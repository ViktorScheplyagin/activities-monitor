import { Button, Dialog } from "@/shared/ui";
import { useTasksListStore } from "../model/store";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TaskFormValues, taskFormSchema } from "../model/schema";
import { Form } from "@/shared/ui/form";
import { FormField } from "./FormField";
import { useEffect } from "react";

export const TaskEditor = () => {
  const isEditorOpen = useTasksListStore((state) => state.isEditorOpen);
  const isLoading = useTasksListStore((state) => state.isLoading);
  const closeEditor = useTasksListStore((state) => state.closeEditor);
  const createTask = useTasksListStore((state) => state.createTask);
  const editTask = useTasksListStore((state) => state.editTask);
  const editingTask = useTasksListStore((state) => state.editingTask);

  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  useEffect(() => {
    if (isEditorOpen) {
      form.reset({
        title: editingTask?.title || "",
        description: editingTask?.description || "",
      });
    }
  }, [isEditorOpen]);

  const onSubmit = (data: TaskFormValues) => {
    if (editingTask) {
      editTask(editingTask.id, data);
    } else {
      createTask(data);
    }
  };

  return (
    <Dialog
      isOpen={isEditorOpen}
      onClose={closeEditor}
      title={editingTask ? "Edit Task" : "Create New Task"}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField control={form.control} name="title" label="Task name" />

          <FormField
            control={form.control}
            name="description"
            label="Description"
            type="textarea"
          />

          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={closeEditor}
              disabled={isLoading}
              type="button"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading} isLoading={isLoading}>
              Save Changes
            </Button>
          </div>
        </form>
      </Form>
    </Dialog>
  );
};
