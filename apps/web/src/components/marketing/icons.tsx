/**
 * Simple outline icons for the "how it works" placeholders. They take their colour from the text colour.
 * The parts with an "ico-" class are animated in globals.css ("How it works").
 */
const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

/** A pin that hops, with a ripple spreading from its tip. */
export function MapPinIcon({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg {...base} className={className}>
      <ellipse className="ico-ping" cx="12" cy="21.5" rx="3" ry="1" />
      <g className="ico-pin">
        <path d="M12 21s-7-6.2-7-11a7 7 0 1 1 14 0c0 4.8-7 11-7 11z" />
        <circle cx="12" cy="10" r="2.5" />
      </g>
    </svg>
  );
}

/** A route whose line keeps travelling from start to end. */
export function RouteIcon({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg {...base} className={className}>
      <circle cx="6" cy="19" r="2" />
      <circle cx="18" cy="5" r="2" />
      <path className="ico-route" d="M8 19h7a3.5 3.5 0 0 0 0-7H9.5a3.5 3.5 0 0 1 0-7H16" />
    </svg>
  );
}

/** A camera whose lens pulses and flash blinks. */
export function CameraIcon({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg {...base} className={className}>
      <rect x="3" y="7" width="18" height="13" rx="2.5" />
      <path d="M8 7l1.5-3h5L16 7" />
      <circle className="ico-lens" cx="12" cy="13.5" r="3.5" />
      <circle className="ico-flash" cx="17.5" cy="10.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}