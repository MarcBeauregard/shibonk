import Reveal from "./Reveal";
import { token, type PhaseStatus } from "@/config/token";

const pin: Record<PhaseStatus, { label: string; cls: string; status: string }> = {
  done: { label: "✓", cls: "bg-green", status: "Done" },
  now: { label: "NOW", cls: "bg-pink animate-pulse-ring", status: "In progress" },
  next: { label: "NEXT", cls: "bg-paper", status: "Next" },
  someday: { label: "?", cls: "bg-paper", status: "Someday" },
};

export default function Bonkmap() {
  return (
    <section id="bonkmap" className="section halftone bg-mallet">
      <div className="wrap">
        <span className="tag">Bonkmap</span>
        <Reveal>
          <h2 className="h2">
            Where the mallet <br />
            goes next.
          </h2>
          <p className="lede">No dates. Dates are how memecoins lie. Phases move when the pack does.</p>
        </Reveal>
        <ol className="relative m-0 grid max-w-[820px] list-none gap-[26px] p-0 before:absolute before:bottom-2.5 before:left-[27px] before:top-2.5 before:w-1 before:bg-[repeating-linear-gradient(var(--color-ink)_0_12px,transparent_12px_22px)]">
          {token.roadmap.map((p, i) => {
            const s = pin[p.status];
            return (
              <Reveal as="li" key={p.name} delay={i * 0.06} className="grid grid-cols-[58px_1fr] items-start gap-[18px]">
                <span className={`relative z-[1] grid size-[58px] place-items-center rounded-full border-[3px] border-ink font-mono text-[0.78rem] font-semibold ${s.cls}`} aria-hidden="true">
                  {s.label}
                </span>
                <div className="card px-5 py-[18px]">
                  <span className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-shiba-dark">{s.status}</span>
                  <h3 className="mb-1 mt-0.5 font-display text-[1.55rem] font-normal leading-tight">{p.name}</h3>
                  <ul className="mb-0 mt-2.5 pl-5">
                    {p.items.map((it) => (
                      <li key={it} className="my-0.5">
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
