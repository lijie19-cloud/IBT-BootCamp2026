import { createContext, useContext } from "react";

// Create the Cart Context.
const CartContext = createContext(null);

// Cart Provider
export function CartProvider({ children }) {
  // This provider is intentionally kept for the
  // Context API exercise.
  const value = {};

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// Custom useCart hook
export function useCart() {
  const context = useContext(CartContext);

  // Throw an error if the hook is used
  // outside CartProvider.
  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}
