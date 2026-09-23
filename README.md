# Shibonk ($SHIBONK)

Production site for the Shibonk memecoin on Solana. Next.js 16 (App Router, static export) + TypeScript + Tailwind CSS 4, deployed on Vercel.

## Run it

```bash
npm install
cp .env.example .env.local   # fill in what you know, leave the rest empty
npm run dev                  # http://localhost:3000
```

Check the real build, with the production security headers from `vercel.json`:

```bash
npm run build && npm run preview   # http://localhost:4173
```

`npm run lint` and `npx tsc --noEmit` must both pass before deploying.

## Where things live

| What | Where |
| --- | --- |
| Colours, fonts, shadows, animations (design tokens) | `app/globals.css` (`@theme` block) |
| Contract address, links, supply, split, roadmap | `config/token.ts` + environment variables |
| Hero bonk game, market bar, candles | `components/hero/` |
| Live market data (DEXScreener) | `lib/dexscreener.ts`, `lib/useMarket.ts` |
| Buy buttons + Jupiter swap widget | `components/BuyButtons.tsx` |
| Security headers (CSP, HSTS…) | `vercel.json` |
| Logo files | `public/brand/`, favicon `app/icon.svg`, `app/apple-icon.png` |
| Share image (1200×630) | `app/opengraph-image.tsx`, generated at build |

## Environment variables

All are `NEXT_PUBLIC_*`, so they are baked in at build time: **redeploy after changing any of them.** See `.env.example`.

| Variable | Before launch | After launch |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | your domain, e.g. `https://shibonk.xyz` | same |
| `NEXT_PUBLIC_TOKEN_CA` | falls back to the live mint if unset | the mint address (same fallback) |
| `NEXT_PUBLIC_PAIR_ADDRESS` | empty | Raydium pair (optional) |
| `NEXT_PUBLIC_LAUNCHED` | live mint is treated as launched | `true` |
| `NEXT_PUBLIC_LAUNCH_DATE` | ISO UTC time for the countdown, or empty | ignored |
| `NEXT_PUBLIC_X_URL` | empty → "announced at launch" | official account, or still empty |
| `NEXT_PUBLIC_TELEGRAM_URL` | falls back to `https://t.me/shibonkonsol` | same |
| `NEXT_PUBLIC_PUMP_URL`, `NEXT_PUBLIC_BLOCKX_URL` | optional; derived from the mint | same |

An empty X link is shown as "announced at launch", never as a dead link. If `NEXT_PUBLIC_TOKEN_CA` is empty, the site uses the live Shibonk mint and treats that mint as launched, so production does not show "Drops at launch". Telegram falls back to `https://t.me/shibonkonsol`. Market data loads when the token is launched and a CA is set. Pump.fun and Block X URLs are derived from the mint unless overridden.

## Deploy (Vercel)

1. Push the repo to GitHub and import it in Vercel (framework: Next.js; defaults are fine, output is `out/`).
2. Add the environment variables above under Settings → Environment Variables.
3. Add your domain under Settings → Domains.
4. After the first deploy, check the headers: `curl -sI https://your-domain | grep -i content-security`.

## Launch-day checklist

- [ ] Pool created on Raydium; **LP tokens burned** and **mint + freeze authority revoked** — the site says so, it must be true.
- [ ] Verify both on RugCheck and Solscan with the real CA.
- [ ] Set `NEXT_PUBLIC_TOKEN_CA`, `NEXT_PUBLIC_PAIR_ADDRESS`, `NEXT_PUBLIC_LAUNCHED=true`; redeploy.
- [ ] On the live site, compare the displayed CA character by character with the mint.
- [ ] Copy button, "Buy on Jupiter" (opens with the token pre-selected) and "Swap here" (widget opens) all work.
- [ ] Market bar shows price / market cap / liquidity within ~1 minute (DEXScreener needs to index the pool first).
- [ ] Update the roadmap statuses in `config/token.ts` (Phase Awoo → `done`, Phase Bonk → `now`).
- [ ] Post the CA on the official X **after** the site is updated, and pin it.
- [ ] Test the share preview (X / Telegram) with the live URL.

## Decisions worth knowing

- **Static export.** No server to run or secure. Consequence: `next.config` headers don't apply, so they live in `vercel.json`. Hosting elsewhere means porting those headers.
- **No animation library.** Entrances and the bonk are CSS; scroll reveals use a 30-line `IntersectionObserver` component. Motion (Framer Motion) was tried and cost ~36 KB gzip, pushing the first load over the 150 KB budget.
- **Reveals animate transform only**, never opacity, so content is readable without JavaScript and in link previews.
- **The hero candles are decorative** and labelled "for fun, not a price chart". The only financial numbers on the site come from DEXScreener.
- **Jupiter Plugin is loaded on click only.** No third-party script on page load. The CSP allows `plugin.jup.ag`, `*.jup.ag` and the Google Fonts the widget uses.
- **CSP needs `'unsafe-inline'` for scripts**: a static export can't use per-request nonces, and Next inlines its hydration data. Everything else is locked down (`frame-ancestors 'none'`, `object-src 'none'`, `base-uri 'self'`).
- **Analytics are not installed.** If you want them, turn on Vercel Web Analytics (cookie-free) in the Vercel dashboard and add `@vercel/analytics`; add its domain to `connect-src`/`script-src` if needed.

## Measured (local build, Lighthouse 12, Sept 22 2026)

| | Performance | Accessibility | Best practices | SEO |
| --- | --- | --- | --- | --- |
| Mobile | 96 | 100 | 100 | 100 |
| Desktop | 100 | 100 | 100 | 100 |

First-load JS for modern browsers: 144.5 KB gzip. Measured on `npm run preview` (gzip on), pre-launch config. Re-measure on the real domain after deploy.
