import type { MetadataRoute } from "next";
import { token } from "@/config/token";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${token.name} ($${token.ticker})`,
    short_name: token.name,
    description: token.description,
    start_url: "/",
    display: "standalone",
    background_color: "#9ed8ff",
    theme_color: "#9ed8ff",
    icons: [
      { src: "/brand/shibonk-token.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/brand/shibonk-token-512.png", sizes: "512x512", type: "image/png" },
      { src: "/brand/shibonk-token-256.png", sizes: "256x256", type: "image/png" },
    ],
  };
}
