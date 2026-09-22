/** The token's shiba face (open eye + wink) on a 200×200 box. Usable standalone or nested inside another SVG. */
export default function ShibaHead({ x, y, size, className }: { x?: number; y?: number; size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 200 200" x={x} y={y} width={size} height={size} className={className} aria-hidden="true">
      <g stroke="var(--color-ink)" strokeLinejoin="round">
        <path d="M38 78 L50 10 L94 48 Z" fill="var(--color-shiba)" strokeWidth="5" />
        <path d="M162 78 L150 10 L106 48 Z" fill="var(--color-shiba)" strokeWidth="5" />
      </g>
      <path d="M54 58 L58 28 L79 48 Z" fill="#FFD9B8" />
      <path d="M146 58 L142 28 L121 48 Z" fill="#FFD9B8" />
      <ellipse cx="100" cy="108" rx="74" ry="64" fill="var(--color-shiba)" />
      <path d="M34 120 Q52 174 100 174 Q148 174 166 120 Q134 138 100 128 Q66 138 34 120 Z" fill="var(--color-paper)" />
      <ellipse cx="100" cy="108" rx="74" ry="64" fill="none" stroke="var(--color-ink)" strokeWidth="5" />
      <ellipse cx="70" cy="75" rx="9" ry="5.5" fill="var(--color-paper)" />
      <ellipse cx="130" cy="75" rx="9" ry="5.5" fill="var(--color-paper)" />
      <ellipse cx="52" cy="122" rx="10" ry="6" fill="var(--color-pink)" opacity=".6" />
      <ellipse cx="148" cy="122" rx="10" ry="6" fill="var(--color-pink)" opacity=".6" />
      <ellipse cx="74" cy="98" rx="7.5" ry="9.5" fill="var(--color-ink)" />
      <circle cx="76.5" cy="94" r="2.8" fill="#fff" />
      <path d="M116 99 Q126 90 136 99" fill="none" stroke="var(--color-ink)" strokeWidth="5" strokeLinecap="round" />
      <ellipse cx="100" cy="123" rx="11.5" ry="8.5" fill="var(--color-ink)" />
      <path d="M100 131 Q100 144 85 144 M100 131 Q100 144 115 144" fill="none" stroke="var(--color-ink)" strokeWidth="4" strokeLinecap="round" />
      <path d="M92 146 Q100 162 108 146 Z" fill="var(--color-pink)" stroke="var(--color-ink)" strokeWidth="3" />
    </svg>
  );
}
