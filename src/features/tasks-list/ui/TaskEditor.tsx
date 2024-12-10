import { Dialog } from "@/shared/ui/dialog";
import { useTasksListStore } from "../model/store";
import { TaskDetailsForm } from "@/features/task-form";
import type { TaskFormValues } from "@/features/task-form";

export const TaskEditor = () => {
  const isOpen = useTasksListStore((state) => state.isEditorOpen);
  const closeEditor = useTasksListStore((state) => state.closeEditor);
  const createTask = useTasksListStore((state) => state.createTask);

  const handleSubmit = async (values: TaskFormValues) => {
    await createTask(values);
    closeEditor();
  };

  return (
    <Dialog isOpen={isOpen} onClose={closeEditor} title="Create New Task">
      <TaskDetailsForm
        onSubmit={handleSubmit}
        defaultActions={{
          onCancel: closeEditor,
          submitText: "Create Task",
          cancelText: "Cancel",
        }}
      />
    </Dialog>
  );
};
