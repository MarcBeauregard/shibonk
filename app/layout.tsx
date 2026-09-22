import type { Metadata, Viewport } from "next";
import { Bagel_Fat_One, Gabarito, IBM_Plex_Mono } from "next/font/google";
import { token } from "@/config/token";
import "./globals.css";

const bagel = Bagel_Fat_One({ weight: "400", subsets: ["latin"], variable: "--font-bagel", display: "swap" });
const gabarito = Gabarito({ subsets: ["latin"], variable: "--font-gabarito", display: "swap" });
const plexMono = IBM_Plex_Mono({ weight: ["500", "600"], subsets: ["latin"], variable: "--font-plex-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(token.siteUrl),
  title: { default: `${token.name} ($${token.ticker}) — ${token.tagline}`, template: `%s · ${token.name}` },
  description: token.description,
  applicationName: token.name,
  keywords: ["Shibonk", "SHIBONK", "memecoin", "Solana", "shiba", "bonk"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: token.name,
    title: `${token.name} ($${token.ticker})`,
    description: token.description,
    url: "/",
  },
  twitter: { card: "summary_large_image", title: `${token.name} ($${token.ticker})`, description: token.description },
};

export const viewport: Viewport = { themeColor: "#9ed8ff", colorScheme: "light" };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: token.name,
  url: token.siteUrl,
  logo: `${token.siteUrl}/brand/shibonk-token-512.png`,
  sameAs: [token.links.x, token.links.telegram].filter(Boolean),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${bagel.variable} ${gabarito.variable} ${plexMono.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-ink focus:px-4 focus:py-3 focus:text-mallet"
        >
          Skip to content
        </a>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
