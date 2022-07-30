import { render, screen } from "@testing-library/react";
import ProgressBar from "./ProgressBar";

describe("ProgressBar", () => {
  it("should renders without crashing", () => {
    render(<ProgressBar value={100} />);
    expect(screen.getByTestId("progress-bar")).toBeInTheDocument();
  });
  it("should renders with value != 100", () => {
    render(<ProgressBar value={50} />);
    expect(screen.getByTestId("progress-bar")).toBeInTheDocument();
  });
});
