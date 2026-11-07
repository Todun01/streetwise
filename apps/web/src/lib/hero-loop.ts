/**
 * The hero's two modes, as a tiny state machine (no React, so it can be tested with plain numbers):
 *
 *   idle  -> the dish opens, holds, closes, holds, and repeats by itself
 *   touch -> while the visitor is scrolling, the scrollbar is in charge instead
 *
 * "pos" is the animation's progress from 0 (closed) to 1 (open): the same number the scroll
 * position used to produce, so the CSS needs no changes. When the visitor stops scrolling,
 * the loop picks up from wherever pos is, travelling the way it was already going.
 */
export interface LoopState {
    /** 0 = closed, 1 = open */
    pos: number;
    /** 1 = opening, -1 = closing */
    dir: 1 | -1;
    /** while idle, stay still until this time (ms) */
    holdUntil: number;
  }
  
  export const LOOP = {
    openSeconds: 2.4,
    closeSeconds: 2.4,
    holdOpenSeconds: 2.2, // how long the pin glows before the dish closes again
    holdClosedSeconds: 0.9, // the short pause before it opens again
    followSeconds: 0.14, // how quickly the dish chases the scrollbar (smaller = snappier)
    splashPauseMs: 700, // after the loading screen, wait this long before the first opening
  };
  
  /** How long after the last scroll the loop takes over again. */
  export const IDLE_AFTER_MS = 1400;
  
  /** A closed dish that waits a moment (the same pause as between loops) before it first opens. */
  export const startLoop = (now: number): LoopState => ({
    pos: 0,
    dir: 1,
    holdUntil: now + LOOP.holdClosedSeconds * 1000,
  });
  
  export interface LoopInput {
    /** current time in ms */
    now: number;
    /** seconds since the previous step */
    dt: number;
    /** where the scrollbar says the animation should be (0 to 1) */
    target: number;
    /** has the visitor scrolled in the last IDLE_AFTER_MS? */
    userActive: boolean;
    /** hold everything still (the loading screen is up) */
    paused: boolean;
  }
  
  export function stepLoop(s: LoopState, i: LoopInput): LoopState {
    if (i.paused) return { ...s, holdUntil: Math.max(s.holdUntil, i.now + LOOP.splashPauseMs) };
  
    // touch: chase the scrollbar, and remember which way we are travelling
    if (i.userActive) {
      const pos = s.pos + (i.target - s.pos) * (1 - Math.exp(-i.dt / LOOP.followSeconds));
      const dir = Math.abs(pos - s.pos) > 1e-4 ? (pos > s.pos ? 1 : -1) : s.dir;
      return { pos, dir, holdUntil: 0 };
    }
  
    // idle: wait out any pause, then travel, and turn round at each end
    if (i.now < s.holdUntil) return s;
    const pos = s.pos + (s.dir * i.dt) / (s.dir > 0 ? LOOP.openSeconds : LOOP.closeSeconds);
    if (pos >= 1) return { pos: 1, dir: -1, holdUntil: i.now + LOOP.holdOpenSeconds * 1000 };
    if (pos <= 0) return { pos: 0, dir: 1, holdUntil: i.now + LOOP.holdClosedSeconds * 1000 };
    return { pos, dir: s.dir, holdUntil: s.holdUntil };
  }