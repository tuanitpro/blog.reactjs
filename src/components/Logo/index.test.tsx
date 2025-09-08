import { render, screen } from "@testing-library/react";
import Logo from "./index";
import { MemoryRouter } from "react-router-dom";

test("renders hello world", () => {
  render(
    <MemoryRouter>
      <Logo />
    </MemoryRouter>
  );

  const img = screen.getByRole("img", { name: /Tuấn/i });
  expect(img).toBeInTheDocument(); // ✅ from jest-dom
  expect(img).toHaveAttribute("src", "test-file-stub"); // ✅ mocked file
  expect(img).toHaveAttribute("alt", "Tuấn");
});
