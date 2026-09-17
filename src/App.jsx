import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import DishDetail from "./pages/DishDetail";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      {/* Shared Layout */}
      <Route path="/" element={<Layout />}>
        {/* Public Routes */}
        <Route index element={<Home />} />

        <Route path="menu" element={<Menu />} />

        <Route path="menu/:id" element={<DishDetail />} />

        <Route path="cart" element={<CartPage />} />

        <Route path="login" element={<Login />} />

        {/* Protected Routes */}
        <Route element={<RequireAuth />}>
          <Route path="checkout" element={<Checkout />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
