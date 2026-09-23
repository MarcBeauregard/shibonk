import { token } from "@/config/token";

const faqs = [
  {
    q: `What is ${token.name}?`,
    a: `A memecoin on Solana. No utility, no promises: a shiba, a mallet, and a community that bonks red candles. $${token.ticker} has no intrinsic value.`,
  },
  {
    q: "Where do I find the contract address?",
    a: `Copy it from the CA box at the top of this page${token.links.telegram ? ", and from the official Telegram" : ""}. Always compare the full address before swapping. Anyone sharing a different contract is not us.`,
  },
  {
    q: "Is the liquidity locked?",
    a: "Better: the LP tokens are burned at launch, so nobody can pull the liquidity. You can check the burn and the revoked mint authority on RugCheck or Solscan with the contract address.",
  },
  {
    q: "Does the team hold tokens?",
    a: "No team allocation and no presale. 90% goes to the liquidity pool, 6% to community bonk drops, 4% is kept for exchange listings.",
  },
  {
    q: "Is there a tax on buys or sells?",
    a: "No. 0% on buys, 0% on sells. You only pay normal Solana network fees and the swap route's fees.",
  },
  {
    q: "Someone from the team DMed me. Is it legit?",
    a: "No. We never DM first, never offer support in private messages, and never ask for your recovery phrase or to 'validate' your wallet. Block and report.",
  },
  {
    q: "Is this financial advice?",
    a: "No. Memecoins are extremely volatile and can go to zero. Only put in what you're fine losing entirely.",
  },
];

export default function Faq() {
  return (
    <section id="faq" className="section faq bg-paper">
      <div className="wrap max-w-[860px]">
        <span className="tag">FAQ</span>
        <h2 className="h2 mb-10">Asked and bonked.</h2>
        <div className="grid gap-3.5">
          {faqs.map((f) => (
            <details key={f.q} className="card rounded-2xl px-5 py-1">
              <summary className="flex items-center justify-between gap-4 py-3.5 text-lg font-extrabold">
                {f.q}
                <span className="plus grid size-8 shrink-0 place-items-center rounded-full border-[3px] border-ink bg-mallet font-display text-lg leading-none" aria-hidden="true">
                  +
                </span>
              </summary>
              <p className="mb-4 mt-0 max-w-[65ch]">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
