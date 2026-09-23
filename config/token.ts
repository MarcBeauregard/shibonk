// Everything that changes on launch day lives here or in .env (see .env.example).

const env = (v: string | undefined) => (v && v.trim() ? v.trim() : undefined);

/** Live Shibonk mint. Used when NEXT_PUBLIC_TOKEN_CA is unset so production never hides the CA. */
export const PRODUCTION_CA = "HzUYtB8HSRTuEqQ3KR3wTW4nhBv8xZtFy3nFQrrHpump";

/** Public Telegram. Env wins; this keeps the official link if the variable is missing at build. */
const TELEGRAM_URL = "https://t.me/shibonkonsol";

const ca = env(process.env.NEXT_PUBLIC_TOKEN_CA) ?? PRODUCTION_CA;

export const SOL_MINT = "So11111111111111111111111111111111111111112";

export type PhaseStatus = "done" | "now" | "next" | "someday";

export const token = {
  name: "Shibonk",
  ticker: "SHIBONK",
  tagline: "One bonk at a time.",
  description:
    "Shibonk is the Solana memecoin about a shiba that stopped waiting for the moon and picked up a mallet. 0% tax, LP burned, mint revoked.",
  siteUrl: env(process.env.NEXT_PUBLIC_SITE_URL) ?? "http://localhost:3000",

  /** Mint address. Env wins; otherwise the live production mint. */
  ca,
  /** Raydium pair address, optional. Used for the DEXScreener pair link when set. */
  pair: env(process.env.NEXT_PUBLIC_PAIR_ADDRESS),
  /**
   * Market data loads only when launched. Explicit NEXT_PUBLIC_LAUNCHED=true, or the live
   * production mint (so a build that forgets the flag still treats this token as live).
   */
  launched: !!ca && (process.env.NEXT_PUBLIC_LAUNCHED === "true" || ca === PRODUCTION_CA),
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
    telegram: env(process.env.NEXT_PUBLIC_TELEGRAM_URL) ?? TELEGRAM_URL,
    pump: env(process.env.NEXT_PUBLIC_PUMP_URL) ?? `https://pump.fun/coin/${ca}`,
    blockx: env(process.env.NEXT_PUBLIC_BLOCKX_URL) ?? `https://blockx.gg/sol/trading/${ca}`,
    dexscreener: `https://dexscreener.com/solana/${env(process.env.NEXT_PUBLIC_PAIR_ADDRESS) ?? ca}`,
    birdeye: `https://birdeye.so/token/${ca}?chain=solana`,
    jupiter: `https://jup.ag/swap/SOL-${ca}`,
    solscan: `https://solscan.io/token/${ca}`,
    rugcheck: `https://rugcheck.xyz/tokens/${ca}`,
  },

  roadmap: [
    {
      name: "Phase Awoo",
      status: "done" as PhaseStatus,
      items: ["Shiba finds mallet", "Website and brand kit live", "Build the pack on X and Telegram"],
    },
    {
      name: "Phase Bonk",
      status: "now" as PhaseStatus,
      items: ["Fair launch on pump.fun", "DEXScreener and Birdeye listings", "Bonk-a-candle meme contest"],
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
