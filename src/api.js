// Load products from the JSON API
export async function loadProducts() {
  const response = await fetch("/products.json");

  // Check whether the request was successful
  if (!response.ok) {
    throw new Error("Failed to load products.");
  }

  // Convert the response into JavaScript data
  const products = await response.json();

  return products;
}
