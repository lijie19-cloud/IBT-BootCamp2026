import { products as publicProducts } from "@/lib/data/products";

const STORAGE_KEY = "markethub-seller-products-v1";

function browserOnly() {
  if (typeof window === "undefined") throw new Error("Seller demo storage is browser-only.");
}

function readStore() {
  browserOnly();
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    window.localStorage.removeItem(STORAGE_KEY);
    return {};
  }
}

function writeStore(store) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
}

function initialListings(user) {
  if (user.email !== "seller@markethub.demo") return [];
  return publicProducts.slice(0, 3).map((product, index) => ({
    ...product,
    id: `seller-demo-${index + 1}`,
    seller: { id: user.id, name: user.fullName, location: user.location || "Addis Ababa" },
    featured: index === 0,
    updatedAt: product.createdAt,
  }));
}

export function findSellerProducts(user) {
  const store = readStore();
  if (!Array.isArray(store[user.id])) {
    store[user.id] = initialListings(user);
    writeStore(store);
  }
  return store[user.id].map((product) => ({ ...product, seller: { ...product.seller } }));
}

export function findOwnedSellerProduct(user, productId) {
  return findSellerProducts(user).find((product) => product.id === productId && product.seller.id === user.id) || null;
}

export function insertSellerProduct(user, product) {
  const store = readStore();
  const listings = findSellerProducts(user);
  store[user.id] = [product, ...listings];
  writeStore(store);
  return product;
}

export function updateOwnedSellerProduct(user, productId, updates) {
  const store = readStore();
  const listings = findSellerProducts(user);
  const index = listings.findIndex((product) => product.id === productId && product.seller.id === user.id);
  if (index < 0) throw new Error("You can only manage your own demo listings.");
  listings[index] = { ...listings[index], ...updates, seller: { ...listings[index].seller } };
  store[user.id] = listings;
  writeStore(store);
  return listings[index];
}

export function deleteOwnedSellerProduct(user, productId) {
  const store = readStore();
  const listings = findSellerProducts(user);
  const product = listings.find((item) => item.id === productId && item.seller.id === user.id);
  if (!product) throw new Error("You can only delete your own demo listings.");
  store[user.id] = listings.filter((item) => item.id !== productId);
  writeStore(store);
  return product;
}
