import { useTasksListStore } from "../model/store";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form, Input, Label, Textarea } from "@/shared/ui";
import { FormField, Dialog } from "@/shared/ui";
import { taskFormSchema, type TaskFormValues } from "../model/schema";

export const CreateTaskDialog = () => {
  const isOpen = useTasksListStore((state) => state.isEditorOpen);
  const closeEditor = useTasksListStore((state) => state.closeEditor);
  const createTask = useTasksListStore((state) => state.createTask);

  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const handleSubmit = async (values: TaskFormValues) => {
    await createTask(values);
    form.reset();
    closeEditor();
  };

  return (
    <Dialog isOpen={isOpen} onClose={closeEditor} title="Create New Task">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-4 p-6"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" {...field} placeholder="Task title" />
              </div>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  {...field}
                  placeholder="Task description"
                  className="resize-none"
                />
              </div>
            )}
          />

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={closeEditor}>
              Cancel
            </Button>
            <Button type="submit" disabled={form.formState.isSubmitting}>
              Create Task
            </Button>
          </div>
        </form>
      </Form>
    </Dialog>
  );
};
