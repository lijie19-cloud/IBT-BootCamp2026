export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/menu/"],
        disallow: ["/cart", "/checkout", "/order-success"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
