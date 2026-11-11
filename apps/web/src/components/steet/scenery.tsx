/**
 * The still parts of the street scene: sun, clouds, birds, and the buildings along the road.
 * The bits with a class (wing, sway, smoke) are animated in globals.css ("Nearby street").
 */

export function Sun({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 240" className={className} aria-hidden="true">
      <defs>
        <radialGradient id="street-sun-glow">
          <stop offset="0" stopColor="#fff2a8" stopOpacity="0.95" />
          <stop offset="0.45" stopColor="#ffe27a" stopOpacity="0.35" />
          <stop offset="1" stopColor="#ffe27a" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="120" cy="120" r="120" fill="url(#street-sun-glow)" />
      <circle cx="120" cy="120" r="44" fill="#ffd84d" />
      <circle cx="108" cy="108" r="30" fill="#ffe680" opacity="0.55" />
    </svg>
  );
}

/** Three cloud shapes (v = 0, 1 or 2). */
export function Cloud({ v = 0, className }: { v?: 0 | 1 | 2; className?: string }) {
  const shapes = [
    <g key="a">
      <ellipse cx="80" cy="74" rx="66" ry="28" />
      <circle cx="120" cy="50" r="36" />
      <circle cx="170" cy="58" r="42" />
      <ellipse cx="210" cy="78" rx="58" ry="26" />
    </g>,
    <g key="b">
      <ellipse cx="70" cy="78" rx="58" ry="24" />
      <circle cx="104" cy="56" r="30" />
      <circle cx="148" cy="64" r="34" />
      <ellipse cx="180" cy="80" rx="46" ry="22" />
    </g>,
    <g key="c">
      <ellipse cx="90" cy="72" rx="78" ry="30" />
      <circle cx="70" cy="52" r="30" />
      <circle cx="130" cy="40" r="40" />
      <circle cx="190" cy="56" r="34" />
      <ellipse cx="226" cy="78" rx="44" ry="22" />
    </g>,
  ];
  return (
    <svg viewBox="0 0 270 120" className={className} aria-hidden="true">
      <g fill="#dff1fb" transform="translate(0 8)">{shapes[v]}</g>
      <g fill="#ffffff">{shapes[v]}</g>
    </svg>
  );
}

/** A bird seen from far away: two wings that flap. */
export function Bird({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 44 20" className={className} aria-hidden="true">
      <path className="wing wing-l" d="M22 12 Q14 1 1 6 Q12 7 22 12 Z" fill="#26343f" />
      <path className="wing wing-r" d="M22 12 Q30 1 43 6 Q32 7 22 12 Z" fill="#26343f" />
    </svg>
  );
}

/* ---------------- the buildings ---------------- */

// [x, width, height] of the pale towers in the distance
const FAR: [number, number, number][] = [
  [10, 70, 150], [90, 50, 210], [150, 90, 140], [250, 60, 250], [320, 80, 170], [410, 50, 200],
  [470, 100, 150], [580, 64, 270], [654, 80, 190], [744, 56, 230], [810, 110, 160], [930, 60, 260],
  [1000, 84, 180], [1094, 52, 220], [1156, 96, 150], [1262, 60, 240], [1332, 78, 170], [1400, 44, 200],
];

