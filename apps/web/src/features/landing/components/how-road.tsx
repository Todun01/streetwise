/**
 * The winding road that links the three phones (wide screens only).
 * The drawing space is 976 x 1280 pixels: the same as the stage in how-it-works.tsx, so the
 * road lines up with the phones. It runs from the middle of phone 1, behind phone 2 (where it
 * turns, out of sight) and ends behind phone 3. Only the two diagonal links between them show.
 */
const ROAD = "M 232 410 C 450 410 744 430 744 640 C 744 880 450 890 232 890";

export function HowRoad() {
  return (
    <svg
      className="how-road-svg"
      viewBox="0 0 976 1280"
      width="976"
      height="1280"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        {/* reveals the gold dashes only where the asphalt has already been drawn */}
        <mask id="how-reveal" maskUnits="userSpaceOnUse" x="0" y="0" width="976" height="1280">
          <path d={ROAD} stroke="#fff" strokeWidth="60" strokeLinecap="round" pathLength="1" className="how-road-path" />
        </mask>
      </defs>

      {/* the asphalt */}
      <path d={ROAD} stroke="#0e1010" strokeWidth="38" strokeLinecap="round" pathLength="1" className="how-road-path" />
      {/* the gold centre-line, which keeps travelling along the road */}
      <path
        d={ROAD}
        stroke="#a06b0c"
        strokeWidth="3"
        strokeDasharray="14 12"
        className="how-road-dashes"
        mask="url(#how-reveal)"
      />
    </svg>
  );
}