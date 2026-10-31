import { CameraIcon, MapPinIcon, RouteIcon } from "@/components/marketing/icons";
import { PhoneFrame } from "@/components/marketing/phone-frame";
import { Section } from "@/components/marketing/section";

/**
 * To swap in a real screenshot later, set `src` for that step, e.g. src: "/brand/screens/discover.webp"
 * (file in apps/web/public/brand/screens/, exported at 1179 x 2556). Until then a placeholder shows.
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
  },
];

export function HowItWorks() {
  return (
    <Section
      id="how-it-works"
      eyebrow="How it works"
      title="From curious to fed in three steps"
      className="border-y border-border bg-surface"
    >
      <div className="how-steps relative">
        {/* the dashed road line that links the steps (see globals.css) */}
        <div aria-hidden="true" className="how-road" />

        <ol className="relative z-10 grid gap-16 lg:grid-cols-3 lg:gap-8">
          {STEPS.map((s, i) => (
            <li key={s.title} className="flex flex-col items-center text-center">
              <PhoneFrame {...s.screen} />

              {/* bg-surface hides the road line behind the text when the steps are stacked */}
              <div className="relative z-10 mt-10 bg-surface px-3 py-1">
                <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-primary text-lg font-bold text-on-primary">
                  {i + 1}
                </span>
                <h3 className="mt-4 text-xl font-semibold">{s.title}</h3>
                <p className="mx-auto mt-2 max-w-xs text-muted">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}