interface Shop {
  x: number;
  w: number;
  h: number;
  wall: string;
  sign: { text: string; bg: string; fg: string };
  awning: [string, string];
}
// the shopfronts along the road
const SHOPS: Shop[] = [
  { x: 0, w: 170, h: 250, wall: "#e8a35a", sign: { text: "CHEMIST", bg: "#1e9b55", fg: "#ffffff" }, awning: ["#ffffff", "#1e9b55"] },
  { x: 170, w: 150, h: 300, wall: "#3b8fb0", sign: { text: "PHONES", bg: "#142a1c", fg: "#f5ad1d" }, awning: ["#f4e9d4", "#d9784a"] },
  { x: 320, w: 190, h: 232, wall: "#f4e9d4", sign: { text: "SUYA", bg: "#142a1c", fg: "#f5ad1d" }, awning: ["#ffffff", "#e4572e"] },
  { x: 510, w: 160, h: 282, wall: "#c8553d", sign: { text: "JUICE", bg: "#f5ad1d", fg: "#142a1c" }, awning: ["#ffffff", "#f5ad1d"] },
  { x: 670, w: 230, h: 322, wall: "#2a9d8f", sign: { text: "BUKA", bg: "#f4e9d4", fg: "#c8553d" }, awning: ["#ffffff", "#c8553d"] },
  { x: 900, w: 170, h: 242, wall: "#f0b429", sign: { text: "BAKERY", bg: "#7a4a2a", fg: "#ffffff" }, awning: ["#ffffff", "#7a4a2a"] },
  { x: 1070, w: 190, h: 292, wall: "#d9784a", sign: { text: "TAILOR", bg: "#26343f", fg: "#ffffff" }, awning: ["#f4e9d4", "#26343f"] },
  { x: 1260, w: 180, h: 262, wall: "#7aa6d6", sign: { text: "MARKET", bg: "#1e9b55", fg: "#ffffff" }, awning: ["#ffffff", "#e4572e"] },
];

function Palm({ x, h = 170, s = 1 }: { x: number; h?: number; s?: number }) {
  const leaf = "M0 0 C 18 -30 62 -36 96 -6 C 62 -14 30 -8 0 0 Z";
  return (
    <g className="sway">
      <path d={`M${x} 400 Q${x + 12} ${400 - h * 0.55} ${x + 16 * s} ${400 - h}`} stroke="#8a5a33" strokeWidth={9 * s} fill="none" strokeLinecap="round" />
      <g transform={`translate(${x + 16 * s} ${400 - h}) scale(${s})`}>
        {[-20, 20, 55, 100, 150, 200, 240].map((a, i) => (
          <path key={a} d={leaf} fill={i % 2 ? "#1f7a40" : "#2f8f4e"} transform={`rotate(${a})`} />
        ))}
        <circle r="5" fill="#6b4a2b" />
      </g>
    </g>
  );
}

function Lamp({ x }: { x: number }) {
  return (
    <g>
      <rect x={x} y="250" width="5" height="150" fill="#3b4651" />
      <path d={`M${x + 2} 252 Q${x + 2} 236 ${x + 24} 236`} stroke="#3b4651" strokeWidth="4" fill="none" />
      <rect x={x + 20} y="234" width="16" height="6" rx="3" fill="#59616b" />
    </g>
  );
}

function SuyaStall({ x }: { x: number }) {
  return (
    <g>
      {/* umbrella */}
      <rect x={x + 44} y="300" width="3" height="100" fill="#59616b" />
      <path d={`M${x - 14} 304 Q${x + 46} 238 ${x + 106} 304 Z`} fill="#e4572e" />
      <path d={`M${x + 46} 252 L${x + 22} 304 H${x + 46} Z`} fill="#ffffff" />
      <path d={`M${x + 46} 252 L${x + 70} 304 H${x + 94} Z`} fill="#ffffff" opacity="0" />
      {/* table and grill */}
      <rect x={x} y="352" width="92" height="8" rx="2" fill="#8a5a33" />
      <rect x={x + 6} y="360" width="5" height="40" fill="#6b4a2b" />
      <rect x={x + 81} y="360" width="5" height="40" fill="#6b4a2b" />
      <rect x={x + 14} y="338" width="64" height="14" rx="3" fill="#2b2f33" />
      <rect x={x + 18} y="346" width="56" height="3" rx="1.5" fill="#ff7a2e" />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x={x + 20 + i * 11} y="334" width="4" height="12" rx="2" fill="#a0522d" />
      ))}
      {/* smoke */}
      {[0, 1, 2].map((i) => (
        <circle key={i} className={`smoke smoke-${i}`} cx={x + 30 + i * 14} cy="330" r={5 + i} fill="#ffffff" opacity="0" />
      ))}
    </g>
  );
}

