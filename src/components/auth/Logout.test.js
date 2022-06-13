import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Logout from "./Logout";
import { BrowserRouter } from "react-router-dom";

const MockLogout = () => {
  <BrowserRouter>
    <Logout />
  </BrowserRouter>;
};

describe("Logout", () => {
  it("renders without crashing", () => {
    render(<MockLogout />);
  });
});
