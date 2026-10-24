/**
 * The animated hero artwork: a tray, a dish cover being lifted by a hand, and the Streetwise
 * logo revealed underneath. Pure SVG, no images except your wordmark, so it stays light on mobile data.
 *
 * The animation lives in globals.css (look for "Hero scene"). The groups below carry class names
 * (hs-*) that the CSS animates. Without the "anim" class on <html> (reduced motion, or no
 * JavaScript) the scene simply shows its finished state.
 *
 * HOW THE DRAWING IS ORGANISED
 * Everything inside <g transform={ART}> is drawn in the coordinate space of the two reference
 * images (1080 x 1080, the "start" frame with the cover resting on the tray). ART scales that
 * into the 800 x 660 viewBox, so the tray still sits at the same spot (centre 400,500).
 * That means you can read coordinates straight off the reference images when tweaking.
 *
 * Left hand  (bottom): palm up, thumb and fingers tucked under the tray, beaded wrist, patterned sleeve.
 * Right hand (top):    back of the hand, index finger and thumb pinching the knob, beaded wrist, sleeve.
 *
 * LIFT: the finished frame has the cover raised and tilted about 10 degrees clockwise. In globals.css
 * the .hs-lift end state should be roughly:
 *     transform: translate(19px, -175px) rotate(10deg);   transform-origin: 400px 463px;
 * (463 is the height of the cover's rim in the start frame). Tune to taste.
 */

const SKIN = "#2b5340";
const EDGE = "#1b3629";
const SHADE = "#3b6a52";
const INK = "#0b1a11";

const ART = "translate(-118.7 -95.3) scale(0.923)";

/** Each forearm is drawn in its own rotated frame: x runs along the arm, y across it. */
const BOTTOM_ARM = "translate(317 897) rotate(-30)";
const TOP_ARM = "translate(868 205) rotate(-30)";

type Pt = [number, number];

const BEAD_COLORS = ["#efe3c8", "#17130f", "#8a4f38", "#17130f"];

/** One strand of wrist beads, running across the arm. */
function BeadStrand({ x, seed = 0 }: { x: number; seed?: number }) {
  const from = -63;
  const step = 21;
  const count = 7;
  return (
    <g>
      {Array.from({ length: count }, (_, i) => {
        const y = from + i * step;
        // the strand bows a little at its ends because the wrist is round
        const bow = -5 * Math.pow(y / 63, 2);
        const colour = BEAD_COLORS[(i + seed) % BEAD_COLORS.length];
        return (
          <g key={i}>
            <circle
              cx={x + bow}
              cy={y}
              r={10.5}
              fill={colour}
              stroke={INK}
              strokeWidth="1.6"
            />
            <circle
              cx={x + bow - 3}
              cy={y - 3.5}
              r={2.6}
              fill="#fff"
              opacity=".5"
            />
          </g>
        );
      })}
    </g>
  );
}

function Bracelets({ transform }: { transform: string }) {
  return (
    <g transform={transform}>
      <BeadStrand x={-22} seed={0} />
      <BeadStrand x={0} seed={2} />
      <BeadStrand x={22} seed={1} />
    </g>
  );
}

/** A finger or thumb: a round-capped stroke with a dark outline underneath. */
function Digit({ pts, w }: { pts: Pt[]; w: number }) {
  const p = pts.map((q) => q.join(",")).join(" ");
  return (
    <>
      <polyline
        points={p}
        fill="none"
        stroke={EDGE}
        strokeWidth={w + 7}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polyline
        points={p}
        fill="none"
        stroke={SKIN}
        strokeWidth={w}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  );
}

