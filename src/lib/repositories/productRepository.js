import { categories, products } from "@/lib/data/products";

export async function findAllProducts() {
  return products.map((product) => ({
    ...product,
    seller: { ...product.seller },
  }));
}

export async function findProductById(id) {
  const product = products.find((item) => item.id === id);
  return product ? { ...product, seller: { ...product.seller } } : null;
}

export async function findAllCategories() {
  return categories.map((category) => ({ ...category }));
}

export async function findCategoryBySlug(slug) {
  const category = categories.find((item) => item.slug === slug);
  return category ? { ...category } : null;
}
