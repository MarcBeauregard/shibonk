"use client";

import { useRef, useState } from "react";
import { token } from "@/config/token";

export default function CopyAddress() {
  const codeRef = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState<"idle" | "copied" | "selected">("idle");

  if (!token.ca) {
    return (
      <div className="card flex flex-col gap-1 px-4 py-3">
        <span className="font-mono text-xs font-semibold tracking-[0.1em] text-shiba-dark">CONTRACT ADDRESS</span>
        <p className="m-0 text-base">
          Drops at launch, here and on our official X. Anyone posting a CA before that is not us.
        </p>
      </div>
    );
  }

  const selectFallback = () => {
    const el = codeRef.current;
    if (!el) return;
    const range = document.createRange();
    range.selectNodeContents(el);
    const sel = getSelection();
    sel?.removeAllRanges();
    sel?.addRange(range);
    setCopied("selected");
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(token.ca!);
      setCopied("copied");
    } catch {
      selectFallback();
    }
    setTimeout(() => setCopied("idle"), 2200);
  };

  return (
    <div className="card flex flex-wrap items-center gap-x-3 gap-y-2 py-2 pl-4 pr-2">
      <span className="font-mono text-xs font-semibold tracking-[0.1em] text-shiba-dark">CA</span>
      <code ref={codeRef} className="min-w-0 flex-1 break-all font-mono text-[0.88rem] leading-snug">
        {token.ca}
      </code>
      <button
        type="button"
        onClick={copy}
        className="shrink-0 cursor-pointer rounded-[10px] border-2 border-ink bg-ink px-4 py-2.5 text-sm font-extrabold text-paper transition-transform active:scale-95"
      >
        {copied === "copied" ? "Copied ✓" : copied === "selected" ? "Press ⌘/Ctrl+C" : "Copy"}
      </button>
      <span className="sr-only" role="status" aria-live="polite">
        {copied === "copied" ? "Contract address copied" : ""}
      </span>
    </div>
  );
}
