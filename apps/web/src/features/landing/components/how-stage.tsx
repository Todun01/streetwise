"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Wraps the "how it works" steps and tells the CSS what is happening, by adding classes:
 *   how-ready   animations are allowed (not added for reduced motion, so those visitors see the finished layout)
 *   how-seen    the section has come into view at least once: the entrance (road drawing, phones arriving) plays
 *   how-inview  it is on screen right now: the looping animations run, and pause when it is not
 */
export function HowStage({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    el.classList.add("how-ready");

    const observer = new IntersectionObserver(
      ([entry]) => {
        el.classList.toggle("how-inview", entry.isIntersecting);
        if (entry.isIntersecting && !el.classList.contains("how-seen")) {
          // two frames later, so the browser has drawn the hidden starting state first and can animate from it
          requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add("how-seen")));
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="how-stage">
      {children}
    </div>
  );
}