import "./globals.css";

export const metadata = {
  title: {
    default: "Addis Eats | Delivery Tracking",
    template: "%s | Addis Eats",
  },
  description: "Track your Addis Eats delivery from restaurant to destination.",
  applicationName: "Addis Eats",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
