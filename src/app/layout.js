import "./globals.css";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { ThemeProvider } from "@/context/ThemeContext";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";

const themeScript = `
  try {
    const preference = localStorage.getItem("markethub-theme") || "system";
    const resolved = preference === "system"
      ? (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
      : preference;
    document.documentElement.dataset.theme = resolved;
    document.documentElement.style.colorScheme = resolved;
  } catch (_) {}
`;

export const metadata = {
  title: {
    default: "MarketHub — Shop local. Sell confidently.",
    template: "%s | MarketHub",
  },
  description:
    "A modern online marketplace for buyers and independent sellers.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <ThemeProvider>
          <AuthProvider>
            <CartProvider>
              <a className="skip-link" href="#main-content">
                Skip to content
              </a>
              <Navbar />
              <div id="main-content">{children}</div>
              <Footer />
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
