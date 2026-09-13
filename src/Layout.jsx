import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useCart } from "./context/CartContext";

function Layout() {
  // =========================================
  // GET SUCCESS MESSAGE
  // =========================================

  const { successMessage } = useCart();

  return (
    <div className="app-layout">
      {/* HEADER */}
      <Header />

      {/* NAVBAR */}
      <Navbar />

      {/* SUCCESS MESSAGE */}
      {successMessage && (
        <div className="success-toast">
          <span>✓</span>

          <p>{successMessage}</p>
        </div>
      )}

      {/* MAIN CONTENT */}
      <main className="main-content">
        <Outlet />
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}

export default Layout;
