import { render, screen } from "../test-utils.jsx";
import { describe, it, expect } from "vitest";
import ReportsPage from "./ReportsPage";

describe("ReportsPage", () => {
  it("renders reports page", () => {
    render(<ReportsPage />);

    expect(
      screen.getByRole("heading", { name: /reporting & analytics/i })
    ).toBeInTheDocument();
  });
});
