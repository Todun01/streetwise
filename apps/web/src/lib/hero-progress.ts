/** The sticky navbar's height (Tailwind h-16). */
export const HEADER_PX = 64;

/** The cover starts slightly raised, so the scene feels alive before anyone scrolls. */
export const START_LIFT = 0.07;

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));
const smoothstep = (a: number, b: number, x: number) => {
  const t = clamp01((x - a) / (b - a));
  return t * t * (3 - 2 * t);
};

export interface ProgressInput {
  /** true on wide screens, where the scene stays pinned while you scroll */
  pinned: boolean;
  viewportHeight: number;
  /** the hero section's top edge, measured from the top of the screen */
  trackTop: number;
  trackHeight: number;
  /** the scene's top edge, measured from the top of the screen (used when not pinned) */
  sceneTop: number;
}

/** 0 -> 1 as the visitor scrolls through the hero. */
export function scrollProgress(i: ProgressInput): number {
  if (i.pinned) {
    // the hero is taller than the screen; its inner stage sticks below the navbar while you scroll through
    const travel = i.trackHeight - (i.viewportHeight - HEADER_PX);
    return travel > 0 ? clamp01((HEADER_PX - i.trackTop) / travel) : 1;
  }
  // stacked layout: play while the scene travels from 90% down the screen up to 35%
  const start = i.viewportHeight * 0.9;
  const end = i.viewportHeight * 0.35;
  return clamp01((start - i.sceneTop) / (start - end));
}

/** Turn raw progress into the two numbers the CSS uses. */
export function sceneValues(p: number) {
  return {
    // gentle start, fastest in the middle, settles at 80% so the finished scene holds still for the last fifth
    lift: START_LIFT + (1 - START_LIFT) * smoothstep(0, 0.8, p),
    // the pin appears while the cover is on its way up
    reveal: smoothstep(0.3, 0.75, p),
  };
}