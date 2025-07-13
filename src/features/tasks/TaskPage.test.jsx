import { render, screen } from "../../test-utils";

import { describe, it, expect } from "vitest";
import TasksPage from "./TasksPage";

describe("TasksPage", () => {
  it("renders tasks board", () => {
    render(<TasksPage />);

    expect(screen.getByText(/tasks board/i)).toBeInTheDocument();
  });
});
