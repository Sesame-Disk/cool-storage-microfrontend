import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Modal from "./Modal";

describe("Modal", () => {
  it("should renders without crashing", () => {
    render(<Modal isOpen={true} />);
    expect(screen.getByTestId("modal")).toBeInTheDocument();
  });
  it("should close after click close button", () => {
    let open = true;
    const { rerender } = render(
      <Modal
        isOpen={open}
        onClose={() => {
          open = false;
        }}
      />
    );
    expect(screen.getByTestId("modal")).toBeInTheDocument();
    userEvent.click(screen.getByText("Close"));
    rerender(<Modal isOpen={open} />);
    expect(screen.queryByTestId("modal")).not.toHaveClass("modal_open");
  });
});
