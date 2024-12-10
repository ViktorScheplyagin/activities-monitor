import { Dialog } from "@/shared/ui/dialog";
import { useTasksListStore } from "../model/store";
import { TaskDetailsForm } from "@/features/task-form";
import type { TaskFormValues } from "@/features/task-form";

export const TaskEditor = () => {
  const isOpen = useTasksListStore((state) => state.isEditorOpen);
  const editingTask = useTasksListStore((state) => state.editingTask);
  const closeEditor = useTasksListStore((state) => state.closeEditor);
  const createTask = useTasksListStore((state) => state.createTask);
  const editTask = useTasksListStore((state) => state.editTask);

  const handleSubmit = async (values: TaskFormValues) => {
    if (editingTask) {
      await editTask(editingTask.id, values);
    } else {
      await createTask(values);
    }
  };

  return (
    <Dialog isOpen={isOpen} onClose={closeEditor}>
      <TaskDetailsForm
        defaultValues={editingTask || undefined}
        onSubmit={handleSubmit}
        defaultActions={{
          onCancel: closeEditor,
          submitText: editingTask ? "Save Changes" : "Create Task",
          cancelText: "Cancel",
        }}
      />
    </Dialog>
  );
};
