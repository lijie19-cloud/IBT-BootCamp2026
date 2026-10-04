import { dishes } from "@/lib/dishes";

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const query = searchParams.get("q")?.trim().toLowerCase() || "";

  const requestedPage = Number(searchParams.get("page") || 1);

  const page =
    Number.isFinite(requestedPage) && requestedPage > 0 ? requestedPage : 1;

  const limit = 3;

  const filteredDishes = query
    ? dishes.filter((dish) => dish.name.toLowerCase().includes(query))
    : dishes;

  const total = filteredDishes.length;

  const totalPages = Math.max(Math.ceil(total / limit), 1);

  const safePage = Math.min(page, totalPages);

  const start = (safePage - 1) * limit;
  const end = start + limit;

  const results = filteredDishes.slice(start, end);

  return Response.json({
    data: results,
    page: safePage,
    limit,
    total,
    totalPages,
  });
}
