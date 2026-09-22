const items = ["$SHIBONK", "ONE BONK AT A TIME", "0% TAX", "LP BURNED", "MINT REVOKED", "NO TEAM BAG"];

function Run() {
  return (
    <span className="whitespace-nowrap py-4 font-display text-[1.7rem] leading-none">
      {[...items, ...items].map((t, i) => (
        <span key={i}>
          {t}
          <span className="mx-[0.6em] text-pink">✸</span>
        </span>
      ))}
    </span>
  );
}

export default function Marquee() {
  return (
    // The strip is wider than the screen so its tilted ends never show; clip it sideways only.
    <div aria-hidden="true" className="relative z-[1] overflow-x-clip">
      <div className="-mx-5 -rotate-[1.4deg] overflow-hidden border-y-[3px] border-ink bg-ink text-mallet">
        <div className="flex w-max animate-marquee">
          <Run />
          <Run />
        </div>
      </div>
    </div>
  );
}
