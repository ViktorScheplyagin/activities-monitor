import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TasksList } from "./TasksList";
import { useTasksListStore } from "../model/store";
import { TaskData } from "@/entities/task";
import { faker } from "@faker-js/faker";

jest.mock("../../../entities/task", () => ({
  Task: (props: TaskData & { onClick: (id: string) => void }) => {
    return (
      <div data-testid={props.id} onClick={() => props.onClick(props.id)}>
        {props.title}
      </div>
    );
  },
}));

jest.mock("../api/tasksApi", () => ({
  tasksApi: {
    fetchTasks: jest.fn().mockResolvedValue([]),
  },
}));

describe("TasksList", () => {
  let mockedTasks: TaskData[];
  let onTaskClick: jest.Mock;

  beforeEach(() => {
    mockedTasks = Array.from({ length: 5 }, () => ({
      id: faker.string.uuid(),
      title: faker.lorem.sentence(),
      status: faker.helpers.arrayElement(["todo", "completed", "paused"]), // TODO: test inProgress
      time: faker.number.int({ min: 0, max: 3000 }),
      description: faker.lorem.sentence(),
    }));
    onTaskClick = jest.fn();

    // Initialize the store with mocked values
    useTasksListStore.setState({
      tasks: mockedTasks,
      isLoading: false,
      isCreatorOpen: false,
      openCreator: jest.fn(),
      closeCreator: jest.fn(),
      createTask: jest.fn(),
      fetchTasks: jest.fn(),
    });
  });

  it("should render 5 tasks", () => {
    render(<TasksList onFocusChange={onTaskClick} />);
    const tasksList = screen.getByTestId("tasks-list");
    expect(tasksList.children).toHaveLength(mockedTasks.length);
  });

  it("should call onTaskClick with the correct id when a task is clicked", async () => {
    render(<TasksList onFocusChange={onTaskClick} />);

    const task = screen.getByTestId(mockedTasks[0].id);
    await userEvent.click(task);
    expect(onTaskClick).toHaveBeenCalledWith(mockedTasks[0].id);
  });

  it("should open creator modal when 'New Task' button is clicked", async () => {
    const openCreator = jest.fn();
    useTasksListStore.setState({
      ...useTasksListStore.getState(),
      openCreator,
    });
    render(<TasksList onFocusChange={onTaskClick} />);

    const newTaskButton = screen.getByText("New Task");
    await userEvent.click(newTaskButton);
    expect(openCreator).toHaveBeenCalled();
  });
});
