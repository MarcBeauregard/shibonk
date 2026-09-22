import Reveal from "./Reveal";
import ShibaHead from "./ShibaHead";

const MiniShiba = ({ x, y, s }: { x: number; y: number; s: number }) => <ShibaHead x={x} y={y} size={s} />;

const panels = [
  {
    title: "Day 1 of the bear",
    text: "Shiba sits. Shiba stares at the moon. The moon does not stare back.",
    bg: "bg-sky",
    tilt: "",
    art: (
      <svg viewBox="0 0 320 240" aria-hidden="true" className="block size-full">
        <path d="M0 208 L320 208" stroke="var(--color-ink)" strokeWidth="4" />
        <circle cx="262" cy="52" r="28" fill="var(--color-paper)" stroke="var(--color-ink)" strokeWidth="4" />
        <circle cx="252" cy="46" r="5" fill="var(--color-ink)" opacity=".2" />
        <circle cx="270" cy="62" r="7" fill="var(--color-ink)" opacity=".2" />
        <MiniShiba x={56} y={78} s={128} />
        <path d="M178 96 Q200 64 230 72" fill="none" stroke="var(--color-ink)" strokeWidth="3" strokeDasharray="6 6" />
        <text x="40" y="46" fontFamily="var(--font-mono)" fontSize="18" fontWeight="600" fill="var(--color-ink)">…wen moon?</text>
      </svg>
    ),
  },
  {
    title: "Day 2 of the bear",
    text: "A red candle appears. Then another. Shiba notices a mallet in the corner of the chart.",
    bg: "bg-mallet",
    tilt: "md:rotate-[0.6deg]",
    art: (
      <svg viewBox="0 0 320 240" aria-hidden="true" className="block size-full">
        <path d="M0 208 L320 208" stroke="var(--color-ink)" strokeWidth="4" />
        <g transform="translate(212 44) rotate(-20)">
          <rect x="-8" y="30" width="16" height="120" rx="8" fill="var(--color-wood)" stroke="var(--color-ink)" strokeWidth="4" />
          <rect x="-50" y="-14" width="100" height="54" rx="14" fill="var(--color-pink)" stroke="var(--color-ink)" strokeWidth="4.5" />
        </g>
        <MiniShiba x={24} y={78} s={128} />
        <path d="M40 44 l10 -18 l10 18 M150 34 l12 -8 l2 14" stroke="var(--color-ink)" strokeWidth="4" fill="none" strokeLinecap="round" />
        <text x="120" y="232" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="16" fontWeight="600" fill="var(--color-ink)">*finds mallet*</text>
      </svg>
    ),
  },
  {
    title: "Day 3 — there is no day 4",
    text: "The bear ended early. Nobody knows exactly why. Everybody heard it.",
    bg: "bg-pink",
    tilt: "md:-rotate-[0.6deg]",
    art: (
      <svg viewBox="0 0 320 240" aria-hidden="true" className="block size-full">
        <polygon
          points="160,20 182,78 244,58 206,110 262,142 196,146 208,208 160,166 112,208 124,146 58,142 114,110 76,58 138,78"
          fill="var(--color-mallet)"
          stroke="var(--color-ink)"
          strokeWidth="5"
          strokeLinejoin="round"
        />
        <text x="160" y="132" textAnchor="middle" fontFamily="var(--font-display)" fontSize="44" fill="var(--color-paper)" stroke="var(--color-ink)" strokeWidth="3" paintOrder="stroke">
          BONK
        </text>
      </svg>
    ),
  },
];

export default function Lore() {
  return (
    <section id="lore" className="section bg-paper">
      <div className="wrap">
        <span className="tag">The lore</span>
        <Reveal>
          <h2 className="h2">
            Three panels. <br />
            Zero patience.
          </h2>
          <p className="lede">Every cycle has a dog. Most of them sit and wait. This one got tired of waiting.</p>
        </Reveal>
        <div className="grid gap-[18px] md:grid-cols-3">
          {panels.map((p, i) => (
            <Reveal as="article" key={p.title} delay={i * 0.08} className={`flex flex-col overflow-hidden rounded-md border-[3px] border-ink shadow-pop ${p.bg} ${p.tilt}`}>
              <div className="aspect-[4/3] max-w-full">{p.art}</div>
              <div className="flex-1 border-t-[3px] border-ink bg-paper px-4 pb-4 pt-3.5 text-base">
                <h3 className="mb-1.5 font-mono text-[0.95rem] font-semibold leading-tight text-shiba-dark">{p.title}</h3>
                <p className="m-0">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
