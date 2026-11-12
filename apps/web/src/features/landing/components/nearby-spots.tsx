import Link from "next/link";
import type { CSSProperties } from "react";
import { PinIcon } from "@/components/marketing/pin-icon";
import { StreetScene } from "@/features/landing/components/street-scene";
import { StreetStage } from "@/features/landing/components/street-stage";
import { SAMPLE_SPOTS } from "@/features/landing/sample-spots";

const css = (v: Record<string, string>) => v as CSSProperties;

// how each card tilts, when it starts floating, and how much higher or lower it hovers (wide screens)
const FLOAT = [
  { rot: "-1.6deg", delay: "0s", offset: "" },
  { rot: "0deg", delay: "-1.8s", offset: "lg:-mt-8" },
  { rot: "1.6deg", delay: "-3.6s", offset: "lg:mt-3" },
];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" className="cta-arrow h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 12h15M13 5l7 7-7 7" />
    </svg>
  );
}

export function NearbySpots() {
  return (
    <StreetStage id="nearby-spots">
      <StreetScene />

      {/* the content hovers in front of the street */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 pb-[calc(var(--road-h)+4.5rem)] pt-20 sm:px-6 sm:pt-24">
        {/* this section is always daytime, so its text uses fixed dark colours instead of the page theme */}
        <header className="mb-6 max-w-2xl">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-forest-600">Nearby spots</p>
          <h2 className="text-3xl font-bold tracking-tight text-forest-900 sm:text-4xl">Hidden gems, a short walk away</h2>
          <p className="mt-3 text-lg text-forest-800">
            A taste of what&apos;s on Streetwise. Create a free account to see the spots around you.
          </p>
        </header>

        <ul className="spot-scroller -mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 py-10 lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-8 lg:overflow-visible lg:px-0">
          {SAMPLE_SPOTS.map((s, i) => (
            <li
              key={s.id}
              className={`spot-enter w-[78vw] max-w-[320px] shrink-0 snap-center lg:w-auto lg:max-w-none ${FLOAT[i % 3].offset}`}
              style={css({ "--delay": `${i * 0.18}s` })}
            >
              <div className="spot-float" style={css({ "--r": FLOAT[i % 3].rot, "--d": FLOAT[i % 3].delay })}>
                <article className="spot-card overflow-hidden rounded-3xl bg-forest-900 text-cream-100 shadow-[0_28px_50px_-18px_rgba(10,30,20,0.6)] ring-1 ring-cream-100/10">
                  {/* photo placeholder until real showcase photos exist */}
                  <div className="relative m-3 flex aspect-[4/3] items-center justify-center rounded-2xl bg-gradient-to-br from-forest-700 to-forest-950 text-gold-500">
                    <PinIcon className="h-12 w-12" />
                    <span className="absolute right-3 top-3 rounded-full bg-forest-900/80 px-3 py-1 text-sm font-semibold text-gold-500">
                      ★ {s.rating.toFixed(1)}
                    </span>
                  </div>
                  <div className="px-5 pb-5 pt-2">
                    <h3 className="text-xl font-semibold">{s.name}</h3>
                    <p className="mt-1 text-sm text-cream-100/60">
                      {s.area} · {s.ratingCount} ratings
                    </p>
                    <p className="mt-3 text-cream-100/75">{s.tagline}</p>
                    <p className="mt-4 rounded-full bg-gold-500/10 px-4 py-2 text-center text-sm text-gold-500">
                      Exact location unlocks on your trip
                    </p>
                  </div>
                </article>
              </div>
            </li>
          ))}
        </ul>

        {/* the invitation */}
        <div className="mt-6 flex flex-col items-center gap-3 text-center">
          <Link href="/signup" className="street-cta">
            <span className="street-cta-shine" aria-hidden="true" />
            <PinIcon className="h-6 w-6" />
            <span>Find spots near me</span>
            <ArrowIcon />
          </Link>
          {/* <p className="text-sm font-medium text-forest-900">Free to join</p> */}
        </div>
      </div>
    </StreetStage>
  );
}