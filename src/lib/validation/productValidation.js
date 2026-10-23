const SORT_OPTIONS = new Set(["newest", "price-asc", "price-desc"]);

function optionalPrice(value) {
  if (value === undefined || value === null || value === "") return null;
  const number = Number(value);
  return Number.isFinite(number) && number >= 0 ? number : null;
}

export function normalizeCatalogFilters(input = {}) {
  const page = Number.parseInt(input.page, 10);
  return {
    query: String(input.query || "")
      .trim()
      .slice(0, 80),
    category: String(input.category || "")
      .trim()
      .toLowerCase()
      .slice(0, 60),
    minPrice: optionalPrice(input.minPrice),
    maxPrice: optionalPrice(input.maxPrice),
    sort: SORT_OPTIONS.has(input.sort) ? input.sort : "newest",
    page: Number.isInteger(page) && page > 0 ? page : 1,
  };
}

const PRODUCT_STATUSES = new Set(["active", "inactive"]);

export function validateProductInput(values, validCategories = []) {
  const errors = {};
  const name = String(values.name || "").trim();
  const description = String(values.description || "").trim();
  const price = Number(values.price);
  const stock = Number(values.stock);
  const category = String(values.category || "").trim();
  const image = String(values.image || "").trim();
  const status = String(values.status || "active");

  if (name.length < 3 || name.length > 120)
    errors.name = "Use a product name between 3 and 120 characters.";
  if (description.length < 20 || description.length > 2000)
    errors.description = "Use a description between 20 and 2,000 characters.";
  if (!Number.isFinite(price) || price <= 0 || price > 10000000)
    errors.price =
      "Enter a price greater than 0 and no more than 10,000,000 ETB.";
  if (!Number.isInteger(stock) || stock < 0 || stock > 100000)
    errors.stock = "Stock must be a whole number from 0 to 100,000.";
  if (!validCategories.includes(category))
    errors.category = "Choose a valid product category.";
  if (!PRODUCT_STATUSES.has(status))
    errors.status = "Choose active or inactive.";
  const isLocalImage = /^\/images\/products\/[a-z0-9-]+\.svg$/i.test(image);
  let isHttpsImage = false;
  try {
    isHttpsImage = new URL(image).protocol === "https:";
  } catch {
    isHttpsImage = false;
  }
  if (!image || image.length > 500 || (!isLocalImage && !isHttpsImage))
    errors.image = "Choose a demo image or enter a valid HTTPS image URL.";

  return {
    errors,
    data: { name, description, price, stock, category, image, status },
  };
}
