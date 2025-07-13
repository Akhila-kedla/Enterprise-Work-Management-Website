import { renderWithProviders } from "../test-utils";
import { screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import App from "../App";

describe("Integration: Login to Dashboard", () => {
  it("logs in and shows dashboard", async () => {
    renderWithProviders(<App />);

    fireEvent.click(screen.getByRole("link", { name: /get started/i }));

    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: "test@example.com" },
    });

    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));
  });
});
