import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TasksList } from "./TasksList";
import { useTasksListStore } from "../model/store";
import { TaskData } from "@/entities/task";
import { faker } from "@faker-js/faker";

jest.mock("../../../entities/task");

jest.mock("../../../entities/task/api/tasksApi", () => ({
  tasksApi: {
    getAll: jest.fn().mockResolvedValue([]),
  },
}));

describe("TasksList", () => {
  let mockedTasks: TaskData[];

  beforeEach(() => {
    mockedTasks = Array.from({ length: 5 }, () => ({
      id: faker.string.uuid(),
      title: faker.lorem.sentence(),
      status: faker.helpers.arrayElement([
        "TODO",
        "IN_PROGRESS",
        "COMPLETED",
        "PAUSED",
      ]),
      time: faker.number.int({ min: 0, max: 3000 }),
      description: faker.lorem.sentence(),
    }));

    // Initialize the store with mocked values
    useTasksListStore.setState({
      tasks: mockedTasks,
      isLoading: false,
      isEditorOpen: false,
      openEditor: jest.fn(),
      closeEditor: jest.fn(),
      createTask: jest.fn(),
      fetchTasks: jest.fn(),
    });
  });

  it("should render 5 tasks", () => {
    render(<TasksList />);
    const tasksList = screen.getByTestId("tasks-list");
    expect(tasksList.children).toHaveLength(mockedTasks.length);
  });

  it("should redirect to task details page when task is clicked", async () => {
    render(<TasksList />);

    // task is wrapped in Link component
    const taskLink = screen.getByRole("link", {
      name: `${mockedTasks[0].title} ${mockedTasks[0].description}`,
    });
    expect(taskLink).toHaveAttribute("href", `/tasks/${mockedTasks[0].id}`);
  });

  it("should open editor modal when 'New Task' button is clicked", async () => {
    const openEditor = jest.fn();
    useTasksListStore.setState({
      ...useTasksListStore.getState(),
      openEditor,
    });
    render(<TasksList />);

    const newTaskButton = screen.getByText("New Task");
    await userEvent.click(newTaskButton);
    expect(openEditor).toHaveBeenCalled();
  });
});
