"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import MarketPanel from "./MarketPanel";
import ShibaScene from "./ShibaScene";
import { playBonk, readPref, setPref, subscribePrefs } from "@/lib/sound";

type Candle = { o: number; c: number; h: number; l: number; bonked?: boolean };
type Burst = { id: number; x: number; y: number; word: string; r: number };

const N = 18;
const WORDS = ["BONK!", "BONK!", "WHAM!", "BONK!", "POW!", "BONK!!"];
const SPARK_COLORS = ["var(--color-mallet)", "var(--color-pink)", "var(--color-shiba)", "var(--color-green)", "var(--color-sky)"];

function seedCandles(): Candle[] {
  // Deterministic first frame so server and client HTML match.
  const out: Candle[] = [];
  let p = 42;
  for (let i = 0; i < N; i++) {
    const c = p + Math.sin(i * 1.7) * 1.6 - 0.5;
    out.push({ o: p, c, h: Math.max(p, c) + 0.5, l: Math.min(p, c) - 0.5 });
    p = c;
  }
  return out;
}

function nextCandle(prev: number): Candle {
  const c = prev + (Math.random() - 0.6) * 2.4; // the bear never sleeps
  return { o: prev, c, h: Math.max(prev, c) + Math.random() * 0.7, l: Math.min(prev, c) - Math.random() * 0.7 };
}

/** Bonk the newest red candle green, and shift everything after it up by the same amount. */
function bonkCandles(cs: Candle[]): Candle[] {
  const out: Candle[] = cs.map((k) => ({ ...k, bonked: false }));
  for (let i = N - 1; i >= 0; i--) {
    const k = out[i];
    if (k.c < k.o) {
      const newC = k.o + (k.o - k.c) + 1.5 + Math.random() * 2.5;
      const delta = newC - k.c;
      out[i] = { ...k, c: newC, h: newC + 0.4, bonked: true };
      for (let j = i + 1; j < N; j++) {
        const kk = out[j];
        out[j] = { o: kk.o + delta, c: kk.c + delta, h: kk.h + delta, l: kk.l + delta };
      }
      break;
    }
  }
  return out;
}

