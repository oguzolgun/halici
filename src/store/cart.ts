"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { CartItem } from "@/types/rug";

interface CartState {
  items: CartItem[];
  lastAddedKey: string | null;
  addItem: (item: Omit<CartItem, "key">) => void;
  removeItem: (key: string) => void;
  updateQuantity: (key: string, quantity: number) => void;
  clearCart: () => void;
  clearLastAdded: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      lastAddedKey: null,
      addItem: (incoming) =>
        set((state) => {
          const key = `${incoming.rugId}::${incoming.sizeLabel}::${incoming.colorName}`;
          const existing = state.items.find((i) => i.key === key);
          if (existing) {
            const nextQty = Math.min(
              existing.quantity + incoming.quantity,
              incoming.maxStock
            );
            return {
              items: state.items.map((i) =>
                i.key === key ? { ...i, quantity: nextQty } : i
              ),
              lastAddedKey: key,
            };
          }
          return {
            items: [
              ...state.items,
              {
                ...incoming,
                key,
                quantity: Math.min(incoming.quantity, incoming.maxStock),
              },
            ],
            lastAddedKey: key,
          };
        }),
      removeItem: (key) =>
        set((state) => ({
          items: state.items.filter((item) => item.key !== key),
        })),
      updateQuantity: (key, quantity) =>
        set((state) => ({
          items:
            quantity <= 0
              ? state.items.filter((i) => i.key !== key)
              : state.items.map((i) =>
                  i.key === key
                    ? { ...i, quantity: Math.min(quantity, i.maxStock) }
                    : i
                ),
        })),
      clearCart: () => set({ items: [], lastAddedKey: null }),
      clearLastAdded: () => set({ lastAddedKey: null }),
    }),
    {
      name: "sec-hali-cart",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
