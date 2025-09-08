import { render, screen } from "@testing-library/react";

import Modal from "./index";
describe("Modal component", () => {
  test("renders Modal close", () => {
    render(
      <Modal open={false} title="TestModal">
        <div>Demo</div>
      </Modal>
    );

    const el = screen.queryByText("TestModal");
    expect(el).toBeNull();
  });

  test("renders Modal open", () => {
    render(
      <Modal open={true} title="TestModal">
        <div>DemoModal</div>
      </Modal>
    );

    const el = screen.queryByText("TestModal");
    expect(el).toBeInTheDocument();
    expect(screen.queryByText("DemoModal")).toBeInTheDocument();
  });
});
