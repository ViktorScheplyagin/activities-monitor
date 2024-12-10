import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CreateTaskDialog } from "./CreateTaskDialog";
import { useTasksListStore } from "../model/store";

describe("CreateTaskDialog", () => {
  const mockCloseEditor = jest.fn();
  const mockCreateTask = jest.fn();

  beforeEach(() => {
    useTasksListStore.setState({
      isEditorOpen: true,
      closeEditor: mockCloseEditor,
      createTask: mockCreateTask,
    });
  });

  it("should handle task creation", async () => {
    render(<CreateTaskDialog />);

    await userEvent.type(screen.getByLabelText("Title"), "New Task");
    await userEvent.type(
      screen.getByLabelText("Description"),
      "Task Description"
    );
    await userEvent.click(screen.getByText("Create Task"));

    expect(mockCreateTask).toHaveBeenCalledWith({
      title: "New Task",
      description: "Task Description",
    });
    expect(mockCloseEditor).toHaveBeenCalled();
  });

  it("should close dialog on cancel", async () => {
    render(<CreateTaskDialog />);
    await userEvent.click(screen.getByText("Cancel"));
    expect(mockCloseEditor).toHaveBeenCalled();
  });
});
