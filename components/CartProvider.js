"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "addisEatsCart";

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Restore the saved cart in the browser.
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(STORAGE_KEY);

      if (savedCart) {
        const parsed = JSON.parse(savedCart);

        if (Array.isArray(parsed)) {
          const validItems = parsed.filter(
            (item) =>
              item &&
              typeof item.id === "string" &&
              typeof item.name === "string" &&
              Number.isFinite(item.price) &&
              item.price >= 0 &&
              Number.isInteger(item.quantity) &&
              item.quantity >= 1 &&
              item.quantity <= 20 &&
              typeof item.image === "string",
          );

          setItems(validItems);
        }
      }
    } catch (error) {
      console.error("Unable to restore the saved cart:", error);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Persist only after restoration has finished.
  useEffect(() => {
    if (!isHydrated) return;

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error("Unable to save the cart:", error);
    }
  }, [items, isHydrated]);

  const addToCart = useCallback((dish, quantity = 1) => {
    const validQuantity = Math.max(
      1,
      Math.min(20, Math.floor(Number(quantity) || 1)),
    );

    setItems((currentItems) => {
      const existing = currentItems.find((item) => item.id === dish.id);

      if (existing) {
        return currentItems.map((item) =>
          item.id === dish.id
            ? {
                ...item,
                quantity: Math.min(20, item.quantity + validQuantity),
              }
            : item,
        );
      }

      return [
        ...currentItems,
        {
          id: dish.id,
          name: dish.name,
          price: dish.price,
          image: dish.image,
          quantity: validQuantity,
        },
      ];
    });
  }, []);

  const increaseQuantity = useCallback((id) => {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.min(20, item.quantity + 1) }
          : item,
      ),
    );
  }, []);

  const decreaseQuantity = useCallback((id) => {
    setItems((currentItems) =>
      currentItems
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }, []);

  const removeFromCart = useCallback((id) => {
    setItems((currentItems) => currentItems.filter((item) => item.id !== id));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const value = useMemo(
    () => ({
      items,
      isHydrated,
      itemCount,
      subtotal,
      addToCart,
      increaseQuantity,
      decreaseQuantity,
      removeFromCart,
      clearCart,
    }),
    [
      items,
      isHydrated,
      itemCount,
      subtotal,
      addToCart,
      increaseQuantity,
      decreaseQuantity,
      removeFromCart,
      clearCart,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}
