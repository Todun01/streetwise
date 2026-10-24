"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { SPLASH_KEY } from "@/lib/splash";

type Phase = "loading" | "opening" | "closing" | "done";

// The CSS transitions in globals.css use the same durations (OPEN_MS, FADE_MS). Keep them in step.
const MIN_MS = 900; // always show the road for at least this long, so the animation is never a blink
const OPEN_MS = 650; // the road parting
const HOLD_MS = 400; // the icon stays on screen
const FADE_MS = 350; // the whole splash fades away
const MAX_WAIT_MS = 4000; // never keep people waiting longer than this, whatever the network does

// the real size of your pin image (right-click the file -> Properties -> Details)
const PIN_WIDTH = 512;
const PIN_HEIGHT = 512;

export function SplashScreen() {
  const [phase, setPhase] = useState<Phase>("loading");

  useEffect(() => {
    const root = document.documentElement;
    // Nothing to do unless the head script decided this is a first visit this session.
    if (!root.classList.contains("splash-pending")) return;

    const timers: number[] = [];
    const later = (fn: () => void, ms: number) => {
      timers.push(window.setTimeout(fn, ms));
    };

    let started = false;
    const start = () => {
      if (started) return;
      started = true;
      // performance.now() = time since the page began loading
      later(() => {
        setPhase("opening");
        later(() => setPhase("closing"), OPEN_MS + HOLD_MS);
        later(() => {
          setPhase("done");
          root.classList.remove("splash-pending"); // lets the hero animation begin
          try {
            sessionStorage.setItem(SPLASH_KEY, "1");
          } catch {
            /* private mode: the splash will simply play again next time */
          }
        }, OPEN_MS + HOLD_MS + FADE_MS);
      }, Math.max(0, MIN_MS - performance.now()));
    };

    if (document.readyState === "complete") start();
    else {
      window.addEventListener("load", start, { once: true });
      later(start, MAX_WAIT_MS);
    }

    return () => {
      timers.forEach((t) => window.clearTimeout(t));
      window.removeEventListener("load", start);
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div className="splash" data-phase={phase} aria-hidden="true">
      {/* revealed when the road parts */}
      <div className="splash-reveal">
        <Image
          src="/brand/pin.png"
          alt=""
          width={PIN_WIDTH}
          height={PIN_HEIGHT}
          className="splash-icon"
          loading="eager"
        />
      </div>

      {/* the two halves of the road, each carrying one gold line */}
      <div className="splash-half splash-left">
        <span className="splash-line" />
      </div>
      <div className="splash-half splash-right">
        <span className="splash-line" />
      </div>
    </div>
  );
}