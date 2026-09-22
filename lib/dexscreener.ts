// DEXScreener public API. Endpoint checked against https://docs.dexscreener.com/api/reference (Sept 2026):
// GET /token-pairs/v1/{chainId}/{tokenAddress} → Pair[]

export type Market = {
  priceUsd: number;
  change24h: number | null;
  marketCap: number | null;
  liquidityUsd: number | null;
  pairUrl: string | null;
};

type Pair = {
  priceUsd?: string | null;
  priceChange?: { h24?: number | null } | null;
  marketCap?: number | null;
  fdv?: number | null;
  liquidity?: { usd?: number | null } | null;
  url?: string | null;
};

export async function fetchMarket(ca: string, signal?: AbortSignal): Promise<Market | null> {
  const res = await fetch(`https://api.dexscreener.com/token-pairs/v1/solana/${encodeURIComponent(ca)}`, {
    signal,
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error(`DEXScreener responded ${res.status}`);
  const pairs = (await res.json()) as Pair[];
  if (!Array.isArray(pairs) || pairs.length === 0) return null;

  // The deepest pool is the most honest price.
  const best = [...pairs].sort((a, b) => (b.liquidity?.usd ?? 0) - (a.liquidity?.usd ?? 0))[0];
  const price = Number(best.priceUsd);
  if (!Number.isFinite(price)) return null;

  return {
    priceUsd: price,
    change24h: best.priceChange?.h24 ?? null,
    marketCap: best.marketCap ?? best.fdv ?? null,
    liquidityUsd: best.liquidity?.usd ?? null,
    pairUrl: best.url ?? null,
  };
}

/** $0.00004213 → "$0.0₄4213" style is hard to read; keep 4 significant digits instead. */
export function formatPrice(v: number) {
  if (v >= 1) return `$${v.toLocaleString("en-US", { maximumFractionDigits: 2 })}`;
  return `$${v.toLocaleString("en-US", { maximumSignificantDigits: 4 })}`;
}

export function formatCompactUsd(v: number | null) {
  if (v == null) return "—";
  return `$${new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 }).format(v)}`;
}
