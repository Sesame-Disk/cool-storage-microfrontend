import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Share from "./Share.jsx";

describe("Share", () => {
  it("should render without crashing", () => {
    render(<Share />);
    expect(screen.getByText(/share link/i)).toBeInTheDocument();
  });
  it("should change through tabs", () => {
    render(<Share />);
    userEvent.click(screen.getByText(/Internal link/i));
    expect(
      screen.getByText(/An internal link is a link to a file or folder/i)
    ).toBeInTheDocument();

    userEvent.click(screen.getByText(/share to user/i));
    expect(screen.getByPlaceholderText(/Search users/i)).toBeInTheDocument();

    userEvent.click(screen.getByText(/share to group/i));
    expect(screen.getByPlaceholderText(/Search groups/i)).toBeInTheDocument();

    userEvent.click(screen.getByText(/share link/i));
    expect(screen.getByText(/Add password protection/i)).toBeInTheDocument();
  });
  it("should copy link if copy is clicked", () => {
    Object.assign(navigator, {
      clipboard: {
        writeText: () => {},
      },
    });
    Object.assign(window, {
      alert: () => {},
    });
    jest.spyOn(navigator.clipboard, "writeText");
    render(<Share />);
    userEvent.click(screen.getByText(/Internal link/i));
    userEvent.click(screen.getByRole("button", { name: /copy/i }));
    expect(navigator.clipboard.writeText).toHaveBeenCalledTimes(1);
  });
  it('should show password filds if "Add password protection" is clicked', () => {
    render(<Share />);
    userEvent.click(screen.getByText(/Add password protection/i));
    expect(
      screen.getByPlaceholderText(/enter your password/i)
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/repeat your password/i)
    ).toBeInTheDocument();
  });
});
