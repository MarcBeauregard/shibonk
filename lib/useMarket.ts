"use client";

import { useEffect, useState } from "react";
import { fetchMarket, type Market } from "./dexscreener";

export type MarketState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "ready"; market: Market; updatedAt: number }
  | { status: "empty" }
  | { status: "error"; last?: Market };

const REFRESH_MS = 30_000;

/** Polls DEXScreener every 30 s while the tab is visible. Does nothing when `ca` is undefined. */
export function useMarket(ca: string | undefined): MarketState {
  const [state, setState] = useState<MarketState>(ca ? { status: "loading" } : { status: "idle" });

  useEffect(() => {
    if (!ca) return;
    let ctrl: AbortController | undefined;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let last: Market | undefined;

    const load = async () => {
      ctrl?.abort();
      ctrl = new AbortController();
      try {
        const market = await fetchMarket(ca, ctrl.signal);
        if (market) {
          last = market;
          setState({ status: "ready", market, updatedAt: Date.now() });
        } else {
          setState({ status: "empty" });
        }
      } catch (e) {
        if ((e as Error).name !== "AbortError") setState({ status: "error", last });
      }
      schedule();
    };
    const schedule = () => {
      clearTimeout(timer);
      if (!document.hidden) timer = setTimeout(load, REFRESH_MS);
    };
    const onVisibility = () => {
      if (!document.hidden) load();
      else clearTimeout(timer);
    };

    load();
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      ctrl?.abort();
      clearTimeout(timer);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [ca]);

  return state;
}
