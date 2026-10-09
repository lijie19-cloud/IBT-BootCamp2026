import Link from "next/link";

export default async function SignInPage({ searchParams }) {
  const params = await searchParams;

  const next = typeof params?.next === "string" ? params.next : "/";

  return (
    <main className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <p className="eyebrow">Addis Eats</p>

          <h1>Sign in</h1>

          <p>Sign in to continue.</p>
        </div>

        <form action="/api/signin" method="POST" className="auth-form">
          <input type="hidden" name="next" value={next} />

          <div className="form-group">
            <label htmlFor="email">Email</label>

            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>

            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              placeholder="Your password"
            />
          </div>

          <button type="submit" className="button full-width">
            Sign In
          </button>
        </form>

        <Link href="/" className="back-link">
          ← Back home
        </Link>
      </div>
    </main>
  );
}
