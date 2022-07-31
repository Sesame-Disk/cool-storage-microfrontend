import { render, screen } from "@testing-library/react";
import Settings from "./Settings";
import AuthContext from "../../store/auth-context";
import userEvent from "@testing-library/user-event";

describe("Settings", () => {
  it("should render without crashing", () => {
    render(
      <AuthContext.Provider
        value={{
          user: {
            avatar_url: "test-avatar",
            name: "test-name-user",
            email: "test-email-user",
          },
        }}
      >
        <Settings />
      </AuthContext.Provider>
    );
    expect(screen.getByText("Profile Settings")).toBeInTheDocument();
  });
  it("should render a Error if no reach a user", () => {
    render(
      <AuthContext.Provider value={{}}>
        <Settings />
      </AuthContext.Provider>
    );
    expect(screen.getByRole("heading", { name: /error/i })).toBeInTheDocument();
  });
  it("should console log if submited", () => {
    jest.spyOn(console, "log");
    render(
      <AuthContext.Provider
        value={{
          user: {
            avatar_url: "test-avatar",
            name: "test-name-user",
            email: "test-email-user",
          },
        }}
      >
        <Settings />
      </AuthContext.Provider>
    );
    userEvent.click(screen.getAllByRole("button", { name: "Submit" })[0]);
    expect(console.log).toBeCalledWith("Email Notifications Submitted");
    userEvent.click(screen.getAllByRole("button", { name: "Submit" })[1]);
    expect(console.log).toBeCalledWith("Email Notifications Submitted");
  });
});
