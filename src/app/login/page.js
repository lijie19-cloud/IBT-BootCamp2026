import LoginForm from "@/components/auth/LoginForm";

export const metadata = {
  title: "Log in",
  description: "Log in to a local MarketHub demo account.",
};

export default function LoginPage() {
  return (
    <main className="auth-page">
      <section className="auth-intro">
        <p className="eyebrow">Welcome back</p>
        <h1>Continue exploring MarketHub.</h1>
        <p>
          This milestone uses mock browser authentication. It demonstrates form
          behavior and roles, but it is not a secure production identity system.
        </p>
        <ul>
          <li>No plaintext passwords</li>
          <li>No access tokens in browser storage</li>
          <li>No real private or payment data</li>
        </ul>
      </section>
      <section className="auth-card">
        <div>
          <p className="eyebrow">Demo access</p>
          <h2>Log in</h2>
        </div>
        <LoginForm />
      </section>
    </main>
  );
}
