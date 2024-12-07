import { useTasksListStore } from "./store";
import { tasksApi } from "../api/tasksApi";
import { faker } from "@faker-js/faker";

jest.mock("../api/tasksApi", () => ({
  tasksApi: {
    createTask: jest.fn(),
  },
}));

describe("TasksListStore", () => {
  beforeEach(() => {
    useTasksListStore.setState({
      tasks: Array.from({ length: 3 }, () => ({
        id: faker.string.uuid(),
        title: faker.lorem.sentence(),
        status: faker.helpers.arrayElement(["todo", "completed", "paused"]),
        time: faker.number.int({ min: 0, max: 3000 }),
        description: faker.lorem.sentence(),
      })),
      isCreatorOpen: false,
      openCreator: useTasksListStore.getState().openCreator,
      closeCreator: useTasksListStore.getState().closeCreator,
      createTask: useTasksListStore.getState().createTask,
    });

    // Clear all mocks
    jest.clearAllMocks();
  });

  describe("modal state", () => {
    it("should start with creator closed", () => {
      expect(useTasksListStore.getState().isCreatorOpen).toBe(false);
    });

    it("should open creator", () => {
      useTasksListStore.getState().openCreator();
      expect(useTasksListStore.getState().isCreatorOpen).toBe(true);
    });

    it("should close creator", () => {
      // open it
      useTasksListStore.getState().openCreator();
      expect(useTasksListStore.getState().isCreatorOpen).toBe(true);

      // then close it
      useTasksListStore.getState().closeCreator();
      expect(useTasksListStore.getState().isCreatorOpen).toBe(false);
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
      (tasksApi.createTask as jest.Mock).mockResolvedValue(mockCreatedTask);
    });

    it("should create a new task", async () => {
      await useTasksListStore.getState().createTask(newTaskData);
      expect(tasksApi.createTask).toHaveBeenCalledWith(newTaskData);
    });

    it("should close creator after successful task creation", async () => {
      // open the creator
      useTasksListStore.getState().openCreator();
      expect(useTasksListStore.getState().isCreatorOpen).toBe(true);

      // Create task
      await useTasksListStore.getState().createTask(newTaskData);

      // Creator should be closed
      expect(useTasksListStore.getState().isCreatorOpen).toBe(false);
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
      (tasksApi.createTask as jest.Mock).mockRejectedValue(error);

      const consoleSpy = jest.spyOn(console, "error").mockImplementation();
      await useTasksListStore.getState().createTask(newTaskData);
      expect(consoleSpy).toHaveBeenCalledWith("Failed to create task:", error);
      consoleSpy.mockRestore();
    });
  });
});
