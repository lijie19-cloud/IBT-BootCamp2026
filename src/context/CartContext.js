"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { addCartItem, calculateCart, hydrateCart, hydrateWishlist, setCartQuantity, toggleWishlistProduct } from "@/lib/services/commerceService";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const task = window.setTimeout(async () => {
      const [cart, saved] = await Promise.all([hydrateCart(), hydrateWishlist()]);
      setCartItems(cart);
      setWishlist(saved);
      setIsReady(true);
    }, 0);
    return () => window.clearTimeout(task);
  }, []);

  const totals = useMemo(() => calculateCart(cartItems), [cartItems]);
  const value = useMemo(() => ({
    cartItems, wishlist, isReady, ...totals,
    isWishlisted(productId) { return wishlist.some((product) => product.id === productId); },
    async addToCart(productId, amount = 1) {
      const result = await addCartItem(cartItems, productId, amount);
      if (result.ok) setCartItems(result.items);
      return result;
    },
    async updateQuantity(productId, quantity) {
      const result = await setCartQuantity(cartItems, productId, quantity);
      if (result.ok) setCartItems(result.items);
      return result;
    },
    async toggleWishlist(productId) {
      const result = await toggleWishlistProduct(wishlist, productId);
      if (result.ok) setWishlist(result.products);
      return result;
    },
    clearCart() {
      setCartItems([]);
      window.localStorage.setItem("markethub-demo-cart-v1", "[]");
    },
  }), [cartItems, isReady, totals, wishlist]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const value = useContext(CartContext);
  if (!value) throw new Error("useCart must be used inside CartProvider");
  return value;
}
