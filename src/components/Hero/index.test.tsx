import { render, screen } from "@testing-library/react";

import { MemoryRouter } from "react-router-dom";

import Hero from "./index";

test("renders Hero", () => {
  render(
    <MemoryRouter>
      <Hero />
    </MemoryRouter>
  );
  expect(screen.getByText(/Tuấn/i)).toBeInTheDocument();
  expect(screen.getByText(/đam mê/i)).toBeInTheDocument();
});
