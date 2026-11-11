/**
 * Side-view vehicles for the street scene, all facing RIGHT. Each is a small SVG with a transparent
 * background. The wheels have the class "wheel" so the CSS can spin them (globals.css, "Nearby street").
 */
const WHEEL = "#23272b";
const HUB = "#b9c0c7";

function Wheel({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={WHEEL} />
      <g className="wheel">
        <circle cx={cx} cy={cy} r={r * 0.5} fill={HUB} />
        <rect x={cx - 1} y={cy - r * 0.5} width="2" height={r} fill={WHEEL} opacity=".55" />
        <rect x={cx - r * 0.5} y={cy - 1} width={r} height="2" fill={WHEEL} opacity=".55" />
      </g>
      <circle cx={cx} cy={cy} r={r * 0.14} fill={WHEEL} />
    </g>
  );
}

const Shadow = ({ w, y }: { w: number; y: number }) => (
  <ellipse cx={w / 2} cy={y} rx={w * 0.47} ry="3.5" fill="#000" opacity=".16" />
);

/** The yellow Lagos minibus with its black stripe. */
export function Danfo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 90" className={className} aria-hidden="true">
      <Shadow w={200} y={83} />
      {/* luggage on the roof */}
      <rect x="34" y="6" width="34" height="9" rx="2" fill="#7a5230" />
      <rect x="72" y="8" width="26" height="7" rx="2" fill="#c0873f" />
      <rect x="40" y="9" width="22" height="2" fill="#5d3d22" opacity=".6" />
      {/* body */}
      <path d="M10 70 V20 Q10 14 16 14 H140 L178 44 H190 Q196 44 196 50 V70 Z" fill="#f7c325" />
      <rect x="10" y="46" width="186" height="10" fill="#1d1d1d" />
      {/* windows */}
      {[20, 46, 72, 98].map((x) => (
        <rect key={x} x={x} y="22" width="22" height="18" rx="3" fill="#8fd3f0" />
      ))}
      <path d="M126 22 H142 L172 42 H126 Z" fill="#8fd3f0" />
      <rect x="123" y="22" width="3" height="40" fill="#d9a514" />
      {/* lights and bumper */}
      <circle cx="192" cy="58" r="3.2" fill="#fff6c2" />
      <rect x="188" y="64" width="12" height="5" rx="2" fill="#2b2b2b" />
      <rect x="8" y="64" width="10" height="5" rx="2" fill="#2b2b2b" />
      <Wheel cx={52} cy={70} r={13} />
      <Wheel cx={160} cy={70} r={13} />
    </svg>
  );
}

/** The three-wheeler taxi: yellow body, black roof. */
export function Keke({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 80" className={className} aria-hidden="true">
      <Shadow w={120} y={74} />
      {/* passenger cabin: open sides, black roof */}
      <rect x="14" y="30" width="58" height="26" rx="3" fill="#3a2f2b" />
      <rect x="24" y="36" width="16" height="12" rx="2" fill="#6b4a3a" />
      <rect x="46" y="36" width="16" height="12" rx="2" fill="#6b4a3a" />
      <path d="M12 24 Q12 18 18 18 H72 Q80 18 84 26 L88 32 H12 Z" fill="#1f1f1f" />
      <rect x="15" y="30" width="3" height="28" fill="#1f1f1f" />
      <rect x="68" y="30" width="3" height="28" fill="#1f1f1f" />
      {/* the front and the driver */}
      <path d="M70 32 L92 40 Q98 42 100 48 H106 Q112 48 112 54 V60 H70 Z" fill="#f4c20d" />
      <path d="M74 35 L90 41 V47 H74 Z" fill="#8fd3f0" />
      <circle cx="82" cy="30" r="4.5" fill="#7a4a2a" />
      <rect x="14" y="52" width="58" height="8" fill="#1e8a4c" />
      <circle cx="109" cy="54" r="2.6" fill="#fff6c2" />
      <Wheel cx={34} cy={62} r={10} />
      <Wheel cx={100} cy={62} r={10} />
    </svg>
  );
}

