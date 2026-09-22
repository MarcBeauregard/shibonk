"use client";

import { useState } from "react";
import { SOL_MINT, token } from "@/config/token";

// Jupiter Plugin (formerly Jupiter Terminal). Script URL and init options from
// https://developers.jup.ag/docs/tool-kits/plugin/nextjs-app-example (Sept 2026).
const PLUGIN_SRC = "https://plugin.jup.ag/plugin-v1.js";

type JupiterPlugin = {
  init: (opts: {
    displayMode: "modal" | "integrated" | "widget";
    formProps?: { initialInputMint?: string; initialOutputMint?: string; fixedMint?: string };
  }) => void;
};
declare global {
  interface Window {
    Jupiter?: JupiterPlugin;
  }
}

let pluginPromise: Promise<void> | undefined;
function loadPlugin() {
  pluginPromise ??= new Promise<void>((resolve, reject) => {
    const s = document.createElement("script");
    s.src = PLUGIN_SRC;
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => {
      pluginPromise = undefined;
      reject(new Error("Jupiter Plugin failed to load"));
    };
    document.head.appendChild(s);
  });
  return pluginPromise;
}

/** Primary: link out to jup.ag. Secondary: load the swap widget only when asked. */
export default function BuyButtons({ compact = false }: { compact?: boolean }) {
  const [state, setState] = useState<"idle" | "loading" | "error">("idle");

  if (!token.launched || !token.ca) {
    return (
      <a className={`btn btn-pink ${compact ? "btn-sm" : ""}`} href="#buy">
        How to buy at launch
      </a>
    );
  }

  const openSwap = async () => {
    setState("loading");
    try {
      await loadPlugin();
      window.Jupiter?.init({
        displayMode: "modal",
        formProps: { initialInputMint: SOL_MINT, initialOutputMint: token.ca, fixedMint: token.ca },
      });
      setState("idle");
    } catch {
      setState("error");
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <a className={`btn btn-pink ${compact ? "btn-sm" : ""}`} href={token.links.jupiter} target="_blank" rel="noopener noreferrer">
        Buy on Jupiter ↗
      </a>
      {!compact && (
        <button type="button" className="btn btn-paper" onClick={openSwap} aria-busy={state === "loading"}>
          {state === "loading" ? "Loading swap…" : "Swap here"}
        </button>
      )}
      {state === "error" && (
        <p role="alert" className="m-0 w-full text-sm font-semibold">
          The swap widget didn&apos;t load. Use &ldquo;Buy on Jupiter&rdquo; instead, it does the same thing.
        </p>
      )}
    </div>
  );
}
