import { dishes } from "@/lib/dishes";
export default function sitemap() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${base}/menu`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    ...dishes.map((dish) => ({
      url: `${base}/menu/${dish.id}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    })),
  ];
}
