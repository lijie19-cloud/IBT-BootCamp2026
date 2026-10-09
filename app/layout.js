import "./globals.css";

import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Addis Eats",
  description: "Order delicious food with Addis Eats.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />

        <main>{children}</main>
      </body>
    </html>
  );
}
