import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Logo from "./index";
test("renders Logo", () => {
    render(_jsx(MemoryRouter, { children: _jsx(Logo, {}) }));
    const img = screen.getByRole("img", { name: /Tuấn/i });
    expect(img).toBeInTheDocument(); // ✅ from jest-dom
    expect(img).toHaveAttribute("src", "test-file-stub"); // ✅ mocked file
    expect(img).toHaveAttribute("alt", "Tuấn");
});
