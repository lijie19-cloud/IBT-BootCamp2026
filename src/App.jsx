import { Routes, Route } from "react-router-dom";

import Layout from "./Layout";
import Home from "./Home";
import Menu from "./Menu";
import DishDetail from "./DishDetail";
import SignIn from "./SignIn";
import Checkout from "./Checkout";
import NotFound from "./NotFound";
import RequireAuth from "./auth/RequireAuth";

export default function App() {
  return (
    <Routes>
      {/* Shared layout */}
      <Route path="/" element={<Layout />}>
        {/* Home page */}
        <Route index element={<Home />} />

        {/* Menu page */}
        <Route path="menu" element={<Menu />} />

        {/* Individual dish */}
        <Route path="menu/:id" element={<DishDetail />} />

        {/* Sign in */}
        <Route path="signin" element={<SignIn />} />

        {/* Protected checkout */}
        <Route
          path="checkout"
          element={
            <RequireAuth>
              <Checkout />
            </RequireAuth>
          }
        />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
