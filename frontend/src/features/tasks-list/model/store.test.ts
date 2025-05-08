import { useTasksListStore } from "./store";
import { tasksApi } from "@/entities/task";
import { faker } from "@faker-js/faker";

jest.mock("../../../entities/task/api/tasksApi", () => ({
  tasksApi: {
    create: jest.fn(),
  },
}));

describe("TasksListStore", () => {
  beforeEach(() => {
    useTasksListStore.setState({
      tasks: Array.from({ length: 3 }, () => ({
        id: faker.string.uuid(),
        title: faker.lorem.sentence(),
        status: faker.helpers.arrayElement(["TODO", "COMPLETED", "PAUSED"]),
        time: faker.number.int({ min: 0, max: 3000 }),
        description: faker.lorem.sentence(),
      })),
      isEditorOpen: false,
      openEditor: useTasksListStore.getState().openEditor,
      closeEditor: useTasksListStore.getState().closeEditor,
      createTask: useTasksListStore.getState().createTask,
    });

    // Clear all mocks
    jest.clearAllMocks();
  });

  describe("modal state", () => {
    it("should start with editor closed", () => {
      expect(useTasksListStore.getState().isEditorOpen).toBe(false);
    });

    it("should open creator", () => {
      useTasksListStore.getState().openEditor();
      expect(useTasksListStore.getState().isEditorOpen).toBe(true);
    });

    it("should close creator", () => {
      // open it
      useTasksListStore.getState().openEditor();
      expect(useTasksListStore.getState().isEditorOpen).toBe(true);

      // then close it
      useTasksListStore.getState().closeEditor();
      expect(useTasksListStore.getState().isEditorOpen).toBe(false);
    });
  });

  describe("tasks state", () => {
    it("should start with mock tasks", () => {
      const tasks = useTasksListStore.getState().tasks;
      expect(tasks).toHaveLength(3); // based on mock data
    });
  });

  describe("task creation", () => {
    const newTaskData = {
      title: "New Task",
      description: "Task Description",
    };

    const mockCreatedTask = {
      id: "new-task-id",
      title: newTaskData.title,
      description: newTaskData.description,
      status: "todo",
      time: 0,
    };

    beforeEach(() => {
      (tasksApi.create as jest.Mock).mockResolvedValue(mockCreatedTask);
    });

    it("should create a new task", async () => {
      await useTasksListStore.getState().createTask(newTaskData);
      expect(tasksApi.create).toHaveBeenCalledWith(newTaskData);
    });

    it("should close creator after successful task creation", async () => {
      // open the creator
      useTasksListStore.getState().openEditor();
      expect(useTasksListStore.getState().isEditorOpen).toBe(true);

      // Create task
      await useTasksListStore.getState().createTask(newTaskData);

      // Creator should be closed
      expect(useTasksListStore.getState().isEditorOpen).toBe(false);
    });

    it("should add the new task to the tasks list", async () => {
      const initialTasksCount = useTasksListStore.getState().tasks.length;

      await useTasksListStore.getState().createTask(newTaskData);

      const newTasksCount = useTasksListStore.getState().tasks.length;
      expect(newTasksCount).toBe(initialTasksCount + 1);

      const lastTask = useTasksListStore.getState().tasks[newTasksCount - 1];
      expect(lastTask).toEqual(mockCreatedTask);
    });

    it("should handle task creation error", async () => {
      const error = new Error("Failed to create task");
      (tasksApi.create as jest.Mock).mockRejectedValue(error);

      const consoleSpy = jest.spyOn(console, "error").mockImplementation();
      await useTasksListStore.getState().createTask(newTaskData);
      expect(consoleSpy).toHaveBeenCalledWith("Failed to create task:", error);
      consoleSpy.mockRestore();
    });
  });
});