export default function BonkStage() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [candles, setCandles] = useState<Candle[]>(seedCandles);
  const [bursts, setBursts] = useState<Burst[]>([]);
  // Server renders the defaults; the client picks up the visitor's saved values after hydration.
  const count = parseInt(useSyncExternalStore(subscribePrefs, () => readPref("shibonk-bonks", "0"), () => "0"), 10) || 0;
  const sound = useSyncExternalStore(subscribePrefs, () => readPref("shibonk-sound", "on"), () => "on") === "on";
  const idRef = useRef(0);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      setCandles((cs) => [...cs.slice(1), nextCandle(cs[N - 1].c)]);
    }, 1400);
    return () => clearInterval(id);
  }, []);

  const bonk = useCallback(
    (x: number, y: number) => {
      const el = stageRef.current;
      if (el) {
        el.classList.remove("swing");
        void el.offsetWidth; // restart the CSS animation
        el.classList.add("swing");
      }
      if (sound) playBonk();
      setCandles(bonkCandles);
      setPref("shibonk-bonks", String((parseInt(readPref("shibonk-bonks", "0"), 10) || 0) + 1));
      const id = ++idRef.current;
      setBursts((b) => [...b, { id, x, y, word: WORDS[id % WORDS.length], r: Math.random() * 24 - 12 }]);
      setTimeout(() => setBursts((b) => b.filter((z) => z.id !== id)), 850);
    },
    [sound]
  );

  // Burst positions are relative to the whole stage, which holds the market bar too.
  const stageOffset = () => stageRef.current?.getBoundingClientRect() ?? new DOMRect();
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = stageOffset();
    bonk(e.clientX - r.left, e.clientY - r.top);
  };
  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const r = stageOffset();
      const t = e.currentTarget.getBoundingClientRect();
      bonk(t.left - r.left + t.width * 0.5, t.top - r.top + t.height * 0.4);
    }
  };

  const toggleSound = () => setPref("shibonk-sound", sound ? "off" : "on");

  let lo = Infinity;
  let hi = -Infinity;
  for (const k of candles) {
    lo = Math.min(lo, k.l);
    hi = Math.max(hi, k.h);
  }
  const pad = (hi - lo) * 0.08 || 1;
  lo -= pad;
  hi += pad;
  const y = (v: number) => ((hi - v) / (hi - lo)) * 100;

  return (
    <div
      ref={stageRef}
      className="stage relative select-none overflow-hidden rounded-[26px] border-[3px] border-ink bg-paper shadow-pop"
    >
      <MarketPanel />
      <div
        role="button"
        tabIndex={0}
        aria-label="Bonk a red candle"
        onPointerDown={onPointerDown}
        onKeyDown={onKeyDown}
        className="cursor-pointer touch-manipulation rounded-none focus-visible:outline-offset-[-6px]"
      >
      <div className="relative aspect-[420/300] max-w-full">
        <ShibaScene />
      </div>
      <div
        aria-hidden="true"
        className="relative flex h-[150px] items-stretch gap-[5px] border-t-[3px] border-dashed border-ink/25 px-4 pb-2.5 pt-3.5"
        style={{ backgroundImage: "linear-gradient(rgb(29 20 38 / .07) 1px, transparent 1px)", backgroundSize: "100% 28px" }}
      >
        {candles.map((k, i) => {
          const top = y(Math.max(k.o, k.c));
          const bot = y(Math.min(k.o, k.c));
          return (
            <div key={i} className="relative flex-1">
              <div className="absolute left-1/2 -ml-px w-0.5 bg-ink" style={{ top: `${y(k.h)}%`, height: `${y(k.l) - y(k.h)}%` }} />
              <div
                className={`candle-body absolute inset-x-0 rounded-[3px] border-2 border-ink ${k.c >= k.o ? "bg-green" : "bg-red"} ${k.bonked ? "candle-bonked" : ""}`}
                style={{ top: `${top}%`, height: `${Math.max(bot - top, 1.5)}%` }}
              />
            </div>
          );
        })}
      </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2.5 px-4 pb-3.5 pt-2.5 font-mono text-[0.85rem] font-semibold">
        <span className="flex flex-col">
          <span className="animate-nudge text-shiba-dark">▸ Tap to bonk red candles</span>
          <span className="text-[0.68rem] tracking-wider opacity-70">FOR FUN · NOT A PRICE CHART</span>
        </span>
        <span>
          Your bonks: <b className="tabular-nums">{count.toLocaleString("en-US")}</b>
        </span>
        <button
          type="button"
          onClick={toggleSound}
          aria-pressed={sound}
          className="cursor-pointer rounded-lg border-2 border-ink bg-transparent px-2 py-1.5 font-mono text-[0.78rem] font-semibold"
        >
          Sound {sound ? "on" : "off"}
        </button>
      </div>
      {bursts.map((b) => (
        <div key={b.id} aria-hidden="true">
          <div className="burst" style={{ left: b.x, top: b.y, ["--r" as string]: `${b.r}deg` }}>
            {b.word}
          </div>
          {Array.from({ length: 10 }, (_, i) => {
            const a = (Math.PI * 2 * i) / 10 + (b.id % 7) * 0.1;
            const dist = 55 + ((i * 37 + b.id * 13) % 45);
            return (
              <span
                key={i}
                className="spark"
                style={{
                  left: b.x - 7,
                  top: b.y - 7,
                  ["--dx" as string]: `${Math.cos(a) * dist}px`,
                  ["--dy" as string]: `${Math.sin(a) * dist}px`,
                  ["--c" as string]: SPARK_COLORS[i % SPARK_COLORS.length],
                }}
              />
            );
          })}
        </div>
      ))}
      <span className="sr-only" aria-live="polite">
        {count > 0 ? `Bonk! ${count} bonks.` : ""}
      </span>
    </div>
  );
}
