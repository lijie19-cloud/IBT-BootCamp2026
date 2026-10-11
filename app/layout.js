import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ),
  title: {
    default: "Addis Eats — Ethiopian food, made memorable",
    template: "%s | Addis Eats",
  },
  description:
    "Discover Ethiopian favorites, order your next meal, and follow your Addis Eats delivery.",
  openGraph: {
    title: "Addis Eats",
    description: "Ethiopian food, made memorable.",
    type: "website",
    images: ["/og-image.svg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
