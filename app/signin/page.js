import Link from "next/link";
import { signInAction } from "./actions";
export const metadata = {
  title: "Sign in",
  robots: { index: false, follow: false },
};
export default async function SignInPage({ searchParams }) {
  const params = await searchParams;
  const next = typeof params.next === "string" ? params.next : "/";
  const invalid = params.error === "invalid";
  return (
    <div className="page-shell">
      <div className="container auth-wrap">
        <section className="panel">
          <span className="eyebrow">Welcome back</span>
          <h1>Sign in to Addis Eats.</h1>
          <p className="muted">Sign in to check out and follow your orders.</p>
          {invalid && (
            <p className="form-error" role="alert">
              Those details did not match a demo account. Try again.
            </p>
          )}
          <form action={signInAction}>
            <input type="hidden" name="next" value={next} />
            <div className="field">
              <label htmlFor="phone">Phone number</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                required
                placeholder="09xxxxxxxx"
              />
            </div>
            <div className="field">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                placeholder="Enter password"
              />
            </div>
            <button
              className="btn btn-primary"
              style={{ width: "100%" }}
              type="submit"
            >
              Sign in ↗
            </button>
          </form>
          <div className="demo-hint">
            <strong>Demo accounts</strong>
            <br />
            Customer: 0911111111 / Eats1234!
            <br />
            Staff: 0922222222 / Kitchen123!
            <br />
            <br />
            These credentials are for local learning only.
          </div>
        </section>
      </div>
    </div>
  );
}
