"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { IDLE_AFTER_MS, startLoop, stepLoop, type LoopState } from "@/lib/hero-loop";
import { scrollProgress, sceneValues } from "@/lib/hero-progress";

/**
 * The hero's frame. On wide screens it is taller than the screen and its inner stage is "sticky",
 * so the scene stays put while you scroll through it.
 *
 * The dish has two modes (see lib/hero-loop.ts):
 *   idle  -> it opens and closes by itself, forever
 *   touch -> while the visitor is scrolling, the scrollbar controls it; when they stop, the loop carries on
 *
 * Either way, this component only writes three CSS variables (--lift, --reveal, --scrolled);
 * the CSS in globals.css does all the visual work.
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
    const root = document.documentElement;

    let state: LoopState = startLoop(performance.now());
    let target = 0; // where the scrollbar says the animation should be (0 to 1)
    let scrollDirty = true; // re-read the scroll position on the next frame
    let lastInput = -Infinity; // when the visitor last scrolled
    let last = 0;
    let frame = 0;
    let onScreen = false;
    let tabVisible = !document.hidden;
    const written = { lift: -1, reveal: -1, scrolled: -1 };

    const readScroll = () => {
      const t = track.getBoundingClientRect();
      return scrollProgress({
        pinned: wide.matches,
        viewportHeight: window.innerHeight,
        trackTop: t.top,
        trackHeight: t.height,
        sceneTop: scene ? scene.getBoundingClientRect().top : t.top,
      });
    };

    const write = (name: "lift" | "reveal" | "scrolled", value: number) => {
      if (Math.abs(value - written[name]) < 0.0005) return; // nothing visible changed
      written[name] = value;
      track.style.setProperty(`--${name}`, value.toFixed(4));
    };

    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);
      const dt = Math.min(0.05, (now - last) / 1000); // never jump far after a pause
      last = now;

      if (scrollDirty) {
        target = readScroll();
        scrollDirty = false;
      }

      state = stepLoop(state, {
        now,
        dt,
        target,
        userActive: now - lastInput < IDLE_AFTER_MS,
        paused: root.classList.contains("splash-pending"), // the loading screen is still up
      });

      const { lift, reveal } = sceneValues(state.pos);
      write("lift", lift);
      write("reveal", reveal);
      write("scrolled", target);
    };

    // run the animation only while the hero is on screen and the tab is visible
    const sync = () => {
      const shouldRun = onScreen && tabVisible;
      if (shouldRun && !frame) {
        last = performance.now();
        frame = requestAnimationFrame(tick);
      } else if (!shouldRun && frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    };

    const onScroll = () => {
      scrollDirty = true;
      lastInput = performance.now();
    };
    const onResize = () => {
      scrollDirty = true;
    };
    const onVisibility = () => {
      tabVisible = !document.hidden;
      sync();
    };

    const observer = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      track.classList.toggle("hero-inview", onScreen); // lets the CSS pause the moving road too
      sync();
    });
    observer.observe(track);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section
      ref={trackRef}
      id="home"
      className="hero-stage relative isolate overflow-clip bg-forest-900 text-cream-100 lg:h-[185vh]"
    >
      {/* the road from the logo: asphalt with a double gold centre-line, its dashes rushing past */}
      {/* <div aria-hidden="true" className="absolute inset-y-0 left-0 w-10 overflow-hidden bg-asphalt sm:w-16 lg:w-24">
        <span className="hero-dash absolute left-1/2 ml-[-9px] w-1.5" />
        <span className="hero-dash absolute left-1/2 ml-[3px] w-1.5" />
      </div> */}

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