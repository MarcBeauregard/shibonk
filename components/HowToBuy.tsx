import Reveal from "./Reveal";
import BuyButtons from "./BuyButtons";
import { token } from "@/config/token";

const steps = [
  {
    title: "Get a wallet",
    body: (
      <>
        Install{" "}
        <a href="https://phantom.com" target="_blank" rel="noopener noreferrer" className="font-extrabold">
          Phantom
        </a>{" "}
        or{" "}
        <a href="https://solflare.com" target="_blank" rel="noopener noreferrer" className="font-extrabold">
          Solflare
        </a>
        . Write your recovery phrase on paper. Never type it into a website.
      </>
    ),
    dot: "bg-mallet",
  },
  { title: "Load up SOL", body: <>Buy SOL on any exchange and send it to your wallet address. Keep a little extra for fees.</>, dot: "bg-pink" },
  {
    title: "Swap for $SHIBONK",
    body: (
      <>
        Open{" "}
        <a href={token.links.jupiter} target="_blank" rel="noopener noreferrer" className="font-extrabold">
          Jupiter
        </a>{" "}
        or{" "}
        <a href={token.links.pump} target="_blank" rel="noopener noreferrer" className="font-extrabold">
          Pump.fun
        </a>
        , check the contract address from the top of this page matches, and swap.
      </>
    ),
    dot: "bg-shiba",
  },
  { title: "Bonk responsibly", body: <>Hold, meme, bonk the next red candle. Never put in what you can&apos;t afford to lose.</>, dot: "bg-green" },
];

export default function HowToBuy() {
  return (
    <section id="buy" className="section bg-sky">
      <div className="wrap">
        <span className="tag">How to buy</span>
        <Reveal>
          <h2 className="h2">
            Grab a mallet <br />
            in four steps.
          </h2>
          <p className="lede">About five minutes if you&apos;ve never done it. Two if you have.</p>
        </Reveal>
        <ol className="m-0 grid list-none gap-[18px] p-0 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 0.06} className="card relative flex flex-col gap-2 rounded-[20px] px-5 pb-5 pt-[22px]">
              <span className={`mb-1.5 grid size-12 place-items-center rounded-full border-[3px] border-ink font-display text-2xl ${s.dot}`} aria-hidden="true">
                {i + 1}
              </span>
              <h3 className="m-0 font-display text-[1.35rem] font-normal leading-tight">{s.title}</h3>
              <p className="m-0 text-[0.98rem]">{s.body}</p>
            </Reveal>
          ))}
        </ol>
        <div className="mt-10">
          <BuyButtons />
        </div>
      </div>
    </section>
  );
}
