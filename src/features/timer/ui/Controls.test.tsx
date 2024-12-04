import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Controls, ControlsProps } from "./Controls";

describe("Controls", () => {
  let props: ControlsProps;

  beforeEach(() => {
    props = {
      isTimerRunning: false,
      toggleTimer: jest.fn(),
      resetTimer: jest.fn(),
      changeWorkDuration: jest.fn(),
      changeBreakDuration: jest.fn(),
    };
  });

  it("should render a start/pause button and a reset button", () => {
    render(<Controls {...props} />);
    expect(screen.getByText("Start")).toBeInTheDocument();
    expect(screen.getByText("Reset")).toBeInTheDocument();
  });

  it("schould show 'Pause' text when timer is running", () => {
    render(<Controls {...props} isTimerRunning={true} />);
    expect(screen.getByText("Pause")).toBeInTheDocument();
  });

  it("should call toggleTimer prop when the start/pause button is clicked", async () => {
    render(<Controls {...props} />);
    await userEvent.click(screen.getByText("Start"));
    expect(props.toggleTimer).toHaveBeenCalledTimes(1);
  });

  it("should call resetTimer prop when the reset button is clicked", async () => {
    render(<Controls {...props} />);
    await userEvent.click(screen.getByText("Reset"));
    expect(props.resetTimer).toHaveBeenCalledTimes(1);
  });

  it("should call changeWorkDuration prop when the work duration input is changed", async () => {
    const value = 25 * 60; // 25 minutes
    render(<Controls {...props} />);
    await userEvent.selectOptions(screen.getByTestId("work"), value.toString());
    expect(props.changeWorkDuration).toHaveBeenCalledTimes(1);
    expect(props.changeWorkDuration).toHaveBeenCalledWith(value);
  });

  it("should call changeBreakDuration prop when the break duration input is changed", async () => {
    const value = 5 * 60; // 5 minutes
    render(<Controls {...props} />);
    await userEvent.selectOptions(
      screen.getByTestId("break"),
      value.toString()
    );
    expect(props.changeBreakDuration).toHaveBeenCalledTimes(1);
    expect(props.changeBreakDuration).toHaveBeenCalledWith(value);
  });
});
