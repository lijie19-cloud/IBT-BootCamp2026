import {
  deleteOwnedSellerProduct,
  findOwnedSellerProduct,
  findSellerProducts,
  insertSellerProduct,
  updateOwnedSellerProduct,
} from "@/lib/repositories/sellerProductRepository";
import { validateProductInput } from "@/lib/validation/productValidation";

function assertSeller(user) {
  if (!user || user.role !== "seller")
    throw new Error("A seller demo account is required.");
}

export async function getSellerListings(user) {
  assertSeller(user);
  return findSellerProducts(user).sort(
    (a, b) =>
      new Date(b.updatedAt || b.createdAt) -
      new Date(a.updatedAt || a.createdAt),
  );
}

export async function getOwnedListing(user, productId) {
  assertSeller(user);
  return findOwnedSellerProduct(user, String(productId || ""));
}

export async function createSellerListing(user, values, categorySlugs) {
  assertSeller(user);
  const { errors, data } = validateProductInput(values, categorySlugs);
  if (Object.keys(errors).length) return { ok: false, errors };
  const now = new Date().toISOString();
  const product = {
    ...data,
    id: `local-${window.crypto.randomUUID()}`,
    featured: false,
    createdAt: now,
    updatedAt: now,
    seller: {
      id: user.id,
      name: user.fullName,
      location: user.location || "Location not set",
    },
  };
  insertSellerProduct(user, product);
  return { ok: true, product };
}

export async function updateSellerListing(
  user,
  productId,
  values,
  categorySlugs,
) {
  assertSeller(user);
  const owned = findOwnedSellerProduct(user, productId);
  if (!owned)
    return {
      ok: false,
      formError: "This listing was not found or is owned by another seller.",
    };
  const { errors, data } = validateProductInput(values, categorySlugs);
  if (Object.keys(errors).length) return { ok: false, errors };
  const product = updateOwnedSellerProduct(user, productId, {
    ...data,
    updatedAt: new Date().toISOString(),
  });
  return { ok: true, product };
}

export async function setSellerListingStatus(user, productId, status) {
  assertSeller(user);
  if (!["active", "inactive"].includes(status))
    throw new Error("Invalid listing status.");
  return updateOwnedSellerProduct(user, productId, {
    status,
    updatedAt: new Date().toISOString(),
  });
}

export async function removeSellerListing(user, productId) {
  assertSeller(user);
  return deleteOwnedSellerProduct(user, productId);
}
