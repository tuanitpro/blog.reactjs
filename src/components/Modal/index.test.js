import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen } from "@testing-library/react";
import Modal from "./index";
describe("Modal component", () => {
    test("renders Modal close", () => {
        render(_jsx(Modal, { open: false, title: "TestModal", children: _jsx("div", { children: "Demo" }) }));
        const el = screen.queryByText("TestModal");
        expect(el).toBeNull();
    });
    test("renders Modal open", () => {
        render(_jsx(Modal, { open: true, title: "TestModal", children: _jsx("div", { children: "DemoModal" }) }));
        const el = screen.queryByText("TestModal");
        expect(el).toBeInTheDocument();
        expect(screen.queryByText("DemoModal")).toBeInTheDocument();
    });
});
