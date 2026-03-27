import type { DrumSound } from "../data/pads";

let audioCtx: AudioContext | null = null;

function getContext(): AudioContext {
  if (!audioCtx) audioCtx = new AudioContext();
  if (audioCtx.state === "suspended") audioCtx.resume();
  return audioCtx;
}

function createNoiseBuffer(ctx: AudioContext, duration: number): AudioBuffer {
  const sampleRate = ctx.sampleRate;
  const length = sampleRate * duration;
  const buffer = ctx.createBuffer(1, length, sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < length; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  return buffer;
}

function playKick() {
  const ctx = getContext();
  const now = ctx.currentTime;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(150, now);
  osc.frequency.exponentialRampToValueAtTime(40, now + 0.1);
  gain.gain.setValueAtTime(1, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
  osc.connect(gain).connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.3);

  // Click transient
  const clickOsc = ctx.createOscillator();
  const clickGain = ctx.createGain();
  clickOsc.type = "square";
  clickOsc.frequency.setValueAtTime(800, now);
  clickGain.gain.setValueAtTime(0.3, now);
  clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.01);
  clickOsc.connect(clickGain).connect(ctx.destination);
  clickOsc.start(now);
  clickOsc.stop(now + 0.01);
}

function playSnare() {
  const ctx = getContext();
  const now = ctx.currentTime;

  // Tone body
  const osc = ctx.createOscillator();
  const oscGain = ctx.createGain();
  osc.type = "triangle";
  osc.frequency.setValueAtTime(180, now);
  osc.frequency.exponentialRampToValueAtTime(80, now + 0.05);
  oscGain.gain.setValueAtTime(0.5, now);
  oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
  osc.connect(oscGain).connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.12);

  // Noise layer
  const noise = ctx.createBufferSource();
  noise.buffer = createNoiseBuffer(ctx, 0.2);
  const noiseFilter = ctx.createBiquadFilter();
  noiseFilter.type = "bandpass";
  noiseFilter.frequency.setValueAtTime(3000, now);
  noiseFilter.Q.setValueAtTime(1, now);
  const noiseGain = ctx.createGain();
  noiseGain.gain.setValueAtTime(0.6, now);
  noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
  noise.connect(noiseFilter).connect(noiseGain).connect(ctx.destination);
  noise.start(now);
  noise.stop(now + 0.15);
}

function playHihat() {
  const ctx = getContext();
  const now = ctx.currentTime;

  const noise = ctx.createBufferSource();
  noise.buffer = createNoiseBuffer(ctx, 0.08);
  const filter = ctx.createBiquadFilter();
  filter.type = "highpass";
  filter.frequency.setValueAtTime(7000, now);
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.4, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
  noise.connect(filter).connect(gain).connect(ctx.destination);
  noise.start(now);
  noise.stop(now + 0.08);
}

function playTom() {
  const ctx = getContext();
  const now = ctx.currentTime;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(100, now);
  osc.frequency.exponentialRampToValueAtTime(60, now + 0.15);
  gain.gain.setValueAtTime(0.8, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
  osc.connect(gain).connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.25);
}

function playClap() {
  const ctx = getContext();
  const now = ctx.currentTime;

  // Multiple short noise bursts
  for (let i = 0; i < 3; i++) {
    const noise = ctx.createBufferSource();
    noise.buffer = createNoiseBuffer(ctx, 0.03);
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(1500, now);
    filter.Q.setValueAtTime(0.8, now);
    const gain = ctx.createGain();
    const offset = i * 0.015;
    gain.gain.setValueAtTime(0, now + offset);
    gain.gain.linearRampToValueAtTime(0.5, now + offset + 0.003);
    gain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.03);
    noise.connect(filter).connect(gain).connect(ctx.destination);
    noise.start(now + offset);
    noise.stop(now + offset + 0.03);
  }

  // Tail
  const tail = ctx.createBufferSource();
  tail.buffer = createNoiseBuffer(ctx, 0.15);
  const tailFilter = ctx.createBiquadFilter();
  tailFilter.type = "bandpass";
  tailFilter.frequency.setValueAtTime(1200, now);
  const tailGain = ctx.createGain();
  tailGain.gain.setValueAtTime(0.3, now + 0.04);
  tailGain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
  tail.connect(tailFilter).connect(tailGain).connect(ctx.destination);
  tail.start(now + 0.04);
  tail.stop(now + 0.15);
}

