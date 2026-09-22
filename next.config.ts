import type { NextConfig } from "next";

// Set GITHUB_PAGES=true when building for https://marcbeauregard.github.io/shibonk/
const isGhPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  // Plain static site: HTML/CSS/JS in `out/`. Security headers live in vercel.json,
  // because next.config headers() is not supported with a static export.
  output: "export",
  images: { unoptimized: true },
  poweredByHeader: false,
  env: {
    NEXT_PUBLIC_BASE_PATH: isGhPages ? "/shibonk" : "",
  },
  ...(isGhPages
    ? {
        basePath: "/shibonk",
        assetPrefix: "/shibonk",
        trailingSlash: true,
      }
    : {}),
};

export default nextConfig;
