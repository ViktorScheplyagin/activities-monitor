import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Timer } from "./Timer";

describe("Timer", () => {
  it("formats timer correctly", () => {
    render(<Timer timeLeft={65} mode="work" />);
    expect(screen.getByText("01:05")).toBeInTheDocument();
  });

  it("shows red color in work mode", () => {
    render(<Timer timeLeft={60} mode="work" />);
    expect(screen.getByText("01:00")).toHaveClass("text-red-500");
  });

  it("shows green color in break mode", () => {
    render(<Timer timeLeft={60} mode="break" />);
    expect(screen.getByText("01:00")).toHaveClass("text-green-500");
  });
});
