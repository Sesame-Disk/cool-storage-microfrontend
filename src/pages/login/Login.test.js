import { render, screen, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import userEvent from "@testing-library/user-event";
import Login from "./Login";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "../../store/auth-context";

const MockLogin = () => {
  return (
    <AuthContextProvider
      value={{
        token: "token",
        isAuthenticated: true,
        user: "user",
      }}
    >
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    </AuthContextProvider>
  );
};

jest.mock("../../components/auth/FetchData", () => {
  return {
    GetToken: (user, pass, callback) => {
      callback(null, "successfully");
    },
    GetAccount: (token, callback) => {
      callback(null, "successfully");
    },
  };
});

const server = setupServer(
  rest.get(`/api/v1/auth-token`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ token: "token" }));
  })
);

beforeAll(() => {
  server.listen();
});
afterEach(() => {
  server.resetHandlers();
});
afterAll(() => {
  server.close();
});

describe("<Login />", () => {
  it("render Login component", () => {
    render(<MockLogin />);
    const welcome = screen.getByText("Welcome to", { exact: false });
    const image = screen.getByRole("img", { name: "logo" });
    const lang = screen.getByRole("combobox", { name: "" });
    const email = screen.getByPlaceholderText("user@email.com");
    const password = screen.getByPlaceholderText("Password");
    const button = screen.getByRole("button");
    expect(welcome).toBeInTheDocument();
    expect(image).toBeInTheDocument();
    expect(lang).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
});
