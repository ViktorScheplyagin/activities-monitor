import { Button, Modal } from "@/shared/ui";
import { useTasksListStore } from "../model/store";

export const TaskCreator = () => {
  const isCreatorOpen = useTasksListStore((state) => state.isCreatorOpen);
  const isCreatorLoading = useTasksListStore((state) => state.isCreatorLoading);
  const closeCreator = useTasksListStore((state) => state.closeCreator);
  const createTask = useTasksListStore((state) => state.createTask);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: use react-hook-form
    const formData = new FormData(e.target as HTMLFormElement);
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    createTask({ title, description });
  };

  return (
    <Modal
      isOpen={isCreatorOpen}
      onClose={closeCreator}
      title="Create New Task"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Task name
            <input
              type="text"
              name="title"
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
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              rows={3}
            />
          </label>
        </div>
        <div className="flex justify-end space-x-2">
          <Button
            onClick={closeCreator}
            disabled={isCreatorLoading}
            type="submit"
          >
            Cancel
          </Button>
          <Button isLoading={isCreatorLoading} type="submit">
            Create
          </Button>
        </div>
      </form>
    </Modal>
  );
};
