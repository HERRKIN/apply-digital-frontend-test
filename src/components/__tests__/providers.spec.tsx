import { render, screen } from "@testing-library/react";
import { Providers } from "../providers";
import { queryClient } from "../providers";

describe("Providers Component", () => {
  test("renders the providers correctly", () => {
    render(
      <Providers>
        <div>Test</div>
      </Providers>
    );
    const providerElement = screen.getByText("Test"); // Replace with actual provider name
    expect(providerElement).toBeInTheDocument();
  });
  test("QueryClientProvider is exported", () => {
    expect(queryClient).toBeDefined();
  });
});
