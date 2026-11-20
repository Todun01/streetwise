import type { ComponentType, CSSProperties } from "react";
import { Bird, Cloud, StreetBuildings, Sun } from "@/components/steet/scenery";
import { Danfo, Keke, Okada, Suv, Taxi } from "@/components/steet/vehicles";

/**
 * The street behind the "nearby spots" cards: sky, sun, clouds, birds, buildings, and traffic.
 * Everything here is decoration (aria-hidden). The motion is in globals.css ("Nearby street").
 *
 * x0 is where each thing stands when it is NOT animating (reduced-motion visitors see a still street).
 * dur is seconds for one trip across the screen; a negative delay starts it part-way across,
 * so the street is already busy the moment you arrive.
 */
const css = (v: Record<string, string>) => v as CSSProperties;

const CLOUDS = [
  { v: 0, w: 260, y: "6%", dur: 160, delay: -40, x0: "58vw" },
  { v: 1, w: 200, y: "17%", dur: 210, delay: -120, x0: "20vw" },
  { v: 2, w: 310, y: "3%", dur: 260, delay: -200, x0: "84vw" },
  { v: 1, w: 170, y: "12%", dur: 190, delay: -20, x0: "40vw" },
  { v: 0, w: 220, y: "24%", dur: 240, delay: -90, x0: "3vw" },
] as const;

const FLOCKS = [
  { y: "10%", dur: 28, delay: -6, dir: "rtl", x0: "34vw" },
  { y: "19%", dur: 36, delay: -20, dir: "ltr", x0: "72vw" },
] as const;

interface Vehicle {
  Art: ComponentType<{ className?: string }>;
  lane: "near" | "far";
  dir: "ltr" | "rtl";
  w: number; // drawn width in pixels on a 1440px-wide screen (it scales down on small screens)
  dur: number;
  delay: number;
  x0: string;
}
// the far lane first, so the near lane is drawn in front of it
const TRAFFIC: Vehicle[] = [
  { Art: Taxi, lane: "far", dir: "rtl", w: 136, dur: 24, delay: -6, x0: "70vw" },
  { Art: Danfo, lane: "far", dir: "rtl", w: 144, dur: 30, delay: -18, x0: "40vw" },
  { Art: Okada, lane: "far", dir: "rtl", w: 78, dur: 14, delay: -2, x0: "88vw" },
  { Art: Suv, lane: "far", dir: "rtl", w: 129, dur: 28, delay: -11, x0: "12vw" },
  { Art: Danfo, lane: "near", dir: "ltr", w: 235, dur: 19, delay: -4, x0: "62vw" },
  { Art: Okada, lane: "near", dir: "ltr", w: 125, dur: 11, delay: -9, x0: "36vw" },
  { Art: Suv, lane: "near", dir: "ltr", w: 205, dur: 22, delay: -15, x0: "8vw" },
  // { Art: Keke, lane: "near", dir: "ltr", w: 145, dur: 26, delay: -22, x0: "84vw" },
];

export function StreetScene() {
  return (
    <div aria-hidden="true" className="street-scene">
      <Sun className="street-sun" />

      {CLOUDS.map((c, i) => (
        <div
          key={i}
          className="street-cloud"
          style={css({ "--w": `${c.w}px`, "--y": c.y, "--dur": `${c.dur}s`, "--delay": `${c.delay}s`, "--x0": c.x0 })}
        >
          <Cloud v={c.v} className="block h-auto w-full" />
        </div>
      ))}

      {FLOCKS.map((f, i) => (
        <div
          key={i}
          className="street-flock"
          data-dir={f.dir}
          style={css({ "--y": f.y, "--dur": `${f.dur}s`, "--delay": `${f.delay}s`, "--x0": f.x0 })}
        >
          <div className="street-flock-inner">
            {[0, 1, 2].map((k) => (
              <Bird key={k} className={`street-bird street-bird-${k}`} />
            ))}
          </div>
        </div>
      ))}

      <StreetBuildings className="street-buildings" />

      <div className="street-road">
        <div className="street-lane" />
        {TRAFFIC.map((t, i) => (
          <div
            key={i}
            className="veh"
            data-lane={t.lane}
            data-dir={t.dir}
            style={css({ "--w": `${t.w}`, "--dur": `${t.dur}s`, "--delay": `${t.delay}s`, "--x0": t.x0 })}
          >
            <div className="veh-flip">
              <div className="veh-body">
                <t.Art className="block h-auto w-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}