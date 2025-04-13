
import { useCartStore } from "../cart.store";
import { act, renderHook } from "@testing-library/react";

describe("Cart Store", () => {
  it("should add an item to the cart", () => {
    const { result } = renderHook(() => useCartStore());
    act(() => {
        result.current.addItem({ id: "1", name: "Test Item", price: 10, genre: "Test", image: "Test", description: "Test", isNew: true });
    });
    expect(result.current.items).toEqual([{ id: "1", name: "Test Item", price: 10, genre: "Test", image: "Test", description: "Test", isNew: true }]);
    expect(result.current.getTotal()).toEqual(10);
    expect(result.current.isAdded("1")).toBe(true);
  });
  it("should remove an item from the cart", () => {
    const { result } = renderHook(() => useCartStore());
    act(() => {
        result.current.addItem({ id: "1", name: "Test Item", price: 10, genre: "Test", image: "Test", description: "Test", isNew: true });
    });
    act(() => {
        result.current.removeItem("1");
    });
    expect(result.current.items).toEqual([]);
    expect(result.current.getTotal()).toEqual(0);
    expect(result.current.isAdded("1")).toBe(false);
  });
  it("should clear the cart", () => {
    const { result } = renderHook(() => useCartStore());
    act(() => {
        result.current.addItem({ id: "1", name: "Test Item", price: 10, genre: "Test", image: "Test", description: "Test", isNew: true });
    });
    act(() => {
        result.current.clearCart();
    });
    expect(result.current.items).toEqual([]);
    expect(result.current.getTotal()).toEqual(0);
  });
});
