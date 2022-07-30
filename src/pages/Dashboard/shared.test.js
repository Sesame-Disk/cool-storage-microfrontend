import { render, screen } from "@testing-library/react";
import Shared from "./Shared";

describe("Shared", () => {
  it("should render without crashing", () => {
    render(<Shared />);
    expect(screen.getByText(/shared/i)).toBeInTheDocument();
  });
});
