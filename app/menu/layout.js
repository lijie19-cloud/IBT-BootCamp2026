import Link from "next/link";

export default function MenuLayout({ children }) {
  return (
    <section className="menu-layout">
      <aside className="menu-sidebar">
        <h3>Categories</h3>

        <nav>
          <ul>
            <li>
              <Link href="/menu?category=traditional">Traditional</Link>
            </li>

            <li>
              <Link href="/menu?category=fast-food">Fast Food</Link>
            </li>

            <li>
              <Link href="/menu?category=vegetarian">Vegetarian</Link>
            </li>
          </ul>
        </nav>
      </aside>

      <div className="menu-content">{children}</div>
    </section>
  );
}
