import { render, screen } from "@testing-library/react";
import Dropdown from "./Dropdown.jsx";

describe("Dropdown", () => {
  it("should renders without crashing", () => {
    render(<Dropdown isOpen={true} />);
    expect(screen.getByTestId("dropdown")).toBeInTheDocument();
  });
  it("should render centered content if props center is send", () => {
    render(<Dropdown isOpen={true} center={true} />);
    expect(screen.getByTestId("dropdown").childNodes[0]).toHaveClass(
      "dropdown_content_center"
    );
  });
});
