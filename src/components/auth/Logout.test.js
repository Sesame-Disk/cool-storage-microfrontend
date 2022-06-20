import React from "react";
import renderer from "react-test-renderer";
import { render, screen } from "@testing-library/react";
import Logout from "./Logout";

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

describe("Logout", () => {
  it("renders without crashing", () => {
    render(<Logout />);
    expect(screen.getByText(/logout/i)).toBeInTheDocument();
  });
  it("renders correctly as espected", () => {
    const tree = renderer.create(<Logout />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
