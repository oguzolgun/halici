import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/sepet", "/odeme"],
      },
    ],
    sitemap: "https://sechali.com.tr/sitemap.xml",
  };
}
