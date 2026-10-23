import {
  findAllCategories,
  findAllProducts,
  findCategoryBySlug,
  findProductById,
} from "@/lib/repositories/productRepository";
import { normalizeCatalogFilters } from "@/lib/validation/productValidation";

const PAGE_SIZE = 6;

export async function getCategories() {
  return findAllCategories();
}

export async function getCategory(slug) {
  return findCategoryBySlug(String(slug || "").toLowerCase());
}

export async function getProduct(id) {
  return findProductById(String(id || ""));
}

export async function getProductIds() {
  const products = await findAllProducts();
  return products
    .filter((product) => product.status === "active")
    .map((product) => product.id);
}

export async function getFeaturedProducts(limit = 4) {
  const products = await findAllProducts();
  return products
    .filter((product) => product.status === "active" && product.featured)
    .slice(0, limit);
}

export async function getRecentProducts(limit = 4) {
  const products = await findAllProducts();
  return products
    .filter((product) => product.status === "active")
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, limit);
}

export async function getRelatedProducts(product, limit = 3) {
  const products = await findAllProducts();
  return products
    .filter(
      (item) =>
        item.status === "active" &&
        item.category === product.category &&
        item.id !== product.id,
    )
    .slice(0, limit);
}

export async function getCatalog(rawFilters = {}) {
  const filters = normalizeCatalogFilters(rawFilters);
  const allProducts = await findAllProducts();
  const query = filters.query.toLowerCase();

  let filtered = allProducts.filter((product) => {
    if (product.status !== "active") return false;
    if (filters.category && product.category !== filters.category) return false;
    if (filters.minPrice !== null && product.price < filters.minPrice)
      return false;
    if (filters.maxPrice !== null && product.price > filters.maxPrice)
      return false;
    if (!query) return true;
    const searchable =
      `${product.name} ${product.description} ${product.seller.name}`.toLowerCase();
    return searchable.includes(query);
  });

  filtered = filtered.sort((a, b) => {
    if (filters.sort === "price-asc") return a.price - b.price;
    if (filters.sort === "price-desc") return b.price - a.price;
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  const totalItems = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / PAGE_SIZE));
  const currentPage = Math.min(filters.page, totalPages);
  const start = (currentPage - 1) * PAGE_SIZE;

  return {
    products: filtered.slice(start, start + PAGE_SIZE),
    filters: { ...filters, page: currentPage },
    pagination: { currentPage, totalPages, totalItems, pageSize: PAGE_SIZE },
  };
}
