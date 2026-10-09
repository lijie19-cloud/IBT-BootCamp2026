import Link from "next/link";
import { notFound } from "next/navigation";

import { db } from "@/lib/db";

export default async function MenuItemPage({ params }) {
  const { id } = await params;

  const item = await db.menuItem.findUnique({
    where: {
      id,
    },
  });

  if (!item) {
    notFound();
  }

  return (
    <main className="page-container">
      <Link href="/menu" className="back-link">
        ← Back to menu
      </Link>

      <article className="menu-detail">
        {item.image && (
          <img src={item.image} alt={item.name} className="menu-detail-image" />
        )}

        <div>
          <p className="eyebrow">Addis Eats</p>

          <h1>{item.name}</h1>

          <p>{item.description}</p>

          <h2>{item.price} ETB</h2>

          <Link href="/checkout" className="button">
            Order Now
          </Link>
        </div>
      </article>
    </main>
  );
}
