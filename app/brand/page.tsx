import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import { token } from "@/config/token";

export const metadata: Metadata = {
  title: "Brand kit",
  description: `Download the ${token.name} logo and see the colours, type and usage rules.`,
  alternates: { canonical: "/brand" },
};

const files = [
  { label: "SVG (vector)", href: "/brand/shibonk-token.svg" },
  { label: "PNG 1024", href: "/brand/shibonk-token-1024.png" },
  { label: "PNG 512", href: "/brand/shibonk-token-512.png" },
  { label: "PNG 256", href: "/brand/shibonk-token-256.png" },
  { label: "PNG 128", href: "/brand/shibonk-token-128.png" },
];

// Mirrors the @theme tokens in app/globals.css.
const colours = [
  { name: "Ink", hex: "#1D1426", use: "Outlines, text" },
  { name: "Paper", hex: "#FFF8EC", use: "Cards, light fills" },
  { name: "Sky", hex: "#9ED8FF", use: "Main background" },
  { name: "Shiba", hex: "#FF8A1F", use: "The dog, accents" },
  { name: "Pink", hex: "#FF5FA2", use: "The mallet, CTAs" },
  { name: "Mallet", hex: "#FFD23F", use: "Highlights, coin rim" },
  { name: "Green", hex: "#1FB873", use: "Up only" },
  { name: "Red", hex: "#E8364F", use: "Candles to bonk" },
];

const H = ({ children }: { children: React.ReactNode }) => <h2 className="mb-4 mt-10 font-display text-2xl font-normal first:mt-0">{children}</h2>;

export default function Brand() {
  return (
    <PageShell eyebrow="Brand kit" title="Brand kit">
      <H>Logo</H>
      <div className="grid items-center gap-8 sm:grid-cols-[220px_1fr]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/shibonk-token.svg" alt={`${token.name} token logo`} width={220} height={220} className="mx-auto" />
        <ul className="m-0 grid list-none gap-2.5 p-0">
          {files.map((f) => (
            <li key={f.href}>
              <a href={f.href} download className="btn btn-paper btn-sm w-full justify-between sm:w-auto">
                {f.label} <span aria-hidden="true">↓</span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <H>Colours</H>
      <ul className="m-0 grid list-none grid-cols-2 gap-3 p-0 sm:grid-cols-4">
        {colours.map((c) => (
          <li key={c.hex} className="overflow-hidden rounded-xl border-[3px] border-ink">
            <div className="h-16 border-b-[3px] border-ink" style={{ background: c.hex }} />
            <div className="px-3 py-2 text-sm">
              <strong className="block">{c.name}</strong>
              <code className="font-mono">{c.hex}</code>
              <span className="block opacity-75">{c.use}</span>
            </div>
          </li>
        ))}
      </ul>

      <H>Type</H>
      <dl className="m-0 grid gap-4">
        <div>
          <dt className="font-display text-3xl">Bagel Fat One</dt>
          <dd className="m-0 text-base opacity-80">Headlines only. Short, loud, never for paragraphs.</dd>
        </div>
        <div>
          <dt className="text-2xl font-extrabold">Gabarito</dt>
          <dd className="m-0 text-base opacity-80">Everything you read: body text, buttons, captions.</dd>
        </div>
        <div>
          <dt className="font-mono text-xl font-semibold">IBM Plex Mono</dt>
          <dd className="m-0 text-base opacity-80">Numbers, addresses, labels.</dd>
        </div>
      </dl>

      <H>Do &amp; don&apos;t</H>
      <ul className="m-0 grid gap-2 pl-5">
        <li>Keep the thick ink outline around the coin. It&apos;s what makes it read at 32 px.</li>
        <li>Don&apos;t recolour, stretch or rotate the logo, and don&apos;t put text inside the coin.</li>
        <li>Leave clear space around the coin equal to at least a quarter of its width.</li>
        <li>Memes are welcome. Fake announcements, fake CAs and impersonation are not.</li>
      </ul>
    </PageShell>
  );
}
