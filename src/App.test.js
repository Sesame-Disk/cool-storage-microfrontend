import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { BrowserRouter, MemoryRouter } from "react-router-dom";

const MockApp = () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

describe("<App />", () => {
  it("renders without crashing", () => {
    render(<MockApp />);
  });

  it("renders the 404 page", () => {
    render(
      <MemoryRouter initialEntries={["/some-random-url"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText("404")).toBeInTheDocument();
  });

  it("renders the Home page if not Autenticated", () => {
    render(
      <MemoryRouter initialEntries={["/dashboard"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText("Home")).toBeInTheDocument();
  });
});