/** A motorbike taxi with a rider and a passenger. */
export function Okada({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 80" className={className} aria-hidden="true">
      <Shadow w={100} y={74} />
      {/* passenger (behind) */}
      <path d="M30 44 L34 22 L44 24 L42 44 Z" fill="#1e9b8a" />
      <circle cx="39" cy="15" r="6.5" fill="#7a4a2a" />
      <path d="M32.5 14 Q39 6 45.5 14 Z" fill="#1d1d1d" />
      {/* bike */}
      <path d="M20 64 L38 46 H62 L74 40 L82 64" fill="none" stroke="#2a2f35" strokeWidth="3.2" strokeLinejoin="round" strokeLinecap="round" />
      <rect x="28" y="42" width="30" height="6" rx="3" fill="#1d1d1d" />
      <path d="M52 40 Q60 34 70 38 L68 46 H52 Z" fill="#e4572e" />
      <circle cx="50" cy="54" r="6" fill="#59616b" />
      <path d="M70 38 L76 30" stroke="#2a2f35" strokeWidth="2.6" strokeLinecap="round" />
      {/* rider (front) */}
      <path d="M46 44 L50 20 L60 22 L58 44 Z" fill="#e4572e" />
      <circle cx="56" cy="13" r="6.5" fill="#7a4a2a" />
      <path d="M49.5 12 Q56 4 62.5 12 Z" fill="#1d1d1d" />
      <path d="M58 24 L72 31" stroke="#e4572e" strokeWidth="4" strokeLinecap="round" />
      <path d="M50 44 L64 54 L62 64" fill="none" stroke="#2b3a55" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <Wheel cx={20} cy={64} r={10} />
      <Wheel cx={82} cy={64} r={10} />
    </svg>
  );
}

/** A taxi: white with a green stripe. */
export function Taxi({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 170 70" className={className} aria-hidden="true">
      <Shadow w={170} y={64} />
      <path d="M6 54 V42 Q6 36 14 34 L40 30 Q52 14 74 14 H112 Q128 14 138 30 L158 35 Q164 37 164 44 V54 Z" fill="#f2f4f3" />
      <rect x="6" y="44" width="158" height="6" fill="#1e9b55" />
      <path d="M56 30 L68 18 H84 V30 Z" fill="#8fd3f0" />
      <path d="M90 18 H112 L128 30 H90 Z" fill="#8fd3f0" />
      <rect x="86" y="8" width="16" height="6" rx="2" fill="#1e9b55" />
      <circle cx="160" cy="44" r="3" fill="#fff6c2" />
      <circle cx="9" cy="44" r="2.6" fill="#e43d30" />
      <Wheel cx={40} cy={54} r={11} />
      <Wheel cx={130} cy={54} r={11} />
    </svg>
  );
}

/** A modern SUV in dark blue. */
export function Suv({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 180 78" className={className} aria-hidden="true">
      <Shadow w={180} y={72} />
      <rect x="48" y="8" width="64" height="3" rx="1.5" fill="#1d2733" />
      <path d="M8 62 V40 Q8 34 14 32 L34 28 L46 14 H118 Q128 14 134 22 L152 34 Q166 36 170 44 V62 Z" fill="#2f4057" />
      <path d="M50 28 L58 18 H82 V28 Z" fill="#9fc9dd" />
      <path d="M88 18 H116 L130 28 H88 Z" fill="#9fc9dd" />
      <rect x="8" y="48" width="162" height="4" fill="#1d2733" opacity=".6" />
      <circle cx="166" cy="46" r="3.2" fill="#fff6c2" />
      <circle cx="10" cy="46" r="2.8" fill="#e43d30" />
      <Wheel cx={44} cy={62} r={13} />
      <Wheel cx={136} cy={62} r={13} />
    </svg>
  );
}
