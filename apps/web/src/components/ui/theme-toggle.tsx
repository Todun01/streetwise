"use client";

import { useTheme } from "@/lib/use-theme";

/**
 * A light/dark switch drawn as a little sky: a sun over clouds by day, a moon among stars at night.
 * How it LOOKS comes from the CSS dark: classes, so it is right from the first frame. What it SAYS to
 * screen readers (checked or not) comes from the theme hook, which is correct once the page has loaded.
 */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggle } = useTheme();

  return (
    <button
      type="button"
      role="switch"
      aria-checked={theme === "dark"}
      aria-label="Dark mode"
      onClick={toggle}
      className={`group inline-flex h-11 items-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${className}`}
    >
      <span
        aria-hidden="true"
        className="relative block h-8 w-[3.75rem] overflow-hidden rounded-full bg-[#79c7f1] ring-1 ring-black/10 transition-colors duration-500 dark:bg-[#122049] dark:ring-white/15"
      >
        {/* day: two little clouds */}
        <span className="absolute inset-0 transition-opacity duration-500 dark:opacity-0">
          <span className="absolute bottom-1.5 right-2 h-2 w-5 rounded-full bg-white/90" />
          <span className="absolute bottom-3 right-4 h-2 w-3 rounded-full bg-white/80" />
        </span>
        {/* night: a few stars */}
        <span className="absolute inset-0 opacity-0 transition-opacity duration-500 dark:opacity-100">
          <span className="absolute left-2 top-2 h-[3px] w-[3px] rounded-full bg-white" />
          <span className="absolute left-4 top-4 h-0.5 w-0.5 rounded-full bg-white/80" />
          <span className="absolute bottom-1.5 left-3 h-[3px] w-[3px] rounded-full bg-white/90" />
        </span>
        {/* the knob: the sun by day, the moon at night */}
        <span className="absolute left-1 top-1 block h-6 w-6 rounded-full bg-[#ffd84d] shadow-[0_0_10px_2px_rgba(255,216,77,0.55)] transition-all duration-500 ease-[cubic-bezier(0.3,1.4,0.5,1)] group-hover:scale-105 dark:translate-x-7 dark:bg-[#f3f0d6] dark:shadow-[0_0_10px_2px_rgba(223,230,255,0.45)]">
          <span className="absolute left-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-[#dcd8b8] opacity-0 transition-opacity duration-500 dark:opacity-100" />
          <span className="absolute bottom-1 right-1.5 h-1 w-1 rounded-full bg-[#dcd8b8] opacity-0 transition-opacity duration-500 dark:opacity-100" />
        </span>
      </span>
    </button>
  );
}