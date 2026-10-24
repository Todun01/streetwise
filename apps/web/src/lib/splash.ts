/** Shared by the inline script (layout.tsx) and the SplashScreen component. */
export const SPLASH_KEY = "streetwise:splash-seen";

/**
 * Runs in <head> BEFORE the page paints, so there is no flash.
 * It tags <html> with what should happen:
 *   (nothing)       reduced motion or script failure: no splash, scene shows its finished state
 *   anim            animations are allowed
 *   splash-pending  first visit this session: the splash will play, and the hero waits for it
 *   splash-seen     already played this session: hide the splash at once
 */
export const SPLASH_INIT_SCRIPT = `(function(){var d=document.documentElement;try{if(matchMedia("(prefers-reduced-motion: reduce)").matches){d.classList.add("splash-seen");return}d.classList.add("anim");var s=false;try{s=!!sessionStorage.getItem("${SPLASH_KEY}")}catch(e){}if(s){d.classList.add("splash-seen")}else{d.classList.add("splash-pending");setTimeout(function(){d.classList.remove("splash-pending")},8000)}}catch(e){d.classList.add("splash-seen")}})();`;