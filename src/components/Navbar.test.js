import { render, screen } from "@testing-library/react";
import Navbar from "./Navbar";
import AuthContext from "../store/auth-context";
import { BrowserRouter } from "react-router-dom";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => ({
    pathname: "localhost:3000",
  }),
  useNavigate: jest.fn(),
}));

const RenderNavbar = (isAuth) => {
  render(
    <BrowserRouter>
      <AuthContext.Provider value={{ isAuthenticated: isAuth }}>
        <Navbar />
      </AuthContext.Provider>
    </BrowserRouter>
  );
};

describe("Navbar", () => {
  it("render without crashing", () => {
    RenderNavbar(false);
    expect(screen.getByText(/login/i)).toBeInTheDocument();
  });
  it("should show private link if user is login", () => {
    RenderNavbar(true);
    expect(screen.getByText(/logout/i)).toBeInTheDocument();
  });
});
