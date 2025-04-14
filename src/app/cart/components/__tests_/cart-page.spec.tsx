import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Cart from "../../page"; // Adjust the import path as necessary
import { useCartStore } from "@/stores/cart.store";
import { useRouter } from "next/navigation";
jest.mock("@/stores/cart.store", () => ({
  useCartStore: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Cart", () => {
    const mockItems = [
    { id: 1, name: 'Game 1', price: 29.99, image: 'image1.jpg', genre: 'Action', description: 'An action-packed game', isNew: false },
    { id: 2, name: 'Game 2', price: 49.99, image: 'image2.jpg', genre: 'Adventure', description: 'An adventurous game', isNew: true },
  ];
  beforeEach(() => {
    jest.clearAllMocks();
      (useCartStore as unknown as jest.Mock).mockReturnValue({
        items: mockItems,
        getTotal: jest.fn().mockReturnValue(mockItems.reduce((acc, item) => acc + item.price, 0)),
        clearCart: jest.fn(),
        isAdded: jest.fn().mockReturnValue(true),
      });
      (useRouter as unknown as jest.Mock).mockReturnValue({
        push: jest.fn(),
      });
  });
  test("render back button", () => {
    render(<Cart />);
    expect(screen.getByRole("link", { name: "Back to catalog" })).toBeInTheDocument();
    expect(screen.getByText("Back to catalog")).toBeInTheDocument();
  });
  test("renders cart title and item count", () => {
    render(<Cart />);
    expect(screen.getByText("Your Cart")).toBeInTheDocument();
    expect(screen.getByText("Order Summary")).toBeInTheDocument();
    const sumaryItemCount = screen.getByTestId("sumary-item-count");
    const cartItemCount = screen.getByTestId("cart-item-count");
    expect(sumaryItemCount).toBeInTheDocument();
    expect(cartItemCount).toBeInTheDocument();
    expect(sumaryItemCount.textContent).toBe("2 items");
    expect(cartItemCount.textContent).toBe("2 items");
  });

  test("navigates back to catalog", () => {
    render(<Cart />);
    const backLink = screen.getByText("Back to catalog");
    expect(backLink).toBeInTheDocument();
    expect(backLink.closest("a")).toHaveAttribute("href", "/");
  });
  test('renders thanks for your order', async () => {
    render(<Cart />);
    const checkoutButton = screen.getByText("Checkout");
    fireEvent.click(checkoutButton);
    await waitFor(() => {
      expect(screen.getByText("Thanks for your order")).toBeInTheDocument();
    });
    const acceptButton = screen.getByText("Accept");
    fireEvent.click(acceptButton);
    await waitFor(() => {
      expect(useRouter().push).toHaveBeenCalledWith("/");
      expect(useCartStore().clearCart).toHaveBeenCalled();
    });
  });
});
