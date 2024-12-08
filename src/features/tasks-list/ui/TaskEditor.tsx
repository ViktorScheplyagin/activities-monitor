import { Button, Modal } from "@/shared/ui";
import { useTasksListStore } from "../model/store";

export const TaskEditor = () => {
  const isEditorOpen = useTasksListStore((state) => state.isEditorOpen);
  const isLoading = useTasksListStore((state) => state.isLoading);
  const closeEditor = useTasksListStore((state) => state.closeEditor);
  const createTask = useTasksListStore((state) => state.createTask);
  const editTask = useTasksListStore((state) => state.editTask);
  const editingTask = useTasksListStore((state) => state.editingTask);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;

    if (editingTask) {
      editTask(editingTask.id, { title, description });
    } else {
      createTask({ title, description });
    }
  };

  return (
    <Modal
      isOpen={isEditorOpen}
      onClose={closeEditor}
      title={editingTask ? "Edit Task" : "Create New Task"}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Task name
            <input
              type="text"
              name="title"
              defaultValue={editingTask?.title}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Description
            <textarea
              name="description"
              defaultValue={editingTask?.description}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              rows={3}
            />
          </label>
        </div>
        <div className="flex justify-end space-x-2">
          <Button onClick={closeEditor} disabled={isLoading} type="button">
            Cancel
          </Button>
          <Button isLoading={isLoading} type="submit">
            Save Changes
          </Button>
        </div>
      </form>
    </Modal>
  );
};
