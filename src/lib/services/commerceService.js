import { findProductById } from "@/lib/repositories/productRepository";
import { commerceRepository } from "@/lib/repositories/commerceRepository";

function normalizeQuantity(value) {
  const quantity = Number(value);
  return Number.isInteger(quantity) && quantity > 0 ? quantity : null;
}

export async function hydrateCart() {
  const stored = commerceRepository.readCart();
  const items = [];
  for (const entry of stored) {
    const product = await findProductById(String(entry.productId || ""));
    const quantity = normalizeQuantity(entry.quantity);
    if (!product || product.status !== "active" || !quantity) continue;
    items.push({ product, quantity: Math.min(quantity, product.stock) });
  }
  commerceRepository.saveCart(
    items.map((item) => ({
      productId: item.product.id,
      quantity: item.quantity,
    })),
  );
  return items;
}

export async function setCartQuantity(
  currentItems,
  productId,
  requestedQuantity,
) {
  const product = await findProductById(String(productId || ""));
  const quantity = Number(requestedQuantity);
  if (!product || product.status !== "active")
    return { ok: false, error: "This product is no longer available." };
  if (!Number.isInteger(quantity) || quantity < 0)
    return { ok: false, error: "Choose a valid quantity." };
  if (quantity > product.stock)
    return { ok: false, error: `Only ${product.stock} units are available.` };
  const remaining = currentItems.filter(
    (item) => item.product.id !== product.id,
  );
  const items =
    quantity === 0 ? remaining : [...remaining, { product, quantity }];
  commerceRepository.saveCart(
    items.map((item) => ({
      productId: item.product.id,
      quantity: item.quantity,
    })),
  );
  return { ok: true, items };
}

export async function addCartItem(currentItems, productId, amount = 1) {
  const current =
    currentItems.find((item) => item.product.id === productId)?.quantity ?? 0;
  return setCartQuantity(currentItems, productId, current + amount);
}

export async function hydrateWishlist() {
  const products = [];
  for (const id of commerceRepository.readWishlist()) {
    const product = await findProductById(id);
    if (product?.status === "active") products.push(product);
  }
  commerceRepository.saveWishlist(products.map((product) => product.id));
  return products;
}

export async function toggleWishlistProduct(currentProducts, productId) {
  const exists = currentProducts.some((product) => product.id === productId);
  if (exists) {
    const products = currentProducts.filter(
      (product) => product.id !== productId,
    );
    commerceRepository.saveWishlist(products.map((product) => product.id));
    return { ok: true, products, saved: false };
  }
  const product = await findProductById(String(productId || ""));
  if (!product || product.status !== "active")
    return { ok: false, error: "This product is no longer available." };
  const products = [...currentProducts, product];
  commerceRepository.saveWishlist(products.map((item) => item.id));
  return { ok: true, products, saved: true };
}

export function calculateCart(items) {
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
  return {
    subtotal,
    total: subtotal,
    itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
  };
}
