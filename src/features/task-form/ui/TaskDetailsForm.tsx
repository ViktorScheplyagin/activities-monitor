import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea, Input, Form } from "@/shared/ui";
import { FormField } from "./FormField";
import { taskSchema, type TaskFormValues } from "../model/schema";
import { useEffect } from "react";
import { DefaultActions } from "./DefaultActions";

interface Props {
  defaultValues?: Partial<TaskFormValues>;
  onSubmit: (values: TaskFormValues) => Promise<void>;
  // Slot for custom actions/buttons
  actions?: (formState: {
    isDirty: boolean;
    isSubmitting: boolean;
  }) => React.ReactNode;
  defaultActions?: {
    onCancel?: () => void;
    submitText?: string;
    cancelText?: string;
  };
}

export const TaskDetailsForm = ({
  defaultValues,
  onSubmit,
  actions,
  defaultActions,
}: Props) => {
  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  useEffect(() => {
    if (defaultValues) {
      form.reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValues]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 p-6 rounded-lg shadow"
      >
        <FormField
          control={form.control}
          name="title"
          label="Title"
          InputComponent={Input}
          inputProps={{ placeholder: "Task title" }}
        />

        <FormField
          control={form.control}
          name="description"
          label="Description"
          InputComponent={Textarea}
          inputProps={{
            placeholder: "Task description",
            className: "resize-none",
          }}
        />

        {actions ? (
          actions({
            isDirty: form.formState.isDirty,
            isSubmitting: form.formState.isSubmitting,
          })
        ) : (
          <DefaultActions
            onCancel={defaultActions?.onCancel}
            cancelText={defaultActions?.cancelText}
            submitText={defaultActions?.submitText}
            isSubmitting={form.formState.isSubmitting}
          />
        )}
      </form>
    </Form>
  );
};
