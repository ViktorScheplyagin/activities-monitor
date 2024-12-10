import "@testing-library/jest-dom";
import { TaskDetailsForm } from "./TaskDetailsForm";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("TaskDetailsForm", () => {
  const mockSubmit = jest.fn();
  const mockCancel = jest.fn();

  beforeEach(() => {
    mockSubmit.mockClear();
    mockCancel.mockClear();
  });

  it("should render form with default actions", () => {
    render(
      <TaskDetailsForm
        onSubmit={mockSubmit}
        defaultActions={{
          onCancel: mockCancel,
          submitText: "Submit",
          cancelText: "Cancel",
        }}
      />
    );

    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByText("Submit")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
  });

  it("should handle form submission", async () => {
    render(
      <TaskDetailsForm
        onSubmit={async (values) => {
          await mockSubmit(values);
        }}
      />
    );

    await userEvent.type(screen.getByLabelText(/title/i), "New Task");
    await userEvent.type(
      screen.getByLabelText(/description/i),
      "New Description"
    );
    await userEvent.click(
      screen.getByRole("button", { name: /save changes/i })
    );

    expect(mockSubmit).toHaveBeenCalledWith({
      title: "New Task",
      description: "New Description",
    });
  });

  it("should handle cancel action", async () => {
    render(
      <TaskDetailsForm
        onSubmit={mockSubmit}
        defaultActions={{
          onCancel: mockCancel,
          cancelText: "Cancel",
        }}
      />
    );

    await userEvent.click(screen.getByText("Cancel"));
    expect(mockCancel).toHaveBeenCalled();
  });

  it("should disable submit button when submitting", async () => {
    const mockAsyncSubmit = jest
      .fn()
      .mockImplementation(
        () => new Promise((resolve) => setTimeout(resolve, 100))
      );

    render(
      <TaskDetailsForm
        onSubmit={mockAsyncSubmit}
        defaultActions={{
          submitText: "Submit",
        }}
      />
    );

    await userEvent.type(screen.getByLabelText(/title/i), "Task");
    const submitButton = screen.getByText("Submit");
    await userEvent.click(submitButton);

    expect(submitButton).toBeDisabled();
  });

  it("should pre-fill form with default values", () => {
    const defaultValues = {
      title: "Test Task",
      description: "Test Description",
    };

    render(
      <TaskDetailsForm onSubmit={mockSubmit} defaultValues={defaultValues} />
    );

    expect(screen.getByLabelText(/title/i)).toHaveValue(defaultValues.title);
    expect(screen.getByLabelText(/description/i)).toHaveValue(
      defaultValues.description
    );
  });
});
