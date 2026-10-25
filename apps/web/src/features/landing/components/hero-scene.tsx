import Image from "next/image";

/**
 * The hero artwork, built from your real poster layers (public/brand/scene/*.webp).
 * All three layers are the same 800 x 760 canvas, so they line up when stacked on top of each other.
 *
 *   back  ->  front
 *   glow, bottom hand, cover (with the top hand), tray, pin
 *
 * The motion lives in globals.css ("Hero scene"). hero-stage.tsx writes two numbers as you scroll
 * (--lift and --reveal) and the CSS turns them into movement.
 */
const CANVAS_W = 800;
const CANVAS_H = 760;

const layer = { width: CANVAS_W, height: CANVAS_H, unoptimized: true, loading: "eager" } as const;

export function HeroScene() {
  return (
    <div className="hero-scene" aria-hidden="true">
      <div className="hs-glow" />
      <Image {...layer} alt="" src="/brand/scene/hand-bottom.webp" className="hs-layer hs-hand" />
      <Image {...layer} alt="" src="/brand/scene/cover.webp" className="hs-layer hs-cover" />
      <Image {...layer} alt="" src="/brand/scene/tray.webp" className="hs-layer hs-tray" />
      <div className="hs-pin-wrap">
        <Image src="/brand/pin.png" alt="" width={512} height={512} unoptimized className="hs-pin" />
      </div>
    </div>
  );
}