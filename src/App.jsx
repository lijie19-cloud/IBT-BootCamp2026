import { lazy, Suspense } from "react";

import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";
import LoadingSkeleton from "./components/LoadingSkeleton";

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import DishDetail from "./pages/DishDetail";
import CartPage from "./pages/CartPage";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

/*
  Lazy-loaded routes.

  These files are loaded only when their routes
  are actually visited.
*/
const Checkout = lazy(() => import("./pages/Checkout"));

const Receipt = lazy(() => import("./pages/Receipt"));

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />

        <Route path="menu" element={<Menu />} />

        <Route path="menu/:id" element={<DishDetail />} />

        <Route path="cart" element={<CartPage />} />

        <Route path="login" element={<Login />} />

        <Route element={<RequireAuth />}>
          <Route
            path="checkout"
            element={
              <Suspense
                fallback={<LoadingSkeleton message="Loading checkout..." />}
              >
                <Checkout />
              </Suspense>
            }
          />

          <Route
            path="receipt"
            element={
              <Suspense
                fallback={<LoadingSkeleton message="Loading receipt..." />}
              >
                <Receipt />
              </Suspense>
            }
          />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
