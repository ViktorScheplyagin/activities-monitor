import "@testing-library/jest-dom";
import { TaskCreator } from "./TaskCreator";
import { render, screen } from "@testing-library/react";
import { useTasksListStore } from "../model/store";
import userEvent from "@testing-library/user-event";

describe("TaskCreator", () => {
  beforeEach(() => {
    useTasksListStore.setState({
      isCreatorOpen: true,
      closeCreator: jest.fn(),
      createTask: jest.fn(),
    });
  });

  it("should render", () => {
    render(<TaskCreator />);
    expect(screen.getByText(/create new task/i)).toBeInTheDocument();
  });

  it("should close creator on 'Cancel' button click", async () => {
    render(<TaskCreator />);
    await userEvent.click(screen.getByText("Cancel"));
    expect(useTasksListStore.getState().closeCreator).toHaveBeenCalledTimes(1);
  });

  it("should create task on form submit", async () => {
    render(<TaskCreator />);
    await userEvent.type(screen.getByLabelText(/task name/i), "Test Task");
    await userEvent.type(
      screen.getByLabelText(/description/i),
      "Test Description"
    );
    await userEvent.click(screen.getByText("Create"));
    expect(useTasksListStore.getState().createTask).toHaveBeenCalledWith({
      title: "Test Task",
      description: "Test Description",
    });
  });
});
