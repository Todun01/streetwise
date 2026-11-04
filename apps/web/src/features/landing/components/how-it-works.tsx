import type { CSSProperties } from "react";
import { CameraIcon, MapPinIcon, RouteIcon } from "@/components/marketing/icons";
import { PhoneFrame } from "@/components/marketing/phone-frame";
import { Section } from "@/components/marketing/section";
import { HowRoad } from "@/features/landing/components/how-road";
import { HowStage } from "@/features/landing/components/how-stage";

/**
 * To swap in a real screenshot later, set `src` for that step, e.g. src: "/brand/screens/discover.webp"
 * (file in apps/web/public/brand/screens/, exported at 1179 x 2556). Until then a placeholder shows.
 *
 * On wide screens each step is placed by hand on a 976 x 1280 stage (numbers in pixels):
 *   phone = where the phone's top-left corner goes, text = where the description goes.
 * The road in how-road.tsx is drawn on the same stage, so change both together.
 */
const STEPS = [
  {
    title: "Discover",
    body: "Browse street food spots around you that you won't find on other maps, with photos, opening hours and ratings.",
    screen: {
      src: undefined as string | undefined, // "/brand/screens/discover.webp"
      alt: "The Streetwise app showing street food spots near you",
      label: "Explore nearby spots",
      icon: <MapPinIcon />,
    },
    phone: { x: 107, y: 0 },
    text: { x: 400, y: 100, align: "left" },
    tilt: "-3deg",
    delay: "0s",
  },
  {
    title: "Unlock and walk",
    body: "Pay a small fee per trip, or subscribe for more. Get directions to the exact spot and walk over.",
    screen: {
      src: undefined as string | undefined, // "/brand/screens/trip.webp"
      alt: "The Streetwise app showing directions to a spot",
      label: "Your trip",
      icon: <RouteIcon />,
    },
    phone: { x: 619, y: 380 },
    text: { x: 270, y: 560, align: "right" },
    tilt: "3deg",
    delay: "0.7s",
  },
  {
    title: "Contribute and earn",
    body: "Found a hidden gem? Capture it on the spot. Once it's approved, you earn credits as a reward.",
    screen: {
      src: undefined as string | undefined, // "/brand/screens/contribute.webp"
      alt: "The Streetwise app capturing a new street food spot",
      label: "Add a spot",
      icon: <CameraIcon />,
    },
    phone: { x: 107, y: 760 },
    text: { x: 400, y: 940, align: "left" },
    tilt: "-3deg",
    delay: "1.4s",
  },
] as const;

const css = (vars: Record<string, string>) => vars as CSSProperties;

export function HowItWorks() {
  return (
    <Section
      id="how-it-works"
      eyebrow="How it works"
      title="From curious to fed in three steps"
      className="overflow-x-clip border-y border-border bg-surface"
    >
      <HowStage>
        {/* phones stacked: a straight dashed road behind them (hidden on wide screens) */}
        <div aria-hidden="true" className="how-road-mobile" />
        {/* wide screens: the winding road */}
        <HowRoad />

        <ol className="relative z-10 grid gap-16 lg:block">
          {STEPS.map((s, i) => (
            <li key={s.title} className="how-step flex flex-col items-center text-center">
              <div className="how-phone-pos" style={css({ "--px": `${s.phone.x}px`, "--py": `${s.phone.y}px` })}>
                <div className="how-enter" style={css({ "--delay": s.delay })}>
                  <div className="how-float" style={css({ "--tilt": s.tilt, "--float-delay": `${-i * 2.2}s` })}>
                    <PhoneFrame {...s.screen} />
                  </div>
                </div>
              </div>

              {/* bg-surface hides the road line behind the text when the steps are stacked */}
              <div
                className="how-text-pos how-text-enter relative z-10 mt-10 bg-surface px-3 py-1 lg:mt-0 lg:bg-transparent lg:p-0"
                data-align={s.text.align}
                style={css({ "--tx": `${s.text.x}px`, "--ty": `${s.text.y}px`, "--delay": s.delay })}
              >
                <span className="how-badge mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-primary text-lg font-bold text-on-primary">
                  {i + 1}
                </span>
                <h3 className="mt-4 text-xl font-semibold">{s.title}</h3>
                <p className="how-body mx-auto mt-2 max-w-xs text-muted">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </HowStage>
    </Section>
  );
}