function playRim() {
  const ctx = getContext();
  const now = ctx.currentTime;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "triangle";
  osc.frequency.setValueAtTime(800, now);
  gain.gain.setValueAtTime(0.5, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
  osc.connect(gain).connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.03);

  // Noise click
  const noise = ctx.createBufferSource();
  noise.buffer = createNoiseBuffer(ctx, 0.01);
  const noiseGain = ctx.createGain();
  noiseGain.gain.setValueAtTime(0.3, now);
  noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.01);
  noise.connect(noiseGain).connect(ctx.destination);
  noise.start(now);
  noise.stop(now + 0.01);
}

function playCrash() {
  const ctx = getContext();
  const now = ctx.currentTime;

  const noise = ctx.createBufferSource();
  noise.buffer = createNoiseBuffer(ctx, 0.8);
  const filter = ctx.createBiquadFilter();
  filter.type = "highpass";
  filter.frequency.setValueAtTime(3000, now);
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.4, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
  noise.connect(filter).connect(gain).connect(ctx.destination);
  noise.start(now);
  noise.stop(now + 0.8);

  // Metallic shimmer
  const osc1 = ctx.createOscillator();
  const osc1Gain = ctx.createGain();
  osc1.type = "square";
  osc1.frequency.setValueAtTime(587, now);
  osc1Gain.gain.setValueAtTime(0.05, now);
  osc1Gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
  osc1.connect(osc1Gain).connect(ctx.destination);
  osc1.start(now);
  osc1.stop(now + 0.5);
}

function playPerc() {
  const ctx = getContext();
  const now = ctx.currentTime;

  // FM synthesis for clave/woodblock sound
  const modulator = ctx.createOscillator();
  const modGain = ctx.createGain();
  const carrier = ctx.createOscillator();
  const carrierGain = ctx.createGain();

  modulator.type = "sine";
  modulator.frequency.setValueAtTime(200, now);
  modGain.gain.setValueAtTime(400, now);
  modGain.gain.exponentialRampToValueAtTime(1, now + 0.08);

  carrier.type = "sine";
  carrier.frequency.setValueAtTime(400, now);
  carrierGain.gain.setValueAtTime(0.6, now);
  carrierGain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

  modulator.connect(modGain).connect(carrier.frequency);
  carrier.connect(carrierGain).connect(ctx.destination);

  modulator.start(now);
  carrier.start(now);
  modulator.stop(now + 0.1);
  carrier.stop(now + 0.1);
}

function playFx() {
  const ctx = getContext();
  const now = ctx.currentTime;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(200, now);
  osc.frequency.exponentialRampToValueAtTime(1000, now + 0.3);
  gain.gain.setValueAtTime(0.4, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
  osc.connect(gain).connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.35);

  // Flanger-like second oscillator
  const osc2 = ctx.createOscillator();
  const gain2 = ctx.createGain();
  osc2.type = "sine";
  osc2.frequency.setValueAtTime(203, now);
  osc2.frequency.exponentialRampToValueAtTime(1006, now + 0.3);
  gain2.gain.setValueAtTime(0.3, now);
  gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
  osc2.connect(gain2).connect(ctx.destination);
  osc2.start(now);
  osc2.stop(now + 0.35);
}

const soundMap: Record<DrumSound, () => void> = {
  kick: playKick,
  snare: playSnare,
  hihat: playHihat,
  tom: playTom,
  clap: playClap,
  rim: playRim,
  crash: playCrash,
  perc: playPerc,
  fx: playFx,
};

export function playDrum(type: DrumSound) {
  soundMap[type]();
}
