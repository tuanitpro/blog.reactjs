import { render, screen } from "@testing-library/react";
import Hero from "./index";
import { MemoryRouter } from "react-router-dom";

test("renders hello world", () => {
  render(
    <MemoryRouter>
      <Hero />
    </MemoryRouter>
  );
  expect(screen.getByText(/Tuấn/i)).toBeInTheDocument();
  expect(screen.getByText(/đam mê/i)).toBeInTheDocument();
});
