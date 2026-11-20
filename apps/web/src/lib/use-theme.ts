"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";
import { applyTheme, readStoredTheme, storeTheme, systemTheme, type Theme } from "@/lib/theme";

// The page's data-theme attribute IS the source of truth, so every switch on the page always agrees.
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}
const getTheme = (): Theme => (document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light");
const getServerTheme = (): Theme => "light"; // the server cannot know; React corrects this right after loading

let watchingDevice = false;
type TransitionDocument = Document & { startViewTransition?: (update: () => void) => unknown };

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getTheme, getServerTheme);

  useEffect(() => {
    applyTheme(getTheme()); // makes the browser-bar colour match the theme
    if (watchingDevice) return; // once per page, however many switches there are
    watchingDevice = true;
    // if the device switches (for example at sunset) and the visitor has never chosen, follow it
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
      if (readStoredTheme() === null) applyTheme(systemTheme());
    });
  }, []);

  const setTheme = useCallback((next: Theme) => {
    storeTheme(next);
    const change = () => applyTheme(next);
    const doc = document as TransitionDocument;
    // browsers that support it fade between the two looks; others (and reduced-motion visitors) switch at once
    if (doc.startViewTransition && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      doc.startViewTransition(change);
    } else {
      change();
    }
  }, []);

  const toggle = useCallback(() => setTheme(getTheme() === "dark" ? "light" : "dark"), [setTheme]);

  return { theme, setTheme, toggle };
}