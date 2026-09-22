// A cartoon "thud", synthesised on the fly: no audio file to download.
let ctx: AudioContext | undefined;

export function playBonk() {
  try {
    const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) return;
    ctx ??= new AC();
    const t = ctx.currentTime;

    const low = ctx.createOscillator();
    const lowGain = ctx.createGain();
    low.type = "triangle";
    low.frequency.setValueAtTime(220, t);
    low.frequency.exponentialRampToValueAtTime(48, t + 0.18);
    lowGain.gain.setValueAtTime(0.55, t);
    lowGain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
    low.connect(lowGain).connect(ctx.destination);
    low.start(t);
    low.stop(t + 0.26);

    const click = ctx.createOscillator();
    const clickGain = ctx.createGain();
    click.type = "square";
    click.frequency.setValueAtTime(900, t);
    click.frequency.exponentialRampToValueAtTime(300, t + 0.06);
    clickGain.gain.setValueAtTime(0.08, t);
    clickGain.gain.exponentialRampToValueAtTime(0.001, t + 0.07);
    click.connect(clickGain).connect(ctx.destination);
    click.start(t);
    click.stop(t + 0.08);
  } catch {
    // Audio is a bonus; never break the bonk over it.
  }
}

export function readPref(key: string, fallback: string) {
  try {
    return localStorage.getItem(key) ?? fallback;
  } catch {
    return fallback;
  }
}

export function writePref(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Private mode or blocked storage: the preference just won't stick.
  }
}

// A tiny localStorage-backed store for per-visitor prefs, readable with useSyncExternalStore.
const listeners = new Set<() => void>();
export function subscribePrefs(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}
export function setPref(key: string, value: string) {
  writePref(key, value);
  listeners.forEach((l) => l());
}