/** Two little knuckle creases across a straight finger. */
function Creases({ pts, w }: { pts: Pt[]; w: number }) {
  const a = pts[0];
  const b = pts[pts.length - 1];
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const len = Math.hypot(dx, dy);
  const nx = -dy / len;
  const ny = dx / len;
  const h = w * 0.32;
  return (
    <>
      {[0.5, 0.74].map((t) => {
        const cx = a[0] + dx * t;
        const cy = a[1] + dy * t;
        return (
          <line
            key={t}
            x1={cx - nx * h}
            y1={cy - ny * h}
            x2={cx + nx * h}
            y2={cy + ny * h}
            stroke={EDGE}
            strokeWidth="2.2"
            strokeLinecap="round"
            opacity=".7"
          />
        );
      })}
    </>
  );
}

/* ---------- shapes (reference-image coordinates) ---------- */

// Bottom hand: palm + wrist, then four fingers (pinky first so the index finger overlaps on top) and the thumb.
const PALM_BOTTOM =
  "M298 834 C326 808 350 784 374 766 C405 742 450 738 500 752 L572 842 C510 842 442 876 376 946 Z";
const FOREARM_BOTTOM = "M-520 -60 H30 V60 H-520 Z";

const BOTTOM_FINGERS: { pts: Pt[]; w: number }[] = [
  {
    pts: [
      [531, 832],
      [614, 775],
      [700, 723],
    ],
    w: 20,
  },
  {
    pts: [
      [521, 814],
      [626, 742],
      [735, 675],
    ],
    w: 21,
  },
  {
    pts: [
      [509, 797],
      [604, 732],
      [702, 672],
    ],
    w: 21,
  },
  {
    pts: [
      [498, 779],
      [574, 727],
      [653, 679],
    ],
    w: 21,
  },
];
const BOTTOM_THUMB: Pt[] = [
  [352, 832],
  [358, 776],
  [372, 726],
  [392, 692],
];

// Top hand: back of the hand, curled fingers, index finger and thumb on the knob.
const HAND_BACK =
  "M826 150 C770 150 705 148 648 158 C603 166 565 186 543 224 C528 252 524 285 532 322 L645 334 C705 326 785 304 884 272 Z";
const FOREARM_TOP = "M-20 -60 H1000 V60 H-20 Z";

const CURLED_FINGERS: { pts: Pt[]; w: number }[] = [
  {
    pts: [
      [754, 300],
      [752, 326],
    ],
    w: 26,
  },
  {
    pts: [
      [716, 312],
      [712, 342],
    ],
    w: 30,
  },
  {
    pts: [
      [676, 322],
      [668, 354],
    ],
    w: 32,
  },
];
const INDEX_FINGER: Pt[] = [
  [592, 196],
  [548, 222],
  [524, 272],
  [519, 322],
  [519, 346],
];
const TOP_THUMB: Pt[] = [
  [716, 296],
  [652, 324],
  [606, 343],
  [592, 348],
];

