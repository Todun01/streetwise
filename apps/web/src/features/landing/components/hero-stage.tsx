"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { scrollProgress, sceneValues } from "@/lib/hero-progress";

/**
 * The hero's frame. On wide screens it is taller than the screen and its inner stage is "sticky",
 * so the scene stays put while you scroll through it. As you scroll, this component updates two CSS
 * variables (--lift and --reveal) and the CSS in globals.css does all the visual work.
 */
export function HeroStage({ children }: { children: ReactNode }) {
  const trackRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    // reduced motion: the CSS already shows the finished scene, so do nothing
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const wide = window.matchMedia("(min-width: 1024px)");
    const scene = track.querySelector<HTMLElement>("[data-hero-scene]");
    let frame = 0;

    const update = () => {
      frame = 0;
      const t = track.getBoundingClientRect();
      const { lift, reveal } = sceneValues(
        scrollProgress({
          pinned: wide.matches,
          viewportHeight: window.innerHeight,
          trackTop: t.top,
          trackHeight: t.height,
          sceneTop: scene ? scene.getBoundingClientRect().top : t.top,
        }),
      );
      track.style.setProperty("--lift", lift.toFixed(4));
      track.style.setProperty("--reveal", reveal.toFixed(4));
    };

    // at most one update per screen refresh, however fast the scroll events arrive
    const request = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    request();

    return () => {
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section
      ref={trackRef}
      id="home"
      className="hero-stage relative isolate overflow-clip bg-forest-900 text-cream-100 lg:h-[185vh]"
    >
      {/* the road from the logo: asphalt with a double gold centre-line */}
      <div aria-hidden="true" className="absolute inset-y-0 left-0 w-10 bg-asphalt sm:w-16 lg:w-24">
        <span className="absolute inset-y-0 left-1/2 ml-[-9px] w-1.5 bg-road-gold" />
        <span className="absolute inset-y-0 left-1/2 ml-[3px] w-1.5 bg-road-gold" />
      </div>

      {/* the stage: sticks below the navbar on wide screens while the section scrolls past */}
      <div className="relative isolate lg:sticky lg:top-16 lg:h-[calc(100dvh-4rem)]">
        {/* soft light behind the scene (transparent at the edges, so the road shows through) */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(55%_60%_at_74%_48%,#22432f_0%,rgba(20,42,28,0)_72%)]"
        />

        <div className="grid h-full lg:grid-cols-2">{children}</div>

        <p
          aria-hidden="true"
          className="hero-cue pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-sm tracking-widest text-cream-200 uppercase lg:block"
        >
          Scroll
        </p>
      </div>
    </section>
  );
}