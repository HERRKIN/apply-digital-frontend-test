import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { devtools } from "zustand/middleware";
import { Game } from "@/utils/endpoint";
interface CartState {
  items: Game[];
  getTotal: () => number;
  addItem: (item: Game) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  isAdded: (id: string) => boolean;
}

const useCartStore = create<CartState>()(
  persist(
    devtools((set, get) => ({
      items: [],
      getTotal: () => {
        return get().items.reduce((acc, item) => acc + item.price, 0);
      },
      addItem: (item: any) => {
        set((state: any) => ({
          items: [...state.items, item],
        }));
      },
      removeItem: (id: string) => {
        set((state: any) => ({
          items: state.items.filter((i: any) => i.id !== id),
        }));
      },
      clearCart: () => {
        set({ items: [] });
      },
      isAdded: (id: string) => {
        return get().items.some((item: any) => item.id === id);
      },
    })),
    {
      name: "cart",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
export  {useCartStore}