export function HeroScene({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 -100 800 800"
      className={`hero-scene overflow-visible ${className}`}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id="hs-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#f5ad1d" stopOpacity=".55" />
          <stop offset="1" stopColor="#f5ad1d" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="hs-trayRim" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#8fa89a" />
          <stop offset=".25" stopColor="#4a6657" />
          <stop offset=".6" stopColor="#2c4538" />
          <stop offset="1" stopColor="#16291f" />
        </linearGradient>
        <linearGradient id="hs-trayTop" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#6f8a7c" />
          <stop offset=".55" stopColor="#2f493b" />
          <stop offset="1" stopColor="#14261c" />
        </linearGradient>
        {/* dome shell: bright vertical glare on the left, dark falloff to the right, thin rim light */}
        <linearGradient id="hs-domeFill" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#3c574a" />
          <stop offset=".1" stopColor="#86a093" />
          <stop offset=".24" stopColor="#cfe0d5" />
          <stop offset=".36" stopColor="#7c978a" />
          <stop offset=".5" stopColor="#4d6a5b" />
          <stop offset=".7" stopColor="#2f4a3c" />
          <stop offset=".88" stopColor="#1f362a" />
          <stop offset=".96" stopColor="#4a6657" />
          <stop offset="1" stopColor="#1a2f23" />
        </linearGradient>
        {/* the inside of the cover, visible through the open rim */}
        <linearGradient id="hs-domeInside" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0a150e" />
          <stop offset="1" stopColor="#3a5547" />
        </linearGradient>
        <radialGradient id="hs-knobFill" cx="35%" cy="30%" r="75%">
          <stop offset="0" stopColor="#d6e4da" />
          <stop offset="1" stopColor="#4c6659" />
        </radialGradient>
        {/* ankara-style print for the sleeves */}
        <pattern
          id="hs-ankara"
          width="64"
          height="64"
          patternUnits="userSpaceOnUse"
        >
          <rect width="64" height="64" fill="#0e1b14" />
          <path d="M0 0 H30 A30 30 0 0 1 0 30 Z" fill="#a06b0c" opacity=".8" />
          <path
            d="M64 64 H34 A30 30 0 0 1 64 34 Z"
            fill="#a06b0c"
            opacity=".8"
          />
          <path
            d="M32 12 L52 32 L32 52 L12 32 Z"
            fill="none"
            stroke="#f5ad1d"
            strokeWidth="3"
            opacity=".8"
          />
          <circle cx="32" cy="32" r="5" fill="#f5ad1d" opacity=".75" />
        </pattern>
        {/* fades the bottom of the lower hand into the dark, so the arm never runs behind the text below */}
        <linearGradient id="hs-bottomFadeGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset=".9" stopColor="#fff" />
          <stop offset="1" stopColor="#000" />
        </linearGradient>
        <mask
          id="hs-bottomFade"
          maskUnits="userSpaceOnUse"
          x="-1000"
          y="-400"
          width="3000"
          height="1100"
        >
          <rect
            x="-1000"
            y="-400"
            width="3000"
            height="1100"
            fill="url(#hs-bottomFadeGradient)"
          />
        </mask>
      </defs>

      {/* 1. warm light that bursts out when the cover lifts */}
      <g className="hs-glow">
        <ellipse cx="400" cy="395" rx="380" ry="190" fill="url(#hs-glow)" />
      </g>

      {/* 2. the hand under the tray + the tray (fade in first) */}
      <g className="hs-stage" mask="url(#hs-bottomFade)">
        <g transform={ART}>
          <ellipse
            cx="562"
            cy="692"
            rx="320"
            ry="20"
            fill="#000"
            opacity=".3"
          />

          <g id="hand-bottom">
            {/* arm + palm: outline pass, then fill pass, so they read as one shape */}
            <g fill={EDGE} stroke={EDGE} strokeWidth="7" strokeLinejoin="round">
              <path d={PALM_BOTTOM} />
              <path d={FOREARM_BOTTOM} transform={BOTTOM_ARM} />
            </g>
            <g fill={SKIN}>
              <path d={PALM_BOTTOM} />
              <path d={FOREARM_BOTTOM} transform={BOTTOM_ARM} />
            </g>
            <path
              d="M-500 -46 H20"
              transform={BOTTOM_ARM}
              stroke={SHADE}
              strokeWidth="6"
              strokeLinecap="round"
              opacity=".35"
            />
            <ellipse
              cx="440"
              cy="832"
              rx="72"
              ry="38"
              transform="rotate(-35 440 832)"
              fill={SHADE}
              opacity=".3"
            />
            {/* palm creases */}
            <path
              d="M398 772 C430 802 450 832 440 864"
              fill="none"
              stroke={EDGE}
              strokeWidth="3"
              opacity=".4"
              strokeLinecap="round"
            />
            <path
              d="M462 790 C474 810 472 830 460 850"
              fill="none"
              stroke={EDGE}
              strokeWidth="3"
              opacity=".35"
              strokeLinecap="round"
            />

            {BOTTOM_FINGERS.map((f, i) => (
              <g key={i}>
                <Digit pts={f.pts} w={f.w} />
                <Creases pts={f.pts} w={f.w} />
              </g>
            ))}
            <Digit pts={BOTTOM_THUMB} w={40} />
            <path
              d="M338 808 C346 780 358 750 372 726"
              fill="none"
              stroke={SHADE}
              strokeWidth="6"
              strokeLinecap="round"
              opacity=".4"
            />

            {/* sleeve */}
            <g transform={BOTTOM_ARM}>
              <rect
                x="-520"
                y="-76"
                width="360"
                height="152"
                fill="url(#hs-ankara)"
                stroke={EDGE}
                strokeWidth="5"
              />
              <rect
                x="-172"
                y="-76"
                width="12"
                height="152"
                fill="#f5ad1d"
                opacity=".85"
              />
            </g>

            <Bracelets transform={BOTTOM_ARM} />
          </g>

          <g id="tray">
            {/* underside of the dish */}
            <path
              d="M236 640 C294 670 420 678 562 678 C704 678 830 670 888 640 Z"
              fill="url(#hs-trayRim)"
            />
            {/* flat rim */}
            <ellipse
              cx="562"
              cy="632"
              rx="357"
              ry="11"
              fill="url(#hs-trayRim)"
            />
            {/* dish surface */}
            <ellipse
              cx="562"
              cy="634"
              rx="332"
              ry="12"
              fill="url(#hs-trayTop)"
            />
            <ellipse
              cx="562"
              cy="632"
              rx="357"
              ry="11"
              fill="none"
              stroke="#dbe8de"
              strokeWidth="2.5"
              opacity=".6"
            />
            <path
              d="M252 646 C340 668 450 672 562 672"
              fill="none"
              stroke="#fff"
              strokeWidth="4"
              strokeLinecap="round"
              opacity=".25"
            />
          </g>
        </g>
      </g>

      {/* 3. the food-pin icon, revealed as the cover lifts */}
      {/* 3. the food-pin icon, revealed as the cover lifts */}
      <g className="hs-logo">
        <image
          href="/brand/pin.png"
          x="318"
          y="318"
          width="164"
          height="164"
          preserveAspectRatio="xMidYMid meet"
        />
      </g>

      {/* 4. the cover and the hand holding it. "lift" raises and tilts them; "float" gives a gentle idle bob. */}
      <g transform="translate(400 463)">
        <g className="hs-lift">
          <g className="hs-float">
            <g transform="translate(-400 -463)">
              <g transform={ART}>
                <g id="dome">
                  {/* inside of the cover, seen through the open rim */}
                  <ellipse
                    cx="562"
                    cy="605"
                    rx="305"
                    ry="31"
                    fill="url(#hs-domeInside)"
                  />
                  {/* shell: the bottom edge is the back of the rim, so the opening reads as a lens */}
                  <path
                    d="M259 605 C259 476 395 372 562 372 C729 372 865 476 865 605 A303 28 0 0 0 259 605 Z"
                    fill="url(#hs-domeFill)"
                  />
                  {/* rolled lip along the front of the rim */}
                  <path
                    d="M250 607 A312 32 0 0 0 874 607"
                    fill="none"
                    stroke="#cfe0d5"
                    strokeWidth="4"
                    opacity=".8"
                  />
                  <path
                    d="M259 605 A303 30 0 0 0 865 605"
                    fill="none"
                    stroke="#b9cdbf"
                    strokeWidth="2.5"
                    opacity=".75"
                  />
                  {/* reflections */}
                  <path
                    d="M292 560 C300 470 380 402 480 384"
                    fill="none"
                    stroke="#e8f2ea"
                    strokeWidth="12"
                    strokeLinecap="round"
                    opacity=".35"
                  />
                  <path
                    d="M318 565 C326 505 372 452 420 430"
                    fill="none"
                    stroke="#e8f2ea"
                    strokeWidth="4"
                    strokeLinecap="round"
                    opacity=".25"
                  />
                  <path
                    d="M548 392 C540 450 540 520 550 584"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="14"
                    strokeLinecap="round"
                    opacity=".16"
                  />
                  <path
                    d="M835 540 C822 480 790 440 750 412"
                    fill="none"
                    stroke="#b9cdbf"
                    strokeWidth="3"
                    strokeLinecap="round"
                    opacity=".35"
                  />
                  {/* knob */}
                  <ellipse cx="560" cy="374" rx="24" ry="7" fill="#162b20" />
                  <path d="M546 372 L551 338 H569 L574 372 Z" fill="#6b8577" />
                  <ellipse
                    cx="560"
                    cy="334"
                    rx="28"
                    ry="11"
                    fill="url(#hs-knobFill)"
                  />
                  <ellipse
                    cx="552"
                    cy="331"
                    rx="9"
                    ry="3.5"
                    fill="#fff"
                    opacity=".5"
                  />
                </g>

                <g id="hand-top">
                  {/* arm + back of the hand */}
                  <g
                    fill={EDGE}
                    stroke={EDGE}
                    strokeWidth="7"
                    strokeLinejoin="round"
                  >
                    <path d={HAND_BACK} />
                    <path d={FOREARM_TOP} transform={TOP_ARM} />
                  </g>
                  <g fill={SKIN}>
                    <path d={HAND_BACK} />
                    <path d={FOREARM_TOP} transform={TOP_ARM} />
                  </g>
                  <path
                    d="M700 172 C650 170 610 186 585 210"
                    fill="none"
                    stroke={SHADE}
                    strokeWidth="8"
                    strokeLinecap="round"
                    opacity=".35"
                  />
                  <path
                    d="M-10 -46 H1000"
                    transform={TOP_ARM}
                    stroke={SHADE}
                    strokeWidth="6"
                    strokeLinecap="round"
                    opacity=".35"
                  />
                  {/* knuckle wrinkles on the back of the hand */}
                  <path
                    d="M600 215 C612 208 628 208 640 214"
                    fill="none"
                    stroke={EDGE}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    opacity=".55"
                  />
                  <path
                    d="M676 192 C690 186 706 188 716 196"
                    fill="none"
                    stroke={EDGE}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    opacity=".55"
                  />
                  <path
                    d="M740 200 C752 196 764 198 772 204"
                    fill="none"
                    stroke={EDGE}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    opacity=".45"
                  />

                  {/* the other three fingers, curled in behind the thumb */}
                  {CURLED_FINGERS.map((f, i) => (
                    <Digit key={i} pts={f.pts} w={f.w} />
                  ))}
                  {/* index finger folded over the knob, thumb pressing from the other side */}
                  <Digit pts={INDEX_FINGER} w={48} />
                  <path
                    d="M510 262 C524 270 540 270 552 262"
                    fill="none"
                    stroke={EDGE}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    opacity=".6"
                  />
                  <path
                    d="M504 298 C518 306 534 306 546 298"
                    fill="none"
                    stroke={EDGE}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    opacity=".6"
                  />
                  <Digit pts={TOP_THUMB} w={44} />
                  <path
                    d="M700 284 L640 310"
                    fill="none"
                    stroke={SHADE}
                    strokeWidth="6"
                    strokeLinecap="round"
                    opacity=".4"
                  />
                  <ellipse
                    cx="602"
                    cy="342"
                    rx="15"
                    ry="9"
                    transform="rotate(-22 602 342)"
                    fill="#9bb8a6"
                    opacity=".45"
                  />

                  {/* sleeve */}
                  <g transform={TOP_ARM}>
                    <rect
                      x="150"
                      y="-76"
                      width="850"
                      height="152"
                      fill="url(#hs-ankara)"
                      stroke={EDGE}
                      strokeWidth="5"
                    />
                    <rect
                      x="150"
                      y="-76"
                      width="12"
                      height="152"
                      fill="#f5ad1d"
                      opacity=".85"
                    />
                  </g>

                  <Bracelets transform={TOP_ARM} />
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}
