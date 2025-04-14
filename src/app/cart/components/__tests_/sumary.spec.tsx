import {
  fireEvent,
  render,
  screen,
  act,
  waitFor,
} from "@testing-library/react";
import { Summary } from "../sumary";
import { useCartStore } from "@/stores/cart.store";
import { useRouter } from "next/navigation";
jest.mock("@/stores/cart.store");
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Summary", () => {
  const mockItems = [
    { id: 1, name: "Game 1", price: 29.99 },
    { id: 2, name: "Game 2", price: 49.99 },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (useCartStore as unknown as jest.Mock).mockReturnValue({
      items: mockItems,
      getTotal: jest
        .fn()
        .mockReturnValue(mockItems.reduce((acc, item) => acc + item.price, 0)),
      clearCart: jest.fn(),
      isAdded: jest.fn().mockReturnValue(true),
    });
    (useRouter as unknown as jest.Mock).mockReturnValue({
      push: jest.fn(),
    });
  });
  test("render without items", () => {
    (useCartStore as unknown as jest.Mock).mockReturnValue({
      items: [],
      getTotal: jest.fn().mockReturnValue(0),
      clearCart: jest.fn(),
      isAdded: jest.fn().mockReturnValue(true),
    });
    render(<Summary />);
    expect(screen.queryByText("Order Summary")).toBeNull();
    expect(screen.queryByText("Checkout")).toBeNull();
  });

  test("renders order summary with correct item count", () => {
    render(<Summary />);
    expect(screen.getByText("Order Summary")).toBeInTheDocument();
    expect(screen.getByText(`${mockItems.length} items`)).toBeInTheDocument();
  });

  test("renders list of items with correct names and prices", () => {
    render(<Summary />);
    mockItems.forEach((item) => {
      expect(screen.getByText(item.name)).toBeInTheDocument();
      expect(screen.getByText(`$${item.price}`)).toBeInTheDocument();
    });
  });

  test("calculates and displays the order total correctly", () => {
    render(<Summary />);
    const total = mockItems
      .reduce((acc, item) => acc + item.price, 0)
      .toFixed(2);
    expect(screen.getByText(`$${total}`)).toBeInTheDocument();
  });
  test("renders checkout button when there are items", () => {
    render(<Summary />);
    expect(screen.getByText("Checkout")).toBeInTheDocument();
  });
});
