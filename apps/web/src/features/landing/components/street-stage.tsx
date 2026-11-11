"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * The section's frame. It tells the CSS what is happening by adding classes:
 *   street-ready   motion is allowed (not added for reduced motion: those visitors see a still street)
 *   street-seen    the section has come into view at least once: the cards arrive
 *   street-inview  it is on screen right now: the traffic, clouds and birds run, and pause when it is not
 */
export function StreetStage({ id, children }: { id?: string; children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    el.classList.add("street-ready");

    const observer = new IntersectionObserver(
      ([entry]) => {
        el.classList.toggle("street-inview", entry.isIntersecting);
        if (entry.isIntersecting && !el.classList.contains("street-seen")) {
          // two frames later, so the browser has drawn the hidden starting state first and can animate from it
          requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add("street-seen")));
        }
      },
      { threshold: 0.12 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} id={id} className="street-stage">
      {children}
    </section>
  );
}