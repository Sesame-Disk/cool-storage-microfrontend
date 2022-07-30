import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "./Login";
import axios from "axios";
import AuthContext from "../../store/auth-context";

jest.mock("axios");
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
  Link: jest.fn(),
}));

describe("<Login />", () => {
  it("render Login component", () => {
    render(<Login />);
    const welcome = screen.getByText("Welcome to", { exact: false });
    const lang = screen.getByRole("combobox", { name: "" });
    const email = screen.getByPlaceholderText("user@email.com");
    const password = screen.getByPlaceholderText("Password");
    const button = screen.getByRole("button");
    expect(welcome).toBeInTheDocument();
    expect(lang).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
  it("should render error message when submit with empty email and password", async () => {
    render(<Login />);
    const button = screen.getByRole("button");
    userEvent.click(button);
    await waitFor(() => {
      const error = screen.getByText("Please enter your email and password");
      expect(error).toBeInTheDocument();
    });
  });
  it("should render error message when submit with invalid credentials", async () => {
    axios.post.mockImplementationOnce(() => {
      return Promise.reject({
        response: {
          status: 401,
          data: "please enter a valid username and password",
        },
      });
    });
    render(<Login />);
    const email = screen.getByPlaceholderText("user@email.com");
    const password = screen.getByPlaceholderText("Password");
    const button = screen.getByRole("button");
    userEvent.type(email, "asd");
    userEvent.type(password, "asd");
    userEvent.click(button);
    await waitFor(() => {
      const error = screen.getByText(
        /please enter a valid username and password/i
      );
      expect(error).toBeInTheDocument();
    });
  });
  it("should check if click remember me button", () => {
    render(<Login />);
    const checkbox = screen.getByRole("checkbox");
    userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });
});
