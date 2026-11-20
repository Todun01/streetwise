export type Theme = "light" | "dark";

/** Where the visitor's choice is remembered in their browser. */
export const THEME_KEY = "streetwise:theme";

/** The colour of the phone's browser bar in each theme (the same as --background in globals.css). */
export const BAR_COLOR: Record<Theme, string> = { light: "#f6efdf", dark: "#142a1c" };

/** The visitor's saved choice, or null if they have never used the switch. */
export function readStoredTheme(): Theme | null {
  try {
    const t = localStorage.getItem(THEME_KEY);
    return t === "light" || t === "dark" ? t : null;
  } catch {
    return null; // storage blocked (private mode): act as if nothing is saved
  }
}

export function storeTheme(theme: Theme) {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {
    /* storage blocked: the choice lasts until the page is closed */
  }
}

/** What the visitor's device is set to. */
export function systemTheme(): Theme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

/** Puts a theme on the page: the attribute the CSS reads, and the colour of the browser bar. */
export function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
  document.querySelectorAll('meta[name="theme-color"]').forEach((m) => {
    m.setAttribute("content", BAR_COLOR[theme]);
    m.removeAttribute("media"); // layout.tsx gives these a device-based media rule; the choice overrides it
  });
}

/**
 * Runs in <head> BEFORE the page paints, so the right theme is there from the first frame (no flash).
 * It uses the saved choice if there is one, otherwise the device setting.
 * It is a string because it must run as plain JavaScript before React exists.
 */
export const THEME_INIT_SCRIPT = `(function(){var d=document.documentElement,t=null;try{t=localStorage.getItem("${THEME_KEY}")}catch(e){}if(t!=="light"&&t!=="dark"){try{t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}catch(e){t="light"}}d.setAttribute("data-theme",t)})();`;