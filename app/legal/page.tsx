import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import { token } from "@/config/token";

export const metadata: Metadata = {
  title: "Legal & risks",
  description: `Disclaimer, risks and terms of use for the ${token.name} website.`,
  alternates: { canonical: "/legal" },
};

const H = ({ children }: { children: React.ReactNode }) => <h2 className="mb-2 mt-8 font-display text-2xl font-normal first:mt-0">{children}</h2>;

export default function Legal() {
  return (
    <PageShell eyebrow="Legal" title="Legal & risks">
      <div className="max-w-[68ch] [&_p]:my-3">
        <H>What ${token.ticker} is</H>
        <p>
          ${token.ticker} is a memecoin: a community token issued on the Solana blockchain for entertainment. It has no intrinsic value, no
          utility, and gives holders no rights of any kind — no ownership, no dividends, no governance, no claim on any person or company.
        </p>
        <H>No promise of return</H>
        <p>
          Nobody behind this website promises that ${token.ticker} will gain value, be listed on any exchange, or keep any liquidity. The
          roadmap on this site is a list of intentions, not commitments.
        </p>
        <H>Not financial advice</H>
        <p>
          Nothing on this website is financial, investment, legal or tax advice. Talk to a qualified professional before making any financial
          decision.
        </p>
        <H>Risks</H>
        <p>
          Crypto assets are highly volatile and can lose all their value in minutes. Transactions on a blockchain are irreversible. Wallets
          can be drained by phishing links, fake support accounts and malicious sites imitating this one. Only use the official links listed on
          the home page, and never share your recovery phrase.
        </p>
        <H>Your responsibility</H>
        <p>
          You are responsible for knowing and following the laws that apply where you live, including any rules that restrict or prohibit
          buying crypto assets, and for any taxes on your transactions.
        </p>
        <H>This website</H>
        <p>
          The site is provided as is. Market figures come from third-party services (DEXScreener) and may be delayed or wrong. Swaps run
          through Jupiter, a third-party service this site does not control. The site sets no advertising cookies; it may use privacy-friendly,
          cookie-free analytics to count visits.
        </p>
        <p className="mt-8 font-mono text-sm opacity-75">Last updated: September 2026.</p>
      </div>
    </PageShell>
  );
}
