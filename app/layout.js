import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { CartProvider } from "./components/CartProvider";
import "./globals.css";

export const metadata = {
  title: "Addis Eats",
  description: "Discover delicious Ethiopian food with Addis Eats.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Navbar />

          <main className="site-content">{children}</main>

          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
