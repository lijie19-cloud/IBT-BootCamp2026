// Load products from our local JSON file
export async function loadProducts() {
  const response = await fetch("/products.json");

  // fetch() does not automatically reject
  // when the server returns an HTTP error.
  if (!response.ok) {
    throw new Error("Failed to load products.");
  }

  // Convert the response into JavaScript data
  const products = await response.json();

  return products;
}