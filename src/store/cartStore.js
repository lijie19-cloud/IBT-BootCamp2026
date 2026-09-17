import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartStore = create(
  persist(
    (set) => ({
      // ==============================
      // CART STATE
      // ==============================

      items: [],

      // ==============================
      // ADD ITEM
      // ==============================

      addItem: (dish) =>
        set((state) => {
          const existingItem = state.items.find((item) => item.id === dish.id);

          // If the dish already exists,
          // increase its quantity.
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.id === dish.id
                  ? {
                      ...item,
                      quantity: item.quantity + 1,
                    }
                  : item,
              ),
            };
          }

          // Otherwise add a new item.
          return {
            items: [
              ...state.items,
              {
                ...dish,
                quantity: 1,
              },
            ],
          };
        }),

      // ==============================
      // REMOVE ITEM
      // ==============================

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),

      // ==============================
      // CLEAR CART
      // ==============================

      clear: () =>
        set({
          items: [],
        }),
    }),
    {
      // Name used in localStorage.
      name: "addis-eats-cart",
    },
  ),
);

export default useCartStore;
