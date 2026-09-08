// ========================================
// CART STORAGE KEY
// ========================================

const CART_KEY = "addisEatsCart";

// ========================================
// GET CART
// ========================================

export function getCart() {
  try {
    const saved = localStorage.getItem(CART_KEY);

    if (!saved) {
      return [];
    }

    const cart = JSON.parse(saved);

    if (!Array.isArray(cart)) {
      return [];
    }

    return cart;
  } catch (error) {
    console.error("Failed to load cart:", error);

    return [];
  }
}

// ========================================
// SAVE CART
// ========================================

export function saveCart(cart) {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  } catch (error) {
    console.error("Failed to save cart:", error);
  }
}

// ========================================
// CLEAR CART
// ========================================

export function clearCart() {
  localStorage.removeItem(CART_KEY);
}