export function StreetBuildings({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 1440 400" className={className} aria-hidden="true" preserveAspectRatio="xMidYMax slice">
      <defs>
        <pattern id="street-win" width="14" height="18" patternUnits="userSpaceOnUse">
          <rect x="3" y="4" width="6" height="8" fill="#d9ecf5" opacity="0.7" />
        </pattern>
      </defs>

      {/* far towers */}
      {FAR.map(([x, w, h], i) => (
        <g key={x}>
          <rect x={x} y={400 - h} width={w} height={h} fill={i % 2 ? "#a3c6dc" : "#b4d3e6"} />
          <rect x={x} y={400 - h} width={w} height={h} fill="url(#street-win)" />
          {i % 4 === 1 && <rect x={x + w / 2 - 1} y={400 - h - 22} width="2" height="22" fill="#a3c6dc" />}
        </g>
      ))}

      {/* shopfronts */}
      {SHOPS.map((b) => {
        const cols = Math.max(2, Math.floor(b.w / 56));
        const rows = Math.max(1, Math.floor((b.h - 120) / 56));
        const stripes = Math.floor((b.w - 16) / 14);
        return (
          <g key={b.x}>
            <rect x={b.x} y={400 - b.h} width={b.w} height={b.h} fill={b.wall} />
            <rect x={b.x - 3} y={400 - b.h - 7} width={b.w + 6} height="9" fill="#000" opacity="0.18" />
            {/* upstairs windows */}
            {Array.from({ length: rows }).flatMap((_, r) =>
              Array.from({ length: cols }).map((__, c) => {
                const wx = b.x + 16 + c * ((b.w - 32) / cols) + ((b.w - 32) / cols - 22) / 2;
                const wy = 400 - b.h + 20 + r * 56;
                return (
                  <g key={`${r}-${c}`}>
                    <rect x={wx} y={wy} width="22" height="30" rx="2" fill="#2c4a5e" />
                    <rect x={wx + 2} y={wy + 2} width="8" height="26" fill="#8fd3f0" opacity="0.45" />
                  </g>
                );
              }),
            )}
            {/* the shop: dark doorway, awning, sign */}
            <rect x={b.x + 12} y="318" width={b.w - 24} height="82" fill="#24323f" />
            <rect x={b.x + b.w * 0.3} y="372" width={b.w * 0.4} height="14" rx="2" fill="#8a5a33" />
            {Array.from({ length: stripes }).map((_, i) => (
              <rect key={i} x={b.x + 8 + i * 14} y="308" width="14" height="20" fill={b.awning[i % 2]} />
            ))}
            <rect x={b.x + 8} y="326" width={b.w - 16} height="3" fill="#000" opacity="0.15" />
            <rect x={b.x + 18} y="276" width={b.w - 36} height="26" rx="4" fill={b.sign.bg} />
            <text x={b.x + b.w / 2} y="295" textAnchor="middle" fontSize="16" fontWeight="800" letterSpacing="2" fill={b.sign.fg} fontFamily="Arial, Helvetica, sans-serif">
              {b.sign.text}
            </text>
          </g>
        );
      })}

      {/* the billboard on the teal building */}
      <g>
        <rect x="738" y="48" width="6" height="42" fill="#3b4651" />
        <rect x="826" y="48" width="6" height="42" fill="#3b4651" />
        <rect x="718" y="2" width="134" height="56" rx="4" fill="#142a1c" />
        <rect x="724" y="8" width="122" height="44" rx="2" fill="#f5ad1d" />
        <text x="785" y="37" textAnchor="middle" fontSize="19" fontWeight="900" letterSpacing="2" fill="#142a1c" fontFamily="Arial, Helvetica, sans-serif">
          STREETWISE
        </text>
      </g>

      {/* palms stand on the pavement, in front of the shops */}
      <Palm x={70} h={215} s={1.05} />
      <Palm x={540} h={240} s={1.1} />
      <Palm x={930} h={230} s={1.05} />
      <Palm x={1372} h={220} s={1} />

      <Lamp x={290} />
      <Lamp x={880} />
      <Lamp x={1165} />
      <SuyaStall x={1296} />
    </svg>
  );
}
