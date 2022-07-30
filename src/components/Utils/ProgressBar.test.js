import { render, screen } from "@testing-library/react";
import ProgressBar from "./ProgressBar";

describe("ProgressBar", () => {
  it("should renders without crashing", () => {
    render(<ProgressBar />);
    expect(screen.getByTestId("progress")).toBeInTheDocument();
  });
  it("should renders with upload", () => {
    render(<ProgressBar upload />);
    expect(screen.getByTestId("progress-upload")).toBeInTheDocument();
  });
  it("should renders with text", () => {
    render(<ProgressBar text="test" />);
    expect(screen.getByText("test")).toBeInTheDocument();
  });
  it("should renders with text on upload", () => {
    render(<ProgressBar text="test" upload />);
    expect(screen.getByText("test")).toBeInTheDocument();
  });
  it("should renders with green color", () => {
    render(<ProgressBar width={100} upload />);
    expect(screen.getByTestId("progress-upload").childNodes[0]).toHaveClass(
      "progress_bar_green"
    );
  });
});
