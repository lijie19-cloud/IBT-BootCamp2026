import Link from "next/link";
import { notFound } from "next/navigation";
import { getDishById, getDishes } from "../../lib/dishes";

export async function generateStaticParams() {
  const dishes = await getDishes();

  return dishes.map((dish) => ({
    id: dish.id.toString(),
  }));
}

export default async function DishPage({ params }) {
  const { id } = await params;

  const dish = await DishById(id);

  if (!dish) {
    notFound();
  }

  return (
    <main>
      <Link href="/">← Back to Home</Link>

      <h1>{dish.name}</h1>
      <p>{dish.description}</p>
      <p>{dish.price} ETB</p>
    </main>
  );
}
