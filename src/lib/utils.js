export function formatETB(value) {
  return new Intl.NumberFormat("en-ET", {
    style: "currency",
    currency: "ETB",
    maximumFractionDigits: 0,
  }).format(value);
}

export function categoryLabel(slug, categories) {
  return categories.find((category) => category.slug === slug)?.name || slug;
}
