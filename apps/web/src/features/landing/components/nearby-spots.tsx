import Link from "next/link";
import { PinIcon } from "@/components/marketing/pin-icon";
import { Section } from "@/components/marketing/section";
import { buttonClasses } from "@/components/ui/button";
import { SAMPLE_SPOTS } from "@/features/landing/sample-spots";

export function NearbySpots() {
  return (
    <Section
      id="nearby-spots"
      eyebrow="Nearby spots"
      title="Hidden gems, a short walk away"
      intro="A taste of what's on Streetwise. Create a free account to see the spots around you."
    >
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SAMPLE_SPOTS.map((s) => (
          <li key={s.id} className="overflow-hidden rounded-2xl border border-border bg-surface">
            {/* photo placeholder until real showcase photos exist */}
            <div className="flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-forest-700 to-forest-900 text-gold-500">
              <PinIcon className="h-12 w-12" />
            </div>
            <div className="p-5">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-lg font-semibold">{s.name}</h3>
                <p className="shrink-0 text-sm font-medium">
                  ★ {s.rating.toFixed(1)} <span className="text-muted">({s.ratingCount})</span>
                </p>
              </div>
              <p className="mt-1 text-sm text-muted">{s.area}</p>
              <p className="mt-3 text-muted">{s.tagline}</p>
              <p className="mt-4 text-sm text-accent">Exact location unlocks when you start a trip.</p>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-10">
        <Link href="/signup" className={buttonClasses("primary")}>
          Sign up to see spots near you
        </Link>
      </div>
    </Section>
  );
}