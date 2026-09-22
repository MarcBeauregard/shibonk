import Link from "next/link";
import BuyButtons from "./BuyButtons";
import { token } from "@/config/token";
import { asset } from "@/lib/paths";

export function Logo({ size = 44, className = "" }: { size?: number; className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- static SVG, no optimisation needed
    <img src={asset("/brand/shibonk-token.svg")} width={size} height={size} alt="" className={className} />
  );
}

const links = [
  { href: "#lore", label: "Lore" },
  { href: "#tokenomics", label: "Tokenomics" },
  { href: "#buy", label: "How to buy" },
  { href: "#bonkmap", label: "Bonkmap" },
  { href: "#faq", label: "FAQ" },
];

export default function Nav() {
  return (
    <nav aria-label="Main" className="sticky top-[env(safe-area-inset-top,0px)] z-30 border-b-[3px] border-ink bg-paper">
      <div className="wrap flex items-center justify-between gap-4 py-2.5">
        <Link href="/" className="group flex items-center gap-2.5 font-display text-[1.6rem] leading-none no-underline">
          <Logo className="transition-transform duration-300 ease-springy group-hover:-rotate-[14deg] group-hover:scale-110" />
          {token.name}
        </Link>
        <ul className="m-0 hidden list-none gap-6 p-0 font-semibold lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="relative no-underline after:absolute after:inset-x-0 after:-bottom-1 after:h-[3px] after:origin-left after:scale-x-0 after:bg-shiba after:transition-transform hover:after:scale-x-100"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <BuyButtons compact />
      </div>
    </nav>
  );
}
