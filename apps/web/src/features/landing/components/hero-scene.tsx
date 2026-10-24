/**
 * The animated hero artwork: a tray, a dish cover being lifted by a hand, and the Streetwise
 * logo revealed underneath. Pure SVG, no images except your wordmark, so it stays light on mobile data.
 *
 * The animation lives in globals.css (look for "Hero scene"). The groups below carry class names
 * (hs-*) that the CSS animates. Without the "anim" class on <html> (reduced motion, or no
 * JavaScript) the scene simply shows its finished state.
 */
export function HeroScene({ className = "" }: { className?: string }) {
    return (
      <svg
        viewBox="0 -40 800 660"
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
            <stop offset="0" stopColor="#6f8a7c" />
            <stop offset=".5" stopColor="#2c4538" />
            <stop offset="1" stopColor="#16291f" />
          </linearGradient>
          <linearGradient id="hs-trayTop" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#8fa89a" />
            <stop offset=".55" stopColor="#3b5547" />
            <stop offset="1" stopColor="#1c3226" />
          </linearGradient>
          <linearGradient id="hs-domeFill" x1="0.1" y1="0" x2="0.9" y2="1">
            <stop offset="0" stopColor="#9db6a8" />
            <stop offset=".4" stopColor="#4a6657" />
            <stop offset="1" stopColor="#162b20" />
          </linearGradient>
          <radialGradient id="hs-knobFill" cx="35%" cy="30%" r="75%">
            <stop offset="0" stopColor="#d6e4da" />
            <stop offset="1" stopColor="#4c6659" />
          </radialGradient>
        </defs>
  
        {/* 1. warm light that bursts out when the cover lifts */}
        <g className="hs-glow">
          <ellipse cx="400" cy="360" rx="360" ry="200" fill="url(#hs-glow)" />
        </g>
  
        {/* 2. the hand under the tray + the tray (fade in first) */}
        <g className="hs-stage">
          <g id="hand-bottom">
            <line
              x1="137.0"
              y1="596.2"
              x2="-127.9"
              y2="737.0"
              stroke="#1b3629"
              strokeWidth="76"
              strokeLinecap="round"
            />
            <line
              x1="140.0"
              y1="592.2"
              x2="-124.9"
              y2="733.0"
              stroke="#2b5340"
              strokeWidth="68"
              strokeLinecap="round"
            />
            <circle cx="90.5" cy="583.2" r="6.2" fill="#0b1a11" />
            <circle cx="88.9" cy="581.4" r="1.8" fill="#4f6f5c" opacity=".7" />
            <circle cx="95.0" cy="591.6" r="6.2" fill="#0b1a11" />
            <circle cx="93.4" cy="589.8" r="1.8" fill="#4f6f5c" opacity=".7" />
            <circle cx="99.4" cy="600.0" r="6.2" fill="#0b1a11" />
            <circle cx="97.8" cy="598.2" r="1.8" fill="#4f6f5c" opacity=".7" />
            <circle cx="103.9" cy="608.4" r="6.2" fill="#0b1a11" />
            <circle cx="102.3" cy="606.6" r="1.8" fill="#4f6f5c" opacity=".7" />
            <circle cx="108.3" cy="616.8" r="6.2" fill="#0b1a11" />
            <circle cx="106.7" cy="615.0" r="1.8" fill="#4f6f5c" opacity=".7" />
            <circle cx="112.8" cy="625.2" r="6.2" fill="#0b1a11" />
            <circle cx="111.2" cy="623.4" r="1.8" fill="#4f6f5c" opacity=".7" />
            <circle cx="117.3" cy="633.6" r="6.2" fill="#0b1a11" />
            <circle cx="115.7" cy="631.8" r="1.8" fill="#4f6f5c" opacity=".7" />
            <circle cx="121.7" cy="642.0" r="6.2" fill="#0b1a11" />
            <circle cx="120.1" cy="640.2" r="1.8" fill="#4f6f5c" opacity=".7" />
            <circle cx="76.8" cy="595.9" r="5.8" fill="#0b1a11" />
            <circle cx="75.2" cy="594.1" r="1.8" fill="#4f6f5c" opacity=".7" />
            <circle cx="81.3" cy="604.3" r="5.8" fill="#0b1a11" />
            <circle cx="79.7" cy="602.5" r="1.8" fill="#4f6f5c" opacity=".7" />
            <circle cx="85.8" cy="612.7" r="5.8" fill="#0b1a11" />
            <circle cx="84.2" cy="610.9" r="1.8" fill="#4f6f5c" opacity=".7" />
            <circle cx="90.2" cy="621.1" r="5.8" fill="#0b1a11" />
            <circle cx="88.6" cy="619.3" r="1.8" fill="#4f6f5c" opacity=".7" />
            <circle cx="94.7" cy="629.4" r="5.8" fill="#0b1a11" />
            <circle cx="93.1" cy="627.6" r="1.8" fill="#4f6f5c" opacity=".7" />
            <circle cx="99.1" cy="637.8" r="5.8" fill="#0b1a11" />
            <circle cx="97.5" cy="636.0" r="1.8" fill="#4f6f5c" opacity=".7" />
            <circle cx="103.6" cy="646.2" r="5.8" fill="#0b1a11" />
            <circle cx="102.0" cy="644.4" r="1.8" fill="#4f6f5c" opacity=".7" />
            <g transform="translate(0.2,668.9) rotate(62)">
              <rect x="-44" y="-28" width="88" height="56" rx="6" fill="#0e1b14" />
              <path d="M-44 -15 H44 M-44 0 H44 M-44 15 H44" stroke="#a06b0c" strokeWidth="2" opacity=".8" />
              <path
                d="M-30 -7 l7 7 l-7 7 l-7 -7z M-5 -7 l7 7 l-7 7 l-7 -7z M20 -7 l7 7 l-7 7 l-7 -7z"
                fill="#f5ad1d"
                opacity=".75"
              />
            </g>
            <ellipse cx="194" cy="562" rx="54" ry="36" transform="rotate(-28 194 562)" fill="#2b5340" />
            <polyline
              points="228,556 300,540 352,530"
              fill="none"
              stroke="#1b3629"
              strokeWidth="22"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <polyline
              points="228,556 300,540 352,530"
              fill="none"
              stroke="#2b5340"
              strokeWidth="18"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <polyline
              points="236,572 318,560 372,548"
              fill="none"
              stroke="#1b3629"
              strokeWidth="22"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <polyline
              points="236,572 318,560 372,548"
              fill="none"
              stroke="#2b5340"
              strokeWidth="18"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <polyline
              points="228,538 290,518 336,506"
              fill="none"
              stroke="#1b3629"
              strokeWidth="21"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <polyline
              points="228,538 290,518 336,506"
              fill="none"
              stroke="#2b5340"
              strokeWidth="17"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
  
          <g id="tray">
            <ellipse cx="400" cy="548" rx="330" ry="26" fill="#000" opacity=".35" />
            <ellipse cx="400" cy="504" rx="332" ry="46" fill="url(#hs-trayRim)" />
            <ellipse cx="400" cy="496" rx="308" ry="37" fill="url(#hs-trayTop)" />
            <ellipse
              cx="400"
              cy="496"
              rx="308"
              ry="37"
              fill="none"
              stroke="#dbe8de"
              strokeWidth="2"
              opacity=".55"
            />
            <path
              d="M120 478 C190 460 300 456 400 456"
              fill="none"
              stroke="#fff"
              strokeWidth="4"
              strokeLinecap="round"
              opacity=".28"
            />
          </g>
        </g>
  
        {/* 3. the logo, revealed as the cover lifts. Your transparent wordmark file goes here. */}
        <g className="hs-logo">
          <image
            href="/brand/wordmark-on-dark.png"
            x="110"
            y="338"
            width="580"
            height="134"
            preserveAspectRatio="xMidYMid meet"
          />
        </g>
  
        {/* 4. steam rising from the dish */}
        <g className="hs-steam-wrap">
          <path
            className="hs-steam hs-steam-1"
            d="M350 330 c 16 -26 -16 -44 0 -70"
            fill="none"
            stroke="#f6efdf"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <path
            className="hs-steam hs-steam-2"
            d="M410 330 c 16 -26 -16 -44 0 -70"
            fill="none"
            stroke="#f6efdf"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <path
            className="hs-steam hs-steam-3"
            d="M470 330 c 16 -26 -16 -44 0 -70"
            fill="none"
            stroke="#f6efdf"
            strokeWidth="5"
            strokeLinecap="round"
          />
        </g>
  
        {/* 5. the cover and the hand holding it. "lift" raises them; "float" gives a gentle idle bob. */}
        <g className="hs-lift">
          <g className="hs-float">
            <g id="dome">
              <ellipse cx="400" cy="478" rx="215" ry="26" fill="#08140d" />
              <path
                d="M185 478 C185 378 282 300 400 300 C518 300 615 378 615 478 A215 26 0 0 1 185 478 Z"
                fill="url(#hs-domeFill)"
              />
              <path
                d="M185 478 A215 26 0 0 0 615 478"
                fill="none"
                stroke="#b9cdbf"
                strokeWidth="2.5"
                opacity=".75"
              />
              <path
                d="M205 440 C214 372 292 316 372 312"
                fill="none"
                stroke="#e8f2ea"
                strokeWidth="7"
                strokeLinecap="round"
                opacity=".38"
              />
              <path
                d="M232 452 C240 400 280 360 320 344"
                fill="none"
                stroke="#e8f2ea"
                strokeWidth="3"
                strokeLinecap="round"
                opacity=".25"
              />
              <rect x="388" y="288" width="24" height="16" rx="4" fill="#6b8577" />
              <circle cx="400" cy="284" r="15" fill="url(#hs-knobFill)" />
              <ellipse cx="394" cy="278" rx="5" ry="3.5" fill="#fff" opacity=".5" />
            </g>
            <g id="hand-top">
              <path d="M524.9 194.7 L948.3 -272.5 L862.5 -344.5 L475.9 153.5 Z" fill="#1b3629" />
              <circle cx="499.4" cy="174.1" r="32" fill="#1b3629" />
              <path d="M519.4 190.4 L942.0 -277.4 L860.8 -345.6 L473.4 151.8 Z" fill="#2b5340" />
              <circle cx="496.4" cy="171.1" r="30" fill="#2b5340" />
              <line
                x1="544.2"
                y1="132.8"
                x2="866.8"
                y2="-236.1"
                stroke="#3b6a52"
                strokeWidth="5"
                strokeLinecap="round"
                opacity=".5"
              />
              <circle cx="482.2" cy="146.1" r="6.2" fill="#0b1a11" />
              <circle cx="480.6" cy="144.3" r="1.8" fill="#4f6f5c" opacity=".7" />
              <circle cx="489.1" cy="151.9" r="6.2" fill="#0b1a11" />
              <circle cx="487.5" cy="150.1" r="1.8" fill="#4f6f5c" opacity=".7" />
              <circle cx="496.0" cy="157.6" r="6.2" fill="#0b1a11" />
              <circle cx="494.4" cy="155.8" r="1.8" fill="#4f6f5c" opacity=".7" />
              <circle cx="502.8" cy="163.4" r="6.2" fill="#0b1a11" />
              <circle cx="501.2" cy="161.6" r="1.8" fill="#4f6f5c" opacity=".7" />
              <circle cx="509.7" cy="169.2" r="6.2" fill="#0b1a11" />
              <circle cx="508.1" cy="167.4" r="1.8" fill="#4f6f5c" opacity=".7" />
              <circle cx="516.6" cy="175.0" r="6.2" fill="#0b1a11" />
              <circle cx="515.0" cy="173.2" r="1.8" fill="#4f6f5c" opacity=".7" />
              <circle cx="523.5" cy="180.8" r="6.2" fill="#0b1a11" />
              <circle cx="521.9" cy="179.0" r="1.8" fill="#4f6f5c" opacity=".7" />
              <circle cx="496.2" cy="134.4" r="5.6" fill="#0b1a11" />
              <circle cx="494.6" cy="132.6" r="1.8" fill="#4f6f5c" opacity=".7" />
              <circle cx="503.5" cy="140.5" r="5.6" fill="#0b1a11" />
              <circle cx="501.9" cy="138.7" r="1.8" fill="#4f6f5c" opacity=".7" />
              <circle cx="510.8" cy="146.6" r="5.6" fill="#0b1a11" />
              <circle cx="509.2" cy="144.8" r="1.8" fill="#4f6f5c" opacity=".7" />
              <circle cx="518.1" cy="152.7" r="5.6" fill="#0b1a11" />
              <circle cx="516.5" cy="150.9" r="1.8" fill="#4f6f5c" opacity=".7" />
              <circle cx="525.3" cy="158.8" r="5.6" fill="#0b1a11" />
              <circle cx="523.7" cy="157.0" r="1.8" fill="#4f6f5c" opacity=".7" />
              <circle cx="532.6" cy="164.9" r="5.6" fill="#0b1a11" />
              <circle cx="531.0" cy="163.1" r="1.8" fill="#4f6f5c" opacity=".7" />
  
              <g transform="translate(592.8,56.2) rotate(40)">
                <rect x="-38" y="-30" width="76" height="60" rx="6" fill="#0e1b14" />
                <path d="M-40 -14 H40 M-40 0 H40 M-40 14 H40" stroke="#a06b0c" strokeWidth="2" opacity=".8" />
                <path
                  d="M-28 -7 l7 7 l-7 7 l-7 -7z M-4 -7 l7 7 l-7 7 l-7 -7z M20 -7 l7 7 l-7 7 l-7 -7z"
                  fill="#f5ad1d"
                  opacity=".75"
                />
              </g>
  
              <polyline
                points="480,240 462,274 450,290"
                fill="none"
                stroke="#1b3629"
                strokeWidth="21"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <polyline
                points="496,226 480,262 470,280"
                fill="none"
                stroke="#1b3629"
                strokeWidth="20"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <polyline
                points="508,212 496,246 488,264"
                fill="none"
                stroke="#1b3629"
                strokeWidth="19"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
  
              <ellipse
                cx="441.1"
                cy="237.0"
                rx="56"
                ry="44"
                transform="rotate(-50 441.1 237.0)"
                fill="#2b5340"
              />
              <ellipse
                cx="435.1"
                cy="229.0"
                rx="36"
                ry="16"
                transform="rotate(-50 435.1 229.0)"
                fill="#3b6a52"
                opacity=".35"
              />
  
              <polyline
                points="456,258 428,274 405,282"
                fill="none"
                stroke="#1b3629"
                strokeWidth="26"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <polyline
                points="456,258 428,274 405,282"
                fill="none"
                stroke="#2b5340"
                strokeWidth="22"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <polyline
                points="460,214 434,240 413,264"
                fill="none"
                stroke="#1b3629"
                strokeWidth="24"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <polyline
                points="460,214 434,240 413,264"
                fill="none"
                stroke="#2b5340"
                strokeWidth="20"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </g>
        </g>
      </svg>
    );
  }