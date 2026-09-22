import type { MetadataRoute } from "next";
import { token } from "@/config/token";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: token.siteUrl, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${token.siteUrl}/brand`, lastModified: now, priority: 0.5 },
    { url: `${token.siteUrl}/legal`, lastModified: now, priority: 0.3 },
  ];
}
