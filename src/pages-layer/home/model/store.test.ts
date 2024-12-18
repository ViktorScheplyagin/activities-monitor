import { TaskData } from "@/entities/task";
import { useHomePageStore } from "./store";
import { faker } from "@faker-js/faker";

describe("HomePageStore", () => {
  let mockedTasks: TaskData[];

  beforeAll(() => {
    mockedTasks = Array.from({ length: 10 }, () => ({
      id: faker.string.uuid(),
      title: faker.lorem.sentence(),
      description: faker.lorem.paragraph(),
      status: faker.helpers.arrayElement([
        "inProgress",
        "completed",
        "todo",
        "paused",
      ]),
    }));

    useHomePageStore.setState({
      tasks: [],
      focusedTask: null,
    });
  });

  describe("setTasks", () => {
    it("should set the tasks correctly", () => {
      expect(useHomePageStore.getState().tasks).toEqual([]);
      useHomePageStore.getState().setTasks(mockedTasks);

      const storedTasks = useHomePageStore.getState().tasks;
      expect(storedTasks).toEqual(mockedTasks);
    });
  });

  describe("setActiveTask", () => {
    it("should set the active task", () => {
      const targetTask = mockedTasks[0];

      useHomePageStore.getState().setTasks(mockedTasks);
      useHomePageStore.getState().setFocusedTask(targetTask.id);

      const activeTask = useHomePageStore.getState().focusedTask;
      expect(activeTask).toEqual(targetTask);
    });
  });
});
