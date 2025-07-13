import { render, screen } from "../test-utils.jsx"; // fixed path
import { describe, it, expect } from "vitest";
import Dashboard from "./Dashboard";

describe("DashboardPage", () => {
  it("renders dashboard page", () => {
    render(<Dashboard />);
    expect(
      screen.getByRole("heading", { name: /dashboard/i })
    ).toBeInTheDocument();
  });
});
