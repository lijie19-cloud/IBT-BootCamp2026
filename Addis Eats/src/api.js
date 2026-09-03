export async function loadDishes(category = "all", signal) {
  const response = await fetch("/dishes.json", {
    signal,
  });

  if (!response.ok) {
    throw new Error(
      `Failed to load dishes. Server returned ${response.status}.`,
    );
  }

  const dishes = await response.json();

  if (category === "all") {
    return dishes;
  }

  return dishes.filter((dish) => dish.category === category);
}