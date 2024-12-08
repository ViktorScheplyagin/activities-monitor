import "@testing-library/jest-dom";
import { TaskEditor } from "./TaskEditor";
import { render, screen } from "@testing-library/react";
import { useTasksListStore } from "../model/store";
import userEvent from "@testing-library/user-event";
import { TaskData } from "@/entities/task";

describe("TaskEditor", () => {
  const mockTask: TaskData = {
    id: "test-id",
    title: "Test Task",
    description: "Test Description",
    status: "TODO",
    time: 0,
  };

  beforeEach(() => {
    useTasksListStore.setState({
      isEditorOpen: true,
      isLoading: false,
      editingTask: null,
      closeEditor: jest.fn(),
      editTask: jest.fn(),
      createTask: jest.fn(),
    });
  });

  it("should render create mode", () => {
    render(<TaskEditor />);
    expect(screen.getByText(/create new task/i)).toBeInTheDocument();
    expect(screen.getByText("Save Changes")).toBeInTheDocument();
  });

  it("should render edit mode", () => {
    useTasksListStore.setState({ editingTask: mockTask });
    render(<TaskEditor />);
    expect(screen.getByText(/edit task/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockTask.title)).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockTask.description)).toBeInTheDocument();
  });

  it("should close editor on 'Cancel' button click", async () => {
    render(<TaskEditor />);
    await userEvent.click(screen.getByText("Cancel"));
    expect(useTasksListStore.getState().closeEditor).toHaveBeenCalledTimes(1);
  });

  it("should create task when in create mode", async () => {
    render(<TaskEditor />);
    await userEvent.type(screen.getByLabelText(/task name/i), "New Task");
    await userEvent.type(
      screen.getByLabelText(/description/i),
      "New Description"
    );
    await userEvent.click(screen.getByText("Save Changes"));
    expect(useTasksListStore.getState().createTask).toHaveBeenCalledWith({
      title: "New Task",
      description: "New Description",
    });
  });

  it("should edit task when in edit mode", async () => {
    useTasksListStore.setState({ editingTask: mockTask });
    render(<TaskEditor />);

    const titleInput = screen.getByLabelText(/task name/i);
    const descriptionInput = screen.getByLabelText(/description/i);

    await userEvent.clear(titleInput);
    await userEvent.clear(descriptionInput);
    await userEvent.type(titleInput, "Updated Task");
    await userEvent.type(descriptionInput, "Updated Description");

    await userEvent.click(screen.getByText("Save Changes"));

    expect(useTasksListStore.getState().editTask).toHaveBeenCalledWith(
      mockTask.id,
      {
        title: "Updated Task",
        description: "Updated Description",
      }
    );
  });

  it("should disable buttons when loading", () => {
    useTasksListStore.setState({ isEditorOpen: true, isLoading: true });
    render(<TaskEditor />);

    expect(screen.getByText("Cancel")).toBeDisabled();
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
});
