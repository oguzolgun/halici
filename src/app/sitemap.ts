import type { MetadataRoute } from "next";
import { getAllRugs } from "@/lib/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://sechali.com.tr";
  const rugs = getAllRugs();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date("2026-11-11"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/halilar`,
      lastModified: new Date("2026-11-11"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/hakkimizda`,
      lastModified: new Date("2026-11-11"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/iletisim`,
      lastModified: new Date("2026-11-11"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  const productRoutes: MetadataRoute.Sitemap = rugs.map((rug) => ({
    url: `${baseUrl}/halilar/${rug.slug}`,
    lastModified: new Date("2026-11-11"),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...productRoutes];
}
