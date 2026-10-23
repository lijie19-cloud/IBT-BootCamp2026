const CART_KEY = "markethub-demo-cart-v1";
const WISHLIST_KEY = "markethub-demo-wishlist-v1";

function read(key, fallback) {
  if (typeof window === "undefined") return fallback;
  try {
    const value = JSON.parse(window.localStorage.getItem(key));
    return value ?? fallback;
  } catch {
    return fallback;
  }
}

function write(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

export const commerceRepository = {
  readCart() {
    const cart = read(CART_KEY, []);
    return Array.isArray(cart) ? cart : [];
  },
  saveCart(items) {
    write(
      CART_KEY,
      items.map(({ productId, quantity }) => ({ productId, quantity })),
    );
  },
  readWishlist() {
    const ids = read(WISHLIST_KEY, []);
    return Array.isArray(ids) ? ids.filter((id) => typeof id === "string") : [];
  },
  saveWishlist(ids) {
    write(WISHLIST_KEY, [...new Set(ids)]);
  },
};
