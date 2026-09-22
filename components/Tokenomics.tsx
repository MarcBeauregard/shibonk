import Reveal from "./Reveal";
import { token } from "@/config/token";

const R = 80;
const C = 2 * Math.PI * R;

// Each segment starts where the previous ones end.
const segments = token.allocation.map((a, i) => ({
  ...a,
  len: (a.pct / 100) * C,
  start: token.allocation.slice(0, i).reduce((sum, b) => sum + (b.pct / 100) * C, 0),
}));

function Donut() {
  const label = token.allocation.map((a) => `${a.pct}% ${a.label}`).join(", ");
  return (
    <div className="relative mx-auto w-full max-w-[420px]">
      <svg viewBox="0 0 240 240" role="img" aria-label={`Supply split: ${label}`} className="block h-auto w-full">
        <circle cx="120" cy="120" r={R} fill="none" stroke="var(--color-ink)" strokeWidth="46" />
        <g transform="rotate(-90 120 120)">
          {segments.map((a) => (
              <circle
                key={a.label}
                cx="120"
                cy="120"
                r={R}
                fill="none"
                stroke={a.color}
                strokeWidth="38"
                strokeDasharray={`${a.len.toFixed(2)} ${C.toFixed(2)}`}
                strokeDashoffset={(-a.start).toFixed(2)}
                className="transition-[stroke-width] duration-200 hover:[stroke-width:46]"
              >
                <title>{`${a.label}: ${a.pct}%`}</title>
              </circle>
          ))}
        </g>
      </svg>
      <div className="pointer-events-none absolute inset-0 grid place-items-center text-center">
        <div>
          <strong className="block font-display text-[clamp(2rem,5vw,2.8rem)] font-normal leading-none">1T</strong>
          <span className="font-mono text-[0.8rem] font-semibold tracking-[0.08em]">TOTAL SUPPLY</span>
        </div>
      </div>
    </div>
  );
}

const facts = [
  { k: "Total supply", v: token.supply.toLocaleString("en-US"), s: "One trillion. Fixed forever." },
  { k: "Buy / sell tax", v: "0 / 0", s: "The only fee is the bonk." },
  { k: "Liquidity", v: "Burned", s: "LP tokens burned at launch. Check it on RugCheck." },
  { k: "Mint authority", v: "Revoked", s: "Nobody can print more. Including us." },
  { k: "Chain", v: "Solana", s: "SPL token. Fast bonks, tiny fees." },
  { k: "Team allocation", v: "0%", s: "The team buys at launch like everyone." },
];

export default function Tokenomics() {
  return (
    <section id="tokenomics" className="section halftone bg-shiba">
      <div className="wrap">
        <span className="tag">Tokenomics</span>
        <Reveal>
          <h2 className="h2">
            Simple math. <br />
            Heavy mallet.
          </h2>
          <p className="lede">
            No team bag, no presale, no tax. Liquidity goes in, the LP tokens get burned, the mint gets revoked. That&apos;s the whole plan, and
            every part of it is checkable on-chain.
          </p>
        </Reveal>
        <div className="grid items-center gap-10 md:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <Donut />
            <ul className="m-0 mt-6 grid list-none gap-2.5 p-0">
              {token.allocation.map((a) => (
                <li key={a.label} className="flex items-center gap-3 font-semibold">
                  <span className="size-[22px] shrink-0 rounded-md border-[3px] border-ink" style={{ background: a.color }} />
                  {a.label}
                  <span className="ml-auto font-mono tabular-nums">{a.pct}%</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <div className="grid gap-3.5 sm:grid-cols-2">
            {facts.map((f, i) => (
              <Reveal key={f.k} delay={i * 0.05} className="card px-[18px] py-4 transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 hover:-rotate-[0.6deg]">
                <div className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-shiba-dark">{f.k}</div>
                <div className="mt-1.5 break-words font-display text-[clamp(1.5rem,3vw,1.9rem)] leading-tight tabular-nums">{f.v}</div>
                <div className="text-[0.92rem] opacity-80">{f.s}</div>
              </Reveal>
            ))}
          </div>
        </div>
        {(token.links.solscan || token.links.rugcheck) && (
          <p className="mt-8 font-semibold">
            Verify it yourself:{" "}
            {token.links.solscan && (
              <a href={token.links.solscan} target="_blank" rel="noopener noreferrer" className="underline">
                Solscan ↗
              </a>
            )}
            {token.links.solscan && token.links.rugcheck && " · "}
            {token.links.rugcheck && (
              <a href={token.links.rugcheck} target="_blank" rel="noopener noreferrer" className="underline">
                RugCheck ↗
              </a>
            )}
          </p>
        )}
      </div>
    </section>
  );
}
