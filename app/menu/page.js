import Link from "next/link";

import { db } from "@/lib/db";

export default async function MenuPage() {
  const menuItems = await db.menuItem.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="page-container">
      <div className="page-header">
        <p className="eyebrow">Addis Eats</p>

        <h1>Our Menu</h1>

        <p>Explore delicious meals available for order.</p>
      </div>

      <div className="menu-grid">
        {menuItems.map((item) => (
          <Link href={`/menu/${item.id}`} key={item.id} className="menu-card">
            {item.image && <img src={item.image} alt={item.name} />}

            <div className="menu-card-content">
              <h2>{item.name}</h2>

              <p>{item.description}</p>

              <strong>{item.price} ETB</strong>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
