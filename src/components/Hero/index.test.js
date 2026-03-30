import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Hero from "./index";
test("renders Hero", () => {
    render(_jsx(MemoryRouter, { children: _jsx(Hero, {}) }));
    expect(screen.getByText(/Tuấn/i)).toBeInTheDocument();
    expect(screen.getByText(/đam mê/i)).toBeInTheDocument();
});
