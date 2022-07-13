import React from "react";
import renderer from "react-test-renderer";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Logout from "./Logout";
import AuthContext from "../../store/auth-context";

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

describe("Logout", () => {
  it("renders without crashing", () => {
    render(<Logout />);
    expect(screen.getByText(/logout/i)).toBeInTheDocument();
  });
  it("renders correctly as espected", () => {
    const tree = renderer
      .create(
        <AuthContext.Provider
          value={() => ({
            logout: jest.fn(),
          })}
        >
          <Logout />
        </AuthContext.Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
