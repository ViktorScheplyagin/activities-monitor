import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Textarea,
  Button,
  Input,
  Form,
  FormFieldControlled,
} from "@/shared/ui";

import { taskSchema, type TaskFormValues } from "../model/schema";
import { useEffect } from "react";

interface Props {
  defaultValues?: Partial<TaskFormValues>;
  onSubmit: (values: TaskFormValues) => Promise<void>;
  // Slot for custom actions/buttons
  actions?: (formState: {
    isDirty: boolean;
    isSubmitting: boolean;
  }) => React.ReactNode;
  // Default actions configuration (optional)
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
  }, [defaultValues]);

  const renderDefaultActions = () => (
    <div className="flex justify-end gap-4">
      {defaultActions?.onCancel && (
        <Button
          type="button"
          variant="outline"
          onClick={defaultActions.onCancel}
        >
          {defaultActions.cancelText || "Cancel"}
        </Button>
      )}
      <Button type="submit">
        {defaultActions?.submitText || "Save Changes"}
      </Button>
    </div>
  );

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow"
      >
        <FormFieldControlled
          control={form.control}
          name="title"
          label="Title"
          InputComponent={Input}
          inputProps={{ placeholder: "Task title" }}
        />

        <FormFieldControlled
          control={form.control}
          name="description"
          label="Description"
          InputComponent={Textarea}
          inputProps={{
            placeholder: "Task description",
            className: "resize-none",
          }}
        />

        {actions
          ? actions({
              isDirty: form.formState.isDirty,
              isSubmitting: form.formState.isSubmitting,
            })
          : renderDefaultActions()}
      </form>
    </Form>
  );
};
