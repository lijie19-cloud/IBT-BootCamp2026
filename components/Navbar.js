import Link from "next/link";

import { getSession } from "@/lib/session";

export default async function Navbar() {
  const session = await getSession();

  return (
    <header className="navbar">
      <div className="nav-container">
        <Link href="/" className="logo">
          Addis Eats
        </Link>

        <nav className="nav-links">
          <Link href="/">Home</Link>

          <Link href="/menu">Menu</Link>

          {session && <Link href="/orders">My Orders</Link>}

          {session?.role === "STAFF" && <Link href="/kitchen">Kitchen</Link>}

          {!session ? (
            <Link href="/signin" className="nav-button">
              Sign In
            </Link>
          ) : (
            <form action="/api/signout" method="POST">
              <button type="submit" className="logout-button">
                Sign Out
              </button>
            </form>
          )}
        </nav>
      </div>
    </header>
  );
}
