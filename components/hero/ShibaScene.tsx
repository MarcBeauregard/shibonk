/** The hero shiba with its mallet. Same face as the token logo (open eye + wink). Ids are styled from globals.css. */
export default function ShibaScene() {
  return (
    <svg viewBox="0 0 420 300" aria-hidden="true" className="absolute inset-0 h-full w-full">
      <ellipse cx="190" cy="288" rx="150" ry="10" fill="var(--color-ink)" opacity=".12" />
      <g id="tail">
        <path d="M78 250 Q20 230 40 180 Q60 150 84 176 Q64 190 76 214 Q86 232 100 238 Z" fill="var(--color-shiba)" stroke="var(--color-ink)" strokeWidth="5" strokeLinejoin="round" />
        <path d="M44 184 Q58 162 78 178 Q64 186 62 196 Z" fill="var(--color-paper)" />
      </g>
      <path d="M84 290 Q76 200 170 196 Q266 200 258 290 Z" fill="var(--color-shiba)" stroke="var(--color-ink)" strokeWidth="5" strokeLinejoin="round" />
      <path d="M136 290 Q134 232 170 226 Q208 232 206 290 Z" fill="var(--color-paper)" />
      <g id="shibaHead" strokeLinejoin="round">
        <path d="M88 118 L100 42 L148 84 Z" fill="var(--color-shiba)" stroke="var(--color-ink)" strokeWidth="5" />
        <path d="M104 94 L108 62 L131 84 Z" fill="#FFD9B8" />
        <path d="M252 118 L240 42 L192 84 Z" fill="var(--color-shiba)" stroke="var(--color-ink)" strokeWidth="5" />
        <path d="M236 94 L232 62 L209 84 Z" fill="#FFD9B8" />
        <ellipse cx="170" cy="150" rx="84" ry="70" fill="var(--color-shiba)" />
        <path d="M86 164 Q106 224 170 224 Q234 224 254 164 Q214 184 170 172 Q126 184 86 164 Z" fill="var(--color-paper)" />
        <ellipse cx="170" cy="150" rx="84" ry="70" fill="none" stroke="var(--color-ink)" strokeWidth="5" />
        <ellipse cx="136" cy="114" rx="10" ry="6" fill="var(--color-paper)" />
        <ellipse cx="204" cy="114" rx="10" ry="6" fill="var(--color-paper)" />
        <ellipse cx="114" cy="166" rx="12" ry="7" fill="var(--color-pink)" opacity=".6" />
        <ellipse cx="226" cy="166" rx="12" ry="7" fill="var(--color-pink)" opacity=".6" />
        <g id="eyesOpen">
          <ellipse cx="140" cy="140" rx="8.5" ry="10.5" fill="var(--color-ink)" />
          <circle cx="143" cy="135.5" r="3.2" fill="#fff" />
          <path d="M187 141 Q199 130 211 141" fill="none" stroke="var(--color-ink)" strokeWidth="5.5" strokeLinecap="round" />
        </g>
        <g id="eyesX" stroke="var(--color-ink)" strokeWidth="5" strokeLinecap="round">
          <path d="M132 132 L148 148 M148 132 L132 148" />
          <path d="M192 132 L208 148 M208 132 L192 148" />
        </g>
        <ellipse cx="170" cy="166" rx="12.5" ry="9.5" fill="var(--color-ink)" />
        <ellipse cx="165.5" cy="162.5" rx="4" ry="2.2" fill="#fff" opacity=".6" />
        <path d="M170 175 Q170 189 154 189 M170 175 Q170 189 186 189" fill="none" stroke="var(--color-ink)" strokeWidth="4.5" strokeLinecap="round" />
        <path d="M161 191 Q170 209 179 191 Z" fill="var(--color-pink)" stroke="var(--color-ink)" strokeWidth="3.5" />
      </g>
      <g id="mallet">
        <rect x="304" y="100" width="16" height="170" rx="8" fill="var(--color-wood)" stroke="var(--color-ink)" strokeWidth="4.5" />
        <rect x="252" y="46" width="120" height="66" rx="16" fill="var(--color-pink)" stroke="var(--color-ink)" strokeWidth="5" />
        <rect x="274" y="46" width="14" height="66" fill="var(--color-mallet)" stroke="var(--color-ink)" strokeWidth="4" />
        <rect x="336" y="46" width="14" height="66" fill="var(--color-mallet)" stroke="var(--color-ink)" strokeWidth="4" />
        <path d="M262 58 L262 76" stroke="#fff" strokeWidth="5" strokeLinecap="round" opacity=".8" />
        <ellipse cx="312" cy="258" rx="18" ry="14" fill="var(--color-shiba)" stroke="var(--color-ink)" strokeWidth="4.5" />
      </g>
    </svg>
  );
}
