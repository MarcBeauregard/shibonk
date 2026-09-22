import BonkStage from "./hero/BonkStage";
import BuyButtons from "./BuyButtons";
import CopyAddress from "./CopyAddress";
import { token } from "@/config/token";

const words = ["One", "bonk", "at a", "time."];

function FloatCoin({ className, delay }: { className: string; delay: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/brand/shibonk-token.svg"
      alt=""
      aria-hidden="true"
      className={`pointer-events-none absolute hidden animate-bob lg:block ${className}`}
      style={{ animationDelay: delay }}
    />
  );
}

export default function Hero() {
  return (
    <header className="halftone relative overflow-hidden pb-[clamp(48px,7vw,90px)] pt-[clamp(36px,6vw,72px)]">
      <FloatCoin className="left-[2%] top-[7%] w-16" delay="-1s" />
      <FloatCoin className="bottom-[5%] left-[44%] w-11" delay="-2.5s" />
      <FloatCoin className="right-[3%] top-[3%] w-12" delay="-3.6s" />
      <div className="wrap grid items-center gap-[clamp(28px,4vw,56px)] lg:grid-cols-[1.05fr_1fr]">
        <div>
          <span className="inline-flex items-center gap-2 rounded-md bg-ink px-3 py-2 font-mono text-[0.82rem] font-semibold uppercase leading-none tracking-[0.12em] text-mallet">
            <span className="size-2 animate-blink rounded-full bg-green" />
            Solana · fair launch · 0% tax
          </span>
          <h1 className="mb-4 mt-[18px] font-display text-[clamp(3.4rem,9.5vw,7.4rem)] font-normal leading-[0.88]">
            {words.map((w, i) => (
              <span
                key={w}
                className={`inline-block animate-popin ${i === 3 ? "outline-text [text-shadow:5px_5px_0_var(--color-shiba)]" : ""}`}
                style={{ animationDelay: `${0.08 * i}s` }}
              >
                {w}
                {i < words.length - 1 ? " " : ""}
              </span>
            ))}
          </h1>
          <p className="mb-6 max-w-[34ch] text-[clamp(1.1rem,1.6vw,1.3rem)]">
            {token.name} is the shiba that stopped waiting for the moon and{" "}
            <b className="bg-mallet px-1 [box-decoration-break:clone]">picked up a mallet</b>. Every red candle is a head. Every head gets bonked.
          </p>
          <div className="mb-6 flex flex-wrap gap-3.5">
            <BuyButtons />
            <a className="btn btn-paper" href="#tokenomics">
              See the numbers
            </a>
          </div>
          <CopyAddress />
        </div>
        <BonkStage />
      </div>
    </header>
  );
}
