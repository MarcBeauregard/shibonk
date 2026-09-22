import ShibaHead from "./ShibaHead";
import { token } from "@/config/token";

const official = [
  { name: "Website", url: token.siteUrl, note: "this page" },
  { name: "X / Twitter", url: token.links.x },
  { name: "Telegram", url: token.links.telegram },
  { name: "DEXScreener", url: token.links.dexscreener },
  { name: "Birdeye", url: token.links.birdeye },
];

export function OfficialLinks() {
  return (
    <div className="card mx-auto mt-12 max-w-[640px] p-6 text-left">
      <h3 className="m-0 font-display text-2xl font-normal">Official links</h3>
      <p className="mb-4 mt-1 text-base">
        These are the only ones. The team never DMs first and will never ask for your recovery phrase. Anyone who does is a scammer.
      </p>
      <ul className="m-0 grid list-none gap-2 p-0 font-mono text-[0.9rem]">
        {official.map((l) => (
          <li key={l.name} className="flex flex-wrap items-baseline justify-between gap-x-4 border-b-2 border-dashed border-ink/20 pb-2 last:border-0">
            <span className="font-semibold">{l.name}</span>
            {l.url ? (
              <a href={l.url} target="_blank" rel="noopener noreferrer" className="break-all underline">
                {l.url.replace(/^https?:\/\//, "")}
                {l.note ? ` (${l.note})` : ""}
              </a>
            ) : (
              <span className="opacity-70">announced at launch</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Community() {
  const socials = [
    { label: "X / Twitter", url: token.links.x, cls: "" },
    { label: "Telegram", url: token.links.telegram, cls: "btn-paper" },
    { label: "DEXScreener", url: token.links.dexscreener, cls: "btn-paper" },
  ].filter((s) => s.url);

  return (
    <section id="community" className="section relative overflow-hidden bg-pink text-center">
      <div className="wrap">
        <ShibaHead className="mx-auto mb-2.5 block w-[min(200px,50vw)] animate-bob" />
        <h2 className="outline-text m-0 mb-3.5 font-display text-[clamp(2.8rem,9vw,6.4rem)] font-normal leading-[0.95] [text-shadow:6px_6px_0_var(--color-ink)]">
          Join the pack
        </h2>
        <p className="mx-auto mb-8 max-w-[48ch] text-[1.15rem]">
          The chart is half the fun. The other half is shibas with mallets at 3 a.m.
        </p>
        {socials.length > 0 && (
          <div className="flex flex-wrap justify-center gap-3.5">
            {socials.map((s) => (
              <a key={s.label} className={`btn ${s.cls}`} href={s.url} target="_blank" rel="noopener noreferrer">
                {s.label} ↗
              </a>
            ))}
          </div>
        )}
        <OfficialLinks />
      </div>
    </section>
  );
}
