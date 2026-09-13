import { Link } from "react-router-dom";

function About() {
  return (
    <main className="about-page">
      {/* =========================
          ABOUT HERO
      ========================= */}
      <section className="about-hero">
        <div className="about-hero-content">
          <span className="section-label">About CampusConnect</span>

          <h1>
            Building a stronger
            <span> student community.</span>
          </h1>

          <p>
            CampusConnect is a student community portal designed to help
            students discover opportunities, connect with communities,
            participate in campus activities, and find useful resources.
          </p>
        </div>
      </section>

      {/* =========================
          INTRODUCTION
      ========================= */}
      <section className="about-section">
        <div className="about-content-grid">
          <div className="about-content">
            <span className="section-label">Our Story</span>

            <h2>One place for your campus experience</h2>

            <p>
              University life is about more than attending classes. Students
              have opportunities to join clubs, attend events, build
              relationships, develop skills, and access support services.
            </p>

            <p>
              CampusConnect brings these opportunities together in one
              easy-to-use platform so that students can spend less time
              searching and more time participating.
            </p>
          </div>

          <div className="about-highlight">
            <div className="highlight-icon">CC</div>

            <h3>Connect. Discover. Participate. Belong.</h3>

            <p>
              Our goal is to make campus life more connected, accessible, and
              engaging for every student.
            </p>
          </div>
        </div>
      </section>

      {/* =========================
          MISSION
      ========================= */}
      <section className="about-section mission-section">
        <div className="about-section-heading">
          <span className="section-label">Our Mission</span>

          <h2>Helping students make the most of university life</h2>

          <p>CampusConnect is built around four important principles.</p>
        </div>

        <div className="mission-grid">
          <article className="mission-card">
            <div className="mission-number">01</div>

            <h3>Connect</h3>

            <p>
              Help students find communities, clubs, and people who share their
              interests.
            </p>
          </article>

          <article className="mission-card">
            <div className="mission-number">02</div>

            <h3>Discover</h3>

            <p>
              Make it easier to discover events, opportunities, and useful
              campus resources.
            </p>
          </article>

          <article className="mission-card">
            <div className="mission-number">03</div>

            <h3>Participate</h3>

            <p>
              Encourage students to take part in activities, workshops,
              competitions, and organizations.
            </p>
          </article>

          <article className="mission-card">
            <div className="mission-number">04</div>

            <h3>Belong</h3>

            <p>
              Create a welcoming campus environment where students can build
              meaningful connections.
            </p>
          </article>
        </div>
      </section>

      {/* =========================
          WHAT STUDENTS CAN DO
      ========================= */}
      <section className="about-section">
        <div className="about-section-heading">
          <span className="section-label">Get Involved</span>

          <h2>What can students do?</h2>

          <p>
            CampusConnect gives students several ways to become more active in
            their campus community.
          </p>
        </div>

        <div className="student-actions-grid">
          <article className="student-action-card">
            <span className="action-icon">🎓</span>

            <h3>Join Clubs</h3>

            <p>
              Explore student clubs based on technology, sports, arts, business,
              academics, culture, and social interests.
            </p>

            <Link to="/clubs">Explore Clubs →</Link>
          </article>

          <article className="student-action-card">
            <span className="action-icon">📅</span>

            <h3>Attend Events</h3>

            <p>
              Discover workshops, competitions, festivals, career events, and
              other campus activities.
            </p>

            <Link to="/events">Discover Events →</Link>
          </article>

          <article className="student-action-card">
            <span className="action-icon">📚</span>

            <h3>Find Resources</h3>

            <p>
              Access academic support, library services, career resources, and
              student services.
            </p>

            <Link to="/resources">Find Resources →</Link>
          </article>
        </div>
      </section>

      {/* =========================
          BENEFITS
      ========================= */}
      <section className="about-section benefits-section">
        <div className="about-section-heading">
          <span className="section-label">Why CampusConnect?</span>

          <h2>Designed around students</h2>

          <p>
            Everything is organized to make discovering and participating in
            campus life easier.
          </p>
        </div>

        <div className="benefits-list">
          <div className="benefit-item">
            <span className="benefit-check">✓</span>

            <div>
              <h3>Easy to Explore</h3>

              <p>Quickly search and filter clubs, events, and resources.</p>
            </div>
          </div>

          <div className="benefit-item">
            <span className="benefit-check">✓</span>

            <div>
              <h3>Centralized Information</h3>

              <p>
                Find important student opportunities and services in one place.
              </p>
            </div>
          </div>

          <div className="benefit-item">
            <span className="benefit-check">✓</span>

            <div>
              <h3>Community Focused</h3>

              <p>
                Discover communities and activities that match your interests.
              </p>
            </div>
          </div>

          <div className="benefit-item">
            <span className="benefit-check">✓</span>

            <div>
              <h3>Accessible Anywhere</h3>

              <p>
                Use CampusConnect across phones, tablets, laptops, and desktop
                computers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          FINAL CTA
      ========================= */}
      <section className="about-cta">
        <div>
          <span className="section-label">Start exploring</span>

          <h2>Your campus community is waiting.</h2>

          <p>
            Discover a club, attend an event, or find a resource that can make
            your student experience better.
          </p>
        </div>

        <div className="about-cta-actions">
          <Link to="/clubs" className="about-cta-button">
            Explore Clubs
          </Link>

          <Link to="/events" className="about-cta-button secondary">
            View Events
          </Link>
        </div>
      </section>
    </main>
  );
}

export default About;
