import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";

export const metadata = {
  title: "Forgot password",
  description: "Password recovery interface for the MarketHub demo.",
};

export default function ForgotPasswordPage() {
  return (
    <main className="auth-page compact-auth">
      <section className="auth-intro">
        <p className="eyebrow">Password recovery</p>
        <h1>Recovery needs a trusted backend.</h1>
        <p>
          The interface is ready, but this demo never pretends to send an email
          or reset a real password.
        </p>
      </section>
      <section className="auth-card">
        <div>
          <p className="eyebrow">Future workflow</p>
          <h2>Reset your password</h2>
        </div>
        <ForgotPasswordForm />
      </section>
    </main>
  );
}
