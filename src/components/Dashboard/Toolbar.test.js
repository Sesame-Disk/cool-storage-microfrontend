import { render, screen } from "@testing-library/react";
import Toolbar from "./Toolbar";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

const RenderToolbar = () => {
  render(
    <BrowserRouter>
      <Toolbar />
    </BrowserRouter>
  );
};

describe("Toolbar", () => {
  it("should render without crashing", () => {
    RenderToolbar();
    expect(screen.getByTestId(/toolbar/i)).toBeInTheDocument();
  });
  it("should open and close all modal", () => {
    RenderToolbar();
    const actions = screen.getByTestId(/toolbar-action/i).childNodes;

    userEvent.click(actions[0].childNodes[0]);
    expect(
      screen.getByRole("button", { name: /new folder/i })
    ).toBeInTheDocument();
    userEvent.click(actions[1]);
    expect(
      screen.queryByRole("button", { name: /new folder/i })
    ).not.toBeInTheDocument();

    userEvent.click(actions[1]);
    expect(screen.getByRole("heading", { name: "Rename" })).toBeInTheDocument();
    userEvent.click(screen.getByRole("button", { name: "Cancel" }));
    expect(
      screen.queryByRole("heading", { name: "Rename" })
    ).not.toBeInTheDocument();

    userEvent.click(actions[2]);
    expect(screen.getByRole("heading", { name: /Move/i })).toBeInTheDocument();
    userEvent.click(screen.getByRole("button", { name: "Close" }));
    expect(
      screen.queryByRole("heading", { name: /Move/i })
    ).not.toBeInTheDocument();

    userEvent.click(actions[3]);
    expect(
      screen.getByRole("heading", { name: /Copy selected/i })
    ).toBeInTheDocument();
    userEvent.click(screen.getByRole("button", { name: "Close" }));
    expect(
      screen.queryByRole("heading", { name: /Copy selected/i })
    ).not.toBeInTheDocument();

    userEvent.click(actions[4]);
    expect(screen.getByRole("heading", { name: "Delete" })).toBeInTheDocument();
    userEvent.click(screen.getByRole("button", { name: "Cancel" }));
    expect(
      screen.queryByRole("heading", { name: "Delete" })
    ).not.toBeInTheDocument();

    userEvent.click(actions[5]);
    expect(
      screen.getByRole("heading", { name: /new library/i })
    ).toBeInTheDocument();
    userEvent.click(screen.getByRole("button", { name: "Cancel" }));
    expect(
      screen.queryByRole("heading", { name: /new library/i })
    ).not.toBeInTheDocument();

    userEvent.click(actions[6]);
    expect(screen.getByRole("heading", { name: "Share" })).toBeInTheDocument();
    userEvent.click(screen.getByRole("button", { name: "Close" }));
    expect(
      screen.queryByRole("heading", { name: "Share" })
    ).not.toBeInTheDocument();

    userEvent.click(actions[7].childNodes[0]);
    expect(screen.getByText(/upload files/i)).toBeInTheDocument();
    userEvent.click(actions[1]);
    expect(screen.queryByText(/upload files/i)).not.toBeInTheDocument();
  });
  it("should open/close upload files modal", () => {
    Object.assign(URL, {
      createObjectURL: () => {},
    });
    RenderToolbar();
    const actions = screen.getByTestId(/toolbar-action/i).childNodes;

    userEvent.click(actions[7].childNodes[0]);
    const fileInput = screen.getByLabelText(/upload files/i);
    const file = new File(["(⌐□_□)"], "test.png", { type: "image/png" });
    expect(fileInput).toBeInTheDocument();
    userEvent.upload(fileInput, file);
    expect(
      screen.getByRole("heading", { name: "Upload Files:" })
    ).toBeInTheDocument();

    userEvent.click(screen.getByRole("button", { name: "Close" }));
    expect(
      screen.queryByRole("heading", { name: "Upload Files:" })
    ).not.toBeInTheDocument();
  });
  it("should open/close upload from seafile modal", () => {
    RenderToolbar();
    const actions = screen.getByTestId(/toolbar-action/i).childNodes;

    userEvent.click(actions[7].childNodes[0]);
    const seafile = screen.getByRole("button", {
      name: /upload from seafile/i,
    });
    expect(seafile).toBeInTheDocument();
    userEvent.click(seafile);
    expect(
      screen.getByRole("heading", { name: "Upload from Seafile:" })
    ).toBeInTheDocument();

    userEvent.click(screen.getByRole("button", { name: "Close" }));
    expect(
      screen.queryByRole("heading", { name: "Upload Files:" })
    ).not.toBeInTheDocument();
  });
});
