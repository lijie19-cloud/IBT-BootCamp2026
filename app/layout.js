import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Addis Eats | Ethiopian Food, Delivered",
    template: "%s | Addis Eats",
  },
  description:
    "Discover Ethiopian favorites and order delicious meals with Addis Eats.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Addis Eats | Ethiopian Food, Delivered",
    description:
      "Discover Ethiopian favorites and order delicious meals with Addis Eats.",
    url: siteUrl,
    siteName: "Addis Eats",
    locale: "en_ET",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
