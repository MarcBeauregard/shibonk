// Everything that changes on launch day lives here or in .env (see .env.example).

const env = (v: string | undefined) => (v && v.trim() ? v.trim() : undefined);

const ca = env(process.env.NEXT_PUBLIC_TOKEN_CA);

export const SOL_MINT = "So11111111111111111111111111111111111111112";

export type PhaseStatus = "done" | "now" | "next" | "someday";

export const token = {
  name: "Shibonk",
  ticker: "SHIBONK",
  tagline: "One bonk at a time.",
  description:
    "Shibonk is the Solana memecoin about a shiba that stopped waiting for the moon and picked up a mallet. 0% tax, LP burned, mint revoked.",
  siteUrl: env(process.env.NEXT_PUBLIC_SITE_URL) ?? "http://localhost:3000",

  /** Mint address. Leave empty until launch. */
  ca,
  /** Raydium pair address, optional. Used for the DEXScreener pair link when set. */
  pair: env(process.env.NEXT_PUBLIC_PAIR_ADDRESS),
  /** Flip to "true" once the pool is live. Market data only loads when launched AND ca is set. */
  launched: process.env.NEXT_PUBLIC_LAUNCHED === "true" && !!ca,
  /** ISO date-time, e.g. 2026-10-15T17:00:00Z. Drives the countdown before launch. */
  launchDate: env(process.env.NEXT_PUBLIC_LAUNCH_DATE),

  supply: 1_000_000_000_000,
  allocation: [
    { label: "Liquidity pool (LP burned)", pct: 90, color: "var(--color-paper)" },
    { label: "Community bonk drops", pct: 6, color: "var(--color-pink)" },
    { label: "Exchange listings", pct: 4, color: "var(--color-mallet)" },
  ],

  links: {
    x: env(process.env.NEXT_PUBLIC_X_URL),
    telegram: env(process.env.NEXT_PUBLIC_TELEGRAM_URL),
    dexscreener: ca ? `https://dexscreener.com/solana/${env(process.env.NEXT_PUBLIC_PAIR_ADDRESS) ?? ca}` : undefined,
    birdeye: ca ? `https://birdeye.so/token/${ca}?chain=solana` : undefined,
    jupiter: ca ? `https://jup.ag/swap/SOL-${ca}` : "https://jup.ag",
    solscan: ca ? `https://solscan.io/token/${ca}` : undefined,
    rugcheck: ca ? `https://rugcheck.xyz/tokens/${ca}` : undefined,
  },

  roadmap: [
    {
      name: "Phase Awoo",
      status: "now" as PhaseStatus,
      items: ["Shiba finds mallet", "Website and brand kit live", "Build the pack on X and Telegram"],
    },
    {
      name: "Phase Bonk",
      status: "next" as PhaseStatus,
      items: ["Fair launch on Raydium, LP burned on the spot", "DEXScreener and Birdeye listings", "Bonk-a-candle meme contest"],
    },
    {
      name: "Phase Mega Bonk",
      status: "someday" as PhaseStatus,
      items: ["10,000 holders", "First centralized exchange listing", "Community bonk drops to top meme makers"],
    },
    {
      name: "Phase Moon (bonked)",
      status: "someday" as PhaseStatus,
      items: ["Shiba finally reaches the moon", "Bonks it"],
    },
  ],
} as const;
