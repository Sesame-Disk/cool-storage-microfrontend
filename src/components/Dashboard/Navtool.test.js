import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import Navtool from "./Navtool.jsx";

const RenderNavtool = () => {
  render(
    <BrowserRouter>
      <Navtool />
    </BrowserRouter>
  );
};

describe("Navtool", () => {
  it("should render without crashing", () => {
    RenderNavtool();
    expect(screen.queryByTestId("user_dropdown")).not.toBeInTheDocument();
  });
  it("should toggle dropdown", () => {
    RenderNavtool();
    userEvent.click(screen.getByTestId("user_icon_dropdown"));
    expect(screen.getByTestId("user_dropdown")).toBeInTheDocument();
    userEvent.click(screen.getByTestId("user_icon_dropdown"));
    expect(screen.queryByTestId("user_dropdown")).not.toBeInTheDocument();
  });
  it("should close dropdown if click outside", () => {
    RenderNavtool();
    userEvent.click(screen.getByTestId("user_icon_dropdown"));
    userEvent.click(screen.getByTestId("logoImg"));
    expect(screen.queryByTestId("user_dropdown")).not.toBeInTheDocument();
  });
});
