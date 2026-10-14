import Link from "next/link";

const highlights = [
  {
    icon: "⌖",
    title: "Follow the route",
    text: "See the courier and delivery destination on an interactive map.",
  },
  {
    icon: "↻",
    title: "Live status updates",
    text: "Follow order progress as its status changes.",
  },
  {
    icon: "ETB",
    title: "Local by design",
    text: "Prices and timestamps are formatted for Ethiopia.",
  },
];

export default function HomePage() {
  return (
    <main className="landing">
      <nav className="topbar">
        <Link href="/" className="brand">
          <span className="brand-mark">AE</span>
          <span>
            Addis<span className="brand-accent"> Eats</span>
          </span>
        </Link>
        <span className="nav-note">
          <span className="live-dot" /> Delivery tracking demo
        </span>
      </nav>

      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">
            <span className="eyebrow-line" /> YOUR MEAL, ON ITS WAY
          </span>
          <h1>
            Good food.
            <br />
            <span>Clear delivery.</span>
          </h1>
          <p className="hero-description">
            Follow your Addis Eats order from the kitchen to your door, with
            status updates and courier location in one simple place.
          </p>
          <Link className="primary-button" href="/track/AE-1042">
            Track order AE-1042 <span aria-hidden="true">↗</span>
          </Link>
          <div className="hero-meta">
            <span className="check-icon">✓</span> Sample order · No sign-in
            required
          </div>
        </div>
        <div
          className="hero-visual"
          aria-label="Illustration of a food delivery order"
        >
          <div className="visual-orbit orbit-one" />
          <div className="visual-orbit orbit-two" />
          <div className="food-illustration">
            <div className="plate">
              <div className="plate-inner">
                <span className="food-leaf">✦</span>
                <span className="food-center">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5bfAgFuxI0gkS-xhGAUNPSKVMYk8VrlDXJ5U3aM-J0g&s"
                    alt="Delicious food"
                  />
                </span>
                <span className="food-sprinkle sprinkle-one">✦</span>
                <span className="food-sprinkle sprinkle-two">✦</span>
              </div>
            </div>
          </div>
          <div className="floating-card restaurant-card">
            <span className="float-icon">⌂</span>
            <span>
              <strong>Almaz Kitchen</strong>
              <small>Bole, Addis Ababa</small>
            </span>
            <span className="mini-check">✓</span>
          </div>
          <div className="floating-card delivery-card">
            <span className="delivery-emoji">🛵</span>
            <span>
              <strong>On the way</strong>
              <small>Your order is moving</small>
            </span>
          </div>
          <span className="visual-spark spark-a">✳</span>
          <span className="visual-spark spark-b">✦</span>
        </div>
      </section>

      <section className="feature-section">
        <div className="section-heading">
          <span className="eyebrow">TRACK WITH CONFIDENCE</span>
          <h2>Everything you need to know.</h2>
        </div>
        <div className="feature-grid">
          {highlights.map((item) => (
            <article className="feature-card" key={item.title}>
              <span className="feature-icon">{item.icon}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>
      <footer className="footer">
        <Link href="/" className="brand footer-brand">
          <span className="brand-mark">AE</span>
          <span>
            Addis<span className="brand-accent"> Eats</span>
          </span>
        </Link>
        <span>Made for a smoother delivery experience.</span>
        <span>© 2026 Addis Eats </span>
      </footer>
    </main>
  );
}
