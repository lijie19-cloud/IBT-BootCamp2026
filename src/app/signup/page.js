import SignupForm from "@/components/auth/SignupForm";

export const metadata = {
  title: "Create account",
  description: "Create a local buyer or seller demo account.",
};

export default function SignupPage() {
  return (
    <main className="auth-page">
      <section className="auth-intro">
        <p className="eyebrow">Join the demo</p>
        <h1>Choose how you use the marketplace.</h1>
        <p>
          Create a buyer or seller account stored only in this browser. The
          password is salted and hashed, but client storage is never trusted as
          production identity.
        </p>
        <ul>
          <li>Buyer and seller roles</li>
          <li>Helpful field validation</li>
          <li>Role-aware destinations</li>
        </ul>
      </section>
      <section className="auth-card">
        <div>
          <p className="eyebrow">Local registration</p>
          <h2>Create account</h2>
        </div>
        <SignupForm />
      </section>
    </main>
  );
}
