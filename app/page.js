import Image from "next/image";
import Link from "next/link";
import DishCard from "@/components/DishCard";
import { dishes } from "@/lib/dishes";

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <span className="eyebrow">A taste of Ethiopia, delivered</span>
            <h1>
              Good food.
              <br />
              <em>Great stories.</em>
            </h1>
            <p>
              From the first tear of injera to the last spoon of shiro, discover
              the flavors that bring us together.
            </p>
            <div className="hero-actions">
              <Link href="/menu" className="btn btn-primary">
                Explore the menu ↗
              </Link>
              <Link href="#our-story" className="btn btn-light">
                Our story
              </Link>
            </div>
            <div className="hero-note">
              <div className="avatar-stack">
                <span />
                <span />
                <span />
              </div>
              <span>
                <strong>Made with care</strong>
                <br />
                Inspired by Ethiopian food culture
              </span>
            </div>
          </div>
          <div className="hero-visual">
            <Image
              className="hero-photo"
              src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=90"
              alt="Freshly prepared meal ready to share"
              width={900}
              height={1000}
              priority
            />
            <div className="floating-card float-top">
              <strong>Fresh & full of flavor</strong>
              <small>Made for sharing</small>
            </div>
            <div className="floating-card float-bottom">
              <strong>From 180 ETB</strong>
              <small>Find your next favorite</small>
            </div>
          </div>
        </div>
      </section>
      <section className="section section-white">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Loved by food people</span>
              <h2>Popular right now</h2>
              <p>Comforting classics and fresh favorites from our kitchen.</p>
            </div>
            <Link href="/menu" className="btn btn-light">
              View full menu ↗
            </Link>
          </div>
          <div className="dish-grid">
            {dishes.slice(0, 4).map((dish) => (
              <DishCard key={dish.id} dish={dish} />
            ))}
          </div>
        </div>
      </section>
      <section className="section" id="our-story">
        <div className="container">
          <div className="feature-band">
            <div>
              <span className="eyebrow" style={{ color: "#d7f36a" }}>
                The Addis Eats feeling
              </span>
              <h2>
                More than a meal.
                <br />A reason to gather.
              </h2>
              <p>
                We celebrate the dishes that make Ethiopian tables
                special—generous portions, bold spices, and the joy of sharing a
                plate together.
              </p>
              <Link className="btn btn-lime" href="/menu">
                Find your favorite ↗
              </Link>
            </div>
            <div className="feature-pills">
              <span>🌶️ Bold Ethiopian spices</span>
              <span>🌿 Vegetarian favorites</span>
              <span>🫓 Injera-inspired classics</span>
              <span>❤️ Food made for sharing</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
