function About() {
  return (
    <section className="page">
      <div className="container">
        <div className="page-header">
          <p className="page-label">ABOUT SHOPSPHERE</p>

          <h2>About Us</h2>

          <p>Learn more about the ShopSphere application.</p>
        </div>

        <div className="content-card">
          <h3>What is ShopSphere?</h3>

          <p>
            ShopSphere is a modern React e-commerce application designed to
            provide a simple and enjoyable online shopping experience.
          </p>

          <h3>Main Features</h3>

          <ul>
            <li>Browse products</li>
            <li>Search products</li>
            <li>Filter products</li>
            <li>Sort products</li>
            <li>View product details</li>
            <li>Manage a shopping cart</li>
          </ul>

          <h3>Technologies</h3>

          <p>
            React, Vite, JavaScript, React Router, CSS, Context API, and Local
            Storage.
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;
