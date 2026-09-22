import Link from "next/link";
import { Logo } from "./Nav";
import { token } from "@/config/token";

export default function Footer() {
  return (
    <footer className="bg-ink py-11 text-paper">
      <div className="wrap grid gap-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2.5 font-display text-[1.6rem] leading-none no-underline">
            <Logo />
            {token.name}
          </Link>
          <nav aria-label="Footer" className="flex flex-wrap gap-5 font-semibold">
            <Link href="/brand">Brand kit</Link>
            <Link href="/legal">Legal &amp; risks</Link>
            <a href="#faq">FAQ</a>
          </nav>
        </div>
        <p className="m-0 max-w-[80ch] text-[0.88rem] text-paper/75">
          ${token.ticker} is a memecoin with no intrinsic value and no expectation of financial return. It is not an investment product, and
          nothing on this site is financial advice. Crypto assets are highly volatile and you can lose everything you put in. Do your own
          research.
        </p>
        <div className="flex flex-wrap justify-between gap-3 font-mono text-[0.8rem] text-paper/75">
          <span>© {new Date().getFullYear()} {token.name}. No dogs were harmed.</span>
          <span>Made with a very large mallet.</span>
        </div>
      </div>
    </footer>
  );
}
