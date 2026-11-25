// Interface sounds, generated with the Web Audio API (no audio files to download).
// Off by default. A visitor turns them on with the speaker button; the choice is remembered.
// Browsers only allow sound after the visitor has clicked or tapped the page, so the preloader,
// which plays before any click, stays silent unless the browser already allows sound.
// A gentle compressor sits before the speakers so no sound can spike.

const KEY = "nanashi-sound";
export const SOUND_EVENT = "nanashi-sound-change";

export function soundEnabled(): boolean {
  try {
    return localStorage.getItem(KEY) === "on";
  } catch {
    return false;
  }
}

export function setSoundEnabled(on: boolean) {
  try {
    localStorage.setItem(KEY, on ? "on" : "off");
  } catch {
    /* Private mode or blocked storage: the setting lasts for this page only. */
  }
  if (on) audio(); // Called from the button's click, so the browser lets the sound start.
  window.dispatchEvent(new Event(SOUND_EVENT));
}

type Out = { wet?: number; dry?: number };
let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let verb: ConvolverNode | null = null;

function audio(): AudioContext | null {
  try {
    if (!ctx) {
      const AC =
        window.AudioContext ??
        (window as unknown as { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
      const comp = ctx.createDynamicsCompressor();
      comp.threshold.value = -18;
      comp.ratio.value = 3;
      master = ctx.createGain();
      master.gain.value = 0.9;
      master.connect(comp).connect(ctx.destination);
      // A soft, dark echo: a generated 2.8 s decaying-noise impulse.
      verb = ctx.createConvolver();
      const len = ctx.sampleRate * 2.8;
      const ir = ctx.createBuffer(2, len, ctx.sampleRate);
      for (let ch = 0; ch < 2; ch++) {
        const d = ir.getChannelData(ch);
        for (let i = 0; i < len; i++)
          d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3.2);
      }
      verb.buffer = ir;
      const vg = ctx.createGain();
      vg.gain.value = 0.55;
      verb.connect(vg).connect(master);
    }
    if (ctx.state === "suspended") void ctx.resume();
    return ctx;
  } catch {
    return null;
  }
}

function route(c: AudioContext, node: AudioNode, { wet = 0.3, dry = 1 }: Out) {
  if (dry) {
    const d = c.createGain();
    d.gain.value = dry;
    node.connect(d).connect(master!);
  }
  if (wet) {
    const w = c.createGain();
    w.gain.value = wet;
    node.connect(w).connect(verb!);
  }
}

function envelope(g: GainNode, t: number, a: number, peak: number, r: number) {
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(peak, t + a);
  g.gain.exponentialRampToValueAtTime(0.0001, t + a + r);
}

type ToneOpts = Out & {
  a?: number;
  r?: number;
  gain?: number;
  glideTo?: number;
  glideTime?: number;
};
function tone(c: AudioContext, freq: number, o: ToneOpts = {}) {
  const { a = 0.02, r = 0.5, gain = 0.05 } = o;
  const t = c.currentTime;
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.frequency.setValueAtTime(freq, t);
  if (o.glideTo)
    osc.frequency.exponentialRampToValueAtTime(
      o.glideTo,
      t + (o.glideTime ?? r),
    );
  envelope(g, t, a, gain, r);
  osc.connect(g);
  route(c, g, o);
  osc.start(t);
  osc.stop(t + a + r + 0.1);
}

let noiseBuf: AudioBuffer | null = null;
function air(
  c: AudioContext,
  from: number,
  to: number,
  a: number,
  r: number,
  gain: number,
) {
  if (!noiseBuf) {
    noiseBuf = c.createBuffer(1, c.sampleRate, c.sampleRate);
    const d = noiseBuf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  }
  const t = c.currentTime;
  const src = c.createBufferSource();
  src.buffer = noiseBuf;
  const f = c.createBiquadFilter();
  f.type = "highpass";
  f.Q.value = 0.5;
  f.frequency.setValueAtTime(from, t);
  f.frequency.exponentialRampToValueAtTime(to, t + a + r);
  const g = c.createGain();
  envelope(g, t, a, gain, r);
  src.connect(f).connect(g);
  route(c, g, { wet: 0 });
  src.start(t);
  src.stop(t + a + r + 0.05);
}

/**
 * Play only when the visitor turned sound on. `onlyIfRunning` (the preloader): skip instead of
 * queueing when the browser has not allowed sound yet, so nothing plays late on the first click.
 */
function play(fn: (c: AudioContext) => void, onlyIfRunning = false) {
  if (!soundEnabled()) return;
  const c = audio();
  if (!c || (onlyIfRunning && c.state !== "running")) return;
  fn(c);
}

// The founder's picks (motion preview, 25 Nov 2026).
const STAR_NOTES = [329.6, 392, 440, 493.9, 587.3, 659.3, 784];
export const sfx = {
  /** One of the seven stars lighting: the rising tune, low and soft. */
  star: (i: number) =>
    play(
      (c) =>
        tone(c, STAR_NOTES[i] ?? 440, {
          a: 0.03,
          r: 0.7,
          gain: 0.05,
          wet: 0.25,
        }),
      true,
    ),
  /** The star shooting into the orbit: a rising tone with a little air. */
  shoot: () =>
    play((c) => {
      tone(c, 400, {
        glideTo: 1600,
        glideTime: 0.35,
        a: 0.02,
        r: 0.35,
        gain: 0.05,
        wet: 0.1,
      });
      air(c, 3000, 6000, 0.2, 0.15, 0.02);
    }, true),
  /** The star landing: one clean bell. */
  land: () =>
    play((c) => {
      tone(c, 1318.5, { a: 0.005, r: 1.6, gain: 0.075, wet: 0.2 });
      tone(c, 2637, { a: 0.005, r: 0.8, gain: 0.016, wet: 0.2 });
    }, true),
  /** Page change: a quiet sonar ping with a soft start, echoing away. */
  page: () =>
    play((c) =>
      tone(c, 880, {
        glideTo: 860,
        glideTime: 0.6,
        a: 0.015,
        r: 0.6,
        gain: 0.03,
        wet: 1.2,
        dry: 0.6,
      }),
    ),
};
