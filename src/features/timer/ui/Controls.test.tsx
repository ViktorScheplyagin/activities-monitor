import "@testing-library/jest-dom";
import { screen, render, fireEvent } from "@testing-library/react";
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
    fireEvent.click(screen.getByText("Start"));
    expect(props.toggleTimer).toHaveBeenCalledTimes(1);
  });

  it("should call resetTimer prop when the reset button is clicked", () => {
    render(<Controls {...props} />);
    fireEvent.click(screen.getByText("Reset"));
    expect(props.resetTimer).toHaveBeenCalledTimes(1);
  });

  it("should call changeWorkDuration prop when the work duration input is changed", () => {
    const minutes = 25;
    render(<Controls {...props} />);
    fireEvent.change(screen.getByTestId("work"), {
      value: `${minutes}`,
    });
    expect(props.changeWorkDuration).toHaveBeenCalledTimes(1);
    expect(props.changeWorkDuration).toHaveBeenCalledWith(minutes * 60);
  });

  it("should call changeBreakDuration prop when the break duration input is changed", () => {
    const minutes = 5;
    render(<Controls {...props} />);
    fireEvent.change(screen.getByTestId("break"), {
      value: `${minutes}`,
    });
    expect(props.changeBreakDuration).toHaveBeenCalledTimes(1);
    expect(props.changeBreakDuration).toHaveBeenCalledWith(minutes * 60);
  });
});
