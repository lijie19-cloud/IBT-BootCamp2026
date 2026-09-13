function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div>
          <h3>CampusConnect</h3>
          <p>Connect. Discover. Participate. Belong.</p>
        </div>

        <div>
          <p>© {currentYear} CampusConnect. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
