import Image from "next/image";

/**
 * The hero artwork, built from your real poster layers (public/brand/scene/*.webp).
 * All layers are the same 800 x 760 canvas, so they line up when stacked on top of each other.
 *
 *   back  ->  front
 *   glow, bottom hand, cover (with the top hand), tray, pin
 *
 * Every layer comes in two versions. The artwork is semi-transparent (it was made to melt into dark
 * green), which looks washed-out on a light page, so the "-light" copies are more opaque. They look the
 * same over the black road. The dark: classes show the right set for the current theme.
 *
 * The motion lives in globals.css ("Hero scene"). hero-stage.tsx writes two numbers as you scroll
 * (--lift and --reveal) and the CSS turns them into movement.
 */
const CANVAS_W = 800;
const CANVAS_H = 760;

const layer = { width: CANVAS_W, height: CANVAS_H, unoptimized: true, alt: "", loading: "eager" } as const;

/** One artwork layer, in its light and dark versions. */
function Layer({ name, className }: { name: string; className: string }) {
  return (
    <>
      <Image {...layer} src={`/brand/scene/${name}.webp`} className={`hs-layer ${className} dark:hidden`} />
      <Image {...layer} src={`/brand/scene/${name}.webp`} className={`hs-layer ${className} hidden dark:block`} />
    </>
  );
}

export function HeroScene({ className = "" }: { className?: string }) {
  return (
    <div className={`hero-scene ${className}`} aria-hidden="true">
      <div className="hs-glow" />
      <Layer name="hand-bottom" className="hs-hand" />
      <Layer name="cover" className="hs-cover" />
      <Layer name="tray" className="hs-tray" />
      <div className="hs-pin-wrap">
        <Image src="/brand/pin.png" alt="" width={512} height={512} unoptimized className="hs-pin" />
      </div>
    </div>
  );
}