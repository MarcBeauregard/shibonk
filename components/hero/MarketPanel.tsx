"use client";

import { useSyncExternalStore } from "react";
import { token } from "@/config/token";
import { formatCompactUsd, formatPrice } from "@/lib/dexscreener";
import { useMarket } from "@/lib/useMarket";

function subscribeClock(cb: () => void) {
  const id = setInterval(cb, 1000);
  return () => clearInterval(id);
}

function Countdown({ to }: { to: string }) {
  const target = Date.parse(to);
  // Ticks once a second on the client; null during server render so the HTML matches.
  const now = useSyncExternalStore(subscribeClock, () => Math.floor(Date.now() / 1000) * 1000, () => null);
  if (!Number.isFinite(target)) return <span>Launching soon</span>;
  if (now == null) return <span aria-hidden="true">--d --h --m --s</span>;
  const left = Math.max(0, target - now);
  if (left === 0) return <span>Launching now</span>;
  const d = Math.floor(left / 86_400_000);
  const h = Math.floor(left / 3_600_000) % 24;
  const m = Math.floor(left / 60_000) % 60;
  const s = Math.floor(left / 1000) % 60;
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    <span className="tabular-nums" aria-label={`Launch in ${d} days ${h} hours ${m} minutes`}>
      {d}d {pad(h)}h {pad(m)}m {pad(s)}s
    </span>
  );
}

const Stat = ({ k, v }: { k: string; v: string }) => (
  <div className="flex flex-col">
    <span className="text-[0.7rem] tracking-[0.1em] opacity-75">{k}</span>
    <span className="text-[0.95rem] tabular-nums">{v}</span>
  </div>
);

/** Top bar of the bonk stage: real market data after launch, countdown before. */
export default function MarketPanel() {
  const state = useMarket(token.launched ? token.ca : undefined);

  const bar = "flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b-[3px] border-ink bg-mallet px-4 py-3 font-mono text-[0.82rem] font-semibold leading-tight";

  if (!token.launched) {
    return (
      <div className={bar}>
        <span>${token.ticker} / SOL</span>
        <span className="text-base">{token.launchDate ? <Countdown to={token.launchDate} /> : "Launching soon"}</span>
        <span className="rounded-md border-2 border-ink bg-paper px-2 py-0.5">Pre-launch</span>
      </div>
    );
  }

  if (state.status === "loading" || state.status === "idle") {
    return (
      <div className={bar} aria-busy="true">
        <span>${token.ticker} / SOL</span>
        <span className="h-4 w-40 animate-pulse rounded bg-ink/15" />
      </div>
    );
  }

  if (state.status === "empty") {
    return (
      <div className={bar}>
        <span>${token.ticker} / SOL</span>
        <span>Pool not indexed by DEXScreener yet — check back in a few minutes.</span>
      </div>
    );
  }

  const market = state.status === "ready" ? state.market : state.last;
  if (!market) {
    return (
      <div className={bar} role="status">
        <span>${token.ticker} / SOL</span>
        <span>
          Live price unavailable.{" "}
          {token.links.dexscreener && (
            <a href={token.links.dexscreener} target="_blank" rel="noopener noreferrer" className="underline">
              See DEXScreener ↗
            </a>
          )}
        </span>
      </div>
    );
  }

  const ch = market.change24h;
  return (
    <div className={bar}>
      <Stat k="PRICE" v={formatPrice(market.priceUsd)} />
      <Stat k="MCAP" v={formatCompactUsd(market.marketCap)} />
      <Stat k="LIQUIDITY" v={formatCompactUsd(market.liquidityUsd)} />
      {ch != null && (
        <span
          className={`rounded-md border-2 border-ink px-2 py-0.5 tabular-nums ${ch >= 0 ? "bg-green text-ink" : "bg-paper text-red-dark"}`}
          aria-label={`24 hour change ${ch.toFixed(1)} percent`}
        >
          {ch >= 0 ? "+" : "−"}
          {Math.abs(ch).toFixed(1)}% 24h
        </span>
      )}
      {state.status === "error" && <span className="w-full text-xs opacity-75">Couldn&apos;t refresh — showing last known values.</span>}
    </div>
  );
}
