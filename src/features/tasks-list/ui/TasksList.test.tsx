import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TasksList } from "./TasksList";
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

describe("TasksList", () => {
  let mockedTasks: TaskData[];
  let onTaskClick: jest.Mock;

  beforeEach(() => {
    mockedTasks = Array.from({ length: 5 }, () => ({
      id: faker.string.uuid(),
      title: faker.lorem.sentence(),
      status: faker.helpers.arrayElement(["todo", "completed", "paused"]),
      time: faker.number.int({ min: 0, max: 3000 }),
    }));
    onTaskClick = jest.fn();
  });

  it("should render 5 tasks", () => {
    render(<TasksList items={mockedTasks} onFocusChange={onTaskClick} />);
    const tasksList = screen.getByTestId("tasks-list");
    expect(tasksList.children).toHaveLength(mockedTasks.length);
  });

  it("should call onTaskClick with the correct id when a task is clicked", async () => {
    render(<TasksList items={mockedTasks} onFocusChange={onTaskClick} />);

    const task = screen.getByTestId(mockedTasks[0].id);

    await userEvent.click(task);
    expect(onTaskClick).toHaveBeenCalledWith(mockedTasks[0].id);
  });
});
