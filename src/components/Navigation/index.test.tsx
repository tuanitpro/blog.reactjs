import { render, screen } from "@testing-library/react";

import { MemoryRouter } from "react-router-dom";

import Navigation from "./index";

test("renders Hero", () => {
  render(
    <MemoryRouter>
      <Navigation />
    </MemoryRouter>
  );
  expect(screen.getByText(/TRANG CHỦ/i)).toBeInTheDocument();

  const link = screen.getByRole("link", { name: /TÔI LÀ AI/i });

  expect(link).toBeInTheDocument();
  expect(link).toHaveAttribute("href", "/about"); // ✅ check target
});
