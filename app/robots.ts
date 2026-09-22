import type { MetadataRoute } from "next";
import { token } from "@/config/token";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/" }, sitemap: `${token.siteUrl}/sitemap.xml` };
}
