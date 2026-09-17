import { Outlet } from "react-router-dom";

import Header from "./Header";
import { useTheme } from "../context/ThemeContext";

function Layout() {
  const { theme } = useTheme();

  return (
    <div className={`app ${theme}`}>
      <Header />

      <main className="main-content">
        <Outlet />
      </main>

      <footer className="site-footer">
        <p>© 2026 Addis Eats. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Layout;
