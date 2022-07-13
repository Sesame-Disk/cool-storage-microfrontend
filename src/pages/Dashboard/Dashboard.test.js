import { render, screen } from "@testing-library/react";
import Dashboard from "./Dashboard";

describe("Dashboard", () => {
  it("should render without crashing", () => {
    render(<Dashboard />);
    expect(screen.getByTestId("dash-content")).toBeInTheDocument();
  });
});
