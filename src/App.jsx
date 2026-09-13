// Import React Router components
import { Routes, Route } from "react-router-dom";

// Import shared layout
import Layout from "./Layout";

// Import pages
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Categories from "./pages/Categories";
import CategoryProducts from "./pages/CategoryProducts";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

// Main application component
function App() {
  return (
    <Routes>
      {/* Shared application layout */}
      <Route path="/" element={<Layout />}>
        {/* Home */}
        <Route index element={<Home />} />

        {/* Products */}
        <Route path="products" element={<Products />} />

        {/* Product details */}
        <Route
          path="products/:id"
          element={<ProductDetails />}
        />

        {/* Categories */}
        <Route
          path="categories"
          element={<Categories />}
        />

        {/* Products by category */}
        <Route
          path="categories/:category"
          element={<CategoryProducts />}
        />

        {/* Cart */}
        <Route path="cart" element={<Cart />} />

        {/* Checkout */}
        <Route
          path="checkout"
          element={<Checkout />}
        />

        {/* About */}
        <Route path="about" element={<About />} />

        {/* Contact */}
        <Route path="contact" element={<Contact />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
