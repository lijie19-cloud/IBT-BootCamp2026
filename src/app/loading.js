export default function AppLoading() {
  return (
    <main className="recovery-page" aria-busy="true" aria-live="polite">
      <div className="auth-gate-loading">
        <span className="spinner" aria-hidden="true" />
        Loading MarketHub…
      </div>
    </main>
  );
}
