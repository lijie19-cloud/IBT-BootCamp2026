// ========================================
// LOAD ALL DISHES
// ========================================

export async function loadDishes(category = "all", signal) {
  const response = await fetch("/dishes.json", {
    signal,
  });

  // ========================================
  // CHECK RESPONSE
  // ========================================

  if (!response.ok) {
    throw new Error(
      `Failed to load dishes. Server returned ${response.status}.`,
    );
  }

  // ========================================
  // CONVERT RESPONSE TO JSON
  // ========================================

  const dishes = await response.json();

  // ========================================
  // FILTER CATEGORY
  // ========================================

  if (category === "all") {
    return dishes;
  }

  return dishes.filter((dish) => dish.category === category);
}
