import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navigation from "./index";
test("renders Hero", () => {
    render(_jsx(MemoryRouter, { children: _jsx(Navigation, {}) }));
    expect(screen.getByText(/TRANG CHỦ/i)).toBeInTheDocument();
    const link = screen.getByRole("link", { name: /TÔI LÀ AI/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/about"); // ✅ check target
});
